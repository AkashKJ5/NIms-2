import './login.css';

import {
  Alert,
  BlueLabel,
  Container,
  Div,
  Label,
  StyledFormControl,
  SubmitButton,
} from "./styled";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Paragraph, Title } from "../welcome-screen/styled";
import { ReportHeader, Span, SubHeading } from '../../containers/styled/Typography';
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Logo as Image } from "../../components/generic/image";
import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [isNull, setIsNull] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(
    "Please Enter valid username and password!"
  );
  const { login } = useAuth();
  const auth = useAuth();

  const Login = () => {
    if (!username || !password) {
      setIsNull(true);
      setErrorMessage("Please Fill all the fields !");
      return;
    }
    setErrorMessage("Please Enter valid username and password!");
    setLoading(true);
    login({ username: username, password: password })
      .then((data) => {
        setLoading(false);
        console.log("login_data", data);
        navigate("/dashboard");
        window.location.reload(true);
      })
      .catch((err) => {
        console.log("err", err);
        setIsNull(true);
        setLoading(false);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  React.useEffect(() => {
    if (auth.auth) {
      window.location.replace("/dashboard");
    }
  }, [auth]);

  return (
    <Container className='authContainer'>
      <div className="login">
      {!auth.auth ? (
        <div>
          <Div>
          <Image style={{width: '50%'}} src='/logo.svg' alt='Nemmadi' />
          <Paragraph>Automated Inspection Management System</Paragraph>
            {isNull && (
              <Alert
                onClose={() => setIsNull(false)}
                severity="error"
                label={errorMessage}
              />
            )}
            <div style={{textAlign: 'start'}}>
            <ReportHeader>Hi, Welcome Back! <img width="24" height="24" src="/waving-hand.png" alt="hand-sign"/></ReportHeader>
            <StyledFormControl
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-username">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                label="Email"
                size="small"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </StyledFormControl>

            <StyledFormControl
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </StyledFormControl>

            <SubmitButton
              variant="contained"
              onClick={() => {
                Login();
              }}
              disabled={loading}>SIGN IN</SubmitButton>
              </div>
          </Div>
          {loading && (
            <Box sx={{ display: "flex", position: "absolute", top: "40%", left: "40%"  }}>
              <CircularProgress style={{ width: "3rem", height: "3rem" }} />
            </Box>
          )}
          <div className='loginBg'><Image style={{width: '50%'}} src='/group.svg' alt='sign-in' /></div>
        </div>
      ) : null}
      </div>
    </Container>
  );
};

export default Login;
