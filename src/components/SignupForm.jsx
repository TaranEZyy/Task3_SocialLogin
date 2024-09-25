import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
      lastName: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters')
        .matches(/[A-Z]/, 'Must contain at least one capital letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        {...formik.getFieldProps('firstName')}
      /> <br />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div style={{color:"red"}}>{formik.errors.firstName}</div>
      ) : null}
<br />
      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" type="text" {...formik.getFieldProps('lastName')} /><br />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div style={{color:"red"}}>{formik.errors.lastName}</div>
      ) : null}
<br />

      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" {...formik.getFieldProps('email')} /><br />
      {formik.touched.email && formik.errors.email ? (
        <div style={{color:"red"}}>{formik.errors.email}</div>
      ) : null}
<br />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" {...formik.getFieldProps('password')} /><br />
      {formik.touched.password && formik.errors.password ? (
        <div style={{color:"red"}}>{formik.errors.password}</div>
      ) : null}
<br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;