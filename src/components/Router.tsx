import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import PostlistPage from '../pages/posts';
import PostDetailPage from '../pages/posts/detail';
import NewPostPage from '../pages/posts/new';
import EditPostPage from '../pages/posts/edit';
import ProfilePage from '../pages/profile';
import LoginPage from '../pages/login';
import SignUpPage from '../pages/signup';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostlistPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/posts/new" element={<NewPostPage />} />
      <Route path="/posts/edit/:id" element={<EditPostPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default Router;
