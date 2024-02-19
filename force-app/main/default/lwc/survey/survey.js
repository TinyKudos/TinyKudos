import { LightningElement } from 'lwc';
import tailwind from '@salesforce/resourceUrl/tailwind';
import { classNames } from 'c/utils';
import { loadStyle } from 'lightning/platformResourceLoader';
import getSurvey from '@salesforce/apex/SurveyController.getSurvey';

export default class Survey extends LightningElement {
    currentSelectedButton = -1;

    async connectedCallback() {
        await loadStyle(this, tailwind);
        this.survey = await getSurvey({surveyId : 'a00Ek000009b1zFIAQ'});
        console.log(this.survey);
    }

    get options() {
        const generateOption = (voteOption) => {
            return {
                value: voteOption,
                style: classNames(
                    'relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset  focus:z-10',
                    { 'rounded-l-md': voteOption === 1 }, // Round left corner for first button
                    { 'rounded-r-md': voteOption === 10 }, // Round right corner for last button
                    { 'bg-white ring-gray-300 hover:bg-gray-50': this.currentSelectedButton !== voteOption },
                    { 'bg-dxp-brand ring-dxp-brand hover:bg-dxp-brand-1': this.currentSelectedButton === voteOption }
                )
            };
        };
        return Array.from({ length: 10 }, (_, index) => generateOption(index + 1));
    }

    onButtonClick(event) {
        this.currentSelectedButton = parseInt(event.target.dataset.number, 10);
    }
}
