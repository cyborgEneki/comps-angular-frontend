import { Injectable } from '@angular/core';
import { DataInterface } from './pathway';

@Injectable({
  providedIn: 'root',
})
export class PathwayService {
  private _data: DataInterface[] = [];

  constructor() {}

  addData(item: DataInterface) {
    this._data.push(item);
  }

  getData(): DataInterface[] {
    return this._data;
  }
}
