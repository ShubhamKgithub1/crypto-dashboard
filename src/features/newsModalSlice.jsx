import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedArticle: null,
};

const newsModalSlice = createSlice({
    name: "newsModal",
    initialState,
    reducers:{
        openNewsModal:(state,action)=>{
            state.isOpen = true;
            state.selectedArticle = action.payload;
        },
        closeNewsModal:(state)=>{
            state.isOpen = false;
        }
    }
    
    
});

export const { openNewsModal, closeNewsModal } = newsModalSlice.actions;
export const selectNewsModalState = (state) => state.newsModal;
export default newsModalSlice.reducer;