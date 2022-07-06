import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Save } from '@mui/icons-material';

const initCommentInput = {
  comment: '',
};

export default function AddCommentForm(props) {
  const { issueId, userAxios, setComments } = props;
  const [commentInput, setCommentInput] = useState(initCommentInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (id) => {
    try {
      const response = await userAxios.post(
        `/api/issues/comments/${id}/comments`,
        commentInput
      );
      setCommentInput(initCommentInput);
      setComments((prevState) => [...prevState, response.data]);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div >
      <TextField
        label="Add Comments"
        multiline
        name="comment"
        helperText={`${commentInput.comment.length}/500`}
        value={commentInput.comment}
        onChange={handleChange}
      />
      <Button
      startIcon={<Save />}
        variant="contained"
        size="small"
        onClick={() => handleSubmit(issueId)}
      >
        Submit Comment
      </Button>
    </div>
  );
}