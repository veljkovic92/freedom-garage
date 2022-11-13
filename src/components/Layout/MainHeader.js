import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./MainHeader.module.css";
import { authActions } from "../../store/auth-slice";
import CartButton from "../Cart/CartButton";
import { useState } from "react";
import { useEffect } from "react";
import { uiActions } from "../../store/ui-slice";
import {GiHamburgerMenu} from "react-icons/gi"

const MainHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.auth.user);

  const [userHasOrders, setUserHasOrders] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);

  const onHamburgerClickHandler = () => {
    setShowNavItems((prevValue) => !prevValue);
  }

  const onNavItemClickHandler = () => {
    setShowNavItems(false);
  }

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
    setShowNavItems(false);
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

  const headerRoute = userLoggedIn ? "/bikes" : "/auth";

 

  return (
    <header className={classes.header}>
      <div className={classes["left-nav"]}>
        <Link to={headerRoute} >
          <h1 className={classes["web-title"]}>Future Garage</h1>
        </Link>
      </div>
      <div className={classes["middle-nav"]}>
        {userLoggedIn && cartItems.length > 0 && <CartButton />}
      </div>

      

      
    <div className={classes["right-nav"]}>
    <div className={`${classes["hamburger-btn"]} ${showNavItems ? classes["hamburger-clicked"] : classes["hamburger-clicked-two"]}`}>
    
    <GiHamburgerMenu size="40" style={{color: "rgb(265,65,65)"}} onClick={onHamburgerClickHandler} className={classes["hamburger-icon"]}/>
    
    </div>
      <div className={`${classes.navBtns} ${showNavItems ? classes["navBtnsHam"]  : classes["hide-nav"]}`}>
      
        {userLoggedIn && (
          <NavLink
            to="my-account"
            activeClassName={classes.activeLink}
            className={classes.navLink}
            onClick={onNavItemClickHandler}
          >
            My Account
          </NavLink>
        )}
        {userLoggedIn && userHasOrders && (
          <NavLink
            to="/orders"
            activeClassName={classes.activeLink}
            className={classes.navLink}
            onClick={onNavItemClickHandler}
          >
            My Orders
          </NavLink>
        )}

        <NavLink
          to="/goals"
          activeClassName={classes.activeLink}
          className={classes.navLink}
          onClick={onNavItemClickHandler}
        >
          Our Goals
        </NavLink>

        {userLoggedIn && (
          <NavLink
            to="/bikes"
            activeClassName={classes.activeLink}
            className={classes.navLink}
            onClick={onNavItemClickHandler}
          >
            All Bikes
          </NavLink>
        )}

        <NavLink
          to="/contact-us"
          activeClassName={classes.activeLink}
          className={classes.navLink}
          onClick={onNavItemClickHandler}
        >
          Contact Us
        </NavLink>

        <div>
          <button className={classes.authHeadBtn} onClick={authBtnHandler}>
            {userLoggedIn ? "Sign Out" : "Log In"}
          </button>
        </div>
        
      </div>
      </div>
      
    </header>
  );
};

export default MainHeader;
