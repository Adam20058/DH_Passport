let def = {
  employeeLog: false,
  isEmpOrUser: false,
};
const empLoggedIn = (init = def, action) => {
  switch (action.type) {
    case "EMP_LOGIN":
      if (action.payload === "none") {
        return def;
      } else if (action.payload === "employeeLog") {
        return {
          employeeLog: true,
          isEmpOrUser: false,
        };
      }else if (action.payload === "isEmpOrUser") {
        return {
          employeeLog: false,
          isEmpOrUser: true,
        };
      }else if (action.payload === "both") {
        return {
          employeeLog: true,
          isEmpOrUser: true,
        };
      }
    default:
      return false;
  }
};

export default empLoggedIn;
