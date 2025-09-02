// UI & Navigation
export type KeyboardShortcut = {
  key: string;             // e.g. "ctrl+k"
  action: string;          // e.g. "searchChats"
  description?: string;
};

export type UiNavigation = {
  shortcuts: KeyboardShortcut[];
};

// Chat History & Management
export type ChatMetadata = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  pinned: boolean;
};

export type ChatHistory = {
  chats: ChatMetadata[];
};

// Chat Tree & Prompt Handling
export type ChatNode = {
  id: string;
  parentId?: string;
  prompt: string;
  response: string;
  createdAt: Date;
  selectedChild?: number;
  children?: ChatNode[];
};


// Chat Interaction
export type StreamingResponse = {
  messageId: string;
  content: string;
  isStreaming: boolean;
};

export type AttachedDocument = {
  id: string;
  name: string;
  type: string;
  url: string;
};

export type ChatInteraction = {
  responses: StreamingResponse[];
  attachments: AttachedDocument[];
};

// Customization
export type Persona = {
  id: string;
  name: string;
  behaviorDescription?: string;
};

export type Customization = {
  personas: Persona[];
  defaultPersonaId?: string;
  activePersonaId?: string;
  timeStamp?: number;
};

// Root type
export type ChatApp = {
  ui: UiNavigation;
  history: ChatHistory;
  tree: ChatNode;
  interaction: ChatInteraction;
  customization: Customization;
};
