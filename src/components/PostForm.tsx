import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from 'firebaseApp';
import { toast } from 'react-toastify';

function PostForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'content') setContent(value);
    if (name === 'summary') setSummary(value);
    if (name === 'title') setTitle(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        summary,
        content,
        createdAt: new Date().toLocaleDateString(),
        email: auth.currentUser?.email,
      });

      toast.success('게시물이 성공적으로 작성되었습니다.');
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          onChange={onChange}
        />
      </div>

      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          value={summary}
          onChange={onChange}
        />
      </div>

      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={onChange}
        />
      </div>

      <div className="form__block">
        <input type="submit" value="제출" className="form__btn--submit" />
      </div>
    </form>
  );
}

export default PostForm;
