import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";

import { useForm } from "react-hook-form";

import TextField from "../../components/sharedComponents/TextField";
import Password from "../../components/sharedComponents/Password";
import { validationMessage } from "../../utils/ValidationMessage";
import Button from "../../components/sharedComponents/Button";
import Constant from "../../utils/Constant";
import userRepository from "../../repositories/user";
import AlertAction from "../../redux/actions/AlertAction";
import UniversitySelector from "../../components/sharedComponents/UnivercitySelector";
import JoyStick from "../../components/sharedComponents/JoyStick";
import Selector from "../../components/sharedComponents/Selector";
import { styles } from "./Register.Style";
import { list } from "../../assets/json/colleges";

const Register = function () {
  const classes = styles();
  const { register, handleSubmit, errors, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = function (data, e) {
    setLoading(true);
    userRepository
      .register(data)
      .then((result) => {
        setLoading(false);
        if (result) {
          AlertAction.show({
            type: "success",
            text: Constant.MESSAGES.SEND_ACTIVATION_LINK,
          });
          e.target.reset();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Grid item sm={12} md={8} className={classes.root}>
      <JoyStick>
        <Grid item xs={12} className={classes.container}>
          <Typography variant="h3" className={classes.title}>
            Sign Up
          </Typography>
          <Grid spacing={3} className={classes.inputs}>
            <Grid className={classes.row}>
              <Grid item md={6} sm={12} className={classes.item}>
                <TextField
                  name="name"
                  label="Full name"
                  icon="account_circle"
                  inputRef={register({
                    required: validationMessage("Full Name", "required"),
                  })}
                  className={classes.input}
                  error={errors.name}
                />
              </Grid>
              <Grid item md={6} sm={12} className={classes.item}>
                <TextField
                  name="email"
                  label="Email"
                  icon="mail"
                  inputRef={register({
                    // pattern: {
                    //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.edu$/i,
                    //   message: validationMessage("Email address", "pattern"),
                    // },
                    required: validationMessage("Email address", "required"),
                  })}
                  className={classes.input}
                  error={errors.email}
                />
              </Grid>
            </Grid>
            <Grid className={classes.row}>
              <Grid item md={6} sm={12} className={classes.item}>
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
              <Grid item md={6} sm={12} className={classes.item}>
                <Password
                  name="password"
                  label="Password"
                  icon="lock_open"
                  inputRef={register({
                    required: validationMessage("Password", "required"),
                  })}
                  className={classes.input}
                  error={errors.password}
                />
              </Grid>
            </Grid>
            <Grid className={classes.dropDown}>
              <Grid item xs={12}>
                {/* <UniversitySelector
                  name="university"
                  inputRef={register({
                    required: validationMessage("University", "required"),
                  })}
                  className={classes.input}
                  error={errors.university}
                /> */}
                <Selector
                  className={classes.input}
                  name="university"
                  label="university"
                  icon="school"
                  inputRef={register({
                    required: validationMessage("University", "required"),
                  })}
                  error={errors.category}
                  options={list}
                />
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              className={classes.subTitle}
              color="textSecondary"
            >
              By creating an account, you agree to our
              <a className={classes.link} href="#" rel="noopener noreferer">
                Privacy Policy and Terms
              </a>
              .
            </Typography>
            <Grid item xs={12} className={classes.input}>
              <Button
                label="submit"
                type="primary"
                className={classes.submitButton}
                onClick={handleSubmit(onSubmit)}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </JoyStick>
    </Grid>
  );
};

export default Register;
