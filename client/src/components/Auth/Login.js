import React from 'react';
import {  TextField, Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const { handleLoginChange, inputs, login, errMsg } = props;
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(inputs);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      margin: '0 auto',
    }}>
      <p style={{color:"red"}}>{errMsg}</p>

      <TextField
        label="Username"
        name="username"
        required
        value={inputs.username}
        onChange={handleLoginChange}
      />
      <TextField
        label="Password"
        name="password"
        required
        type="password"
        value={inputs.password}
        onChange={handleLoginChange}
      />
      <ButtonGroup 
        variant="contained"
        style={{ display: 'flex', flexDirection: 'column', gap:'5px', marginTop:'5px' }}>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={() => navigate('/signup')}>
            Not a member? Sign up here
          </Button>
      </ButtonGroup>
    </div>
  );
}