import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuSidenavComponent } from './menu-sidenav/menu-sidenav.component';
import { EditInitiativeComponent } from './edit-initiative/edit-initiative.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IndicatorComponent } from './indicator/indicator.component';

import { AppService } from './app.service.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuSidenavComponent,
    EditInitiativeComponent,
    WelcomeComponent,
    IndicatorComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Register component in corresponding module (this is not done by default) then register the custom module in the main module. That way, Angular will know it exists.