const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones)
}

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById('phone-container');
  phones.forEach(phone => {
    console.log(phone)
    
    const phoneCard = document.createElement('div');
    phoneCard.classList = "card w-96 bg-gray-100 shadow-xl  ";
    phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body w-full text-center text-black">
            <h2 class="text-3xl font-semibold">${phone.brand}</h2>
            <h3 class="text-2xl">${phone.phone_name}</h3>
            <p class="text-xl">${phone.slug}</p>
            <div class="card-actions justify-center">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
    `;
    phoneContainer.appendChild(phoneCard);

  })
}
loadData()