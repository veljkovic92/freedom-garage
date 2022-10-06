import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCartData } from "../../../../store/cart-actions";
import { cartActions } from "../../../../store/cart-slice";
import { uiActions } from "../../../../store/ui-slice";
import ConfigNotification from "../../../Layout/ConfigNotification";
import TimeBanner from "../../../Layout/TimeBanner";

import classes from "./ConfigForm.module.css";

let firstSubmit = true;

const ConfigForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const bikes = useSelector((state) => state.bikes.bikes);
  const cart = useSelector((state) => state.cart.items);

  const selectedBike = bikes[params.bikeId];

  const selectedBikeUpgrades = selectedBike.upgrades;

  const {
    logo: bikeLogo,
    color: bikeColor,
    wheel: bikeWheel,
    exhaust: bikeExhaust,
    seat: bikeSeat,
    suspension: bikeSuspension,
    windshield: bikeWindshield,
    brakes: bikeBrakes,
    power: bikePower,
  } = selectedBikeUpgrades;

  const bikeBackground = <div className={`${classes[params.bikeId]}`}></div>;

  const [formState, setFormState] = useState({
    isLogoChecked: false,
    isLogoChanged: false,
    logo: "",
    isColorChecked: false,
    isColorChanged: false,
    color: "",
    isWheelChecked: false,
    isWheelChanged: false,
    wheel: "",
    isExhaustChecked: false,
    isExhaustChanged: false,
    exhaust: "",
    isSeatChecked: false,
    isSuspensionChecked: false,
    isBrakesChecked: false,
    isWindshieldChecked: false,
    isPowerChecked: false,
    isPowerChanged: false,
    power: "",
  });

  const [formIsValid, setFormIsValid] = useState(true);

  const {
    isLogoChecked,
    isLogoChanged,
    logo,
    isColorChecked,
    isColorChanged,
    color,
    isWheelChecked,
    isWheelChanged,
    wheel,
    isExhaustChecked,
    isExhaustChanged,
    exhaust,
    isSeatChecked,
    isSuspensionChecked,
    isBrakesChecked,
    isWindshieldChecked,
    isPowerChecked,
    isPowerChanged,
    power,
  } = formState;

  useEffect(() => {
    if (isExhaustChecked && exhaust.length === 0) {
      formState.exhaust = "Normal Sound";
    } else if (!isExhaustChecked) {
      formState.exhaust = "";
    }
    if (isPowerChecked && power.length === 0) {
      formState.power = "+15HP";
    } else if (!isPowerChecked) {
      formState.power = "";
    }
  }, [isExhaustChecked, isPowerChecked]);

  let waitingTime = 0;

  if (isLogoChecked) {
    waitingTime += bikeLogo.waitingTime;
  }
  if (isColorChecked) {
    waitingTime += bikeColor.waitingTime;
  }
  if (isWheelChecked) {
    waitingTime += bikeWheel.waitingTime;
  }
  if (isExhaustChecked) {
    waitingTime += bikeExhaust.waitingTime;
  }
  if (isSeatChecked) {
    waitingTime += bikeSeat.waitingTime;
  }
  if (isSuspensionChecked) {
    waitingTime += bikeSuspension.waitingTime;
  }
  if (isBrakesChecked) {
    waitingTime += bikeBrakes.waitingTime;
  }
  if (isWindshieldChecked) {
    waitingTime += bikeWindshield.waitingTime;
  }
  if (isPowerChecked) {
    waitingTime += bikePower.waitingTime;
  }

  const onCheckedHandler = (upgrade) => {
    setFormState((prevState) => ({
      ...prevState,
      [upgrade]: !prevState[upgrade],
    }));
  };

  const onChangeHandler = (changed, chosen, event) => {
    const value = event.target.value;
    if (chosen === "logo" || chosen === "color" || chosen === "wheel") {
      if (event.target.value.trim().length !== 0) {
        setFormState((prevState) => ({
          ...prevState,
          [changed]: true,
          [chosen]: value,
        }));
      }
    }
    if (chosen === "exhaust") {
      if (value === "0") {
        setFormState((prevState) => ({
          ...prevState,
          [chosen]: "Thundering Sound",
        }));
      } else if (value === "50") {
        setFormState((prevState) => ({
          ...prevState,
          [chosen]: "Normal Sound",
        }));
      } else if (value === "100") {
        setFormState((prevState) => ({
          ...prevState,
          [chosen]: "Roaring Sound",
        }));
      }
      setFormState((prevState) => ({
        ...prevState,
        [changed]: true,
      }));
    }
    if (chosen === "power") {
      setFormState((prevState) => ({
        ...prevState,
        [changed]: true,
        [chosen]: `+${value}HP`,
      }));
    }
  };

  const onBlurHandler = (event) => {
    const id = event.target.id;

    if (id === "logo" && event.target.value.length === 0) {
      return dispatch(
        uiActions.showNotification({
          status: "incomplete",
          title: `Incomplete ${id} configuration`,
          message: `Please make sure to choose your prefered ${id}!`,
        })
      );
    }
    if (
      (id === "color" && formState.isColorChanged === false) ||
      (id === "wheel" && formState.isWheelChanged === false)
    ) {
      return dispatch(
        uiActions.showNotification({
          status: "incomplete",
          title: `Incomplete ${id} configuration`,
          message: `Please make sure to choose your prefered ${id}!`,
        })
      );
    }
  };

  useEffect(() => {
    const checkValidity = (checked, changed, value) => {
      if (checked && !changed) {
        setFormIsValid(false);
      } else {
        setFormIsValid(true);
      }
    };

    checkValidity(isLogoChecked, isLogoChanged, "logo");
    checkValidity(isColorChecked, isColorChanged, "color");
    checkValidity(isWheelChecked, isWheelChanged, "wheel");
  }, [
    isLogoChecked,
    isLogoChanged,
    isColorChecked,
    isColorChanged,
    isWheelChecked,
    isWheelChanged,
    isExhaustChecked,
    isExhaustChanged,
    isPowerChecked,
    isPowerChanged,
  ]);

  const configFormSubmitHandler = (event) => {
    event.preventDefault();
    if (firstSubmit === true) {
      if (
        !isExhaustChecked ||
        !isSeatChecked ||
        !isSuspensionChecked ||
        !isBrakesChecked ||
        !isWindshieldChecked
      ) {
        firstSubmit = false;
        alert("Are you sure you don't want to add any more upgrades?");
      } else {
        firstSubmit = false;
        alert(
          "Please understand that the waiting time will be longer in order to process all of the upgrades"
        );
      }
    }

    const logoConfig = isLogoChanged
      ? {
          name: "Logo",
          value: logo,
          waitingTime: bikeLogo.waitingTime,
          price: bikeLogo.price,
        }
      : {
          name: "Logo",
          value: "none",
          waitingTime: 0,
          price: 0,
        };
    const colorConfig = isColorChanged
      ? {
          name: "Color",
          value: color,
          waitingTime: bikeColor.waitingTime,
          price: bikeColor.price,
        }
      : { name: "Color", value: "none", waitingTime: 0, price: 0 };
    const wheelConfig = isWheelChanged
      ? {
          name: "Wheel",
          value: wheel,
          waitingTime: 1,
          price: bikeWheel.price,
        }
      : { name: "Wheel", value: "none", waitingTime: 0, price: 0 };
    const exhaustConfig = isExhaustChecked
      ? {
          name: "Exhaust",
          value: exhaust,
          waitingTime: 2,
          price: bikeExhaust.price,
        }
      : { name: "Exhaust", value: "none", waitingTime: 0, price: 0 };
    const seatConfig = isSeatChecked
      ? {
          name: "Seat",
          value: "yes",
          waitingTime: bikeSeat.waitingTime,
          price: bikeSeat.price,
        }
      : { name: "Seat", value: "none", waitingTime: 0, price: 0 };
    const suspensionConfig = isSuspensionChecked
      ? {
          name: "Suspension",
          value: "yes",
          waitingTime: bikeSuspension.waitingTime,
          price: bikeSuspension.price,
        }
      : { name: "Suspension", value: "none", waitingTime: 0, price: 0 };
    const brakesConfig = isBrakesChecked
      ? {
          name: "Brakes",
          value: "yes",
          waitingTime: bikeBrakes.waitingTime,
          price: bikeBrakes.price,
        }
      : { name: "Brakes", value: "none", waitingTime: 0, price: 0 };
    const windshieldConfig = isWindshieldChecked
      ? {
          name: "Windshield",
          value: "yes",
          waitingTime: bikeWindshield.waitingTime,
          price: bikeWindshield.price,
        }
      : { name: "Windshield", value: "none", waitingTime: 0, price: 0 };
    const powerConfig = isPowerChecked
      ? {
          name: "Power",
          value: power,
          waitingTime: bikePower.waitingTime,
          price: bikePower.price,
        }
      : { name: "Power", value: "none", waitingTime: 0, price: 0 };

    const chosenUpgrades = {
      logo: logoConfig,
      color: colorConfig,
      wheel: wheelConfig,
      exhaust: exhaustConfig,
      seat: seatConfig,
      suspension: suspensionConfig,
      brakes: brakesConfig,
      windshield: windshieldConfig,
      power: powerConfig,
    };

    let configPrice = 0;

    Object.keys(chosenUpgrades).forEach(
      (item) => (configPrice += chosenUpgrades[item].price)
    );

    let configTime = 0;

    Object.keys(chosenUpgrades).forEach(
      (item) => (configTime += chosenUpgrades[item].waitingTime)
    );

    const currentDate = new Date().toLocaleString();
    

    const chosenConfig = {
      id: selectedBike.id,
      name: selectedBike.name,
      config: chosenUpgrades,
      waitingTime: configTime,
      totalConfigPrice: configPrice,
      date: currentDate,
    };

    dispatch(cartActions.addToCart(chosenConfig));
  };

  return (
    <>
      {notification && (
        <ConfigNotification
          title={notification.title}
          message={notification.message}
        />
      )}
      <h2>
        Personalise the character and look of your bike with following upgrades:
      </h2>
      {bikeBackground}
      <form className={classes.form} onSubmit={configFormSubmitHandler}>
        <div className={classes.aesthethics}>
          <h2>Aesthethics Upgrades</h2>

          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Personal Logo</h3>
              <p>
                Got something that represents you uniquely? We can add it to
                your bike and make it have your personal stamp.
              </p>

              <input
                type="checkbox"
                id="logo"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isLogoChecked")}
              ></input>
              <label htmlFor="logo" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <div className={classes["toggled-input"]}>
                <input
                  type="text"
                  id="logo"
                  onChange={(event) =>
                    onChangeHandler("isLogoChanged", "logo", event)
                  }
                  onBlur={onBlurHandler}
                  className={isLogoChecked ? "" : classes.toggle}
                ></input>
              </div>

              <span className={classes.price}>Price: {bikeLogo.price}</span>
            </div>
            <div
              className={`${classes.logo} ${classes["right-container"]}`}
            ></div>
          </div>

          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Color</h3>
              <p>
                Choose your favorite color from the palette below. We will make
                sure it looks exactly same on your machine.
              </p>

              <input
                type="checkbox"
                id="color"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isColorChecked")}
              ></input>
              <label htmlFor="color" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <div className={classes["toggled-input"]}>
                <input
                  type="color"
                  id="color"
                  onChange={(event) =>
                    onChangeHandler("isColorChanged", "color", event)
                  }
                  onBlur={onBlurHandler}
                  className={isColorChecked ? "" : classes.toggle}
                ></input>
              </div>

              <span className={classes.price}>Price: {bikeColor.price}</span>
            </div>
            <div
              className={`${classes.color} ${classes["right-container"]}`}
            ></div>
          </div>

          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Wheel Decal</h3>
              <p>
                Our decals cover the inner and sides of the wheel and reflect
                the light so the overall visibility will be increased. Not to
                mention the "Cool" factor.
              </p>

              <input
                type="checkbox"
                id="wheel"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isWheelChecked")}
              ></input>
              <label htmlFor="wheel" className={classes.label}>
                <span className={classes.ball}></span>
              </label>

              <div className={classes["toggled-input"]}>
                <input
                  type="color"
                  id="wheel"
                  onChange={(event) =>
                    onChangeHandler("isWheelChanged", "wheel", event)
                  }
                  onBlur={onBlurHandler}
                  className={isWheelChecked ? "" : classes.toggle}
                ></input>
              </div>

              <span className={classes.price}>Price: {bikeWheel.price}</span>
            </div>
            <div
              className={`${classes.wheel} ${classes["right-container"]}`}
            ></div>
          </div>
        </div>

        <div className={classes.functionality}>
          <h2>Functionality Upgrades</h2>
          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Exhaust</h3>
              <p>
                Made from titanium to endure even the highest heat, this exhaust
                is able to withstand different weather conditions for years to
                come.
              </p>
              <input
                type="checkbox"
                id="exhaust"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isExhaustChecked")}
              ></input>
              <label htmlFor="exhaust" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <div className={classes["toggled-input"]}>
                <span
                  className={isExhaustChecked ? classes.range : classes.toggle}
                >
                  <label htmlFor="exhaust-range">
                    Thundering/Normal/Roaring Sound
                  </label>

                  <input
                    type="range"
                    id="exhaust-range"
                    onChange={(event) =>
                      onChangeHandler("isExhaustChanged", "exhaust", event)
                    }
                    onBlur={onBlurHandler}
                    min="0"
                    max="100"
                    step="50"
                  ></input>

                  <span>{exhaust}</span>
                </span>
              </div>
              <span className={classes.price}>{bikeExhaust.price}</span>
            </div>
            <div
              className={`${classes.exhaust} ${classes["right-container"]}`}
            ></div>
          </div>

          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Extra Seat Polster</h3>
              <p>
                20 years of experience in riders comfort meet the highest
                quality materials. The result is the product that is created for
                each rider individually.
              </p>
              <input
                type="checkbox"
                id="seat"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isSeatChecked")}
              ></input>
              <label htmlFor="seat" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <span className={classes.price}>{bikeSeat.price}</span>
            </div>
            <div
              className={`${classes.seat} ${classes["right-container"]}`}
            ></div>
          </div>

          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Suspension Upgrade</h3>
              <p>
                Want to feel like on the cloud while traveling or like a pro
                racer while slashing the curves? Both are possible with our
                easily adjustable components.
              </p>
              <input
                type="checkbox"
                id="suspension"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isSuspensionChecked")}
              ></input>
              <label htmlFor="suspension" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <span className={classes.price}>{bikeSuspension.price}</span>
            </div>
            <div
              className={`${classes.suspension} ${classes["right-container"]}`}
            ></div>
          </div>

          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Brakes Upgrade</h3>
              <p>
                We know that confidence and handling depend a lot on stopping
                power and these brakes will make you feel in control of any
                situation.
              </p>
              <input
                type="checkbox"
                id="brakes"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isBrakesChecked")}
              ></input>
              <label htmlFor="brakes" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <span className={classes.price}>{bikeBrakes.price}</span>
            </div>
            <div
              className={`${classes.brakes} ${classes["right-container"]}`}
            ></div>
          </div>

          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Touring Windshield</h3>
              <p>
                Electronically adjustable windshield to suit any riders height
                and make high-speed run a lot more comfortable.
              </p>
              <input
                type="checkbox"
                id="windshield"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isWindshieldChecked")}
              ></input>
              <label htmlFor="windshield" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <span className={classes.price}>{bikeWindshield.price}</span>
            </div>
            <div
              className={`${classes.windshield} ${classes["right-container"]}`}
            ></div>
          </div>

          <div className={classes.container}>
            <div className={classes["left-container"]}>
              <h3>Power upgrade</h3>
              <p>
                The delivery of the power will be increased by 15-30%, gear
                shifting softened and overall smoothness of the engine improved.
              </p>
              <input
                type="checkbox"
                id="power"
                className={classes.toggle}
                onChange={() => onCheckedHandler("isPowerChecked")}
              ></input>
              <label htmlFor="power" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <div className={classes["toggled-input"]}>
                <span
                  className={isPowerChecked ? classes.range : classes.toggle}
                >
                  <label htmlFor="power-range">Amount (HP)</label>
                  <input
                    type="range"
                    id="power-range"
                    onChange={(event) =>
                      onChangeHandler("isPowerChanged", "power", event)
                    }
                    onBlur={onBlurHandler}
                    min="15"
                    max="30"
                    step="15"
                    defaultValue="15"
                  ></input>
                  <span className={classes["range-value"]}>{power}</span>
                </span>
              </div>
              <span className={classes.price}>{bikePower.price}</span>
            </div>
            <div
              className={`${classes.power} ${classes["right-container"]}`}
            ></div>
          </div>
        </div>
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </form>
      {waitingTime && <TimeBanner time={waitingTime} />}
    </>
  );
};

export default ConfigForm;
