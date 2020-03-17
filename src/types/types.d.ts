export type UserObject = {
  readonly name: string;
};

export type User = UserObject & {
  readonly createdAt: string;
  readonly id: string;
  readonly updatedAt: string;
};

export type UserInsert = {
  readonly name: string;
};

export type UserRow = UserInsert & {
  readonly created_at: Date;
  readonly id: string;
  readonly updated_at: Date;
};
