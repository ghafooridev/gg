import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  root: {
    bottom: "auto",
    top: 0,
    backgroundColor:
      theme.palette.type === "light" ? "#fff" : theme.palette.custom.bgBlue,
    position: "sticky",
    zIndex: 1000,
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  menu: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  buttonGroupCollapse: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  buttonGroupToggle: {
    display: "flex",
    alignItems: "center",
  },
  buttonGroupExpand: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
      flexDirection: "column-reverse",
    },
  },
  hamburger: {
    display: "none",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  button: {
    cursor: "pointer",
    backgroundColor:
      theme.palette.type === "light" ? "#fff" : theme.palette.custom.bgBlue,
    color: theme.palette.type === "light" ? "#000" : "#fff",
    letterSpacing: 0,
    transition: "none",
    margin: "0 2px",
    "&:hover": {
      border: `${theme.palette.primary.main} 1px solid`,
      color: theme.palette.primary.main,
      backgroundColor: "#fff",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "2px 0",
    },
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      "& h4": {
        position: "absolute",
        left: 50,
        top: 5,
      },
    },
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: 0,
      width: 45,
      height: 45,
    },
  },
  modeButton: {
    minWidth: 50,
    cursor: "pointer",
    backgroundColor:
      theme.palette.type === "light" ? "#fff" : theme.palette.custom.bgBlue,
    color: theme.palette.type === "light" ? "#000" : "#fff",
    transition: "none",
    margin: "0 2px",
    "&:hover": {
      border: `${theme.palette.primary.main} 1px solid`,
      backgroundColor: "#fff",
    },
  },
}));
