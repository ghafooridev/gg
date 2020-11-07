import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  root: {
    margin: "50px 0",
    // display:"flex"
  },
  leftPanel: {
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
  },
  title: {
    marginBottom: 20,
  },
  rightPanel: {
    padding: 50,
		[theme.breakpoints.down("xs")]: {
			padding:'20px 0'
		},
  },
  button: {
    marginTop: 30,
  },
}))
