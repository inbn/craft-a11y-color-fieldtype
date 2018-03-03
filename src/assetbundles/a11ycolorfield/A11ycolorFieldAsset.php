<?php
/**
 * A11y color fieldtype plugin for Craft CMS 3.x
 *
 * A color field which gives WCAG 2.0 color contrast ratios
 *
 * @link      https://iainbean.com
 * @copyright Copyright (c) 2018 Iain Bean
 */

namespace inbn\a11ycolorfieldtype\assetbundles\a11ycolorfield;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * A11ycolorFieldAsset AssetBundle
 *
 * AssetBundle represents a collection of asset files, such as CSS, JS, images.
 *
 * Each asset bundle has a unique name that globally identifies it among all asset bundles used in an application.
 * The name is the [fully qualified class name](http://php.net/manual/en/language.namespaces.rules.php)
 * of the class representing it.
 *
 * An asset bundle can depend on other asset bundles. When registering an asset bundle
 * with a view, all its dependent asset bundles will be automatically registered.
 *
 * http://www.yiiframework.com/doc-2.0/guide-structure-assets.html
 *
 * @author    Iain Bean
 * @package   A11yColorFieldtype
 * @since     1.0.0
 */
class A11ycolorFieldAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * Initializes the bundle.
     */
    public function init()
    {
        // define the path that your publishable resources live
        $this->sourcePath = "@inbn/a11ycolorfieldtype/assetbundles/a11ycolorfield/dist";

        // define the dependencies
        $this->depends = [
            CpAsset::class,
        ];

        // define the relative path to CSS/JS files that should be registered with the page
        // when this asset bundle is registered
        $this->js = [
            'js/A11ycolor.js',
        ];

        $this->css = [
            'css/A11ycolor.css',
        ];

        parent::init();
    }
}
