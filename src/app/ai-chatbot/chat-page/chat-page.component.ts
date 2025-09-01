import { Component, OnInit } from '@angular/core';
import { ConversationPanelComponent } from '../conversation-panel/conversation-panel.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  imports: [ConversationPanelComponent, ChatInputComponent]
})
export class ChatPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
