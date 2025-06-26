const userData = JSON.parse(localStorage.getItem('userDetails'));
const username = document.querySelectorAll('.username');
const userEmail = document.querySelector('.userEmail');
const githubUsername = document.querySelector('.githubUsername');
const githubLink = document.querySelector('.githubLink');
const userImg = document.querySelector('.userImg img');
const userId = document.querySelector('.rightData p');

const fullDate = new Date();

const date = document.querySelector('.date');
date.innerText = fullDate.getDate();

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = document.querySelector('.month');
month.innerText = monthNames[fullDate.getMonth()]+" ";

const year = document.querySelector('.year');
year.innerText = fullDate.getFullYear();

username.forEach((name)=>{
    name.innerText = userData.name;
})
userEmail.innerText = userData.email;
githubUsername.innerText = userData.githubUsername;
githubLink.src = `https://github.com/${githubUsername.innerText}/`;
userImg.src = `${userData.image}`
userId.innerText = `#${userData.id}`
githubLink.addEventListener('click',()=>{
    location.href = `${githubLink.src}`;
})