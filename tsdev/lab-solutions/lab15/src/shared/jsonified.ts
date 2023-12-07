type JsonPrimitive = null | number | string | boolean;
type NotAllowedJsonValues = Function | undefined;

type JsonKeys<T> = {
  [P in keyof T]: T[P] extends NotAllowedJsonValues ? never : P;
}[keyof T];

export type Jsonified<T> = T extends (infer R)[]
  ? Jsonified<R>[]
  : T extends JsonPrimitive
  ? T
  : T extends NotAllowedJsonValues
  ? never
  : {
      [K in JsonKeys<T>]: Jsonified<T[K]>;
    };
