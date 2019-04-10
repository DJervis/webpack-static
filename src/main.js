import Swiper from 'swiper';
import './assets/less/base.less';
import Util from './assets/js/common';

function sayHi() {
  var element = $('div');
  element.html('hi! webpack!');
  $('#main').append(element);
}
// sayHi();

Util.sayHi()

new Swiper()