function init () {
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

    const monthsField = document.querySelector('.calendar__month')
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    function makeCalendar(monthIndex) {
        const firstDayOfMonth = new Date(today.getFullYear() + Math.floor((today.getMonth() + monthIndex) / 12), (today.getMonth() + monthIndex) % 12, 1);
        const dayShift = (firstDayOfMonth.getDay() - 1 + 7) % 7;
        const firstDayOfCalendar = new Date(firstDayOfMonth);
        firstDayOfCalendar.setDate(1 - dayShift)

        let calendar = [];
        let date = new Date(firstDayOfCalendar);
        for(let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
            for(let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
                const weekDay = (date.getDay() + 6) % 7;
                calendar.push({
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    weekDay: weekDay,
                    disabled: date < today,
                    isToday: (date <= today) && (today <= date),
                });
                date.setDate(date.getDate() + 1)
            }
        }
        return calendar;
    }

    function fillMonthName() {
        for(let monthIndex = 0; monthIndex < 3; monthIndex += 1) {
            const monthName = monthNames[(today.getMonth() + monthIndex) % 12];
            let button = document.createElement('button');
            button.innerText = monthName;
            button.dataset.monthIndex = monthIndex;
            if(monthIndex === 0) {
                button.classList.add('selected');
            }
            monthsField.appendChild(button)
        }
    }

    function fillCalendar(currentMonthIndex) {
        let calendar = makeCalendar(currentMonthIndex);
        const calendarBody = document.querySelector(".calendar__body");
        calendarBody.innerHTML = '';
        let row = [];
        for(let day of calendar) {
            let classNames = day.disabled ? ["disabled"] : [];
            if(day.isToday) {
                classNames.push('selected');
            }
            let className = classNames.join(' ');
            row.push(`<td><div class='${className}' data-year='${day.year}' data-month='${day.month}' data-day='${day.day}'>${day.day}</div></td>`);

            if(day.weekDay == 6) {
                const rowHtml = '<tr>' + row.join('') + '</tr>';
                calendarBody.innerHTML += rowHtml;
                row = [];
            }
        }
    }

    function obtaineTimeSlots(year, month, day) {
        //ToDo: request
        return [
            {time: '17:00', occupied: false},
            {time: '17:30', occupied: true},
            {time: '18:00', occupied: false},
            {time: '18:15', occupied: false},
            {time: '17:30', occupied: false},
            {time: '17:45', occupied: false},
        ]
    }

    function fillTimeSlots(year, month, day) {
        const timeSlots = obtaineTimeSlots(year, month, day);
        const timeSelector = document.querySelector('.calendar__time');
        timeSelector.innerHTML = '';
        for (let slot of timeSlots) {
            const btn = document.createElement('button');
            btn.textContent = slot.time;
            btn.dataset.time = slot.time;
            if(slot.occupied) {
                btn.classList.add('occupied')
            }
            timeSelector.appendChild(btn)
        }
    }

    fillMonthName();
    fillCalendar(0);
    fillTimeSlots(today.getFullYear(), today.getMonth() + 1, today.getDay());

    const btnMonths = document.querySelectorAll('.calendar__month button');
    let activeButton = document.querySelector('.calendar__month button.selected')
    btnMonths.forEach(btnMonth => btnMonth.addEventListener('click', function() {
        if (activeButton) {
            activeButton.classList.remove('selected');
        }
        btnMonth.classList.add('selected');
        activeButton = btnMonth;
        fillCalendar(Number(btnMonth.dataset.monthIndex));
    }));

    let selectedDay = String(today.getDate()).padStart(2, 0),
        selectedMonth = String(today.getMonth() + 1).padStart(2, 0),
        selectedYear = today.getFullYear();

    const calendarBody = document.querySelector('.calendar__day');
    const dataField = document.getElementById('dateTime');
    calendarBody.addEventListener('click', (event) => {
        let cell = event.target.closest('div');
        if (!cell || !cell.closest('.calendar__day')) return;
        if (cell.classList.contains('disabled')) return;
        let buttonDays = calendarBody.querySelectorAll('div');
        buttonDays.forEach(buttonDay => buttonDay.classList.remove('selected'));
        cell.classList.add('selected');
        selectedDay = (cell.dataset.day).padStart(2, 0)
        selectedMonth = (cell.dataset.month).padStart(2, 0)
        selectedYear = cell.dataset.year

        const numberDay = Number(selectedDay)
        const numberMonth = Number(selectedMonth)
        const numberYear = Number(selectedYear)

        const selectedData = `${selectedDay}.${selectedMonth}.${selectedYear}`;
        dataField.value = selectedData;
        fillTimeSlots(numberYear, numberMonth, numberDay);
    });

    const timeSelector = document.querySelector('.calendar__time');
    timeSelector.addEventListener('click', (event) => {
        let button = event.target.closest('button');
        if (!button || !button.closest('.calendar__time')) return;
        let buttonsTime = timeSelector.querySelectorAll('button');
        buttonsTime.forEach(buttonTime => buttonTime.classList.remove('selected'));
        button.classList.add('selected');
        const selectedData = `${selectedDay}.${selectedMonth}.${selectedYear}`;
        const selectedTime = button.dataset.time;
        dataField.value = `${selectedData}, ${selectedTime}`;
    })

    const calendar = document.getElementById('calendar');
    const calendarClose = document.querySelector('.calendar__close');
    dataField.addEventListener('click', () => {
        calendar.classList.add('open');
    })

    calendarClose.addEventListener('click', () => {
        calendar.classList.remove('open');
    })
};

init();