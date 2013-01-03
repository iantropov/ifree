/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(i,f){var t=i.fn.domManip,h="_tmplitem",u=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,p={},e={},y,x={key:0,data:{}},w=0,q=0,g=[];function k(B,A,D,E){var C={data:E||(E===0||E===false)?E:(A?A.data:{}),_wrap:A?A._wrap:null,tmpl:null,parent:A||null,nodes:[],calls:c,nest:b,wrap:n,html:r,update:z};if(B){i.extend(C,B,{nodes:[],parent:A})}if(D){C.tmpl=D;C._ctnt=C._ctnt||C.tmpl(i,C);C.key=++w;(g.length?e:p)[w]=C}return C}i.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(A,B){i.fn[A]=function(C){var F=[],I=i(C),E,G,D,J,H=this.length===1&&this[0].parentNode;y=p||{};if(H&&H.nodeType===11&&H.childNodes.length===1&&I.length===1){I[B](this[0]);F=this}else{for(G=0,D=I.length;G<D;G++){q=G;E=(G>0?this.clone(true):this).get();i(I[G])[B](E);F=F.concat(E)}q=0;F=this.pushStack(F,A,I.selector)}J=y;y=null;i.tmpl.complete(J);return F}});i.fn.extend({tmpl:function(C,B,A){return i.tmpl(this[0],C,B,A)},tmplItem:function(){return i.tmplItem(this[0])},template:function(A){return i.template(A,this[0])},domManip:function(E,H,G,I){if(E[0]&&i.isArray(E[0])){var B=i.makeArray(arguments),A=E[0],F=A.length,C=0,D;while(C<F&&!(D=i.data(A[C++],"tmplItem"))){}if(D&&q){B[2]=function(J){i.tmpl.afterManip(this,J,G)}}t.apply(this,B)}else{t.apply(this,arguments)}q=0;if(!y){i.tmpl.complete(p)}return this}});i.extend({tmpl:function(C,F,E,B){var D,A=!B;if(A){B=x;C=i.template[C]||i.template(null,C);e={}}else{if(!C){C=B.tmpl;p[B.key]=B;B.nodes=[];if(B.wrapped){s(B,B.wrapped)}return i(m(B,null,B.tmpl(i,B)))}}if(!C){return[]}if(typeof F==="function"){F=F.call(B||{})}if(E&&E.wrapped){s(E,E.wrapped)}D=i.isArray(F)?i.map(F,function(G){return G?k(E,B,C,G):null}):[k(E,B,C,F)];return A?i(m(B,null,D)):D},tmplItem:function(B){var A;if(B instanceof i){B=B[0]}while(B&&B.nodeType===1&&!(A=i.data(B,"tmplItem"))&&(B=B.parentNode)){}return A||x},template:function(B,A){if(A){if(typeof A==="string"){A=l(A)}else{if(A instanceof i){A=A[0]||{}}}if(A.nodeType){A=i.data(A,"tmpl")||i.data(A,"tmpl",l(A.innerHTML))}return typeof B==="string"?(i.template[B]=A):A}return B?(typeof B!=="string"?i.template(null,B):(i.template[B]||i.template(null,u.test(B)?B:i(B)))):null},encode:function(A){return(""+A).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});i.extend(i.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(A){p={}},afterManip:function v(C,A,D){var B=A.nodeType===11?i.makeArray(A.childNodes):A.nodeType===1?[A]:[];D.call(C,A);o(B);q++}});function m(A,E,C){var D,B=C?i.map(C,function(F){return(typeof F==="string")?(A.key?F.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+h+'="'+A.key+'" $2'):F):m(F,A,F._ctnt)}):A;if(E){return B}B=B.join("");B.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(G,H,F,I){D=i(F).get();o(D);if(H){D=a(H).concat(D)}if(I){D=D.concat(a(I))}});return D?D:a(B)}function a(B){var A=document.createElement("div");A.innerHTML=B;return i.makeArray(A.childNodes)}function l(A){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+i.trim(A).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(I,C,G,D,E,J,F){var L=i.tmpl.tag[G],B,H,K;if(!L){throw"Unknown template tag: "+G}B=L._default||[];if(J&&!/\w$/.test(E)){E+=J;J=""}if(E){E=j(E);F=F?(","+j(F)+")"):(J?")":"");H=J?(E.indexOf(".")>-1?E+j(J):("("+E+").call($item"+F)):E;K=J?H:"(typeof("+E+")==='function'?("+E+").call($item):("+E+"))"}else{K=H=B.$1||"null"}D=j(D);return"');"+L[C?"close":"open"].split("$notnull_1").join(E?"typeof("+E+")!=='undefined' && ("+E+")!=null":"true").split("$1a").join(K).split("$1").join(H).split("$2").join(D||B.$2||"")+"__.push('"})+"');}return __;")}function s(B,A){B._wrap=m(B,true,i.isArray(A)?A:[u.test(A)?A:i(A).html()]).join("")}function j(A){return A?A.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function d(A){var B=document.createElement("div");B.appendChild(A.cloneNode(true));return B.innerHTML}function o(G){var I="_"+q,B,A,E={},F,D,C;for(F=0,D=G.length;F<D;F++){if((B=G[F]).nodeType!==1){continue}A=B.getElementsByTagName("*");for(C=A.length-1;C>=0;C--){H(A[C])}H(B)}function H(O){var L,N=O,M,J,K;if((K=O.getAttribute(h))){while(N.parentNode&&(N=N.parentNode).nodeType===1&&!(L=N.getAttribute(h))){}if(L!==K){N=N.parentNode?(N.nodeType===11?0:(N.getAttribute(h)||0)):0;if(!(J=p[K])){J=e[K];J=k(J,p[N]||e[N]);J.key=++w;p[w]=J}if(q){P(K)}}O.removeAttribute(h)}else{if(q&&(J=i.data(O,"tmplItem"))){P(J.key);p[J.key]=J;N=i.data(O.parentNode,"tmplItem");N=N?N.key:0}}if(J){M=J;while(M&&M.key!=N){M.nodes.push(O);M=M.parent}delete J._ctnt;delete J._wrap;i.data(O,"tmplItem",J)}function P(Q){Q=Q+I;J=E[Q]=(E[Q]||k(J,p[J.parent.key+I]||J.parent))}}}function c(C,A,D,B){if(!C){return g.pop()}g.push({_:C,tmpl:A,item:this,data:D,options:B})}function b(A,C,B){return i.tmpl(i.template(A),C,B,this)}function n(C,A){var B=C.options||{};B.wrapped=A;return i.tmpl(i.template(C.tmpl),C.data,B,C.item)}function r(B,C){var A=this._wrap;return i.map(i(i.isArray(A)?A.join(""):A).filter(B||"*"),function(D){return C?D.innerText||D.textContent:D.outerHTML||d(D)})}function z(){var A=this.nodes;i.tmpl(null,null,null,this).insertBefore(A[0]);i(A).remove()}})(jQuery);
/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Works with jQuery +1.2.6. Tested on FF 2/3, IE 6/7/8, Opera 9.5/6, Safari 3, Chrome 1 on WinXP.
 *
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
*		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
(function(c){var a=c.scrollTo=function(f,e,d){c(window).scrollTo(f,e,d)};a.defaults={axis:"xy",duration:parseFloat(c.fn.jquery)>=1.3?0:1};a.window=function(d){return c(window)._scrollable()};c.fn._scrollable=function(){return this.map(function(){var e=this,d=!e.nodeName||c.inArray(e.nodeName.toLowerCase(),["iframe","#document","html","body"])!=-1;if(!d){return e}var f=(e.contentWindow||e).document||e.ownerDocument||e;return c.browser.safari||f.compatMode=="BackCompat"?f.body:f.documentElement})};c.fn.scrollTo=function(f,e,d){if(typeof e=="object"){d=e;e=0}if(typeof d=="function"){d={onAfter:d}}if(f=="max"){f=9000000000}d=c.extend({},a.defaults,d);e=e||d.speed||d.duration;d.queue=d.queue&&d.axis.length>1;if(d.queue){e/=2}d.offset=b(d.offset);d.over=b(d.over);return this._scrollable().each(function(){var l=this,j=c(l),k=f,i,g={},m=j.is("html,body");switch(typeof k){case"number":case"string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)){k=b(k);break}k=c(k,this);case"object":if(k.is||k.style){i=(k=c(k)).offset()}}c.each(d.axis.split(""),function(q,r){var s=r=="x"?"Left":"Top",u=s.toLowerCase(),p="scroll"+s,o=l[p],n=a.max(l,r);if(i){g[p]=i[u]+(m?0:o-j.offset()[u]);if(d.margin){g[p]-=parseInt(k.css("margin"+s))||0;g[p]-=parseInt(k.css("border"+s+"Width"))||0}g[p]+=d.offset[u]||0;if(d.over[u]){g[p]+=k[r=="x"?"width":"height"]()*d.over[u]}}else{var t=k[u];g[p]=t.slice&&t.slice(-1)=="%"?parseFloat(t)/100*n:t}if(/^\d+$/.test(g[p])){g[p]=g[p]<=0?0:Math.min(g[p],n)}if(!q&&d.queue){if(o!=g[p]){h(d.onAfterFirst)}delete g[p]}});h(d.onAfter);function h(n){j.animate(g,e,d.easing,n&&function(){n.call(this,f,d)})}}).end()};a.max=function(j,i){var h=i=="x"?"Width":"Height",e="scroll"+h;if(!c(j).is("html,body")){return j[e]-c(j)[h.toLowerCase()]()}var g="client"+h,f=j.ownerDocument.documentElement,d=j.ownerDocument.body;return Math.max(f[e],d[e])-Math.min(f[g],d[g])};function b(d){return typeof d=="object"?d:{top:d,left:d}}})(jQuery);