import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteListComponent } from '../delete-list/delete-list.component';
import { ModalComponent } from '../modal/modal.component';
import { Card } from '../models/card';
import { SearchItem } from '../models/search-response';
import { TableItem } from '../models/table-item';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
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
  private readonly destroy$: DestroyService;
  @Input() searchId: string;
  dataSource: MatTableDataSource<any>;
  pageSize = 10;
  currentPage = 0;
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
    { columnDef: 'iban', headerCellDef: 'ΙΒΑΝ/Κάρτα' },
    { columnDef: 'agent', headerCellDef: 'Κωδ. Παραγωγού' },
    { columnDef: 'startDate', headerCellDef: 'Ημ/νία Έναρξης' },
    { columnDef: 'endDate', headerCellDef: 'Ημ/νία Λήξης' },
    { columnDef: 'endorsement', headerCellDef: 'Αίτηση' },
    { columnDef: 'standingOrderStatus', headerCellDef: 'Κατάσταση' },
    { columnDef: 'actions', headerCellDef: 'Ενέργειες' },
  ];
  displayedColumns: string[] = this.tableItems.map(item => item.columnDef);
  pageEvent: PageEvent;
  pageSizeOptions = [5, 10, 20];
  totalEs: number = 0;
  numberOfElements: number = 0;
  resultsLoading$: Observable<boolean>;
  constructor(
    private router: Router,
    private editService: EditService,
    private matDialog: MatDialog,
    private dataService: DataService,
    public dialog: MatDialog,
    private modalService: ModalService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
   this.resultsLoading$ = this.dataService.resultsLoading$
    this.editService.selectedStandingOrder = null;

    this.dataService.standingOrders$.subscribe(res => {
      if (res) {
        this.totalEs = res?.standingOrders?.totalElements;
        this.numberOfElements = res.standingOrders?.numberOfElements;
        const newStandingOrders = res['standingOrders']['content'].map(o => ({
          ...o,
          paymentTypeLiteral: o.paymentType === 'BANK_ACCOUNT' ? 'Λογαριασμός' : 'Κάρτα',
          name: `${o.firstName} ${o.lastName}`,
        }));
        this.dataSource = new MatTableDataSource(newStandingOrders);
      }
    });
  }

  getCard(row) {
    this.editService.getCard(row.tokenOfCardNumber).subscribe(res => {
      this.dialog.open(ModalComponent, { data: res });
    });
  }

  edit(element: SearchItem) {
    this.editService.edit(this.searchId, element.id).subscribe(res => {
      if (res) {
        res.cardNumber !==""? this.editService.selectedCard = res:null;
        this.editService.selectedStandingOrder = element;
        this.router.navigate(['edit', element.id], { state: { searchId: this.searchId } });
      }
    });
  }

  onPaginateChange(pageEvent: PageEvent) {
    this.dataService.setStandingOrdersSubject(undefined);
    this.dataService.resultsLoadingSubject.next(true)
    this.dataService
      .searchStandingOrder(this.dataService.searchRequest, pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe(
        res => {
          this.dataService.setStandingOrdersSubject(res);
          this.searchId = res.searchId;
        },
        error => console.log(error),
        ()=>{
          this.dataService.resultsLoadingSubject.next(false)
        }
      );
    return pageEvent;
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
