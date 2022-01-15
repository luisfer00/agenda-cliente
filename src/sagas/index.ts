import { all } from "redux-saga/effects";
import contactSagas from "./contactSagas";
import phoneNumberSagas from "./phoneNumberSagas";

export default function* rootSaga() {
  yield all([contactSagas(), phoneNumberSagas()]);
}
