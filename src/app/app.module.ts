import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssignmentOneComponent } from './components/assignment-one/assignment-one.component';
import { AssignmentTwoComponent } from './components/assignment-two/assignment-two.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/assignment-two/form/form.component';
import { ResultComponent } from './components/assignment-two/result/result.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ClosedPipe } from './pipes/closed/closed.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentOneComponent,
    AssignmentTwoComponent,
    HeaderComponent,
    FormComponent,
    ResultComponent,
    ClosedPipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
