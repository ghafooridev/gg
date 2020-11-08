import { makeStyles } from "@material-ui/core/styles"

const rootStyle = function (props, theme) {
  const { type, icon, label } = props
  return {
    cursor: "pointer",
    backgroundColor: theme.palette[type].main,
    color: "#fff",
    border: "none",
    borderRadius: 100,
    minWidth: 120,
    height: 50,
    padding: 10,
    transition: "all 0.5s",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "bold",
    outline: "none",
    "&:hover": {
      border: `${theme.palette[type].main} 1px solid`,
      color: theme.palette[type].main,
      backgroundColor: "#fff",
    },
    "& span": {
      display: icon && label ? "flex" : "block",
      alignItems: "center",
    },
  }
}

export const styles = makeStyles((theme) => ({
  root: (props) => rootStyle(props, theme),
}))
