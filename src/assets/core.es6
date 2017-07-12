/**
 * Created by hediniz on 7/7/17.
 */
const DATE = 1;
const DESCRIPTION = 2;
const REAL_VALUE = 3;


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

    $('#init-input').remove();
    $('#input-container').append( ()=> {
        return `<a onclick='location.reload()'>Nova fatura</a>`;
    });
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
                <th class='column-title'>DATA </th>
                <th class='column-title'>TRANSAÇÃO </th>
                <th class='column-title last'>R$ </th>
                <th class='bulk-actions' colspan='7'>
                    <a class='antoo' style='color:#fff; font-weight:500;'>Total: R$ <span class='total-cnt'> </span>  ( <span class='action-cnt'> </span> ) <i class='fa fa-chevron-down'></i></a>
                </th>
                </tr>
            </thead>
            <tbody id='insert-row'>
    
            </tbody>
        </table>
        <button id='download'>Download CSV</button>`;
    });

    for ( let row of tableData ) {

        $('#insert-row').append( () => {
            return  `<tr class=' ' >
                        <td class='a-center '> <input type='checkbox' class='flat' name='table_records'> </td>
                        <td class=''> ${row[0][0]} </td>
                        <td class=''> ${row[0][1]} </td>
                        <td class=''> ${row[0][3]} </td>
                    </tr>`;
           }
        );
    }
}

function countChecked(checkState) {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    const checkCount = $(".bulk_action input[name='table_records']:checked").length;
    let totalCount = 0;

    for ( let i = 0; i <= checkCount-1 ; i++ ) {
        let dat = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[REAL_VALUE].innerText;
        totalCount += parseFloat( dat.replace(',','.') ,10 );
    }

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.total-cnt').html(totalCount);
        $('.action-cnt').html(`${checkCount} Transações selecionadas`);
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}

function dataToCSV() {

    const checkCount = $(".bulk_action input[name='table_records']:checked").length;

    let csv = 'Date,Description,Amount\r\n';

    let date = '';
    let description = '';
    let amount = 0;

    for ( let i = 0; i <= checkCount-1 ; i++ ) {
        date = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[DATE].innerText;
        description = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[DESCRIPTION].innerText;
        amount = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[REAL_VALUE].innerText;

        date += `/2017`;
        amount = parseFloat(amount.replace(',','.') ,10);
        // fix \r\n on es6 string template
        csv += '\r\n'+`"${date}","${description}","${amount}",`;

    }
    console.log(csv);
    // get Date
    const now = new Date();
    // Generate a file name
    const fileName = `Invoice ${now.getDay()}-${now.getMonth()}-${now.getFullYear()}`;

    // Initialize file format
    const uri = 'data:text/csv;charset=utf-8,' + escape(csv);

    // generate a temp <a /> tag
    const link = document.createElement('a');
    link.href = uri;

    // set hidden
    link.style = 'visibility:hidden';
    link.download = `${fileName}.csv`;

    // append the anchor tag and remove automatic
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export { handleFile, handleInvoiceHtml, countChecked, dataToCSV };