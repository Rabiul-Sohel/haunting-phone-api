const loadData = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  console.log(phones.length);
  // show all button
  const showAllContainer = document.getElementById("show-all-container");
  showAllContainer.classList.add("hidden");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  }

  // clear phone container card before adding new
  phoneContainer.textContent = "";

  // console.log('is show all', isShowAll)
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card w-96 bg-gray-100 shadow-xl mt-4 px-2 pt-8 ";
    phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body w-full text-center text-black">
            <h2 class="text-3xl font-semibold">${phone.brand}</h2>
            <h3 class="text-2xl">${phone.phone_name}</h3>
            <p class="text-xl">${phone.slug}</p>
            <div class="card-actions justify-center">
              <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading Spiner
  toogleLoadingSpiner(false);
};

// show detail
const handleShowDetail = async (id) => {
  
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phonesDetail = data.data;
  showPhoneDetails(phonesDetail)
  // showSensor(phonesDetail)
  
  
};

// show sensor
/*const showSensor = (phonesDetail) => {
  const sensorArray = phonesDetail.mainFeatures.sensors;
  const sensors = sensorArray.toString()
  console.log(sensors)
  
}*/

// show phone details

const showPhoneDetails = (phonesDetail) => {
  console.log(phonesDetail.mainFeatures);
  show_details_modal.showModal();
  const showDetailModal = document.getElementById("show_details_modal");
  showDetailModal.innerHTML = `
  <div class="modal-box bg-white text-black text-sm w-96">
    <div class="bg-blue-200 p-2 rounded-md">
    <img class = "rounded-md h-36 mx-auto" src="${phonesDetail.image}"> 
    </div>
    <h3 id="phone-name" class="font-bold text-lg">Brand: ${phonesDetail.brand}</h3>
    <h4 ><span class="text-md font-bold">Model:</span> ${phonesDetail.name}</h4>
    <h5><span class="text-md font-bold" >Release: </span>${phonesDetail.releaseDate}</h5>
    <h5 class="text-xl font-bold">Main Features</h5>
    <p><span class="text-base font-semibold text-black">Storage:</span> ${phonesDetail.mainFeatures.storage}</p>
    <p><span class="text-base font-semibold text-black">Display:</span> ${phonesDetail.mainFeatures.displaySize}</p>
    <p><span class="text-base font-semibold text-black">Memory:</span> ${phonesDetail.mainFeatures.memory}</p>
    <p><span class="text-base font-semibold text-black">Chipset:</span> ${phonesDetail.mainFeatures.chipSet}</p>
    <p><span class="text-base font-semibold text-black">Sensors:</span> ${phonesDetail.mainFeatures.sensors}</p>
    
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-secondary">Close</button>
      </form>
    </div>
  </div>
  `;
  // showDetailModal.appendChild(detailContainer);
}

// display detail
// const displayDetail = (phonesDetail) => {
  
// }

// button handle
const handleSearch = (isShowAll) => {
  toogleLoadingSpiner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  const searchLower = searchText.toLowerCase();

  // searchField.value = '';
  loadData(searchLower, isShowAll);
};

const toogleLoadingSpiner = (isLoading) => {
  const loadingSpiner = document.getElementById("loading-spiner");
  if (isLoading) {
    loadingSpiner.classList.remove("hidden");
  } else {
    loadingSpiner.classList.add("hidden");
  }
};

// show all button

const showAll = () => {
  handleSearch(true);
};

// loadData()