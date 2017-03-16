import { Journal } from './journal';

export class Transaction {
    Txn_ID: String;
    Account: String;
    Date: Date;
    Name_ID: String;
    Voucher: String;
    KW: String;
    CN: String;
    Journal: Journal[];

}