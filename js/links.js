$(function(){
  $('a').click(aMenuItem_OnClick);
});

function aMenuItem_OnClick(e)
{
  parent.window.location.hash = $(this).attr('href');
}
