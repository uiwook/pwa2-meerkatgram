import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postShowThunk = createAsyncThunk(
  'postShow/postShowThunk', // Thunk 고유명
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/posts/${id}`;
      
      const response = await axiosInstance.get(url);
      if(!response.data.data.item) {
        throw new Error('게시글 삭제 됨');
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);