import { Switch, Route, Redirect } from "react-router-dom";
import EmpLogin from "../EmpLogin";
import EmpHome from "../EmpHome";
import { connect } from "react-redux";

const EmpPath = (props) => {
  const loggedFalse = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/home">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={EmpLogin} />
      </Switch>
    );
  };

  const loggedTrue = () => {
    return (
      <Switch>
        <Route exact path="/login">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={EmpHome} />
      </Switch>
    );
  };

  return <>{props.empLoggedIn.employeeLog ? loggedTrue() : loggedFalse()}</>;
  // return <UserHome />
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, null)(EmpPath);
