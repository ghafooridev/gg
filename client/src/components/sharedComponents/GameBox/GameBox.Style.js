import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  color: (props) => ({
    backgroundColor: theme.palette[props.color].main,
  }),
  panel: {
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
      margin: "10px 0 !important",
    },
  },
}))
