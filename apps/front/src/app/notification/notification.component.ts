import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table, TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { Toast } from "primeng/toast";
import { Toolbar } from "primeng/toolbar";
import { ConfirmDialog } from "primeng/confirmdialog";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { Dialog } from "primeng/dialog";
import { InputText } from "primeng/inputtext";
import { NotificationDto } from "../../../../libs/interfaces";
import { NotificationService } from "./notification.service";
import { Tag } from "primeng/tag";

@Component({
	selector: 'app-reminder',
	imports: [
		CommonModule,
		TableModule,
		FormsModule,
		Toast,
		Toolbar,
		Button,
		ConfirmDialog,
		IconField,
		InputIcon,
		Dialog,
		InputText,
		ReactiveFormsModule,
		Tag
	],
	templateUrl: './notification.component.html',
	styleUrl: './notification.component.scss',
	standalone: true,
	providers: [MessageService, ConfirmationService, NotificationService]
})
export class NotificationComponent implements OnInit {

	notificationDialog: boolean = false;

	notifications: NotificationDto[] = [];

	selectedNotification!: NotificationDto[] | null;

	submitted: boolean = false;

	formGroupCreateNotification = new FormGroup({
		id: new FormControl(''),
		name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
		cron: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
		title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
		description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
	});

	@ViewChild('dt') dt!: Table;


	constructor(
		private readonly notificationService: NotificationService,
		private readonly messageService: MessageService,
		private readonly confirmationService: ConfirmationService,
	) {
	}

	ngOnInit() {
		this.notificationService.notifications$.subscribe(notifications => this.notifications = notifications)
	}

	filter($event) {
		this.dt.filterGlobal($event.target.value, 'contains')
	}

	showDialogCreateNotification() {
		this.notificationDialog = true;
	}

	hideDialogCreateNotification() {
		this.notificationDialog = false;
	}

	createNotification() {
		const { id, name, cron, title, description } = this.formGroupCreateNotification.value;

		const notification: NotificationDto = {
			id: Number(id),
			name: name.trim(),
			cron: cron.trim(),
			title: title.trim(),
			description: description.trim()
		};

		if (notification.id) {
			this.notificationService.updateNotification(notification)
				.subscribe({
					next: () => {
						this.formGroupCreateNotification.reset();
						this.showSuccess('Notification Updated');
					},
					error: (err) => this.showError(err.error.message ?? 'Error creating notification')
				});
		} else {
			this.notificationService.createNotification(notification)
				.subscribe({
					next: () => this.showSuccess('Notification Created'),
					error: (err) => this.showError(err.error.message ?? 'Error creating notification')
				});
		}

		this.notificationDialog = false;
	}


	showDialogUpdateNotification(notification: NotificationDto) {
		this.formGroupCreateNotification.patchValue({
			id: notification.id.toString(),
			name: notification.name,
			cron: notification.cron,
			title: notification.title,
			description: notification.description
		});
		this.notificationDialog = true;
	}

	showDialogDeleteNotification(notification: NotificationDto) {
		this.confirmationService.confirm({
			message: `Are you sure you want to delete ${ notification.title }?`,
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: () => this.deleteNotification(notification)
		});
	}

	deleteNotification(notification: NotificationDto) {
		this.notificationService.deleteNotification(notification.id)
			.subscribe({
				next: () => this.showSuccess('Notification Deleted'),
				error: (err) => this.showError(err.error.message ?? 'Error deleting notification')
			})
	}

	deleteSelectedProducts() {
		this.confirmationService.confirm({
			message: 'Are you sure you want to delete the selected products?',
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.selectedNotification.forEach(notification => this.deleteNotification(notification))
				this.selectedNotification = null;
			}
		});
	}

	getSeverity(status: boolean) {
		return status ? 'success' : 'warn';
	}

	private showSuccess(detail: string) {
		this.messageService.add({
			severity: 'success',
			summary: 'Successful',
			detail,
			life: 3000
		});
	}

	private showError(detail: string) {
		this.messageService.add({
			severity: 'error',
			summary: 'Error',
			detail,
			life: 3000
		});
	}
}
