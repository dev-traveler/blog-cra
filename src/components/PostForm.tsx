import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'firebaseApp';
import { toast } from 'react-toastify';

import { Post } from 'interfaces/Post';
import { CATEGORIES, Category } from 'interfaces/Category';

export const getCurrentFormattedDate = () => {
  return new Date().toLocaleDateString('ko', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

function PostForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Frontend');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const [post, setPost] = useState<Post | null>(null);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === 'content') setContent(value);
    if (name === 'category') setCategory(value as Category);
    if (name === 'summary') setSummary(value);
    if (name === 'title') setTitle(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post) {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          title,
          category,
          summary,
          content,
          updatedAt: getCurrentFormattedDate(),
        });

        toast.success('게시물이 성공적으로 수정되었습니다.');
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, 'posts'), {
          uid: auth.currentUser?.uid,
          title,
          category,
          summary,
          content,
          createdAt: getCurrentFormattedDate(),
          email: auth.currentUser?.email,
          comments: [],
        });

        toast.success('게시물이 성공적으로 작성되었습니다.');
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const getPost = async (id: string) => {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);

    setPost({ ...docSnap.data(), id: docSnap.id } as Post);
  };

  useEffect(() => {
    if (params.id) getPost(params.id);
  }, [params.id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setSummary(post.summary);
      setContent(post.content);
    }
  }, [post]);

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
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={category}
        >
          <option value="">카테고리를 선택해주세요</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
        <input
          type="submit"
          value={post ? '수정' : '제출'}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
}

export default PostForm;
