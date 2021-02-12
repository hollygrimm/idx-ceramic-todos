import { InjectionToken } from '@angular/core';
import { IDX } from '@ceramicstudio/idx';

export class IDXWrapper {

    private _value = null;

    get value(): IDX {
        return this._value;
    }

    set value(val: IDX) {
        this._value = val;
    }

}

export let IdxWrapperToken = new InjectionToken<IDXWrapper>(
    'IdxWrapper',
    {
        providedIn: 'root',
        factory: () => new IDXWrapper()
    }
);



