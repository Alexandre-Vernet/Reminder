import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../../../../libs/interfaces";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	authUri = environment.authUri();

	private userSubject: Subject<User> = new Subject<User>();
	user: Observable<User> = this.userSubject.asObservable();

	constructor(
		private readonly http: HttpClient,
	) {
	}

	signUp(email: string, password: string): Observable<User> {
		return this.http.post<User>(`${ this.authUri }/sign-up`, { email, password })
			.pipe(
				tap(user => this.userSubject.next(user))
			);
	}

	signIn(email: string, password: string): Observable<User> {
		return this.http.post<User>(`${ this.authUri }/sign-in`, { email, password })
			.pipe(
				tap(user => this.userSubject.next(user))
			);
	}
}
