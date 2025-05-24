export interface Message {
  id: string;
  type: 'text' | 'image';
  content: string[];
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  dueDate: string | null;
  createdAt: string;
  message: Message[];
}