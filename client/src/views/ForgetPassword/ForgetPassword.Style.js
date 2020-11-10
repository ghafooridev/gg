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
    flexDirection: "column",
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
  link: {
    fontSize: 10,
    color: theme.palette.grey.main,
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}))
