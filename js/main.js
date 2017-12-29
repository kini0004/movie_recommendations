let app = {
    URL: 'http://api.themoviedb.org/3/',
    INPUT:null,
    init: function() {
        //fetch the config info
        app.INPUT = document.getElementById('search-input');
        app.INPUT.focus();
        //add click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);
        //lister for enter or return
        document.addEventListener('keypress', function(ev){
            let char = ev.char || ec.charCode || ev.which;
            if(char==10 || char==13) {
                //they hit enter or return
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });
    },
    runSearch: function(ev) {
        ev.preventDefault();
        if (app.INPUT.value) {
            //if they actually typed something other than enter
            let url = app.URL + "search/movie?api_key=" + KEY;
            url += "&query=" + app.INPUT.value;
           
            
            fetch(url)
            .then( response => response.json())
            .then(data => {
                console.log(data);
                app.showMovies(data.results);
            })
            .catch(err => {
                console.log(err);
            });
            
        }
    },
    showMovies: function(movies) {
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";
        movies.forEach(function(movie) {
            let div = document.createElement('div');
            div.setAttribute("data-movie", movie.id);
            console.log(movie.id);
            div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            div.textContent = movie.title;
            df.appendChild(div);
        });
       section.appendChild(df); 
    },
    getRecommended: function(ev) {
        let movie_id=ev.target.getAttribute("data-movie");
        console.log("You clicked" , movie_id);
    }
};

document.addEventListener('DOMContentLoaded', app.init);

































//wait for DOMContentLoaded event
//fetch the configuration info for image locations and sizes
//focus on the text field
//listen for click on search button
//listen for keypress and <enter> or <return>

//after the click / <enter> press run a fetch
//results come back from fetch
//show the movie results page
//loop through the results and build <div>s

//make something in the dic clickable
//get the id from the clickable element
//fetch the recommendations based on the movie id