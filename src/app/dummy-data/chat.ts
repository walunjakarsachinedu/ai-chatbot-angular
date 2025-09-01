import { ChatNode } from "../ai-chatbot/models/type";

const dummyChat: ChatNode = {
  id: "1",
  prompt: "What is Git?",
  response: "Git is a distributed version control system.",
  createdAt: new Date(),
  selectedChild: 0,
  children: [
    {
      id: "2",
      parentId: "1",
      prompt: "How do I check my Git username?",
      response: "You can run `git config user.name`.",
      createdAt: new Date(),
      selectedChild: 0,
      children: [
        {
          id: "3",
          parentId: "2",
          prompt: "And how do I check my email?",
          response: "Use `git config user.email`.",
          createdAt: new Date(),
          selectedChild: 0,
          children: [
            {
              id: "4",
              parentId: "3",
              prompt: "How can I change email for current project?",
              response: "Run `git config --local user.email \"your@email.com\"`.",
              createdAt: new Date(),
              children: []
            }
          ]
        }
      ]
    }
  ]
};

export { dummyChat };