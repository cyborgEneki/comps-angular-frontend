import { Component, OnInit } from '@angular/core';
// This is the object that is exposed in a reactive form in contrast to the template-driven forms which are limited to directives within that template
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-initiative',
  templateUrl: './edit-initiative.component.html',
  styleUrls: ['./edit-initiative.component.scss']
})
export class EditInitiativeComponent implements OnInit {
  editInitiativeForm = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

}
