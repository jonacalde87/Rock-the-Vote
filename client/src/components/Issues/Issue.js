import React from 'react';

export default function Issue(props) {
  const { title, description, upVotes, downVotes, datecreated, user } = props

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{textDecoration:'underline', margin:'0'}}>{title}</h2>
      <p>{description}</p>
      <h3>Upvotes : {upVotes.length}</h3>
      <h3>Downvotes : {downVotes.length}</h3>
      <p>Posted By : {user.username}</p>
      <p>Posted On : {new Date(datecreated).toLocaleDateString()}</p>
    </div>
  );
}