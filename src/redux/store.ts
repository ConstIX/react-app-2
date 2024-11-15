import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi } from './services/auth'
import { commandsApi } from './services/commands'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [commandsApi.reducerPath]: commandsApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(commandsApi.middleware)
})

setupListeners(store.dispatch)
