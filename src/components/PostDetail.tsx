import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'firebaseApp';
import { toast } from 'react-toastify';

import { Post } from 'interfaces/Post';

function PostDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);

  const getPost = async (id: string) => {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);

    setPost({ ...docSnap.data(), id: docSnap.id } as Post);
  };

  const handleDelete = async () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');

    if (confirm && post) {
      await deleteDoc(doc(db, 'posts', post.id));
      toast.success('게시물이 성공적으로 삭제되었습니다.');
      navigate('/');
    }
  };

  useEffect(() => {
    if (params.id) getPost(params.id);
  }, [params.id]);

  return (
    <>
      <div className="post__detail">
        {post === null ? null : (
          <div className="post__box">
            <div className="post__title">{post.title}</div>
            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">{post.email}</div>
              <div className="post__date">{post.createdAt}</div>
            </div>

            {post.email === auth.currentUser?.email && (
              <div className="post__utils-box">
                {post.category && (
                  <div className="post__category">{post.category}</div>
                )}
                <div
                  role="presentation"
                  className="post__delete"
                  onClick={handleDelete}
                >
                  삭제
                </div>
                <div className="post__edit">
                  <Link to={`/posts/edit/${post.id}`}>수정</Link>
                </div>
              </div>
            )}

            <div className="post__text post__text--pre-wrap">
              {post.content}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetail;
