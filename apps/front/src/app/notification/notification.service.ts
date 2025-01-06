import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from "rxjs";
import { NotificationDto } from "../../../../libs/interfaces";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	private notificationsSubject: BehaviorSubject<NotificationDto[]> = new BehaviorSubject<NotificationDto[]>([]);
	notifications$ = this.notificationsSubject.asObservable();

	notificationUri = environment.notificationUri();

	constructor(
		private readonly http: HttpClient,
		private readonly authService: AuthService
	) {
		if (this.authService.getUser()) {
			this.getNotifications();
		}
	}

	getNotifications() {
		return this.http.get<NotificationDto[]>(this.notificationUri, { params: { userId: this.authService.getUser().id } })
			.pipe(
				map((notifications: NotificationDto[]) => this.notificationsSubject.next(notifications))
			).subscribe();
	}

	createNotification(notification: NotificationDto) {
		const user = this.authService.getUser();
		return this.http.post<NotificationDto>(this.notificationUri, { notification, user })
			.pipe(
				map((notification: NotificationDto) => this.notificationsSubject.next([notification, ...this.notificationsSubject.value]))
			)
	}

	updateNotification(notification: NotificationDto) {
		return this.http.patch<NotificationDto>(`${ this.notificationUri }/${ notification.id }`, { notification })
			.pipe(
				map((updatedNotification: NotificationDto) => {
					const updatedNotifications = this.notificationsSubject.value.map(e =>
						e.id === updatedNotification.id ? updatedNotification : e
					);
					this.notificationsSubject.next(updatedNotifications);
				})
			);
	}

	deleteNotification(id: number) {
		return this.http.delete(`${ this.notificationUri }/${ id }`)
			.pipe(
				map(() => this.notificationsSubject.next(this.notificationsSubject.value.filter(e => e.id != id)))
			)
	}
}
