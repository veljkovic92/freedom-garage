import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import classes from "./GarageItemValue.modal.css";

const GarageItemValue = (props) => {
  const dispatch = useDispatch();
  const selectedCartItems = useSelector((state) => state.cart.items);
  const [itemValue, setItemValue] = useState("");
  const [color, setColor] = useState("");
  const [wheel, setWheel] = useState("");
  const [exhaust, setExhaust] = useState("");
  const [windshield, setWindshield] = useState("");

  const id = props.id;

  const selectedCartItem = selectedCartItems.find(
    (item) => item.id === props.id
  );

  const selectedCartItemUpgrade = Object.keys(selectedCartItem.config)
    .map((item) => {
      // if (selectedCartItem.config[item].name === props.name) {
      //   return selectedCartItem.config[item];
      // }
      return selectedCartItem.config[item];
    })
    .find((item) => {
      if (item.name === props.name) {
        return item;
      }
    });

  const { name, price, value } = selectedCartItemUpgrade;

  console.log(selectedCartItemUpgrade);

  const logoChangeSubmitHandler = () => {
    dispatch(
      cartActions.addCartItemValue({
        id: id,
        name: name.toLowerCase(),
        value: itemValue,
      })
    );
  };

  // try to pass here all the properties from object like in CartItem

  // namesti da useEffect direktno vraca u parent komponentu sadrzaj inputa na svakoj promeni

  // useEffect(() => {
  //   dispatch(
  //     cartActions.addCartItemValue({
  //       id: id,
  //       name: name.toLowerCase(),
  //       value: logo,
  //     })
  //   );
  // }, [logo]);

  // if (props.name === "logo") {
  //   if (props.value === "none") {
  //     return <span className={classes.value}></span>;
  //   } else {
  //     return <input type="text" onChange={(event) => setLogo(event.target.value)}></input>;
  //   }
  // }

  // uradi za sve caseve gde imas promene i gde treba da postoje inputi u garage item ovako kao ispod

  return (
    <>
      {name === "Logo" && price !== 0 && value !== "none" && (
        <span className={classes.value}>{value}</span>
      )}
      {name === "Logo" && price === 0 && value === "none" && (
        <span className={classes.value}>none</span>
      )}
      {name === "Logo" && price !== 0 && value === "none" && (
        <>
          <input
            type="text"
            className={classes["garage-item-value-input"]}
            onChange={(event) => setItemValue(event.target.value)}
            style={{ width: "80%", borderRadius: "5px" }}
          ></input>
          <button onClick={logoChangeSubmitHandler}></button>
        </>
      )}

      {name === "Color" && price !== 0 && value !== "none" && (
        <span className={classes.value}>{value}</span>
      )}
      {name === "Color" && price === 0 && value === "none" && (
        <span className={classes.value}>none</span>
      )}
      {name === "Color" && price !== 0 && value === "none" && (
        <>
          <input
            type="color"
            className={classes["garage-item-value-input"]}
            onChange={(event) => setItemValue(event.target.value)}
            style={{ width: "50%", borderRadius: "5px" }}
          ></input>
          <button onClick={logoChangeSubmitHandler}></button>
        </>
      )}

      {name === "Wheel" && price !== 0 && value !== "none" && (
        <span className={classes.value}>{value}</span>
      )}
      {name === "Wheel" && price === 0 && value === "none" && (
        <span className={classes.value}>none</span>
      )}
      {name === "Wheel" && price !== 0 && value === "none" && (
        <>
          <input
            type="color"
            className={classes["garage-item-value-input"]}
            onChange={(event) => setItemValue(event.target.value)}
            style={{ width: "50%", borderRadius: "5px" }}
          ></input>
          <button onClick={logoChangeSubmitHandler}></button>
        </>
      )}

      {name === "Exhaust" && price !== 0 && value !== "none" && (
        <span className={classes.value}>{value}</span>
      )}
      {name === "Exhaust" && price === 0 && value === "none" && (
        <span className={classes.value}>none</span>
      )}
      {name === "Exhaust" && price !== 0 && value === "none" && (
        <>
          <input
            type="range"
            id="exhaust-range"
            onChange={(event) => setItemValue(event.target.value)}
            className={classes["garage-item-value-input"]}
            style={{ width: "50%", borderRadius: "5px" }}
            min="0"
            max="100"
            step="50"
          ></input>
          <button onClick={logoChangeSubmitHandler}></button>
        </>
      )}

      {name === "Power" && price !== 0 && value !== "none" && (
        <span className={classes.value}>{value}</span>
      )}
      {name === "Power" && price === 0 && value === "none" && (
        <span className={classes.value}>none</span>
      )}
      {name === "Power" && price !== 0 && value === "none" && (
        <>
          <input
            type="range"
            id="power-range"
            className={classes["garage-item-value-input"]}
            style={{ width: "50%", borderRadius: "5px" }}
            onChange={(event) => setItemValue(event.target.value)}
            min="15"
            max="30"
            step="15"
            defaultValue="15"
          ></input>

          <button onClick={logoChangeSubmitHandler}></button>
        </>
      )}

      {(name === "Seat" ||
        name === "Suspension" ||
        name === "Brakes" ||
        name === "Windshield") && (
        <span className={classes.value}>{props.value}</span>
      )}
    </>
  );
};

export default GarageItemValue;
