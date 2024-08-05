export interface users {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: boolean;
  avatar: string;
  banner: string;
  friends: FriendType[];
  notyfi: notyfiType[];
}
type FriendType = {
  userId: number;
  status: "pending" | "accept" | "blocked";
  add_at: string;
};
type notyfiType = {
  userId: number;
  content: string;
  date: string;
};
export interface post {
  content: string;
  img: string[];
  reactions: [];
  userId: number;
  date: string;
  id: number;
}
