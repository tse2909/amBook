import { Component, ViewEncapsulation } from "@angular/core";
import { GridOptions } from "ag-grid/main";
// import Data from "./data";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { TransactionService } from './transaction.service';
// only import this if you are using the ag-Grid-Enterprise
import { ActivatedRoute, Data } from '@angular/router';
@Component({
  selector: 'rich-grid',
  templateUrl: 'rich-grid.component.html',
  styleUrls: ['rich-grid.css'],
  encapsulation: ViewEncapsulation.None

})
export class RichGridComponent {

  private gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any[] = [];
  private columnDefs: any[];
  public rowCount: string;
  public secondData = [];
  private total: number = 0;
  account: string;
  dateFrom: Date;
  dateTo: Date;
  datepickerToOpts: any = {};
  private accountParams: any;
  selectedDateList: dateList = new dateList('All', 'All');

  dateLists = [
    new dateList('All', 'All'),
    new dateList('Last year', 'Last year'),
    new dateList('Last month', 'Last month'),
    new dateList('Yesterday', 'Yesterday'),
    new dateList('Today', 'Today'),
  ]

  handleDateFromChange(dateFrom: Date) {
    // update the model
    this.dateFrom = dateFrom;

    // do not mutate the object or angular won't detect the changes
    this.datepickerToOpts = {
      startDate: dateFrom
    };
    console.log('fsdgfdgdsfgsdfglknljn');
  }

  constructor(private router: Router, private _transactionService: TransactionService, private route: ActivatedRoute) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;

  }


  ngOnInit() {
    this.accountParams = this.route.snapshot.data['account'];
    // In a real app: dispatch action to load the details here.

    let option = {
      from: new Date("01/01/2012"),
      to: new Date("01/01/2018"),
      account: this.accountParams
    }
    console.log(this.accountParams);
    this._transactionService.getTransactionbyOption(option).subscribe(p => {
      this.secondData = p; console.log(this.secondData);

      for (var i = 0; i < this.secondData.length; i++) {
        var excelData = this.secondData[i];
        var balance = excelData.debit - excelData.credit;
        var mutateDebit = 0;
        var mutateCredit = 0
        if (balance < 0) {
          mutateCredit = balance * -1
        } else {
          mutateDebit = balance
        }
        this.total += balance;
        this.rowData.push({
          Date: excelData.date,
          Ref: excelData.names.name,
          Number: excelData.voucher,
          Description: excelData.description,
          Debit: mutateDebit,
          Credit: mutateCredit,
          Balance: this.total


        })
      }
      this.gridOptions.api.setRowData(this.rowData)
      console.log(this.rowData)
    });
  }



  private createRowData() {
    // var rowData: any[] = [];
    // var rowCount = Data.Sheet1.length;

    // for (var i = 0; i < rowCount; i++) {
    //   var excelData = Data.Sheet1[i];
    //   rowData.push({
    //     Date: excelData.Date,
    //     Ref: excelData.Ref,
    //     Number: excelData.Number,
    //     Description: excelData.Description,
    //     Debit: excelData.Debit,
    //     Credit: excelData.Credit
    //   })
    // }
    // for (var i = 0; i < 10000; i++) {
    //   var countryData = RefData.countries[i % RefData.countries.length];
    //   rowData.push({
    //     name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
    //     skills: {
    //       android: Math.random() < 0.4,
    //       html5: Math.random() < 0.4,
    //       mac: Math.random() < 0.4,
    //       windows: Math.random() < 0.4,
    //       css: Math.random() < 0.4
    //     },
    //     address: RefData.addresses[i % RefData.addresses.length],
    //     years: Math.round(Math.random() * 100),
    //     proficiency: Math.round(Math.random() * 100),
    //     country: countryData.country,
    //     continent: countryData.continent,
    //     language: countryData.language,
    //     mobile: createRandomPhoneNumber(),
    //     landline: createRandomPhoneNumber()
    //   });
    // }

    // this.rowData = rowData;


  }

  private createColumnDefs() {
    this.columnDefs = [
      // {
      //   headerName: '#', width: 30, checkboxSelection: true,
      //   suppressMenu: true, pinned: true
      // },

      {
        headerName: "Date", field: "date", width: 70,
        cellRenderer: dateCellRenderer
        , filter: 'text', sort: 'desc'
      },
      {
        headerName: "Number",
        field: "number",
        width: 80,
        cellRenderer: numberCellRenderer,
        filter: 'text'
      },
      {
        headerName: "Name",
        field: "name",
        width: 150,
        cellRenderer: nameCellRenderer,
        filter: 'text'
      },
      {
        headerName: "Description",
        field: "description",
        width: 410,
        cellRenderer: descriptionCellRenderer,
        filter: 'text'
      },
      {
        headerName: "Debit",
        field: "debit",
        width: 120,
        cellRenderer: debitCellRenderer,
        filter: 'text'
      },
      {
        headerName: "Credit",
        field: "credit",
        width: 120,
        cellRenderer: creditCellRenderer,
        filter: 'text'
      },
      {
        headerName: "Balance",
        field: "balance",
        width: 120,
        cellRenderer: balanceCellRenderer,
        filter: 'text'
      }
    ];
  }

  private calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      var model = this.gridOptions.api.getModel();
      var totalRows = this.rowData.length;
      var processedRows = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
  }

  private onModelUpdated() {
    console.log('onModelUpdated');
    this.calculateRowCount();
  }

  private onReady() {
    console.log('onReady');
    this.calculateRowCount();
  }

  private onCellClicked($event) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellValueChanged($event) {
    console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  private onCellDoubleClicked($event) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    this.router.navigate(['/detail', $event.colDef.field]);
    // this.router.navigate(['detail'])
  }

  private onCellContextMenu($event) {
    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellFocused($event) {
    console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
  }

  private onRowSelected($event) {
    // taking out, as when we 'select all', it prints to much to the console!!
    // console.log('onRowSelected: ' + $event.node.data.name);
  }

  private onSelectionChanged() {
    console.log('selectionChanged');
  }

  private onBeforeFilterChanged() {
    console.log('beforeFilterChanged');
  }

  private onAfterFilterChanged() {
    console.log('afterFilterChanged');
  }

  private onFilterModified() {
    console.log('onFilterModified');
  }

  private onBeforeSortChanged() {
    console.log('onBeforeSortChanged');
  }

  private onAfterSortChanged() {
    console.log('onAfterSortChanged');
  }

  private onVirtualRowRemoved($event) {
    // because this event gets fired LOTS of times, we don't print it to the
    // console. if you want to see it, just uncomment out this line
    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
  }

  private onRowClicked($event) {
    console.log('onRowClicked: ' + $event.node.data.Number);
  }

  public onQuickFilterChanged($event) {
    console.log($event);
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  private onColumnEvent($event) {
    console.log('onColumnEvent: ' + $event);
  }

  private refreshGrid() {
    let option = {
      from: this.dateFrom,
      to: this.dateTo,
      account: this.accountParams
    }
    this._transactionService.getTransactionbyOption(option).subscribe(
      p => {
        this.secondData = p; console.log(this.secondData);
        this.rowData = [];
        for (var i = 0; i < this.secondData.length; i++) {
          var excelData = this.secondData[i];
          var balance = excelData.debit - excelData.credit;
          this.total += balance;
          this.rowData.push({
            Date: excelData.date,
            Ref: excelData.names.name,
            Number: excelData.voucher,
            Description: excelData.description,
            Debit: excelData.debit,
            Credit: excelData.credit,
            Balance: this.total


          })
        }
        this.gridOptions.api.setRowData(this.rowData)
        console.log(this.rowData)
      }
    );
  }

  onDateoChange($event) {
    var dateChoose = $event.target.value;
    // console.log(this.dateFrom);
    // console.log(this.dateTo)
    var date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDay();
    console.log(dateChoose);
    if (dateChoose === 'Last year') {


      this.dateFrom = new Date(y - 1, 0, 1);
      this.dateTo = new Date(y - 1, 12, 0);
      // console.log(firstDay);
      // console.log(lastDay)
    } else if (dateChoose === 'Last month') {

      this.dateFrom = new Date(y, m - 1, 1);
      this.dateTo = new Date(y, m, 0);

    }
    else if (dateChoose === 'Yesterday') {

      this.dateFrom = new Date(y, m, d - 1);
      this.dateTo = new Date(y, m, d - 1);

    } else if (dateChoose === 'Today') {

      this.dateFrom = new Date(y, m, d);
      this.dateTo = new Date(y, m, d);

    }
  }

}





function dateCellRenderer(params) {

  return params.data.Date;
}

function descriptionCellRenderer(params) {

  return params.data.Description;
}

function numberCellRenderer(params) {

  return params.data.Number;
}
function nameCellRenderer(params) {
  var name: String = params.data.Ref;
  return name;
}
function debitCellRenderer(params) {

  return +params.data.Debit;
}

function creditCellRenderer(params) {

  return params.data.Credit;
}

function balanceCellRenderer(params) {
  var value = params.data.Balance;
  var eBalance = document.createElement('div');
  eBalance.className = 'div-balance-value';
  if (value < 0) {
    eBalance.style.color = 'red';
  }
  eBalance.innerHTML = value;
  return eBalance;
  // return params.data.Balance;
}

function createRandomPhoneNumber() {
  var result = '+';
  for (var i = 0; i < 12; i++) {
    result += Math.round(Math.random() * 10);
    if (i === 2 || i === 5 || i === 8) {
      result += ' ';
    }
  }
  return result;
}

function percentCellRenderer(params) {
  var value = params.value;

  var eDivPercentBar = document.createElement('div');
  eDivPercentBar.className = 'div-percent-bar';
  eDivPercentBar.style.width = value + '%';
  if (value < 20) {
    eDivPercentBar.style.backgroundColor = 'red';
  } else if (value < 60) {
    eDivPercentBar.style.backgroundColor = '#ff9900';
  } else {
    eDivPercentBar.style.backgroundColor = '#00A000';
  }

  var eValue = document.createElement('div');
  eValue.className = 'div-percent-value';
  eValue.innerHTML = value + '%';

  var eOuterDiv = document.createElement('div');
  eOuterDiv.className = 'div-outer-div';
  eOuterDiv.appendChild(eValue);
  eOuterDiv.appendChild(eDivPercentBar);

  return eOuterDiv;
}



class dateList {
  constructor(public value: string, public label: string) { }
}

