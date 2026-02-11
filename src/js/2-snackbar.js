import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconError from '../img/icon-error.svg';
import iconSuccess from '../img/icon-check.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const dataForm = Object.fromEntries(new FormData(form));
  const delay = Number(dataForm.delay);
  const state = dataForm.state;

  createPromise(state, delay).then(onResolve).catch(onReject);
  form.reset();
}

function createPromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function onResolve(delay) {
  iziToast.success({
    title: 'OK',
    message: `✅ Fulfilled promise in ${delay}ms`,
    backgroundColor: '#59a10d',
    position: 'topRight',
    messageColor: '#fff',
    titleColor: '#fff',
    iconUrl: iconSuccess,
  });
}
function onReject(delay) {
  iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`,
    backgroundColor: '#ef4040',
    position: 'topRight',
    messageColor: '#fff',
    titleColor: '#fff',
    iconUrl: iconError,
  });
}
