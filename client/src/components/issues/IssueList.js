import React from 'react'
import Issues from './Issues.js'

export default function IssueList(props){
  const { issues } = props

  return (
    <div className="todo-list">
      { issues.map(issue => <Issues {...issue} key={issue._id} />)}

    </div>
  )
}