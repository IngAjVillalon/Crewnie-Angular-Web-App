import { Component, OnInit } from '@angular/core';
import { trigger, transition, group, query, style, animate } from '@angular/animations';


@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
  animations: [
    trigger('routeAnimation', [
        transition('1 => 2, 2 => 3, 3 => 4, 4 => 5, 5 => 6', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
        transition('5 => 4, 4 => 3, 3 => 2, 2 => 1', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
    ])
]
})
export class BlankLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
}

}
