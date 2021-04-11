import { LayerMetadata, IPYCSWMapping, IShpMapping, IPropPYCSWMapping, IPropSHPMapping } from '../../src/models';
import { ICatalogDBMapping } from '../../src/models/layerMetadata/decorators/catalogDB.decorator';

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
    expect(pycswMappings[0]).toHaveProperty('profile');
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

  it('getCatalogDbMapping(): mapped to DATABASE prop', () => {
    const PROPERTY_NAME = 'geometry';
    const catalogDBMapping: ICatalogDBMapping | undefined = LayerMetadata.getCatalogDBMapping(PROPERTY_NAME);

    expect(catalogDBMapping).toHaveProperty('table');
    expect(catalogDBMapping).toHaveProperty('column');
  });

  it('getCatalogDbMappings(): HAS props mapped to DATABASE', () => {
    const catalogDBMappings: ICatalogDBMapping[] = LayerMetadata.getCatalogDBMappings();

    expect(catalogDBMappings.length).toBeGreaterThan(0);
    expect(catalogDBMappings[0]).toHaveProperty('prop');
    expect(catalogDBMappings[0]).toHaveProperty('table');
    expect(catalogDBMappings[0]).toHaveProperty('column');
  });

  it('getCatalogDbMapping(): NOT mapped to DATABASE prop', () => {
    const PROPERTY_NAME = 'dummy_geometry';
    const catalogDBMapping: ICatalogDBMapping | undefined = LayerMetadata.getCatalogDBMapping(PROPERTY_NAME);

    expect(catalogDBMapping).toBeUndefined();
  });

  it('getCatalogDbMapping(): mapped to DATABASE column props', () => {
    const PROPERTY_NAME = 'geometry';
    const catalogDBMapping: ICatalogDBMapping | undefined = LayerMetadata.getCatalogDBMapping(PROPERTY_NAME);
    const columnProps = catalogDBMapping?.column;
    expect(catalogDBMapping).toHaveProperty('column');
    expect(columnProps).toHaveProperty('name');
    expect(columnProps).toHaveProperty('type');
    expect(columnProps).toHaveProperty('nullable');
  });
});
