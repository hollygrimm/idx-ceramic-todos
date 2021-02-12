import * as fromIdxGateway from './idx-gateway.actions';

describe('loadIdxGateways', () => {
  it('should return an action', () => {
    expect(fromIdxGateway.loadIdxGateways().type).toBe('[IdxGateway] Load IdxGateways');
  });
});
