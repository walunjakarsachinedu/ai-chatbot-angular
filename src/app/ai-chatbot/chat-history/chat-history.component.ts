import { Component, ViewChild } from '@angular/core';
import { Sidebar } from '../../common/sidebar/sidebar.component';
import { ChatServiceService, Conversation } from '../chat-service.service';

@Component({
  selector: 'chat-history',
  templateUrl: './chat-history.component.html',
  imports: [Sidebar],
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent {
  @ViewChild("sidebar") sidebarRef!: Sidebar;

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

  toggleSidebar(): void {
    console.log("toggleSidebar: ", this.sidebarRef);
    this.sidebarRef.toggleSidebar();
  }
}