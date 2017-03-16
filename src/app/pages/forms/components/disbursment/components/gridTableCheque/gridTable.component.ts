import { Component, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { GridOptions } from "ag-grid/main";
import Data from "./data";
import { TransactionService } from '../../transaction.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
// only import this if you are using the ag-Grid-Enterprise
import { Journal } from '../../../../../../models/journal';
import { Cheque } from '../../../../../../models/cheque';
@Component({
  selector: 'rich-grid-cheque',
  templateUrl: 'gridTable.html',
  styleUrls: ['gridTable.css'],
  encapsulation: ViewEncapsulation.None

})



export class RichGridChequeComponent {
  @Output() gridOutput = new EventEmitter();
  private output: Cheque[] = [];
  private memo: string;
  private total: number = 0;
  private gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any[];
  private columnDefs: any[];
  public rowCount: string;

  constructor(private router: Router, private _dataservice: TransactionService) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;

  }

  ngOnInit() {
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
        headerName: "Cheque No.", field: "chequeno", width: 140
        , filter: 'text', editable: true
      },
      {
        headerName: "Amount", field: "chequeamount", width: 150
        , filter: 'number', editable: true, newValueHandler: numberNewValueHandler
      },
       {headerName: "Date", field: "chequedate", width: 130, editable: true, cellEditor: Datepicker},
       {headerName: "Bank", field: "chequebank", width: 130, editable: true}
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
    // this.total = 0;
    // this.memo = '';
    // for (var i = 0; i < 8; i++) {
    //   if (this.rowData[i].description === null || this.rowData[i].description === '') {
    //     break;
    //   }
    //   this.total += +this.rowData[i].amount
    //   // this.output.Credit += +this.rowData[i].amount
    //   if (this.rowData[i + 1].description === null) {
    //     this.memo += this.rowData[i].description + ". ";
    //     // this.output.Description += this.rowData[i].description + ". ";
    //   }
    //   else {
    //     this.memo += this.rowData[i].description + ", ";
    //     // this.output.Description += this.rowData[i].description + ", "
    //   }
    // }

    for (var i = 0; i < 8; i++) {
      if (this.rowData[i].chequeNo === null || this.rowData[i].chequeNo === '') {
        break;
      } else {
        var op = new Cheque();
        op.chequeNo = this.rowData[i].chequeno;
        op.chequeAmount = this.rowData[i].chequeamount;
        op.chequeDate = this.rowData[i].chequedate;
        op.chequeBank = this.rowData[i].chequebank;
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
    console.log(this.output);


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



// function to act as a class
function Datepicker () {}

// gets called once before the renderer is used
Datepicker.prototype.init = function(params) {
    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;

    // https://jqueryui.com/datepicker/
    $(this.eInput).datepicker({
        dateFormat: "dd/mmm/yy"
    });
};

// gets called once when grid ready to insert the element
Datepicker.prototype.getGui = function() {
    return this.eInput;
};

// focus and select can be done after the gui is attached
Datepicker.prototype.afterGuiAttached = function() {
    this.eInput.focus();
    this.eInput.select();
};

// returns the new value after editing
Datepicker.prototype.getValue = function() {
    return this.eInput.value;
};

// any cleanup we need to be done here
Datepicker.prototype.destroy = function() {
    // but this example is simple, no cleanup, we could
    // even leave this method out as it's optional
};

// if true, then this ediytor will appear in a popup
Datepicker.prototype.isPopup = function() {
    // and we could leave this method out also, false is the default
    return false;
};

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
