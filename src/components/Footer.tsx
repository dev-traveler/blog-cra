import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsSun, BsMoonFill } from 'react-icons/bs';
import { ThemeContext } from 'context/ThemeContext';

function Footer() {
  const context = useContext(ThemeContext);

  return (
    <footer>
      <Link to="/posts/new">글쓰기</Link>
      <Link to="/posts">게시글</Link>
      <Link to="/profile">프로필</Link>
      {context.theme === 'light' ? (
        <BsSun className="footer__theme-btn" onClick={context.toggleTheme} />
      ) : (
        <BsMoonFill
          className="footer__theme-btn"
          onClick={context.toggleTheme}
        />
      )}
    </footer>
  );
}

export default Footer;
