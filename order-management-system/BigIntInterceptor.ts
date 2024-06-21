import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => this.transformBigInt(data)),
    );
  }

  private transformBigInt(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }
    if (typeof obj === 'bigint') {
      return obj.toString();
    }
    if (Array.isArray(obj)) {
      return obj.map(v => this.transformBigInt(v));
    }
    if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        obj[key] = this.transformBigInt(obj[key]);
      });
    }
    return obj;
  }
}