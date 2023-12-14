// navbar
const toggle = document.querySelector(".toggle");
const links = document.querySelector(".header-links");

toggle.addEventListener("click", () => {
  links.classList.toggle("actived");
});

// shorting url
const inputUrl = document.querySelector(".url-input");
const submitUrl = document.querySelector("#submit-url");
const urlContainer = document.querySelector(".url-container");
const urlBox = document.querySelector(".url-form");
const massage = urlBox.querySelector(".massage");

const urlRegex =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

let urlError = (error) => {
  urlBox.classList.add("error-massage");
  massage.textContent = error;
  return;
};

// create shortcut
let shortcutContent = (url, shortcutUrl) => {
  let urlConent = document.createElement("div");
  urlConent.innerHTML = `<div class="url-link">
  <p>${url}</p>
  <div>
  <span class="short-url">${shortcutUrl}</span>
  <button class="copy-btn">Copy</button>
  </div>
  </div>`;
  return urlConent;
};

let getUrl = async (url) => {
  try {
    const response = await fetch(
      "https://corsproxy.io/?https://urlbae.com/api/url/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 105cbbdb4a3d4b89ffb4f0d9cfc0d86c",
        },
        body: JSON.stringify({
          url: url,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    let shorturl = data.shorturl;
    urlBox.classList.remove("error-massage");
    urlContainer.appendChild(shortcutContent(url, shorturl));
  } catch (error) {
    urlError(error);
  }
};

const handleCopyButtonClick = btn => {
  navigator.clipboard.writeText(btn.previousElementSibling.textContent);
  btn.textContent = "copied";
  btn.style.backgroundColor = "hsl(257, 27%, 26%)";
  console.log(btn);
}

const submitUrlHandler = async () => {
  if (inputUrl.value === "") {
    urlError("please add a link");
    return;
  }

  if (!urlRegex.test(inputUrl.value)) {
    urlError("please enter a valid url");
    return;
  }

  try {
    await getUrl(inputUrl.value);
    const copyBtn = document.querySelectorAll(".copy-btn");
    console.log(copyBtn);
    copyBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        handleCopyButtonClick(btn)
      });
    });
  } catch {
    console.log("error");
  }
};

submitUrl.addEventListener("click", submitUrlHandler);
