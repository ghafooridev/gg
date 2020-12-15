import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  frame: {
    cursor: "pointer",
  },
  toolbar: {
    width:600,
    margin: "10px 0",
    display: "flex",
    justifyContent: "space-between",
  },
  point: {
    borderRadius: "50%",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& *": {
      cursor: "pointer",
    },
  },
  lg: {
    width: 25,
    height: 25,
  },
  md: {
    width: 15,
    height: 15,
  },
  sm: {
    width: 5,
    height: 5,
  },
  color: {
    width: 25,
    height: 25,
  },
}))
