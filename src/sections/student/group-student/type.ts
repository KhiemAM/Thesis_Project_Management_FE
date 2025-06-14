
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