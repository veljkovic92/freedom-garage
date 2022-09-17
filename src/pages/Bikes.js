import BikesDesc from "../components/AllBikes/BikesDesc";
import BikesList from "../components/AllBikes/BikesList";

import classes from "./Bikes.module.css";

const Bikes = () => {
  return (
    <section className={classes.bikes}>
      <BikesDesc />
      <BikesList />
    </section>
  );
};

export default Bikes;
