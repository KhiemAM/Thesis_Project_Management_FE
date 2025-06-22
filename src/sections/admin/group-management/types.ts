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
  thesis_id: string;
}

export interface Task {
  title: string;
  description: string;
  due_date: string; // hoặc `Date` nếu bạn sẽ xử lý nó dưới dạng đối tượng Date trong code
  status: string; // bạn có thể dùng enum nếu muốn rõ nghĩa hơn
  priority: string; // tương tự, có thể dùng enum
  id: string;
  mission_id: string;
  comments: Message[]; // có thể thay `any` bằng kiểu rõ ràng nếu biết cấu trúc comment
  priority_text: string;
}