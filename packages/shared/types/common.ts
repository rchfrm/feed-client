export type Nullable<T> = T | null

export interface Dictionary<T = any> {
  [key: string]: T
}

export interface ReducerAction<S, T = string> {
  type: T,
  payload: S
}
