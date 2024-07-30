export interface users {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: boolean;
  avatar: string;
}

export interface post {
  content: string;
  img: string[];
  reactions: [];
  userId: number;
  date: string;
  id: number;
}
