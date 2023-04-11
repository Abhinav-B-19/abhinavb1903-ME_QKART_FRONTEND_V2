import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  const userName = localStorage.getItem("username");
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      <Box>{children}</Box>
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          back to explore
        </Button>
      ) : (
        <Stack direction="row" spacing={1} alignItems="center">
          {userName ? (
            <>
              <Avatar src="avatar.png" alt={userName} />
              <span className="username-text">{userName}</span>
              <Button
                onClick={() => {
                  localStorage.clear();
                  history.push("/");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => history.push("/login")}>Login</Button>
              <Button
                variant="contained"
                onClick={() => history.push("/register")}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Header;
