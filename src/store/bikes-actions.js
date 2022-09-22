import { bikesActions } from "./bikes-slice";

export const fetchBikesData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-de4ad-default-rtdb.europe-west1.firebasedatabase.app/availableBikes.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong while getting bikes");
      }
      const data = await response.json();
      return data;
    };
    try {
      const bikesData = await fetchData();
      dispatch(bikesActions.getBikes(bikesData));
    } catch (error) {
      console.log(error);
    }
  };
};
