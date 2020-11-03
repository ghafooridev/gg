import { makeStyles } from "@material-ui/core/styles"
import BG from "src/assets/images/bg1.jpg"

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
  background: {
    backgroundImage: `url(${BG})`,
    backgroundPosition: "center",
    height: "100vh",
    filter: "opacity(30%)",
    backgroundSize: "cover",
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
    top: "-9%",
    left: "43%",
  },
}))
