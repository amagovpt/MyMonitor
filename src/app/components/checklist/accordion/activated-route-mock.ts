import { of } from 'rxjs';

export class ActivatedRouteMock {
  paramMap = of({ get: (key: string) => 'mockParamValue' });
}
