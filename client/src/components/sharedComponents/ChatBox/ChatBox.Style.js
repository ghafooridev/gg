import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  scroll:{
    height:200
  },
  itemCard: {
    borderRadius: 10,
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  title: {
    margin: "0 0 20px",
  },
  chatBox: {
    width: "100%",
    margin: "20px 0",
  },
  chatEntry: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    "& button": {
      minWidth: 80,
      marginLeft: 10,
    },
  },
  message: {
    display: "flex",
    alignItems: "center",
    padding: 5,
    margin: 5,
  },
  chatContent: {
    marginLeft: 2,
  },
  guessed: {
    backgroundColor: theme.palette.success.main,
    borderRadius: 10,
  },
}))
