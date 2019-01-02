export default function(){

  const vue = this, mainDom = this.$el;
  let cloud, plane;

  cloud = mainDom.querySelector('.cloudwrapper');
  plane = mainDom.querySelector('.planewrapper');

  for(let i=1; i<=7; i++){
    let clonedNode = cloud.cloneNode(true);

    clonedNode.classList.add(`cloud-${i}`);
    clonedNode.style.display = 'block';

    mainDom.appendChild(clonedNode);
  }

  for(let j=1; j<=2; j++){
    let clonedNode = plane.cloneNode(true);

    clonedNode.classList.add(`plane-${j}`);
    clonedNode.style.display = 'block';
    
    mainDom.appendChild(clonedNode);
  }

};
