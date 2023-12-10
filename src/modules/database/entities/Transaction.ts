import { Column, Model, Table, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { TransactionType } from '../../../enums';

@Table({ 
  tableName: "transactions",
  updatedAt: false
 })
export class Transaction extends Model {
  @Column({ 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false 
  })
  id: number;

  @Column({ 
    allowNull: false, 
    field: "account_id" 
  })
  accountId: number;

  @Column({
    allowNull: false,  
    field: "transaction_type"
  })
  transactionType: TransactionType;

  @Column({
     allowNull: false, 
  })
  amount: number;

  @CreatedAt
  @Column({
    field: "created_at" 
  })
  createdAt!: Date;
}