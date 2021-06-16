import { LayerMetadata, IPYCSWMapping, IShpMapping, IPropPYCSWMapping, IPropSHPMapping, Pycsw3DCatalogRecord } from '../../src/models';
import { ICatalogDBMapping } from '../../src/models/layerMetadata/decorators/property/catalogDB.decorator';
import { PycswLayerCatalogRecord } from '../../src/models/layerMetadata/pycswLayerCatalogRecord';

describe('LayerMetadata class static methods', () => {
  it('getPyCSWMapping(): mapped to PYCSW prop', () => {
    const PROPERTY_NAME = 'type';
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
    const PROPERTY_NAME = 'footprint';
    const shpMapping: IShpMapping | undefined = LayerMetadata.getShpMapping(PROPERTY_NAME);

    expect(shpMapping).toHaveProperty('shpFile');
    expect(shpMapping).toHaveProperty('valuePath');
  });

  it('getShpMapping(): NOT mapped to SHAPE prop', () => {
    const PROPERTY_NAME = 'dummy_footprint';
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
    expect(shpMappings[0]).toHaveProperty('mappingType');
  });

  it('getCatalogDbMapping(): mapped to DATABASE prop', () => {
    const PROPERTY_NAME = 'footprint';
    const catalogDBMapping: ICatalogDBMapping | undefined = LayerMetadata.getCatalogDBMapping(PROPERTY_NAME);

    expect(catalogDBMapping).toHaveProperty('column');
  });

  it('getCatalogDbMappings(): HAS props mapped to DATABASE', () => {
    const catalogDBMappings: ICatalogDBMapping[] = LayerMetadata.getCatalogDBMappings();

    expect(catalogDBMappings.length).toBeGreaterThan(0);
    expect(catalogDBMappings[0]).toHaveProperty('prop');
    expect(catalogDBMappings[0]).toHaveProperty('column');
    expect(catalogDBMappings[0]).toHaveProperty('mappingType');
  });

  it('getCatalogDbMapping(): NOT mapped to DATABASE prop', () => {
    const PROPERTY_NAME = 'dummy_footprint';
    const catalogDBMapping: ICatalogDBMapping | undefined = LayerMetadata.getCatalogDBMapping(PROPERTY_NAME);

    expect(catalogDBMapping).toBeUndefined();
  });

  it('getCatalogDbMapping(): mapped to DATABASE column props', () => {
    const PROPERTY_NAME = 'footprint';
    const catalogDBMapping: ICatalogDBMapping | undefined = LayerMetadata.getCatalogDBMapping(PROPERTY_NAME);
    const columnProps = catalogDBMapping?.column;

    expect(catalogDBMapping).toHaveProperty('column');
    expect(columnProps).toHaveProperty('name');
    expect(columnProps).toHaveProperty('type');
    expect(columnProps).toHaveProperty('nullable');
  });
});

describe('PycswLayerCatalogRecord class methods', () => {
  it('getPyCSWMappings(): mapped to PYCSW props', () => {
    const pycswMapping = PycswLayerCatalogRecord.getPyCSWMappings();

    expect(pycswMapping.length).toBeGreaterThan(0);
    expect(pycswMapping[0]).toHaveProperty('prop');
    expect(pycswMapping[0]).toHaveProperty('xmlElement');
  });

  it('getORMCatalogDbMappings(): HAS props mapped to DATABASE with ORM props', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ormCatalogDBMappings: ICatalogDBMapping[] = new PycswLayerCatalogRecord().getORMCatalogMappings();

    expect(ormCatalogDBMappings.length).toBeGreaterThan(0);
    expect(ormCatalogDBMappings[0]).toHaveProperty('prop');
    expect(ormCatalogDBMappings[0]).toHaveProperty('column');
    expect(ormCatalogDBMappings[0]).toHaveProperty('mappingType');
  });

  it('getFieldConfigs(): field configs are defined', () => {
    const fieldConfigs = PycswLayerCatalogRecord.getFieldConfigs();

    expect(fieldConfigs.length).toBeGreaterThan(0);
    expect(fieldConfigs[0]).toHaveProperty('prop');
    expect(fieldConfigs[0]).toHaveProperty('category');
  });
});

describe('Pycsw3DCatalogRecord class methods', () => {
  it('getPyCSWMappings(): mapped to PYCSW props', () => {
    const pycswMapping = Pycsw3DCatalogRecord.getPyCSWMappings();

    expect(pycswMapping.length).toBeGreaterThan(0);
    expect(pycswMapping[0]).toHaveProperty('prop');
    expect(pycswMapping[0]).toHaveProperty('xmlElement');
  });

  it('getFieldConfigs(): field configs are defined', () => {
    const fieldConfigs = Pycsw3DCatalogRecord.getFieldConfigs();

    expect(fieldConfigs.length).toBeGreaterThan(0);
    expect(fieldConfigs[0]).toHaveProperty('prop');
    expect(fieldConfigs[0]).toHaveProperty('category');
  });
});
