const user = document.getElementById("search-input").value;
const userImage = document.getElementById("user-image");
const userFullName = document.getElementById("user-full-name");
const username = document.getElementById("username");
const repoLength = document.getElementById("repo-length");
const searchButton = document.getElementById("search-button");
let userRepos = [];
let langsArr = [];
let langsObj = {};
let totalCodeSize = [];
async function fetchDatas() {
  await fetch(`https://api.github.com/users/${user}`)
    .then((response) => response.json())
    .then(async (data) => {
      userFullName.textContent = data.name;
      username.textContent = data.login;
      repoLength.textContent = data.public_repos;
      userImage.src = data.avatar_url;
      // console.log(data.public_repos);
      await fetch(`https://api.github.com/users/${user}/repos`)
        .then(async (responseRepo) => await responseRepo.json())
        .then(async (resultRepo) => {
          await resultRepo.forEach((repo) => {
            userRepos.push(repo.name);
          });
        })
        .catch((error) => console.log("error", error));
      userRepos.forEach(async (item) => {
        await fetch(`https://api.github.com/repos/${user}/${item}/languages`)
          .then(async (responseLang) => await responseLang.json())
          .then((data) => {
            for (const [key, value] of Object.entries(data)) {
              if (langsObj.hasOwnProperty(key))
                langsObj[key] = langsObj[key] + value;
              else langsObj[key] = value;
            }
          });
      });
      console.log(langsObj);
      console.log(Object.values(langsObj));
    });
}
searchButton.addEventListener("click", fetchDatas);
