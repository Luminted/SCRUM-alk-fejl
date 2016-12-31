'use strict';

const deleteFroms = $('.deleteForm');
const modal = $('#deleteConfirmModal');

deleteFroms.on('submit', (e) => {
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
            method: 'DELETE',
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

        modal.modal('hide');
    }

    function reject() {
        modal.modal('hide');
    }

    modal.modal('show');
    modal.find('.modal-ok').on('click', resolve);
    modal.find('.modal-cancel').on('click', reject);
});

