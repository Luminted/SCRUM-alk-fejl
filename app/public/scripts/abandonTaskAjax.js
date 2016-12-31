'use strict';

const abandonForms = $('.abandonForm');
const abandonModal = $('#abandonConfirmModal');

abandonForms.on('submit', (e) => {
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
                location.assign('/tasks/userTasks')
            })
            .fail(function (err) {
                $('.help-block').text(err)
            })

        abandonModal.modal('hide');
    }

    function reject() {
        abandonModal.modal('hide');
    }

    abandonModal.modal('show');
    abandonModal.find('.modal-ok').on('click', resolve);
    abandonModal.find('.modal-cancel').on('click', reject);
});

