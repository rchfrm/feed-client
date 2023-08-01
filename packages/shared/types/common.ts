export type Nullable<T> = T | null

export interface Dictionary<T> {
  [key: string]: T
}

export type ObjectValues<T> = T[keyof T];
