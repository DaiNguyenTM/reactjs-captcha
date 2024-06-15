'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Copyright Captcha, Inc. 2004-2024. All rights reserved.

BotDetect, BotDetect CAPTCHA, Lanap, Lanap CAPTCHA, Lanap BotDetect, 
Lanap BotDetect CAPTCHA, Lanapsoft, Lanapsoft CAPTCHA, 
Lanapsoft BotDetect, Lanapsoft BotDetect CAPTCHA, and Lanap Software 
are trademarks of Captcha, Inc. All other product, brand, and company 
names are mentioned for identification purposes only and are trademarks 
or registered trademarks of their respective owners.

Captcha, Inc. - formerly: Lanapsoft, Inc. / Lanap, Inc.
*/

var CaptchaSettings = function () {
  function CaptchaSettings() {
    _classCallCheck(this, CaptchaSettings);
  }

  _createClass(CaptchaSettings, null, [{
    key: 'save',
    value: function save(formId, settings) {
      localStorage.setItem('captchasettings_' + formId, JSON.stringify(settings));
    }
  }, {
    key: 'load',
    value: function load(formId) {
      var settings = null;
      var saved = localStorage.getItem('captchasettings_' + formId);
      if (saved) {
        settings = JSON.parse(saved);
      }
      return settings;
    }
  }]);

  return CaptchaSettings;
}();

exports.default = CaptchaSettings;
//# sourceMappingURL=captcha-settings.js.map