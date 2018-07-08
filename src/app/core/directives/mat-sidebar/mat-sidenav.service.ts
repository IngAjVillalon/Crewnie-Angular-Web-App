import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class MatSidebarHelperService
{
    sidenavInstances: MatSidenav[];

    constructor()
    {
        this.sidenavInstances = [];
    }

    /**
     * Set sidenav
     *
     * @param id
     * @param instance
     */
    setSidenav(id, instance): void
    {
        this.sidenavInstances[id] = instance;
    }

    /**
     * Get sidenav
     *
     * @param id
     * @returns {any}
     */
    getSidenav(id): any
    {   console.log(this.sidenavInstances)
        return this.sidenavInstances[id];
    }
}
