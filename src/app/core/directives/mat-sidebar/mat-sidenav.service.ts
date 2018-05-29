import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class MatSidebarHelperService
{
    matSidebars: MatSidenav[];

    constructor()
    {
        this.matSidebars = [];
    }

    setSidenav(id, instance)
    {
        this.matSidebars[id] = instance;
    }

    getSidenav(id)
    {
        return this.matSidebars[id];
    }
}
