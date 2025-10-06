import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    data: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        openModal :(state, action)=>{
            state.isOpen = true;
            state.data = action.payload;
        },
        closeModal :(state)=>{
            state.isOpen = false;
            state.data = null;
        },
    },
});

export const {openModal, closeModal} = modalSlice.actions;
export const selectModalState = (state)=> state.modal;

export default modalSlice.reducer;