import { CardList, Container } from "../styled";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Image, InputTextField, Label, NemmadiLogo } from "./styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Button } from "primereact/button";
import { CardContainer } from "../../../components/generic/container";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import React from "react";
import ResponsiveAppBar from "../../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
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
        console.log("data", data);
        navigate("/dashboard");
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

  React.useEffect(()=>{
  if(!auth.auth) return;
  setUsername(auth.auth.user.username);
  },[auth.auth,username]);

  return (
    <>
      <Container>
        <ResponsiveAppBar isTitle title="Edit Profile" />
        <ScrollPanel className="unit-pannel">
          <CardContainer style={{ paddingLeft: "0rem" }}>
            <div
              style={{
                textAlign: "center",
                marginTop: ".8rem",
              }}
            >
              <PermIdentityIcon />
              <div
                style={{ marginTop: "2rem", width: "18rem", margin: "auto" }}
              >
                <FormControl
                  sx={{ m: 1, width: "18rem", margin: "4px" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-username">
                    Username
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type="text"
                    label="Username"
                    value={username}
                    disabled
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </FormControl>

                <FormControl
                  sx={{ m: 1, width: "18rem", margin: "4px" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
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
                </FormControl>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <Button label="Submit" style={{ width: "18rem" }} />
              </div>

              <div style={{ marginTop: "2rem", padding: "1rem" }}>
                <Image src="/profile_logo.svg" alt="load" />
                <Label>Version 2.3.7</Label>
                <NemmadiLogo src="/logo.svg" alt="load" />
                <Label>©2022 NEMMADI. ALL RIGHTS RESERVED</Label>
              </div>
            </div>
          </CardContainer>
        </ScrollPanel>
      </Container>
    </>
  );
};

export default EditProfile;
