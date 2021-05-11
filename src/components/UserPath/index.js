import { Switch, Route, Redirect } from "react-router-dom";
import UserLogin from "../UserLogin";
import UserRegister from "../UserRegister";
import UserHome from "../UserHome";

import { connect } from "react-redux";

const UserPath = (props) => {
  const loggedFalse = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/home">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/register" component={UserRegister} />
      </Switch>
    );
  };

  const loggedTrue = () => {
    return (
      <Switch>
        <Route exact path="/login">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/register">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    );
  };

  return <>{props.loggedIn ? loggedTrue() : loggedFalse()}</>;
  // return <UserHome />
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, null)(UserPath);
