const initialState = {
    userName: "",
    userId: "",
    isLoggedIn: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER":
            console.log("action.payload", action.payload.userName);
            state = {
                ...state,
                userName: action.payload.userName,
            }
            break
        default:
            break
    }
    return state;
};

export default userReducer;
