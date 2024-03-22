import { faker } from '@faker-js/faker';

import { RecordAttr } from './record.mts';
import { createJsonFile } from './create-json-file.mts';

type SurveyRecords = {
    records: SurveyRecord[];
}
type SurveyRecord = {
    attributes?: RecordAttr;
    Display_Name__c: string;
    Frequency__c: string;
    Start_Date__c: Date;
};


function createRecords() : SurveyRecords {
    return {
        records: Array.from({length: 10}, (_, i) => {
            return {
                attributes: {
                    type: 'Survey__c',
                    referenceId: `Survey__cRef${i}`
                },
                Display_Name__c: faker.lorem.sentence(),
                Frequency__c: faker.helpers.arrayElement<string>(['Daily', 'Weekly', 'Monthly', 'Yearly']),
                Start_Date__c: faker.date.recent()
            }
        })
    }
}

createJsonFile<SurveyRecords>(createRecords, 'Survey__c');


