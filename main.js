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
      Axis.createInterval(a, 'firstTerm');

      Axis.bindEvents();

      // //Templates
      // Axis.$intervals = $('#intervals-box');
      // Axis.$templateInterval = $('#interval-template').html();
    },

    bindEvents: function() {
      $('#' + Axis.target +'_firstTerm').keyup(Axis.inputHandler);
      $('#' + Axis.target +'_secondTerm').keyup(Axis.inputHandler);
      $('#' + Axis.target + '_sum').keyup(Axis.equationHandler);
    },
    
    createEquation: function(firstTerm, secondTerm) {
      var a = createEquationElement(firstTerm, 'term', 'first');
      var b = createEquationElement(secondTerm, 'term', 'second');

      $('#' + Axis.target + ' .equation').append(a, [
        createEquationElement('+', 'action', 'plus'),
        b,
        createEquationElement('=', 'action', 'equal'),
        createEquationElement('?', 'result', 'sum')
      ]);
    },

    createInterval: function (length, id) {
      var interval = document.createElement('div');
      var input = document.createElement('input');
      var img = document.createElement('img');
      $(interval)
        .attr('id', id)
        .attr('class', 'interval');
      $(input)
        .attr('id', Axis.target + '_' + id)
        .attr('type', 'text');
      $(img)
        .attr('src', Axis.imgSrc)
        .attr('width', length*Axis.intervalSizeX)
        .attr('height', length*Axis.intervalSizeY);
      $(interval).append(input, img);
      $('#' + Axis.target + ' .intervals-box').append(interval);
    },
    
    inputHandler: function (data) {
      //console.log(data);
      var id = data.target.attributes['id'].nodeValue;
      var key = id.split('_')[1];
      if (+data.key === Axis[key]) {
        $('#' + Axis.target + '_' + key.slice(0, -4)).css('background-color', 'white');
        $(data.target).replaceWith('<p>' + Axis[key] + '</p>');
        Axis.nextStep(id);
      } else {
        console.log(key.slice(0, -4));
        $('#' + Axis.target + '_' + key.slice(0, -4)).css('background-color', 'orange');
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

    nextStep: function (id) {
      console.log(id);
      if(id.slice(-9) === 'firstTerm') {
        Axis.createInterval(Axis.secondTerm, 'secondTerm');
        Axis.bindEvents();
      } else {
        $('#' + Axis.target + '_sum').replaceWith('<input id="' + Axis.target + '_sum"' + ' ' + 'class=' + '"equation__sum' + '">');
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

  function createEquationElement(value, className, id) {
    var elem = document.createElement('div');
    elem.appendChild(document.createTextNode(value));
    $(elem)
      .attr('id', Axis.target + '_' + id)
      .attr('class', 'equation__'+className);
    return elem;
  }

  Axis.init('main', 39, 11, getRandomInt(6, 9), getRandomInt(11, 14));
  //Axis.createInterval('#intervals-box', 'arrow.svg', 3);
});