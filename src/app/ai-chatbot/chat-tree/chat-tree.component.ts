import { Component, Input, OnInit } from '@angular/core';
import { ChatNode } from '../models/type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-tree',
  templateUrl: './chat-tree.component.html',
  styleUrls: ['./chat-tree.component.css'],
  imports: [CommonModule]
})
export class ChatTreeComponent implements OnInit {
  @Input() chatNode?: ChatNode;

  constructor() { }

  ngOnInit() {
  }

}
