import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  jumbotron: {
    borderRadius: 10,
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 15px",
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
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
  topPanel: {
    display: "flex",
    justifyContent: "center",
  },
  playButton: {
    margin: "-20px auto",
  },
  bottomPanel: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  middleCol: {
    margin: "20px 20px 0",
  },
  title: {
    margin: "0 0 20px",
  },
  chatBox: {},
  chatEntry: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    "& button": {
      minWidth: 80,
      marginLeft: 10,
    },
  },
  pictionaryPanel: {
    margin: "0 20px",
  },
  pictionaryInfo: {
    display: "flex",
    width: 600,
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  clue: {
    display: "flex",
    padding: 15,
    "& span": {
      display: "flex",
      flexDirection: "column",
      margin: "0 5px",
      alignItems: "center",
      width: 10,
    },
  },
  underline: {
    width: 10,
    borderTop: "3px solid #000",
  },
  countdown: {
    padding: 15,
  },
  chooseWordContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  resultTableContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  resultTableRow: {
    display: "flex",
    justifyContent: "flex-start",
    "& h5": {
      width: 200,
      height: 40,
    },
  },
}))
