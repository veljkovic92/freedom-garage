import ConfigForm from "../components/AllBikes/BikesConfig/ConfigForm/ConfigForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";

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
    <>
      <ConfigForm bike={params} />
    </>
  );
};

export default BikesConfigPage;
