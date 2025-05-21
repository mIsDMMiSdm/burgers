import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type LoadingState = {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false
};

const loadingSlice = createSlice({
  initialState,
  name: 'loading',
  reducers: {
    setLoading(
      state,
      action: PayloadAction<{ loading: boolean }>
    ) {
      state.loading = action.payload.loading;
    }
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;