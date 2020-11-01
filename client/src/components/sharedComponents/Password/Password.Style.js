import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
    },
  },
  icon: {
    color: theme.palette.grey[700],
  },
}))
