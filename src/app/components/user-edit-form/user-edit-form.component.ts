import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
]
})
export class UserEditFormComponent {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();

  tempUser: User | null = null;

  ngOnChanges() {
    if (this.user) {
      this.tempUser = { ...this.user, company: { ...this.user.company } };
    }
  }

  onSubmit() {
    if (this.tempUser) {
      this.save.emit(this.tempUser);
    }
  }

  onCancel() {
    this.close.emit();
  }
}