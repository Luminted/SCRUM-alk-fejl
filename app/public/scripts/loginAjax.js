'use strict';

$(document).ready(function () {
    const modal = $('#loginConfirmModal');
    const loginLink = $('#loginLink')
    const errorBox = modal.find('.alert')
    errorBox.text('Wrong email of password').hide()

    loginLink.on('click', (e) => {
        e.preventDefault();

        function resolve() {
            const email = $('#modalUsername').val();
            const password = $('#modalPassword').val();
            const url = '/ajax/login';
            const data = {
                email,
                password
            }
            const headers = {
                'csrf-token': $('[name="_csrf"]').val(),
            }

            $.ajax({
                url,
                method: 'POST',
                dataType: 'json',
                headers,
                data
            }).done(function (json) {
                if (json.success) {
                    location.assign('/');
                } else {
                    errorBox.show();
                    modal.modal('show');
                }
            })
        }

        function reject() {
            modal.modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }

        modal.modal('show');
        modal.find('.modal-ok').on('click', resolve);
        modal.find('.modal-cancel').on('click', reject);
    });
});