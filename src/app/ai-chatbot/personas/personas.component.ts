import { Component, Input, OnInit, Optional } from '@angular/core';
import { Persona } from '../models/type';
import { Dialog } from '../../common/sidebar/dialog/dialog.component';

@Component({
  selector: 'personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss'],
  imports: [Dialog]
})
export class PersonasComponent implements OnInit {
  @Input("persona") persona?: Persona;
  constructor() { }

  ngOnInit() {
  }

}
