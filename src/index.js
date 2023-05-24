import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import { createBreedInfoMarkup } from './js/create-breed-info-markup.js';

const slimSelect = new SlimSelect({
  select: '.breed-select',
  settings: { placeholder: true, text: 'placeholder text' },
  events: {
    afterChange: onSelected,
  },
});

const refs = {
  breedSelectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

refs.errorEl.classList.add('is-hidden');
refs.loaderEl.classList.remove('show');

function initUI() {
  refs.loaderEl.classList.add('show');

  fetchBreeds()
    .then(res => {
      const breedList = res.data.map(item => {
        return { id: item.id, text: item.name };
      });

      breedList.unshift({
        placeholder: true,
        value: 'none',
        text: 'make your selection',
      });

      slimSelect.setData(breedList);
      refs.breedSelectEl.innerHTML = breedList;
    })
    .catch(err => {
      console.log(err);
      errorShow();
    })
    .finally(() => refs.loaderEl.classList.remove('show'));
}

function onSelected(val) {
  refs.catInfoEl.classList.add('is-hidden');
  refs.catInfoEl.innerHTML = '';

  const { id, value } = val[0];

  if (value === 'none') {
    return;
  }

  refs.loaderEl.classList.add('show');
  const fetchImg = fetchCatByBreed(id);
  const fetchInfo = fetchBreeds(id);

  Promise.all([fetchImg, fetchInfo])
    .then(value => {
      refs.catInfoEl.innerHTML = createBreedInfoMarkup(value);
    })
    .catch(err => {
      console.log(err);
      errorShow();
    })
    .finally(() => {
      refs.loaderEl.classList.remove('show');
      refs.catInfoEl.classList.remove('is-hidden');
    });
}

function errorShow() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

window.onload = () => {
  initUI();
};
