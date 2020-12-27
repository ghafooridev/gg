import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    position: "fixed",
    top: "50%",
    left: "50%",
    width: 700,
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      position: "inherit",
      transform: "none",
      width: "100%",
      margin: "auto",
    },
  },
  container: {
    padding: "50px 150px 0",
    [theme.breakpoints.down("sm")]: {
      padding: 30,
    },
  },
  inputs: {
    marginTop: 30,
  },
  input: {
    zIndex: 1,
  },
  inputButtons: {
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  subTitle: {
    margin: "10px 0 20px",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  submitButton: {
    zIndex: 1,
  },
  link: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    margin: "0 5px",
  },
}));
