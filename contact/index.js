$(function() {
    const minus = document.getElementById('numMinus');
    const plus = document.getElementById('numPlus');
    const inputField = document.getElementById('numGuests');
    let currentGuests = Number(inputField.value) || 1;

    plus.addEventListener('click', () => {
        if(currentGuests < 9) {
            currentGuests += 1
            inputField.value = currentGuests;
        }
    });

    minus.addEventListener('click', () => {
        if(currentGuests > 1) {
            currentGuests -= 1
            inputField.value = currentGuests;
        }
    });

    $.datetimepicker.setLocale('ru');
    $('#dateTime').datetimepicker({
        minDate: new Date(),
        allowTimes: [
            '12:00', '13:00', '15:00', 
            '17:00', '17:30', '19:00', '20:00'
        ]
    });
});