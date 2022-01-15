import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhoneNumber } from "../types";

export interface PhoneNumberState {
  phoneNumbers: IPhoneNumber[];
  loading: boolean;
  creatingNumber: boolean;
  createLoading: boolean;
}

const initialState: PhoneNumberState = {
  phoneNumbers: [],
  loading: false,
  creatingNumber: false,
  createLoading: false,
};

const phoneNumberSlice = createSlice({
  initialState,
  name: "phoneNumbers",
  reducers: {
    getPhoneNumbers: (state, action: PayloadAction<string>) => {},
    getPhoneNumbersSuccessfull: (
      state,
      action: PayloadAction<IPhoneNumber[]>
    ) => {
      state.phoneNumbers = action.payload.map((phoneNumber) => ({
        ...phoneNumber,
        editing: false,
        deleting: false,
        loading: false,
      }));
    },
    createPhoneNumber: (
      state,
      action: PayloadAction<{ id: string; number: string }>
    ) => {},
    createPhoneNumberSuccessfull: (
      state,
      action: PayloadAction<IPhoneNumber>
    ) => {
      const newPhoneNumber: IPhoneNumber = {
        ...action.payload,
        editing: false,
        deleting: false,
        loading: false,
      };
      state.phoneNumbers = [...state.phoneNumbers, newPhoneNumber];
    },
    editPhoneNumber: (
      state,
      action: PayloadAction<{ id: string; number: string; i: number }>
    ) => {},
    editPhoneNumberSuccessfull: (
      state,
      action: PayloadAction<IPhoneNumber>
    ) => {
      state.phoneNumbers = state.phoneNumbers.map((phoneNumber) => {
        if (phoneNumber._id !== action.payload._id) return phoneNumber;
        return {
          ...phoneNumber,
          ...action.payload,
        };
      });
    },
    deletePhoneNumber: (
      state,
      action: PayloadAction<{ id: string; i: number }>
    ) => {},
    deletePhoneNumberSuccessfull: (state, action: PayloadAction<string>) => {
      state.phoneNumbers = state.phoneNumbers.filter(
        (phoneNumber) => phoneNumber._id !== action.payload
      );
    },
    emptyPhoneNumbers: (state) => {
      state.phoneNumbers = [];
      state.loading = false;
      state.creatingNumber = false;
      state.createLoading = false;
    },
    setLoadingNumber: (
      state,
      action: PayloadAction<{ value: boolean; i: number }>
    ) => {
      const { value, i } = action.payload;
      state.phoneNumbers[i].loading = value;
      state.phoneNumbers = [...state.phoneNumbers];
    },
    setEditingNumber: (
      state,
      action: PayloadAction<{ value: boolean; i: number }>
    ) => {
      const { value, i } = action.payload;
      state.phoneNumbers[i].editing = value;
      state.phoneNumbers = [...state.phoneNumbers];
    },
    setDeletingNumber: (
      state,
      action: PayloadAction<{ value: boolean; i: number }>
    ) => {
      const { value, i } = action.payload;
      state.phoneNumbers[i].deleting = value;
      state.phoneNumbers = [...state.phoneNumbers];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCreatingNumber: (state, action: PayloadAction<boolean>) => {
      state.creatingNumber = action.payload;
    },
    setCreateLoading: (state, action: PayloadAction<boolean>) => {
      state.createLoading = action.payload;
    },
  },
});

export const {
  getPhoneNumbers,
  getPhoneNumbersSuccessfull,
  createPhoneNumber,
  createPhoneNumberSuccessfull,
  editPhoneNumber,
  editPhoneNumberSuccessfull,
  deletePhoneNumber,
  deletePhoneNumberSuccessfull,
  emptyPhoneNumbers,
  setLoadingNumber,
  setEditingNumber,
  setDeletingNumber,
  setLoading,
  setCreatingNumber,
  setCreateLoading,
} = phoneNumberSlice.actions;
export default phoneNumberSlice.reducer;
