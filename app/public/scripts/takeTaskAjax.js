'use strict';

const takeForms = $('.takeForm');
const takeModal = $('#takeConfirmModal');

takeForms.on('submit', (e) => {
    e.preventDefault();

    function resolve() {
        const url = '/ajax' + $(e.target).attr('action');
        
        const headers = {
            'csrf-token': $('[name="_csrf"]').val(),
        }
        const data = {
            'task_id': $(e.target).find('[name="task_id"]').val(),
        }

        console.log(url)

        $.ajax({
            url,
            method: 'POST',
            dataType: 'json',
            headers,
            data
        })
            .done(function (data) {
                location.assign('/tasks/view')
            })
            .fail(function (err) {
                $('.help-block').text(err)
            })

        takeModal.modal('hide');
    }

    function reject() {
        takeModal.modal('hide');
    }

    takeModal.modal('show');
    takeModal.find('.modal-ok').on('click', resolve);
    takeModal.find('.modal-cancel').on('click', reject);
});

