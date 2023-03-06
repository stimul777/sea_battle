import { onValidations } from '../validation';

describe('onValidations TEST', () => {
  let data = {
    sector: '',
    selectedMainSector: '',
    directionShip: 'vertical',
  };

  test('onValidations', () => {
    {
      expect(onValidations(data.sector, data.selectedMainSector, 'vertical')).toEqual(['b2', 'b3', 'b10']);
    }
  });
});
