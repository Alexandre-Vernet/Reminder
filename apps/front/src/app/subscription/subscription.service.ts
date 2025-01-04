import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SubscriptionDto } from "../../../../libs/interfaces";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

	subscriptionUri = environment.subscriptionUri();

  constructor(
		private readonly http: HttpClient,
	) { }

	createSubscription(subscription: any) {
		return this.http.post<SubscriptionDto>(this.subscriptionUri, { subscription });
	}
}
