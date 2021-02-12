import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BasicProfile } from '../../models';
import * as fromRoot from '../../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  did$: Observable<string>;
  idxConnected$: Observable<boolean>;
  profile$: Observable<BasicProfile>;

  profileForm: FormGroup;
  nameFormControl = new FormControl('');

  constructor(private store$: Store<fromRoot.AppState>,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.did$ = this.store$.pipe(select(fromRoot.getDid));
    this.idxConnected$ = this.store$.pipe(select(fromRoot.getIdxConnected));
    this.profile$ = this.store$.pipe(select(fromRoot.getBasicProfile));

    this.profileForm = this.formBuilder.group({
      name: this.nameFormControl
    });

  }

  onConnect = () => this.store$.dispatch(fromRoot.IdxGatewayActions.idxConnect());

  loadProfile = () => this.store$.dispatch(fromRoot.IdxGatewayActions.idxLoadBasicProfile());

  updateProfile = () => {
    if (this.nameFormControl.value === null || this.nameFormControl.value.trim() === '') {
      return;
    }
    this.store$.dispatch(fromRoot.IdxGatewayActions.idxUpdateBasicProfile({name: this.nameFormControl.value}))
  };

}