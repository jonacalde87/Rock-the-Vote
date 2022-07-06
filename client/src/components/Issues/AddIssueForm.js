import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const initIssueInputs = {
  title: '',
  description: '',
};

const ButtonSx = {
  width: '300px',
  margin: '0 auto',
  marginTop: '10px'
};

export default function AddIssueForm(props) {
  const { addIssue } = props;
  const [issueInputs, setIssueInputs] = useState(initIssueInputs);
  const [descriptionRows] = useState(10);

  const AddIssueFormSx = {  
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '0 auto'
  };

  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setIssueInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitIssue = (e) => {
    e.preventDefault();
    addIssue(issueInputs);
    setIssueInputs(initIssueInputs);
  };

  return (
    <div style={AddIssueFormSx}>

      <h3 style={{textAlign:'center'}}>Submit Issue Form</h3>
      <TextField
        label="Title"
        name="title"
        value={issueInputs.title}
        onChange={handleIssueChange}
        helperText={`${issueInputs.title.length}/30`}
      />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={descriptionRows}
        value={issueInputs.description}
        onChange={handleIssueChange}
        helperText={`${issueInputs.description.length}/1000`}
      />
      <Button
        variant="contained"
        size="small"
        onClick={handleSubmitIssue}
        sx={ButtonSx}
      >
        Submit Issue
      </Button>
    </div>
  );
}