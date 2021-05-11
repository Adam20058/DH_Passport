import { useMediaQuery } from "react-responsive";
import { connect } from "react-redux";
import { isEmpOrUser } from "./actions";

import EmpPath from "./components/EmpPath";
import UserPath from "./components/UserPath";
import "./sass/main.scss";
const App = (props) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  if (!isTabletOrMobile) {
    return <div className="App">This is laptop</div>;
  } else {
    console.log(`State of emplogged: ${props.empLoggedIn.isEmpOrUser}`);

    if (!props.empLoggedIn.isEmpOrUser) {
      return <UserPath />;
    } else {
      return <EmpPath />;
    }
  }
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {
  isEmpOrUser,
})(App);
