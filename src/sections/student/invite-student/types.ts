export interface User {
  id: string;
  full_name: string;
  student_code: string;
  avatar_url: string;
}

export interface Group {
  id: string;
  name: string;
}

export interface Invite {
  id: string;
  status: number; // Consider using enum for better readability
  sender: User;
  receiver: User;
  group: Group;
}

export interface InviteResponse {
  received_invites: Invite[];
  sent_invites: Invite[];
}
