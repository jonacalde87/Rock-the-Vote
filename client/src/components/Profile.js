import React, { useContext } from 'react'
import IssueForm from './issues/IssueForm.js'
import IssueList from './issues/IssueList.js'
// import Issues from './issues/Issues.js'
import { UserContext } from '../context/UserProvider.js'


export default function Profile(){
  const { 
    user: {
      username 
    },
    addIssue,
    issues
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add An Issue</h3>
      <IssueForm addIssue={addIssue} />
      <h3>Your Issues</h3>
      <IssueList issues={issues} />
    </div>
  )
}