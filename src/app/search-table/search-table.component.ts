import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SearchItem } from '../models/search-response';
import { TableItem } from '../models/table-item';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent implements AfterContentChecked {
  @Input() standingOrders: SearchItem[];
  standingOrdersDataSource: MatTableDataSource<any>;

  tableItems: TableItem[] = [
    {
      columnDef: 'policyNo',
      headerCellDef: 'Policy Number',
    },
    {
      columnDef: 'lineOfBusiness',
      headerCellDef: 'Κλάδος',
    },
    { columnDef: 'paymentType', headerCellDef: 'Τύπος Πληρωμής' },
    { columnDef: 'id', headerCellDef: 'Id Πληρωμής' },
    { columnDef: 'bankAccount', headerCellDef: 'Τραπεζικός Λογαριασμός' },
    { columnDef: 'lastName', headerCellDef: 'Επίθετο Πελάτη' },
    { columnDef: 'agent', headerCellDef: 'Agent' },
    { columnDef: 'startDate', headerCellDef: 'Ημερομηνία Έναρξης' },
    { columnDef: 'endDate', headerCellDef: 'Ημερομηνία Τέλους' },
    { columnDef: 'endorsement', headerCellDef: 'Endorsement' },
  ];
  displayedColumns: string[] = this.tableItems.map(item => item.columnDef);

  constructor() {}

  ngAfterContentChecked(): void {
    this.standingOrdersDataSource = new MatTableDataSource(this.standingOrders);
  }
}
