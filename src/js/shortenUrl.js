document.getElementById("form").addEventListener("submit", async e => {
    e.preventDefault();
    let mypromise = new Promise(function(resolve,reject){
        let longURL = document.getElementById("form__input").value;
        const proxyUrl = 'https://corsproxy.io/?';
        let endpoint = "https://cleanuri.com/api/v1/shorten"
        let xhr = new XMLHttpRequest()
        xhr.open("POST",  proxyUrl + encodeURIComponent(endpoint), true)
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
        let card = document.createElement("div")
        let initialURL = document.createElement("h6")
        let shortURL = document.createElement("h6")
        let copyButton = document.createElement("button")
        firstURLvalue = document.getElementById("form__input").value;
        initialURL.innerHTML = firstURLvalue;
        shortURL.innerHTML = promise.result_url;
        copyButton.innerHTML ="copy"
        let cardElements = [initialURL,shortURL,copyButton]
        cardElements.map(element => {
            card.appendChild(element)
        })
        let displayer = document.getElementById("form__displayer")
        displayer.appendChild(card)
    }catch(err){
        console.log(err)
    }

})