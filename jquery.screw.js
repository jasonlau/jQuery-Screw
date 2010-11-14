<!-- 
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

(function($){
 	$.fn.extend({ 
 		screw: function(options) {
			var defaults = {
			 loadingHTML : 'Loading ... '
			}				
			var option =  $.extend(defaults, options);
            var obj = $(this);

    		return this.each(function() {   		  
              $(window).scroll(function() {
                 screwIt($(this));                             
              });
              
              var screwIt = function(it){
                var h = $(window).height(), st = it.scrollTop();
                $(".screw-image").each(function(){
                    var pos = $(this).offset(), t = h+st;
                    if(t >= pos.top){
                    if(!$(this).hasClass('screw-loaded')){
                        $(this).html('<img src="' + $(this).attr('rel') + '" />');
                        $(this).addClass('screw-loaded');
                    }                        
                    }
                });	
                
                $(".screw").each(function(){
                    var pos = $(this).offset(), t = h+st;
                    if(t >= pos.top){
                    if(!$(this).hasClass('screw-loaded') || $(this).hasClass('screw-repeat')){
                        var o = $(this);
                        if(o.hasClass('screw-append')){
                        if($(this).attr('rel')){
                          $.get($(this).attr('rel'), function(data) {
                             o.append(data);
                        });  
                        } else if($(this).attr('rev')){
                            o.append($(this).attr('rev'));
                        } 
                        } else if(o.hasClass('screw-prepend')){
                        if($(this).attr('rel')){
                          $.get($(this).attr('rel'), function(data) {
                             o.prepend(data);
                        });  
                        } else if($(this).attr('rev')){
                            o.prepend($(this).attr('rev'));
                        } 
                        } else if(o.hasClass('screw-before')){
                        if($(this).attr('rel')){
                          $.get($(this).attr('rel'), function(data) {
                             o.before(data);
                        });  
                        } else if($(this).attr('rev')){
                            o.before($(this).attr('rev'));
                        } 
                        } else if(o.hasClass('screw-after')){
                        if($(this).attr('rel')){
                          $.get($(this).attr('rel'), function(data) {
                             o.after(data);
                        });  
                        } else if($(this).attr('rev')){
                            o.after($(this).attr('rev'));
                        } 
                        } else {
                           o.html(option.loadingHTML);
                        if($(this).attr('rel')){
                          $.get($(this).attr('rel'), function(data) {
                             o.html(data);
                        });  
                        } else if($(this).attr('rev')){
                            o.html($(this).attr('rev'));
                        } 
                        }
                        o.html(option.loadingHTML);
                        if($(this).attr('rel')){
                          $.get($(this).attr('rel'), function(data) {
                             o.html(data);
                        });  
                        } else if($(this).attr('rev')){
                            o.html($(this).attr('rev'));
                        }
                         
                        $(this).addClass('screw-loaded');                     
                    }                        
                    }
                });
              };
              
              screwIt($(window));
              
            });
    	}
	});
	
})(jQuery);
 -->