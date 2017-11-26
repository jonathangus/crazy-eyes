import throttle from 'lodash/throttle';
import isMobile from 'ismobilejs';

console.log('Inspired by http://www.supah.it/')

const GyroNorm = require('gyronorm/dist/gyronorm.complete.js');
const eyes = [...document.querySelectorAll('.eye')];
const container = document.querySelector('.container');

const onMotion = (data) => {
  const { gy, gx, gz } = data.dm;
  eyes.forEach(eye => {
    eye.style.transform = `translate3d(${gx * 1.2}px, ${-gy * 1.2}px, 0)`;
  });
}

const gn = new GyroNorm();

(async () => {
  await gn.init({
    frequency: 150,
    decimalCount:2,
  }).catch(e => console.log(e))
  gn.start(onMotion);
})();

if(!isMobile.any) {
  const el = document.createElement('section');
  el.innerHTML = 'Go to this site on your phone. Otherwise nothing will happend I will just look crazy.';
  document.querySelector('.container').appendChild(el);
}

