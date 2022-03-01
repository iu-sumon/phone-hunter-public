const parent1 = document.getElementById("parent-1");
const parent2 = document.getElementById('parent-2');
const searchField = () => {
    const searchField = document.getElementById('input-field');
    const searchFieldText = searchField.value;
    searchField.value = '';

    document.getElementById('spinner').style.display = 'block';
    parent1.textContent = '';
    parent2.textContent = '';

    if (searchFieldText == '') {
        document.getElementById('error-message').innerText = 'You did not provide input! please provide valid input.';
        parent1.textContent = '';
        parent2.textContent = '';
    }
     else if (Number.isInteger(parseInt(searchFieldText))) {
        document.getElementById('error-message').innerText = 'Do not allow number type value! please provide valid input.';
        parent1.textContent = '';
        parent2.textContent = '';
    }

    else {

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`

        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data))

    }

}
const displayPhone = phones => {

    if (phones.length == 0) {
        document.getElementById('error-message').innerText = 'No Phone Found! Please check your input and try again.';
    }

    else {

        document.getElementById('error-message').innerText = '';
        const deviceLimit = phones.slice(0, 20);
        deviceLimit.forEach(phone => {
            //  console.log(phone);
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                 <img src="${phone.image}" class="card-photo" alt="">
      <div class="card-body">
                 <h3>${phone.phone_name}</h5>
                  <h4>${phone.brand}</h4>
                <button onclick="singlePhoneDetails('${phone.slug}')" type="button" id="details-btn" class="btn btn-info fs-6">Details</button>
       </div>
       `
            parent1.appendChild(div);
        })

        document.getElementById('spinner').style.display = 'none';
    }
}



































const singlePhoneDetails = id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySinglePhoneDetails(data.data))
}

//const releaseDateValue='not found'

const displaySinglePhoneDetails = phone => {
    parent2.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `
           <div class="row p-5">
                  <div class="col-md-4 p-5">
                      <img src="${phone.image}" alt="">
                  </div>
    
                <div class="col-md-8 bg-dark text-white rounded shadow-lg">
                        <h3>Name: ${phone.name}</h3>
                        <h5>ReleaseDate: ${phone.releaseDate ? phone.releaseDate : `Not Found! Coming soon.`}</h5>
                        <h5>Brand: ${phone.brand}</h5>
                        <h5>DisplaySize: ${phone.mainFeatures.displaySize}</h5>
                        <h5>Storage: ${phone.mainFeatures.storage}</h5>
                        <h5>ChipSet: ${phone.mainFeatures.chipSet}</h5>
                        <h5>Memory: ${phone.mainFeatures.memory}</h5>
                        <h5>Sensors: ${phone.mainFeatures.sensors.slice()}</h5>
                        <p>WLAN: ${phone.others.WLAN}</p>
                        <P>Bluetooth: ${phone.others.Bluetooth}</P>
                        <P>GPS: ${phone.others.GPS}</P>
                        <P>NFC: ${phone.others.NFC}</P>
                        <P>Radio: ${phone.others.Radio}</P>
                        <p>USB: ${phone.others.USB}</p>
                </div>
         </div>
    `
    parent2.appendChild(div);
}


