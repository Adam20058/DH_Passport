const loggedIn = (init = false, action) => {
    switch (action.type) {
      case "LOGGED_IN":
        if(action.payload){
          return true
        }else{
          return false
        }
      default:
        return false;
    }
  };
  
  export default loggedIn
    