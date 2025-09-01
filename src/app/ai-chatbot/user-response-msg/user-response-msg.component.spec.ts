/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserResponseMsgComponent } from './user-response-msg.component';

describe('UserResponseMsgComponent', () => {
  let component: UserResponseMsgComponent;
  let fixture: ComponentFixture<UserResponseMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResponseMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResponseMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
