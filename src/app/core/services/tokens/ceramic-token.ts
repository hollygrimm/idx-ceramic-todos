import { InjectionToken} from '@angular/core';
import type { CeramicApi } from '@ceramicnetwork/common'
import CeramicClient from '@ceramicnetwork/http-client';

export const CeramicToken = new InjectionToken<CeramicApi>(
    'Ceramic',
    {
        providedIn: 'root',
        factory: () => new CeramicClient('https://ceramic-clay.3boxlabs.com')
    }
);
