import classes from "./BikesDesc.module.css";

const BikesDesc = () => {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <h2 className="page-header">Available Bikes for {currentMonth}</h2>
    </>
  );
};

export default BikesDesc;
