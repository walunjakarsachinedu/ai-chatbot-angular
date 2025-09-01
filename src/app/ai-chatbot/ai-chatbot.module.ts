import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ConversationPanelComponent } from './conversation-panel/conversation-panel.component';
import { PersonasComponent } from './personas/personas.component';
import { ChatMsgComponent } from './chat-msg/chat-msg.component';
import { ChatSettingsComponent } from './chat-settings/chat-settings.component';
import { UserPromptMsgComponent } from './user-prompt-msg/user-prompt-msg.component';
import { UserResponseMsgComponent } from './user-response-msg/user-response-msg.component';

@NgModule({
  imports: [
    CommonModule,
    ChatPageComponent,
    ChatInputComponent,
    ChatHistoryComponent,
    ChatMsgComponent,
    ConversationPanelComponent,
    PersonasComponent,
    ChatSettingsComponent,
    UserPromptMsgComponent,
    UserResponseMsgComponent
  ],
  declarations: [
  ],
  exports: [ ChatPageComponent ]
})
export class AiChatbotModule { }
