import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    margin: "100px auto",
  },
  container: {
    padding: "50px 100px 0",
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
  },
  item: {
    margin: "0 5px",
  },
  title: {},
  subTitle: {
    margin: "10px 0",
    zIndex: 1,
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
}))
