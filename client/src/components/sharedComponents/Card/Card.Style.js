import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey.lighter
        : theme.palette.grey.dark,
  },
}))
