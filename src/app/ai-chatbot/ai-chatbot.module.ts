import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatSettingsComponent } from './chat-settings/chat-settings.component';
import { PersonasComponent } from './personas/personas.component';

@NgModule({
  imports: [
    CommonModule,
    ChatPageComponent,
    ChatHistoryComponent,
    PersonasComponent,
    ChatSettingsComponent,
  ],
  declarations: [
  ],
  exports: [ ChatPageComponent ]
})
export class AiChatbotModule { }
