/* 
    Screw - A jQuery plugin
    ==================================================================
    ©2010 - 2012 JasonLau.biz - Version 1.0.7
    ==================================================================
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
*/

---------------------------------------------------------------------
Options
---------------------------------------------------------------------
Name: loadingHTML
Description: A string consisting of optional HTML which is displayed before the object is loaded.

---------------------------------------------------------------------
Classes
---------------------------------------------------------------------
Name: screw
Description: Applies Screw to this object. If you want to load your HTML from an external file use the rel attribute to hold the path to the (local) external file. This uses GET, so you can pass data using the query string. You can alternatively use the rev attribute to hold the HTML you want to load instead of using the rel attribute to load an external file.

Name: screw-before 
Description: Inserts the HTML before the object with this class.

Name: screw-after
Description: Inserts the HTML after the object with this class.

Name: screw-append
Description: Appends the HTML to the object with this class.

Name: screw-prepend
Description: Prepends the HTML to the object with this class.

Name: screw-repeat
Description: Repeats screw each time the trigger point is reached. This is for effects like continuous scrolling pages where data is appended to the bottom of the page as the user scrolls.

Name: screw-image
Description: Use the rel attribute to hold a image URL. The image will be preloaded and loaded into the object with this class. You do not need to use any other classes with this class.

Name: screw-remove
Description: Objects with this class are hidden when they are scrolled beyond the top or right of the viewport.

Name: screw-replace
Description: Replaces the object with internal or external data. Use the "rel" attribute to hold the URL for the external data, OR use the "rev" attribute to hold the HTML you want to load. External data is loaded using ajax GET so you may pass variables using the query string.

---------------------------------------------------------------------
Usage
---------------------------------------------------------------------
Call screw on the body selector, or any other scrollable object, and set up your HTML to utilize it.

<script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script> 
<script src="jquery.screw.js" type="text/javascript"></script>
<script type="text/javascript">
jQuery(function(){
   $('#my-div').screw();
});
</script>

<p class="screw" rev="&lt;img src='my-image.jpg' /&gt;"></p>
Or:
<p class="screw screw-before" rev="&lt;img src='my-image.jpg' /&gt;"></p>
Or:
<p class="screw-image" rel="my-image.jpg">Loading ... </p>
Or:
<p class="screw" rel="screw-test.php?key1=value&amp;key2=value"></p>
Or (endless scrolling):
<p class="screw screw-before screw-repeat" rev="&lt;img src='my-image.jpg' /&gt;"></p>

---------------------------------------------------------------------
Loading Page Fragments
---------------------------------------------------------------------
Add the data-load attribute to the screw object. Insert the id or class-name for the remote 
object you wish to load.

Example:
Loading by ID attribute -
<p class="screw screw-after" rel="screw-test.php?key1=value&amp;key2=value" data-load="#my-div"></p>

Loading by css class-name -
<p class="screw screw-after" rel="screw-test.php?key1=value&amp;key2=value" data-load=".my-class"></p>

---------------------------------------------------------------------
Project Home & Demo Pages
---------------------------------------------------------------------
http://jasonlau.biz/home/jquery/screw-a-jquery-plugin