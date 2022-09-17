import { useSelector } from "react-redux";
import BikeItem from "./BikeItem";

const BikesList = () => {
  const availableBikes = useSelector((state) => state.cart.availableBikes);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {availableBikes.map((bike) => (
        <BikeItem
          key={bike.id}
          id={bike.id}
          name={bike.name}
          img={bike.img}
          desc={bike.desc}
          price={bike.price}
        />
      ))}
    </div>
  );
};

export default BikesList;
