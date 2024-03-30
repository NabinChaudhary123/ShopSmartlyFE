// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   const Token = window.localStorage.getItem("accessToken");
//   // if(req.url.includes('auth/login') || req.url.includes('register') || req.url.includes('listProducts')) {
//   //   return next(req);
//   // }
//   console.log("Request with Token: ", Token);
//   debugger;
//   const cloneRequest = req.clone({
//     setHeaders: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${Token}`,
//     }
//   })
//   console.log('Request with Token: ',Token);

 
//   return next(cloneRequest);
// };
