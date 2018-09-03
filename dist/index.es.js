import { stop, change, every, hidden } from 'visibilityjs';

var isSupported = document.hidden !== undefined;
var ids = [];
var timerState = 'visible';

var VisibilityStop = stop;
function VisibilityClear() {
  ids.forEach(function (id) {
    stop(id);
  });
}
function VisibilityChange(callback) {
  if (isSupported) {
    change(function (e, state) {
      callback(state);
    });
    return false;
  }
  var id = every(1000, 1000, function () {
    var state = hidden() ? 'hidden' : 'visible';
    if (state === 'hidden' && timerState === 'visible') {
      callback('hidden');
      timerState = 'hidden';
    } else if (state === 'visible' && timerState === 'hidden') {
      callback('visible');
      timerState = 'visible';
    }
  });
  ids.push(id);
  return id;
}

export { VisibilityStop, VisibilityClear, VisibilityChange };
