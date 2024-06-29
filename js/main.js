let elCountryList = document.querySelector(".countries-list");
let elCountrySelect = document.querySelector(".countries_select");
let elSearch = document.querySelector(".search_input");
let elLikeCount = document.querySelector(".like_count")
let elSaveCount = document.querySelector(".save_count")
let elLikeBtn = document.querySelector(".like_btn")
let elSaveBtn = document.querySelector(".save_btn")
let elModeBtn = document.querySelector(".dark_mode")

function renderCountries(arr, list) {
  list.innerHTML = "";
  arr.forEach((value) => {
    let elItem = document.createElement("li");
    let elImg = document.createElement("img");
    let elId = document.createElement("span");
    let elName = document.createElement("h2");
    let elCapital = document.createElement("p");
    let elPopulation = document.createElement("p");

    let elIconsWrapper = document.createElement("div");
    let elLikeBtn = document.createElement("button");
    let elSaveBtn = document.createElement("button");
    let elMoreBtn = document.createElement("button");

    elItem.className = "w-[350px] hover:scale-105 cursor-pointer duration-300 p-2 bg-slate-400 rounded-[10px]";
    elLikeBtn.className = "p-2 rounded-[50%] block";
    elIconsWrapper.className = "flex items-center pr-3 gap-7";

    elImg.src = value.flag;
    elImg.width = "100%";
    elImg.height = "200px";
    elImg.className = "w-[100%] h-[200px] rounded-[10px]";

    elName.textContent = value.name;
    elName.className = "text-[19px]";
    elCapital.textContent = "Capital : " + value.capital;
    elPopulation.textContent = "Population : " + value.population;
    elId.textContent = value.id;

    elLikeBtn.innerHTML = `<svg id=${value.id} width="25px" height="25px" viewBox="0 0 24 24" fill=${value.isLike == true ? "red" : "white"} xmlns="http://www.w3.org/2000/svg">
    <path id=${value.id} fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`
    elLikeBtn.id = value.id

    elSaveBtn.innerHTML = `<svg id=${value.id} width="35px" height="30px" viewBox="0 0 24 24" fill=${value.isSaved == true ? "green" : "white"} xmlns="http://www.w3.org/2000/svg">
    <path id=${value.id} fill-rule="evenodd" clip-rule="evenodd" d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z" />
    </svg>`
    elSaveBtn.id = value.id

    elMoreBtn.innerHTML = `<svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path fill="#000000" fill-rule="evenodd" d="M3 8a2 2 0 100 4 2 2 0 000-4zm5 2a2 2 0 114 0 2 2 0 01-4 0zm7 0a2 2 0 114 0 2 2 0 01-4 0z"/>
</svg>`
    elIconsWrapper.append(elLikeBtn, elSaveBtn, elMoreBtn);
    elItem.append(elImg, elId, elName, elCapital, elPopulation, elIconsWrapper);
    list.append(elItem);

    elLikeBtn.addEventListener("click", (evt) => {
      let findObj = countrys.find(item => item.id == evt.target.id);
      findObj.isLike = !findObj.isLike
      renderCountries(countrys, elCountryList)
      elLikeCount.textContent = countrys.filter(item => item.isLike).length
    })

    elSaveBtn.addEventListener("click", (evt) => {
      let findObj = countrys.find(item => item.id == evt.target.id);
      findObj.isSaved = !findObj.isSaved
      renderCountries(countrys, elCountryList)
      elSaveCount.textContent = countrys.filter(item => item.isSaved).length
    })
  });
}
renderCountries(countrys, elCountryList);

countrys.forEach((value) => {
  let elOption = document.createElement("option");
  elOption.innerHTML = `${value.name}`;
  elOption.setAttribute("value", value.name);
  elCountrySelect.append(elOption);
});

elCountrySelect.addEventListener("change", (evt) => {
  if (evt.target.value == "All") {
    renderCountries(countrys, elCountryList);
  } 
  else {
    const selectedList = countrys.filter(item => item.name == evt.target.value);
    renderCountries(selectedList, elCountryList);
  }
});


  elSearch.addEventListener("keyup", (evt) => {
    const searchValue = evt.target.value;
    if (Number(searchValue)) {
      const searchList = countrys.filter(item => String(item.population).includes(searchValue.trim()));
      renderCountries(searchList, elCountryList);
    }
    else {
      const searchList = countrys.filter(item => item.name.toLowerCase().includes(searchValue.trim().toLowerCase()));
      renderCountries(searchList, elCountryList);
    }
  })


elLikeBtn.addEventListener("click", () => {
  const likeList = countrys.filter(item => item.isLike == true)
  renderCountries(likeList,elCountryList)
})


elSaveBtn.addEventListener("click", () => {
  const saveList = countrys.filter(item => item.isSaved == true)
  renderCountries(saveList,elCountryList)
})

elModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("mode")
})