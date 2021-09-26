const user = document.getElementById("search-input").value;
const userImage = document.getElementById("user-image");
const userFullName = document.getElementById("user-full-name");
const username = document.getElementById("username");
const repoLength = document.getElementById("repo-length");
const searchButton = document.getElementById("search-button");
const ENDPOINT_URL = "https://api.github.com/";
let langsObj = {};

function clickHandle() {
  async function getUserData() {
    const user = document.getElementById("search-input");
    const getUser = await fetch(ENDPOINT_URL + "users/" + user.value);
    const getUserJson = await getUser.json();
    userFullName.textContent = getUserJson.name;
    username.textContent = getUserJson.login;
    repoLength.textContent = getUserJson.public_repos;
    userImage.src = getUserJson.avatar_url;
  }
  async function getRepos(callback) {
    const user = document.getElementById("search-input");
    const getRepo = await fetch(
      ENDPOINT_URL + "users/" + user.value + "/repos"
    );
    const repoData = await getRepo.json();
    return callback(repoData);
  }
  async function getLanguages(repositories) {
    const user = document.getElementById("search-input");
    repositories.forEach(async (repo) => {
      const getLang = await fetch(
        `https://api.github.com/repos/${user.value}/${repo.name}/languages`
      );
      const getLangData = await getLang.json();
      return handleLanguages(getLangData);
    });
  }
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
