import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from 'firebaseApp';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface Post {
  id: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    const data = await getDocs(collection(db, 'posts'));

    data.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id } as Post;
      setPosts((prev) => [...prev, dataObj]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="post__list">
        {posts.length === 0 ? (
          <div className="post__no-post">게시글이 없습니다.</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post__box">
              <Link to={`/posts/${post.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post.email}</div>
                  <div className="post__date">{post.createdAt}</div>
                </div>
                <div className="post__title">{post.title}</div>
                <div className="post__text">{post.summary}</div>
              </Link>

              {post.email === auth.currentUser?.email && (
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <Link to={`/posts/edit/${post.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PostList;
