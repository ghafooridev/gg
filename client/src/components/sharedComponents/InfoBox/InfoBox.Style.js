import { makeStyles } from "@material-ui/core/styles"

const setBackground = (props, theme) => {
  console.log(props)
  if (!props.background || props.background === "transparent") {
    return theme.palette.type === "dark" && theme.palette.custom.grayBlue
  }
  return props.background
}

export const styles = makeStyles((theme) => ({
  root: {
    padding: 10,
    marginBottom: 10,
    boxShadow: "none",
    borderRadius: 10,
    border:
      theme.palette.type === "dark"
        ? "none"
        : `1px solid ${theme.palette.grey.light}`,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 10,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: 10,
    },
    backgroundColor: (props) => setBackground(props, theme),
  },
  top: {
    display: "flex",
  },
  down: {
    marginTop: 5,
  },
  topRight: {
    display: "flex",
    flexDirection: "Column",
    marginLeft: 5,
  },
  topRightUP: {
    display: "flex",
    justifyContent: "space-between",
  },
  topRightDown: {
    display: "flex",
    alignItems: "flex-end",
  },
  downText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  downChips: {},
  topLeft: {
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
  },
}))
