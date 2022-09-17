import { useHistory } from "react-router-dom";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const history = useHistory();
  const onClickHandler = () => {
    history.push("/bikes");
  };

  return (
    <main className={classes.welcome}>
      <h2>Thank you for registering and welcome to your personal garage!</h2>
      <p>
        Here you can see all your saved motorcycles, their specs and the
        configuration you chose for each of them. <br /> Now, to start browsing
        whats currently available on our market, please press the button below
        and enjoy the vast variety of carefully chosen options.
      </p>
      <button onClick={onClickHandler}>See what's up on the podium!</button>
      <p>
        P.S. <br /> If you require any assistance in either choosing or
        customising your loved two-wheeler, don't hesitate to contact us on one
        of the provided option in the "About Us" section...
      </p>
    </main>
  );
};

export default Welcome;
