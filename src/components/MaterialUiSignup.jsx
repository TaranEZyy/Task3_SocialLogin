import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from '@mui/material';

const MaterialUiSignupSchema = yup.object({
  name: yup
    .string('Enter your Name')
    .min(8, 'Name must be minimum 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one capital letter')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(/[A-Z]/, 'Must contain at least one capital letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
    .required('Password is required'),
});

const WithMaterialUI = () => {
  const navigate = useNavigate();
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: MaterialUiSignupSchema,
    onSubmit: (values) => {
      navigate('/welcome', { state: { values } });
    },
  });

  useEffect(() => {
    // If the user is authenticated, redirect them to the Welcome page with the user.name
    if (isAuthenticated) {
      navigate('/welcome', { state: { values: { name: user.name, email: user.email, password: '' } } });
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', padding: '1rem' }}>
      <Grid item xs={12} sm={8} md={6} lg={7}>
        <div style={{
          background: "white",
          color: 'black',
          boxShadow: "5px 5px 30px 5px gray",
          padding: "1.6rem",
          borderRadius: "8px",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <h2><u>Hey!! Enter the details below</u></h2>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
            <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '1rem' }}>
              Submit
            </Button>

            <br /><br />

            {isAuthenticated && <h2> {user.name} </h2>}
            {isAuthenticated ? (
              <button  onClick={(e) => logout()}>
                Log out
              </button>
            ) : (
              <Box
                sx={{
                  opacity: 1,
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
               <Button
      onClick={(e) => loginWithRedirect()}
      variant="outlined"
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#4285F4',
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '8px 16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        }
      }}
      fullWidth
    >
      <img
        src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
        alt="Google logo"
        style={{ width: '40px', height: '40px', marginRight: '10px' }}
      />
      Login with Google
    </Button>
              </Box>
            )}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default WithMaterialUI;
