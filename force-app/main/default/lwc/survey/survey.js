import { LightningElement } from 'lwc';
import tailwind from "@salesforce/resourceUrl/tailwind";
import { loadStyle } from 'lightning/platformResourceLoader';

export default class Survey extends LightningElement {
    async connectedCallback() {
        await loadStyle(this, tailwind);
    }
}
