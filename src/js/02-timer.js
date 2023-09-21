import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import convertMs from './dateConvert';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const inputCalendar = document.querySelector('input#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const SECOND_DELAY = 1000;

let selectedDate = 0;
let currentDate = 0;
let timerId = 0;
startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0].getTime() < Date.now()) {
        Notify.failure('Choose a date in the future')
      } else {
        startBtn.disabled = false;
        selectedDate = selectedDates[0].getTime();
      }
    },
  };
const fp = flatpickr(inputCalendar, options);

const counter = {
    start() {
        timerId = setInterval(() => {
            startBtn.disabled = true;
            inputCalendar.disabled = true;
            currentDate = Date.now();
            const delta = selectedDate - currentDate;
            convertMs(delta);
            updateInterfaceTimer(convertMs(delta));
            if (delta <= 1000) {
              this.stop();
              Notify.info('Time is over');
            }
        }, SECOND_DELAY);
    }, 
    stop() {
        clearInterval(timerId);
        startBtn.disabled = true;
        inputCalendar.disabled = false;
        return;
    },
}
startBtn.addEventListener("click", onStart);
function onStart () {
    counter.start()
}

function updateInterfaceTimer ({ days, hours, minutes, seconds }) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }