import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { MatSidebarHelperService } from './mat-sidenav.service';
import { MatchMediaService } from '../../services/match-media.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[matSidebarHelper]'
})
export class MatSidenavHelperDirective implements OnInit, OnDestroy
{
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input('matSidebarHelper')
    id: string;

    @Input('mat-is-locked-open')
    matIsLockedOpenBreakpoint: string;

    // Private
    private _unsubscribeAll: Subject<any>;


    constructor(
        private _matchMediaService: MatchMediaService,
        private _matSidenavHelperService: MatSidebarHelperService,
        private _matSidenav: MatSidenav,
        private _observableMedia: ObservableMedia
    )
    {
        // Set the defaults
        this.isLockedOpen = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        console.log('sidenav init')
        // Register the sidenav to the service
        this._matSidenavHelperService.setSidenav(this.id, this._matSidenav);

        if ( this._observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
        {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }

        this._matchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if ( this._observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
                {
                    this.isLockedOpen = true;
                    this._matSidenav.mode = 'side';
                    this._matSidenav.toggle(true);
                }
                else
                {
                    this.isLockedOpen = false;
                    this._matSidenav.mode = 'over';
                    this._matSidenav.toggle(false);
                }
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

@Directive({
    selector: '[matSidenavToggler]'
})
export class MatSidenavTogglerDirective
{
    @Input('matSidenavToggler')
    id;

    constructor(
        private _matSidenavHelperService: MatSidebarHelperService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick()
    {
        // console.log(this._matSidenavHelperService.getSidenav(this.id))
        this._matSidenavHelperService.getSidenav(this.id).toggle();
    }
}
