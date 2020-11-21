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
    flex: 1,
  },
  item: {
    marginBottom: 20,
  },
  uploadBox: {
    height: 360,
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.custom.grayBlue
        : theme.palette.custom.lightGray,
    borderRadius: 10,
    textAlign: "center",
    padding: 110,
  },
}))
