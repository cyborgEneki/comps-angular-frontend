import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { EIItem } from '../edit-initiative/edit-initiative';
import { EditInitiatiaveService } from '../edit-initiative/edit-initiatiave.service';

const GET_INITIATIVES = gql`
  {
    initiatives {
      initiatives {
        _id
        name
        leadName
        leadEmail
        startYear
        endYear
        statement
        goalTeam {
          _id
          name
        }
      }
    }
  }
`;

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
})
export class MenuSidenavComponent {
  initiatives!: Observable<any>;
  selectInitiativeForm = new FormGroup({
    initiative: new FormControl(''),
  });
  isNotHomepage: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private apollo: Apollo,
    private router: Router
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.initiatives = this.apollo
      .watchQuery({
        query: GET_INITIATIVES,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.initiatives.initiatives;
        })
      );
  }

  redirectToHomePage() {
    this.selectInitiativeForm.controls['initiative'].setValue('');
    this.isNotHomepage = false;
    this.router.navigate(['/']);
  }

  displayInitiativeData(initiative: any) {
    this.isNotHomepage = true;
    this.router.navigate(['/edit-initiative', initiative._id]);
  }

  deleteIndicator() {
    console.log('delete this');
  }
}
