import classes from "./TimeBanner.module.css";

const TimeBanner = (props) => {
  const isSingular = props.time < 2 ? "day" : "days";

  return (
    <div className={classes["time-banner"]}>
      <p>
        Estimated waiting time:
        <br />
        {props.time} working {isSingular}.
      </p>
    </div>
  );
};

export default TimeBanner;
