import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./MainHeader.module.css";
import { authActions } from "../../store/auth-slice";
import CartButton from "../Cart/CartButton";

const MainHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.items);

  const authBtnHandler = (event) => {
    if (userLoggedIn) {
      dispatch(authActions.userLoggedOut());
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
            <h1>The "Future Garage"</h1>
          </li>

          {userLoggedIn && cartItems.length > 0 && <CartButton />}

          <li>
            <ul className={classes.navBtns}>
              <li>
                <NavLink
                  to="/orders"
                  activeClassName={classes.activeLink}
                  className={classes.navLink}
                >
                  My Orders
                </NavLink>
              </li>
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
