import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from './transaction.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
// import { Transaction } from '../../../../../../.../models/transaction';
@Component({
  selector: 'disbursment',
  templateUrl: './disbursment.html',
})



export class Disbursments {

  @ViewChild('modal')
  modal: ModalComponent;

  handleGridOutput($event) {
    console.log($event.length);
    this.description = '';
    this.total = 0;
    this.descriptionArray = [];
    this.debitArray = [];
    this.creditArray = [];
    for (var i = 0; i < $event.length; i++) {
      //  if ($event[i].Description === null || $event[i].Description === '') {
      //   break;
      // }

      this.descriptionArray.push($event[i].Description);
      this.debitArray.push($event[i].Debit);
      this.creditArray.push($event[i].Credit);
      if (i === $event.length - 1) {
        this.description += $event[i].Description + ".";
      } else {
        this.description += $event[i].Description + ", ";
      }

      this.total += $event[i].Credit;
    }
  }

  handleGridOutputCheque($event) {
    console.log($event.length);
    
  }

  // gridTable CONST
  description: string = '';
  total: number = 0;
  descriptionArray: string[] = [];
  debitArray: string[] = [];
  creditArray: string[] = [];
  
  
  // gridTableCheque CONST
  // chequeNo: string='';
  // chequeAmount: number= 0;
  // chequeDate: Date;
  // chequeBank: string = '';


  myForm: FormGroup;
  multiple0: boolean = false;
  multiple1: boolean = true;
  options0: Array<any> = [];
  options1: Array<any> = [];
  options2: Array<any> = [];
  accountArray: Array<any> = [
    { value: "Cash (IDR)", label: "Cash (IDR)" },
    { value: "Bca (IDR)", label: "Bca (IDR)" },
    { value: "Panin (IDR)", label: "Panin (IDR)" },
    { value: "Panin 2 (IDR)", label: "Panin 2 (IDR)" },
    { value: "Bri (IDR)", label: "Bri (IDR)" }];
  names: Array<any> = [];
  namesArray: Array<any> = [];
  transactionArray: Array<any> = [];
  selection: Array<string>;
  accountSelected: string;
  nameSelectedLabel: string;
  nameSelectedValue: string;
  date3: Date = new Date();

  
  @ViewChild('preSingle') preSingle;
  @ViewChild('preMultiple') preMultiple;

  logSingleString: string = '';
  logMultipleString: string = '';
  animation: boolean = true;
  cssClass: string = '';
  firstName: string;
  lastName: string;
  constructor(private _transactionService: TransactionService, private _fb: FormBuilder) {
  
    this._transactionService.getNames().subscribe(k => {
      this.names = k;
      for (let i = 0; i < this.names.length; i++) {
        this.namesArray[i] = {
          value: this.names[i].id,
          label: this.names[i].names
        }
      }
      this.options2 = this.namesArray
    })

    let numOptions = 100;
    let opts = new Array(numOptions);

    for (let i = 0; i < numOptions; i++) {
      opts[i] = {
        value: i.toString(),
        label: i.toString()
      };
    }

    this.options0 = opts.slice(0);
    this.options1 = opts.slice(0);

  }

  open() {
    this.modal.open();
  }
  ngOnInit() {
    // this.form = new FormGroup({});
    // this.form.addControl('voucherNo', new FormControl(''));
    // this.form.addControl('selectAccount', new FormControl(''));
    // this.form.addControl('selectName', new FormControl(''));
    // this.form.addControl('selectMultiple', new FormControl(''));

    // this.myForm = this._fb.group({
    //         name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
    //         address: this._fb.group({
    //             street: ['', <any>Validators.required],
    //             postcode: ['8000']
    //         })
    //     });

    this.myForm = this._fb.group({
      voucherNo: ['grg', Validators.required],
      selectAccount: ['', Validators.required],
      selectName: ['', Validators.required],

    });
  }

  onNameOpened() {
    this.logSingle('- opened');
  }

  onNameClosed() {
    this.logSingle('- closed');
  }

  onNameSelected(item) {
    this.logSingle('- selected (value: ' + item.value + ', label:' +
      item.label + ')');
    this.nameSelectedLabel = item.label;
    this.nameSelectedValue = item.value;
    console.log(item.value)
    let option = {
      itemValue: item.value
    }
    this._transactionService.getTransaction(option).subscribe(k => { this.transactionArray = k; console.log(this.transactionArray) });
  }



  onNameDeselected(item) {
    this.logSingle('- deselected (value: ' + item.value + ', label:' +
      item.label + ')');
  }


  onAccountOpened() {
    this.logSingle('- opened');
  }

  onAccountClosed() {
    this.logSingle('- closed');
  }

  onAccountSelected(item) {
    this.logSingle('- selected (value: ' + item.value + ', label:' +
      item.label + ')');
    this.accountSelected = item.label;
  }

  onAccountDeselected(item) {
    this.logSingle('- deselected (value: ' + item.value + ', label:' +
      item.label + ')');
  }

  onMultipleOpened() {
    this.logMultiple('- opened');
  }

  onMultipleClosed() {
    this.logMultiple('- closed');
  }

  onMultipleSelected(item) {
    this.logMultiple('- selected (value: ' + item.value + ', label:' +
      item.label + ')');
  }

  onMultipleDeselected(item) {
    this.logMultiple('- deselected (value: ' + item.value + ', label:' +
      item.label + ')');
  }

  private logSingle(msg: string) {
    this.logSingleString += msg + '\n';

    // Let change detection do its work before scrolling to div bottom.
    // setTimeout(() => {
    //   this.scrollToBottom(this.preSingle.nativeElement);
    // });
  }

  private logMultiple(msg: string) {
    this.logMultipleString += msg + '\n';

    // Let change detection do its work before scrolling to div bottom.
    setTimeout(() => {
      this.scrollToBottom(this.preMultiple.nativeElement);
    });
  }

  private scrollToBottom(elem) {
    elem.scrollTop = elem.scrollHeight;
  }

  private savetoDb() {

    let option = {
      acc: this.accountSelected,
      date: this.date3,
      nameValue: this.nameSelectedValue,
      nameLabel: this.nameSelectedLabel,
      voucher: 'CD16010001',
      description: this.description,
      debit: 0,
      credit: this.total,
      descriptionArray: this.descriptionArray,
      debitArray: this.debitArray,
      creditArray: this.creditArray
    };
    this._transactionService.postTransactions(option);
    this.myForm.reset()
  }

  private clearForm() {
    this.myForm.reset()
  }
}
