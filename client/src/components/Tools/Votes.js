import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { ArrowCircleDownTwoTone, ArrowCircleUpTwoTone } from '@mui/icons-material'; //for pretty icons

export default function FunctionsBar(props) {
  const { allIssues, setAllIssues } = props;

  const sortIssuesUp = (issues) => {
    const sortedIssues = issues.sort((a, b) => {
      if (a.upVotes.length > b.upVotes.length) {
        return -1;
      }
      if (a.upVotes.length < b.upVotes.length) {
        return 1;
      }
      return 0;
    });
    setAllIssues(sortedIssues.map((issue) => issue));
  };

  const sortIssuesDown = (issues) => {
    const sortedIssues = issues.sort((a, b) => {
      if (a.downVotes.length > b.downVotes.length) {
        return -1;
      }
      if (a.downVotes.length < b.downVotes.length) {
        return 1;
      }
      return 0;
    });
    setAllIssues(sortedIssues.map((issue) => issue));
  };

  return (
    <div style={{ display: 'block', textAlign: 'center', margin: '10px' }}>
      <ButtonGroup variant="contained">
        <Button
          size="small"
          startIcon={<ArrowCircleUpTwoTone />}
          onClick={() => sortIssuesUp(allIssues)}
        >
          Sort by Upvotes
        </Button>
        
        <Button
          size="small"
          startIcon={<ArrowCircleDownTwoTone />}
          onClick={() => sortIssuesDown(allIssues)}
        >
          Sort by Downvotes
        </Button>
      </ButtonGroup>
    </div>
  );
}