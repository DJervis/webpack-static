import Swiper from 'swiper';
import Util from '../assets/js/common';
import '../assets/less/base.less';
import '../assets/less/page/a.less';

function sayHi() {
  var element = $('div');
  element.html('hi! here is pageA!');
  $('#page-wrapper').append(element);
}
sayHi();

new Swiper()

Util.sayHi()