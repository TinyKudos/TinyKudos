import { LightningElement } from 'lwc';
import tailwind from "@salesforce/resourceUrl/tailwind";
import { loadStyle } from 'lightning/platformResourceLoader';

export default class Survey extends LightningElement {
    async connectedCallback() {
        await loadStyle(this, tailwind);
    }

    get numbers() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
}
