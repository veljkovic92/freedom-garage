import classes from "./Card.module.css";

const Card = (props) => {
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
