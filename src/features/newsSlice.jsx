import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsApi } from "../services/cryptoApi";

export const fetchNewsData = createAsyncThunk(
    "news/fetchNewsData",
    async (category, {getState}) =>{
         const selectedCategory = category || getState().news.category;
        return await fetchNewsApi(selectedCategory);
    }
);

const initialState = {
    articles:[],
    category: "crypto",
    articlesState: "idle",
    articlesUpdateTime : null,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers:{
        clearNewsSlice(state){
            state.articles= [];
            state.articlesState = "idle";
            state.articlesUpdateTime = null;
        },
        setCategory(state, action){
            state.category = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNewsData.pending, (state)=>{
            state.articlesState = "loading";
            state.articlesUpdateTime = null;
        })
        .addCase(fetchNewsData.fulfilled, (state,action)=>{
            state.articles = action.payload;
            state.articlesState = "succeeded";
            state.articlesUpdateTime = Date.now();
        })
        .addCase(fetchNewsData.rejected, (state)=>{
            state.articlesState = "failed";
            state.articlesUpdateTime = null;
        });
    },
});

export const {clearNewsSlice, setCategory} = newsSlice.actions;

export const selectNewsData = (state)=>state.news.articles.results;
export const selectCategory = (state)=>state.news.category;
export const selectNewsState = (state)=>state.news.articlesState;
export const selectNewsUpdateTime = (state)=>state.news.articlesUpdateTime;

export default newsSlice.reducer;