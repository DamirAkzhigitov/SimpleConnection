export type RequestMethods = 'get' | 'post' | 'delete' | 'head' | 'options';

export type SendRequestItem = <Type>(
  url: string,
  method: RequestMethods,
  data?: string
) => Promise<Type | null>;
