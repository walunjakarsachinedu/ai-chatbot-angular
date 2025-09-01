import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
  @ViewChild("")
  prompt: string = "";

  constructor() { }

  ngOnInit() {
  }


  onChange(event: any) {
    console.log(event);
  }
}
