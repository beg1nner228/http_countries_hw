export default function renderData(countries) {
  return countries.map(country => {
      return `
        <li>
          <div class="item-wrapper">
            <div class="item-header">
              <img
                class="country-flag country-flag-small"
                src="${country.coatOfArms?.svg || country.flags?.svg}"
                alt="${country.flags?.alt || country.name.common}"
              />
              <h2 class="country-title">${country.name.common}</h2>
            </div>
            <div class="item-info list-view-info">
              <p class="item-info-row">
                <span>Capital:</span>
                <span class="info-value">${country.capital}</span>
              </p>
              <p class="item-info-row">
                <span>Population:</span>
                <span class="info-value">${country.population.toLocaleString("ru-RU")}</span>
              </p>
              <p class="item-info-row hidden-on-mobile">
                <span>Region:</span>
                <span class="info-value">${country.region}</span>
              </p>
              <p class="item-info-row hidden-on-mobile">
                <span>Languages:</span>
                <span class="info-value">${Object.values(country.languages).join(", ")}</span>
              </p>
            </div>
          </div>
        </li>
      `;
    })
    .join(" ");
}
