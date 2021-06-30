import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReceiptResponse } from 'src/app/models/receipt-response';
import { TableItem } from 'src/app/models/table-item';

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
  ];
  displayedColumns: string[] = this.tableItems.map(item => item.columnDef);
  pageEvent: PageEvent;
  pageSizeOptions = [5, 10, 20];
  totalEs: number = 0;
  numberOfElements: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([
      {
        status: 'string',
        lineOfBusiness: 'string',
        policyNo: 1,
        checkDigit: 1,
        endorsement: 1,
        receipt: 1,
        paymentType: 1,
        installments: 1,
        branchStore: 'string',
        collectionAgency: 'string',
        agent: 1,
        amount: 1,
        endorsementAmount: 1,
        installmentAmount: 1,
        installment2Amount: 1,
        billingDate: 'string',
        issueDate: 'string',
        paymentDate: 'string',
        bankResponseDate: 'string',
        registerDate: 'string',
        reversalNo: 1,
        reversalNo2: 1,
        collectionTries: 1,
        orderNo: 1,
        loanNo: 'string',
      },
    ]);
  }
}
