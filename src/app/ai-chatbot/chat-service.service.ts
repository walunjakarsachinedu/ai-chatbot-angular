import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export type Conversation = {
  conversation: any[], 
  title?: string, 
  id: string,
  timeStamp: number
};

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  history: Conversation[] = [];

  constructor() { 
    this.history = this.getHistory(); 

    this.setSelectedChat(localStorage.getItem("selected_chat_id") ?? null);

    this.chatId$.subscribe((id) => {
      this.selectedChatId = id;
      if(id) {
        localStorage.setItem("selected_chat_id", id);
      }
      else {
        localStorage.removeItem("selected_chat_id");
      }
    })
  }

  private selectedChat = new BehaviorSubject<string|null>(null);
  chatId$ = this.selectedChat.asObservable();
  selectedChatId: string|null = null;

  setSelectedChat(chatId: string|null): void {
    this.selectedChat.next(chatId);
  }

  /** Store chat as new conversation history. */
  storeHistory(title: string, conversation: any[]): string {
    const obj: Conversation = {
      id: crypto.randomUUID(),
      title: title,
      conversation: conversation,
      timeStamp: Date.now()
    }; 

    localStorage.setItem(`chat_history_${obj.id}`, JSON.stringify(obj));
    this.setSelectedChat(obj.id);
    this.history.push(obj);
    return obj.id;
  }

  /** Replace Existing conversation history. */
  replaceHistory(conversation: Conversation) {
    conversation.timeStamp = Date.now();
    localStorage.setItem(`chat_history_${conversation.id}`, JSON.stringify(conversation));
    this.setSelectedChat(conversation.id);
  }


  /** Get already created conversation history. */
  getHistory(): Conversation[] {
    const history: Conversation[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("chat_history_")) {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const obj = JSON.parse(raw) as Conversation;
            history.push(obj);
          } catch {
            // skip corrupted entry
          }
        }
      }
    }
    
    return history.sort((a, b) => b.timeStamp - a.timeStamp);
  }

  deleteChat(chatId: string|null) {
    if(chatId == this.selectedChatId) {
      this.setSelectedChat(null);
    }
    localStorage.removeItem(`chat_history_${chatId}`); 
    this.history = this.history.filter(chat => chat.id != chatId);
  }
}


