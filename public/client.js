function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  var aDay = 24*60*60*1000;
  console.log(timeSince(new Date(Date.now())));
  console.log(timeSince(new Date(Date.now()-aDay*2)));
  
  


const socket = io()
let nm; //name
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let color;


do{
    nm = prompt('Please enter your name: ')
    var colors = ['#fe1d22', '#220ef2', '#d31815', ,'#989c30','#a8ad03', '#9c6430', '#563790', '#d98f07' ,'#17d6a6','#cd66b9', '#42f2f5','#65d688', '#3a8c81', '#dbaacc', '#4f6a36', '#99134d'];
    color = colors[Math.floor(Math.random() * colors.length)];   
}while(!nm)

function sendMessage(message){

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let msg = {
        user: nm,
        time: time,
        message: message.trim(),
        colour: color
    }
    //Append the message
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // Send to Server
              // event name- message       2nd arg -  object 
    socket.emit('message',  msg);

}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
    <h4>${msg.user} - ${msg.time}</h4>
    <p>${msg.message}</p>
    `;
    if(type=="incoming")
      mainDiv.style.backgroundColor = msg.colour;
    mainDiv.innerHTML = markup;
    
    // console.log(mainDiv.innerHTML);

    messageArea.appendChild(mainDiv);
}

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})





//Recieve messages

socket.on('message', (msg)=>{
    console.log('client side mssg receive',msg);
    appendMessage(msg,'incoming');
    scrollToBottom();
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}