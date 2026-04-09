declare module 'serverless-http' {
  import { RequestListener } from 'http';
  
  interface Options {
    provider?: 'aws' | 'azure' | 'gcp' | 'generic';
    requestId?: string;
    request?: (request: any) => void;
    response?: (response: any) => void;
  }

  function serverless(app: RequestListener, options?: Options): (req: any, res: any) => Promise<any>;
  
  export = serverless;
}
