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

    // <button class="selected">Январь</button>
    // <button>Февраль</button>
    // <button>Март</button>

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
                calendar.push({
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    weekDay: (date.getDay() + 6) % 7,
                    disabled: date < today,
                    isToday: (date <= today) && (today <= date),
                });

                date.setDate(date.getDate() + 1)
            }
        }
        return calendar;
    }

    for(let monthIndex = 0; monthIndex < 3; monthIndex += 1) {
       const monthName = monthNames[(today.getMonth() + monthIndex) % 12];
       let button = document.createElement('button');
       button.innerText = monthName;
       if(monthIndex === 0) {
        button.classList.add('selected');
       }
       monthsField.appendChild(button)
    }

    let currentMonthIndex = 0;
    let calendar = makeCalendar(currentMonthIndex);
    const calendarBody = document.querySelector(".calendar__body");
    let row = [];
    for(let day of calendar) {
        let classNames = day.disabled ? ["disabled"] : [];
        if(day.isToday) {
            classNames.push('selected');
        }
        className = classNames.join(' ');
        if ((day.year == today.getFullYear()) && (day.year == today.getFullYear()) && (day.year == today.getFullYear()))
        row.push(`<td><div class='${className}'>${day.day}</div></td>`);

        if(day.weekDay == 6) {
            const rowHtml = '<tr>' + row.join('') + '</tr>';
            console.log(rowHtml)
            calendarBody.innerHTML += rowHtml;
            row = [];
        }
    }

   

    // $.datetimepicker.setLocale('ru');
    // $('#dateTime').datetimepicker({
    //     minDate: new Date(),
    //     allowTimes: [
    //         '12:00', '13:00', '15:00', 
    //         '17:00', '17:30', '19:00', '20:00'
    //     ]
    // });
});