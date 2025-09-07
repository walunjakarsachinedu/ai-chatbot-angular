import { Component, Input } from "@angular/core";

@Component({
  selector: "dialog",
  template: `
    @if (isOpen) {
      <div class="backdrop"></div>
      <div class="center" (click)="onBackdropClick($event)">
        <div class="dialog" (click)="$event.stopPropagation()">
          <div class="header">
            <div>{{ title }}</div>
            <i class="bi bi-x-circle text-dark" (click)="closeDialog()"></i>
          </div>
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
})
export class Dialog {
  @Input() title: string = "";
  @Input() closeOnClickOutside: boolean = false;

  isOpen: boolean = false;

  openDialog() {
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
  }

  onBackdropClick(event: MouseEvent) {
    if (this.closeOnClickOutside) {
      this.closeDialog();
    }
  }
}