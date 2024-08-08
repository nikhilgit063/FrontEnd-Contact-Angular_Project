import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models1/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);

  contactsForm = new FormGroup({
    FirstName: new FormControl<string>(''),
    LastName: new FormControl<string>(''),
    Email: new FormControl<string>(''),
    PhoneNumber: new FormControl<string>(''),
    Address: new FormControl<string>(''),
    City: new FormControl<string>(''),
    State: new FormControl<string>(''),
    Country: new FormControl<string>(''),
    PostalCode: new FormControl<string>('')

  })

  contacts$ = this.getContacts();

    onFormSubmit(){

      console.log(this.contactsForm.value);
      const addContactRequest = {
        FirstName:this.contactsForm.value.FirstName,
        LastName:this.contactsForm.value.LastName,
        Email:this.contactsForm.value.Email,
        PhoneNumber:this.contactsForm.value.PhoneNumber,
        Address:this.contactsForm.value.Address,
        City:this.contactsForm.value.City,
        State:this.contactsForm.value.State,
        Country:this.contactsForm.value.Country,
        PostalCode:this.contactsForm.value.PostalCode

      }
        this.http.post('http://localhost:5031/api/User/get',addContactRequest)
        .subscribe({
          next: (value) => {
            console.log(value);
            this.contacts$ = this.getContacts();
            this.contactsForm.reset();
          }
        })
    
      }

  private getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>('http://localhost:5031/api/User/get');
  }
}
