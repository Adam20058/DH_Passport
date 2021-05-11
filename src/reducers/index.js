import {combineReducers} from 'redux'
import loggedIn from './loggedIn'
import EmpOrUser from "./EmpOrUser";
import GetUniqueId from "./GetUniqueId"
import empLoggedIn from './empLoggedIn'

export default combineReducers({
    loggedIn,
    EmpOrUser,
    GetUniqueId,
    empLoggedIn
})