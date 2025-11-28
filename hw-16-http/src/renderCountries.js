export default function renderCountries(data){ 
     return data.map((country) => {
          return ` 
        <li>
           <div class="item-header">
             <h2 class="country-title">${country.name.common}</h2>
           </div>
      </li>`;
    }).join("");
}