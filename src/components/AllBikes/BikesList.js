import { useSelector } from "react-redux";
import BikeItem from "./BikeItem";

const BikesList = () => {
  const availableBikes = useSelector((state) => state.bikes.bikes);

  return (
    <div>
      {Object.keys(availableBikes).map((bike) => (
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

// style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
