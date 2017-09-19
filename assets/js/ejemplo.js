
const bomb = '<i class="fa fa-bomb" aria-hidden="true"></i>';
const flag = '<i class="fa fa-flag" aria-hidden="true"></i>';
var rowIndex = 0;
var colIndex = 0;
var count = 48;
var win = 0;
var time = 0;
var flagCount = 7;
var bombCount = 0;
var bombs = [
  '<i class="fa fa-bomb" aria-hidden="true"></i>',
  '<i class="fa fa-bomb" aria-hidden="true"></i>',
  '<i class="fa fa-bomb" aria-hidden="true"></i>',
  '<i class="fa fa-bomb" aria-hidden="true"></i>',
  '<i class="fa fa-bomb" aria-hidden="true"></i>',
  '<i class="fa fa-bomb" aria-hidden="true"></i>',
  '<i class="fa fa-bomb" aria-hidden="true"></i>',
  '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '',
  '', '', '', '', '', '', '',
  '', '', '', '', '', '', '',
  '', '', '', '', '', '', '',
  '', '', '', '', '', '', '',
];


// start of game
$(".play").on("click", function () {

  // display bombs
  for (i=0; i<49; i++) {
    rand = Math.floor(Math.random() * count);
    $(".box").eq(i).html(bombs[rand]);
    bombs.splice(rand, 1);
    count--;
  }
  // display numbers
  for (i=0; i<49; i++) {
    bombCount = 0;
    rowIndex = $(".box").eq(i).parent().index();
    colIndex = $(".box").eq(i).index();
    
    if ($(".box").eq(i).html() !== bomb) {
      if ($(".row" + (rowIndex-1) + "-col" + (colIndex-1)).html() === bomb) {
          bombCount++;
          $(".box").eq(i).html("<span>" + bombCount + "</span>");
      }
      if ($(".row" + (rowIndex-1) + "-col" + (colIndex)).html() === bomb) {
          bombCount++;
          $(".box").eq(i).html("<span>" + bombCount + "</span>");
      }
      if ($(".row" + (rowIndex-1) + "-col" + (colIndex+1)).html() === bomb) {
          bombCount++;
          $(".box").eq(i).html("<span>" + bombCount + "</span>");
      }
      if ($(".row" + (rowIndex) + "-col" + (colIndex-1)).html() === bomb) {
          bombCount++;
          $(".box").eq(i).html("<span>" + bombCount + "</span>");
      }
      if ($(".row" + (rowIndex) + "-col" + (colIndex+1)).html() === bomb) {
          bombCount++;
          $(".box").eq(i).html("<span>" + bombCount + "</span>");
      }
      if ($(".row" + (rowIndex+1) + "-col" + (colIndex-1)).html() === bomb) {
          bombCount++;
          $(".box").eq(i).html("<span>" + bombCount + "</span>");
      }
      if ($(".row" + (rowIndex+1) + "-col" + (colIndex)).html() === bomb) {
          bombCount++;
          $(".box").eq(i).html("<span>" + bombCount + "</span>");
      }
      if ($(".row" + (rowIndex+1) + "-col" + (colIndex+1)).html() === bomb) {
          bombCount++;
          $(".box").eq(i).html("<span>" + bombCount + "</span>");
      }
    }
  }
  
  $("#modal").fadeOut();
  // run time
  timer = setInterval(function() {
    time++;
    $(".timeN").html(time);
  }, 1000);
});

// click handler
$(".box").on("click", function () {

  // click on bomb -> reveal this box in red + stops time + lose msg + reset
  if ( ($(this).html() === bomb) && (!$(this).hasClass("flagged")) ) {
    clearTimeout(timer);
    $(this).css("color", "#e74c3c");
    $(".box").css("background", "whitesmoke");
    $(".box").find("*").fadeIn();
    setTimeout(function () {
      reset();
    }, 1500);
  }
  // Forbid clicking on already clicked box
  // win click -> reveal this box + stops time + win msg + reset
  else if ( ($(this).html() !== bomb) && (win === 41) ) {
    clearTimeout(timer);
    $(this).css("background", "whitesmoke");
    $(this).find("*").fadeIn();
    $(".msg").html("You Win in " + time + " sec!");
    setTimeout(function() {
      reset();
    }, 1500);
  }
  
  // click on number -> reveal this box
  else if ( (!isNaN($(this).find("span").html())) && (!$(this).hasClass("flagged")) ) {
    $(this).css("background", "whitesmoke");
    $(this).find("*").fadeIn();
    win++;
  }
  
  // click on empty -> reveal this box + reveal linked area until number
  else if (!$(this).hasClass("flagged")) {
    $(this).css("background", "whitesmoke");
    $(this).find("*").fadeIn();
    win++;
    rowIndex = $(this).parent().index();
    colIndex = $(this).index();
    $(".row" + (rowIndex-1) + "-col" + (colIndex-1)).css("background", "whitesmoke").find("*").fadeIn();
    $(".row" + (rowIndex-1) + "-col" + (colIndex)).css("background", "whitesmoke").find("*").fadeIn();
    $(".row" + (rowIndex-1) + "-col" + (colIndex+1)).css("background", "whitesmoke").find("*").fadeIn();
    $(".row" + (rowIndex) + "-col" + (colIndex-1)).css("background", "whitesmoke").find("*").fadeIn();
    $(".row" + (rowIndex) + "-col" + (colIndex+1)).css("background", "whitesmoke").find("*").fadeIn();
    $(".row" + (rowIndex+1) + "-col" + (colIndex-1)).css("background", "whitesmoke").find("*").fadeIn();
    $(".row" + (rowIndex+1) + "-col" + (colIndex)).css("background", "whitesmoke").find("*").fadeIn();
    $(".row" + (rowIndex+1) + "-col" + (colIndex+1)).css("background", "whitesmoke").find("*").fadeIn();
  }
});

// flag handler
$(".box").on("contextmenu", function() {
    if (!$(this).hasClass("flagged") && flagCount > 0) {
      flagCount--;
      $(".flagN").html(flagCount);
      $(this).toggleClass("flagged");
    }
    else if ($(this).hasClass("flagged") && flagCount >= 0) {
      flagCount++;
      $(".flagN").html(flagCount);
      $(this).toggleClass("flagged");
    }
  return false;
});

function reset () {
  $(".box").removeClass("flagged");
  $(".box").html("").css("background", "#2980b9").css("color", "#333");
  $("#modal").fadeIn();
  $(".play").html("REPLAY");
  time = 0;
  flagCount = 7;
  $(".flagN").html(flagCount);
  $(".timeN").html(time);
  count = 48;
  win = 0;
  bombs = [
    '<i class="fa fa-bomb" aria-hidden="true"></i>',
    '<i class="fa fa-bomb" aria-hidden="true"></i>',
    '<i class="fa fa-bomb" aria-hidden="true"></i>',
    '<i class="fa fa-bomb" aria-hidden="true"></i>',
    '<i class="fa fa-bomb" aria-hidden="true"></i>',
    '<i class="fa fa-bomb" aria-hidden="true"></i>',
    '<i class="fa fa-bomb" aria-hidden="true"></i>',
    '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '',
    '', '', '', '', '', '', '',
    '', '', '', '', '', '', '',
    '', '', '', '', '', '', '',
    '', '', '', '', '', '', '',
  ];
}
