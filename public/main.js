$(document).ready(() => {
    $('#input').on('keyup', e => {
        if (e.keyCode === 13) {
            $('#send').trigger('click');
        }
    });
    $('#send').on('click', e => {




        if (true) {
            let msg = $('#input').val();
            if (msg.trim() === '') {
                return false;
            }
            $.post('/send', {
                msg: msg
            }, res => {
                get_log();

                // console.log('전송~~~', msg);
            });
            $('#input').val('');
        }
    });
    let last_id = -1;
    function get_log() {
        console.log(last_id);
        $.get('/log?last=' + last_id, res => {
            let log = document.querySelector('#log');
            let scroll = log.scrollHeight === $(log).outerHeight() + log.scrollTop;
            // $(log).html('');
            if (res.length) {
                last_id = res[res.length - 1].id;
            }
            res.forEach(row => {
                $('<div />').appendTo(log).html(row.msg);
            });
            let document_height = log.scrollHeight;
            if (scroll) {
                log.scroll(0, document_height);
            }

        });
    }

    setInterval(() => {
        get_log();
    }, 500);
})