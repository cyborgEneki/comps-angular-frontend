import { Injectable } from '@angular/core';
import { EIItem } from './edit-initiative';

@Injectable({
  providedIn: 'root',
})
export class EditInitiatiaveService {
  private data: EIItem[] = [];

  constructor() {}

  addData(item:EIItem){
    this.data.push(item);
  }
  getData(): EIItem[] {
    return this.data;
  }
}