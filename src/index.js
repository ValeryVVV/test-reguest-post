import { fetchBreeds } from './js/api-cat';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.select.classList.add('hidden');
refs.loader.classList.add('hidden');
refs.error.classList.add('hidden');

fetchBreeds()
  .then(arr => {
    const markup = arr.map(
      ({ id, name }) => `<option value=${id}>${name}</option>`
    );
    refs.select.classList.toggle('hidden');
    refs.loader.classList.toggle('hidden');
    refs.select.innerHTML = markup;
    new SlimSelect({
      select: select,
    });
  })
  .catch(errorNotify);

function errorNotify() {
  refs.loader.classList.toggle('hidden');
  refs.error.classList.remove('hidden');
  return Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
