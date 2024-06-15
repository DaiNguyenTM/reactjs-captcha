"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var helpers = {
  string: {
    format: function format() {
      var str = arguments[0];
      for (var index in arguments) {
        var regex = new RegExp("\\{" + (index - 1) + "\\}", "g");
        str = str.replace(regex, arguments[index]);
      }
      return str;
    }
  },

  sanitizer: {
    sanitize: function sanitize(input) {
      input = input.replace(/[^a-zA-Z0-9\.\-\_\~\!\$\&\(\)\*\+\,\;\=\:\@\%\#\/\?]/gim, '');
      return input;
    }
  },

  versionCompare: function versionCompare(version1, version2) {
    version1 = version1.toLowerCase();
    var version1Parts = version1.split('.');
    var majorVersion1 = parseInt(version1Parts[0]);
    var minorVersion1 = parseInt(version1Parts[1]);
    var pathVersion1 = void 0,
        rcVersion1 = void 0;
    var pathVersion1String = version1Parts[2];
    if (pathVersion1String.indexOf('-rc') !== -1) {
      // version1 is RC version
      var pathVersion1StringParts = pathVersion1String.split('-rc');
      pathVersion1 = parseInt(pathVersion1StringParts[0]);
      rcVersion1 = parseInt(pathVersion1StringParts[1]);
    } else {
      pathVersion1 = parseInt(version1Parts[2]);
    }

    version2 = version2.toLowerCase();
    var version2Parts = version2.split('.');
    var majorVersion2 = parseInt(version2Parts[0]);
    var minorVersion2 = parseInt(version2Parts[1]);
    var pathVersion2 = void 0,
        rcVersion2 = void 0;
    var pathVersion2String = version2Parts[2];
    if (pathVersion2String.indexOf('-rc') !== -1) {
      // version2 is RC version
      var pathVersion2StringParts = pathVersion2String.split('-rc');
      pathVersion2 = parseInt(pathVersion2StringParts[0]);
      rcVersion2 = parseInt(pathVersion2StringParts[1]);
    } else {
      pathVersion2 = parseInt(version2Parts[2]);
    }

    if (majorVersion1 > majorVersion2) {
      return 1;
    } // version1 > version2
    if (majorVersion1 < majorVersion2) {
      return -1;
    } // version1 < version2

    if (minorVersion1 > minorVersion2) {
      return 1;
    } // version1 > version2
    if (minorVersion1 < minorVersion2) {
      return -1;
    } // version1 < version2

    if (pathVersion1 > pathVersion2) {
      return 1;
    } // version1 > version2
    if (pathVersion1 < pathVersion2) {
      return -1;
    } // version1 < version2

    if (rcVersion1 && rcVersion2) {
      if (rcVersion1 > rcVersion2) {
        return 1;
      } // version1 > version2
      if (rcVersion1 < rcVersion2) {
        return -1;
      } // version1 < version2
    }

    return 0; // version1 = version2
  }
};

exports.default = helpers;
//# sourceMappingURL=helpers.js.map