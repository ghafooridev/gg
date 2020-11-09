import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    width: "24%",
    padding: 10,
    marginBottom: 10,
    boxShadow: "none",
    border: `1px solid ${theme.palette.grey.light}`,
    [theme.breakpoints.down("sm")]: {
      width: "49%",
      marginBottom: 10,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: 10,
    },
  },
  top: {
    display: "flex",
  },
  down: {
    marginTop: 5,
  },
  topRight: {
    display: "flex",
    flexDirection: "Column",
    marginLeft: 5,
  },
  topRightUP: {
    display: "flex",
    justifyContent: "space-between",
  },
  topRightDown: {
    display: "flex",
    alignItems: "flex-end",
  },
  downText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  downChips: {},
  topLeft: {
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
  },
}))
