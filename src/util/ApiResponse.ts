export type ApiResponseType = {
    success?:any|null;
    error?:ApiErrorResponseType|null;
};

export type ApiErrorResponseType = {
    message:string;
    data:any;
    code?:string|null;
};

export type ApiStates = 'loading'|'error'|'success'|'none';