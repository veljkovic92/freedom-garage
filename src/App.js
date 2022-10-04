import { Redirect, Route, Switch } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalWaitingTime = useSelector((state) => state.cart.waitingTime);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    dispatch(fetchBikesData());
    dispatch(fetchOrdersData());
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

  return (
    <Layout>
      {showCart && <Cart />}
      <Switch>
        {!isLoggedIn && (
          <Route path="/auth">
            <Authentication />
          </Route>
        )}
        <Route path="/welcome">
          <Welcome />
        </Route>

        <Route path="/orders">
          <MyOrders />
        </Route>

        <Route path="/goals">
          <OurGoals />
        </Route>

        <Route path="/bikes" exact>
          {isLoggedIn && <Bikes />}
          {!isLoggedIn && <Redirect to="/not-auth" />}
        </Route>
        <Route path="/bikes/:bikeId">
          <BikesConfigPage />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
