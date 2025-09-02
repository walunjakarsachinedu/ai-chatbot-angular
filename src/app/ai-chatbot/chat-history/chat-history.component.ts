import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatServiceService, Conversation } from '../chat-service.service';

@Component({
  selector: 'chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent implements OnInit {
  @Input() sidebarShow: boolean = false;
  @Output() sidebarShowChange = new EventEmitter<boolean>();

  history: Conversation[] = [];

  selectedChatId: string|null = null;

  constructor(private chatService: ChatServiceService) {
    this.history = this.chatService.getHistory();
    if(this.history[0]) this.selectedChatId = this.history[0].id;

    window.addEventListener("storage", (): void => {
      this.history = this.chatService.getHistory();
    });

    // TODO: dispose onDestroy
    chatService.chatId$.subscribe((chatId) => {
      const conversation = this.chatService.getHistory().find(history => history.id == chatId);
      if(!conversation) return;
      this.selectedChatId = conversation.id;
    })
  }

  setChatId(chatId: string) {
    this.chatService.setChatId(chatId);
    this.toggleSidebar();
  }

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.sidebarShow = !this.sidebarShow;
    this.sidebarShowChange.emit(this.sidebarShow);
  }
}