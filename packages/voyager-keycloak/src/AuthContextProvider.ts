import { AuthContextProvider } from './api'

export class KeycloakAuthContextProvider implements AuthContextProvider {
  public readonly request: any
  public readonly accessToken: any
  public readonly authenticated: boolean

  constructor ({ req }: { req: any }) {
    this.request = req
    this.accessToken = (req && req.kauth && req.kauth.grant) ? req.kauth.grant.access_token : undefined
    this.authenticated = !!((req && req.kauth && req.kauth.grant) ? req.kauth.grant.access_token : undefined)
  }

  public isAuthenticated (): boolean {
    return this.authenticated
  }

  public hasRole (role: string): boolean {
    return this.isAuthenticated() && this.accessToken.hasRole(role)
  }
}
