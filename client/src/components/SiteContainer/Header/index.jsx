import React, { useContext, useState } from "react";

import { useHistory } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";

import { Squash as Hamburger } from "hamburger-react";

import clsx from "clsx";

import isEmpty from "lodash.isempty";

import ThemeContext from "../../../Contexts/Theme/ThemeContext";
import Button from "../../sharedComponents/Button";
import { useSelector } from "react-redux";
import HeaderProfile from "./HeaderProfile";
import { styles } from "./Header.Style";
import LogoLight from "../../../assets/images/logo_light.png";
import LogoDark from "../../../assets/images/logo_dark.png";
import dialogAction from "../../../redux/actions/dialogAction";
import Feedback from "../../../views/Feedback";

const Header = function () {
  const currentUser = useSelector((state) => state.user);

  const { toggleTheme, theme } = useContext(ThemeContext);
  const mode = theme.Theme.palette.type;

  const history = useHistory();

  const [isOpen, setOpen] = useState(false);

  const classes = styles(isOpen);

  const onToggleHamburger = function (toggle) {
    setOpen(toggle);
  };

  const onMenuClick = function (type) {
    const types = {
      signIn: () => {
        history.push("/login");
      },
      signUp: () => {
        history.push("/register");
      },
      inviteFriend: () => {
        alert("not implemented");
      },
      provideFeedback: () => {
        dialogAction.show({
          component: <Feedback />,
          size: "sm",
          title: `Provide Feedback`,
          onAction: (type, data) => {},
        });
      },
      home: () => {
        history.push("/home");
      },
    };

    if (types[type]) {
      return types[type]();
    }
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid className={classes.logoContainer}>
          <img
            alt="logo"
            src={mode === "dark" ? LogoDark : LogoLight}
            className={classes.logo}
            onClick={() => onMenuClick("home")}
          />
          <Typography variant="h4" color="primary">
            GG chat
          </Typography>
        </Grid>
        <div className={classes.menu}>
          <Grid item className={classes.hamburger}>
            <Hamburger
              size={20}
              color="#aaa"
              toggled={isOpen}
              toggle={setOpen}
              onToggle={(toggled) => onToggleHamburger(toggled)}
            />
          </Grid>
          <Grid
            item
            className={clsx(
              classes.buttonGroupToggle,
              isOpen ? classes.buttonGroupCollapse : classes.buttonGroupExpand
            )}
          >
            {!isEmpty(currentUser) && (
              <Button
                label="Provide Feedback"
                type="grey"
                className={classes.button}
                onClick={() => onMenuClick("provideFeedback")}
              />
            )}
            {!isEmpty(currentUser) && (
              <Button
                label="Invite Friends"
                type="grey"
                className={classes.button}
                onClick={() => onMenuClick("inviteFriends")}
              />
            )}
            {!isEmpty(currentUser) && <HeaderProfile user={currentUser} />}
            {isEmpty(currentUser) && (
              <Button
                label="Sign In"
                type="grey"
                className={classes.button}
                onClick={() => onMenuClick("signIn")}
              />
            )}
            {isEmpty(currentUser) && (
              <Button
                label="Sign Up"
                type="grey"
                className={classes.button}
                onClick={() => onMenuClick("signUp")}
              />
            )}
            <Button
              type="grey"
              icon={
                mode === "dark" ? (
                  <i
                    className="material-icons"
                    style={{ paddingTop: 3, color: "gold" }}
                  >
                    wb_sunny
                  </i>
                ) : (
                  <i className="material-icons" style={{ paddingTop: 3 }}>
                    brightness_3
                  </i>
                )
              }
              className={classes.modeButton}
              onClick={() => toggleTheme()}
            />
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Header;
