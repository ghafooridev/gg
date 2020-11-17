import React from "react"
import { useSelector } from "react-redux"
import dialogAction from "src/redux/actions/dialogAction"
import { Grid, Dialog, DialogTitle, Typography } from "@material-ui/core"
import { styles } from "./Modal.Style"

const Modal = function () {
  const classes = styles()
  const { show, component, title, onAction } = useSelector(
    (state) => state.dialog
  )

  const onClose = function () {
    dialogAction.hide()
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={show} disableBackdropClick>
      <DialogTitle id="simple-dialog-title">
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h6">{title}</Typography>
          <i
            className="material-icons"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          >
            clear
          </i>
        </Grid>
      </DialogTitle>
      {component && React.cloneElement(component, { onAction })}
    </Dialog>
  )
}

export default Modal
