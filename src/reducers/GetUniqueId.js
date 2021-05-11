const GetUniqueId = (init = ' ', action) =>{
    switch (action.type) {
        case "UNIQUE_ID":
        return action.payload
        default:
        return init;
    }
}

export default GetUniqueId
  