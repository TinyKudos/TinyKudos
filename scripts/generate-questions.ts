import { faker } from '@faker-js/faker';

import { RecordAttr } from './record.ts';
import { createJsonFile } from './create-json-file.ts';

type QuestionRecords = {
    records: QuestionRecord[];
}
type QuestionRecord = {
    attributes?: RecordAttr;
    Survey__c: string;
    Title__c: string;
};

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

createJsonFile<QuestionRecords>(createRecords, 'Question__c');
