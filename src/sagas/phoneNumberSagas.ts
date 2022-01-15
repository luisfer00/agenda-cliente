import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../config/axios";
import {
  createPhoneNumber,
  createPhoneNumberSuccessfull,
  deletePhoneNumber,
  deletePhoneNumberSuccessfull,
  editPhoneNumber,
  editPhoneNumberSuccessfull,
  getPhoneNumbers,
  getPhoneNumbersSuccessfull,
  setCreateLoading,
  setCreatingNumber,
  setEditingNumber,
  setLoading,
  setLoadingNumber,
} from "../redux/phoneNumberSlice";
import { IPhoneNumber } from "../types";

function* getPhoneNumbersSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(
      axios.get,
      `/phonenumber/get-phonenumbers/${action.payload}`
    );
    yield put(setLoading(false));
    const phoneNumbers: IPhoneNumber[] = data.phoneNumbers;
    yield put(getPhoneNumbersSuccessfull(phoneNumbers));
  } catch (e) {
    yield put(setLoading(false));
  }
}
function* createPhoneNumberSaga(
  action: PayloadAction<{ id: string; number: string }>
) {
  const { id, number } = action.payload;
  try {
    yield put(setCreateLoading(true));
    const { data } = yield call(axios.post, "/phonenumber/create-phonenumber", {
      id,
      number,
    });
    yield put(setCreateLoading(false));
    yield put(setCreatingNumber(false));
    const phoneNumber: IPhoneNumber = data.phoneNumber;
    yield put(createPhoneNumberSuccessfull(phoneNumber));
  } catch (e) {
    yield put(setCreateLoading(false));
    yield put(setCreatingNumber(false));
  }
}
function* editPhoneNumberSaga(
  action: PayloadAction<{ id: string; number: string; i: number }>
) {
  const { id, number, i } = action.payload;
  try {
    yield put(setLoadingNumber({ value: true, i }));
    const { data } = yield call(
      axios.put,
      `/phonenumber/update-phonenumber/${id}`,
      {
        number,
      }
    );
    yield put(setLoadingNumber({ value: false, i }));
    yield put(setEditingNumber({ value: false, i }));
    const phoneNumber: IPhoneNumber = data.phoneNumber;
    yield put(editPhoneNumberSuccessfull(phoneNumber));
  } catch (e) {
    yield put(setLoadingNumber({ value: false, i }));
    yield put(setEditingNumber({ value: false, i }));
  }
}
function* deletePhoneNumberSaga(
  action: PayloadAction<{ id: string; i: number }>
) {
  const { id, i } = action.payload;
  try {
    yield put(setLoadingNumber({ value: true, i }));
    const { data } = yield call(
      axios.delete,
      `/phonenumber/delete-phonenumber/${id}`
    );
    yield put(setLoadingNumber({ value: false, i }));
    const phoneNumber: IPhoneNumber = data.phoneNumber;
    yield put(deletePhoneNumberSuccessfull(phoneNumber._id));
  } catch (e) {
    yield put(setLoadingNumber({ value: false, i }));
  }
}

export default function* phoneNumberSagas() {
  yield takeLatest(getPhoneNumbers.type, getPhoneNumbersSaga);
  yield takeLatest(createPhoneNumber.type, createPhoneNumberSaga);
  yield takeLatest(editPhoneNumber.type, editPhoneNumberSaga);
  yield takeLatest(deletePhoneNumber.type, deletePhoneNumberSaga);
}
