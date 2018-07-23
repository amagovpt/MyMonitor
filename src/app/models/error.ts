interface IError extends Error {
  code: number;
  message: string;
  type: string;

  isSerious(): boolean;
  showMessage(): void;
}

export class MmError implements IError {
  name: string;
  code: number;
  message: string;
  type: string;

  constructor(code: number, message: string, type: string = 'NORMAL') {
    this.code = code;
    this.message = message;
    this.type = type;
  }

  isSerious(): boolean {
    return this.type === 'SERIOUS';
  }

  showMessage(): void {
    alert('Error');
  }
}
