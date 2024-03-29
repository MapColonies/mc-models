# mc-models

this project is used to serve json schemas for input validation and generate matching types to use in typescript projects.

**please note the node this was developed using node 12 and wont work with old versions of node.**

## package includes:

- generated typescript types for map colonies shared models
- json schema files for model validation

## package usage:

the package can be installed with `npm install @map-colonies/mc-model-types`.
the schemas for the validation are in the package, in order to use it for validation the schema files must be accessed directly.

## building the package:

run `npm install` to install project dependencies.

to create local package tgz file run `npm pack` after the build

## Schema structure

added schemas should be written according to the fallowing rule:

- \$ref to other files must be relative path.
- types will be generated only for files that ends with ".base.json".
- all schemas must be under tge "Schema" directory.
- in order to prevent duplicates types generation (this will cause code generation to fail) and allow easier modification the schemas should be split to multiple files:
  - ".base.json" file with properties definitions.
  - ".json" file for every variation of the model with \$ref to the base file and "required" definition.

template property type can be overridden in generated ts type by adding "tsType" attribute (for typescript types that are not valid in json schema)

for template example see Schema/LayerMetadata.

## testing the yaml schemas
all the yaml schemas can be validated by running ```npm run lint:openapi```

**note that due to the limitions of the linter configuration the lint will result in ```The field `paths` must be present on this level``` error for every schema file, any other error should be fixed**
