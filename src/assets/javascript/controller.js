/**
 * Created by hediniz on 7/7/17.
 */
import * as model from './model.es6';

// handle file
$('#invoice').change( (event) => {
    return model.handleFile(event);
});

// iCheck and Table controller
$('#read-html').click( () => {

    model.handleInvoiceHtml();
    // iCheck
    $(document).ready(function() {
        if ($("input.flat")[0]) {
            $(document).ready(function () {
                $('input.flat').iCheck({
                    checkboxClass: 'icheckbox_flat-blue',
                });
            });
        }
    });

    // Table
    let checkState = '';

    $('.bulk_action input').on('ifChecked', function () {
        checkState = '';
        $(this).parent().parent().parent().addClass('selected');
        model.countChecked(checkState);
    });
    $('.bulk_action input').on('ifUnchecked', function () {
        checkState = '';
        $(this).parent().parent().parent().removeClass('selected');
        model.countChecked(checkState);
    });
    $('.bulk_action input#check-all').on('ifChecked', function () {
        checkState = 'all';
        model.countChecked(checkState);
    });
    $('.bulk_action input#check-all').on('ifUnchecked', function () {
        checkState = 'none';
        model.countChecked(checkState);
    });

    // Download button action
    $('#download').click( () => {
        model.dataToCSV();
    });
});