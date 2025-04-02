import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { AppDispatch } from "../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
