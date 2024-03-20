/* Import redux library */
import { configureStore } from "@reduxjs/toolkit";

/* Import redux-persist library */
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* Import root reducer */
import { rootReducer } from "../Reducers/root/rootReducer";

/* Redux-persist Configuration */
const persistConfig = { 
    key: "root", 
    storage: storage, 
    version: 1 
};
  
/* Persist all the reducers */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Middleware configeration */
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

/* Define redux store */
const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware
});

/* Create redux persistor */
const persistor = persistStore(store);


export { store, persistor };

  