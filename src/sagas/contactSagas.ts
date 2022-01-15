import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest, put } from "redux-saga/effects";
import axios from "../config/axios";
import {
  createContact,
  createContactSuccessfully,
  deleteContact,
  deleteContactSuccessfully,
  getContacts,
  getContactsSuccessfully,
  setContact,
  setCreatingContact,
  setDeletingContact,
  setEditingContact,
  setLoading,
  updateContact,
  updateContactSuccessfully,
} from "../redux/contactSlice";
import { emptyPhoneNumbers } from "../redux/phoneNumberSlice";
import { IContact } from "../types";

function* getContactsSaga() {
  try {
    yield put(setLoading(true));
    const { data } = yield call(axios.get, "/contact/get-contacts");
    yield put(setLoading(false));
    const contacts: IContact[] = data.contacts;
    yield put(getContactsSuccessfully(contacts));
  } catch (e) {
    yield put(setLoading(false));
  }
}
function* createContactSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(axios.post, "/contact/create-contact", {
      name: action.payload,
    });
    yield put(setLoading(false));
    const contact: IContact = data.contact;
    yield put(createContactSuccessfully(contact));
    yield put(setCreatingContact(false));
  } catch (e) {
    yield put(setLoading(false));
    yield put(setCreatingContact(false));
  }
}
function* updateContactSaga(action: PayloadAction<IContact>) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(
      axios.put,
      `/contact/update-contact/${action.payload._id}`,
      {
        name: action.payload.name,
      }
    );
    yield put(setLoading(false));
    const contact: IContact = data.contact;
    yield put(updateContactSuccessfully(contact));
    yield put(setEditingContact(false));
  } catch (e) {
    yield put(setLoading(false));
    yield put(setEditingContact(false));
  }
}
function* deleteContactSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(
      axios.delete,
      `/contact/delete-contact/${action.payload}`
    );
    yield put(setLoading(false));
    const { _id }: IContact = data.contact;
    yield put(deleteContactSuccessfully(_id));
    yield put(
      setContact({
        _id: "",
        name: "",
      })
    );
  } catch (e) {
    yield put(setLoading(false));
  }
}
function* setContactSaga(action: PayloadAction<IContact>) {
  if (!action.payload.name) {
    yield put(setCreatingContact(false));
    yield put(setEditingContact(false));
    yield put(setDeletingContact(false));
    yield put(emptyPhoneNumbers());
  }
}

export default function* contactSagas() {
  yield takeLatest(getContacts.type, getContactsSaga);
  yield takeLatest(createContact.type, createContactSaga);
  yield takeLatest(updateContact.type, updateContactSaga);
  yield takeLatest(setContact.type, setContactSaga);
  yield takeLatest(deleteContact.type, deleteContactSaga);
}
