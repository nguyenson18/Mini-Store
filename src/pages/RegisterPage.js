import React, { useState } from "react";
import { FormProvider, FTextField } from "../components/form";
import { Alert, Link, Button, Stack, Typography, IconButton, InputAdornment } from "@mui/material";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.number().required("Password is required"),
  email: yup.string().email().required("Email is required")
});
const defaultValues = {
  username: "",
  password: "",
  email: "",
};

function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false)

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });
  const { handleSubmit } = methods;

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    console.log(data)
    let {username, password, email} = data
    auth.register({username, password, email}, () => {
      const from = location.state?.from?.pathname || "/";
      navigate('/login');
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: { md: "350px", xs: "200px" } }}>
        <Typography variant="h4" textAlign="center">
          Register 
        </Typography>
        <Alert severity="info">
            Don’t have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Get Login
            </Link>
          </Alert>
        <FTextField name="username" label="Username" />
        <FTextField name="email" label="Email" />
        <FTextField
         name="password" 
         label="Password" 
         type= {showPassword ? "text" : "password"}
          InputProps={{
          endAdornment:(
            <InputAdornment position="end">
              <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)} 
              onMouseDown={(e)=> e.preventDefault()}
              edge="end"
              >
                {showPassword ? <Visibility/> : <VisibilityOff/>}
              </IconButton>
            </InputAdornment>
          )
        }}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </FormProvider>
  )
}

export default RegisterPage