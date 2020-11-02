import { makeStyles } from "@material-ui/core/styles"
import BG from "src/assets/images/bg1.jpg"

export const styles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${BG})`,
    backgroundPosition: "center",
    height: "100vh",
    filter: "opacity(30%)",
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
    top: "-15%",
    left: "37%",
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
    backgroundColor: theme.palette.grey[100],
    padding: "0 !important",
    borderRadius: 50,
    margin: "0 5px",
  },
  footerLink: {
    minWidth: 50,
    width: 50,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    border: "none",
    borderRadius: 100,
    height: 50,
    padding: 0,
    transition: "all 0.5s",
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
      border: `${theme.palette.primary.main} 1px solid`,
      color: theme.palette.primary.main,
      backgroundColor: "#fff",
      width: "80%",
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
