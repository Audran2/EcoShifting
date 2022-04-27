$(function () {
    $('#submit').click(function () {
        const startAddress = $('#input-start').val();
        const endAddress = $('#input-end').val();
        const vehicle = $('#input-vehicle').val();

        if (startAddress === '' || endAddress === '' || vehicle === '') {
            alert('Please fill in all fields');
            return
        }
        alert('Your request has been submitted');

    });
})