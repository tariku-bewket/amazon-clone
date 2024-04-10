import React, { useState, useContext } from 'react';
import classes from './signup.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowRight } from 'react-icons/md';
import { auth } from '../../utility/firebase';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../utility/action.type';
import { ClipLoader } from 'react-spinners';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name == 'signin') {
      //firebase auth
      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || '/');
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || '/');
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.signin}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.signin__container}>
        <h1>Sign in</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: '5px',
              textAlign: 'center',
              color: 'red',
              fontWeight: 'bold',
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.signin__button}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              'Continue'
            )}
          </button>

          {/* Agreement */}
          <p className={classes.signin__agreement}>
            By continuing, you agree to Amazon's{' '}
            <span>
              <Link>Conditions of Use</Link>
            </span>{' '}
            and{' '}
            <span>
              <Link>Privacy Notice</Link>
            </span>
            .
          </p>

          <p className={classes.signin__help}>
            <MdOutlineArrowRight />
            <Link>Need help?</Link>
          </p>
          <div className={classes.hr__line}></div>

          <p>Buying for work?</p>
          <Link>Shop on Amazon Business</Link>
        </form>
      </div>
      <div className={classes.create__account__container}>
        <span className={classes.new__to_amazon}>New to Amazon?</span>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.create__account__button}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            'Create your Amazon account'
          )}
        </button>

        {error && (
          <small style={{ marginTop: '10px', color: 'red' }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
