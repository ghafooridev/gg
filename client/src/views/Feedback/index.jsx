import React from "react"

import {Grid} from "@material-ui/core"

import {useForm} from "react-hook-form"

import TextField from "../../components/sharedComponents/TextField"
import {validationMessage} from "../../utils/ValidationMessage"
import Button from "../../components/sharedComponents/Button"
import Constant from "../../utils/Constant"
import AlertAction from "../../redux/actions/AlertAction"
import {styles} from "./Feedback.Style"
import feedbackRepository from "../../repositories/feedback";
import Selector from "../../components/sharedComponents/Selector";
import dialogAction from "../../redux/actions/dialogAction";

const Forget = function () {
  const classes = styles()
  const {register, handleSubmit, errors} = useForm()

  const onSubmit=function (data){
    feedbackRepository.add(data).then((result) => {
      if (result) {
        dialogAction.hide()
        AlertAction.show({type: "success", text: Constant.MESSAGES.SEND_FEEDBACK})
      }
    })
  }

  return (
    <Grid item sm={12} className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Grid container spacing={3} className={classes.inputs}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              icon="account_circle"
              className={classes.input}
              inputRef={register({
                required: validationMessage("Name", "required"),
              })}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              icon="mail"
              className={classes.input}
              inputRef={register({
                required: validationMessage("Email address", "required"),
              })}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
             <Selector
              name="category"
              label="Category"
              icon="account_circle"
              inputRef={register({
                required: validationMessage("Category", "required"),
              })}
              error={errors.category}
              options={Constant.ENUMS.FEEDBACK_CATEGORY}
             />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              rows={4}
              className={classes.input}
              inputRef={register()}
              error={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Button label="Send Message" className={classes.button} onClick={handleSubmit(onSubmit)} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Forget
