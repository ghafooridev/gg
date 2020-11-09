import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  title: { margin: "50px 0 10px" },
  gameList: {
    margin: "20px 0",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  },
  jumbotron: {
    borderRadius: 10,
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    padding: "40px 30px",
  },
}))
