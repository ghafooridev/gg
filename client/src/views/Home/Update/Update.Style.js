import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    margin: "50px auto",
    // display:"flex"
  },
  container:{
    position:"relative",
    zIndex:100,
    padding:"80px 100px 0"
  },
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
  },
  title: {
    marginBottom: 20,
    fontWeight:400
  },
  subTitle:{
    fontWeight:400,
    "& a":{
      color:theme.palette.primary.main,
      textDecoration:"none",
      cursor:"pointer"
    }
  },
  button: {
    marginTop:20,
    position:"relative",
    zIndex:100
  },
}))
