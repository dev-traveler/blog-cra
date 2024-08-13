import Header from 'components/Header';
import PostList from 'components/PostList';
import Footer from 'components/Footer';
import Carousel from 'components/Carousel';

function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <PostList hasNavigation />
      <Footer />
    </div>
  );
}

export default Home;
