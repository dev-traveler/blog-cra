import { signOut } from 'firebase/auth';
import { auth } from 'firebaseApp';
import { toast } from 'react-toastify';

function Profile() {
  const handleClickSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('로그아웃 되었습니다.');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        console.error(e);
      }
    }
  };

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
      <div
        role="presentation"
        className="profile__logout"
        onClick={handleClickSignOut}
      >
        로그아웃
      </div>
    </div>
  );
}

export default Profile;
