import { LightningElement } from 'lwc';
import tailwind from "@salesforce/resourceUrl/tailwind";
import { classNames } from "c/utils";
import { loadStyle } from 'lightning/platformResourceLoader';


export default class Survey extends LightningElement {
    
    currentSelectedButton = undefined;

    async connectedCallback() {
        await loadStyle(this, tailwind);
    }

    get numbers() {
        let arr =[];
        for (let i = 0; i <= 10 ; i++) {
            arr.push({
                value: i + 1,
                style: classNames(
                    'relative inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10',
                    { 'rounded-l-md': i === 0 },
                    { 'rounded-r-md': i === 10},
                    { 'bg-blue-400': currentSelectedButton === i+1}
                )
            })
        }
        return arr;
    }

    onButtonClick(event) {
        this.currentSelectedButton = event.target.dataset.number;
    }
}
