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

export interface Student {
  user_id: string;
  full_name: string;
  student_code: string;
  is_leader: boolean;
  avatarUrl?: string;
}

export interface Group {
  id: string;
  name: string;
  leader_id: string;
  description?: string;
  members: Student[];
  coverImage?: string;
}