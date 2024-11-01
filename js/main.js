let main_cards = document.getElementById('main_cards')
let nav_link = document.getElementsByClassName('nav-link')
let loading = document.getElementsByClassName('loading')[0]
let home = document.getElementsByClassName('home')
let details = document.getElementsByClassName('details')[0]
let sections = document.querySelectorAll('section');


async function getGame(get_catagory) {
    loading_screen()
	const options = {
	method: 'GET',
        headers: {
            'X-RapidAPI-Key': '631bfdf4e4msh688b97b8a16f4acp18a8d8jsn6b65eac8c8a8',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
	let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${get_catagory || 'MMORPG'}` , options)
	let req = await api.json()
	
    
    if (api.status == 200) {
        console.log(req);
        await displaycard(req)
        getId()
        
    }
    loading_screen()
}

getGame()


async function getDetails(id_card) {
  loading_screen()
  console.log(id_card);
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '631bfdf4e4msh688b97b8a16f4acp18a8d8jsn6b65eac8c8a8',
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};

	let api2 = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id_card}`,options)
	let req2 = await api2.json()
    
  if (api2.status == 200) {
    console.log(req2);

    showDetails(req2)
    closeBtn()
  }
  loading_screen()


}




function getId() {
  for (let i = 0; i < home.length; i++) {
    home[i].addEventListener("click", function () {
      let id_card = home[i].id
      getDetails(id_card)
      })
    }
}




async function displaycard(get_req) {

    for (let i = 0; i < get_req.length; i++) {

        main_cards.innerHTML += `
            <div class="col home" id="${get_req[i].id}">
                <div class="card justify-content-around h-100">
                    <img  src="${get_req[i].thumbnail}" class="card-img-top p-3" alt="...">
                    <div class="card-body">
                        <div class="d-flex mb-1 align-items-center justify-content-between">
                            <h5 class="card-title small">${get_req[i].title}</h5>
                            <span class="badge text-bg-primary p-2">free</span>
                        </div>
                        <p class="card-text small text-center opacity-50">${get_req[i].short_description}</p>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <small class="badge  small">${get_req[i].genre}</small>
                        <small class="badge  small">${get_req[i].platform}</small>
                    </div>
                </div>
        </div>`
        
    }
}



for (let i = 0; i < nav_link.length; i++) {

    function remove_active() {
        for (let j = 0; j < nav_link.length; j++) {
            nav_link[j].classList.remove('active')
        }
    }

    nav_link[i].addEventListener("click", function post_category(){
        remove_active()
        nav_link[i].classList.add('active')
        main_cards.innerHTML=''
        let get_catagory = nav_link[i].textContent
        getGame(get_catagory)

    })
}





function loading_screen() {
    if (loading.classList.contains('d-none') == true) {
        loading.classList.remove('d-none')
    } else {
        loading.classList.add('d-none')
    }
}





function showDetails(req2) {

       


  sections[1].style.display='none'
  sections[2].style.display='none'

  
  details.style.display='block'


  details.innerHTML = `<div class="container de_sec">

    <div class="row align-items-center">
      <h1 class="col py-4">${req2.title}</h1>
      <button class="btn-close btn-close-white" id="btnClose"></button>
    </div>

    <div class="row">

      <div class="col-md-4">
        <img class="w-100 pb-4" src=${req2.thumbnail} alt="">
      </div>

      <div class="col-md-8">
        <h4>Title: Omega Zodiac</h4>
        <p>Category: <span class="badge text-bg-info"> ${req2.genre}</span></p>
        <p>Platform: <span class="badge text-bg-info"> ${req2.platform}</span></p>
        <p>Status  : <span class="badge text-bg-info"> ${req2.status}</span></p>
        <p class="small">${req2.description}</p>
        <a class="btn btn-outline-warning" href=${req2.game_url} target="_blank">Show Game</a>
      </div>
    </div>  
  </div>`

  
}




console.log(sections);



function closeBtn() {
  let btnClose =  document.getElementById('btnClose')

  btnClose.addEventListener('click',async function () {

    details.style.display='none'

    sections[1].style.display='block'
    sections[2].style.display='block'


  })
}
