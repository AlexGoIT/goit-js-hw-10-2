export function createBreedInfoMarkup(data) {
  const breedImgURL = data[0].data[0].url;
  const breedName = data[1].data.name;
  const breedDesc = data[1].data.description;
  const breedTemp = data[1].data.temperament;

  return `
  <img src="${breedImgURL}" alt="${breedName}" width="240" />  
  <div class="descript-wrap">
    <h2>${breedName}</h2>
    <p><span class="descript">Description: </span>${breedDesc}</p>
    <p><span class="descript">Temperament: </span>${breedTemp}</p>
  </div>
  `;
}
