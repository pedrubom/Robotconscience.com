=== Tweet Import ===
Contributors: afiouni
Tags: twitter, tweet, favorites, list, user timeline, tags, hashtags, admin, multiple authors, import
Requires at least: 2.8
Tested up to: 2.9.2
Stable Tag: 1.3.1

== Description ==

Tweet Import is a WordPress plugin that imports Twitter tweets from multiple Twitter accounts and lists into WordPress. By importing tweets, Tweet Import actually creates WordPress regular posts using the content of the imported tweets. It allows importing Twitter feeds to different categories, and allows tagging imported tweets using user defined tags and/or the tweet content #hashtags. Tweet Import requires no authentication and can be used to import the user posted tweets and retweets from the specified Twitter accounts and lists.

= Legal Notice =
Copying content created by other people and claiming ownership is unethical and illegal. Please use this plugin in a decent and legal way. The author of this plugin is not responsible for any misuse or infringement of any legal laws caused by bad use of this plugin.

= Features =
Tweet Import allows importing the following types of Twitter feeds:

* *User Public Timeline*: the public feed of a specific user account. This includes the tweets and retweets posted by the account owner of the Twitter user
* *Favorites Feed*: includes the tweets favorite by the Twitter user
* *List*: The tweets that appear on a user created list

For every imported feed, Tweet Import supports the following options:

* Assign a specific author for the imported tweets. This is useful if multiple authors use the same WordPress installation
* Import Twets to a specific category
* Add user defined tags to the imported tweets and created posts
* Identify Twitter user names and make them clickable to their Twitter public profile pages
* Extract #hashtags from the tweet content and add them as tags to the created posts
* Make #hashtags clickable to either the Twitter search page or locally to the tag page on the local site
* Remove the name of the Twitter author [ @name: ] prefix from imported tweets
* Identify links in tweet content and make them clickable to their respective URL's

== Installation ==
Try the automated installation this plugin allows by trying it at [plugin page](http://skinju.com/wordpress/tweet-import "http://skinju.com/wordpress/tweet-import")

You can of course follow the stanard installation process. Just follow those simple steps.

1. Upload the entire Tweet Import directory to the /wp-content/plugins/ directory
2. Activate the plugin from the Plugins admin menu in WordPress

= Usage =
1. Activating this plugin will add a new admin menu section called skinju with a link to Tweet Import configuration page in it
2. Go to skinju -> Tweet Import and add/edit feeds and set their options

== Like this plugin? ==

= Keep up to date =
If you like this work, you can keep up to date with the latest news and releases of skinju packages and plugins. You can:

* Follow [skinju on Twitter](http://twitter.com/skinju "http://twitter.com/skinju") to keep up to date on bug fixes and releases

= Let Others Know =
You can also help spread the word and let others know about it. You can:

* Link to skinju website http://skinju.com/
* Give the plugins good ratings on the plugin pages on WordPress.org

== Screenshots ==

1. skinju Admin Menu Section: This is Where the Tweet Import menu item is added after activating the plugin
2. Twitter Feed Info: Define the Twitter User name or list name to be imported
3. Import Options: Chose what Author and Category to assign to new posts, add user defined tags or the tweet #hashtags to created posts, make Twitter names clickable to their Twitter account, #hashtags options to make them clickable locally to tags pages or to the Twitter search page, and remove the prefix @name from tweets
4. Feeds Info: A complete description of the already added feeds for importing. Options include Activating/Deactivation a feed, updating its options, or deleting it. Also an option to reset statistics is included
5. Global Configuration: Chose how often Tweet Import should check for new tweets. Options include: Once Every 15 Minutes, Four Times a Day, Once Hourly, Twice Daily, and Once Daily


== Changelog ==

= 1.3.1 =
* Implemented a workaround for PHP 4 error: Parse error, unexpected T_OBJECT_OPERATOR, expecting ',' or ';' in .../wordpress/wp-content/plugins/tweet-import.php on line 347

= 1.3 =
* Added a new filter to allow changing the caching duration of the Twitter response to go hand in hand with more frequent updates

= 1.2.3 =
* Added the option to remove the [ @name: ] prefix from imported tweets
* Added a link to the auto install option on the [plugin page](http://skinju.com/wordpress/tweet-import "http://skinju.com/wordpress/tweet-import")

= 1.2.2 =
* Added the Twitter name for the imported tweet in a new meta (custome field): 'tweetimport_twitter_author'
* Fixed some inconsistencies related to @name parsing. Some names did miss the "@" sign when converted to yperlinks
* Kept the ":" character displayed after the author name in imported tweets when the user @name is converted to hyperlink

= 1.2.1 =
* Added Screenshots

= 1.2 =
* Added the ability to import lists
* Added the ability to import Favorites
* Added the option to create #hashtag links to Twitter and locally
* Added display of the error message when the feed URL is malformed due to a bad account or list name

= 1.1 =
* Initial Release
