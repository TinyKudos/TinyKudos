import { LightningElement } from 'lwc';
import tailwind from '@salesforce/resourceUrl/tailwind';
import { classNames } from 'c/utils';
import { loadStyle } from 'lightning/platformResourceLoader';


export default class Survey extends LightningElement {
    currentSelectedButton = -1;

    async connectedCallback() {
        await loadStyle(this, tailwind);
    }

    get options() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            const value = i + 1;
            arr.push({
                value: value,
                style: classNames(
                    'relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10',
                    { 'rounded-l-md': i === 0 },
                    { 'rounded-r-md': i === 9 },
                    { 'bg-white': this.currentSelectedButton !== value },
                    { 'bg-dxp-brand': this.currentSelectedButton === value }
                )
            });
        }
        return arr;
    }

    onButtonClick(event) {
        this.currentSelectedButton = parseInt(event.target.dataset.number, 10);
    }
}
