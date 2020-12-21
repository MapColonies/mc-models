const json2ts = require('json-schema-to-typescript');
const path = require('path');
const fs = require('fs');
const serviceName = 'mc-models';

const SchemaFolders = ['./Schema'];
const SkipFolders = ['Schema/geojson'];
const OutputFolder = './generatedTypes';
const ServiceUrl = `http://${serviceName}`;
const KeepFolderStructure = false;
const geoJsonDirectory = './schema/geojson/';

const index = ['//this is auto generated file to import all types'];

const getOutputFileName = (fullPath) => {
  let fileName = path.basename(fullPath, path.extname(fullPath)) + '.ts';
  if (KeepFolderStructure) {
    fileName = path.join(path.dirname(fullPath), fileName);
  }
  return fileName;
};

const getDestinationFile = (fullPath) => {
  let fileName = getOutputFileName(fullPath);
  return path.join(OutputFolder, fileName);
};

const getUrl = (fullPath) => {
  const relativePath = path
    .normalize(path.relative(process.cwd(), fullPath))
    .replace(/\\/g, '/');
  if (relativePath.charAt(0) == '.') {
    return ServiceUrl + relativePath.slice(1);
  } else {
    return ServiceUrl + '/' + relativePath;
  }
};

const regex = new RegExp(`^${ServiceUrl}/`, 'i');
const resolver = {
  order: 1,
  canRead: regex,
  read(file) {
    const path = file.url.replace(ServiceUrl, '.');
    return new Promise((resolve, reject) => {
      if (path.toLowerCase().startsWith(geoJsonDirectory)) {
        return resolve('{}');
      }
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};

const ensureDirectoryExistence = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const compileAndMap = async (fullPath) => {
  if (!fullPath.endsWith('.base.json')) {
    return Promise.resolve();
  }
  const schema = JSON.parse(fs.readFileSync(fullPath));
  return new Promise((resolve, reject) => {
    json2ts
      .compile(schema, schema.$id, {
        $refOptions: { resolve: { mcResolver: resolver } },
      })
      .then((ts) => {
        const destPath = getDestinationFile(fullPath);
        ensureDirectoryExistence(destPath);
        fs.writeFileSync(destPath, ts);
        index.push(
          `export * from './${path.basename(
            fullPath,
            path.extname(fullPath)
          )}';`
        );
        resolve();
      });
  });
};

const compileNested = async (folder) => {
  if (SkipFolders.includes(folder)) {
    return;
  }
  const files = fs.readdirSync(folder, { withFileTypes: true });
  for (let i = 0; i < files.length; i++) {
    const fullPath = path.join(folder, files[i].name);
    if (files[i].isFile()) {
      await compileAndMap(fullPath);
    } else if (files[i].isDirectory()) {
      await compileNested(fullPath);
    }
  }
};

const main = async () => {
  for (let i = 0; i < SchemaFolders.length; i++) {
    await compileNested(SchemaFolders[i]);
  }
  fs.writeFileSync(`${OutputFolder}/index.ts`, index.join('\n'));
};

main();
