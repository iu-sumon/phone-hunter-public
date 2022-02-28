const searchField = () => {
    const searchField = document.getElementById('input-field');
    const searchFieldText = searchField.value;
    searchField.value = ''


    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
    fetch(url)
        .then(res => res.json())
        .then(data =>console.log(data))

}