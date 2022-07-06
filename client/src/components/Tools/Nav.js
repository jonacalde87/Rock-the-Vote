import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import { Home, AccountCircle, Public, LogoutRounded } from '@mui/icons-material';

export default function Nav(props) {
  const { logout, token } = props;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigate = useNavigate();

  return (
    <div style={{
        display: 'flex',
        flexDirection:'row',
        marginBottom: '100px',
        backgroundColor: '#a6c1ed',
        padding: '10px',
        borderRadius: '5px', 
      }}
    >
      <div style={{ marginRight: 'auto' }}>
        <Button
          startIcon={<Home />}
          variant="contained"
          size="small"
          onClick={() => navigate('/')}
        >
          Home
        </Button>
      </div>

      <div>
        <ButtonGroup variant="contained">
          {token && (
            <Button
              startIcon={<AccountCircle />}
              size="small"
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
          )}
          {token && (
            <Button
              startIcon={<Public />}
              size="small"
              onClick={() => navigate('/public')}
            >
              Public
            </Button>
          )}
          {token && (
            <Button
              startIcon={<LogoutRounded />}
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
}