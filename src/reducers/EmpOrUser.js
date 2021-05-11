const EmpOrUser = (init = false, action) =>{
    switch (action.type) {
        case "TYPE_USER":
          return action.payload === true ? true : false;
        default:
          return false;
    }
}

export default EmpOrUser