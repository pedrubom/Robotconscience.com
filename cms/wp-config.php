<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp_v5');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '|qz9B)uZNP t=6dIJ0)4#^]xK-]Wu016Jt.7hpSb@#Dp$.j<4USz6I{A;k9)<ul!');
define('SECURE_AUTH_KEY',  'U-LS1s[Ncv;lMdhWZ+nmWB$fD^(hX 3PMPYlYeE`=pVG527^w=12uu/Vhfbx+k3M');
define('LOGGED_IN_KEY',    '>n)bAC; k92NQt.2@99z<6@@47NJdMvQ{,|-Vh%wDZ%cHOzL5y+>)s=^aj5_l$*i');
define('NONCE_KEY',        'O0k)QX@g4J#P&x(2ML)!zj8>gpqt;yTib8H~[t/ji>W.E6p;q]nIY[OzY]F5IOq}');
define('AUTH_SALT',        '5:>GE9}N.((`lhW?V K-MQ.0[wWO2;Jw4;WGsD?1u{{R=?+s;mT,(739c}>_hYjM');
define('SECURE_AUTH_SALT', 'fP*3P1S|BkD,rb0_x/2nE^x]8nANk.J)%RwI,#=;%OfZTqk6b&sUi+$.V;GE`]-[');
define('LOGGED_IN_SALT',   'aMumSt_z~<c9{~]s)j};28).<W]<~_Fx>rS!Z#t4VzaeltM<dYXl~$.e4[;XY%e;');
define('NONCE_SALT',       'a9EW]Y!/j3*6|n-X,:p1OA]dLZ}w=f`v8%x&x&[DZR`4wLt*)hQpiVAOcgBL/nu{');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
