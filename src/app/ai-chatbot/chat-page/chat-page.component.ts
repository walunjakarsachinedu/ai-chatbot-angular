import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import 'deep-chat';
import { Title } from '@angular/platform-browser';
import { ChatServiceService, Conversation } from '../chat-service.service';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  imports: [ChatHistoryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatPageComponent implements AfterViewInit {
  @ViewChild('chatRef', { static: true }) chatElement!: ElementRef<HTMLElement>;

  connect?: {handler: any, stream: boolean};
  stream: boolean = true;
  chatId?: string; 
  history: {role: string, text: string}[] = [];
  title?: string;
  chatTimeStamp?: number;

  constructor(private titleService: Title, private chatService: ChatServiceService) { 
    if(chatService.history[0]) {
      this.chatId = chatService.history[0].id;
      this.history = chatService.history[0].conversation;
      if(chatService.history[0].title) {
        this.title = chatService.history[0].title;
        titleService.setTitle(chatService.history[0].title);
      }
    } 
    this.connect = {
      handler: this.stream ? this.streamHandler : this.apiHandler,
      stream: this.stream ?? undefined
    }

    chatService.chatId$.subscribe((chatId) => {
      const conversation = this.chatService.getHistory().find(history => history.id == chatId);
      if(!conversation) return;
      this.resetToExistingConversation(conversation);
    })
  }

  resetToExistingConversation(conversation: Conversation) {
    this.chatId = conversation.id;
    this.history = conversation.conversation;
    if(conversation.title) {
      this.title = conversation.title;
      this.titleService.setTitle(conversation.title);
    }
    this.chatRef.clearMessages(false);
    this.history.forEach((msg) => {
      this.chatRef.addMessage(msg);
    })
  }

  ngAfterViewInit(): void {
    this.chatRef.onMessage = this.onMessage.bind(this);
  }

  startNewChat() {
    this.history = [];
    this.chatId = undefined;
    this.title = undefined;
    this.titleService.setTitle("AI Chatbot");
    if(this.chatRef) this.chatRef.clearMessages();
  }

  get chatRef() {
    return this.chatElement.nativeElement as any; 
  }

  onMessage = async (body: any) => {
    if(body.isHistory) return;

    this.history.push(body.message);
    if(this.history.length == 2) this.setTitleOfChat().then((title) => {
      this.chatId = this.chatService.storeHistory(title, this.history);
    });
    else {
      if(this.chatId) {
        this.chatService.replaceHistory({id: this.chatId, title: this.title, conversation: this.history, timeStamp: this.chatTimeStamp!});
        if(!this.title) this.setTitleOfChat().then((title) => {
          this.chatService.replaceHistory({id: this.chatId!, title, conversation: this.history, timeStamp: this.chatTimeStamp!})
        });
      }
    }
  }

  setTitleOfChat = async () => {
    const prompt = {role: "user", "text": "Generate a very short conversation title (3-5 words max) based only on this chat history. The title should reflect the tone of the conversation. Return only the title text, no explanations or extra text."};
    const response = await this.sendPrompt([...this.history, prompt], false);
    const data = await response.json();
    const title = data.message?.content;
    if (title) {
      this.titleService.setTitle(data.message?.content);
      this.title = title;
      return data.message?.content;
    }
  }

  streamHandler = async (body: any, signals: any) => {
    try {
      const res = await this.sendPrompt(this.history, true);
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      signals.onOpen();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? ''; // keep last incomplete line

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.message?.content) {
              await signals.onResponse({ text: json.message.content, stream: true });
            }
          } catch {
            // ignore invalid lines
          }
        }
      }

      // remaining buffer
      if (buffer) {
        try {
          const json = JSON.parse(buffer);
          if (json.message?.content) {
            await signals.onResponse({ text: json.message.content, stream: true });
          }
        } catch {}
      }

      signals.onClose();
    } catch (e) {
      signals.onResponse({ error: 'Error: ' + e });
      signals.onClose();
    }
  };

  /** handler for non-stream response */
  apiHandler = async (body: any, signals: any) => {
    try {
      const response = await this.sendPrompt(this.history, false);
      const data = await response.json();

      if (data.message?.content) {
        signals.onResponse({ text: data.message.content });
      } else {
        signals.onResponse({ error: 'Error: no content in response' });
      }
    } catch (e) {
      signals.onResponse({ error: 'Error: ' + e });
    }
  };

  sendPrompt = async (history: any, useStream: boolean) => {
    const messages = history.map((msg: any) => ({
      role: msg.role,
      content: msg.text,
    }));

    const payload = {
      model: "hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:Q4_K_M",
      messages,
      stream: useStream,
    };

    return await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
}
