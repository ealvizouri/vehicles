import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
/* import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'; */
import { RootState } from 'app/store';
import * as makeModelService from '../../services/makeModels';

export type MakeModelType = {
  id: number,
  name: string
}

export interface MakeModelState {
  status: 'idle' | 'loading' | 'failed';
  makes: MakeModelType[];
  models: MakeModelType[];
}

const initialState: MakeModelState = {
  makes: [],
  models: [],
  status: 'idle',
};


export const fetchMakes = createAsyncThunk(
  'makeModel/fetchMakes',
  makeModelService.fetchMakes
);

export const fetchModels = createAsyncThunk(
  'makeModel/fetchModels',
  makeModelService.fetchModels
);

export const makeModelSlice = createSlice({
  name: 'makeModel',
  initialState,
  reducers: {
    fake: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMakes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMakes.fulfilled, (state, action) => {
        const { data, err } = action.payload;
        state.status = 'idle';
        state.makes = err ? [] : data;
      })
      .addCase(fetchMakes.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchModels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        const { data, err } = action.payload;
        state.status = 'idle';
        state.models = err ? [] : data;
      })
      .addCase(fetchModels.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { fake } = makeModelSlice.actions;

export const selectMakes = (state: RootState) => state.makeModel.makes;
export const selectModels = (state: RootState) => state.makeModel.models;


export default makeModelSlice.reducer;
