import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteListComponent } from '../delete-list/delete-list.component';
import { SearchItem } from '../models/search-response';
import { TableItem } from '../models/table-item';
import { DataService } from '../services/data.service';
import { EditService } from '../services/edit.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  standingOrders: SearchItem[] = [];
  @Input() searchId: string;
  dataSource: MatTableDataSource<any>;
  tableItems: TableItem[] = [
    { columnDef: 'id', headerCellDef: 'Αρ. Πάγιας Εντολής' },
    {
      columnDef: 'policyNo',
      headerCellDef: 'Αρ. Συμβολαίου',
    },
    {
      columnDef: 'lineOfBusiness',
      headerCellDef: 'Κλάδος',
    },
    { columnDef: 'name', headerCellDef: 'Ονομ/μο Πελάτη' },
    { columnDef: 'paymentTypeLiteral', headerCellDef: 'Τύπος Πληρωμής' },
    { columnDef: 'bankAccount', headerCellDef: 'Τραπεζικός Λογαριασμός' },
    { columnDef: 'agent', headerCellDef: 'Κωδ. Παραγωγού' },
    { columnDef: 'startDate', headerCellDef: 'Ημ/νία Έναρξης' },
    { columnDef: 'endDate', headerCellDef: 'Ημ/νία Λήξης' },
    { columnDef: 'endorsement', headerCellDef: 'Αίτηση' },
    { columnDef: 'standingOrderStatus', headerCellDef: 'Κατάσταση' },
    { columnDef: 'actions', headerCellDef: 'Ενέργειες' },
  ];
  displayedColumns: string[] = this.tableItems.map(item => item.columnDef);
  newStandingOrders: any;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];
  currentPage = 0;

  constructor(
    private router: Router,
    private editService: EditService,
    private matDialog: MatDialog,
    private dataService: DataService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.editService.selectedStandingOrder = null;
    this.dataService.standingOrders$.subscribe(res => {
      const newStandingOrders = res.map(o => ({
        ...o,
        startDate: o.startDate.slice().reverse().join('/'),
        endDate: o.endDate.slice().reverse().join('/'),
        paymentTypeLiteral: o.paymentType === 'BANK_ACCOUNT' ? 'Λογαριασμός' : 'Κάρτα',
        name: `${o.firstName} ${o.lastName}`,
      }));
      this.dataSource = new MatTableDataSource(newStandingOrders);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(element: SearchItem) {
    this.editService.selectedStandingOrder = element;
    this.router.navigate(['edit', element.id]);
  }

  delete(index: number, searchItem: SearchItem) {
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
