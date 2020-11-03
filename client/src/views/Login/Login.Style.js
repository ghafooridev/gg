import { makeStyles } from "@material-ui/core/styles"
import BG from "src/assets/images/bg1.jpg"

export const styles = makeStyles((theme) => ({
  leftPanel: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "& img": {
      width: "100%",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundImage: `url(${BG})`,
    backgroundPosition: "center",
    height: "100vh",
    filter: "opacity(30%)",
    backgroundSize: "cover",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paper: {
    padding: 25,
    position: "relative",
  },
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: "-9%",
    left: "43%",
  },
  welcome: {
    textAlign: "center",
    padding: "20px 0",
  },
  loginText: {
    textAlign: "center",
    paddingBottom: 20,
  },
  submitButton: {
    width: "100%",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 !important",
    borderRadius: 50,
    margin: 10,
  },
  footerLink: {
    cursor: "pointer",
    minWidth: 50,
    width: 50,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    border: "none",
    borderRadius: 100,
    height: 50,
    padding: 0,
    transition: "all 1s",
    letterSpacing: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& span": {
      display: "none",
    },
    "& i": {
      display: "blcok",
    },
    "&:hover": {
      width: "90%",
      padding: 0,
      textTransform: "uppercase",
      "& span": {
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
      "& i": {
        display: "none",
      },
    },
  },
}))
