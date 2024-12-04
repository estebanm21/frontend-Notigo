import { createSlice } from '@reduxjs/toolkit';

// Estado inicial modificado para manejar tanto `user` como `store`
const initialState = {
  token: '', // Token de autenticación
  user: null, // Información del usuario (cuando sea un cliente)
  store: null, // Información de la tienda (cuando sea un comerciante)
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { token, user, store } = action.payload;
      state.token = token || ''; // Asegura que el token esté presente
      state.user = user || null; // Almacena los datos del usuario (cliente)
      state.store = store || null; // Almacena los datos de la tienda (comerciante)
    },
    clearUserInfo: (state) => {
      state.token = '';
      state.user = null; // Limpiar el usuario
      state.store = null; // Limpiar la tienda
    },

    updateStoreInfo: (state, action) => {
      const updatedStore = action.payload; // Los nuevos datos de la tienda
      state.store = updatedStore || state.store; // Actualiza los datos de la tienda, si se reciben nuevos
    },

    updateStoreImage: (state, action) => {
      if (state.store) {
        state.store.businessImgUrl = action.payload; // Actualiza la URL de la imagen de la tienda
      }
    },
  },
});

export const { setUserInfo, clearUserInfo, updateStoreInfo, updateStoreImage } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
