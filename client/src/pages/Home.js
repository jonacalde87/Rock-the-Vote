import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import { useNavigate, Routes, Route } from 'react-router-dom';

const userInputs = { username: '', password: '' };
const initSignUpInputs = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  firstname: '',
  lastname: '',
};

export default function Home(props) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(userInputs);
  const [signUpInputs, setSignUpInputs] = useState(initSignUpInputs);
  const { signup, login, errMsg } = props;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignUpInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{ marginBottom: '30px' }}>
        <h1>Welcome to Rock The Vote App</h1>
        <button className='login-btn' onClick={() => navigate('/login')}>
          Login
        </button>
        <button className='sign-btn' onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
      <div>
        <Routes>
          <Route
            path="login"
            element={
              <Login
                handleLoginChange={handleLoginChange}
                inputs={inputs}
                login={login}
                errMsg={errMsg}
              />
            }
          />
          <Route
            path="signup"
            element={
              <Signup
                handleSignupChange={handleSignupChange}
                signUpInputs={signUpInputs}
                signup={signup}
                errMsg={errMsg}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}