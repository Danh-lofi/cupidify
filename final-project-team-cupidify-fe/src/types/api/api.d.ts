interface IResponse<T> {
    message: string;
    data: T;
    status: number;
}
