let requestId;
let svgDom, svgCanvas;

export function bgAnimationSetting(){

  const vue = this;
  let canvasW, canvasH;
  let refLength;
  let paths = [], angles = [];


  svgDom = this.$el.querySelector('#svgbg');
  svgCanvas = svgDom.querySelector('#svgCanvas');

  init();
  requestId = requestAnimationFrame(animateObjs);


  /*
   *
    function declarations
   *
  */

  // initialize animation
  // create 50 number of paths for each moving object.
  function init(){

    let bgrectbox = svgDom.querySelector('#bgrect').getBBox();
    let refPathGroup;
    let pathNum = 50, angleGap;

    canvasW = bgrectbox.width;
    canvasH = bgrectbox.height;

    if(canvasW < 800) pathNum = 40;
    if(canvasW < 500) pathNum = 30;

    refLength = Math.sqrt( canvasH*canvasH/4 + canvasW*canvasW/4 );
    refLength = Math.floor( refLength * 1.05 );

    refPathGroup = svgDom.querySelector('#curvepathWrapper');
    refPathGroup.setAttribute('transform',
                  `translate(${ Math.floor( canvasW/2 ) },${ Math.floor( canvasH/2 ) })`);


    angleGap = Math.floor( 360/pathNum );
    for(let i=0; i<360; i += angleGap){ angles.push(i); }

    angles.forEach((angle, index) => {
      let gclone = refPathGroup.cloneNode(true), pathclone;
      let obj = new Obj(index);

      pathclone = gclone.querySelector('path');
      gclone.setAttribute(
        'transform',
        `translate(${ Math.floor( canvasW/2 ) },${ Math.floor( canvasH/2 ) })
         rotate(${angle})`
      );

      svgCanvas.appendChild(gclone);

      obj.node = pathclone;
      obj.g = gclone;
      obj.initialize();

      paths.push(obj);
    });

  }

  // select width, length values of the moving object
  function selectObjDimension(n){
    const dset = [
      {length: 1, width: 15},
      {length: 20, width: 3},
      {length: 50, width: 1},
      {length: 200, width: 4},
      {length: 10, width: 10},
      {length: 80, width: 5},
    ];

    return (n)? dset[n%dset.length] :
                dset[ Math.floor( dset.length * Math.random() ) ];
  }

  // moving object constructor
  function Obj(i){

    this.dimension = selectObjDimension(i);
    this.currentdo = 0;
    this.vel = {
      init: ( (canvasW <= 600)? 6 : 8 ) + Math.random() * 5,
      curr: null,
      max: ( (canvasW <= 600)? 7 : 14 ) + Math.random() * 10,
      f: 1.06  + 0.04 * Math.random()
    };
    this.vel.curr = this.vel.init;

    this.cyabs = Math.random() * 0.08 * refLength;
    this.time = { start: null, delay: 20 * i };

    this.node = null;
    this.g = null;
    this.pathLength = null;


    /*
      task runner functions for the moving object
      TODO: declaring methods by 'Obj.prototype.func' instead.
    */

    // redraw the svg path based on the updated dimension values
    this.initialize = function(){

      this.node.setAttribute('d',
      `M0,0
       q${0.125*refLength},${(-1)*this.cyabs} ${0.25*refLength},0
       q${0.125*refLength},${this.cyabs} ${0.25*refLength},0
       q${0.125*refLength},${(-1)*this.cyabs} ${0.25*refLength},0
       q${0.125*refLength},${this.cyabs} ${0.25*refLength},0`);

      this.pathLength = this.node.getTotalLength();
      this.node.setAttribute('stroke-width', this.dimension.width);
      this.node.setAttribute('stroke-dasharray', `${this.dimension.length},${this.pathLength * 2}`);
      this.node.setAttribute('stroke-dashoffset', this.dimension.length);

      this.currentdo = this.dimension.length;
    };

    // update the position of the moving object
    this.update = function(t){

      if(this.time.start === null) this.time.start = t;

      if(this.time.start + this.time.delay > t) return;
      else {

        this.currentdo = this.currentdo + (-1) * this.vel.curr;

        this.vel.curr *=  this.vel.f;
        if( this.vel.curr > this.vel.max ) this.vel.curr = this.vel.max;

        this.node.setAttribute('stroke-dashoffset', this.currentdo);

        if( Math.abs( this.currentdo ) >= this.pathLength ){
          this.resetValues();
        }
      }
    };

    // reset relevant properties of the moving object
    this.resetValues = function(){

      this.cyabs = Math.random() * 0.125 * refLength;
      this.dimension = selectObjDimension();
      this.initialize();

      this.vel = {
        init: ( (canvasW <= 600)? 6 : 8 ) + Math.random() * 5,
        curr: null,
        max: ( (canvasW <= 600)? 7 : 14 ) + Math.random() * 10,
        f: 1.06  + 0.04 * Math.random()
      };
      this.vel.curr = this.vel.init;

      this.time.delay = Math.floor( 500 * Math.random() );
      this.time.start = null;
    };

  }

  // run requestAnimationFrame for animation
  function animateObjs(timeStamp){

    paths.forEach( path => {
      path.update(timeStamp);
    });

    requestId = requestAnimationFrame(animateObjs);
  }

};

// stop animation and remove all the moving objects
export function cancelBgAnimation(){
  voidCanvas();
  window.cancelAnimationFrame(requestId);
}

// restart animation
export function RestartBgAnimation(){

  cancelBgAnimation();
  bgAnimationSetting.call(this);
}

// removing all the moving abjects from svg canvas
function voidCanvas(){
  const cNode = svgCanvas.cloneNode(false);

  svgDom.replaceChild( cNode, svgCanvas );
  svgCanvas = svgDom.querySelector('g.svgCanvas');
}
