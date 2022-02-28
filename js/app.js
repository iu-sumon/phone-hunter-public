const parent1 = document.getElementById("parent-1");

const searchField = () => {
    const searchField = document.getElementById('input-field');
    const searchFieldText = searchField.value;
    searchField.value = '';

    document.getElementById('spinner').style.display = 'block';
    parent1.textContent = '';

    if (searchFieldText == '') {
        document.getElementById('error-message').innerText = 'You did not provide input! please provide valid input';
        parent1.textContent = '';
    }

    else {

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`

             fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data))
          //  .catch(data => displayErrorMessage(data))
    }

}



// const displayErrorMessage = error => 
// {
//     console.log(error);
//  document.getElementById('error-message').innerText = 'Your input is wrong! Please provide valid input.Thanks';
// }



const displayPhone = phones => {
    console.log(phones);
    if(phones.length==0)
    {
        document.getElementById('error-message').innerText = 'No Phone Found! Please check your input and try again.';
    }
    //document.getElementById('error-message').innerText = '';
else
{
    document.getElementById('error-message').innerText = ''; 
    phones.forEach(phone => {
        console.log(phone);
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
 
