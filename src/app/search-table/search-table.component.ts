import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SearchItem } from '../models/search-response';
import { TableItem } from '../models/table-item';
import { EditService } from '../services/edit.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent implements OnInit, AfterContentChecked {
  @Input() standingOrders: SearchItem[];
  dataSource: MatTableDataSource<any>;
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
    { columnDef: 'actions', headerCellDef: 'Ενέργειες' },
  ];
  displayedColumns: string[] = this.tableItems.map(item => item.columnDef);

  constructor(private router: Router, private editService: EditService) {}

  ngOnInit(): void {
    this.editService.selectedStandingOrder = null;
  }

  ngAfterContentChecked(): void {
    this.dataSource = new MatTableDataSource(this.standingOrders);
  }

  edit(element: SearchItem) {
    this.editService.selectedStandingOrder = element;
    console.log(element);
    this.router.navigate(['edit', element.id]);
  }

  delete(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
  }
}
