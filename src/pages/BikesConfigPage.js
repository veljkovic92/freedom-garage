import ConfigForm from "../components/AllBikes/BikesConfig/ConfigForm/ConfigForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import classes from "./BikesConfigPage.module.css"

const BikesConfigPage = () => {
  const params = useParams();
  const bikes = useSelector((state) => state.bikes.bikes);
  
  if (!bikes) {
    return <p>Error fetching bikes from database</p>;
  }
  const foundBike = bikes[params.bikeId];

  if (!foundBike) {
    return <NotFound />;
  }

  return (
    <div className={classes["bikes-config-page"]}>
      <ConfigForm bike={params} />
    </div>
  );
};

export default BikesConfigPage;
