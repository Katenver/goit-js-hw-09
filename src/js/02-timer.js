function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';
  import { Notify } from 'notiflix';
  
  const datePickerEl = document.querySelector('#datetime-picker');
  
  const startBtn = document.querySelector('[data-start]');
  const daysEl = document.querySelector('[data-days]');
  const hoursEl = document.querySelector('[data-hours]');
  const minutesEl = document.querySelector('[data-minutes]');
  const secodsEl = document.querySelector('[data-seconds]');
  startBtn.disabled = true;
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
      const chosenDate = Date.parse(selectedDates[0]);
      if (chosenDate <= Date.parse(new Date())) {
        Notify.failure(
          '❌ Please choose a date in the future',
          
        );
        return;
      }
  
      startBtn.disabled = false;
  
      startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        datePickerEl.disabled = true;
  
        timerId = setInterval(() => {
          let timerValues = convertMs(chosenDate - Date.parse(new Date()));
  
          secodsEl.textContent = addLeadingZero(timerValues.seconds);
          minutesEl.textContent = addLeadingZero(timerValues.minutes);
          hoursEl.textContent = addLeadingZero(timerValues.hours);
          daysEl.textContent = addLeadingZero(timerValues.days);
          // console.log(chosenDate - Date.parse(new Date()))
          if (chosenDate - Date.parse(new Date()) === 0) {
            clearInterval(timerId);
  
            Notify.success('✅ Refresh the page');
          }
        }, 1000);
      });
    },
  };
  
  const fp = flatpickr('#datetime-picker', options);