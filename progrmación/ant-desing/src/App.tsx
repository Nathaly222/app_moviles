import React from "react";
import CardComponent from "./Component";
 const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      <CardComponent 
      title = "My Target of Ant Desing"
      description="Pumas"
      imageUrl= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNBHMwzyjo2u8qn-lM8ecttnhXkK7tKTIVWg&s"
      />
    </div>
  );
 };
 export default App;