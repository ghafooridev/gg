import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    bottom: "auto",
    top: 0,
    backgroundColor: theme.palette.type === "light" ? "#fff" : "#303030",
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
    backgroundColor: "#fff",
    color: "#000",
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
  logo: {
    width: 80,
    height: 80,
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
    backgroundColor: "#fff",
    color: "#000",
    transition: "none",
    margin: "0 2px",
    "&:hover": {
      border: `${theme.palette.primary.main} 1px solid`,
      backgroundColor: "#fff",
    },
  },
}))
