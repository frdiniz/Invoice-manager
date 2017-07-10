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
        countChecked();
    });
    $('.bulk_action input').on('ifUnchecked', function () {
        checkState = '';
        $(this).parent().parent().parent().removeClass('selected');
        countChecked();
    });
    $('.bulk_action input#check-all').on('ifChecked', function () {
        checkState = 'all';
        countChecked();
    });
    $('.bulk_action input#check-all').on('ifUnchecked', function () {
        checkState = 'none';
        countChecked();
    });

    function countChecked() {
        if (checkState === 'all') {
            $(".bulk_action input[name='table_records']").iCheck('check');
        }
        if (checkState === 'none') {
            $(".bulk_action input[name='table_records']").iCheck('uncheck');
        }

        let checkCount = $(".bulk_action input[name='table_records']:checked").length;
        let totalCount = 0;

        for ( let i = 0; i <= checkCount-1 ; i++) {
            let dat = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[3].innerText;
            totalCount += parseFloat( dat.replace(',','.') ,10 );
        }

        if (checkCount) {
            $('.column-title').hide();
            $('.bulk-actions').show();
            $('.total-cnt').html(totalCount);
            $('.action-cnt').html(checkCount + ' Transações selecionadas');
        } else {
            $('.column-title').show();
            $('.bulk-actions').hide();
        }
    }
});

