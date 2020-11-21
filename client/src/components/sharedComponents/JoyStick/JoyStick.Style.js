import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.custom.darkBlue
        : theme.palette.custom.lightGray,
    borderRadius: "190px 190px 20px 20px",
  },
  curve: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.custom.darkBlue
        : theme.palette.custom.lightGray,
    borderRadius: "100%",
    minHeight: 300,
    position: "absolute",
    top: 200,
    width: 300,
  },
  leftCurve: {
    left: 0,
  },
  rightCurve: {
    right: 0,
  },
}))
