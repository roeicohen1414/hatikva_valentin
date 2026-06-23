if(self.location==top.location)
{
  var URL = window.location.href.substr(window.location.protocol.length+2+window.location.hostname.length);
  self.location='/#'+URL;
}
