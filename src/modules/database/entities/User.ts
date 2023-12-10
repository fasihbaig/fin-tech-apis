import { Column, Model, Table, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: "users" })
export class User extends Model {
  @Column({ 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false 
  })
  id: number;

  @Column({ allowNull: false, unique: true })
  username: string;

  @Column({
     allowNull: false, 
     field: "first_name" 
  })
  firstName: string;

  @Column({
    allowNull: false, 
    unique: true, 
    field: "last_name" 
  })
  lastName: string;

  @Column({ defaultValue: true })
  password: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}