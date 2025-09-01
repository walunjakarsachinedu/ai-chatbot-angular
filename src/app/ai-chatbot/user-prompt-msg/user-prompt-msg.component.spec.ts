/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserPromptMsgComponent } from './user-prompt-msg.component';

describe('UserPromptMsgComponent', () => {
  let component: UserPromptMsgComponent;
  let fixture: ComponentFixture<UserPromptMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPromptMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPromptMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
