import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed, fetchCatByBreedId } from './cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

const breedSelectEl = new SlimSelect({
    select: '.breed-select',
    events: {
        beforeChange: newVal => {
            loaderEl.classList.replace('is-hidden', 'loader');
            catInfoEl.classList.add('is-hidden');

            const breedId = newVal[0].value;

            fetchCatByBreed(breedId)
                .then(data => {
                    loaderEl.classList.replace('loader', 'is-hidden');
                    const { url, id } = data[0];

                    fetchCatByBreedId(id)
                        .then(data => {
                            const { breeds } = data;
                            const { name, description, temperament } = breeds[0];

                            catInfoEl.innerHTML = `
                                <img src="${url}" alt="${name}" width="400">
                                <div class="box">
                                    <h2>${name}</h2>
                                    <p>${description}</p>
                                    <p><strong>Temperament:</strong>${temperament}</p>
                                </div>
                            `;
                            // Show cat info after setting the data
                            catInfoEl.classList.remove('is-hidden');
                        })
                        .catch(error => {
                            // Notify on error fetching breed by ID
                            Notify.failure(error.message);
                        });
                })
                .catch(error => {
                    // Notify on error fetching breed
                    Notify.failure(error.message);
                });
            // Hide cat info immediately after showing the loader
            catInfoEl.classList.add('is-hidden');
        },
    },
});

  

function selectBreed(data) {
breedSelectEl.disable();
  fetchBreeds(data).then(data => {
    loaderEl.classList.replace('loader', 'is-hidden');
    let optionMarkup = data.map(({ name, id }) => ({
      text: name,
      value: id,
    }));
    breedSelectEl.setData(optionMarkup);
    breedSelectEl.enable();
  })
  .catch(error => {
    Notify.failure('Error fetching breed:', error);
  });
}
selectBreed();

