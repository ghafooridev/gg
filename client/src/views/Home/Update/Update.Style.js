import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    margin: "50px 0",
    // display:"flex"
  },
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
  },
  title: {
    marginBottom: 20,
  },
  leftPanel: {
    [theme.breakpoints.down("xs")]: {
      padding: "20px 0",
    },
  },
  button: {
    marginTop: 30,
  },
  box: {
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
    },
  },
}))
