import { Component } from '@angular/core';
import { AiChatbotModule } from './ai-chatbot/ai-chatbot.module';
import 'deep-chat';


@Component({
  selector: 'app-root',
  imports: [AiChatbotModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ai-chatbot-angular ';
}
 