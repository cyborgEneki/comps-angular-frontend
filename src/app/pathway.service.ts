import { Injectable } from '@angular/core';
import { PathwayDataInterface } from './pathway';

@Injectable({
  providedIn: 'root',
})
export class PathwayService {
  private _data: PathwayDataInterface[] = [];

  constructor() {}

  addData(item: PathwayDataInterface) {
    this._data.push(item);
  }

  getData(): PathwayDataInterface[] {
    return this._data;
  }
}
