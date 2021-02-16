import { LayerMetadata, IPYCSWMapping, IShpMapping, IPropPYCSWMapping, IPropSHPMapping } from '../../src/models';

describe('LayerMetadata class static methods', () => {
  it('getPyCSWMapping(): mapped to PYCSW prop', () => {
    const PROPERTY_NAME = 'geometry';
    const pycswMapping: IPYCSWMapping | undefined = LayerMetadata.getPyCSWMapping(PROPERTY_NAME);

    expect(pycswMapping).toHaveProperty('xmlElement');
    expect(pycswMapping).toHaveProperty('queryableField');
  });

  it('getPyCSWMapping(): NOT mapped to PYCSW prop', () => {
    const PROPERTY_NAME = 'dummy_geometry';
    const pycswMapping: IPYCSWMapping | undefined = LayerMetadata.getPyCSWMapping(PROPERTY_NAME);

    expect(pycswMapping).toBeUndefined();
  });

  it('getShpMapping(): mapped to SHAPE prop', () => {
    const PROPERTY_NAME = 'geometry';
    const shpMapping: IShpMapping | undefined = LayerMetadata.getShpMapping(PROPERTY_NAME);

    expect(shpMapping).toHaveProperty('shpFile');
    expect(shpMapping).toHaveProperty('valuePath');
  });

  it('getShpMapping(): NOT mapped to SHAPE prop', () => {
    const PROPERTY_NAME = 'dummy_geometry';
    const shpMapping: IShpMapping | undefined = LayerMetadata.getShpMapping(PROPERTY_NAME);

    expect(shpMapping).toBeUndefined();
  });

  it('getPyCSWMappings(): HAS props mapped to PYCSW', () => {
    const pycswMappings: IPropPYCSWMapping[] = LayerMetadata.getPyCSWMappings();

    expect(pycswMappings.length).toBeGreaterThan(0);
    expect(pycswMappings[0]).toHaveProperty('prop');
    expect(pycswMappings[0]).toHaveProperty('xmlElement');
    expect(pycswMappings[0]).toHaveProperty('queryableField');
  });

  it('getShpMappings(): HAS props mapped to SHAPE', () => {
    const shpMappings: IPropSHPMapping[] = LayerMetadata.getShpMappings();

    expect(shpMappings.length).toBeGreaterThan(0);
    expect(shpMappings[0]).toHaveProperty('prop');
    expect(shpMappings[0]).toHaveProperty('shpFile');
    expect(shpMappings[0]).toHaveProperty('valuePath');
  });
});
