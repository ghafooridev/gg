import { makeStyles } from "@material-ui/core/styles"

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

  title: {
    textAlign: "center",
    padding: "20px 0",
  },
  subTitle: {
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
