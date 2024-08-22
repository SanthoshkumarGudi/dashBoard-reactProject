import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchWidgets = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWidgets = data.categories.flatMap(category =>
    category.widgets.filter(widget =>
      widget.widgetName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ padding: '10px' }}>
      <TextField 
        placeholder='search anything' 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        fullWidth 
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: { borderRadius: '8px' }  // Border radius for the input field
        }}
        style={{ borderRadius: '8px',
                    width: '300px',
                    height: '30px',
         }}  // Border radius for the input field
      />
      {searchTerm && (
        <List style={{ marginTop: '10px' }}>
          {filteredWidgets.map((widget, index) => (
            <ListItem key={index}>
              <ListItemText primary={widget.widgetName} secondary={widget.widgetText} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchWidgets;
