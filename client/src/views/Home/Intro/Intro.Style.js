import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    margin: "100px 0",
  },
  leftPanel: {
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
  },
  title: {
    marginBottom: 20,
  },
  rightPanel: {
    padding: 50,
    [theme.breakpoints.down("xs")]: {
      padding: "20px 0",
    },
  },
  button: {
    marginTop: 30,
  },
  userInfoPanel: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  userInfoTitle: {
    margin: "50px 0 20px",
  },
  infoBox: {
    width: "24%",
    [theme.breakpoints.down("sm")]: {
      width: "49%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}))
