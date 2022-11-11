const uploader=document.querySelector('#uploader')
const uploadedPhoto=document.querySelector('#uploadedPhoto')
const result=document.querySelector('.result')

uploadedPhoto.addEventListener('click',_=>uploader.click())

uploader.addEventListener('change',_=>{
    [...uploader.files].forEach(currentPhoto=>{

        const reader=new FileReader();
        reader.readAsDataURL(currentPhoto);
        reader.addEventListener('load',e=>{
            const newImage=new Image();
            newImage.classList.add('w-100','my-3','rounded-3','animate__animated','animate__backInDown')
            newImage.src=e.target.result;
            result.append(newImage)
        })
    })




})