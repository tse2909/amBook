import { Component, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { GridOptions } from "ag-grid/main";
import Data from "./data";
import { TransactionService } from '../../transaction.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
// only import this if you are using the ag-Grid-Enterprise
import { Journal } from '../../../../../../models/journal';
@Component({
  selector: 'rich-grid',
  templateUrl: 'gridTable.html',
  styleUrls: ['gridTable.css'],
  encapsulation: ViewEncapsulation.None

})


export class RichGridComponent {
  @Output() gridOutput = new EventEmitter();
  private output: Journal[] = [];
  private memo: string;
  private total: number = 0;
  private gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any[];
  private columnDefs: any[];
  public rowCount: string;
  public secondData = [];
  constructor(private router: Router, private _dataservice: TransactionService) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;

  }

  ngOnInit() {
    this._dataservice.getAllTransaction().subscribe(p => { this.secondData = p });
    setTimeout(() => { console.log(this.secondData) }, 10000);
  }

  private createRowData() {
    var rowData: any[] = [];
    var rowCount = 8;

    for (var i = 0; i < rowCount; i++) {
      // var excelData = Data.Sheet1[i];
      rowData.push({

        description: null,
        amount: null,

      })
    }
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

    this.rowData = rowData;
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Description", field: "description", width: 590
        , filter: 'text', editable: true
      },
      {
        headerName: "Amount", field: "amount", width: 210
        , filter: 'number', editable: true, newValueHandler: numberNewValueHandler
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
    this.total = 0;
    this.memo = '';
    for (var i = 0; i < 8; i++) {
      if (this.rowData[i].description === null || this.rowData[i].description === '') {
        break;
      }
      this.total += +this.rowData[i].amount
      // this.output.Credit += +this.rowData[i].amount
      if (this.rowData[i + 1].description === null) {
        this.memo += this.rowData[i].description + ". ";
        // this.output.Description += this.rowData[i].description + ". ";
      }
      else {
        this.memo += this.rowData[i].description + ", ";
        // this.output.Description += this.rowData[i].description + ", "
      }
    }

    for (var i = 0; i < 8; i++) {
      if (this.rowData[i].description === null || this.rowData[i].description === '') {
        break;
      } else {
        var op = new Journal();
        op.Description = this.rowData[i].description;
        op.Credit = this.rowData[i].amount;
        op.Debit = 0;
        this.output[i] = op;
      }
    }

    // console.log(this.total);
    // console.log(this.memo);

    // this.output = { Description : this.memo,
    //                 Debit : 0,
    //                 Credit : this.total  
    //             };

    // console.log(this.output);

    this.gridOutput.emit(this.output);
    // console.log(this.output.Description);
    // this.output.Description = this.memo;
    // this.output.Credit = this.total;
    // console.log(this.output);


  }

  private onCellDoubleClicked($event) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
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

function numberNewValueHandler(params) {
  var valueAsNumber = parseInt(params.newValue);
  if (isNaN(valueAsNumber)) {
    window.alert("Invalid value " + params.newValue + ", must be a number");
  } else {
    params.data[params.colDef.field] = valueAsNumber;
  }
}
