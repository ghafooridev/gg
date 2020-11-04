import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
  root: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
    },
  },
  icon: {
    color: theme.palette.grey[700],
  },
  expandIcon: {
    color: theme.palette.grey[700],
    cursor: "pointer",
  },
  menuContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    overflowY: "auto",
    border: `1px solid #0000003b`,
    borderTop: "none",
    borderBottom: "none",
    borderRadius: 5,
    maxHeight: 150,
  },
}))
