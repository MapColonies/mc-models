# mc-models

this project is used to serve json schemas for input validation and generate matching types to use in typescript projects.

**please note the node this was developed using node 12 and wont work with old versions of node.**

## included items:

- docker file for creating image of static http server with schemas.
- mc-model package with framework independent schema validator and typescript type definitions for project modules.
- mc-nest-schema-validator package with schema validation module for nest and decorators to update generated swagger to use schemas.

## usage:

### schema server

- to run the schema server local on port 80 run the following command:
  ```
  npm run dockerLocal
  ```
- to remove local docker container:
  ```
  npm run dockerRemove
  ```

### mc-models

step to build:

1. run `yarn install` at repository root folder
2. run `npm run generate` at repository root folder
3. run `npm run build` at "mcModelsPackage" folder

to create local package tgz file run `npm pack` after the build

## Schema structure

added schemas should be written according to the fallowing rule:

- \$ref to other file should include full url. the domain of this service is 'mc-models'.
- types will be generated only for files that ends with ".base.json".
- all schemas must be under tge "Schema" directory.
- in order to prevent duplicates types generation (this will cause code generation to fail) and allow easier modification the schemas should be split to multiple files:
  - ".base.json" file with properties definitions.
  - ".json" file for every variation of the model with \$ref to the base file and "required" definition.

template property type can be overridden in generated ts type by adding "tsType" attribute (for typescript types that are not valid in json schema)

for template example see Schema/ImageMetadata.
