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

function fileUploadFunction(file){
    const maxSize = 500 * 1024;
    const validTypes = ['image/jpg', 'image/png'];
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
            const imgURL = URL.createObjectURL(file);
            document.querySelector('.after-upload-img img').src = imgURL;
        }
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
    errorMessege.innerText = 'Upload your photo (JPG or PNG, max size: 500KB).';
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


const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const errorMessegeEmail = document.querySelector('.error-messege');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email.toLowerCase().endsWith("@gmail.com")) {
        errorMessegeEmail.style.opacity = 1;
        emailInput.value = "";
    } 
    else{
        alert("Form submitted successfully!");
    }
})
emailInput.addEventListener('input',()=>{
    errorMessegeEmail.style.opacity = 0;
})


