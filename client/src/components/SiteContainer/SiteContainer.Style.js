import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    padding: "10px 150px",
    [theme.breakpoints.down("xs")]:{
      padding: "10px 50px"
    }
  },
}))
