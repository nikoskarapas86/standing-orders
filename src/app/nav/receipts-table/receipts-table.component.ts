import { Component, OnInit } from '@angular/core';
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
    { columnDef: 'status', headerCellDef: 'Αρ. Πάγιας Εντολής' },
    {
      columnDef: 'lineOfBusiness',
      headerCellDef: 'Κλάδος',
    },
    {
      columnDef: 'policyNo',
      headerCellDef: 'Αρ. Συμβολαίου',
    },
    { columnDef: 'checkDigit', headerCellDef: 'Ονομ/μο Πελάτη' },
    { columnDef: 'endorsement', headerCellDef: 'Τύπος Πληρωμής' },
    { columnDef: 'receipt', headerCellDef: 'ΙΒΑΝ/Κάρτα' },
    { columnDef: 'paymentType', headerCellDef: 'Κωδ. Παραγωγού' },
    { columnDef: 'installments', headerCellDef: 'Ημ/νία Έναρξης' },
    { columnDef: 'branchStore', headerCellDef: 'Ημ/νία Λήξης' },
    { columnDef: 'collectionAgency', headerCellDef: 'Αίτηση' },
    { columnDef: 'agent', headerCellDef: 'Κατάσταση' },
    { columnDef: 'amount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'endorsementAmount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'installmentAmount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'installment2Amount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'billingDate', headerCellDef: 'Ενέργειες' },
    { columnDef: 'issueDate', headerCellDef: 'Ενέργειες' },
    { columnDef: 'paymentDate', headerCellDef: 'Ενέργειες' },
    { columnDef: 'endorsementAmount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'endorsementAmount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'endorsementAmount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'endorsementAmount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'endorsementAmount', headerCellDef: 'Ενέργειες' },
    { columnDef: 'endorsementAmount', headerCellDef: 'Ενέργειες' },
  ];

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
