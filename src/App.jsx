import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MaterialUiSignup from "./components/MaterialUiSignup";
import Welcome from "./components/Welcome";


function App() {

  

  return (
    
   <div>
    
     
    <Router>
      <Routes>
        <Route path="/" element={<MaterialUiSignup />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
    

   </div>
   
   
   
  );
}

export default App;

