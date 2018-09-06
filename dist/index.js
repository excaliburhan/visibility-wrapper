(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('visibilityjs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'visibilityjs'], factory) :
  (factory((global.visibilityWrapper = {}),null));
}(this, (function (exports,Visibility) { 'use strict';

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
      return Visibility.unbind(id);
    }
    return Visibility.stop(id);
  }
  function VisibilityClear() {
    ids.forEach(function (id) {
      VisibilityStop(id);
    });
  }
  function VisibilityChange(callback) {
    if (isSupported) {
      var _id = Visibility.change(function (e, state) {
        callback(state);
      });
      ids.push(_id);
      return _id;
    }
    var id = Visibility.every(1000, 1000, function () {
      var state = Visibility.hidden() ? 'hidden' : 'visible';
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

  exports.VisibilityStop = VisibilityStop;
  exports.VisibilityClear = VisibilityClear;
  exports.VisibilityChange = VisibilityChange;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
