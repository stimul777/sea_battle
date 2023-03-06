import { setSort } from '../sort';

describe('setSort', () => {
  test('sort', () => {
    {
      expect(setSort(['b2', 'b10', 'b3'])).toEqual(['b2', 'b3', 'b10']);
    }
  });
});
