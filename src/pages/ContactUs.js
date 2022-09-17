import { useState } from "react";
import classes from "./ContactUs.module.css";

const ContactUs = () => {
  const [isHoverLeft, setIsHoverLeft] = useState(false);
  const [isHoverRight, setIsHoverRight] = useState(false);

  const onLeftMouseEnterHandler = () => {
    setIsHoverLeft(true);
  };

  const onRightMouseEnterHandler = () => {
    setIsHoverRight(true);
  };

  const onLeftMouseLeaveHandler = () => {
    setIsHoverLeft(false);
  };

  const onRightMouseLeaveHandler = () => {
    setIsHoverRight(false);
  };

  // const classLeft = isHoverLeft && classes["hover-left"] classes.main};

  return (
    <main
      className={`${classes.contact} ${
        isHoverLeft ? classes["hover-left"] : undefined
      } ${isHoverRight ? classes["hover-right"] : undefined}`}
    >
      <section
        className={`${classes.split} ${classes.left}`}
        onMouseEnter={onLeftMouseEnterHandler}
        onMouseLeave={onLeftMouseLeaveHandler}
      >
        <h2>Stefan</h2>

        <p>
          Since young age I was mostly interested in how something functions and
          seeing stuff need repairing inspired me to find the proper,efficient
          solution. This continued later when my love towards two-wheelers grew
          bigger and bigger and with each new experience I researched
          functionality and comfort that directly influece riders capability.
          That's what I'm mostly doing in our "Future Garage".{" "}
        </p>
      </section>
      <section
        className={`${classes.split} ${classes.right}`}
        onMouseEnter={onRightMouseEnterHandler}
        onMouseLeave={onRightMouseLeaveHandler}
      >
        <h2>Tanja</h2>

        <p>
          Design and aesthethics were and are my passion. Wherever there was an
          opportunity for me to edit and personalise something, be it a random
          object on the road, the garden, outfit or the all-loving motorcycles,
          I DID IT ALL! In our garage, you'll find me drawing and preparing
          concepts for the riders as well as researching the net for the best
          possible part match.
        </p>
      </section>
    </main>
  );
};

export default ContactUs;
