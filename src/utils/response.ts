export class ApiResponse {
  public message: string;
  public data: any;
  public success: boolean;
  public statusCode: number;

  constructor(data: any = null, {message = "", statusCode = 200} = {}) {
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
    this.statusCode = statusCode;
  }
}
