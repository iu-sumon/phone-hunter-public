const parent1 = document.getElementById("parent-1");
const parent2 = document.getElementById('parent-2');


//----------------Search Field Code Start Here------------- --\\

const searchField = () => {
    const searchField = document.getElementById('input-field');
    const searchFieldText = searchField.value;
    searchField.value = '';

    document.getElementById('spinner').style.display = 'block';
    parent1.textContent = '';
    parent2.textContent = '';

    //Checked Search value Is Empty  or Number code Start here\\

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

    //Checked Search value Is Empty  or Number code End here\\
}

//----------------Search Field Code End Here------------- --\\



//----------------Search Result Code start Here-----------\\

const displayPhone = phones => {

    //Checked Search value Is array element  or not code Start here\\
    if (phones.length == 0) {
        document.getElementById('error-message').innerText = 'No Phone Found! Please check your input and try again.';
    }
    else {
        document.getElementById('error-message').innerText = '';
        const deviceLimit = phones.slice(0, 20);
        deviceLimit.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
          <img src="${phone.image}" class="card-photo" alt="">
          <div class="card-body">
             <h3>${phone.phone_name}</h5>
             <h4>${phone.brand}</h4>
             <button onclick="singlePhoneDetails('${phone.slug}')" type="button" id="details-btn" class="btn btn-primary fs-6 fw-bold">Details</button>
          </div>
       `
            parent1.appendChild(div);
        })
        document.getElementById('spinner').style.display = 'none';
    }
    //Checked Search value Is array element  or not code End here\\
}

//----------------Search Result Code End Here-----------\\



//----------------Single phone API loaded Code Start Here-----------\\

const singlePhoneDetails = productsId => {
    console.log(productsId);
    const url = ` https://openapi.programming-hero.com/api/phone/${productsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySinglePhoneDetails(data.data))
}

//----------------Single phone API loaded Code End Here-----------\\



//------------------display Single Phone Details Code Start Here----------------\\

const displaySinglePhoneDetails = phone => {
    parent2.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `
           <div class="row p-5">
                  <div class="col-md-4 p-5">
                      <img src="${phone.image}" alt="">
                  </div>
    
                <div class="col-md-8 bg-dark text-white shadow-lg details-card">
                        <h3><u>Name</u>: ${phone.name}</h3>
                        <h5><u>ReleaseDate</u>: ${phone.releaseDate ? phone.releaseDate : `Not Found! Coming soon.`}</h5>
                        <h5><u>Brand</u>: ${phone.brand}</h5>
                        <h5><u>DisplaySize</u>: ${phone.mainFeatures.displaySize}</h5>
                        <h5><u>Storage</u>: ${phone.mainFeatures.storage}</h5>
                        <h5><u>ChipSet</u>: ${phone.mainFeatures.chipSet}</h5>
                        <h5><u>Memory</u>: ${phone.mainFeatures.memory}</h5>
                        <h5><u>Sensors</u>: ${phone.mainFeatures.sensors.slice()}</h5>
                        <p><u>WLAN</u>: ${phone?.others?.WLAN}</p>
                        <P><u>Bluetooth</u>: ${phone?.others?.Bluetooth}</P>
                        <P><u>GPS</u>: ${phone?.others?.GPS}</P>
                        <P><u>NFC</u>: ${phone?.others?.NFC}</P>
                        <P><u>Radio</u>: ${phone?.others?.Radio}</P>
                        <p><u>USB</u>: ${phone?.others?.USB}</p>
                        </div>
                 </div>
    `
    parent2.appendChild(div);
}

//------------------display Single Phone Details Code Start Here----------------\\
