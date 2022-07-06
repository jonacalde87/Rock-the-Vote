import React, { useState, useEffect } from 'react';
import AddCommentForm from '../components/Comments/AddCommentForm';
import EditCommentForm from '../components/Comments/EditCommentForm';
import Votes from '../components/Tools/Votes'
import { IconButton, Button, ButtonGroup } from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  ModeComment,
  AddComment,
  Close,
  Edit,
  Delete,
} from '@mui/icons-material';

const CommentSx = {
  marginTop: '10px',
  marginLeft: '30px',
};


export default function Public(props) {
  const { userAxios, user } = props;
  const [allIssues, setAllIssues] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggleComments, setToggleComments] = useState(null);
  const [toggleAddCommentForm, setAddToggleCommentForm] = useState(null);
  const [toggleEditCommentForm, setToggleEditCommentForm] = useState(null);

  const getAllIssues = async () => {
    const response = await userAxios.get(
      '/api/issues'
    );
    setAllIssues(response.data);
  };

  const handleUpvote = async (id) => {
    try {
      const response = await userAxios.put(
        `/api/issues/${id}/upvote`
      );
      setAllIssues(
        allIssues.map((issue) => (issue._id === id ? response.data : issue))
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDownvote = async (id) => {
    try {
      const response = await userAxios.put(
        `/api/issues/${id}/downvote`
      );
      setAllIssues(
        allIssues.map((issue) => (issue._id === id ? response.data : issue))
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleNoVote = async (id) => {
    try {
      const response = await userAxios.put(
        `/api/issues/${id}/novote`
      );
      setAllIssues(
        allIssues.map((issue) => (issue._id === id ? response.data : issue))
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const getComments = async (id) => {
    try {
      const response = await userAxios.get(
        `/api/issues/comments/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteComment = async (id, commentId) => {
    try {
      const response = await userAxios.delete(
        `/api/issues/comments/${id}/comments/${commentId}`
      );
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? response.data : comment
        )
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleToggleComments = (id) => {
    getComments(id);
    setToggleComments(id);
  };

  useEffect(() => {
    getAllIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIssues.length]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Welcome To Rock The Vote</h1>
      <Votes setAllIssues={setAllIssues} allIssues={allIssues} />
      {allIssues.map((issue) => (
        <div
          key={issue._id}
          style={{
            marginBottom: '20px',
            padding: '20px',
            backgroundColor: '#a6c1ed',
            borderRadius: '20px',
          }}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 'auto' }}>
              <h2 style={{ textDecoration: 'underline' }}>{issue.title}</h2>
              <p>{issue.description}</p>
            </div>
            <h3>{new Date(issue.datecreated).toLocaleDateString()}</h3>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <IconButton onClick={issue.upVotes.includes(user._id)
                ? () => handleNoVote(issue._id)
                : () => handleUpvote(issue._id)
              }
              >
                <ThumbUp color="success" />
              </IconButton>
              <h4 style={{ margin: '0' }}>{issue.upVotes.length}</h4>
            </div>

            <div style={{ padding: '10px', textAlign: 'center' }}>
              <IconButton
                onClick={
                  issue.downVotes.includes(user._id)
                    ? () => handleNoVote(issue._id)
                    : () => handleDownvote(issue._id)
                }
              >
                <ThumbDown color="error" />
              </IconButton>
              <h4 style={{ margin: '0' }}>{issue.downVotes.length}</h4>
            </div>
          </div>

          <>
            <ButtonGroup variant="contained" size="small">
              <Button
                startIcon={<ModeComment />}
                onClick={
                  toggleComments !== issue._id
                    ? () => {
                      handleToggleComments(issue._id);
                    }
                    : () => setToggleComments(null)
                }
              >
                Comments
              </Button>

              <Button
                startIcon={
                  toggleAddCommentForm === issue._id ? (
                    <Close />
                  ) : (
                    <AddComment />
                  )
                }
                onClick={
                  toggleAddCommentForm !== issue._id
                    ? () => setAddToggleCommentForm(issue._id)
                    : () => setAddToggleCommentForm(null)
                }
              >
                {toggleAddCommentForm === issue._id ? 'Close' : 'Add Comment'}
              </Button>
            </ButtonGroup>

            {toggleAddCommentForm === issue._id && (
              <div style={{ marginBottom: '20px' }}>
                <AddCommentForm
                  issueId={issue._id}
                  userAxios={userAxios}
                  setComments={setComments}
                />
              </div>
            )}
            {toggleComments === issue._id && (
              <div>
                {comments.map((comment) => (
                  <div key={comment._id} sx={CommentSx}>
                    <p>{comment.comment}</p>
                    {toggleEditCommentForm === comment._id && (
                      <EditCommentForm
                        userAxios={userAxios}
                        {...comment}
                        issueId={issue._id}
                        setComments={setComments}
                        setToggleEditCommentForm={setToggleEditCommentForm}
                      />
                    )}
                    {comment.user === user._id && (
                      <ButtonGroup variant="contained" size="small">
                        <Button
                          startIcon={<Edit />}
                          onClick={
                            toggleEditCommentForm === comment._id
                              ? () => setToggleEditCommentForm(null)
                              : () => setToggleEditCommentForm(comment._id)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          startIcon={<Delete />}
                          color="error"
                          onClick={() =>
                            handleDeleteComment(issue._id, comment._id)
                          }
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      ))}
    </>
  );
}