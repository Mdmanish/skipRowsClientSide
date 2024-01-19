const initialState = {
    salonId: null,
    isLoggedIn: false,
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MAIN":
            console.log("action.payload", action.payload.salonId);
            state = {
                ...state,
                salonId: action.payload.salonId,
            }
            break
        default:
            break
    }
    return state;
};

export default mainReducer;
