import React, { useState, useMemo } from 'react';
import { Container, Grid, Button, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import AddWidgetForm from './AddWidgetForm';
import SearchWidgets from './SearchWidget';
import DonutChart from './DonutChart';
import MultiLevelProgressBar from './MultiLevelProgressBar';
import CloseIcon from '@mui/icons-material/Close';
import SyncIcon from '@mui/icons-material/Sync';
import NoDataImg from '../assets/placeholder-image.jpeg';

const initialData = {
  categories: [
    {
      categoryName: 'CSPM Executive Dashboard',
      widgets: [
        { widgetName: 'Cloud Accounts', widgetText: 'This is some random text for Cloud Accounts.', type: 'cloudAccounts' },
        { widgetName: 'Cloud Account Risk Assessment', widgetText: 'This is some random text for Cloud Account Risk Assessment.', type: 'riskAssessment' }
      ]
    },
    {
      categoryName: 'CWPP Dashboard',
      widgets: [
        { widgetName: 'Widget 3', widgetText: 'This is some random text for Widget 3.' },
        { widgetName: 'Workload alerts', widgetText: 'This is some random text for Workload alerts.' }
      ]
    },
    {
      categoryName: 'Registry Scan',
      widgets: [
        { widgetName: 'Image Risk Assessment', widgetText: 'Registry scan.', type: 'imageRiskAssessment' },
        { widgetName: 'Image Security Issues', widgetText: 'Registry scan.', type: 'imageSecurityIssues' },
      ]
    }
  ]
};

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const addWidget = (categoryName, widget) => {
    setData(prevData => {
      const updatedCategories = prevData.categories.map(category => {
        if (category.categoryName === categoryName) {
          return { ...category, widgets: [...category.widgets, widget] };
        }
        return category;
      });
      return { categories: updatedCategories };
    });
  };

  const removeWidget = (categoryName, widgetName) => {
    setData(prevData => {
      const updatedCategories = prevData.categories.map(category => {
        if (category.categoryName === categoryName) {
          return { ...category, widgets: category.widgets.filter(widget => widget.widgetName !== widgetName) };
        }
        return category;
      });
      return { categories: updatedCategories };
    });
  };

  const handleRefresh = () => {
    setData(initialData);
  };

  const cloudAccountsData = useMemo(() => [
    { name: 'Connected', value: 70 },
    { name: 'Not Connected', value: 30 }
  ], []);

  const cloudAccountRiskData = useMemo(() => [
    { name: 'Failed', value: 15 },
    { name: 'Warning', value: 20 },
    { name: 'Not Available', value: 5 },
    { name: 'Passed', value: 60 }
  ], []);

  const renderWidget = (widget, categoryName) => {
    let hasData = false;
    let progressData = [];
    let dataToDisplay = [];

    if (widget.type === 'imageRiskAssessment') {
      hasData = true;
      progressData = [
        { label: 'Critical', value: 20, color: 'red' },
        { label: 'High', value: 30, color: 'orange' },
        { label: 'Medium', value: 25, color: 'yellow' },
        { label: 'Low', value: 25, color: 'green' }
      ];
    } else if (widget.type === 'imageSecurityIssues') {
      hasData = true;
      progressData = [
        { label: 'Critical', value: 15, color: 'red' },
        { label: 'High', value: 35, color: 'orange' },
        { label: 'Medium', value: 30, color: 'yellow' },
        { label: 'Low', value: 20, color: 'green' }
      ];
    } else if (widget.type === 'cloudAccounts') {
      hasData = cloudAccountsData && cloudAccountsData.length > 0;
      dataToDisplay = cloudAccountsData;
    } else if (widget.type === 'riskAssessment') {
      hasData = cloudAccountRiskData && cloudAccountRiskData.length > 0;
      dataToDisplay = cloudAccountRiskData;
    }

    return (
      <Grid item xs={12} sm={6} md={4} key={`${categoryName}-${widget.widgetName}`}>
        <Card sx={{
          position: 'relative',
          width: '100%',
          height: 250,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'normal',
          justifyContent: 'stretch',
          padding: 0,
        }}>
          <IconButton
            onClick={() => removeWidget(categoryName, widget.widgetName)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{widget.widgetName}</Typography>
            {hasData ? (
              widget.type === 'imageRiskAssessment' || widget.type === 'imageSecurityIssues' ? (
                <MultiLevelProgressBar levels={progressData} />
              ) : (
                <DonutChart data={dataToDisplay} chartType={widget.type} />
              )
            ) : (
              <>
                <img src={NoDataImg} alt="No graph data available" style={{ width: '100px', height: '100px', margin: '16px 0' }} />
                <Typography>No graph data available</Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleRefresh} sx={{ color: 'black' }}>
          <SyncIcon />
        </IconButton>
        <SearchWidgets data={data} />
      </Box>

      <h4>CNAPP Dashboard</h4>
      {showAddWidgetForm &&
        <AddWidgetForm
          categories={data.categories}
          addWidget={addWidget}
          closeForm={() => setShowAddWidgetForm(false)}
          selectedCategory={selectedCategory}
        />
      }

      <Grid container spacing={2}>
        {data.categories.map((category) => (
          <Grid item xs={12} key={category.categoryName}>
            <Typography variant="h6">{category.categoryName}</Typography>
            <Grid container spacing={2}>
              {category.widgets.map(widget => renderWidget(widget, category.categoryName))}

              {/* Add Widget button as a widget */}
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 250,
                    border: '1px solid grey',
                    padding: 0,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedCategory(category.categoryName);
                      setShowAddWidgetForm(true);
                    }}
                    sx={{ width: '80%' }}
                  >
                    + Add Widget
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
