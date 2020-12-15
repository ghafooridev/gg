import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      marginBottom: 30,
    },
  },
  color: (props) => ({
    backgroundColor: theme.palette[props.color].main,
  }),
  panel: {
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
      margin: "10px 0 !important",
    },
  },
  userPlayButton: {
    position: "absolute",
    bottom: -50,
    left: "50%",
    right: "50%",
    transform: "translate(-50%, -50%)",
  },
}))
