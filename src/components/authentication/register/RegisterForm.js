import * as Yup from 'yup';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Link,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axiosInstance from '../../../utils/axios';
import { useStore } from '../../../stores/RootStore';
import { logOut } from '../../../stores/helpers';

export default function RegisterForm() {
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validUsername, setvalidUsername] = useState(true);

  const { userStore } = useStore();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(8, 'Too short').required('Password is required'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const user = {
        username: values.username,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
      };
      axiosInstance
        .post('/users/register/', user)
        .then((res) => {
          if (res.status === 201) {
            userStore.loginUser(user);
          } else if (res.status === 226) {
            setSubmitting(false);
            setvalidUsername(false);
          }
        })
        .catch((e) => {
          console.log(e);
          logOut();
        });
      // navigate('/dashboard', { replace: true });
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setSubmitting,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            // autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('passwordConfirmation')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(
              touched.passwordConfirmation && errors.passwordConfirmation
            )}
            helperText={
              touched.passwordConfirmation && errors.passwordConfirmation
            }
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
          {!validUsername ? (
            <Typography color="error" align="center">
              Username already exists
            </Typography>
          ) : null}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Link component={RouterLink} variant="subtitle2" to="/login">
            Already have an account? Login now
          </Link>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
