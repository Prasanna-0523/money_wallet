import { createStore, combineReducers } from 'redux';
import reducer from './Reducer';

const rootReducer = combineReducers(
    { reducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;