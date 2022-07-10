import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-caracteristicas-familia-dialog',
  templateUrl: './caracteristicas-familia-dialog.component.html',
  styleUrls: ['./caracteristicas-familia-dialog.component.css']
})
export class CaracteristicasFamiliaDialogComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
