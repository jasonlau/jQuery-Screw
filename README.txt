/* 
    Screw - A jQuery plugin
    ==================================================================
    ©2010 JasonLau.biz - Version 1.0.0
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
Description: A string consisting of optional HTML which is before the object is loaded. This option is only used if a insertion position class is not used.

---------------------------------------------------------------------
Classes
---------------------------------------------------------------------
Name: screw
Description: Applies Screw to this object. If you want to load your HTML from an external file use the rel attribute to hold the path to the (local) external file. This uses GET, so you can pass data using the query string. You can alternatively use the rev attribute to hold the HTML you want to load instead of using the rel attribute to load an external file.

Name: screw-before 
Description: Inserts the HTML before the object with this class.

Name: srew-after
Description: Inserts the HTML after the object with this class.

Name: screw-append
Description: Appends the HTML to the object with this class.

Name: screw-prepend
Description: Prepends the HTML to the object with this class.

Name: screw-repeat
Description: Repeats screw each time the trigger point is reached. This is for effects like continuous scrolling pages where data is appended to the bottom of the page as the user scrolls.

Name: screw-image
Description: Use the rel attribute to hold a image URL. The image will be loaded into the object with this class. You do not need to use the class 'screw' with this class.

---------------------------------------------------------------------
Usage
---------------------------------------------------------------------
Call srew on the body selector and set up your HTML to utilize it.

<script src="http://jasonlau.biz/javascript/jquery/latest/jquery-latest.js" type="text/javascript"></script> 
<script src="jquery.screw.js" type="text/javascript"></script>
<script type="text/javascript">
jQuery(function(){
   $('body').screw();
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