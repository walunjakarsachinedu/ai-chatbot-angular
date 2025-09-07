import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ChatServiceService, Conversation } from '../chat-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent implements OnDestroy {
  @Output() onChatSelect = new EventEmitter<void>();

  history: Conversation[] = [];
  selectedChatId: string|null = null;

  chatSubscription?: Subscription;

  constructor(private chatService: ChatServiceService) {
    this.history = chatService.getHistory();
    this.chatSubscription = chatService.chatId$.subscribe((chatId) => {
      this.history = chatService.getHistory();
      if(chatId == null) this.selectedChatId = null;
      const conversation = chatService.getHistory().find(history => history.id == chatId);
      if(!conversation) return;
      this.selectedChatId = conversation.id;
    })
  }

  ngOnDestroy(): void {
    this.chatSubscription?.unsubscribe();
  }

  setChatId(chatId: string) {
    this.chatService.setSelectedChat(chatId);
    this.onChatSelect.emit();
  }

  deleteChat(chatId: string) {
    this.chatService.deleteChat(chatId);
    this.history = this.history.filter(chat => chat.id != chatId);
  }
}