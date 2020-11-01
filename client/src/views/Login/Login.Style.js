import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
  },
  paper: {
    padding: 25,
    position: "relative",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    position: "absolute",
    top: "-20%",
    left: "37%",
  },
  welcome: {
    textAlign: "center",
    padding: "20px 0",
  },
  loginText: {
    textAlign: "center",
    paddingBottom: 20,
  },
  submitButton: {
    width: "100%",
  },
}))
