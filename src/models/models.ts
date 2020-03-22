import { DataTypes, Sequelize, Model } from 'sequelize';

export const db = new Sequelize(
    process.env.DATABASE_NAME as string,
    process.env.DATABASE_USER as string,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      port: 5432
    }
  );

  export class UserModel extends Model {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

  }

  UserModel.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  }, {
    schema: 'crm',
    tableName: 'users',
    sequelize: db, // this bit is important
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });