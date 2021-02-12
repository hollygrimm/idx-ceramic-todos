import { IdxGatewayEffects } from './idx-gateway.effects';
import { ErrorEffects } from './error.effects';
import { SnackBarEffects } from './snack-bar.effects';
import { SpinnerEffects } from './spinner.effects';

export const effects: any[] = [
    IdxGatewayEffects,
    ErrorEffects,
    SnackBarEffects,
    SpinnerEffects
];

export * from './idx-gateway.effects';
export * from './error.effects';
export * from './snack-bar.effects';
export * from './spinner.effects';
