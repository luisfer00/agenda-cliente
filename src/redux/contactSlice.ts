import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../types";

export interface ContactState {
  contacts: IContact[];
  contact: IContact;
  loading: boolean;
  creatingContact: boolean;
  editingContact: boolean;
  deletingContact: boolean;
}

const initialState: ContactState = {
  contacts: [],
  contact: { _id: "", name: "" },
  loading: false,
  creatingContact: false,
  editingContact: false,
  deletingContact: false,
};

const contactSlice = createSlice({
  initialState,
  name: "contacts",
  reducers: {
    getContacts: (state) => {},
    getContactsSuccessfully: (state, action: PayloadAction<IContact[]>) => {
      state.contacts = action.payload;
    },
    createContact: (state, action: PayloadAction<string>) => {},
    createContactSuccessfully: (state, action: PayloadAction<IContact>) => {
      state.contacts = [...state.contacts, action.payload];
    },
    updateContact: (state, action: PayloadAction<IContact>) => {},
    updateContactSuccessfully: (state, action: PayloadAction<IContact>) => {
      state.contacts = state.contacts.map((contact) => {
        if (contact._id === action.payload._id) return action.payload;
        return contact;
      });
      state.contact = action.payload;
    },
    deleteContact: (state, action: PayloadAction<string>) => {},
    deleteContactSuccessfully: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
    },
    setContact: (state, action: PayloadAction<IContact>) => {
      state.contact = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCreatingContact: (state, action: PayloadAction<boolean>) => {
      state.creatingContact = action.payload;
    },
    setEditingContact: (state, action: PayloadAction<boolean>) => {
      state.editingContact = action.payload;
    },
    setDeletingContact: (state, action: PayloadAction<boolean>) => {
      state.deletingContact = action.payload;
    },
  },
});

export const {
  getContacts,
  getContactsSuccessfully,
  createContact,
  createContactSuccessfully,
  updateContact,
  updateContactSuccessfully,
  deleteContact,
  deleteContactSuccessfully,
  setContact,
  setLoading,
  setCreatingContact,
  setEditingContact,
  setDeletingContact,
} = contactSlice.actions;
export default contactSlice.reducer;
