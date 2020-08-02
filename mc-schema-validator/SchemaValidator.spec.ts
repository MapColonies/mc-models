import mockAxios from 'jest-mock-axios';
import { SchemaValidator, ValidationStatus } from './SchemaValidator';

let validator: SchemaValidator;
const SchemaUrl = 'http://localhost/testSchema.json';
const testSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'testSchema',
  type: 'object',
  title: 'test Schema',
  required: ['required'],
  additionalProperties: true,
  properties: {
    required: {
      $id: '#/properties/required',
      type: 'string'
    },
    optional: {
      $id: '#/properties/optional',
      type: 'string'
    }
  }
};
const validItems = [
  {
    required: 'required value',
    optional: 'optional value'
  },
  {
    required: 'required value'
  },
  {
    required: 'required value',
    optional: 'optional value',
    additionalValue: 'value'
  }
];
const invalidItems = [
  {
    optional: 'optional value'
  },
  {}
];

beforeEach(() => {
  validator = new SchemaValidator();
});

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

it('load validator cache validator', async () => {
  validator = new SchemaValidator(false);

  const loading = validator.LoadValidator(SchemaUrl);
  mockAxiosResponse();
  await loading;
  const res = await validator.validate(SchemaUrl, validItems[0]);

  expect(res.status).toBe(ValidationStatus.valid);
});

it('validator wont load schema when autoLoad is false', async () => {
  validator = new SchemaValidator(false);
  const validation = validator.validate(SchemaUrl, validItems[0]);
  expect(mockAxios.get).toBeCalledTimes(0);
  const res = await validation;
  expect(res.status).toBe(ValidationStatus.missingValidator);
});

it('valid object returns valid validation response', async () => {
  let cached = false;
  for (let i = 0; i < validItems.length; i++) {
    const res = await callValidator(validItems[i], cached);
    cached = true;
    expect(res.status).toBe(ValidationStatus.valid);
  }
});

it('invalid object returns invalid validation response', async () => {
  let cached = false;
  for (let i = 0; i < invalidItems.length; i++) {
    const res = await callValidator(invalidItems[i], cached);
    cached = true;
    expect(res.status).toBe(ValidationStatus.invalid);
  }
});

async function callValidator(data: unknown, isCached: boolean = false) {
  const validation = validator.validate(SchemaUrl, data);
  if (!isCached) mockAxiosResponse();
  const res = await validation;
  return res;
}

function mockAxiosResponse() {
  expect(mockAxios.get).toHaveBeenCalledWith(SchemaUrl);
  mockAxios.mockResponse({ data: testSchema });
}
