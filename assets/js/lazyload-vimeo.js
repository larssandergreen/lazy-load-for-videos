!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([,function(e,t,n){"use strict";!function(e,t){window.showThumb=function(e){var n=e[0];lazyload_video_settings.vimeo.loadthumbnail&&t("[id="+n.id+"]").css("background-image","url("+n.thumbnail_large+")").css("background-color","#000").css("background-position","center center").css("background-repeat","no-repeat")};var n,o=".preview-vimeo",i="js-lazyload--not-loaded";function a(){t(o).parent().removeClass(i)}e.init=function(e){r(e),t(document).ready(l()).ajaxStop(function(){l(),"function"==typeof b.init&&!0===n.responsive&&b.resize(),a()}),"function"==typeof b.init&&!0===n.responsive?b.init():a(),"function"==typeof n.callback&&n.callback()};var r=function(e){n=t.extend({buttonstyle:"",playercolour:"",videoseo:!1,responsive:!0,displayBranding:!1,loadthumbnail:!0,callback:null},e)};function l(){v(),c(),d()}var c=function(){if(!0===n.displayBranding&&0===t(o).siblings(".lazyload-info-icon").length){var e=t(o),i=t('<a class="lazyload-info-icon" href="https://www.kweber.com/lazy-load-videos/" title="Lazy Load for Videos by Kevin Weber" target="_blank">i</a>');e.before(i)}},d=function(){t(o).on("click",function(e){e.preventDefault();var o=t(this).attr("id");s(this),u(this);var i="";n.playercolour!==i&&(n.playercolour=f(n.playercolour),i="&color="+n.playercolour),t(this).replaceWith('<iframe src="'+p(o)+"?autoplay=1"+i+'" style="height:'+parseInt(t("#"+o).css("height"))+'px;width:100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen autoPlay allowFullScreen></iframe>'),"function"==typeof b.resize&&!0===n.responsive&&b.resize()})},s=function(e){t(e).removeClass("preview-vimeo")},u=function(e){t(e).prev(".lazyload-info-icon").remove()},p=function(e){return"https://player.vimeo.com/video/"+e},f=function(e){return e.toString().replace(/[.#]/g,"")},v=function(){t(o).each(function(){var e=t(this),n=e.attr("id");e.empty(),m(e,n)})},m=function(e,o){var i;lazyload_video_settings.vimeo.loadthumbnail&&((i=document.createElement("script")).type="text/javascript",i.src=h(o)+".json?callback=showThumb",e.after(i));var a="";!0===n.videoseo&&(a=' itemprop="name"');var r="";lazyload_video_settings.vimeo.show_title&&(r='<div aria-hidden="true" class="lazy-load-info"><span class="titletext vimeo"'+a+" >"+e.attr("data-video-title")+"</span></div>");e.prepend(r).prepend('<div aria-hidden="true" style="height:'+parseInt(t("#"+o).css("height"))+"px;width:"+parseInt(t("#"+o).css("width"))+'px;" class="lazy-load-div"></div>').addClass(n.buttonstyle),y(o)},y=function(e){!0===n.videoseo&&t.getJSON(h(e)+"?callback=?",{format:"json"},function(n){var o=n[0];t("#"+e).append('<meta itemprop="contentLocation" content="'+o.url+'" />').append('<meta itemprop="embedUrl" content="'+p(e)+'" />').append('<meta itemprop="thumbnail" content="'+o.thumbnail_large+'" />').append('<meta itemprop="datePublished" content="'+o.upload_date+'" />').append('<meta itemprop="duration" content="'+o.duration+'" />').append('<meta itemprop="aggregateRating" content="'+n.data.rating+'" />')})},h=function(e){return"https://vimeo.com/api/v2/video/"+e+".json"};t.fn.bindFirst=function(e,n){var o=t(this);o.unbind(e,n),o.bind(e,n);var i=t._data(o[0]).events,a=i[e];a.unshift(a.pop()),i[e]=a};var b={config:{container:".container-lazyload",selector:"object, embed, iframe, .preview-lazyload, .lazy-load-div"},init:function(){if(b.config.container.length>0){var e=t(window);e.on("resize",b.resize),e.bindFirst("load",function(){b.resize()}),e.on("load",function(){b.resize(),a()})}},resize:function(){t(b.config.container).find(b.config.selector).each(function(){var e=t(this),n=e.parent().width(),o=Math.round(.5625*n);e.attr("height",o),e.attr("width",n),e.css({height:o,width:n})})}};t(function(){e.init(lazyload_video_settings.vimeo)})}(window.lazyload_vimeo=window.lazyload_vimeo||{},jQuery)}]);
//# sourceMappingURL=lazyload-vimeo.js.map