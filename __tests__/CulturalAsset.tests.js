import CulturalAsset from '../src/models/CulturalAsset';

it('is not special if label is empty', () => {
  const data = {label: ''};
  const asset = new CulturalAsset(data);
  expect(asset.isSpecial()).toBe(false);
});

it('is special if label is not empty', () => {
  const data = {label: 'label'};
  const asset = new CulturalAsset(data);
  expect(asset.isSpecial()).toBe(true);
});
