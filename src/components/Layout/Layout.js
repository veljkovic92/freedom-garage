import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      {props.children}
      <MainFooter />
    </>
  );
};

export default Layout;
