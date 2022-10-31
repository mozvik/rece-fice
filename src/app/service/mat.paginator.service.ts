import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class MatPaginatorService extends MatPaginatorIntl {
  constructor() {
    super();
    this.translateLabels();
  }

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0 || pageSize === 0) {
      return '';
    }
    length = Math.max(length, 0);
    const startIndex =
      page * pageSize > length
        ? (Math.ceil(length / pageSize) - 1) * pageSize
        : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' a(z) ' + length + ' elemből';
  };

  translateLabels(): void {
    this.firstPageLabel = 'Első oldal';
    this.itemsPerPageLabel = 'Elemek oldalanként';
    this.lastPageLabel = 'Utolsó oldal';
    this.nextPageLabel = 'Következő';
    this.previousPageLabel = 'Előző';
    this.changes.next();
  }
}
