import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    private readonly AUTH_USER = 'user';

    constructor(){}

    saveAuthUser(authUser: string): void {
        localStorage.setItem(this.AUTH_USER, authUser);
    }

    getAuthUser(): string | null {
        return localStorage.getItem(this.AUTH_USER);
    }

    removeAuthUser(): void {
        localStorage.removeItem(this.AUTH_USER);
    }

}
