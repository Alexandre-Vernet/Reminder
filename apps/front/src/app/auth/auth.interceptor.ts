import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export const authIntercept = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${ token }`
		});

		const newReq = request.clone({
			headers
		})

		return next(newReq);
	} else {
		return next(request);
	}
}
