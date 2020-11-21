import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.custom.lightestBlue
        : theme.palette.custom.darkBlue,
  },
}))
