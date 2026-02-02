import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';
import { ZohoCrmService } from '../../services/zoho-crm.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  standalone: true,
  imports: [CommonModule, UserEditFormComponent],
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  selectedIds: number[] = [];
  selectedUser: User | null = null;
  showEditForm = false;

  constructor(
    private userService: UserService,
    private zohoCrmService: ZohoCrmService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      console.log('Usuarios recibidos:', users);
      this.users = users;
      this.cdr.detectChanges(); // <--- fuerza actualización
    });
  }

  toggleSelection(id: number, checked: boolean) {
    if (checked) {
      if (!this.selectedIds.includes(id)) this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(i => i !== id);
    }
  }

  onEdit(user: User) {
    this.selectedUser = { ...user, company: { ...user.company } };
    this.showEditForm = true;
  }

  onFormClose() {
    this.selectedUser = null;
    this.showEditForm = false;
  }

  async onSyncSelected() {
    console.log("como estas")
    const selectedUsers = this.users.filter(u => this.selectedIds.includes(u.id));
    try {
        await this.zohoCrmService.syncUsers(selectedUsers);
    } catch (e) {
        console.log(e);
    }

    this.selectedIds = [];
  }

  async onSave(updatedUser: User) {
    this.users = this.users.map(u => u.id === updatedUser.id ? updatedUser : u);
    await this.zohoCrmService.syncUsers([updatedUser]);
    this.onFormClose();
  }
}