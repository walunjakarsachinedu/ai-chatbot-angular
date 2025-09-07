import { Component, ViewChild } from "@angular/core";
import { ChatHistoryComponent } from "../chat-history/chat-history.component";
import { PersonasComponent } from "../personas/personas.component";
import { Sidebar } from "../../common/sidebar/sidebar.component";

@Component({
  selector: "chat-sidebar",
  imports: [Sidebar, ChatHistoryComponent],
  template: `
    <sidebar #sidebarRef>
      <div style="max-height: 500px; overflow-y: auto;">
        <chat-history (onChatSelect)="sidebarRef.closeSidebar()"></chat-history>
      </div>
      <!-- <br><br>
      <personas></personas> -->
    </sidebar>
  `
})
export class ChatSidebar {
  @ViewChild(Sidebar) sidebarRef!: Sidebar;
}