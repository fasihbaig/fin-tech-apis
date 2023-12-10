import { AccountTypes } from "../../../enums";

export class CreateAccountDto {
    public accountType: AccountTypes;
    public balance: number;
    public userId: number
}
