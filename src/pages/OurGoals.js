import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1 } from "@fortawesome/free-solid-svg-icons";
import { fa2 } from "@fortawesome/free-solid-svg-icons";
import { fa3 } from "@fortawesome/free-solid-svg-icons";
import classes from "./OurGoals.module.css";

const OurGoals = () => {
  return (
    <section className={classes.home}>
      <header className={classes["home-header"]}>
        <h2 className="page-header">One couple's dream of "Freedom Garage"</h2>
        <p className={classes["goal-desc"]}>
          Always wanted to feel the freedom of the open road, wear a bandana and
          have a ponytail, explore the unknown or lose yourself in the nature?
          If at least one of those clicks for you, than we must say you're on
          the right place, at the right time. The "Freedom Garage" is project
          made by a few guys who tick all of the boxes mentioned above... So,
          needless to say, we feel and know what the choice of a motorcycle that
          suits each person's needs means. Our three concepts of delivering the
          best possible "Freedom machine" are:
        </p>
      </header>

      <main className={classes.story}>
        <div className={classes["story-row"]}>
          <FontAwesomeIcon icon={fa1} className={classes.number} />

          <div className={classes["text-row"]}>
            We search both digitally and personally to find the best possible
            bikes that are still in warranty, basically unscratched, perfectly
            maintained, always-garaged and customization-friendly pieces. Those
            cherry picked ones than are stored in our workshop where me and
            Tatjana recheck each part of the bike.
          </div>
          <div className={`${classes["img-row"]} ${classes.img1}`}></div>
        </div>
        <div className={classes["story-row"]}>
          <div className={`${classes["img-row"]} ${classes.img2}`}></div>
          <div className={classes["text-row"]}>
            Than, we start creating the blueprints and graphical concepts of how
            the bike should perform and look. This proces is very important for
            us so we take our time and think deeply about all the factors in
            order to find the perfect balance between functionality and
            aesthethics, without sacrificing neither.
          </div>
          <FontAwesomeIcon icon={fa2} className={classes.number} />
        </div>
        <div className={classes["story-row"]}>
          <FontAwesomeIcon icon={fa3} className={classes.number} />
          <div className={classes["text-row"]}>
            The last part is testing this piece of art somewhere in the wild.
            Depending on the each bike and it's main purpose with the target
            rider's needs on our minds, we can go off-roading, highway rocketing
            or curving some backroads. The bike is being tested until we both
            make sure that rider and pillion will both be happy spending time on
            the chosen one.
          </div>
          <div className={`${classes["img-row"]} ${classes.img3}`}></div>
        </div>
      </main>
    </section>
  );
};

export default OurGoals;
