
const wsUri = ("wss://websocket-movements.app.dev.invertironline.com");
let intervalId;
const websocket = new WebSocket(wsUri);



const init = ()  =>{
    websocket.onopen = (evt) => { onOpen(evt) };
    websocket.onclose = (evt) => { onClose(evt) };
    websocket.onmessage = (evt) => { onMessage(evt) };
    websocket.onerror = (evt) => { onError(evt) };
    nbr=0;
    intervalId = setInterval(() => {
        websocket.send("{'action':'ping'}");
    }, 6000);
  }

  const onOpen = (evt)  =>{
    writeLog(`Connected to: <span style="color: blue;"> ${ wsUri} </span>`,'header');
    // doSend("{'action':'auth','username': '"+ usuario +"' ,'password':'" + pass + "'}");
  }

  const onClose = (evt)  =>{
    writeLog("Disconnected from:<br>" + wsUri);
  }

  const onMessage = (evt)  =>{
    console.log(JSON.parse( evt.data));
    var data = {date:new Date().toLocaleString(), ...JSON.parse( evt.data )  }
    nbr++;
    document.getElementById('reception').innerHTML= JSON.stringify(data, null, 3)
    document.getElementById('nbr').innerHTML=('<span style="color: blue;">Response #<b>' + nbr + '</b> transmitted</span>');
  }

  const onError = (evt)  =>{
    writeLog('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  const doSend = (message)  =>{
    console.log(message);
    writeLog("Sent: " + JSON.stringify( message));
    websocket.send(JSON.stringify( message ));
  }

  const writeLog = (message,type)  =>{
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML += message;
    document.getElementById(`${ type ==='header'? 'header': 'log'    }`).appendChild(pre);
  }

  window.addEventListener("load", init, false);
  window.addEventListener("beforeunload", ()=>{
    clearInterval(intervalId);
    websocket.close 
}, false);