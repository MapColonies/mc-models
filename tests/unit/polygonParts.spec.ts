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
});
