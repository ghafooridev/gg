import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      position: "inherit",
      transform: "none",
    },
  },
  container: {
    padding: "50px 100px 0",
    [theme.breakpoints.down("sm")]: {
      padding: 30,
    },
  },
  curves: {
    top: 260,
  },
  inputs: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
  input: {
    zIndex: 1,
  },
  row: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    margin: "10px 0",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      margin: 0,
    },
  },
  item: {
    margin: "0 5px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 20,
    },
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
  dropDown: {
    margin: "10px 5px",
  },
  link: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    margin: "0 5px",
    textDecoration: "none",
  },
}));
