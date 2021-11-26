import Fram from "./Fram.js";
import Mylist from "./Mylist.js";
import { createStore, combineReducers } from "redux";
import { instData, sowData } from "./redux/Reducers";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  let rootReducer = combineReducers({ instData: instData});

  const persistConfig = {
    key: "root",
    storage,
    blaclist: ["sowdata"],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  //  const l=persistStore(persistedReducer)
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {/* <Mylist></Mylist> */}
          <Fram></Fram>
        </PersistGate>
      </Provider>
    </>
  );
}
export default App;
