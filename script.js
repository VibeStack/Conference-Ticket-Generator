const beforeUpload = document.querySelector('.before-upload');
const afterUpload = document.querySelector('.after-upload');
const inputAvtar = document.querySelector('.input-avtar');
const removeAddedImage = document.querySelector('.remove-added-image');
const uploadBtn = document.querySelector('#select-file-to-upload');
const changeAddedImage = document.querySelector('.change-added-image');
const pointToFollowImg = document.querySelector('.pointToFollow img');
const pointToFollowText = document.querySelector('.suitable-formats');
let fileExist = false;

beforeUpload.addEventListener('click',(e)=>{
    uploadBtn.click();
    pointToFollowText.innerText = 'Upload your photo (JPG, JPEG or PNG, max size: 500KB).'
    pointToFollowText.style.color = 'white';
    pointToFollowImg.src = './assets/images/icon-info.svg';
})
uploadBtn.addEventListener('click',(e)=>{
    e.stopPropagation();
})

const errorImg = document.querySelector('.pointToFollow img');
const errorMessege = document.querySelector('.pointToFollow p');
const userImageLink = document.querySelector('.userImageLink');

function fileUploadFunction(file){
    pointToFollowText.innerText = 'Upload your photo (JPG, JPEG or PNG, max size: 500KB).'
    pointToFollowText.style.color = 'white';
    pointToFollowImg.src = './assets/images/icon-info.svg';

    const maxSize = 500 * 1024;
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if(file){
        if(!validTypes.includes(file.type)){

            errorImg.src = './assets/images/icon-info-red.svg';
            errorMessege.style.color = 'red';
        }
        else if(file.size > maxSize){
            errorImg.src = './assets/images/icon-info-red.svg';
            errorMessege.innerText = 'File too Large. Please upload a photo under 500KB.'
            errorMessege.style.color = 'red';
        }
        else{
            beforeUpload.style.display = 'none';
            afterUpload.style.display = 'flex';

            const reader = new FileReader();
            reader.onload = function(e){
                const base64Data = e.target.result;
                userImageLink.src = base64Data;
            }
            reader.readAsDataURL(file)
            fileExist = true;
        }
    }
    else{
        beforeUpload.style.display = 'flex';
        afterUpload.style.display = 'none';
        fileExist = false;
        alert("Please select a valid image file.");
    }
}

inputAvtar.addEventListener('dragover',(e)=>{
    e.preventDefault();
    inputAvtar.classList.add('dragover');
    console.log('dragover');
})
inputAvtar.addEventListener('dragleave',(e)=>{
    e.preventDefault();
    inputAvtar.classList.remove('dragover');
    console.log('dragleave');
})
inputAvtar.addEventListener('drop',(e)=>{
    e.preventDefault();
    console.log('drop');
    inputAvtar.classList.remove('dragover');
    fileUploadFunction(e.dataTransfer.files[0]);
})
uploadBtn.addEventListener('change',(e)=>{
    fileUploadFunction(e.target.files[0]);
})
removeAddedImage.addEventListener('click',(e)=>{
    beforeUpload.style.display = 'flex';
    afterUpload.style.display = 'none';
    fileExist = false;
})
changeAddedImage.addEventListener('click',()=>{
    fileExist = false;
    uploadBtn.click();
})

const fullName = document.querySelector('#fullName');
const email = document.querySelector('#email');
const githubUsername = document.querySelector('#githubUserName');
const errorMessegeEmail = document.querySelector('.error-messege');
const submitBtn = document.querySelector('.submit-btn');
let userId = String(Math.floor(Math.random()*10000) + 1).padStart(5,'0');

submitBtn.addEventListener('click',()=>{
    if(!email.value.toLowerCase().endsWith('@gmail.com')){
        errorMessegeEmail.style.opacity = 1;
    }
    if(!fileExist){
        errorImg.src = './assets/images/icon-info-red.svg';
        errorMessege.style.color = 'red';
    }
    if(fileExist && email.value.toLowerCase().endsWith('@gmail.com')){
        const user = {
            id: `${userId}`,
            name: `${fullName.value}`,
            email: `${email.value}`,
            githubUsername: `${githubUsername.value}`,
            image: `${userImageLink.src}`
        }
        localStorage.setItem('userDetails',JSON.stringify(user));
        document.querySelectorAll('input').forEach(input => input.value = '');
        submitBtn.children[0].href = './output.html';
    }

})
email.addEventListener('input',()=>{
    errorMessegeEmail.style.opacity = 0;
})
