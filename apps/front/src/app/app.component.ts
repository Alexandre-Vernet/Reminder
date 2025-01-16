import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { SwPush, SwUpdate } from '@angular/service-worker';
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { environment } from "../environments/environment";

@Component({
	imports: [RouterModule, Toast],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: true,
	providers: [MessageService]
})
export class AppComponent implements OnInit {

	constructor(
		private readonly http: HttpClient,
		private readonly sw: SwPush,
		private readonly messageService: MessageService,
		private readonly swUpdate: SwUpdate
	) {
		// Force refresh PWA
		this.swUpdate.checkForUpdate();
		if (this.swUpdate.isEnabled) {
			this.swUpdate.versionUpdates.subscribe(event => {
				if (event.type === 'VERSION_READY') {
					window.location.reload();
				}
			});

			this.sw.messages.subscribe(msg => console.log(msg));
			this.sw.notificationClicks.subscribe(({ action, notification }) => {
				window.open(notification.data.url);
				fetch('');
			});
		}
	}

	ngOnInit() {
		if (environment.production) {
			if (!('serviceWorker' in navigator)) {
				setTimeout(() => {
					this.showError('Service workers are not supported in this browser');
				}, 1000);
			}

			if (!this.sw.isEnabled) {
				setTimeout(() => {
					this.showError('Service workers are not enabled');
				}, 1000);
			}
		}
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
