import Header from '../../components/Header';
import PostNavigation from '../../components/PostNavigation';
import PostList from '../../components/PostList';
import Footer from '../../components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <PostNavigation />
      <PostList />
      <Footer />
    </div>
  );
}

export default Home;
