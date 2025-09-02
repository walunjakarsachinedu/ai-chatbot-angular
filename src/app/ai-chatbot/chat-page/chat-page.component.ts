import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import 'deep-chat';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatPageComponent implements AfterViewInit {
  @ViewChild('chatRef', { static: true }) chatElement!: ElementRef<HTMLElement>;

  connect?: {handler: any, stream: boolean};
  stream: boolean = true;

  history: {role: string, text: string}[] = [];

  constructor() { 
    this.connect = {
      handler: this.stream ? this.streamHandler : this.apiHandler,
      stream: this.stream ?? undefined
    }
  }

  ngAfterViewInit(): void {
    const chatRef = this.chatElement.nativeElement as unknown as {onMessage: (msg: any) => void};
    chatRef.onMessage = this.onMessage.bind(this);
  }


  onMessage = (body: any) => {
    if(!body.isHistory) {
      this.history.push(body.message);
    }
  }


  streamHandler = async (body: any, signals: any) => {
    try {
      const res = await this.sendPrompt(body, true);
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
      const response = await this.sendPrompt(body, false);
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

  sendPrompt = async (body: any, useStream: boolean) => {
    const messages = this.history.map((msg: any) => ({
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
