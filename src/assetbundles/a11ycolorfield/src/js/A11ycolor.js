/**
 * A11y color fieldtype plugin for Craft CMS
 *
 * A11ycolor Field JS
 *
 * @author    Iain Bean
 * @copyright Copyright (c) 2018 Iain Bean
 * @link      https://iainbean.com
 * @package   A11yColorFieldtype
 * @since     1.0.0A11yColorFieldtypeA11ycolor
 */

var ColorContrastChecker = require('color-contrast-checker');

(function ($, window, document, undefined) {
  var pluginName = 'A11yColorField';
  var defaults = {};

  // Plugin constructor
  function Plugin (element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function (id) {
      var _this = this;

      this.colorContrastChecker = new ColorContrastChecker();

      $(function () {
        var $colorFieldContainer = $(_this.element);

        _this.$colorField = $colorFieldContainer
          .find('[name="fields[' + _this.options.id + ']"]');

        // Add event listener
        _this.$colorField.on('input', $.proxy(_this.updateColorContrast, _this));
      });
    },

    updateColorContrast: function () {
      var contrastColor = this.options.contrastColor;
      var fieldColor = this.$colorField[0].value;
      var fontSize = 14;

      // Check if this is a valid 3 or 6 character hex code
      if (this.colorContrastChecker.isValidColorCode(fieldColor)) {
        // Get the ratio
        var l1 = this.colorContrastChecker.hexToLuminance(contrastColor); /* higher value */
        var l2 = this.colorContrastChecker.hexToLuminance(fieldColor); /* lower value */
        var contrastRatio = this.colorContrastChecker.getContrastRatio(l1, l2);
        // Is it valid?
        console.log(this.colorContrastChecker.check(contrastColor, fieldColor, fontSize));
      } else {
        console.log('Invalid Hex');
      }
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
