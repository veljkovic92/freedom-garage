import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./MainHeader.module.css";
import { authActions } from "../../store/auth-slice";
import CartButton from "../Cart/CartButton";
import { useState } from "react";
import { useEffect } from "react";
import { uiActions } from "../../store/ui-slice";

const MainHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.auth.user);

  const [userHasOrders, setUserHasOrders] = useState(false);

  const authBtnHandler = (event) => {
    if (userLoggedIn) {
      dispatch(authActions.userLoggedOut());
      dispatch(uiActions.hideNotification());
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
      localStorage.setItem("isLoggedIn", false);
      history.replace("/auth");
    } else {
      history.push("/auth");
    }
  };

  useEffect(() => {
    if (orders != null) {
      Object.keys(orders).forEach((order) => {
        if (orders[order].user === user) {
          setUserHasOrders(true);
        }
      });
    }
    if (!user) {
      setUserHasOrders(false);
    }
  }, [user, orders]);

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/" className={classes.title}>
              <h1>The "Future Garage"</h1>
            </Link>
          </li>

          {userLoggedIn && cartItems.length > 0 && <CartButton />}

          <li>
            <ul className={classes.navBtns}>
              {userLoggedIn && (
                <li>
                  <NavLink
                    to="my-account"
                    activeClassName={classes.activeLink}
                    className={classes.navLink}
                  >
                    My Account
                  </NavLink>
                </li>
              )}
              {userLoggedIn && userHasOrders && (
                <li>
                  <NavLink
                    to="/orders"
                    activeClassName={classes.activeLink}
                    className={classes.navLink}
                  >
                    My Orders
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/goals"
                  activeClassName={classes.activeLink}
                  className={classes.navLink}
                >
                  Our Goals
                </NavLink>
              </li>

              {userLoggedIn && (
                <li>
                  <NavLink
                    to="/bikes"
                    activeClassName={classes.activeLink}
                    className={classes.navLink}
                  >
                    Bikes
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/contact-us"
                  activeClassName={classes.activeLink}
                  className={classes.navLink}
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <button
                  className={classes.authHeadBtn}
                  onClick={authBtnHandler}
                >
                  {userLoggedIn ? "Sign Out" : "Log In"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
