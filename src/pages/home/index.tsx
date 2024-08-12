import Header from 'components/Header';
import PostNavigation from 'components/PostNavigation';
import PostList from 'components/PostList';
import Footer from 'components/Footer';
import Carousel from 'components/Carousel';

function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <PostNavigation />
      <PostList />
      <Footer />
    </div>
  );
}

export default Home;
