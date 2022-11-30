import { useSelector } from "react-redux";
import BikeItem from "./BikeItem";
import classes from "./BikesList.module.css"

const BikesList = () => {
  const availableBikes = useSelector((state) => state.bikes.bikes);
  return (
    
    <div className={classes["bikes-list"]}>
<<<<<<< HEAD

   
=======
>>>>>>> c4c645eba02557bf99c6bce1bd58e0bca78842b6
      {availableBikes && Object.keys(availableBikes).map((bike) => (
        <BikeItem
          key={availableBikes[bike].id}
          id={availableBikes[bike].id}
          name={availableBikes[bike].name}
          img={availableBikes[bike].img}
          desc={availableBikes[bike].desc}
          price={availableBikes[bike].price}
        />
      ))}
    </div>
    
  );
};

export default BikesList;
