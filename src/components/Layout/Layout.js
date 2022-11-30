import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import classes from "./Layout.module.css";

const Layout = (props) => {
 
  return (
    <>
      <MainHeader />

      <main className={classes["layout-body"]}>{props.children}</main>
      <MainFooter />
    </>
  );
};

export default Layout;
