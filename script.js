const beforeUpload = document.querySelector('.before-upload');
const afterUpload = document.querySelector('.after-upload');
const inputAvtar = document.querySelector('.input-avtar');
const removeAddedImage = document.querySelector('.remove-added-image');
const uploadBtn = document.querySelector('#select-file-to-upload');
const changeAddedImage = document.querySelector('.change-added-image');

beforeUpload.addEventListener('click',(e)=>{
    uploadBtn.click();
})

const errorImg = document.querySelector('.pointToFollow img');
const errorMessege = document.querySelector('.pointToFollow p');
const userImageLink = document.querySelector('.userImageLink');
let fileExist = false;

function fileUploadFunction(file){
    const maxSize = 500 * 1024;
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    document.querySelector('.after-upload-img img').src = './assets/images/image-avatar.jpg';

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
        }
        fileExist = true;
    }
    else{
        alert("Please select a valid image file.");
    }
}
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName=>{
    inputAvtar.addEventListener(eventName,(e)=>{
        e.preventDefault();
    })
});
inputAvtar.addEventListener('dragover',()=>{
  inputAvtar.classList.add('dragover');
})

inputAvtar.addEventListener('dragleave',()=>{
  inputAvtar.classList.remove('dragover');
})
inputAvtar.addEventListener('drop',(e)=>{
    fileUploadFunction(e.dataTransfer.files[0])
})

uploadBtn.addEventListener('click',()=>{
    errorImg.src = './assets/images/icon-info.svg';
    errorMessege.innerText = 'Upload your photo (JPG, JPEG or PNG, max size: 500KB).';
    errorMessege.style.color = 'white';
})
uploadBtn.addEventListener('change',(e)=>{
    fileUploadFunction(e.target.files[0])

})
removeAddedImage.addEventListener('click',(e)=>{
    beforeUpload.style.display = 'flex';
    afterUpload.style.display = 'none';
})
changeAddedImage.addEventListener('click',()=>{
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
        submitBtn.children[0].href = './output.html';
    }
    fullName.value = '';
    email.value = '';
    githubUsername.value = '';
    userImageLink.src = './assets/images/image-avatar.jpg';
    fileExist = false;

    beforeUpload.style.display = 'flex';
    afterUpload.style.display = 'none';
    errorMessegeEmail.style.opacity = 0;
    errorMessege.style.color = 'white';
    errorImg.src = './assets/images/icon-info.svg';
})
email.addEventListener('input',()=>{
    errorMessegeEmail.style.opacity = 0;
})
beforeUpload.addEventListener('click',()=>{
    errorImg.src = './assets/images/icon-info.svg';
    errorMessege.style.color = 'white';
})
