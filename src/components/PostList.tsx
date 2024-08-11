import { Link } from 'react-router-dom';

function PostList() {
  return (
    <>
      <div className="post__list">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">dev_traveler</div>
                <div className="post__date">2024.8.11 일요일</div>
              </div>
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                dolore vero aut amet exercitationem! Sapiente delectus, officia
                vero quam tenetur nemo iure reiciendis ipsa in cupiditate
                veritatis, dolores laborum minima. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ratione dolore vero aut amet
                exercitationem! Sapiente delectus, officia vero quam tenetur
                nemo iure reiciendis ipsa in cupiditate veritatis, dolores
                laborum minima. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ratione dolore vero aut amet exercitationem!
                Sapiente delectus, officia vero quam tenetur nemo iure
                reiciendis ipsa in cupiditate veritatis, dolores laborum minima.
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default PostList;
