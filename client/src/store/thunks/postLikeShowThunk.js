import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postLikeShowThunk = createAsyncThunk(
  'postLikeShow/postLikeShowThunk', // Thunk 고유명
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/posts/${id}`;
      
      const response = await axiosInstance.put(url);
      if(!response.data.data) {
        throw new Error('좋아요 취소');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);