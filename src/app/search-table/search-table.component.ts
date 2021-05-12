import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteListComponent } from '../delete-list/delete-list.component';
import { SearchItem } from '../models/search-response';
import { TableItem } from '../models/table-item';
import { EditService } from '../services/edit.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent implements OnInit, AfterContentChecked {
  @Input() standingOrders: SearchItem[];
  @Input() searchId: string;
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

  constructor(
    private router: Router,
    private editService: EditService,
    private matDialog: MatDialog,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.editService.selectedStandingOrder = null;
  }

  ngAfterContentChecked(): void {
    const newStandingOrders = this.standingOrders
      ? this.standingOrders.map(o => ({
          ...o,
          startDate: o.startDate.slice().reverse().join('/'),
          endDate: o.endDate.slice().reverse().join('/'),
        }))
      : [];
    this.dataSource = new MatTableDataSource(newStandingOrders);
  }

  edit(element: SearchItem) {
    this.editService.selectedStandingOrder = element;
    console.log(element);
    this.router.navigate(['edit', element.id]);
  }

  delete(index: number, searchItem: SearchItem) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];

    this.openModal(searchItem.id, this.searchId);
  }

  private openModal(searchItemId: number, searchId: string) {
    const modalDialog = this.matDialog.open(DeleteListComponent, {
      height: '220px',
      width: '500px',
      data: {
        searchItemId,
        searchId,
      },
    });
    this.modalService.modalDialog = modalDialog;
  }
}
