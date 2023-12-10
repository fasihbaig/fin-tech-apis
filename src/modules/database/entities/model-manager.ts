import { Account } from "./Account"
import { Transaction } from "./Transaction"
import { User } from "./User"

export const getModels = () => {
    return [
        User,
        Account,
        Transaction
    ]
}