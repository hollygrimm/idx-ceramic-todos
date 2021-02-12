import { createReducer, on } from '@ngrx/store';
import { IdxGatewayActions } from '../actions';
import { BasicProfile } from '../../models';

export const idxGatewayFeatureKey = 'idxGateway';

export interface IdxGatewayState {
  idxConnected: boolean;
  did: string;
  basicProfile: BasicProfile;
}

const initialState: IdxGatewayState = {
  idxConnected: false,
  did: null,
  basicProfile: null,
};

export const reducer = createReducer(
  initialState,
  on(IdxGatewayActions.idxConnectSuccess, (state, { did }) => ({
    ...state,
    idxConnected: true,
    did: did
  })),
  on(IdxGatewayActions.idxLoadBasicProfileSuccess, (state, { basicProfile }) => ({
    ...state,
    basicProfile: basicProfile,
  })),  
);

export const getIdxConnected = (state: IdxGatewayState) => state.idxConnected;
export const getDid = (state: IdxGatewayState) => state.did;
export const getBasicProfile = (state: IdxGatewayState) => state.basicProfile;
