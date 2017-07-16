/**
 * Created by hediniz on 7/7/17.
 */

// Values to index arrays
const DATE = 1;
const DESCRIPTION = 2;
const REAL_VALUE = 3;

/**
 * Upload, read and insert html file
 * @param event - document event for file capture
 */
function handleFile(event) {
    // file uploaded
    const file = event.target.files[0];
    // init File Reader
    const reader = new FileReader();
    // method onload for insert file on defined ID
    reader.onload = (function(file) {
        return function (e) {
            // read and render
            $('#insert-html').load(e.target.result);
        };
    })(file);
    reader.readAsDataURL(file);
}
/**
 * Get loaded html data, structure information and call function to render the data fetched
 */
function handleInvoiceHtml(){
    // extract only important data
    const html = $('.box-expansivel').html();
    // insert important data
    $('#insert-extraction').append(html);
    // remove extra data
    $( '#insert-html' ).remove();
    // get array data
    const data = document.getElementsByClassName('rowNormal');

    let newTable = [];
    // New table structure data
    for ( let row of data ) {

        let transaction = [];
        let transactionData = [];

        for ( let currentChild of row.children ){
            transactionData.push(currentChild.innerText);
        }

        transaction.push(transactionData);
        newTable.push(transaction);
    }
    // disable upload input
    $('.buttonText').closest('label').attr('disabled','true');
    $('#read-html').attr('disabled','disabled');
    // show menu and table
    $('#char').removeClass('hide');
    // add link for new invoice
    $('#menu').append( ()=> {
        return `<a onclick='location.reload()'>Nova fatura</a>`;
    });
    // call the render function
    tableFilling(newTable);
}
/**
 * Renders new table for selection
 * @param tableData - data obtained from file
 */
function tableFilling(tableData) {
    // insert table
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
        <button id='download' class='btn btn-primary'>Download .CSV</button>`;
    });

    for ( let row of tableData ) {
        // inserts table rows
        $('#insert-row').append( () => {
            return  `<tr class=' ' >
                        <td class='a-center '> <input type='checkbox' class='flat' name='table_records'> </td>
                        <td class=''> ${row[0][DATE-1]} </td>
                        <td class=''> ${row[0][DESCRIPTION-1]} </td>
                        <td class=''> ${row[0][REAL_VALUE]} </td>
                    </tr>`;
           }
        );
    }
}
/**
 * Count checkboxes selected
 * @param checkState
 */
function countChecked(checkState) {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }
    // Number of item selected
    const checkCount = $(".bulk_action input[name='table_records']:checked").length;
    let totalCount = 0;

    // loop for totalCount
    for ( let i = 0; i <= checkCount-1 ; i++ ) {
        let dat = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[REAL_VALUE].innerText;
        // Total of selected items in real
        totalCount += parseFloat( dat.replace(',','.') ,10 );
    }
    // Class manipulation
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
/**
 * Exports selected items to a .csv file
 */
function dataToCSV() {

    // Number of item selected
    const checkCount = $(".bulk_action input[name='table_records']:checked").length;

    // get current Date
    const now = new Date();
    // fields title
    let csv = 'Date,Description,Amount\r\n';
    // fields values
    let date = '';
    let description = '';
    let amount = 0;

    // loop to compose CSV body
    for ( let i = 0; i <= checkCount-1 ; i++ ) {
        // Get item data
        date = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[DATE].innerText;
        description = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[DESCRIPTION].innerText;
        amount = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[REAL_VALUE].innerText;

        // insert year
        date += `/${now.getFullYear()}`;
        // convert amount
        amount = parseFloat(amount.replace(',','.') ,10);

        // insert current row { fix \r\n on es6 string template }
        csv += '\r\n'+`"${date}","${description}","${amount}",`;

    }

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