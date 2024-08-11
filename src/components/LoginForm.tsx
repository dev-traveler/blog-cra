import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebaseApp';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginForm() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password') {
      setPassword(value);

      if (value.length < 8) {
        setError('비밀번호는 8자 이상이어야 합니다.');
      } else {
        setError('');
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success('로그인에 성공했습니다.');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={onChange}
        />
      </div>

      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={onChange}
        />
      </div>

      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>

      <div className="form__block">
        <input
          type="submit"
          value="로그인"
          className="form__btn--submit"
          disabled={error.length > 0}
        />
      </div>
    </form>
  );
}

export default LoginForm;
