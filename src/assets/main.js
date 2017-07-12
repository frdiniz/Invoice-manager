/**
 * Created by hediniz on 7/7/17.
 */
import * as core from './core.es6';

$('#invoice').change( (event) => {
    return core.handleFile(event);
});

$('#read-html').click( () => {

    core.handleInvoiceHtml();
    // iCheck
    $(document).ready(function() {
        if ($("input.flat")[0]) {
            $(document).ready(function () {
                $('input.flat').iCheck({
                    checkboxClass: 'icheckbox_flat-green'
                });
            });
        }
    });

    // Table
    let checkState = '';

    $('.bulk_action input').on('ifChecked', function () {
        checkState = '';
        $(this).parent().parent().parent().addClass('selected');
        core.countChecked(checkState);
    });
    $('.bulk_action input').on('ifUnchecked', function () {
        checkState = '';
        $(this).parent().parent().parent().removeClass('selected');
        core.countChecked(checkState);
    });
    $('.bulk_action input#check-all').on('ifChecked', function () {
        checkState = 'all';
        core.countChecked(checkState);
    });
    $('.bulk_action input#check-all').on('ifUnchecked', function () {
        checkState = 'none';
        core.countChecked(checkState);
    });

    $('#download').click( () => {
        core.dataToCSV();
    });
});