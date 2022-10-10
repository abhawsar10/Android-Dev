const express = require('express');
const app = express.Router();
const axios = require('axios');

//---------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Declarations----------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------


const my_API_key = '7f008eb4dee26314e288b0e28cb7f1c8';

function converthours(n){
    var num = n;
    var hours = (num/ 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours)*60;
    var rminutes = Math.round(minutes);

    var first_part = "";
    var second_part = "";

    if(rhours==1){
        first_part = rhours+"hr ";
    }
    else if(rhours>1){
        first_part = rhours+"hrs "
    }

    if(rminutes==1){
        second_part = rminutes+"min";
    }
    else if(rminutes>1){
        second_part = rminutes+"mins";
    }
    
    return first_part + second_part;
}



//---------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Now Playing API Call--------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------


app.get('/now_playing', async function (req, res) {

    
    var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${my_API_key}&language=en-US&page=1`;

    try{

        var response = await axios.get(url)
        
        var dat = response.data;
        results = dat["results"];

        var send_list = [];
        var send_json = {};

        for (var i = 0; i < 6; i++) {

            if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {

                var temp = {};

                var url_part = results[i]["poster_path"];
                temp["id"] = results[i]["id"];
                temp["title"] = results[i]["title"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/original${url_part}`;
                send_list.push(temp);
            }
        }
        send_json["now_playing"] = send_list;
        res.json(send_json);

    } catch (err){
        console.error(err);
    }

  });


//---------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------Movie Homepage API Calls-----------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

app.get('/pop_movies', function (req, res) {

    
    var url = `https://api.themoviedb.org/3/movie/popular?api_key=${my_API_key}&language=en-US&page=1`;

    axios.get(url)
    .then(response => {
            
            var dat = response.data;
            results = dat["results"];

            var send_list = [];
            var send_json = {};

            for (var i = 0; i < 10; i++) {

                if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {

                    var temp = {};

                    var url_part = results[i]["poster_path"];
                    temp["id"] = results[i]["id"];
                    temp["title"] = results[i]["title"];
                    temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                    send_list.push(temp);
                }
            }
            send_json["pop_movies"] = send_list;
            res.json(send_json);

        })
    .catch(error => console.log('Errorxyz',error));

  });


app.get('/top_movies', function (req, res) {

    var url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${my_API_key}&language=en-US&page=1`;

    axios.get(url)
    .then(response => {
            
            var dat = response.data;
            results = dat["results"];

            var send_list = [];
            var send_json = {};

            for (var i = 0; i < 10; i++) {

                if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {

                    var temp = {};

                    var url_part = results[i]["poster_path"];
                    temp["id"] = results[i]["id"];
                    temp["title"] = results[i]["title"];
                    temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                    send_list.push(temp);
                }
            }
            send_json["top_movies"] = send_list;
            res.json(send_json);

        })
    .catch(error => console.log('Errorxyz',error));

  });


app.get('/trending_movies', function (req, res) {

    var url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${my_API_key}`;

    axios.get(url)
    .then(response => {
            
            var dat = response.data;
            results = dat["results"];

            var send_list = [];
            var send_json = {};

            for (var i = 0; i < 20; i++) {

                if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {

                    var temp = {};

                    var url_part = results[i]["poster_path"];
                    temp["id"] = results[i]["id"];
                    temp["title"] = results[i]["title"];
                    temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                    send_list.push(temp);
                }
            }
            send_json["trending_movies"] = send_list;
            res.json(send_json);

        })
    .catch(error => console.log('Errorxyz',error));

  });

app.get('/reco_movies/:movie_id', async function (req, res) {

    var movie_id = req.params["movie_id"];
    var send_json = {};
    
    try{

        var url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];
        var send_list1 = [];
        for (var i = 0; i < Math.min(20,results.length); i++) {

            if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {
                var temp = {};
                var url_part = results[i]["poster_path"];
                temp["id"] = results[i]["id"];
                temp["title"] = results[i]["title"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                send_list1.push(temp);
            }
        }
        send_json["reco_movies"] = send_list1;

    }catch(err){
        console.error(err)
    }    

    res.json(send_json);

});

app.get('/sim_movies/:movie_id', async function (req, res) {

    var movie_id = req.params["movie_id"];
    var send_json = {};
    
    try{

        var url = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url);

        var dat = response.data;
        results = dat["results"];
        var send_list2 = [];
        for (var i = 0; i < Math.min(20,results.length); i++) {

            if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {
                var temp = {};
                var url_part = results[i]["poster_path"];
                temp["id"] = results[i]["id"];
                temp["title"] = results[i]["title"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                send_list2.push(temp);
            }
        }
        send_json["sim_movies"] = send_list2;

    }catch(err){
        console.error(err)
    }    

    res.json(send_json);

});




//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------TV Homepage API Calls---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------


app.get('/pop_tv', function (req, res) {

    var url = `https://api.themoviedb.org/3/tv/popular?api_key=${my_API_key}&language=en-US&page=1`;

    axios.get(url)
    .then(response => {
            
            var dat = response.data;
            results = dat["results"];

            var send_list = [];
            var send_json = {};

            for (var i = 0; i < 10; i++) {

                if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {

                    var temp = {};

                    var url_part = results[i]["poster_path"];
                    temp["id"] = results[i]["id"];
                    temp["title"] = results[i]["name"];
                    temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                    send_list.push(temp);
                }
            }
            send_json["pop_tv"] = send_list;
            res.json(send_json);

        })
    .catch(error => console.log('Errorxyz',error));

  });

app.get('/top_tv', function (req, res) {

    var url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${my_API_key}&language=en-US&page=1`;

    axios.get(url)
    .then(response => {
            
            var dat = response.data;
            results = dat["results"];

            var send_list = [];
            var send_json = {};

            for (var i = 0; i < 10; i++) {

                if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {

                    var temp = {};

                    var url_part = results[i]["poster_path"];
                    temp["id"] = results[i]["id"];
                    temp["title"] = results[i]["name"];
                    temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                    send_list.push(temp);
                }
            }
            send_json["top_tv"] = send_list;
            res.json(send_json);

        })
    .catch(error => console.log('Errorxyz',error));

  });

app.get('/trending_tv', function (req, res) {

    var url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${my_API_key}`;
    
    axios.get(url)
    .then(response => {
            
            var dat = response.data;
            results = dat["results"];

            var send_list = [];
            var send_json = {};

            for (var i = 0; i < 6; i++) {

                if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {

                    var temp = {};

                    var url_part = results[i]["poster_path"];
                    temp["id"] = results[i]["id"];
                    temp["title"] = results[i]["name"];
                    temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                    send_list.push(temp);
                }
            }
            send_json["trending_tv"] = send_list;
            res.json(send_json);

        })
    .catch(error => console.log('Errorxyz',error));

  });

app.get('/reco_tv/:tv_id', async function (req, res) {

    var tv_id = req.params["tv_id"];
    var send_json = {};
    
    try{
        
        var url = `https://api.themoviedb.org/3/tv/${tv_id}/recommendations?api_key=${my_API_key}&language=en-US&page=1`
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];
        var send_list1 = [];
        for (var i = 0; i < Math.min(20,results.length); i++) {

            if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {
                var temp = {};
                var url_part = results[i]["poster_path"];
                temp["id"] = results[i]["id"];
                temp["name"] = results[i]["name"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                send_list1.push(temp);
            }
        }
        send_json["reco_tv"] = send_list1;

    }catch(err){
        console.error(err)
    }    

    res.json(send_json);

});


app.get('/sim_tv/:tv_id', async function (req, res) {

    var tv_id = req.params["tv_id"];
    var send_json = {};
    
    try{

        var url = `https://api.themoviedb.org/3/tv/${tv_id}/similar?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];
        var send_list2 = [];
        for (var i = 0; i < Math.min(20,results.length); i++) {

            if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {
                var temp = {};
                var url_part = results[i]["poster_path"];
                temp["id"] = results[i]["id"];
                temp["name"] = results[i]["name"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                send_list2.push(temp);
            }
        }
        send_json["sim_tv"] = send_list2;

    }catch(err){
        console.error(err)
    }    

    res.json(send_json);

});


//---------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------Multi Search API Call----------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

app.get('/search', function (req, res) {

    var query = req.query.q || "game";

    var url = `https://api.themoviedb.org/3/search/multi?api_key=${my_API_key}&language=en-US&query=${query}`;

    axios.get(url)
    .then(response => {
            
        var dat = response.data;
        results = dat["results"];


        var send_list = [];
        var send_json = {};

        len=0

        if(results.length != 0){

            var i=0;
            while( i<7 && len < results.length ){

                if ("media_type" in results[len] && results[len]["media_type"] == "movie") {

                    if (results[len]["backdrop_path"] !=null && results[len]["backdrop_path"] !="" && "backdrop_path" in results[len]) {

                        var temp = {};

                        var url_part = results[len]["backdrop_path"];
                        temp["id"] = results[len]["id"];
                        temp["title"] = results[len]["title"];
                        temp["backdrop_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                        temp["media_type"] = "movie";
                        send_list.push(temp);
                        i++;
                    }

                }
                else if ("media_type" in results[len] && results[len]["media_type"] == "tv") {

                    if (results[len]["backdrop_path"] !=null && results[len]["backdrop_path"] !="" && "backdrop_path" in results[len]) {

                        var temp = {};

                        var url_part = results[len]["backdrop_path"];
                        temp["id"] = results[len]["id"];
                        temp["title"] = results[len]["name"];
                        temp["backdrop_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                        temp["media_type"] = "tv";
                        send_list.push(temp);
                        i++;
                    }

                }
                len++;

            }
        }

        send_json["search_results"] = send_list;
        
        res.json(send_list);

    })
    .catch(error => console.log('Errorxyz',error));

  });

//---------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------Movie Stuff--------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------



app.get('/movie/:movie_id', async function (req, res) {

    var movie_id = req.params["movie_id"];
    var send_json = {};
    
    try{
        
        var url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];

        var send_list3 = {};
        var flag=0;
        for (var i = 0; i < results.length; i++) {

            if (results[i]["type"] =="Trailer") {

                var url_part = results[i]["key"];
                send_list3["name"] = results[i]["name"];
                send_list3["key"] = `${url_part}`;
                flag=1;
                break;
            }
        }
        if (flag==0) {
            send_list3["name"] = "";
            send_list3["key"] = "";
        }
        
        send_json["video"] = send_list3;
        

//-----------------------------
        
        var url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${my_API_key}&language=en-US&page=1`
        var response = await axios.get(url)
        var results = response.data;
        var send_list4 = {};
        send_list4["title"] = results["title"];
        send_list4["release_date"] = results["release_date"].slice(0,4)  || "";
        send_list4["runtime"] = converthours(results["runtime"]);
        send_list4["overview"] = results["overview"] || "";
        send_list4["vote_average"] = results["vote_average"];
        send_list4["tagline"] = results["tagline"];
        send_list4["poster_path"] = "https://image.tmdb.org/t/p/original"+results["poster_path"];
        send_list4["backdrop_path"] = "https://image.tmdb.org/t/p/original"+results["backdrop_path"];


        var gen = "";
        for( var i=0; i < results["genres"].length; i++) {

            gen = gen + ", " +results["genres"][i]["name"];
        }
        send_list4["genres"] = gen.slice(2,);

        var lang = "";
        for( var i=0; i < results["spoken_languages"].length; i++) {

            lang = lang + ", " +results["spoken_languages"][i]["english_name"];
        }
        send_list4["spoken_languages"] = lang.slice(2,);

        send_json["movie_details"] = send_list4;

//-----------------------------
        
        var url = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];
        var send_list5 = [];
        for (var i = 0; i < Math.min(3,results.length); i++) {

            var temp = {};
            temp["author"] = results[i]["author"] || "Anonymous";
            temp["content"] = results[i]["content"] || "NA";
            temp["created_at"] = results[i]["created_at"].slice(0,10);
            temp["url"] = results[i]["url"];

            if("avatar_path" in results[i]["author_details"] && results[i]["author_details"]["avatar_path"]!=null && results[i]["author_details"]["avatar_path"]!="") {
                
                if( results[i]["author_details"]["avatar_path"].startsWith("/https://")){
                    temp["avatar_path"] = results[i]["author_details"]["avatar_path"].slice(1,);
                }
                else{                    
                    temp["avatar_path"] = "https://image.tmdb.org/t/p/original"+results[i]["author_details"]["avatar_path"];
                }
            

            }
            else{
                temp["avatar_path"] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"
            }
            
            if("rating" in results[i]["author_details"] && results[i]["author_details"]["rating"]!=null && results[i]["author_details"]["rating"]!=""){
                temp["rating"] = results[i]["author_details"]["rating"]
            }
            else{
                temp["rating"] = 0;
            }


            send_list5.push(temp);
            
        }
        send_json["reviews"] = send_list5;


//-----------------------------

        var url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["cast"];
        var send_list6 = [];
        for (var i = 0; i < Math.min(6,results.length); i++) {

            if (results[i]["profile_path"] !=null && results[i]["profile_path"] !="" && "profile_path" in results[i]) {

                var temp = {};
                var url_part = results[i]["profile_path"];
                temp["id"] = results[i]["id"];
                temp["name"] = results[i]["name"];
                temp["character"] = results[i]["character"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/w500/${url_part}`;
                send_list6.push(temp);
            }
        
        }
        send_json["cast"] = send_list6;


//-----------------------------

        var url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];
        var send_list7 = [];
        for (var i = 0; i < Math.min(10,results.length); i++) {

            if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {
                var temp = {};
                var url_part = results[i]["poster_path"];
                temp["id"] = results[i]["id"];
                temp["title"] = results[i]["title"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                send_list7.push(temp);
            }
        }
        send_json["reco"] = send_list7;



    }catch(err){
        console.error(err)
    }    

    res.json(send_json);

  });








//---------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------TV Stuff------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------



app.get('/tv/:tv_id', async function (req, res) {

    var tv_id = req.params["tv_id"];
    var send_json = {};
    
    try{

        var url = `https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];
        var send_list3 = {};
        var flag=0;
        for (var i = 0; i < results.length; i++) {

            if (results[i]["type"] =="Trailer") {

                var url_part = results[i]["key"];
                send_list3["name"] = results[i]["name"];
                send_list3["key"] = `${url_part}`;
                flag=1;
                break;
            }
        }
        if (flag==0) {
            send_list3["name"] = "";
            send_list3["key"] = "";
        }
        send_json["video"] = send_list3;

//-----------------------------
        
        var url = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var results = response.data;
        var send_list4 = {};
        send_list4["title"] = results["name"];
        send_list4["release_date"] = results["first_air_date"].slice(0,4) || "";
        send_list4["episode_run_time"] = converthours(results["episode_run_time"][0]);
        send_list4["overview"] = results["overview"] || "";
        send_list4["vote_average"] = results["vote_average"];
        send_list4["tagline"] = results["tagline"];
        send_list4["poster_path"] = "https://image.tmdb.org/t/p/original"+results["poster_path"];
        send_list4["backdrop_path"] = "https://image.tmdb.org/t/p/original"+results["backdrop_path"];

        var gen = "";
        for( var i=0; i < results["genres"].length; i++) {

            gen = gen + ", " +results["genres"][i]["name"];
        }
        send_list4["genres"] = gen.slice(2,);

        var lang = "";
        for( var i=0; i < results["spoken_languages"].length; i++) {

            lang = lang + ", " +results["spoken_languages"][i]["english_name"];
        }
        send_list4["spoken_languages"] = lang.slice(2,);

        send_json["tv_details"] = send_list4;

//-----------------------------
        
        var url = `https://api.themoviedb.org/3/tv/${tv_id}/reviews?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];
        var send_list5 = [];
        for (var i = 0; i < Math.min(3,results.length); i++) {

            var temp = {};
            temp["author"] = results[i]["author"] || "NA";
            temp["content"] = results[i]["content"] || "NA";
            temp["created_at"] = results[i]["created_at"].slice(0,10);
            temp["url"] = results[i]["url"];

            if("avatar_path" in results[i]["author_details"] && results[i]["author_details"]["avatar_path"]!=null && results[i]["author_details"]["avatar_path"]!="") {
                
                if( results[i]["author_details"]["avatar_path"].startsWith("/https://")){
                    temp["avatar_path"] = results[i]["author_details"]["avatar_path"].slice(1,);
                }
                else{ 
                    temp["avatar_path"] = "https://image.tmdb.org/t/p/original"+results[i]["author_details"]["avatar_path"];
                }
            }
            else{
                temp["avatar_path"] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"
            }
            
            if("rating" in results[i]["author_details"] && results[i]["author_details"]["rating"]!=null && results[i]["author_details"]["rating"]!=""){
                temp["rating"] = results[i]["author_details"]["rating"]
            }
            else{
                temp["rating"] = 0;
            }


            send_list5.push(temp);
            
        }
        send_json["reviews"] = send_list5;


//-----------------------------
    
        var url = `https://api.themoviedb.org/3/tv/${tv_id}/credits?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["cast"];
        var send_list6 = [];
        for (var i = 0; i < Math.min(6,results.length); i++) {

            if (results[i]["profile_path"] !=null && results[i]["profile_path"] !="" && "profile_path" in results[i]) {

                var temp = {};
                var url_part = results[i]["profile_path"];
                temp["id"] = results[i]["id"];
                temp["name"] = results[i]["name"];
                temp["character"] = results[i]["character"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/w500/${url_part}`;
                send_list6.push(temp);
            }
        }
        send_json["cast"] = send_list6;

//-----------------------------

        var url = `https://api.themoviedb.org/3/tv/${tv_id}/recommendations?api_key=${my_API_key}&language=en-US&page=1`
        var response = await axios.get(url)
        var dat = response.data;
        results = dat["results"];
        var send_list7 = [];
        for (var i = 0; i < Math.min(10,results.length); i++) {

            if (results[i]["poster_path"] !=null && results[i]["poster_path"] !="" && "poster_path" in results[i]) {
                var temp = {};
                var url_part = results[i]["poster_path"];
                temp["id"] = results[i]["id"];
                temp["title"] = results[i]["name"];
                temp["poster_path"] = `https://image.tmdb.org/t/p/w500${url_part}`;
                send_list7.push(temp);
            }
        }
        send_json["reco"] = send_list7;
    

    }catch(err){
        console.error(err)
    }    

    res.json(send_json);

  });

//---------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Cast Details API Calls------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------


app.get('/cast/:cast_id', async function (req, res) {

    var cast_id = req.params["cast_id"];
    var send_json = {};
    
    try{

        var url = `https://api.themoviedb.org/3/person/${cast_id}?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var results = response.data;
        var send_list = {};

        send_list["name"] = results["name"];

        if("birthday" in results && results["birthday"]!=null && results["birthday"]!="") {
            send_list["birthday"] = results["birthday"];
        }
        else{
            send_list["birthday"] = "";
        }

        if(results["gender"]==2){
            send_list["gender"] = "Male";
        }else{
            send_list["gender"] = "Female";
        }
        
        var aka="";
        for (var i = 0; i < results["also_known_as"].length; i++) {
            aka = aka + ", " + results["also_known_as"][i];
        }
        send_list["also_known_as"] = aka.slice(2,);


        send_list["known_for_department"] = results["known_for_department"];

        if("place_of_birth" in results && results["place_of_birth"]!=null && results["place_of_birth"]!="") {
            send_list["place_of_birth"] = results["place_of_birth"];
        }
        else{
            send_list["place_of_birth"] = "";
        }
        
        send_list["biography"] = results["biography"];

        if("homepage" in results && results["homepage"]!=null && results["homepage"]!="") {
            send_list["homepage"] = results["homepage"];
        }else{
            send_list["homepage"] = "";
        }
        
        if("profile_path" in results && results["profile_path"]!=null && results["profile_path"]!="") {
            send_list["profile_path"] = `https://image.tmdb.org/t/p/w500/${results["profile_path"]}`;
        }
        else{
            send_list["profile_path"] = "";
        }

        send_json["cast_details"] = send_list;
            
//-----------------------------
    
        var url = `https://api.themoviedb.org/3/person/${cast_id}/external_ids?api_key=${my_API_key}&language=en-US&page=1`;
        var response = await axios.get(url)
        var results = response.data;
        var send_list2 = {};
        
        if("imdb_id" in results && results["imdb_id"]!=null && results["imdb_id"]!="") {
            send_list2["imdb_id"] = "https://www.imdb.com/name/"+results["imdb_id"];
        }
        else{
            send_list2["imdb_id"] = "";
        }
        if("facebook_id" in results && results["facebook_id"]!=null && results["facebook_id"]!="") {
            send_list2["facebook_id"] = "https://www.facebook.com/"+results["facebook_id"];
        }
        else{
            send_list2["facebook_id"] = "";
        }
        if("instagram_id" in results && results["instagram_id"]!=null && results["instagram_id"]!="") {
            send_list2["instagram_id"] = "https://www.instagram.com/"+results["instagram_id"];
        }
        else{
            send_list2["instagram_id"] = "";
        }
        if("twitter_id" in results && results["twitter_id"]!=null && results["twitter_id"]!="") {
            send_list2["twitter_id"] = "https://www.twitter.com/"+results["twitter_id"];
        }
        else{
            send_list2["twitter_id"] = "";
        }
        send_json["cast_ext"] = send_list2;


    }catch(err){
        console.error(err)
    }    

    res.json(send_json);

  });
        

//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------



module.exports = app;