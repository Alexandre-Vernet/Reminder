import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UserDto } from "../../../../libs/interfaces";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	authUrl = environment.authUri();

	private userSubject: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>(null);
	user: Observable<UserDto> = this.userSubject.asObservable();

	constructor(
		private readonly http: HttpClient,
	) {
	}

	getUser() {
		return this.userSubject.value;
	}

	signUp(email: string, password: string): Observable<{ accessToken: string }> {
		return this.http.post<{ accessToken: string }>(`${ this.authUrl }/sign-up`, { email, password })
			.pipe(
				tap(res => localStorage.setItem('accessToken', res.accessToken)),
			);
	}

	signIn(email: string, password: string): Observable<UserDto> {
		return this.http.post<UserDto>(`${ this.authUrl }/sign-in`, { email, password })
			.pipe(
				tap(user => this.setUser(user)),
			);
	}

	signInWithAccessToken(): Observable<UserDto> {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			return this.http.post<UserDto>(`${ this.authUrl }/sign-in-with-access-token`, { accessToken })
				.pipe(
					tap(user => this.setUser(user)),
				);
		}
		return of(null);
	}

	private setUser(user: UserDto) {
		localStorage.setItem('accessToken', user.accessToken);
		this.userSubject.next(user);
	}
}
