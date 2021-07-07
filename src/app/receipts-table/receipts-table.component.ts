import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableItem } from 'src/app/models/table-item';
import { Receipt } from '../models/receipt-search-response';
import { DataService } from '../services/data.service';
import { UpdateReceiptModalComponent } from '../update-receipt-modal/update-receipt-modal.component';

@Component({
  selector: 'app-receipts-table',
  templateUrl: './receipts-table.component.html',
  styleUrls: ['./receipts-table.component.scss'],
})
export class ReceiptsTableComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  tableItems: TableItem[] = [
    { columnDef: 'status', headerCellDef: 'Κατάσταση' },
    {
      columnDef: 'lineOfBusiness',
      headerCellDef: 'Κλάδος',
    },
    {
      columnDef: 'policyNo',
      headerCellDef: 'Αρ. Συμβολαίου',
    },
    { columnDef: 'checkDigit', headerCellDef: 'Έλεγχος ψηφίου' },
    { columnDef: 'endorsement', headerCellDef: 'Αίτηση' },
    { columnDef: 'receipt', headerCellDef: 'Απόδειξη' },
    { columnDef: 'paymentType', headerCellDef: 'Τύπος Πληρωμής' },
    { columnDef: 'installments', headerCellDef: 'Δόσεις' },
    { columnDef: 'branchStore', headerCellDef: 'Κατάστημα' },
    { columnDef: 'collectionAgency', headerCellDef: 'Collection Agency' },
    { columnDef: 'agent', headerCellDef: 'Πράκτορας' },
    { columnDef: 'amount', headerCellDef: 'Ποσό' },
    { columnDef: 'endorsementAmount', headerCellDef: 'Ποσό Αίτησης' },
    { columnDef: 'installmentAmount', headerCellDef: 'Ποσό Δόσης' },
    { columnDef: 'installment2Amount', headerCellDef: 'Ποσό Δόσης 2' },
    { columnDef: 'billingDate', headerCellDef: 'Ημ/νία Τιμολόγησης' },
    { columnDef: 'issueDate', headerCellDef: 'Ημ/νία Έκδοσης' },
    { columnDef: 'paymentDate', headerCellDef: 'Ημ/νία Πληρωμής' },
    { columnDef: 'bankResponseDate', headerCellDef: 'Ημ/νία Απάντησης Τράπεζας' },
    { columnDef: 'registerDate', headerCellDef: 'Ημ/νία Εγγραφής' },
    { columnDef: 'reversalNo', headerCellDef: 'Reversal No' },
    { columnDef: 'reversalNo2', headerCellDef: 'Reversal No 2' },
    { columnDef: 'collectionTries', headerCellDef: 'Collection Tries' },
    { columnDef: 'orderNo', headerCellDef: 'Order No' },
    { columnDef: 'loanNo', headerCellDef: 'Loan No' },
    { columnDef: 'actions', headerCellDef: 'Ενέργειες' },
  ];
  displayedColumns: string[] = this.tableItems.map(item => item.columnDef);
  pageEvent: PageEvent;
  pageSizeOptions = [5, 10, 20];
  totalEs: number = 0;
  numberOfElements: number = 0;

  constructor(private dataService: DataService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.dataService.receipts$.subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource(res.receipts);
      }
    });
  }

  edit(row: Receipt): void {
    this.matDialog.open(UpdateReceiptModalComponent, { data: row }).afterClosed().subscribe(
      ()=>{
        console.log('lololo')
      }
    );
  }

  cancel(row: Receipt): void {
    const { lineOfBusiness, policyNo, receipt, installments, amount } = row;
    const request = {
      key: {
        // TODO: remove hardcoded lineOfBusiness
        lineOfBusiness: 'AUTO',
        policyNo,
        receipt,
        installments,
      },
    };

    this.dataService.receiptCancel(request).subscribe(res => {
      console.log(res);
    });
  }
}
