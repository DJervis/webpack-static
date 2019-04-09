import _ from 'lodash';
import $ from 'jquery';
import Swiper from 'swiper';
import './assets/less/base.less';

function sayHi() {
  var element = $('div');
  element.html('hi! webpack!');
  $('#main').append(element);
}
// sayHi();
