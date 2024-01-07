const currentTime = document.querySelector('h1'),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll('select'),
setAlarmBtn = document.querySelector('button');

let alarmTime, isAlarmSet = false,
ringtone = new Audio("files/ringtone.mp3");

for (let i = 12; i > 0; i--){
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}
for (let i = 59; i >= 0; i--){
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}
for (let i = 2; i > 0; i--){
  let amPm= i == 1 ? "AM" : "PM";
  let option = `<option value="${amPm}">${amPm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
  // Getting hour, mins secs
  let date = new Date(),
  h = date.getHours(),
  m = date.getMinutes(),
  s = date.getSeconds(),
  amPm= "AM"

  if (h >= 12) {
    h = h - 12;
    amPm = "PM";
  }
  // If hour value is 0, set this value to 12
  h = h == 0 ? h = 12 : h;
  // adding 0 before hr, min, sec if this value if less then 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${amPm}`;

  if(alarmTime == `${h}:${m} ${amPm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

function setAlarm(){
  if(isAlarmSet){
    alarmTime = ""
    ringtone.pause();
    content.classList.remove('disable');
    setAlarmBtn.innerHTML = "Set Alarm";
    return isAlarmSet = false // return isAlarmSet value to false
  }

  // getting hour, minute, ampm select tag value
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if(time.includes("Hour") || time.includes("Mintue") || time.includes("AM/PM")){
    return alert("Please, select a valid time to set Alarm !");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add('disable');
  setAlarmBtn.innerHTML = "Reset";
}
setAlarmBtn.addEventListener("click", setAlarm);