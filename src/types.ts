import { ContactState } from "./redux/contactSlice";
import { PhoneNumberState } from "./redux/phoneNumberSlice";

export interface IContact {
  _id: string;
  name: string;
}

export interface IPhoneNumber {
  _id: string;
  contact: string;
  name?: string;
  number: string;
  editing: boolean;
  deleting: boolean;
  loading: boolean;
}

export interface IStore {
  contacts: ContactState;
  phoneNumbers: PhoneNumberState;
}
