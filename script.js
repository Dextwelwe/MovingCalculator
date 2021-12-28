let time_start = new Date();
let time_end = new Date();
let difference;
let minutesRound;
let minutes;
let rate;
let transport = 0;
let isTaxes = false;
let res;
let minutesDecimal;
let taxFEDcalc =0 ;
let taxProvcalc =0;
window.addEventListener('load', dates());   



function calculate(){
  time_start.setHours((document.getElementById("time_start").value).substring(0,2),(document.getElementById("time_start").value).substring(3,5));
  time_end.setHours((document.getElementById("time_current").value).substring(0,2),(document.getElementById("time_current").value).substring(3,5));
  transport = document.getElementById("transport_fee").value;
  if (document.getElementById("taxYES").checked) {  isTaxes = true;}
  rate = document.getElementById("rate").value;
  difference = ((time_end - time_start) / 3.6000E+6);
  minutesRound = difference.toString().split(".");
  minutes = Math.round(((difference - minutesRound[0])* 60) * 10) /10 ; 
  switch (minutes){
   case 55:
     minutesRound[0] = parseInt(minutesRound[0]) + 1;
     minutes = 0;
     break;
  }
  if (minutesRound[0] < 2){
    minutesRound[0] = 2;
    minutes = 0;
  }
  minutesDecimal = (minutes /60).toFixed(3);
  res = ((parseInt(minutesRound[0]) * rate) + (minutesDecimal * rate) + (transport * rate)) ;
  if(isTaxes){
    taxFEDcalc = res * 0.05;
    taxProvcalc = res * 0.09975;
    res = res + taxFEDcalc;
    res = res + taxProvcalc;
  }
  res = res.toFixed(2);
// modal
  document.getElementById("modal_txt").classList.remove('d-none');
  document.getElementById("modal_txt").classList.add('fs-5');
  document.getElementById("modal_txt").innerHTML = "TOTAL : " + ((res - taxFEDcalc) - taxProvcalc).toFixed(2) + '$';
  if (isTaxes){
    console.log(isTaxes);
    document.getElementById("modal_txt1").classList.remove("d-none");
    document.getElementById("modal_txt1").classList.add('fs-5');
    document.getElementById("modal_txt1").innerHTML = "TOTAL + TPS/TVQ: " + res + '$';
    document.getElementById("modal_txt2").classList.remove('d-none');
    document.getElementById("modal_txt2").classList.add('fs-5');
    document.getElementById("modal_txt2").innerHTML = "TPS : " + taxFEDcalc.toFixed(2) + "$";
    document.getElementById("modal_txt3").classList.remove('d-none');
    document.getElementById("modal_txt3").classList.add('fs-5');
    document.getElementById("modal_txt3").innerHTML = "TVQ : " + taxProvcalc.toFixed(2) + "$";
    isTaxes = false;
  } else {
    document.getElementById("modal_txt1").classList.add("d-none");
    document.getElementById("modal_txt2").classList.add("d-none");
    document.getElementById("modal_txt3").classList.add("d-none");
  }
if (minutes == 0){
  document.getElementById("modal_txt4").classList.remove('d-none');
  document.getElementById("modal_txt4").classList.add('fs-5');
  document.getElementById("modal_txt4").innerHTML = "HOURS : " + minutesRound[0] + "H" + " + " + transport + "H OF TRANSPORT FEES";

}else{
  document.getElementById("modal_txt4").classList.remove('d-none');
  document.getElementById("modal_txt4").classList.add('fs-5');
  document.getElementById("modal_txt4").innerHTML = "HOURS : " + minutesRound[0] + "H " + minutes  + "M + " + transport + "H OF TRANSPORT FEES";
}

  document.getElementById("modal_txt5").classList.remove('d-none');
  document.getElementById("modal_txt5").classList.add('fs-5');
  document.getElementById("modal_txt5").innerHTML = "RATE :" + rate + "$/H";
}

function dates() {
  console.log('abc');
  $("#time_start").timepicker({
    timeFormat: 'HH:mm',
    interval: 5,
    minTime: '06',
    maxTime: '23:55',
    startTime: '06:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});
$("#time_current").timepicker({
  timeFormat: 'HH:mm',
  interval: 5,
  minTime: '06',
  maxTime: '23:55',
  startTime: '06:00',
  dynamic: false,
  dropdown: true,
  scrollbar: true
});
}