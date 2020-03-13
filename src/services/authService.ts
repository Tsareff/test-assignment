export const TOKEN = "github_token";

class AuthService {
  private _accessToken: string = localStorage.getItem(TOKEN) || "";

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(token: string) {
    this._accessToken = token;
    localStorage.setItem(TOKEN, token);
  }
}

const instance = new AuthService();

export { instance as AuthService };
