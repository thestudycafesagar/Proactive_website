import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PricingState {
  users: number;
}

const initialState: PricingState = {
  users: 10, // default value
};

export const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    setUsersCount: (state, action: PayloadAction<number>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsersCount } = pricingSlice.actions;
export default pricingSlice.reducer;
