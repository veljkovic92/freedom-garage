import BikesDesc from "../components/AllBikes/BikesDesc";
import BikesList from "../components/AllBikes/BikesList";
import ConfigNotification from "../components/Layout/ConfigNotification";
import { useSelector } from "react-redux";
import classes from "./Bikes.module.css";

const Bikes = () => {
  const notification = useSelector(state => state.ui.notification);

  return (
    <section className={classes.bikes}>
      <BikesDesc />
      <BikesList />
      {notification && notification.status === "order set" && (
        <ConfigNotification
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default Bikes;
