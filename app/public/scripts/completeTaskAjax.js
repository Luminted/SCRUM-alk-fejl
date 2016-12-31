'use strict';

const completeForms = $('.completeForm');
const completeModal = $('#completeConfirmModal');

completeForms.on('submit', (e) => {
    e.preventDefault();

    function resolve() {
        const url = '/ajax' + $(e.target).attr('action');
        const headers = {
            'csrf-token': $('[name="_csrf"]').val(),
        }
        const data = {
            'task_id': $(e.target).find('[name="task_id"]').val(),
        }

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

        completeModal.modal('hide');
    }

    function reject() {
        completeModal.modal('hide');
    }

    completeModal.modal('show');
    completeModal.find('.modal-ok').on('click', resolve);
    completeModal.find('.modal-cancel').on('click', reject);
});

