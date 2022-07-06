import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

const EditIssueFormSx = {
  display: 'flex',
  flexDirection: 'column',
  gap:'10px'
}

export default function EditForm(props) {
  const [descriptionRows] = useState(5);

  const {
    toggleEdit,
    toggleSave,
    handleChange,
    editId,
    issueElement,
    deleteIssue,
    _id
  } = props;

  return (
    <div>
      {editId === _id && (
        <div style={EditIssueFormSx}>
          <TextField
            label="Title"
            name="title"
            multiline
            value={issueElement.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={descriptionRows}
            // inputProps={descriptionInputProps}
            value={issueElement.description}
            onChange={handleChange}
          />
        </div>
      )}
      {editId !== _id ? (
        <Button
          startIcon={<Edit />}
          variant="contained"
          size="small"
          sx={{backgroundColor: 'cornflowerblue', mr: '10px'}}
          onClick={() => toggleEdit(_id)}
        >
          Edit
        </Button>
      )
        :
        (
          <Button
            startIcon={<Save />}
            variant="contained"
            size="small"
            style={{ backgroundColor: 'green', margin: '10px' }}
            onClick={() => toggleSave(_id, issueElement)}
          >
            Save
          </Button>
        )
      }

      <Button
        startIcon={<Delete />}
        variant="contained"
        size="small"
        style={{ backgroundColor: 'red' }}
        onClick={() => { deleteIssue(_id) }}
      >
        Delete
      </Button>
    </div>
  );
}