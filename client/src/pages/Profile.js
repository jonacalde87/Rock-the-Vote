import React, { useState } from 'react';
import AddIssueForm from '../components/Issues/AddIssueForm';
import UserIssues from '../components/Issues/UserIssues';
import { Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const ButtonSx = {
  marginTop: '40px',
  marginBottom: '40px'
  
};

export default function Profile(props) {
  const {
    user,
    addIssue,
    deleteIssue,
    userIssues,
    editIssue,
    getMyIssues
  } = props;

  const [toggleIssue, setToggleIssue] = useState(false);

  return (
    <div sx={{ textAlign: 'center' }}>
      <h1 style={{textAlign: 'center'}}>Welcome {user.firstname}!!</h1> 
      <div style={{ marginTop: '40px' }}>
        <AddIssueForm addIssue={addIssue} />
      </div>
      
      <Button
        startIcon={!toggleIssue ? <Add /> : <Remove />}
        sx={ButtonSx}
        variant="contained"
        size="small"
        onClick={() => setToggleIssue((prevState) => !prevState)}
      >
        {!toggleIssue ? 'Show Issues' : 'Hide Issues'}
      </Button>
      {toggleIssue && (
        <div sx={{ textAlign: 'left' }}>
          <UserIssues
            deleteIssue={deleteIssue}
            userIssues={userIssues}
            editIssue={editIssue}
            getMyIssues={getMyIssues}
            user={user}
            
          />
        </div>
      )}
    </div>
  );
}