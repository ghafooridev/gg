import React, { useRef } from "react"

import Carousel from "react-elastic-carousel"
import { Typography } from "@material-ui/core"
import { styles } from "./CollegeSlider.Style"
import C1 from "../../../../../assets/images/CollegeLogo/c1.jpg"
import C2 from "../../../../../assets/images/CollegeLogo/c2.png"
import C3 from "../../../../../assets/images/CollegeLogo/c3.png"
import C4 from "../../../../../assets/images/CollegeLogo/c4.jpg"
import C5 from "../../../../../assets/images/CollegeLogo/c5.png"
import C6 from "../../../../../assets/images/CollegeLogo/c6.png"
import C7 from "../../../../../assets/images/CollegeLogo/c7.jpg"
import C8 from "../../../../../assets/images/CollegeLogo/c8.png"
import C9 from "../../../../../assets/images/CollegeLogo/c9.png"

const Intro = function () {
  const classes = styles()
  const carousel = useRef(null)
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 850, itemsToShow: 4 },
    { width: 1150, itemsToShow: 6 },
  ]
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Who is playing ?
      </Typography>
      <Carousel
        ref={carousel}
        itemsToScroll={1}
        itemsToShow={5}
        pagination={false}
        enableAutoPlay
        showArrows={false}
        breakPoints={breakPoints}
        onChange={(currentItem) => {
          if (currentItem.index === 3) {
            carousel.current.goTo(0)
          }
        }}
      >
        <img src={C1} alt="college" className={classes.image} />
        <img src={C2} alt="college" className={classes.image} />
        <img src={C3} alt="college" className={classes.image} />
        <img src={C4} alt="college" className={classes.image} />
        <img src={C5} alt="college" className={classes.image} />
        <img src={C6} alt="college" className={classes.image} />
        <img src={C7} alt="college" className={classes.image} />
        <img src={C8} alt="college" className={classes.image} />
        <img src={C9} alt="college" className={classes.image} />
      </Carousel>
    </div>
  )
}

export default Intro
