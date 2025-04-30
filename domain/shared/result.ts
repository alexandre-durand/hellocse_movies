export type Success<T> = {
  ok: true;
  data: T;
};

export type Failure<E> = {
  ok: false;
  error: E;
};

export type Result<T, E> = Success<T> | Failure<E>;

export class SuccessResult<T> implements Success<T> {
  public ok: true = true as const;
  constructor(public data: T) {}
}

export class FailureResult<E> implements Failure<E> {
  public ok: false = false as const;
  constructor(public error: E) {}
}
