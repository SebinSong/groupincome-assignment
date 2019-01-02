export default function(sliderDOM){

  const vue = this;
  const lefts = {
    'n1': '2%', 'n2': '34%', 'n3': '66%', 'n4': '98%'
  };

  let filler, obj, track, marks = {}, texts = {};
  let objPos;

  /*
    click event: texts
    mousedown, touchstart: obj
    mouseup, mousemove, touchmove, touchend, touchcancel event:
    window
  */

  init();
  eventsOnTextsAndTrack();
  eventsOnObject();

  /*
   *
    Function declarations
   *
  */

  function init(){

    obj = sliderDOM.querySelector('.object');
    filler = sliderDOM.querySelector('.filled');
    track = sliderDOM.querySelector('.track');

    objPos = obj.getBoundingClientRect();

    marks.n1 = sliderDOM.querySelector('.mark._1');
    marks.n2 = sliderDOM.querySelector('.mark._2');
    marks.n3 = sliderDOM.querySelector('.mark._3');
    marks.n4 = sliderDOM.querySelector('.mark._4');

    texts.n1 = sliderDOM.querySelector('.text._1');
    texts.n2 = sliderDOM.querySelector('.text._2');
    texts.n3 = sliderDOM.querySelector('.text._3');
    texts.n4 = sliderDOM.querySelector('.text._4');
  }


  function eventsOnTextsAndTrack(){

    for(let key in texts){
      texts[key].addEventListener('click', function(evt){
        evt.stopPropagation();

        slideTo(lefts[key]);
      });
    }

    track.addEventListener('click', function(evt){
      const xFromLeftEdge =
              evt.clientX - track.getBoundingClientRect().left;

      slideTo( lefts[ nearestPoint(xFromLeftEdge) ] );

    });

  }

  function eventsOnObject(){

    let touchCurrentP;

    // mouse events
    obj.addEventListener('mousedown', evt => {
      console.log('mousedown fired!');
      evt.stopPropagation();

      window.addEventListener('mousemove', MouseMoveHandler);
    });

    // touch events
    obj.addEventListener('touchstart', evt => {
      evt.preventDefault();
      // prevent 'mousedown' from firing.

      window.addEventListener('touchmove', TouchMoveHandler);
      window.addEventListener('touchend', TouchEndAndCancelHandler);
      window.addEventListener('touchcancel', TouchEndAndCancelHandler);
    });


    /* Handler functions */
    function MouseMoveHandler(evt){
      evt.preventDefault();

      let trackBox, trackLeft, trackW, toX, toP;

      trackBox = track.getBoundingClientRect();
      trackLeft = trackBox.left;
      trackW = trackBox.width;

      toX = Math.floor( evt.clientX - trackLeft );

      if(toX < 0) toX = 0;
      if(toX > trackW) toX = trackW;

      toP = toX / trackW * 100;
      if(toP < 2) toP = 2;
      if(toP > 98) toP = 98;
      toP += '%';

      if(evt.buttons == 0){
        window.removeEventListener("mousemove", MouseMoveHandler);
        slideTo( lefts[ nearestPoint(toX) ] );
      }
      else {
        obj.style.left = toP;
        setWidthOfFiller(toP);
      }

    }

    // touchmove handler
    function TouchMoveHandler(evt){
      evt.preventDefault();

      const touch = evt.changedTouches[0];
      let trackBox, trackLeft, trackW, toX, toP;

      trackBox = track.getBoundingClientRect();
      trackLeft = trackBox.left;
      trackW = trackBox.width;

      toX = Math.floor( touch.clientX - trackLeft );

      if(toX < 0) toX = 0;
      if(toX > trackW) toX = trackW;
      touchCurrentP = toX;

      toP = toX / trackW * 100;
      if(toP < 2) toP = 2;
      if(toP > 98) toP = 98;
      toP += '%';

      obj.style.left = toP;
      setWidthOfFiller(toP);

    }

    // touchend, touchcancel
    function TouchEndAndCancelHandler(evt){

      slideTo( lefts[ nearestPoint(touchCurrentP) ] );
      touchCurrentP = null;

      window.removeEventListener('touchmove', TouchMoveHandler);
      window.removeEventListener('touchend', TouchEndAndCancelHandler);
      window.removeEventListener('touchcancel', TouchEndAndCancelHandler);
    }

  }

  /*
  *
    helper functions
  *
  */

  function setWidthOfFiller(value){
    filler.style.width = value;
  }


  function nearestPoint(x){

    const xValues = { n1: 2, n2: 34, n3: 66, n4: 98 };
    let trackW, xPercent, nearestP = null, nearestDistance;

    trackW = track.getBoundingClientRect().width;
    xPercent = x/trackW * 100;

    for(let key in xValues){

      let distance = Math.abs(xPercent - xValues[key]);

      if(nearestP === null){
        nearestP = key;
        nearestDistance = distance;
      }
      else if(distance < nearestDistance){
        nearestP = key;
        nearestDistance = distance;
      }
    }

    return nearestP;
  }

  function slideTo(desP){
    // animate the motion of the slider

    const fontSizes = {
      '2%': '11px', '34%': '13px', '66%': '15px', '98%': '17px'
    };
    let trackW, chosenFontSize;
    let currentP, initP, toP;
    let requestID, ani = { vcurr: 10, vmax: 40, f: 1.07, sign: 1 };

    chosenFontSize = fontSizes[desP];
    trackW = track.getBoundingClientRect().width;
    toP = Math.floor ( parseInt(desP, 10) / 100 * trackW );

    initP
        = parseInt (
            window.getComputedStyle(obj).getPropertyValue('left'), 10 );
    currentP = initP;


    ani.sign = (toP - initP < 0)? -1 : 1;

    requestID = window.requestAnimationFrame(animate);

    function animate(){

      currentP += ani.vcurr * ani.sign;

      if(ani.sign === -1)
        currentP = (currentP <= toP)? toP : currentP;
      else
        currentP = (currentP >= toP)? toP : currentP;

      ani.vcurr *= ani.f;
      if(ani.vcurr >= ani.vmax) ani.vcurr = ani.vmax;

      obj.style.left = `${currentP}px`;
      filler.style.width = `${currentP}px`;

      if(currentP === toP){
        obj.style.left = desP;
        filler.style.width = desP;

        window.cancelAnimationFrame(requestID);
        vue.$root.$data.changeBaseFontSize(chosenFontSize);
      }
      else
        requestID = window.requestAnimationFrame(animate);
    }
  }

};
