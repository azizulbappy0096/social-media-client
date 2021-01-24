import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducer/rootReducer";

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => console.log("store>>", store.getState()));

function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider;
