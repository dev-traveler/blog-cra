import { Category } from './Category';
import { Comment } from './Comment';

export interface Post {
  id: string;
  uid: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  comments: Comment[];
}
