const initialState = {
    bookingId: null,
    salonId: null,
    time: null,
}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "BOOKING":
            console.log("action.payload.bookingId", action.payload.bookingId);
            state = {
                ...state,
                bookingId: action.payload.bookingId,
                salonId: action.payload.salonId,
            }
            break
        default:
            break
    }
    return state;
};

export default bookingReducer;
