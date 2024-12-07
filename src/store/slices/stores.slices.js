import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscribedStores: [], // Almacena los IDs de las tiendas suscritas
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setIsSubscribedState: (state, action) => {
      const storeId = action.payload.storeId;
      const isSubscribed = action.payload.isSubscribed;

      if (isSubscribed) {
        // Añadir la tienda al estado de suscripciones
        if (!state.subscribedStores.includes(storeId)) {
          state.subscribedStores.push(storeId);
        }
      } else {
        // Eliminar la tienda del estado de suscripciones
        state.subscribedStores = state.subscribedStores.filter(
          (id) => id !== storeId
        );
      }
    },
  },
});

export const { setIsSubscribedState } = storeSlice.actions;
export default storeSlice.reducer;
