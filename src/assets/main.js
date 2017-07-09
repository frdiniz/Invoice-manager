/**
 * Created by hediniz on 7/7/17.
 */
import * as core from './core.es6';

// const ele = document.getElementById;
let inputElement = document.getElementById("invoice");
inputElement.addEventListener('change', core.handleFile, false);

$('#read-html').click( () => {
    return core.handleInvoiceHtml();
    }
);
