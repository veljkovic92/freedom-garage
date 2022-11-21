import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Authentication from "./pages/Authentication";
import OurGoals from "./pages/OurGoals";
import Welcome from "./pages/Welcome";
import { useSelector, useDispatch } from "react-redux";
import Bikes from "./pages/Bikes";
import ContactUs from "./pages/ContactUs";
import BikesConfigPage from "./pages/BikesConfigPage";
import Cart from "./components/Cart/Cart";
import { useEffect } from "react";
import { fetchBikesData } from "./store/bikes-actions";
import { cartActions } from "./store/cart-slice";
import MyOrders from "./pages/MyOrders";
import { fetchOrdersData } from "./store/previous-orders-actions";
import { authActions } from "./store/auth-slice";
import { countdownHandler } from "./helpers/expiration";
import MyAccount from "./pages/MyAccount";
import {
  getDisplayName,
  onGetDisplayNameHandler,
} from "./helpers/fetchAccountInfos";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalWaitingTime = useSelector((state) => state.cart.waitingTime);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const name = useSelector((state) => state.auth.name);
  const history = useHistory();
  
  // Fetching Bikes and Orders on first load
  useEffect(() => {
    dispatch(fetchBikesData());
    dispatch(fetchOrdersData(user));
  }, []);

  useEffect(() => {
    try {
      const chosenLocalConfig = JSON.parse(
        localStorage.getItem("chosenConfig")
      );
      if (chosenLocalConfig.length !== 0 && cartItems.length === 0) {
        chosenLocalConfig.forEach((item) => {
          dispatch(cartActions.addToCart(item));
        });
      }
    } catch (error) {}
  }, []);

  // Updating LS on every Cart change

  useEffect(() => {
    localStorage.removeItem("chosenConfig");
    localStorage.setItem("chosenConfig", JSON.stringify(cartItems));
    localStorage.removeItem("totalPrice");
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.removeItem("totalWaitingTime");
    localStorage.setItem("totalWaitingTime", JSON.stringify(totalWaitingTime));
    localStorage.removeItem("totalQuantity");
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  }, [cartItems, totalPrice, totalWaitingTime, totalQuantity]);

  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const countdown = setInterval(() => {
      if (localStorage.getItem("expirationTime") <= 0) {
        dispatch(authActions.userLoggedOut());

        clearInterval(countdown);
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("user");
      }
    }, 1000);

    if (token && localUser) {
      if (!localUser.name) {
        dispatch(getDisplayName(token));
      } else {
        dispatch(authActions.localName(localUser.name));
      }
    }
  }, [token]);

  useEffect(() => {
    if (localUser) {
      dispatch(authActions.userLoggedIn(localUser));
      dispatch(authActions.localToken(localUser.token));
    }
    const existingLocalTime = localStorage.getItem("expirationTime");
    if (existingLocalTime) {
      countdownHandler(existingLocalTime);
    }
  }, []);

  useEffect(() => {
    if (!localUser) {
history.replace("/auth")
    }
    
  }, [localUser])

  return (
    <Layout>
      {showCart && <Cart />}
      <Switch>
        {!isLoggedIn && (
          <Route path="/auth">
            <Authentication />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/welcome">
            <Welcome />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/my-account">
            <MyAccount />
          </Route>
        )}

        <Route path="/orders">
          <MyOrders />
        </Route>

        <Route path="/goals">
          <OurGoals />
        </Route>

        <Route path="/bikes" exact>
          {isLoggedIn && <Bikes />}
          {!isLoggedIn && <NotFound />}
        </Route>
        <Route path="/bikes/:bikeId">
          <BikesConfigPage />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
