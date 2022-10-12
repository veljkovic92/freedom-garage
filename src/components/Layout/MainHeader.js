import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./MainHeader.module.css";
import { authActions } from "../../store/auth-slice";
import CartButton from "../Cart/CartButton";

const MainHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.orders.orders);

  const authBtnHandler = (event) => {
    if (userLoggedIn) {
      dispatch(authActions.userLoggedOut());
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
      localStorage.setItem("isLoggedIn", false);
      history.replace("/auth");
    } else {
      history.push("/auth");
    }
  };

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
              {orders.length > 0 && (
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
