import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Category = ({ category, removeWidget }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6">{category.categoryName}</Typography>
      <Grid container spacing={2}>
        {category.widgets.map((widget, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ position: 'relative', padding: '16px' }}>
              <IconButton
                onClick={() => removeWidget(category.categoryName, widget.widgetName)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <CardContent>
                <Typography variant="h5">{widget.widgetName}</Typography>
                <Typography>{widget.widgetText}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Category;
