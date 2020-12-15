import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
  "@global": {
    "*": {
      fontFamily: "Asap",
    },
    "*::-webkit-scrollbar": {
      width: 7,
    },
    "*::-webkit-scrollbar-track": {
      borderRadius: 10,
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 5,
    },
  },
}))
