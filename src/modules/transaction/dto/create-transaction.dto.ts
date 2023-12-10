import { TransactionType } from "../../../enums";

export class CreateTransactionDto {
    public amount: number;
    public transactionType: TransactionType;
    public accountId: number;
}
