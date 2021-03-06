import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import TextField from "../../components/sharedComponents/TextField";
import Password from "../../components/sharedComponents/Password";
import { validationMessage } from "../../utils/ValidationMessage";
import Button from "../../components/sharedComponents/Button";
import userAction from "../../redux/actions/UserAction";
import JoyStick from "../../components/sharedComponents/JoyStick";
import Constant from "../../utils/Constant";
import Storage from "../../services/Storage";
import { styles } from "./Login.Style";

const Login = function () {
  const classes = styles();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onSignUpClick = function () {
    history.push("/register");
  };

  const onSubmit = function (data) {
    setLoading(true);
    userAction
      .login(data)
      .then(() => {
        setLoading(false);
        const link = Storage.pull(Constant.STORAGE.CURRENT_LINK);
        if (link) {
          return history.push(link);
        }
        history.push("/home");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onForgetPassword = function () {
    history.push("/forget-password");
  };

  return (
    <Grid item className={classes.root}>
      <JoyStick>
        <Grid item xs={12} className={classes.container}>
          <Typography variant="h3" className={classes.title}>
            Sign In
          </Typography>
          <Typography
            variant="body2"
            className={classes.subTitle}
            color="textSecondary"
          >
            Don’t have an account?
            <span className={classes.link} onClick={onSignUpClick}>
              Sign up
            </span>
            for free here.
          </Typography>
          <Grid container spacing={3} className={classes.inputs}>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                icon="account_circle"
                inputRef={register({
                  required: validationMessage("Username", "required"),
                })}
                className={classes.input}
                error={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <Password
                name="password"
                label="Password"
                icon="lock_open"
                inputRef={register({
                  required: validationMessage("Password", "required"),
                })}
                className={classes.input}
                error={errors.password}
                onEnter={handleSubmit(onSubmit)}
              />
            </Grid>

            <Grid item xs={12} className={classes.inputButtons}>
              <Button
                label="submit"
                type="primary"
                className={classes.submitButton}
                onClick={handleSubmit(onSubmit)}
                loading={loading}
              />
              <span className={classes.link} onClick={onForgetPassword}>
                Forget Password ?
              </span>
            </Grid>
          </Grid>
        </Grid>
      </JoyStick>
    </Grid>
  );
};

export default Login;
