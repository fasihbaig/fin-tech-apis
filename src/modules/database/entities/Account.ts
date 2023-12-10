import { Column, Model, Table, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { AccountTypes } from '../../../enums';

@Table({ 
  tableName: "accounts",
  paranoid: true
 })
export class Account extends Model {
  @Column({ 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false 
  })
  id: number;

  @Column({ 
    allowNull: false, 
    field: "user_id" 
  })
  userId: number;

  @Column({
    allowNull: false,  
    field: "account_type"
  })
  accountType: AccountTypes;

  @Column({
     allowNull: false, 
  })
  balance: number;

  @CreatedAt
  @Column({
    field: "created_at" 
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({field: "updated_at"})
  updatedAt!: Date;

  @Column({field: "deleted_at"})
  deletedAt: Date;
}