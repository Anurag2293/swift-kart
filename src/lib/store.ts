import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
    return configureStore({
        reducer: {}
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the 'Root State' and 'App Dispatch' types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];