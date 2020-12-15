import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    margin: "50px 100px",
    padding: 45,
  },
  title: {
    marginBottom: 20,
  },
  container: {
    display: "flex",
  },
  leftPanel: {
    flex: 1,
    marginRight: 50,
  },
  rightPanel: {
    position: "relative",
    flex: 1,
  },
  item: {
    marginBottom: 20,
  },

  colorBox: {
    float: "right",
  },
}))
