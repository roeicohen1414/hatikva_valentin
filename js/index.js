$(function(){
  var URL = window.location.hash.substr(1);
  if(URL>'')
    top.frames['main'].document.location.href = URL;
});
