document.getElementById("form").addEventListener("submit", async e => {
    e.preventDefault();
    let mypromise = new Promise(function(resolve,reject){
        let longURL = document.getElementById("form__input").value;
        let endpoint = "https://cleanuri.com/api/v1/shorten"
        let xhr = new XMLHttpRequest()
        xhr.open("POST", endpoint, true)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 300){
                let response = JSON.parse(xhr.responseText);
                resolve(response)
            }else{
                reject(`Something went wrong: ${xhr.status}`)
            }
        }

        xhr.send(`url=${encodeURIComponent(longURL)}`)
    })

    try{
        let promise = await mypromise
        console.log(promise)
    }catch(err){
        console.log(err)
    }

})