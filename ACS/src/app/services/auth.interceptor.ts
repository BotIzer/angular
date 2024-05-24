import { HttpInterceptorFn } from '@angular/common/http';
import { HttpService } from './http.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpservice = inject(HttpService);
  const clonedReq = req.clone({
    setHeaders: {Authorization: httpservice.userData.token}
  })

  return next(clonedReq);
  //TODO: Elkapni a response headerben szereplő "session" értéket, ami frissített validTo értéket tartalmaz.
};
