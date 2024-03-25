import fs from 'fs';

import path from 'path';

export function createJsonFile<T>(createRecords: () => T, fileName: string) {
    const nodeRoot = process.cwd();
    const output = createRecords();
    const outputDir = path.join(__dirname, 'data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    fs.writeFileSync(path.join(nodeRoot, 'data', `${fileName}.json`), JSON.stringify(output, null, 2));
}