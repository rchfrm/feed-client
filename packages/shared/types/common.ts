export type Nullable<T> = T | null

export interface Dictionary<T = any> {
  [key: string]: T
}

export type ObjectValues<T> = T[keyof T];
