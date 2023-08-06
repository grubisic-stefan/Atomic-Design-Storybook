type UserEvent<TUserEvent> = TUserEvent | undefined;

export type ACEvenType<TUserEvent, TValue> = UserEvent<TUserEvent> & {
  ac: {
    name?: string;
    value?: TValue;
    type?: string;
    event?: string;
  };
};
