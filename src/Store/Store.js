import {createStore, combineReducers} from 'redux';
import mainReducer from './Reducers/mainReducer';
import userReducer from './Reducers/userReducer';
import bookingReducer from './Reducers/bookingReducer';


const rootReducers = combineReducers({
    mainReducer,
    userReducer,
    bookingReducer,
});
const store = createStore(rootReducers);

export default store;
