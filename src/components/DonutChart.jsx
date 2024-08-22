import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Typography, Box, Stack } from '@mui/material';

const COLORS_MAP = {
  cloudAccounts: ['#1976d2', '#c0c0c0'], // Green for Connected, Blue for Not Connected
  riskAssessment: ['#f44336', '#FFEB3B', '#C0C0C0', '#4CAF50'], // Red for Failed, Yellow for Warning, Silver for Not Available, Green for Passed
};

const DonutChart = ({ data, chartType }) => {
  const colors = COLORS_MAP[chartType];

  // Handle Cloud Accounts totals
  const totalConnected = data.find(item => item.name === 'Connected')?.value || 0;
  const totalNotConnected = data.find(item => item.name === 'Not Connected')?.value || 0;

  // Handle Risk Assessment totals
  const totalFailed = data.find(item => item.name === 'Failed')?.value || 0;
  const totalWarning = data.find(item => item.name === 'Warning')?.value || 0;
  const totalNotAvailable = data.find(item => item.name === 'Not Available')?.value || 0;
  const totalPassed = data.find(item => item.name === 'Passed')?.value || 0;

  return (
    <>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <PieChart width={220} height={220}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={0}  // No gap between the pie slices
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Displaying central text */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          {/* <Typography variant="h6" fontWeight="bold">
          {chartType === 'cloudAccounts' ? totalConnected : 'Risk Assessment'}
        </Typography> */}
        </Box>

        {/* Displaying legends */}
        <Box sx={{ position: 'absolute', right: -10 }}>
          <Stack direction="column" spacing={1}>
            {chartType === 'cloudAccounts' ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 15, height: 15, bgcolor: colors[0], marginRight: 1 }} />
                  <Typography variant="body2">Connected: {totalConnected}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 15, height: 15, bgcolor: colors[1], marginRight: 1 }} />
                  <Typography variant="body2">Not Connected: {totalNotConnected}</Typography>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 15, height: 15, bgcolor: colors[0], marginRight: 1 }} />
                  <Typography variant="body2">Failed: {totalFailed}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 15, height: 15, bgcolor: colors[1], marginRight: 1 }} />
                  <Typography variant="body2">Warning: {totalWarning}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 15, height: 15, bgcolor: colors[2], marginRight: 1 }} />
                  <Typography variant="body2">Not Available: {totalNotAvailable}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 15, height: 15, bgcolor: colors[3], marginRight: 1 }} />
                  <Typography variant="body2">Passed: {totalPassed}</Typography>
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default DonutChart;
