import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postRequestAsync = createAsyncThunk(
  'post/request',
  async (postData) => {
    try {
      const response = await axios.post('https://marketx-production.up.railway.app/Usuario', postData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
