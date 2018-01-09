$t1 = 0; // not open, 1- open
$t2 = 0; // not open, 1- open
$t3 = 0; // color not randomized for scanlines
var animationInterval;

$(function(){
  // make dropdowns visible
  $("#bresenham-pr").click(function() {
    $("#dropdown1").toggle('fast');

    if($t1 == 0) {
      $("#trigger1").html("&#9650;");
      $t1 = 1;
    } else {
      $("#trigger1").html("&#9660;");
      $t1 = 0;
    }
  });

  $("#triangle-pr").click(function() {
    $("#dropdown2").toggle('fast');

    if($t2 == 0) {
      $("#trigger2").html("&#9650;");
      $t2 = 1;
    } else {
      $("#trigger2").html("&#9660;");
      $t2 = 0;
    }
  });

  // randomize buttons
  $("#rdmz1").click(function() {
    $slope = Math.random();
    $x1 = Math.floor((Math.random() * 690) + 0);
    $y1 = Math.floor((Math.random() * 340) + 0);
    $x2 = $x1+Math.floor((Math.random() * (700-($x1+1))) + 1);
    $y2 = $y1+Math.floor((Math.random()*(350-($y1+1)))+1);
    $rgb1 = Math.floor((Math.random() * 255) + 0); // r
    $rgb2 = Math.floor((Math.random() * 255) + 0); // g
    $rgb3 = Math.floor((Math.random() * 255) + 0); // b

    $("#tbox1-x1").val($x1);
    $("#tbox1-y1").val($y1);
    $("#tbox1-x2").val($x2);
    $("#tbox1-y2").val($y2);
    $("#tbox1-r1").val($rgb1);
    $("#tbox1-r2").val($rgb2);
    $("#tbox1-r3").val($rgb3);
  });

  $("#rdmz2").click(function() {
    $x1 = Math.floor((Math.random() * 700) + 0);
    $y1 = Math.floor((Math.random() * 300) + 0);
    $x2 = Math.floor((Math.random() * 700) + 0);
    $y2 = Math.floor((Math.random() * 300) + 0);
    $x3 = Math.floor((Math.random() * 700) + 0);
    $y3 = Math.floor((Math.random() * 300) + 0);
    $rgb1 = Math.floor((Math.random() * 255) + 0); // r 
    $rgb2 = Math.floor((Math.random() * 255) + 0); // g
    $rgb3 = Math.floor((Math.random() * 255) + 0); // b

    $("#tbox2-x1").val($x1);
    $("#tbox2-y1").val($y1);
    $("#tbox2-x2").val($x2);
    $("#tbox2-y2").val($y2);
    $("#tbox2-x3").val($x3);
    $("#tbox2-y3").val($y3);
    $("#tbox2-r1").val($rgb1);
    $("#tbox2-r2").val($rgb2);
    $("#tbox2-r3").val($rgb3);
  });

  // create buttons
  $("#crte1").click(function() {
    bresenham($("#tbox1-x1").val(),$("#tbox1-y1").val(),$("#tbox1-x2").val(),$("#tbox1-y2").val(),$("#tbox1-r1").val(),$("#tbox1-r2").val(),$("#tbox1-r3").val());
  });

  $("#crte2").click(function() {
    drawTriangle($("#tbox2-x1").val(),$("#tbox2-y1").val(),$("#tbox2-x2").val(),$("#tbox2-y2").val(),$("#tbox2-x3").val(),$("#tbox2-y3").val(),$("#tbox2-r1").val(),$("#tbox2-r2").val(),$("#tbox2-r3").val());
  });

  // animation handlers
  $("#rdmz3").click(function() {
    // start the animation
    animationInterval = setInterval(randomizer,100);
  });

  $("#crte3").click(function() {
    // stop animation
    clearInterval(animationInterval);
  });

  // clean up
  $("#clrbtn").click(function() {
    var canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 700, 350);
    }
  });

  $("#tbox2-randcolor").click(function() {
    if($t3 == 0) {
      // disable input
      $("#tbox2-r1").prop('disabled', true);
      $("#tbox2-r2").prop('disabled', true);
      $("#tbox2-r3").prop('disabled', true);
      $t3 = 1;
    } else {
      // enable input
      $("#tbox2-r1").prop('disabled', false);
      $("#tbox2-r2").prop('disabled', false);
      $("#tbox2-r3").prop('disabled', false);
      $t3 = 0;
    }
  });
});

// randomizer
function randomizer() {
  var rm = Math.floor(Math.random()*10);
  if(rm>=5) {
    // draw line
    var slope = Math.random()*0.9;
    var b = Math.floor(Math.random()*350)-Math.floor(Math.random()*350);
    var x1 = Math.floor(Math.random()*699);
    var x2 = x1+Math.floor(Math.random()*(701-x1))+1;
    var y1 = (slope*x1)+b;
    var y2 = (slope*x2)+b;
    var r = Math.floor((Math.random() * 255) + 0); // r
    var g = Math.floor((Math.random() * 255) + 0); // g
    var b = Math.floor((Math.random() * 255) + 0); // b

    bresenham(x1, y1, x2, y2, r, g, b);
  } else {
    // draw triangle
    var sx1 = Math.floor((Math.random() * 700)); // multiply by a random factor to make coordinates smaller?
    var sy1 = Math.floor((Math.random() * 300));
    var sx2 = Math.floor((Math.random() * 700));
    var sy2 = Math.floor((Math.random() * 300)); 
    var sx3 = Math.floor((Math.random() * 700));
    var sy3 = Math.floor((Math.random() * 300));
    var srgb1 = Math.floor((Math.random() * 255) + 0); // r 
    var srgb2 = Math.floor((Math.random() * 255) + 0); // g
    var srgb3 = Math.floor((Math.random() * 255) + 0); // b

    drawTriangle(sx1, sy1, sx2, sy2, sx3, sy3, srgb1, srgb2, srgb3);
  }
}

// The bresenham algorithm
function bresenham(x1, y1, x2, y2, r, g, b) {
  x1 = parseInt(x1);
  y1 = parseInt(y1);
  x2 = parseInt(x2);
  y2 = parseInt(y2);

  var dy = (y2-y1);
  var dx = (x2-x1);
  var dparam = (2*dy)-dx;

  if(((y2-y1)/(x2-x1))>1 || (x2-x1)==0 || (y2-y1)<0 || (x2-x1)<0 || (x2-x1)==0){
    alert("Can't implement Bresenham since slope is either greater than 1 or less than 0");
    return; // break out of loop
  }

  while(x1<=x2) {
    drawPixel(x1, y1, r, g, b);
    if(dparam > 0) {
      y1 = y1+1;
      dparam = dparam-2*dx;
    }
    dparam = dparam+(2*dy);

    x1++;
  }
}

// The scanline triangle method
function drawTriangle(x1, y1, x2, y2, x3, y3, r, g, b) {
  x1 = parseInt(x1);
  y1 = parseInt(y1);
  x2 = parseInt(x2);
  y2 = parseInt(y2);
  x3 = parseInt(x3);
  y3 = parseInt(y3);

  var type = 0; // 0- flat top, 1- flat bottom, 2- 3 distinct points
  var top_x1 = 0, top_y1 = 0, top_x2 = 0, top_y2 = 0;
  var bot_x1 = 0, bot_y1 = 0, bot_x2 = 0, bot_y2 = 0;
  var misc_x = 0, misc_y = 0;

  // find highest point
  if(y1 >= y2 && y1 >= y3) {
    if(y1 > y2 && y1 > y3) {
      if(y3 != y2) {
        type = 2;

        top_x1 = x1; top_y1 = y1;
        if(y2<=y3){ bot_x1 = y2; bot_y1 = y2; misc_x = x3; misc_y = y3;}
        if(y2>y3) { bot_x1 = y3; bot_y1 = y3; misc_x = x2; misc_y = y2;}

      } else if(y3 == y2) {
        type = 1;

        if(x2<=x3){ bot_x1=x2; bot_y1=y2; bot_x2=x3; bot_y2=y3; }
        if(x2>x3) { bot_x1=x3; bot_y1=y3; bot_x2=x2; bot_y2=y2; }
        top_x1=x1; top_y1=y1;
      }
    } else if(y1 == y2 && y1 != y3) {
      type = 0;

      if(x1<=x2){ top_x1=x1; top_y1=y1; top_x2=x2; top_y2=y2; }
      if(x1>x2) { top_x1=x2; top_y1=y2; top_x2=x1; top_y2=y1; }
      bot_x1=x3; bot_y1=y3;

    } else if(y1 == y3 && y1 != y2) {
      type = 0;

      if(x1<=x3){ top_x1=x1; top_y1=y1; top_x2=x3; top_y2=y3; }
      if(x1>x3) { top_x1=x3; top_y1=y3; top_x2=x1; top_y2=y1; }
      bot_x1=x2; bot_y1=y2;

    } else if(y1 == y3 && y1 == y2) {
      alert("The coordinates you gave do not represent a triangle. Please try again.");
      return;
    }
  } else if(y2 >= y1 && y2 >= y3) {
    if(y2 > y1 && y2 > y3) {
      if(y1 != y3) {
        type = 2;

        top_x1 = x2; top_y1 = y2;
        if(y1<=y3){ bot_x1 = y1; bot_y1 = y1; misc_x = x3; misc_y = y3;}
        if(y1>y3) { bot_x1 = y3; bot_y1 = y3; misc_x = x1; misc_y = y1;}
      } else if(y1 == y3) {
        type = 1;

        if(x1<=x3){ bot_x1=x1; bot_y1=y1; bot_x2=x3; bot_y2=y3; }
        if(x1>x3) { bot_x1=x3; bot_y1=y3; bot_x2=x1; bot_y2=y1; }
        top_x1=x2; top_y1=y2;
      }
    } else if(y2 == y1 && y2 != y3) {
      type = 0;

      if(x1<=x2){ top_x1=x1; top_y1=y1; top_x2=x2; top_y2=y2; }
      if(x1>x2) { top_x1=x2; top_y1=y2; top_x2=x1; top_y2=y1; }
      bot_x1=x3; bot_y1=y3;

    } else if(y2 == y3 && y2 != y1) {
      type = 0;

      if(x2<=x3){ top_x1=x2; top_y1=y2; top_x2=x3; top_y2=y3; }
      if(x2>x3) { top_x1=x3; top_y1=y3; top_x2=x2; top_y2=y2; }
      bot_x1=x1; bot_y1=y1;

    } else if(y2 == y3 && y2 == y1) {
      alert("The coordinates you gave do not represent a triangle. Please try again.");
      return;
    }
  } else if(y3 >= y1 && y3 >= y2) {
    if(y3 > y1 && y3 > y2) {
      if(y1 != y2) {
        type = 2;

        top_x1 = x3; top_y1 = y3;
        if(y1<=y2){ bot_x1 = y1; bot_y1 = y1; misc_x = x2; misc_y = y2;}
        if(y1>y2) { bot_x1 = y2; bot_y1 = y2; misc_x = x1; misc_y = y1;}
      } else if(y1 == y2) {
        type = 1;

        if(x1<=x2){ bot_x1=x1; bot_y1=y1; bot_x2=x2; bot_y2=y2; }
        if(x1>x2) { bot_x1=x2; bot_y1=y2; bot_x2=x1; bot_y2=y1; }
        top_x1=x3; top_y1=y3;
      }
    } else if(y3 == y2 && y3 != y1) {
      type = 0;

      if(x2<=x3){ top_x1=x1; top_y1=y1; top_x2=x3; top_y2=y3; }
      if(x2>x3) { top_x1=x3; top_y1=y3; top_x2=x1; top_y2=y1; }
      bot_x1=x1; bot_y1=y1;

    } else if(y3 == y1 && y3 != y2) {
      type = 0;

      if(x1<=x3){ top_x1=x1; top_y1=y1; top_x2=x3; top_y2=y3; }
      if(x1>x3) { top_x1=x3; top_y1=y3; top_x2=x1; top_y2=y1; }
      bot_x1=x2; bot_y1=y2;

    } else if(y3 == y2 && y3 == y1) {
      alert("The coordinates you gave do not represent a triangle. Please try again.");
      return;
    }
  }

  if(type == 0) {
    flatTTriangle(top_x1, top_x2, top_y1, bot_x1, bot_y1, r, g, b); 
  } else if(type == 1) {
    flatBTriangle(top_x1, top_y1, bot_x1, bot_x2, bot_y1, r, g, b);
  } else {
    // do FlatBTriangle first until middle point reached, then FlatTTriangle function
    //flatBTriangle(5, 58, 6, 60, 30, r, g, b); test
    //flatTTriangle(6, 60, 30, 6, 20, r, g, b);
    var slp1 = (top_y1-bot_y1)/(top_x1-bot_x1);
    var beebe = top_y1-(slp1*top_x1);
    var halfwaypoint = Math.round((misc_y-beebe)*(1/slp1));

    flatBTriangle(top_x1, top_y1, halfwaypoint, misc_x, misc_y, r, g, b);
    flatTTriangle(halfwaypoint, misc_x, misc_y, bot_x1, bot_y1, r, g, b);

    //flatBTriangle(top_x1, top_y1, bot_x1, misc_x, misc_y, r, g, b);
    //flatTTriangle(bot_x1, misc_x, misc_y, bot_x1, bot_y1, r, g, b);
  }

}

// drawing pixels function
function drawPixel(x, y, r, g, b) {
  y = 350-y; // since y is flipped
  var canvas = document.getElementById('myCanvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle="rgb("+r+","+g+","+b+")";
    ctx.fillRect(x, y, 1, 1);
  }
}



// flat bottom triangle iteration
function flatBTriangle(xs, ys, xe1, xe2, ye, r, g, b) {
  var xs2 = xs;
  var sc_start = xs, sc_end = xs2;
  var linx1 = xs, linx2 = xs;
  var slope1 = (ye-ys)/(xe1-xs), slope2 = (ye-ys)/(xe2-xs); // left side, right side

  while(ys>=ye) {
    sc_start = xs, sc_end = xs2;

    // randomize color for scanline if box is checked
    if($t3 == 1) {
      r = Math.floor((Math.random() * 255) + 0); // r 
      g = Math.floor((Math.random() * 255) + 0); // g
      b = Math.floor((Math.random() * 255) + 0); // b
    }

    while(sc_start<=sc_end) {
      drawPixel(sc_start, ys, r, g, b);
      sc_start++;
    }

    ys--;

    linx1 -= (1/slope1); // for each y--, move linx1 of x left
    xs = Math.round(linx1); // we only use integers for scanline

    linx2 -= (1/slope2); // for each y--, move linx2 of x right
    xs2 = Math.round(linx2); // we only use integers for scanline
  }
}

// flat top triangle iteration
function flatTTriangle(xs1, xs2, ys, xe, ye, r, g, b) {
  var sc_start = xs1, sc_end = xs2;
  var linx1 = xs1, linx2 = xs2;
  var slope1 = (ye-ys)/(xe-xs1), slope2 = (ye-ys)/(xe-xs2); // left side, right side

  while(ys>=ye) {
    sc_start = xs1, sc_end = xs2;
    
    // randomize color for scanline if box is checked
    if($t3 == 1) {
      r = Math.floor((Math.random() * 255) + 0); // r 
      g = Math.floor((Math.random() * 255) + 0); // g
      b = Math.floor((Math.random() * 255) + 0); // b
    }

    while(sc_start<=sc_end) {
      drawPixel(sc_start, ys, r, g, b);
      sc_start++;
    }

    ys--;

    linx1 -= (1/slope1); // keeping tab on the real line
    xs1 = Math.round(linx1); // we only use integers for scanline

    linx2 -= (1/slope2); // keeping tab on the real line
    xs2 = Math.round(linx2); // we only use integers for scanline
  }
}