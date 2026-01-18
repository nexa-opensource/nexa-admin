export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}
