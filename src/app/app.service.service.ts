import { Injectable } from '@angular/core';
import { DataInterface } from './app.data';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _data: DataInterface[] = [];

  constructor() {}

  addData(item: DataInterface) {
    this._data.push(item);
  }

  getData(): DataInterface[] {
    return this._data;
  } 
}
