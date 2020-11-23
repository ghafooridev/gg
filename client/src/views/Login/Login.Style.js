import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    margin: "100px auto",
  },
  container: {
    padding: "50px 150px 0",
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
  title: {},
  subTitle: {
    margin: "10px 0 20px",
    zIndex: 1,
  },
  submitButton: {
    zIndex: 1,
  },
  link: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    margin: "0 5px",
  },
}))
