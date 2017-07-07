/**
 * Created by hediniz on 7/7/17.
 */

function handleFile(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (function(file) {
        return function (e) {
            const span = document.createElement('span');
            span.innerHTML = ['<iframe class="hide" src="',
                e.target.result,
                '"/>'].join('');
            document.getElementById('invoice').insertBefore(span, null);
        };
    })(file);
    reader.readAsDataURL(file);
}

export { handleFile };