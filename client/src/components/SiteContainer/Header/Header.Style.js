import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    bottom: "auto",
    top: 0,
    backgroundColor: "#fff",
    position: "sticky",
    zIndex:1000
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
    justifyContent: "space-between",
    flexDirection: "row",
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
    "&:hover": {
      border: `${theme.palette.primary.main} 1px solid`,
      color: theme.palette.primary.main,
      backgroundColor: "#fff",
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
}))
