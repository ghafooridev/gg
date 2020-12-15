import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.custom.darkBlue
        : theme.palette.custom.lightGray,
    borderRadius: "190px 190px 20px 20px",
    position: "relative",
  },
  curves:{
    display:"flex",
    justifyContent:"space-between",
    height:200
  },
  curve: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.custom.darkBlue
        : theme.palette.custom.lightGray,
    borderRadius: "100%",
    minHeight: 300,
    position: "relative",

    width: 300,
  },
  leftCurve: {
    left: 0,
    top: -150,
  },
  rightCurve: {
    right: 0,
    float: "right",
    top: -150,
  },
}))
