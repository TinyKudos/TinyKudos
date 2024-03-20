import { faker } from '@faker-js/faker';


import fs from 'fs';

import path from 'path';

type QuestionRecords = {
    records: QuestionRecord[];
}
type QuestionRecord = {
    attributes?: RecordAttr;
    Survey__c: string;
    Title__c: string;
};

type RecordAttr = {
    type: string;
    referenceId: string;
}

function createRecords() : QuestionRecords {
    return {
        records: Array.from({length: 10}, (_, i) => {
            return {
                attributes: {
                    type: 'Question__c',
                    referenceId: `Question__cRef${i}`
                },
                Survey__c: '@Survey__cRef1',
                Title__c: faker.lorem.sentence()
            }
        })
    }
}

const nodeRoot = process.cwd();
const output = createRecords();
const outputDir = path.join(__dirname, 'data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
fs.writeFileSync(path.join(nodeRoot, 'data', 'Question__c.json'), JSON.stringify(output, null, 2));

