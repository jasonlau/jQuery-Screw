<!-- 
/* 
    Screw - A jQuery plugin
    ==================================================================
    ©2010-2012 JasonLau.biz - Version 1.0.7
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

(function($){
 	$.fn.extend({ 
 		screw: function(options) {
			var defaults = {
			 loadingHTML : 'Loading ... '
			},
            option =  $.extend(defaults, options); 
            var obj = $(this), screw_timeout;
            return this.each(function() {              
               var is_viewable = function(mother, baby){
                var x1 = mother.offset().left,
                    y1 = mother.offset().top,
                    w = mother.outerWidth(),
                    h = mother.outerHeight();
                var xp1 = baby.offset().left,
                    yp1 = baby.offset().top,
                    wp = baby.outerWidth(),
                    hp = baby.outerHeight();
                var x2 = x1+w,
                    y2 = y1+h,
                    xp2 = xp1+wp,
                    yp2 = yp1+hp;
                if(xp1 >= x1 && xp1 <= x2){
                    if(yp1 >= y1 && yp1 <= y2){
                        return true;
                    } else if(y1 >= yp1 && y1 <= yp2){
                        return true;
                    }
                } else if(x1 >= xp1 && x1 <= xp2){
                    if(yp1 >= y1 && yp1 <= y2){
                        return true;
                    } else if(y1 >= yp1 && y1 <= yp2){
                        return true;
                    }
                }
                return false;
               }; // is_viewable
               
               var screwIt = function(){
                
                if(!obj.css('position') || obj.css('position') == 'static'){
                    obj.css({
                        position: 'relative'
                    });
                }
                
                var box_width = obj.width(),
                    box_height = obj.height(),
                    parent_scrollTop = obj.scrollTop(),
                    parent_scrollLeft = obj.scrollLeft();
                
                if(obj.is("body")){
                    box_width = $("body").width(),
                    box_height = $(window).height()-10,
                    parent_scrollTop = $(window).scrollTop(),
                    parent_scrollLeft = $(window).scrollLeft();
                 }
                $(".screw-hit-test-box").show();
                $(".screw-hit-test-box").css({
                    'width': box_width+'px',
                    'min-width': box_width+'px',
                    'max-width': box_width+'px',
                    'height': box_height+'px',
                    'min-height': box_height+'px',
                    'max-height': box_height+'px',
                    'position': 'absolute',
                    'top': parent_scrollTop+'px',
                    'left': parent_scrollLeft+'px',
                    'padding': '0px',
                    'margin': '0px',
                    'border': '0px solid red'
                });
                
                $(".screw-image").not(".screw-loading, .screw-loaded").each(function(){ 
                    var o = $(this),
                        mother = $(".screw-hit-test-box"), 
                        rand = Math.round(Math.random()*1000), 
                        data = o.data();
                        
                    if(is_viewable(mother, o)){                      
                        if(data.debug) try{console.log("Screw loading");}catch(e){}
                        o.toggleClass('screw-loading', true).html('<div id="screw-loading-' + rand + '" class="screw-loading-' + rand + '">' + option.loadingHTML + '</div>');
                        // Stop cache
                        var url = o.attr('rel'), patt = /&/g;
                        if(patt.test(url)){
                            url += '&screw_rand=' + rand;
                        } else {
                            url += '?screw_rand=' + rand;
                        }
                        // Preload image
                        if(data.debug) try{console.log("Preloading image");}catch(e){}
                        objImage = new Image();
                        objImage.src = url;
                        objImage.onload = function(){
                            o.append('<img style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '" src="' + url + '" />');
                            if(data.debug) try{console.log("Preloading complete");}catch(e){}
                            $('.screw-loading-' + rand).fadeOut('slow', function(){
                                $('.screw-content-' + rand).fadeIn('slow');
                                o.removeClass('screw-loading').addClass('screw-loaded');
                                if(data.debug) try{console.log("Image loaded successfully");}catch(e){}
                            });
                        };                        
                    } // is_viewable
                });	
                
                $(".screw").not(".screw-loading, .screw-loaded").each(function(){
                    var o = $(this),
                        mother = $(".screw-hit-test-box"), 
                        rand = Math.round(Math.random()*1000), 
                        data = o.data(), 
                        data_type = 'html';
                    
                    if(is_viewable(mother, o)){
                        o.toggleClass('screw-loading', true);
                        if(o.hasClass('screw-xml')){
                          data_type = 'xml';  
                        } else if(o.hasClass('screw-json')){
                          data_type = 'json';  
                        } else if(o.hasClass('screw-script')){
                          data_type = 'script';  
                        }
                        if(data.debug) try{console.log("Data type: " + data_type);}catch(e){}
                        if(data.debug) try{console.log("Screw loading");}catch(e){}
                        
                        if(option.loadingHTML){
                            if(data.debug) try{console.log("Applying loading html");}catch(e){}
                            o.html('<div id="screw-loading-' + rand + '" class="screw-loading-' + rand + '">' + option.loadingHTML + '</div>');
                        }
                        
                        if(o.hasClass('screw-replace')){
                            if(data.debug) try{console.log("Screw replace");}catch(e){}
                        if(o.attr('rel')){
                            if(data.load){
                                var frag = o.attr('rel') + ' ' + data.load;
                              o.replaceWith('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '"></div>');
                              $(".screw-content-" + rand).load(frag, function(){                                
                                showContent(rand, o);
                             });                                
                            } else {
                                $.get(o.attr('rel'), { screwrand : Math.round(Math.random()*1000) }, function(data) {
                                    o.replaceWith(data);
                                }, data_type);
                            }
                        } else if(o.attr('rev')){
                            o.replaceWith(o.attr('rev'));
                        }
                        } else if(o.hasClass('screw-append')){
                            if(data.debug) try{console.log("Screw append");}catch(e){}
                        if(o.attr('rel')){
                            if(data.load){
                                var frag = o.attr('rel') + ' ' + data.load;
                                o.append('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '"></div>');
                                $(".screw-content-" + rand).load(frag, function(){
                                    showContent(rand, o);
                                });                                
                            } else {
                          $.get(o.attr('rel'), { screwrand : Math.round(Math.random()*1000) }, function(data) {
                             o.append('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + data + '</div>');
                             showContent(rand, o);
                        }, data_type);
                        } 
                        } else if(o.attr('rev')){
                            o.append('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + o.attr('rev') + '</div>');
                            showContent(rand, o);
                        } 
                        } else if(o.hasClass('screw-prepend')){
                            if(data.debug) try{console.log("Screw prepend");}catch(e){}
                        if(o.attr('rel')){
                            if(data.load){
                                var frag = o.attr('rel') + ' ' + data.load;
                                o.prepend('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '"></div>');
                                $(".screw-content-" + rand).load(frag, function(){
                                    showContent(rand, o);
                                });                                
                            } else {
                          $.get(o.attr('rel'), { screwrand : Math.round(Math.random()*1000) }, function(data) {
                             o.prepend('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + data + '</div>');
                             showContent(rand, o);
                        }, data_type);
                        }  
                        } else if(o.attr('rev')){
                            o.prepend('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + o.attr('rev') + '</div>');
                            showContent(rand, o);
                        } 
                        } else if(o.hasClass('screw-before')){
                            if(data.debug) try{console.log("Screw before");}catch(e){}
                        if(o.attr('rel')){
                            if(data.load){
                                var frag = o.attr('rel') + ' ' + data.load;
                                o.before('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '"></div>');
                                $(".screw-content-" + rand).load(frag, function(){
                                    showContent(rand, o);
                                });                                
                            } else {
                          $.get(o.attr('rel'), { screwrand : Math.round(Math.random()*1000) }, function(data) {
                             o.before('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + data + '</div>');
                             showContent(rand, o);
                        }, data_type);
                        } 
                        } else if(o.attr('rev')){
                            o.before('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + o.attr('rev') + '</div>');
                            showContent(rand, o);
                        }
                        
                        if(o.hasClass('screw-repeat')){
                            if(data.debug) try{console.log("Screw repeat");}catch(e){}
                            if(o.attr('rel')){
                                o.before('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '"></div>');
                                if(data.load){
                                var frag = o.attr('rel') + ' ' + data.load;                               
                                $(".screw-content-" + rand).load(frag, function(){
                                    showContent(rand, o);
                                });                                
                            } else {
                            $.get(o.attr('rel'), { screwrand : Math.round(Math.random()*1000) }, function(data) {
                                    showContent(rand, o);
                            }, data_type);
                            }
                            } else if(o.attr('rev')){
                                o.before('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + o.attr('rev') + '</div>');
                                showContent(rand, o);
                            }
                        }                         
                        } else if(o.hasClass('screw-after')){
                            if(data.debug) try{console.log("Screw after");}catch(e){}
                        if(o.attr('rel')){
                            if(data.load){
                                var frag = o.attr('rel') + ' ' + data.load;
                                o.append('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '"></div>');
                                $(".screw-content-" + rand).load(frag, function(){
                                    showContent(rand, o);
                                });                                
                            } else {
                          $.get(o.attr('rel'), { screwrand : Math.round(Math.random()*1000) }, function(data) {
                             o.after('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + data + '</div>');
                             showContent(rand, o);
                        }, data_type);
                        }  
                        } else if(o.attr('rev')){
                            o.after('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + o.attr('rev') + '</div>');
                            showContent(rand, o);
                        } 
                        } else {
                        if(o.attr('rel')){
                            if(data.load){
                                var frag = o.attr('rel') + ' ' + data.load;
                                o.append('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '"></div>');
                                $(".screw-content-" + rand).load(frag, function(){
                                    showContent(rand, o);
                                });                                
                            } else {
                          $.get(o.attr('rel'), { screwrand : Math.round(Math.random()*1000) }, function(data) {
                             o.append('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + data + '</div>');
                             showContent(rand, o);
                        }, data_type); 
                        } 
                        } else if(o.attr('rev')){
                            o.append('<div style="display:none" id="screw-content-' + rand + '" class="screw-content screw-content-' + rand + '">' + o.attr('rev') + '</div>');
                            showContent(rand, o);
                        } 
                        }
                        
                        if(data.debug) try{console.log("Screw loaded successfully");}catch(e){}                  
                    }
                });
                
                $(".screw-remove").each(function(){
                    var o = $(this),
                        mother = $(".screw-hit-test-box"), 
                        rand = Math.round(Math.random()*1000), 
                        data = o.data();
                    if(o.hasClass('screw-loaded') && is_viewable(mother, o)){                       
                        if(data.debug) try{console.log("Has Class screw-remove.");}catch(e){}
                        if(o.is(':visible')){
                                o.fadeOut('slow');
                                o.toggleClass('screw-loaded', false);
                                if(data.debug) try{console.log("Screw removed successfully");}catch(e){}
                            }
                    }
                });
                
                $(".screw-hit-test-box").hide();
                
              }; // screwIt
              
              
              var showContent = function(rand, o){
                if(option.loadingHTML){
                    $('.screw-loading-' + rand).fadeOut('slow', function(){
                        $('.screw-content-' + rand).fadeIn('slow');
                    });
                } else {
                    $('.screw-content-' + rand).fadeIn('slow');
                }
                o.toggleClass('screw-loading', false);
                if(!o.hasClass('screw-repeat')){
                    o.toggleClass('screw-loaded', true);
                }               
              }; // showContent
              
              if(!$(".screw-hit-test-box").width()){
                obj.prepend('<div class="screw-hit-test-box"></div>');
              }
              
              if(obj.is("body")){
                $(window).scroll(function() {
                    if(screw_timeout) clearTimeout(screw_timeout);
                    screw_timeout = setTimeout(screwIt, 250);                           
                }).resize(function() {
                 screwIt();                             
                });
                } else {
                obj.scroll(function() {
                    if(screw_timeout) clearTimeout(screw_timeout);
                    screw_timeout = setTimeout(screwIt, 250);                               
                }).resize(function() {
                 screwIt();                             
                });
              }
              
              screwIt(); // init               
                
    		}); // each
    	} // screw
	}); // extend
	
})(jQuery);
 -->