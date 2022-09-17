import classes from "./BikesDesc.module.css";

const BikesDesc = () => {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <h2>Here is our list of available bikes for {currentMonth} .</h2>
    </>
  );
};

export default BikesDesc;
