export type InstanceObject = {
  readonly name: string;
  readonly userId: string;
};

export type Instance = InstanceObject & {
  readonly createdAt: string;
  readonly id: string;
  readonly updatedAt: string;
};

export type InstanceInsert = {
  readonly name: string;
  readonly user_id: string;
};

export type InstanceRow = InstanceInsert & {
  readonly created_at: Date;
  readonly id: string;
  readonly updated_at: Date;
};
