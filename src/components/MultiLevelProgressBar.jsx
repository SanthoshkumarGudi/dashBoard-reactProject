import React from 'react';
import { Box, Typography } from '@mui/material';

const MultiLevelProgressBar = ({ levels }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', height: '25px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
        {levels.map((level, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: `${levels.slice(0, index).reduce((acc, l) => acc + l.value, 0)}%`,
              width: `${level.value}%`,
              height: '100%',
              backgroundColor: level.color,
              borderRadius: index === 0 ? '5px 0 0 5px' : index === levels.length - 1 ? '0 5px 5px 0' : '0'
            }}
          />
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '8px' }}>
        {levels.map((level, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: '12px',
                height: '12px',
                backgroundColor: level.color,
                marginRight: '4px',
                borderRadius: '50%'
              }}
            />
            <Typography variant="caption">{level.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MultiLevelProgressBar;
