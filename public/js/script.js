console.log('hi JS');



  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search');


  searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('form submit')
    const search = searchInput.value;

    //Get request
    fetch(`http://localhost:3030/forecast?address=${search}`).then((response) => {
      response.json().then((data)=>{
        console.log(data)
        const weather = data.weather;
        const address = data.address;
        const error = data.error;
        if(weather){
        document.getElementById('forecast').innerHTML = `adres ${address}, ${weather}`;
  }else{
    document.getElementById('forecast').innerHTML = data.error
  }
      })
    });
  })
