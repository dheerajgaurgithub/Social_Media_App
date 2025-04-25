import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [], 
  selectedPost:null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload; 
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setSelectedPost:(state,action)=>{
      state.selectedPost=action.payload;
    }
  },
});

export const { setPosts, addPost , setSelectedPost} = postSlice.actions;
export default postSlice.reducer;
