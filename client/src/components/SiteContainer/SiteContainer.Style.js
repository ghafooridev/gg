import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    padding: "0 150px",
    [theme.breakpoints.down("md")]: {
      padding: "10px 50px",
    },
  },
}))
