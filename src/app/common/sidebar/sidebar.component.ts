import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "sidebar",
  template: `
    <div class="sidebar-slider" [class.sidebar-slide-in]="sidebarShow">
      <div class="sidebar-close" (click)="toggleSidebar()">
        <i class="bi bi-x-circle text-dark"></i>
      </div>
      <div class="sidebar-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ["./sidebar.component.scss"]
})
export class Sidebar {
  @Input() protected sidebarShow: boolean = false;
  @Output() protected sidebarShowChange = new EventEmitter<boolean>();

  showSidebar(): void {
    this.sidebarShow = true;
    this.sidebarShowChange.emit(this.sidebarShow);
  }

  closeSidebar(): void {
    this.sidebarShow = false;
    this.sidebarShowChange.emit(this.sidebarShow);
  }

  toggleSidebar(): void {
    this.sidebarShow = !this.sidebarShow;
    this.sidebarShowChange.emit(this.sidebarShow);
  }
}