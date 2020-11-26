import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: 5,
    backgroundColor:
      theme.palette.type === "dark" && theme.palette.custom.grayBlue,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
    },
  },
  icon: {
    color: theme.palette.grey[700],
  },
}))
