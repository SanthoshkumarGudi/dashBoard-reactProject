import React from 'react';
import { AppBar, Toolbar, Typography, Breadcrumbs, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the path segments from the current URL
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  // Navigate to the home page
  const handleHomeClick = () => {
    navigate('/');
  };

  // Render breadcrumb links for each segment of the path
  const renderBreadcrumbs = () => {
    return pathSegments.map((segment, index) => {
      const isLastSegment = index === pathSegments.length - 1;
      const segmentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1);

      return isLastSegment ? (
        <Typography color="inherit" key={segmentPath}>
          {segmentName}
        </Typography>
      ) : (
        <Link
          color="inherit"
          onClick={() => navigate(segmentPath)}
          sx={{ cursor: 'pointer', color: 'white' }}
          key={segmentPath}
        >
          {segmentName}
        </Link>
      );
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
          <Link
            color="inherit"
            onClick={handleHomeClick}
            sx={{ cursor: 'pointer', color: 'white' }}
          >
            Home
          </Link>
          {renderBreadcrumbs()}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
