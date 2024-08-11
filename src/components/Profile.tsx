import { auth } from 'firebaseApp';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">{auth.currentUser?.email}</div>
          <div className="profile__name">
            {auth.currentUser?.displayName || '익명의 사용자'}
          </div>
        </div>
      </div>
      <Link to="/" className="profile__logout">
        로그아웃
      </Link>
    </div>
  );
}

export default Profile;
