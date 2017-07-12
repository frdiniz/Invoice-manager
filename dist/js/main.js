/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _model = __webpack_require__(1);

var model = _interopRequireWildcard(_model);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// handle file
$('#invoice').change(function (event) {
    return model.handleFile(event);
});

// iCheck and Table controller
/**
 * Created by hediniz on 7/7/17.
 */
$('#read-html').click(function () {

    model.handleInvoiceHtml();
    // iCheck
    $(document).ready(function () {
        if ($("input.flat")[0]) {
            $(document).ready(function () {
                $('input.flat').iCheck({
                    checkboxClass: 'icheckbox_flat-green'
                });
            });
        }
    });

    // Table
    var checkState = '';

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
    $('#download').click(function () {
        model.dataToCSV();
    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hediniz on 7/7/17.
 */

// Values to index arrays
var DATE = 1;
var DESCRIPTION = 2;
var REAL_VALUE = 3;

/**
 * Upload, read and insert html file
 * @param event - document event for file capture
 */
function handleFile(event) {
    // file uploaded
    var file = event.target.files[0];
    // init File Reader
    var reader = new FileReader();
    // method onload for insert file on defined ID
    reader.onload = function (file) {
        return function (e) {
            // read and render
            $('#insert-html').load(e.target.result);
        };
    }(file);
    reader.readAsDataURL(file);
}
/**
 * Get loaded html data, structure information and call function to render the data fetched
 */
function handleInvoiceHtml() {
    // extract only important data
    var html = $('.box-expansivel').html();
    // insert important data
    $('#insert-extraction').append(html);
    // remove extra data
    $('#insert-html').remove();
    // get array data
    var data = document.getElementsByClassName('rowNormal');

    var newTable = [];
    // New table structure data
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var row = _step.value;


            var transaction = [];
            var transactionData = [];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = row.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var currentChild = _step2.value;

                    transactionData.push(currentChild.innerText);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            transaction.push(transactionData);
            newTable.push(transaction);
        }
        // remove upload input
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    $('#init-input').remove();
    // add link for new invoice
    $('#input-container').append(function () {
        return '<a onclick=\'location.reload()\'>Nova fatura</a>';
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
    $('#insert-table').append(function () {
        return '<table class=\'table table-striped jambo_table bulk_action\'>\n             <thead>\n                <tr class=\'headings\'>\n                <th>\n                    <input type=\'checkbox\' id=\'check-all\' class=\'flat\'>\n                </th>\n                <th class=\'column-title\'>DATA </th>\n                <th class=\'column-title\'>TRANSA\xC7\xC3O </th>\n                <th class=\'column-title last\'>R$ </th>\n                <th class=\'bulk-actions\' colspan=\'7\'>\n                    <a class=\'antoo\' style=\'color:#fff; font-weight:500;\'>Total: R$ <span class=\'total-cnt\'> </span>  ( <span class=\'action-cnt\'> </span> ) <i class=\'fa fa-chevron-down\'></i></a>\n                </th>\n                </tr>\n            </thead>\n            <tbody id=\'insert-row\'>\n    \n            </tbody>\n        </table>\n        <button id=\'download\'>Download CSV</button>';
    });

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        var _loop = function _loop() {
            var row = _step3.value;

            // inserts table rows
            $('#insert-row').append(function () {
                return '<tr class=\' \' >\n                        <td class=\'a-center \'> <input type=\'checkbox\' class=\'flat\' name=\'table_records\'> </td>\n                        <td class=\'\'> ' + row[0][DATE - 1] + ' </td>\n                        <td class=\'\'> ' + row[0][DESCRIPTION - 1] + ' </td>\n                        <td class=\'\'> ' + row[0][REAL_VALUE] + ' </td>\n                    </tr>';
            });
        };

        for (var _iterator3 = tableData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop();
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
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
    var checkCount = $(".bulk_action input[name='table_records']:checked").length;
    var totalCount = 0;

    // loop for totalCount
    for (var i = 0; i <= checkCount - 1; i++) {
        var dat = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[REAL_VALUE].innerText;
        // Total of selected items in real
        totalCount += parseFloat(dat.replace(',', '.'), 10);
    }
    // Class manipulation
    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.total-cnt').html(totalCount);
        $('.action-cnt').html(checkCount + ' Transa\xE7\xF5es selecionadas');
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
    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    // get current Date
    var now = new Date();
    // fields title
    var csv = 'Date,Description,Amount\r\n';
    // fields values
    var date = '';
    var description = '';
    var amount = 0;

    // loop to compose CSV body
    for (var i = 0; i <= checkCount - 1; i++) {
        // Get item data
        date = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[DATE].innerText;
        description = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[DESCRIPTION].innerText;
        amount = $(".bulk_action input[name='table_records']:checked")[i].closest("tr").children[REAL_VALUE].innerText;

        // insert year
        date += '/' + now.getFullYear();
        // convert amount
        amount = parseFloat(amount.replace(',', '.'), 10);

        // insert current row { fix \r\n on es6 string template }
        csv += '\r\n' + ('"' + date + '","' + description + '","' + amount + '",');
    }

    // Generate a file name
    var fileName = 'Invoice ' + now.getDay() + '-' + now.getMonth() + '-' + now.getFullYear();

    // Initialize file format
    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);

    // generate a temp <a /> tag
    var link = document.createElement('a');
    link.href = uri;

    // set hidden
    link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    // append the anchor tag and remove automatic
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

exports.handleFile = handleFile;
exports.handleInvoiceHtml = handleInvoiceHtml;
exports.countChecked = countChecked;
exports.dataToCSV = dataToCSV;

/***/ })
/******/ ]);