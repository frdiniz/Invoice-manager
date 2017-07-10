/**
 * Created by hediniz on 7/7/17.
 */

function handleFile(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (function(file) {
        return function (e) {
            // read and render
            $('#insert-html').load(e.target.result);
        };
    })(file);
    reader.readAsDataURL(file);
}

function handleInvoiceHtml(){

    const html = $('.box-expansivel').html();
    
    $('#insert-extraction').append(html);
    $( '#insert-html' ).remove();

    const data = document.getElementsByClassName('rowNormal');

    let newTable = [];

    for ( let row of data ) {

        let transaction = [];
        let transactionData = [];

        for ( let currentChild of row.children ){
            transactionData.push(currentChild.innerText);
        }

        transaction.push(transactionData);
        newTable.push(transaction);
    }
    tableFilling(newTable);
}

function tableFilling(tableData) {

    $('#insert-table').append( () => {
        return `<table class='table table-striped jambo_table bulk_action'>
             <thead>
                <tr class='headings'>
                <th>
                    <input type='checkbox' id='check-all' class='flat'>
                </th>
                <th class='column-title'>Date </th>
                <th class='column-title'>Transaction </th>
                <th class='column-title'>US$ </th>
                <th class='column-title last'>R$ </th>
                <th class='bulk-actions' colspan='7'>
                    <a class='antoo' style='color:#fff; font-weight:500;'>Bulk Actions ( <span class='action-cnt'> </span> ) <i class='fa fa-chevron-down'></i></a>
                </th>
                </tr>
            </thead>
            <tbody id='insert-row'>
    
            </tbody>
        </table>`;
    });

    for ( let row of tableData ) {

        $('#insert-row').append( () => {
            return  `<tr class=' ' >
                        <td class='a-center '> <input type='checkbox' class='flat' name='table_records'> </td>
                        <td class=''> ${row[0][0]} </td>
                        <td class=''> ${row[0][1]} </td>
                        <td class=''> ${row[0][2]} </td>
                        <td class=''> ${row[0][3]} </td>
                    </tr>`;
           }
        );
    }
}

export { handleFile, handleInvoiceHtml };