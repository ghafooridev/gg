import React, { useEffect, useRef } from "react"
import { Grid, Typography } from "@material-ui/core"
import { styles } from "../Pictionary.Style"

const VideoBox = function ({ user, index, turn, src }) {
  const classes = styles()
  const videoRef = useRef(null)
  const onIconClick = function (type) {
    console.log(type)
  }

  const addVideoStream = function (stream) {
    videoRef.current.srcObject = stream
    videoRef.current.muted = true
    videoRef.current.addEventListener("loadedmetadata", () => {
      videoRef.current.play()
    })
  }

  useEffect(() => {
    if (src) {
      addVideoStream(src[index])
    }
  }, [user])

  return (
    <div className={classes.videoBox}>
      <video ref={videoRef} />
      <span className="index">{index}</span>
      <Typography className="point" variant="body1" color="primary">
        {user.point} points
      </Typography>
      <Grid className="icons">
        {user.username === turn && (
          <i className="material-icons" onClick={() => onIconClick("volume")}>
            edit
          </i>
        )}
        <i className="material-icons" onClick={() => onIconClick("volume")}>
          volume_up
        </i>
        <i className="material-icons" onClick={() => onIconClick("leave")}>
          clear
        </i>
      </Grid>
      <Typography className="name" variant="h6">
        {user.username}
      </Typography>
      <Typography className="school" variant="body2">
        {user.university}
      </Typography>
    </div>
  )
}

export default VideoBox
