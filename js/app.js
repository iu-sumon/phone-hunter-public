const searchField = () => {
    const searchField = document.getElementById('input-field');
    const searchFieldText = searchField.value;
    searchField.value = ''


    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))

}
const displayPhone = phones => {
    //console.log(phones);
    const parent1 = document.getElementById("parent-1");
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
        <img src="${phone.image}" class="card-photo" alt="">
        <div class="card-body">
          <h3>${phone.phone_name}</h5>
            <h4>${phone.brand}</h4>
            <button onclick="" type="button" id="details-btn" class="btn btn-info fs-6">Details</button>
         
         `
          parent1.appendChild(div);
    })


}