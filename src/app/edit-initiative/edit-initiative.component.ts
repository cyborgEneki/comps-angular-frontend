import { Component, OnInit } from '@angular/core';
// This is the object that is exposed in a reactive form in contrast to the template-driven forms which are limited to directives within that template
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-initiative',
  templateUrl: './edit-initiative.component.html',
  styleUrls: ['./edit-initiative.component.scss'],
})
export class EditInitiativeComponent implements OnInit {
  editInitiativeForm = new FormGroup({
    initiativeName: new FormControl(''),
    initiativeLead: new FormControl(''),
    initiativeLeadEmail: new FormControl(''),
    startYear: new FormControl(''),
    endYear: new FormControl(''),
    statement: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.editInitiativeForm.value);
  }
}
