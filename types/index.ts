export interface Thread {
  id: string;
  author: {
    name: string;
    photoURL: string;
  };
  message: string;
  createdAt: Date;
  upvotes: number;
  replies: Thread[];
}

export type ThreadCreateDto = Partial<Thread> &
  Required<Pick<Thread, 'author' | 'message'>>;
