export const isEmpOrUser = (bool) =>{
    return {
        type: 'TYPE_USER',
        payload: bool
    }
}

export const isLoggedIn = (bool) =>{
    return {
        type: 'LOGGED_IN',
        payload: bool
    }
}
export const employeeLog = (token) =>{
    return {
        type: 'EMP_LOGIN',
        payload: token
    }
}

export const loginToken = (token) =>{
    return{
        type: 'TOKEN_TRUE',
        payload: token
    }
}

export const setUniqueID = (id) =>{
    return{
        type: 'UNIQUE_ID',
        payload: id
    }
}


