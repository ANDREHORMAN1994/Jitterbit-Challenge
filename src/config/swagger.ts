import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const openApiPath = path.resolve(process.cwd(), 'docs/openapi.yaml');
const openApiContents = readFileSync(openApiPath, 'utf8');

export const swaggerDocument = parse(openApiContents);
