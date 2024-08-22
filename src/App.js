// import React from 'react';
// import { Container } from '@mui/material';
// import Dashboard from './components/DashBoard';

// const App = () => {
//   return (
//     <Container>
//       <Dashboard />
//     </Container>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/DashBoard';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

