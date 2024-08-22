import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const AddWidgetForm = ({ categories, addWidget, closeForm, selectedCategory }) => {
  const [widgetName, setWidgetName] = React.useState('');
  const [widgetType, setWidgetType] = React.useState('');

  const handleAdd = () => {
    if (widgetName && widgetType) {
      addWidget(selectedCategory, { widgetName, type: widgetType });
    }
  };

  const handleClose = () => {
    closeForm();
  }

  return (
    <Dialog
      open
      onClose={closeForm}
      PaperProps={{
        style: {
          position: 'fixed',
          right: 20,
          top: 20,
          maxWidth: 400,
          width: 'calc(100% - 40px)',
        }
      }}
    >
      <DialogTitle>Add Widget</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Widget Name"
          fullWidth
          variant="outlined"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Widget Type"
          fullWidth
          variant="outlined"
          value={widgetType}
          onChange={(e) => setWidgetType(e.target.value)}
        />
        <Button onClick={handleClose} color="inherit" variant="contained" sx={{ mt: 2 }} padding={2}>Close</Button>
        <Button onClick={handleAdd} color="primary" variant="contained" sx={{ mt: 2 }}>
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetForm;
