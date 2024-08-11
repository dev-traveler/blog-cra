import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebaseApp';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignupForm() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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
      } else if (passwordConfirm !== '' && passwordConfirm !== value) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password_confirm') {
      setPasswordConfirm(value);

      if (value.length < 8) {
        setError('비밀번호는 8자 이상이어야 합니다.');
      } else if (password !== value) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        setError('');
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success('회원가입이 완료되었습니다.');
      navigate('/');
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
      <h1 className="form__title">회원가입</h1>
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

      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          value={passwordConfirm}
          onChange={onChange}
        />
      </div>

      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>

      <div className="form__block">
        <input
          type="submit"
          value="회원가입"
          className="form__btn--submit"
          disabled={error.length > 0}
        />
      </div>
    </form>
  );
}

export default SignupForm;
