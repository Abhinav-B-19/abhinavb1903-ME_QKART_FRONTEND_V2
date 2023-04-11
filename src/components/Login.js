import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData,setformData] = useState({
    username:"",
    password:""
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    // console.log(formData);
    if(validateInput(formData)){
      try{
        setLoading(true);
        let data = await axios.post(config.endpoint + "/auth/login", {
          username: formData.username,
          password: formData.password,
        });
        
       // console.log("data", data.data.token,data.data.token,data.data.username,data.data.balance);
        
        if (data.status === 201) {
          setLoading(false);
          enqueueSnackbar("Logged in successfully", { variant: "success" });
          persistLogin(data.data.token,data.data.username,data.data.balance);
          history.push("/")
        }
      }catch(err){setLoading(false);
        if (err.response.status === 400) {
          // console.log("404 error");
          enqueueSnackbar(err.response.data.message, {
            variant: "error",
          });
        } else {
          setLoading(false);
          console.log("went wrong");
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            {
              variant: "error",
            }
          );
        }}
    }
    else{
      return null;
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if (data.username.length === 0) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }else if (data.password.length === 0) {
      //|| data.password.length==0 || data.confirmPassword.length==0){
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    else{
      return true;
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    //console.log(token,username,balance)
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  function changeFunction(value,key){
   // console.log(value.target.value,key)
    let obj = {[key]:value.target.value};
    setformData((prev)=>({...prev,...obj}))
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e) => changeFunction(e, "username")}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            // helperText="Password must be atleast 6 characters length"
            onChange={(e) => changeFunction(e, "password")}
            fullWidth
            placeholder="Enter Password"
          />
          {loading ? (
            <div>
              <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
              </Box>
            </div>
          ) : (<Button
            className="button"
            variant="contained"
            onClick={() => login(formData)}
          >
            LOGIN TO QKART
          </Button>)}
          <p className="secondary-action">
            Don’t have an account?{" "}
            <a className="link" href="./register">
              Register now
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
