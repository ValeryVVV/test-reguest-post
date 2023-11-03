import { fetchBreeds, fetchCatByBreed } from './js/api-cat';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.error.classList.add('hidden');
refs.select.classList.add('hidden');

refs.select.addEventListener('change', onChangeSelect);

fetchBreeds()
  .then(arr => {
    const markup = arr.map(
      ({ id, name }) => `<option value=${id}>${name}</option>`
    );
    refs.loader.classList.toggle('hidden');
    refs.select.classList.toggle('hidden');
    refs.select.innerHTML = markup;
  })
  .catch(errorNotify);

function onChangeSelect(evt) {
  refs.catInfo.innerHTML = '';
  const catId = evt.target.value;
  refs.loader.classList.toggle('hidden');
  refs.select.classList.toggle('hidden');
  refs.error.classList.add('hidden');

  refs.catInfo.classList.toggle('hidden');

  fetchCatByBreed(catId)
    .then(data => {
      const { name, temperament, description } = data.breeds[0];
      const markup = `
    <img src="${data.url}" alt="${name}" width="200" height="200"/>
    <div>
    <h1>${name}</h1>
    <p>${description}</p>
    <p>${temperament}</p>
    </div>`;
      refs.loader.classList.add('hidden');
      refs.select.classList.toggle('hidden');
      refs.catInfo.classList.toggle('hidden');
      refs.catInfo.innerHTML = markup;
    })
    .catch(errorNotify);
}

function errorNotify() {
  refs.loader.classList.toggle('hidden');
  refs.error.classList.remove('hidden');
  return Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
