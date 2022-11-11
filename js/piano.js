showLoader();



const sounds=[
    {sound:"C4", keycode:65},
    {sound:"D4", keycode:83},
    {sound:"E4", keycode:68},
    {sound:"F4", keycode:70},
    {sound:"G4", keycode:74},
    {sound:"A4", keycode:75},
    {sound:"B4", keycode:76},
    {sound:"C5", keycode:186},
    ]




const keyboard=document.querySelector("#keyboard")


function getSoundUrl(keyName){
    return "sounds/"+keyName+".mp3"
}

function showLoader(){
    const loaderDiv=document.createElement('div');
    loaderDiv.classList.add('loader')
    loaderDiv.innerHTML=`
        <div class="vh-100 d-flex justify-content-center align-items-center fixed-top">
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `
    document.body.append(loaderDiv)
}
function removeLoader(){
    const loader=document.querySelector('.loader');
    loader.remove()
}


sounds.forEach(({sound,keycode})=>{
    const keyBtn=document.createElement("div")
    keyBtn.classList.add("col");
    keyBtn.innerHTML=`<div key="${sound}" class="key bg-warning d-flex justify-content-center rounded-2 align-items-end fs-5 text-white"><p class="pe-none">${sound}</p></div>
        <audio src="sounds/${sound}.mp3" contorls></audio>
`

    keyboard.append(keyBtn)
})


document.querySelectorAll(".key").forEach(key=>{
    key.addEventListener("click",_=>{
        const currentPressKey=key.getAttribute("key");
        const currentAudio=document.querySelector(`[src*= ${currentPressKey}]`)
        currentAudio.play()
    })
})

document.addEventListener('keyup',e=>{
    const condition=sounds.find(({sound,keycode})=>keycode===e.keyCode);
    console.log(condition)
    if(condition){
        // const currentSound=document.querySelector(`[src*=${condition.sound}]`);


        const currentSound=new Audio()
        currentSound.src=`sounds/${condition.sound}.mp3`
        currentSound.play();

     const currentKey=document.querySelector(`[key=${condition.sound}]`)
        currentKey.classList.add('active')

        // setTimeout(_=>currentKey.currentTime=0,200)
        currentKey.addEventListener('transitionend',_=>{
            // currentKey.classList.add('active')
            currentKey.classList.remove('active')
        })
    }
})

window.addEventListener('load',_=>{
    console.log('loading is finish');
    removeLoader()
})