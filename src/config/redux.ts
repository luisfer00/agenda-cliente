import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import contactReducer from "../redux/contactSlice";
import phoneNumberReducer from "../redux/phoneNumberSlice";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    contacts: contactReducer,
    phoneNumbers: phoneNumberReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
