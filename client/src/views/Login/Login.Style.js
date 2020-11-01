import { makeStyles } from "@material-ui/core/styles"
import BG from "src/assets/images/bg1.jpg"

export const styles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${BG})`,
    backgroundPosition: "center",
    height: "100vh",
    filter: "opacity(30%)",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paper: {
    padding: 25,
    position: "relative",
  },
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: "-15%",
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
