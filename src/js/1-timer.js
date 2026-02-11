import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

btnStart.addEventListener('click', onBtnClick);

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const today = new Date();
    if (selectedDate <= today) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        messageColor: 'rgba(255, 255, 255, 1)',
        iconUrl: '../img/icon-error.svg',
        messageSize: '16px',
        pauseOnHover: true,
      });

      btnStart.disabled = true;
      userSelectedDate = null;
      return;
    }
    btnStart.disabled = false;
    userSelectedDate = selectedDate;
  },
};

flatpickr(input, options);

function onBtnClick(event) {
  if (!userSelectedDate) return;

  btnStart.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const today = Date.now();
    const delta = userSelectedDate - today;

    if (delta <= 0) {
      clearInterval(timerId);
      updateTimer(convertMs(0));
      input.disabled = false;
      return;
    }

    updateTimer(convertMs(delta));
  }, 1000);
}

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

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
