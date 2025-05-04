export interface Student {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  type: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: Student[];
  coverImage?: string;
}