export class ChecklistItem {
    count: number;
    title: string;
    content: ChecklistItem[] | string;
  
    constructor(count: number, title: string, content: ChecklistItem[] | string) {
      this.count = count;
      this.title = title;
      this.content = content;
    }
  }