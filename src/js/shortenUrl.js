document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  let longURL = document.getElementById("form__input").value;
  if (longURL != "") {
    let mypromise = new Promise(function (resolve, reject) {
      const proxyUrl = "https://corsproxy.io/?";
      let endpoint = "https://cleanuri.com/api/v1/shorten";
      let xhr = new XMLHttpRequest();
      xhr.open("POST", proxyUrl + encodeURIComponent(endpoint), true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.responseText);
          resolve(response);
        } else {
          reject(`Something went wrong: ${xhr.status}`);
        }
      };

      xhr.send(`url=${encodeURIComponent(longURL)}`);
    });

    try {
      let promise = await mypromise;
      let card = document.createElement("div");
      let initialURL = document.createElement("h6");
      let shortURL = document.createElement("h6");
      let copyButton = document.createElement("button");
      let cardAside = document.createElement("div");
      firstURLvalue = document.getElementById("form__input").value;
      initialURL.innerHTML = firstURLvalue;
      shortURL.innerHTML = promise.result_url;
      copyButton.innerHTML = "Copy";

      card.className = "card";
      initialURL.className = "card__long-url-title";
      shortURL.className = "aside__short-url-title";
      copyButton.addEventListener("mouseover", () => {
        copyButton.style.cursor = "pointer";
      });
      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(promise.result_url);
        copyButton.innerHTML = "Copied!";
        copyButton.style.backgroundColor = "hsl(260, 8%, 14%)";
        copyButton.style.border = "1px solid hsl(260, 8%, 14%)";
      });
      copyButton.className = "aside__copy-button";
      cardAside.className = "card__aside";
      cardAside.appendChild(shortURL);
      cardAside.appendChild(copyButton);
      card.appendChild(initialURL);
      card.appendChild(cardAside);
      let displayer = document.getElementById("form__displayer");
      displayer.appendChild(card);

      function resetForm(){
        document.getElementById("error_message").style.display ="none"
        document.getElementById("form__input").style.border = "";
        document.getElementById("form__input").style.background = "";
        document.getElementById("form__input").classList.remove("placeholder-error");
    }

    resetForm()

    } catch (err) {
      console.log(err);
    }
  } else {
    function validateForm(){
        document.getElementById("error_message").style.display ="block"
        document.getElementById("form__input").style.border = "1px solid red";
        document.getElementById("form__input").style.background = "rgb(236, 211, 211)";
        document.getElementById("form__input").classList.remove("placeholder-initial");
        document.getElementById("form__input").classList.add("placeholder-error");
    }

    validateForm()
  }
});
