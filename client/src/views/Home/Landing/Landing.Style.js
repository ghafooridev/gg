import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  title: { margin: "50px 0" },
  gameList: {
    margin: "50px 0",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
}))
