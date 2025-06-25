const userData = JSON.parse(localStorage.getItem('userDetails'));
const username = document.querySelectorAll('.username');
const userEmail = document.querySelector('.userEmail');
const githubUsername = document.querySelector('.githubUsername');
const githubLink = document.querySelector('.githubLink');
const userImg = document.querySelector('.userImg img');

username.forEach((name)=>{
    name.innerText = userData.name;
})
userEmail.innerText = userData.email;
githubUsername.innerText = userData.githubUsername;
githubLink.src = `https://github.com/${githubUsername.innerText}/`;
userImg.src = `${userData.image}`

githubLink.addEventListener('click',()=>{
    location.href = `${githubLink.src}`;
})