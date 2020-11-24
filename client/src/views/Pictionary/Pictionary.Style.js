import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 10,
    right: 10,
  },
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
  videoCard: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  topPanel: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
  },
  playButton: {
    margin: "-20px auto",
  },
  bottomPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "auto",
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
    alignItems: "flex-end",
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
  roomButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 20,
  },
  roomCol: {
    margin: "0 10px",
  },
  roomTableRow: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.grey.main}`,
    alignItems: "center",
    padding: 5,
  },
  videoGrid: {
    display: "flex",
    flexWrap: "wrap",
    "& .videoBox": {
      width: "47%",
      height: 185,
      position: "relative",
      margin: 5,
      "& video": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
      "& .point": {
        position: "absolute",
        top: 0,
        right: 5,
        color: theme.palette.primary.main,
        fontSize: 18,
        fontWeight: 600,
      },
      "& .index": {
        position: "absolute",
        top: 5,
        left: 5,
        width: 25,
        height: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow",
        color: "#fff",
        borderRadius: "50%",
      },
      "& .icons": {
        position: "absolute",
        top: 25,
        right: 5,
        "& i": {
          marginLeft: 5,
          color: "#fff",
          fontSize: 18,
        },
      },
      "& .name": {
        position: "absolute",
        bottom: 20,
        left: 5,
        color: "#fff",
        fontSize: 18,
        fontWeight: 600,
      },
      "& .school": {
        position: "absolute",
        bottom: 5,
        left: 5,
        color: "#fff",
        fontSize: 14,
      },
    },
  },
}))
