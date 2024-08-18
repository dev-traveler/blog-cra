import { useState } from 'react';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'firebaseApp';
import { toast } from 'react-toastify';

import { Post } from 'interfaces/Post';
import { Comment } from 'interfaces/Comment';
import { getCurrentFormattedDate } from './PostForm';

interface CommentProps {
  post: Post;
  getPost: () => Promise<void>;
}

export default function Comments({ post, getPost }: CommentProps) {
  const [comment, setComment] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const postRef = doc(db, 'posts', post.id);
      const commentObj = {
        content: comment,
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        createdAt: getCurrentFormattedDate(),
      };

      await updateDoc(postRef, {
        comments: arrayUnion(commentObj),
        updatedAt: getCurrentFormattedDate(),
      });
      await getPost();

      toast.success('댓글이 성공적으로 작성되었습니다.');
      setComment('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleDelete = async (data: Comment) => {
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      const postRef = doc(db, 'posts', post.id);

      await updateDoc(postRef, {
        comments: arrayRemove(data),
        updatedAt: getCurrentFormattedDate(),
      });
      await getPost();

      toast.success('댓글이 성공적으로 삭제되었습니다.');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={onSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          />
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comments__list">
        {post.comments
          .slice(0)
          .reverse()
          .map((comment) => (
            <div key={comment.createdAt} className="comment__box">
              <div className="comment__profile-box">
                <div className="comment__email">{comment.email}</div>
                <div className="comment__date">{comment.createdAt}</div>
                {comment.uid === auth.currentUser?.uid && (
                  <div
                    className="comment__delete"
                    onClick={() => handleDelete(comment)}
                  >
                    삭제
                  </div>
                )}
              </div>
              <div className="comment__text">{comment.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
