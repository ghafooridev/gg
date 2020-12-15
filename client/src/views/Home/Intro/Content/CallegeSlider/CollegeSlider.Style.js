import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    margin: "100px 0",
    padding: "10px 40px 40px",
    borderRadius: 20,
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.custom.lightestBlue
        : theme.palette.custom.lightGray,
  },
  title: {
    textAlign: "left",
    margin: "20px 0 10px",
    color: theme.palette.custom.bgBlue,
  },
  subTitle: {
    marginBottom: 50,
    color: theme.palette.custom.bgBlue,
    "& span":{
      color: theme.palette.primary.main,
      cursor:"pointer",
      marginLeft:4
    }
  },
  image: {
    width: 130,
    height: 100,
  },
}))
