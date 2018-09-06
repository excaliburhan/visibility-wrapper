import { unbind, stop, change, every, hidden } from 'visibilityjs';

var isSupported = document.hidden !== undefined;
var ids = [];
var timerState = 'visible';

function VisibilityStop(id) {
  var index = ids.findIndex(function (v) {
    return v === id;
  });
  if (index !== -1) {
    ids.splice(index, 1); // 删除 id
  }
  if (isSupported) {
    return unbind(id);
  }
  return stop(id);
}
function VisibilityClear() {
  ids.forEach(function (id) {
    VisibilityStop(id);
  });
}
function VisibilityChange(callback) {
  if (isSupported) {
    var _id = change(function (e, state) {
      callback(state);
    });
    ids.push(_id);
    return _id;
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
