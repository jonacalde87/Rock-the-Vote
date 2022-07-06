import React, { useState, useEffect } from 'react';
import Issue from './Issue';
import EditForm from './EditIssueForm';

export default function UserIssues(props) {
  const { userIssues, deleteIssue, editIssue, getMyIssues, user } = props;
  const [editId, setEditId] = useState(null);
  const [issueElement, setIssueElement] = useState();

  const toggleEdit = (id) => {
    setEditId(id);
    const issue = userIssues.find((issue) => issue._id === id);
    setIssueElement(issue);
  };

  const toggleSave = (id, issueElement) => {
    setEditId(null);
    editIssue(id, issueElement);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueElement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getMyIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {userIssues.map((issue) => (
        <div
          key={issue._id}
          style={{
            margin: '20px',
            padding: '10px',
            backgroundColor: '#a6c1ed',
            border: 'solid 1px black',
            borderRadius: '10px',
          }}
        >
          <Issue key={issue._id} {...issue} user={user} />
          <EditForm
            {...issue}
            toggleEdit={toggleEdit}
            toggleSave={toggleSave}
            handleChange={handleChange}
            editId={editId}
            issueElement={issueElement}
            deleteIssue={deleteIssue}
          />
        </div>
      ))}
    </div>
  );
}