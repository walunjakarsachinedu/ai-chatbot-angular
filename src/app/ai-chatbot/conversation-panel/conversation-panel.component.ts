import { Component, OnInit } from '@angular/core';
import { ChatNode } from '../models/type';
import { dummyChat } from '../../dummy-data/chat';
import { CommonModule, NgFor } from '@angular/common';
import { ChatTreeComponent } from '../chat-tree/chat-tree.component';

@Component({
  selector: 'conversation-panel',
  templateUrl: './conversation-panel.component.html',
  styleUrls: ['./conversation-panel.component.scss'],
  imports: [CommonModule, ChatTreeComponent],
  providers: [NgFor]
})
export class ConversationPanelComponent implements OnInit {
  chatNode: ChatNode = dummyChat;

  constructor() { }

  ngOnInit() {
  }

}
