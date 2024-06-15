'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _captchaSettings = require('./captcha-settings');

var _captchaSettings2 = _interopRequireDefault(_captchaSettings);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _jsCaptchaIntegrationCore = require('javascript-captcha/es6/js-captcha-integration-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright Captcha, Inc. 2004-2023. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               BotDetect, BotDetect CAPTCHA, Lanap, Lanap CAPTCHA, Lanap BotDetect, 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Lanap BotDetect CAPTCHA, Lanapsoft, Lanapsoft CAPTCHA, 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Lanapsoft BotDetect, Lanapsoft BotDetect CAPTCHA, and Lanap Software 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               are trademarks of Captcha, Inc. All other product, brand, and company 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               names are mentioned for identification purposes only and are trademarks 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               or registered trademarks of their respective owners.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Captcha, Inc. - formerly: Lanapsoft, Inc. / Lanap, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var pluginInfo = {
  plugin: 'reactjs-captcha',
  pluginId: '203',
  releaseNo: '4.5.0-RC2',
  requiredCoreReleaseNo: '4.5.0-RC2'
};

var Captcha = function (_React$Component) {
  _inherits(Captcha, _React$Component);

  function Captcha(props) {
    _classCallCheck(this, Captcha);

    var _this = _possibleConstructorReturn(this, (Captcha.__proto__ || Object.getPrototypeOf(Captcha)).call(this, props));

    _this.captchaTagId = 'captcha_tag_' + _this.props.captchaFormId;
    _this.isCaptchaRendered = false;
    return _this;
  }

  _createClass(Captcha, [{
    key: 'componentDidMount',


    // generate captcha html markup in view
    value: function componentDidMount() {
      var captchaFormId = this.props.captchaFormId;
      var settings = _captchaSettings2.default.load(captchaFormId);
      if (settings && !this.isCaptchaRendered) {
        this.isCaptchaRendered = true;
        var captcha = Captcha.createCaptchaInstance(settings);
        this.displayCaptcha(captcha, captchaFormId);
      }
    }
  }, {
    key: 'displayCaptcha',
    value: function displayCaptcha(captcha, captchaFormId) {
      var captchaTag = document.getElementById('captcha_tag_' + captchaFormId);

      if (!captchaTag) {
        var errorMessage = 'Could not find captcha tag. \n    Please add <Captcha captchaFormId="{0}"/> element in your component template.\n      ';
        throw new Error(_helpers2.default.string.format(errorMessage, captchaFormId));
      }

      captcha.getHtml(function (captchaHtml) {
        captchaTag.innerHTML = captchaHtml;
      }, function (errorMessage) {
        captchaTag.innerHTML = errorMessage;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { id: this.captchaTagId });
    }
  }, {
    key: 'releaseNo',
    get: function get() {
      return pluginInfo.releaseNo;
    }
  }], [{
    key: 'createCaptchaInstance',
    value: function createCaptchaInstance(settings) {
      settings = sanitizeSettings(settings);

      executeRequiredCoreReleaseNoCheck();
      executeRequiredSettingsCheck(settings);

      var captcha = (0, _jsCaptchaIntegrationCore.createJsCaptchaIntegrationCoreInstance)(settings);
      captcha.integrationType = pluginInfo.callerPluginId;

      _captchaSettings2.default.save(settings.captchaFormId, settings);

      return captcha;
    }
  }]);

  return Captcha;
}(_react2.default.Component);

function sanitizeSettings(settings) {
  var sanitized = {};
  for (var key in settings) {
    var value = settings[key];
    sanitized[key] = _helpers2.default.sanitizer.sanitize(value);
  }
  return sanitized;
}

function executeRequiredSettingsCheck(settings) {
  if (!(settings.captchaFormId && settings.captchaEndpointUrl && settings.languageTag)) {
    var errorMessage = 'Invalid captcha settings!\n  The React Captcha Component requires the three "captchaFormId", "captchaEndpointUrl", and "languageTag" properties to be set.\n  For example: \n  constructor(): {\n    this.captcha = Captcha.createCaptchaInstance({\n      captchaFormId: \'your_form\',\n      languageTag: \'en-US\',\n      captchaEndpointUrl: \'https://your-app-backend-hostname.your-domain.com/simple-captcha-endpoint-url\'\n    });\n  }\n    ';
    throw new Error(errorMessage);
  }
}

function executeRequiredCoreReleaseNoCheck() {
  var reportError = false;

  var callerPlugin = pluginInfo.plugin;
  var callerReleaseNo = pluginInfo.releaseNo;
  var callerRequiredCoreReleaseNo = pluginInfo.requiredCoreReleaseNo;
  var runningCoreReleaseNo = (0, _jsCaptchaIntegrationCore.getJsCaptchaIntegrationCoreReleaseNo)();

  // report error if runningCoreReleaseNo < callerRequiredCoreReleaseNo
  if (_helpers2.default.versionCompare(runningCoreReleaseNo, callerRequiredCoreReleaseNo) === -1) {
    reportError = true;
  }

  if (reportError) {
    var errorMessage = 'You are using \'{0}\' plugin r{1}\n  You are using \'javascript-captcha\' plugin r{3}\n  The \'{0}\' plugin r{1} requires \'javascript-captcha\' plugin r{2} or higher\n    ';
    throw new Error(_helpers2.default.string.format(errorMessage, callerPlugin, callerReleaseNo, callerRequiredCoreReleaseNo, runningCoreReleaseNo));
  }
}

exports.default = Captcha;
//# sourceMappingURL=captcha.js.map