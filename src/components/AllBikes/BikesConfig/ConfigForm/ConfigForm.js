import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  const bikes = useSelector((state) => state.cart.availableBikes);

  const selectedBike = bikes.find(
    (bike) => bike.name.toLowerCase() === params.bikeId
  );

  const selectedBikeUpgrades = selectedBike.upgrades;
  console.log(selectedBikeUpgrades);

  // const bikeLogo = selectedBikeUpgrades[0];
  // const bikeColor = selectedBikeUpgrades[1];
  // const bikeWheel = selectedBikeUpgrades[2];
  // const bikeExhaust = selectedBikeUpgrades[3];
  // const bikeSeat = selectedBikeUpgrades[4];
  // const bikeSuspension = selectedBikeUpgrades[5];
  // const bikeWindshield = selectedBikeUpgrades[6];
  // const bikeBrakes = selectedBikeUpgrades[7];
  // const bikePower = selectedBikeUpgrades[8];

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

  let bikeBackground;

  if (params.bikeId === "dragon") {
    bikeBackground = <div className={classes.dragon}></div>;
  } else if (params.bikeId === "firestorm") {
    bikeBackground = <div className={classes.firestorm}></div>;
  } else if (params.bikeId === "raptor") {
    bikeBackground = <div className={classes.raptor}></div>;
  } else {
    bikeBackground = <div className={classes.thunderstorm}></div>;
  }

  const [isLogoChecked, setIsLogoChecked] = useState(false);
  const [isLogoChanged, setIsLogoChanged] = useState(false);
  const [logo, setLogo] = useState("");
  const [isColorChecked, setIsColorChecked] = useState(false);
  const [isColorChanged, setIsColorChanged] = useState(false);
  const [color, setColor] = useState("");
  const [isWheelChecked, setIsWheelChecked] = useState(false);
  const [isWheelChanged, setIsWheelChanged] = useState(false);
  const [wheel, setWheel] = useState("");

  const [isExhaustChecked, setIsExhaustChecked] = useState(false);
  const [isExhaustRangeChanged, setIsExhaustRangeChanged] = useState(false);
  const [exhaustRangeValue, setExhaustRangeValue] = useState("");
  const [isSeatChecked, setIsSeatChecked] = useState(false);
  const [isSuspensionChecked, setIsSuspensionChecked] = useState(false);
  const [isBrakesChecked, setIsBrakesChecked] = useState(false);
  const [isWindshieldChecked, setIsWindshieldChecked] = useState(false);
  const [isPowerChecked, setIsPowerChecked] = useState(false);
  const [isPowerRangeChanged, setIsPowerRangeChanged] = useState(false);
  const [powerRangeValue, setPowerRangeValue] = useState("");

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
  console.log(waitingTime);

  const onLogoCheckedHandler = () => {
    setIsLogoChecked((prevValue) => !prevValue);
  };

  const onLogoChangeHandler = (event) => {
    if (event.target.value.trim().length !== 0) {
      setIsLogoChanged(true);
      setLogo(event.target.value);
    }
  };

  //Napravi za svaki INPUT poseban Blur handler da bi mogao razlicite input vrednosti da preuzmes i ispoljis u showNotification.

  const onLogoBlurHandler = (event) => {
    console.log(event);
    const value = event.target.id;
    if (event.target.value.length === 0) {
      return dispatch(
        uiActions.showNotification({
          status: "incomplete",
          title: `Incomplete ${value} configuration`,
          message: `Please make sure to choose your prefered value!`,
        })
      );
    }
  };

  const onColorCheckedHandler = () => {
    setIsColorChecked((prevValue) => !prevValue);
  };

  const onColorChangeHandler = (event) => {
    setIsColorChanged(true);
    setColor(event.target.value);
  };

  const onWheelCheckedHandler = () => {
    setIsWheelChecked((prevValue) => !prevValue);
  };

  const onWheelChangeHandler = (event) => {
    setIsWheelChanged(true);
    setWheel(event.target.value);
  };

  const onExhaustChangeHandler = (event) => {
    setIsExhaustChecked((prevValue) => !prevValue);
  };

  const onExhaustRangeChangeHandler = (event) => {
    let value = event.target.value;

    if (value === "0") {
      setExhaustRangeValue("Thundering Sound");
    } else if (value === "50") {
      setExhaustRangeValue("Normal Sound");
    } else if (value === "100") {
      setExhaustRangeValue("Roaring Sound");
    }
    setIsExhaustRangeChanged(true);
  };

  const onSeatChangeHandler = () => {
    setIsSeatChecked((prevValue) => !prevValue);
  };

  const onSuspensionChangeHandler = () => {
    setIsSuspensionChecked((prevValue) => !prevValue);
  };

  const onBrakesChangeHandler = () => {
    setIsBrakesChecked((prevValue) => !prevValue);
  };

  const onWindshieldChangeHandler = () => {
    setIsWindshieldChecked((prevValue) => !prevValue);
  };

  const onPowerChangeHandler = () => {
    setIsPowerChecked((prevState) => !prevState);
  };

  const onPowerRangeChangeHandler = (event) => {
    setIsPowerRangeChanged(true);
    let value = event.target.value;

    setPowerRangeValue(`+${value}HP`);
  };

  const configFormSubmitHandler = (event) => {
    event.preventDefault();
    if (firstSubmit === true) {
      if (
        !isExhaustChecked ||
        !isSeatChecked ||
        !isSuspensionChecked ||
        !isBrakesChecked ||
        isWindshieldChecked
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

    // See to make one unified notification for all the cases. Like this there's bug of showing only one even if more are invalid.

    const checkValidity = (checked, changed, value) => {
      if (checked && !changed) {
        return dispatch(
          uiActions.showNotification({
            status: "incomplete",
            title: `Incomplete ${value} configuration`,
            message: `Please make sure to choose your prefered ${value}!`,
          })
        );
      }
    };

    checkValidity(isLogoChecked, isLogoChanged, "logo");
    checkValidity(isColorChecked, isColorChanged, "color");
    checkValidity(isWheelChecked, isWheelChanged, "wheel");
    checkValidity(isExhaustChecked, isExhaustRangeChanged, "exhaust");

    // if (isLogoChecked && !isLogoChanged) {
    //   return dispatch(
    //     uiActions.showNotification({
    //       status: "incomplete",
    //       title: "Incomplete logo configuration",
    //       message: "Please make sure to choose your prefered logo text",
    //     })
    //   );
    // } else if (isColorChecked && !isColorChanged) {
    //   return dispatch(
    //     uiActions.showNotification({
    //       status: "incomplete",
    //       title: "Incomplete color configuration",
    //       message: "Please make sure to choose your prefered color value",
    //     })
    //   );
    // } else if (isWheelChecked && !isWheelChanged) {
    //   return dispatch(
    //     uiActions.showNotification({
    //       status: "incomplete",
    //       title: "Incomplete wheel configuration",
    //       message: "Please make sure to choose your prefered wheel value",
    //     })
    //   );
    // } else if (isExhaustChecked && !isExhaustRangeChanged) {
    //   return dispatch(
    //     uiActions.showNotification({
    //       status: "incomplete",
    //       title: "Incomplete exhaust configuration",
    //       message: "Please make sure to choose your prefered exhaust range",
    //     })
    //   );
    // } else if (isPowerChecked && !isPowerRangeChanged) {
    //   return dispatch(
    //     uiActions.showNotification({
    //       status: "incomplete",
    //       title: "Incomplete power configuration",
    //       message: "Please make sure to choose your prefered power range",
    //     })
    //   );
    // }

    const logoConfig = isLogoChanged
      ? {
          name: "Logo",
          value: logo,
          waitingTime: bikeLogo.waitingTime,
          price: bikeLogo.price,
        }
      : { name: "Logo", value: "none", waitingTime: 0, price: 0 };
    const colorConfig = isColorChanged
      ? {
          name: "Color",
          value: color,
          waitingTime: bikeColor.waitingTime,
          price: bikeColor.price,
        }
      : { name: "bike.color", value: "none", waitingTime: 0, price: 0 };
    const wheelConfig = isWheelChanged
      ? { name: "Wheel", value: wheel, waitingTime: 1, price: bikeWheel.price }
      : { name: "Wheel", value: "none", waitingTime: 0, price: 0 };
    const exhaustConfig = isExhaustChecked
      ? {
          name: "Exhaust",
          value: exhaustRangeValue,
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
          value: powerRangeValue,
          waitingTime: bikePower.waitingTime,
          price: bikePower.price,
        }
      : { name: "Power", value: "none", waitingTime: 0, price: 0 };

    const chosenConfig = {
      id: selectedBike.id,
      name: selectedBike.name,
      config: {
        logo: logoConfig,
        color: colorConfig,
        wheel: wheelConfig,
        exhaust: exhaustConfig,
        seat: seatConfig,
        suspension: suspensionConfig,
        brakes: brakesConfig,
        windshield: windshieldConfig,
        power: powerConfig,
      },
      waitingTime,
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
                onChange={onLogoCheckedHandler}
              ></input>
              <label htmlFor="logo" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <div className={classes["toggled-input"]}>
                {isLogoChecked && (
                  <input
                    type="text"
                    id="logo"
                    onChange={onLogoChangeHandler}
                    onBlur={onLogoBlurHandler}
                  ></input>
                )}
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
                onChange={onColorCheckedHandler}
              ></input>
              <label htmlFor="color" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <div className={classes["toggled-input"]}>
                {isColorChecked && (
                  <input
                    type="color"
                    id="color"
                    onChange={onColorChangeHandler}
                    onBlur={onLogoBlurHandler}
                  ></input>
                )}
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
                onChange={onWheelCheckedHandler}
              ></input>
              <label htmlFor="wheel" className={classes.label}>
                <span className={classes.ball}></span>
              </label>

              <div className={classes["toggled-input"]}>
                {isWheelChecked && (
                  <input
                    type="color"
                    id="wheel"
                    onChange={onWheelChangeHandler}
                    onBlur={onLogoBlurHandler}
                  ></input>
                )}
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
                onChange={onExhaustChangeHandler}
              ></input>
              <label htmlFor="exhaust" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <div className={classes["toggled-input"]}>
                {isExhaustChecked && (
                  <span className={classes.range}>
                    <label htmlFor="exhaust-range">
                      Thundering/Normal/Roaring Sound
                    </label>
                    <input
                      type="range"
                      id="exhaust-range"
                      onChange={onExhaustRangeChangeHandler}
                      onBlur={onLogoBlurHandler}
                      min="0"
                      max="100"
                      step="50"
                    ></input>
                    <span className={classes["range-value"]}>
                      {exhaustRangeValue}
                    </span>
                  </span>
                )}
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
                onChange={onSeatChangeHandler}
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
                onChange={onSuspensionChangeHandler}
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
                onChange={onBrakesChangeHandler}
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
                onChange={onWindshieldChangeHandler}
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
                onChange={onPowerChangeHandler}
              ></input>
              <label htmlFor="power" className={classes.label}>
                <span className={classes.ball}></span>
              </label>
              <div className={classes["toggled-input"]}>
                {isPowerChecked && (
                  <span className={classes.range}>
                    <label htmlFor="power-range">Amount (HP)</label>
                    <input
                      type="range"
                      id="power-range"
                      onChange={onPowerRangeChangeHandler}
                      onBlur={onLogoBlurHandler}
                      min="15"
                      max="30"
                      step="15"
                    ></input>
                    <span className={classes["range-value"]}>
                      {powerRangeValue}
                    </span>
                  </span>
                )}
              </div>
              <span className={classes.price}>{bikePower.price}</span>
            </div>
            <div
              className={`${classes.power} ${classes["right-container"]}`}
            ></div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      {waitingTime && <TimeBanner time={waitingTime} />}
    </>
  );
};

export default ConfigForm;
