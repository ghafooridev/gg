import { makeStyles } from "@material-ui/core/styles"

const rootStyle = function (props, theme) {
  const { type, icon, label, disabled } = props
  return {
    cursor: "pointer",
    backgroundColor: disabled
      ? theme.palette.grey.main
      : theme.palette[type].main,
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
    "&:hover": !disabled && {
      border: `${theme.palette[type].main} 1px solid`,
      color: theme.palette[type].main,
      backgroundColor: "#fff",
      "& div": {
        color: theme.palette[type].main,
      },
    },
    "& span": {
      display: icon && label ? "flex" : "block",
      alignItems: "center",
      justifyContent: "center",
    },
  }
}

export const styles = makeStyles((theme) => ({
  root: (props) => rootStyle(props, theme),
  loading: {
    color: "#fff",
    float: "right",
  },
}))
