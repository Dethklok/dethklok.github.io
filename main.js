;
$(document).ready(function () {

  var Axis = {

    init: function(target, intervalSizeX, intervalSizeY, a, sum) {
      Axis.target = target;
      Axis.intervalSizeX = intervalSizeX;
      Axis.intervalSizeY = intervalSizeY;
      Axis.firstTerm = a;
      Axis.secondTerm = sum - a;
      Axis.sum = sum;
      Axis.imgSrc = 'arrow.svg';
      Axis.createEquation(Axis.firstTerm, Axis.secondTerm);
      Axis.createInterval(a, ['interval', 'first-interval']);

      Axis.bindEvents();

      // //Templates
      // Axis.$intervals = $('#intervals-box');
      // Axis.$templateInterval = $('#interval-template').html();
    },

    bindEvents: function() {
      $('.' + Axis.target +'_interval' + ' input').keyup(Axis.inputHandler);
      $('.' + Axis.target + '_sum').keyup(Axis.equationHandler);
    },
    
    createEquation: function(firstTerm, secondTerm) {
      var a = createEquationElement(firstTerm, ['term', 'first']);
      var b = createEquationElement(secondTerm, ['term', 'second']);

      $('#' + Axis.target + ' .equation').append(a, [
        createEquationElement('+', ['action', 'plus']),
        b,
        createEquationElement('=', ['action', 'equal']),
        createEquationElement('?', ['result', 'sum'])
      ]);
    },

    createInterval: function (length, classNames) {
      var interval = document.createElement('div');
      var input = document.createElement('input');
      var img = document.createElement('img');

      $(interval).addClass('interval');

      classNames.forEach(function(className) {
        $(interval).addClass(Axis.target + '_' + className);
      });

      $(input)
        //.attr('class', Axis.target + '_' + id)
        .attr('type', 'text');

      $(img)
        .attr('src', Axis.imgSrc)
        .attr('width', length*Axis.intervalSizeX)
        .attr('height', length*Axis.intervalSizeY);

      $(interval).append(input, img);

      $('#' + Axis.target + ' .intervals-box').append(interval);
    },
    
    inputHandler: function (data) {
      var target = data.target;

      if(data.key == +data.key) {
        $(target).val(data.key);
      } else {
        $(target).val('');
      }

      var term = $(target).parent().hasClass(Axis.target + '_first-interval') ? 'firstTerm' : 'secondTerm';

      if (+data.key === Axis[term]) {
        $('.' + Axis.target + '_' + term.slice(0, -4)).css('background-color', 'white');
        $(data.target).replaceWith('<p>' + Axis[term] + '</p>');
        Axis.nextStep(term);
      } else {
        $('.' + Axis.target + '_' + term.slice(0, -4)).css('background-color', 'orange');
        $(data.target).css('color', 'red');
      }
    },

    equationHandler: function(data) {
      if (+data.target.value === Axis.sum) {
        $(data.target).replaceWith('<div>' + Axis.sum + '</div>' );
      } else {
        $(data.target).css('color', 'red');
      }
    },

    nextStep: function (term) {
      if(term === 'firstTerm') {
        Axis.createInterval(Axis.secondTerm, ['interval', 'second-interval']);
        $('.' + Axis.target + '_second-interval').css('left', Axis.intervalSizeX*Axis.firstTerm);
        Axis.bindEvents();
      } else {
        $('.' + Axis.target + '_sum').replaceWith('<input class="' + Axis.target + '_sum equation__sum">');
        Axis.bindEvents();
      }
    }
  };

  /***************************
   * UTILS
   ***************************/
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createEquationElement(value, classNames) {
    var elem = document.createElement('div');
    elem.appendChild(document.createTextNode(value));
    $(elem).addClass('equation__elem')
    classNames.forEach(function(className) {
      $(elem).addClass(Axis.target + '_' + className);
    });
    return elem;
  }

  Axis.init('main', 39, 11, getRandomInt(6, 9), getRandomInt(11, 14));
  //Axis.createInterval('#intervals-box', 'arrow.svg', 3);
});