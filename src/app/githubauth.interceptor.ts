import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHandler } from '@angular/common/http/src/backend';

@Injectable()
export class GithubAuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'token x')
        })
        return next.handle(authReq);
    }
}