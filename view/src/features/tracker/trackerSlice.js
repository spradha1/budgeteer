import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// get user data from database
export const getUserData = createAsyncThunk('tracker/getUserData', async (uid) => {
  const response = await fetch(`/getUserData/${uid}`, {
    method: 'GET',
    mode: 'cors'
  })
  .catch(err => {
    console.log(`Error requesting '/getUserData': ${err.message}`)
  });
  return response.json();
});

export const trackerSlice = createSlice({

  name: 'tracker',
  initialState: {
    expenses: [],
    income: [],
    status: 'idle'
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getUserData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload.data.expenses;
        state.income = action.payload.data.income;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default trackerSlice.reducer;
