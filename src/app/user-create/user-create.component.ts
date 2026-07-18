import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() createUser = new EventEmitter<IUser>();

  public myForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]),
    website: new FormControl('', Validators.maxLength(100)),
    city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    street: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    suite: new FormControl('', Validators.maxLength(50)),
    zipcode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    geoLat: new FormControl('', Validators.required),
    geoLng: new FormControl('', Validators.required),
    companyName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    catchPhrase: new FormControl('', Validators.maxLength(200)),
    bs: new FormControl('', Validators.maxLength(100)),
  });

  public addUser() {
    if (this.myForm.invalid) return;

    const form = this.myForm.value;
    const newId = Date.now();

    const newUser: IUser = {
      id: newId,
      name: form.name || '',
      username: form.username || '',
      email: form.email || '',
      phone: form.phone || '',
      website: form.website || '',
      address: {
        street: form.street || '',
        suite: form.suite || '',
        city: form.city || '',
        zipcode: form.zipcode || '',
        geo: {
          lat: form.geoLat || '',
          lng: form.geoLng || '',
        }
      },
      company: {
        name: form.companyName || '',
        catchPhrase: form.catchPhrase || '',
        bs: form.bs || ''
      }
    };

    this.createUser.emit(newUser);
    this.myForm.reset();
    this.closeModal();
  }

  openModal() {
    this.isOpenChange.emit(true);
  }

  closeModal() {
    this.isOpenChange.emit(false);
  }
}
