import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from 'firebaseApp';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Post } from 'interfaces/Post';
import { CATEGORIES } from 'interfaces/Category';
import { PostTab } from 'interfaces/PostTab';

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: PostTab;
}

function PostList({
  hasNavigation = false,
  defaultTab = 'all',
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<PostTab>(defaultTab);
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    setPosts([]);

    const postsRef = collection(db, 'posts');
    let postsQuery;

    if (activeTab === 'all') {
      postsQuery = query(postsRef, orderBy('createdAt', 'asc'));
    } else if (activeTab === 'my') {
      postsQuery = query(
        postsRef,
        where('uid', '==', auth.currentUser?.uid),
        orderBy('createdAt', 'asc'),
      );
    } else {
      // 카테고리별로 게시글을 가져오기 위한 쿼리
      postsQuery = query(
        postsRef,
        where('category', '==', activeTab),
        orderBy('createdAt', 'asc'),
      );
    }

    const data = await getDocs(postsQuery);
    data.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id } as Post;
      setPosts((prev) => [...prev, dataObj]);
    });
  };

  const handleDelete = async (postId: string) => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');

    if (confirm) {
      await deleteDoc(doc(db, 'posts', postId));
      toast.success('게시물이 성공적으로 삭제되었습니다.');
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            className={activeTab === 'all' ? 'post__navigation--active' : ''}
            onClick={() => setActiveTab('all')}
          >
            전체
          </div>
          <div
            role="presentation"
            className={activeTab === 'my' ? 'post__navigation--active' : ''}
            onClick={() => setActiveTab('my')}
          >
            나의 글
          </div>
          {CATEGORIES.map((category) => (
            <div
              key={category}
              role="presentation"
              className={
                activeTab === category ? 'post__navigation--active' : ''
              }
              onClick={() => setActiveTab(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
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
                  <div
                    role="presentation"
                    className="post__delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    삭제
                  </div>
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
