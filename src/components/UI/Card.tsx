import React, { MouseEventHandler, ReactNode } from 'react';
import classes from "./Card.module.css";

type CardProps = {
  onClick: MouseEventHandler,
  children: ReactNode,
  className: string
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </section>
  );
};

export default Card;
