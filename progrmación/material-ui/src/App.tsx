import React from 'react';
import { Box } from '@mui/material';
import CardComponent from './CardComponent'; 

const App: React.FC = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
      bgcolor="grey.50"
    >
      <CardComponent
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwSvQDCfG4851MfRUqJ-gdNzfQdCDLQWwlKg&s"
        title="My target of Material UI"
        description="Bunnies are cute."
      />
    </Box>
  );
}

export default App;
