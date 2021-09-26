const user = document.getElementById("search-input").value;
const userImage = document.getElementById("user-image");
const userFullName = document.getElementById("user-full-name");
const username = document.getElementById("username");
const repoLength = document.getElementById("repo-length");
const searchButton = document.getElementById("search-button");
const ENDPOINT_URL = "https://api.github.com/";
let langsObj = {};

function clickHandle() {
  function getUserData() {
    const user = document.getElementById("search-input");
    fetch(ENDPOINT_URL + "users/" + user.value)
      .then((res) => res.json())
      .then((data) => {
        userFullName.textContent = data.name;
        username.textContent = data.login;
        repoLength.textContent = data.public_repos;
        userImage.src = data.avatar_url;
      });
  }
  const getRepos = (callback) => {
    const user = document.getElementById("search-input");
    fetch(ENDPOINT_URL + "users/" + user.value + "/repos")
      .then((res) => res.json())
      .then((data) => callback(data));
  };
  const getLanguages = (repositories) => {
    repositories.forEach((repo) => {
      const user = document.getElementById("search-input");
      fetch(`https://api.github.com/repos/${user.value}/${repo.name}/languages`)
        .then((res) => res.json())
        .then((data) => handleLanguages(data));
    });
  };
  const handleLanguages = (languages) => {
    for (const [key, value] of Object.entries(languages)) {
      if (langsObj.hasOwnProperty(key)) langsObj[key] = langsObj[key] + value;
      else langsObj[key] = value;
    }
  };
  getUserData();
  getRepos(getLanguages);
  console.log(langsObj);
}
searchButton.addEventListener("click", clickHandle);
