import { Injectable, Inject } from '@angular/core';

import type { CeramicApi } from '@ceramicnetwork/common'
import { IDX } from '@ceramicstudio/idx';
import type { DIDProvider } from 'dids'

import Authereum from 'authereum'
import Fortmatic from 'fortmatic'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/3id-provider'
import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect'

import { definitions } from '../../../config.json';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import { CeramicToken, IDXWrapper, IdxWrapperToken } from '../services/tokens';

import { BasicProfile } from '../models';

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7',
      },
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: 'pk_live_EC842EEAC7F08995',
      },
    },
    authereum: {
      package: Authereum,
      options: {},
    },
  },
})


@Injectable({
  providedIn: 'root'
})
export class IdxProviderService {

  constructor(@Inject(CeramicToken) private ceramic : CeramicApi,
              @Inject(IdxWrapperToken) private idxWrapper: IDXWrapper) {
  }

  threeIdConnect = new ThreeIdConnect();

  public authenticate(): Observable<string> {
    return from(this.authenticateDID()).pipe(
      map(id => id)
    )
  }

  // FIXME: Can't get this to resolve to DIDProvider
  async getProvider(): Promise<any> {
    const ethProvider = await web3Modal.connect()
    const addresses = await ethProvider.enable()
    await this.threeIdConnect.connect(new EthereumAuthProvider(ethProvider, addresses[0]))
    return this.threeIdConnect.getDidProvider()
  }

  async authenticateDID(): Promise<string> {
    const [provider] = await Promise.all([this.getProvider()])
    await this.ceramic.setDIDProvider(provider)

    const idx = new IDX({ ceramic: this.ceramic, aliases: definitions })
    //FIXME: place idx in injectortoken?
    this.idxWrapper.value = idx;
    return (this.idxWrapper.value.id)
  }

  updateProfile( name: string): Observable<string> {

    return from(this.idxWrapper.value.set('basicProfile', { name })).pipe(
      map((response) => response.toString())
    )
  }

  loadProfile(): Observable<BasicProfile> {
    console.log(this.idxWrapper.value.id);
    return from(this.idxWrapper.value.get('basicProfile', this.idxWrapper.value.id)).pipe(
      map((response) => response as BasicProfile)
    )
  }
}
