import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  rootButton: {
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
  },
  buttonGroup: {
    display: "flex",
  },
  infoGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px 0",
  },
  settingButton: {
    borderRadius: "0 100px 100px 0",
  },
  logOutButton: {
    borderRadius: "100px 0 0 100px",
  },
}));
