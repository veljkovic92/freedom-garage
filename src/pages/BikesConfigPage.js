import ConfigForm from "../components/AllBikes/BikesConfig/ConfigForm/ConfigForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";

const BikesConfigPage = () => {
  const params = useParams();
  const availableBikes = useSelector((state) => state.cart.availableBikes);
  const foundBike = Object.keys(availableBikes).find(
    (bike) => availableBikes[bike].name.toLowerCase() === params.bikeId
  );

  if (!foundBike) {
    return <NotFound />;
  }

  return (
    <>
      <h2>Bikes Config Page</h2>

      <ConfigForm bike={params} />
    </>
  );
};

export default BikesConfigPage;
