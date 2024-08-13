import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'firebaseApp';

import { Post } from './PostList';

function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);

  const getPost = async (id: string) => {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);

    setPost({ ...docSnap.data(), id: docSnap.id } as Post);
  };

  const handleDelete = () => {
    console.log('delete');
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
                <div
                  role="presentation"
                  className="post__delete"
                  onClick={handleDelete}
                >
                  삭제
                </div>
                <div className="post__edit">
                  <Link to="/posts/edit/1">수정</Link>
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
