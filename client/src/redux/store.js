/* Import Redux-Persist */
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* Import React-Rudex */
import { configureStore } from "@reduxjs/toolkit";

/* Import rootReducer */
import { rootReducer } from "./rootReducer";

/* Redux-Persist Configuration */
const persistConfig = { 
    key: "root", 
    storage: storage, 
    version: 1 
};
  
/* Persist all the reducers */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* middleware configyration */
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

/* Define Redux Store */
const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware
});

/* Create Redux Persistor */
const persistor = persistStore(store);


export { store, persistor };

  