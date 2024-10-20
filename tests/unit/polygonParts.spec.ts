import { IPropPYCSWMapping, PolygonPartRecord, getGraphQLClassMapping } from '../../src/models';

describe('PolygonParts class static methods', () => {
  it('getPyCSWMappings(): HAS NOT mapped to PYCSW', () => {
    const pycswMappings: IPropPYCSWMapping[] = PolygonPartRecord.getPyCSWMappings();

    expect(pycswMappings).toEqual([]);
  });

  it('getGraphQLClassMapping(): class HAS graphQL mapped fields', () => {
    const ppGQLMappings = getGraphQLClassMapping().find((obj) => obj.name === 'PolygonPartRecord');

    expect(ppGQLMappings?.fields.length).toBeGreaterThan(0);
  });

  it('getWFSMappings(): class property members HAS WFS mapped fields', () => {
    const ppWFSMappings = PolygonPartRecord.getWFSMappings();

    expect(ppWFSMappings?.length).toBeGreaterThan(0);
  });

  it('getORMCatalogEntityMappings(): class HAS ORM entity mapping', () => {
    const ppORMEntityMapping = new PolygonPartRecord().getORMCatalogEntityMappings();

    expect(ppORMEntityMapping).toBeDefined();
  });

  it('getORMCatalogMappings(): class property members HAS ORM mapped fields', () => {
    const ppORMEntityFieldsMapping = new PolygonPartRecord().getORMCatalogMappings();

    expect(ppORMEntityFieldsMapping?.length).toBeGreaterThan(0);
  });
});
