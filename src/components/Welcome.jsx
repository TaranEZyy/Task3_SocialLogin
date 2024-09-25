import React from 'react';
import { useLocation, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from '@mui/icons-material/Logout'; // Import a logout icon for better UX
import Button from "@mui/material/Button";

const Welcome = () => {
  const location = useLocation();
  const { state } = location;
  const {  logout } = useAuth0();

  if (!state || !state.values) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', padding: '1rem' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <div style={{
            background: "white",
            color:'black',
            boxShadow: "5px 5px 30px 5px gray",

            padding: "1.6rem",
            borderRadius: "8px",
            width: "100%",
            boxSizing: "border-box"
          }}>
            <h3>No data available. Please submit the form on <Link to="/">this link</Link></h3>
          </div>
        </Grid>
      </Grid>
    );
  }

  const { name, email, password } = state.values;

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', padding: '1rem' }}>
      <Grid item xs={12} sm={8} md={6} lg={10}>
        <div style={{
          background: "white",
          color:'black',
          boxShadow: "5px 5px 30px 5px gray",
          padding: "1.6rem",
          borderRadius: "8px",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <h1>Welcome {name}!</h1>
          <h3><u>Your submitted details:</u></h3>
          <p><b>Name:</b> {name}</p>
          <p><strong>Email: </strong>{email}</p>
          {password && <p><b>Password:</b> {password}</p>}

          {password ? (<div></div> ):(
               <Button
               onClick={(e) => logout()}
               variant="contained"
               sx={{
                 backgroundColor: '#f44336', // Red color for log out
                 color: '#fff',
                 textTransform: 'none',
                 fontSize: '16px',
                 fontWeight: 'bold',
                 padding: '8px 16px',
                 borderRadius: '8px',
                 display: 'flex',
                 alignItems: 'center',
                 '&:hover': {
                   backgroundColor: '#d32f2f', // Darker red on hover
                 }
               }}
               fullWidth
               startIcon={<LogoutIcon />} // Adding a log out icon
             >
               Log out
             </Button>
            )
          }

        </div>
      </Grid>
    </Grid>
  );
};

export default Welcome;
