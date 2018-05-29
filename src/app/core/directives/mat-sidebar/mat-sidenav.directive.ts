import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
// import { Subscription } from 'rxjs';

import { MatSidebarHelperService } from './mat-sidenav.service';

@Directive({
    selector: '[matSidebarHelper]'
})
export class FuseMatSidenavHelperDirective implements OnInit, OnDestroy
{
    // matchMediaSubscription: Subscription;
    @HostBinding('class.mat-is-locked-open') isLockedOpen = true;
    @Input('fuseMatSidenavHelper') id: string;
    @Input('mat-is-locked-open') matIsLockedOpenBreakpoint: string;

    constructor(
        private matSidebarService: MatSidebarHelperService,
        private observableMedia: ObservableMedia,
        private matSidebar: MatSidenav
    )
    {
    }

    ngOnInit()
    {
        this.matSidebarService.setSidenav(this.id, this.matSidebar);
    }

    ngOnDestroy()
    {
        // this.matchMediaSubscription.unsubscribe();
    }
}
