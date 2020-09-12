export class EndpointConfigService {
  getBaseEndpoint(local: boolean): string { 
    return local ? process.env.LOCAL_URL : process.env.PROD_URL;
  }
}