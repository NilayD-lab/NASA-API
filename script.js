//4tuFbbP1EHOrCYHe1fjM98UJIKfyMIWiU8xq5tDT
let image = document.createElement('img')
let video = document.createElement('iframe')
let fowardBtn = document.getElementById('foward')
let backBtn = document.getElementById('backward')
let url = 'https://api.nasa.gov/planetary/apod?api_key=4tuFbbP1EHOrCYHe1fjM98UJIKfyMIWiU8xq5tDT&date='
let timeStamp = document.querySelector('h2')
let explanation = document.getElementById('para')

let date = new Date()
date.setDate(date.getDate())
timeStamp.innerHTML = "" + date.toDateString()

changeDate(date)
fowardBtn.onclick = () => {
    date.setDate(date.getDate() - 1)
    changeDate(date)
}

backBtn.onclick = () => {
    if (date.getDate() != new Date().getDate()){
        date.setDate(date.getDate() + 1)
        changeDate(date)
    }
        
}
window.onkeydown = (e) => {
    if (e.key == "ArrowLeft" && date.getDate() != new Date().getDate()) {
        date.setDate(date.getDate() + 1)
        changeDate(date)
    }
    else if (e.key == "ArrowRight") {
        date.setDate(date.getDate() - 1)
        changeDate(date)
    }
}
function formatDate(d) {
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
function changeDate(date) {
    fetch(url + formatDate(date))
        .then(response => response.json())
        .then(data => {
            if (("" + data.url).includes("youtube")) {
                video.src = data.url
                image.remove()
                foward.parentNode.insertBefore(video, foward)
            }
            else {
                image.src = data.url
                video.remove()
                foward.parentNode.insertBefore(image, foward)

            }
            timeStamp.innerText = "" + date.toDateString()
            explanation.innerText = data.explanation
        })
}