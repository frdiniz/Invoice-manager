/**
 * Created by hediniz on 7/7/17.
 */

function handleFile(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (function(file) {
        return function (e) {
            // read and render
            $('#content').load(e.target.result);
        };
    })(file);
    reader.readAsDataURL(file);

}

function handleInvoiceHtml(){
    const data = document.getElementsByClassName('rowNormal');

    let newTable = [];

    for (let row of data) {

        let transaction = [];
        let transactionData = [];

        for ( let currentChild of row.children ){
            transactionData.push(currentChild.innerText);
        }

        transaction.push(transactionData);
        newTable.push(transaction);
    }
    console.log(newTable);
}

function tableFilling(tableData) {
    console.log(tableData);
}

export { handleFile, handleInvoiceHtml };