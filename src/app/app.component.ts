import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AiChatbotModule } from './ai-chatbot/ai-chatbot.module';

@Component({
  selector: 'app-root',
  imports: [AiChatbotModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ai-chatbot-angular ';
}
 