/*! Stream.js v1.3.0 (2015-01-24) */
(function(){"use strict";var a=this,b="1.3.0",c={},d={},e=function(){};e.of=function(a){return C(a)?new f(a):D(a)?new g(a):new h(a)};var f=function(a){this.initialize(a)};f.prototype=new e,f.prototype.next=function(){if(this.origin>=this.fence)return d;try{return this.data[this.origin]}finally{this.origin++}},f.prototype.initialize=function(a){this.data=a||[],this.origin=0,this.fence=this.data.length};var g=function(a){this.initialize(a)};g.prototype=new e,g.prototype.initialize=function(a){this.data=a||{},this.keys=Object.keys(a),this.origin=0,this.fence=this.keys.length},g.prototype.next=function(){if(this.origin>=this.fence)return d;try{var a=this.keys[this.origin];return this.data[a]}finally{this.origin++}};var h=function(a){this.initialize(a)};h.prototype=new e,h.prototype.initialize=function(a){this.value=a,this.done=!1},h.prototype.next=function(){return this.done?d:(this.done=!0,this.value)};var i=function(){this.next=null,this.prev=null},j=function(a){this.iterator=e.of(a)};j.prototype=new i,j.prototype.advance=function(){var a=this.iterator.next();return a===d?a:null===this.next?a:this.next.pipe(a)};var k=function(a){this.fn=a};k.prototype=new i,k.prototype.advance=function(){return this.prev.advance()},k.prototype.pipe=function(a){var b=this.fn.call(c,a);return null===this.next?b:this.next.pipe(b)};var l=function(a){this.fn=a,this.iterator=null};l.prototype=new i,l.prototype.advance=function(){if(null===this.iterator)return this.prev.advance();var a=this.iterator.next();return a===d?(this.iterator=null,this.prev.advance()):null===this.next?a:this.next.pipe(a)},l.prototype.pipe=function(a){this.iterator=e.of(a);var b=this.iterator.next();return b===d?this.prev.advance():null===this.next?b:this.next.pipe(b)};var m=function(a){this.fn=a};m.prototype=new i,m.prototype.advance=function(){return this.prev.advance()},m.prototype.pipe=function(a){var b=this.fn.call(c,a);return b?null===this.next?a:this.next.pipe(a):this.prev.advance()};var n=function(a){this.prev=null,this.next=null,this.fn=a};n.prototype.advance=function(){var a=this.fn.call(c);return this.next.pipe(a)};var o=function(a){this.prev=null,this.next=null,this.filter=a.filter,this.finisher=a.finisher,this.buffer=null,this.i=0};o.prototype.advance=function(){var a;if(null===this.buffer){for(this.buffer=[];(a=this.prev.advance())!==d;)this.i++;this.finisher&&this.finisher.call(c,this.buffer)}return 0===this.buffer.length?d:(a=this.buffer.shift(),null!==this.next?this.next.pipe(a):a)},o.prototype.pipe=function(a){(!this.filter||this.filter.call(c,a,this.i,this.buffer))&&this.buffer.push(a)};var p=function(a){this.limit=a,this.i=0};p.prototype=new i,p.prototype.advance=function(){return this.prev.advance()},p.prototype.pipe=function(a){return this.i>=this.limit?d:(this.i++,null===this.next?a:this.next.pipe(a))};var q=function(a){this.skip=a,this.i=0};q.prototype=new i,q.prototype.advance=function(){return this.prev.advance()},q.prototype.pipe=function(a){return this.i<this.skip?(this.i++,this.prev.advance()):(this.i++,null===this.next?a:this.next.pipe(a))};var r=function(a){this.consumer=a};r.prototype=new i,r.prototype.advance=function(){return this.prev.advance()},r.prototype.pipe=function(a){return this.consumer.call(c,a),null===this.next?a:this.next.pipe(a)};var s=function(a){var b,f=this;b=A(a)?new n(function(){return a.call(c)}):new j(z(a)?a.split(""):a),this.add=function(a){if(null!==b){var c=b;a.prev=c,c.next=a}b=a},this.next=function(){return b.advance()},this.filter=function(){var a=arguments[0];return this.add(new m(E(a)?function(b){return a.test(b)}:D(a)?function(b){return x(a,b)}:a)),this},this.map=function(){var a=arguments[0];return this.add(new k(z(a)?w(a):a)),this},this.flatMap=function(){var a=arguments[0];return this.add(z(a)?new k(w(a)):new k(a)),this.add(new l),this},this.sorted=function(a){var b;return b=A(a)?a:z(a)?v(a):u,this.add(new o({finisher:function(a){a.sort(b)}})),this},this.distinct=function(){return this.add(new o({filter:function(a,b,c){return c.indexOf(a)<0}})),this},this.skip=function(a){return this.add(new q(a)),this},this.limit=function(a){return this.add(new p(a)),this},this.peek=function(a){return this.add(new r(a)),this};var g={};g.toArray=function(){for(var a,b=[];(a=f.next())!==d;)b.push(a);return b},g.findFirst=function(){var a=f.next();return a===d?t.empty():t.ofNullable(a)},g.forEach=function(a){for(var b;(b=f.next())!==d;)a.call(c,b)},g.min=function(a){var b;b=A(a)?a:z(a)?v(a):u;for(var e,g=null;(e=f.next())!==d;)(null===g||b.call(c,e,g)<0)&&(g=e);return t.ofNullable(g)},g.max=function(a){var b;b=A(a)?a:z(a)?v(a):u;for(var e,g=null;(e=f.next())!==d;)(null===g||b.call(c,e,g)>0)&&(g=e);return t.ofNullable(g)},g.sum=function(){for(var a,b=0;(a=f.next())!==d;)b+=a;return b},g.average=function(){for(var a,b=0,c=0;(a=f.next())!==d;)c+=a,b++;return 0===c||0===b?t.empty():t.of(c/b)},g.count=function(){for(var a,b=0;(a=f.next())!==d;)b++;return b},g.allMatch=function(){var a,b=arguments[0],e=b;for(E(b)?e=function(a){return b.test(a)}:D(b)&&(e=function(a){return x(b,a)});(a=f.next())!==d;){var g=e.call(c,a);if(!g)return!1}return!0},g.anyMatch=function(){var a,b=arguments[0],e=b;for(E(b)?e=function(a){return b.test(a)}:D(b)&&(e=function(a){return x(b,a)});(a=f.next())!==d;){var g=e.call(c,a);if(g)return!0}return!1},g.noneMatch=function(){var a,b=arguments[0],e=b;for(E(b)?e=function(a){return b.test(a)}:D(b)&&(e=function(a){return x(b,a)});(a=f.next())!==d;){var g=e.call(c,a);if(g)return!1}return!0},g.collect=function(a){for(var b,e=a.supplier.call(c),g=!0;(b=f.next())!==d;)e=a.accumulator.call(c,e,b,g),g=!1;return a.finisher&&(e=a.finisher.call(c,e)),e},g.reduce=function(){var a=arguments[0],b=arguments[1];return b?f.collect({supplier:function(){return a},accumulator:b}):h(a)};var h=function(a){var b,e=f.next();if(e===d)return t.empty();for(;(b=f.next())!==d;)e=a.call(c,e,b);return t.ofNullable(e)};g.groupBy=function(){var a=arguments[0];return z(a)&&(a=w(a)),f.collect({supplier:function(){return{}},accumulator:function(b,d){var e=a.call(c,d);return b.hasOwnProperty(e)||(b[e]=[]),void 0===b[e]&&(b[e]=[]),b[e].push(d),b}})},g.toMap=function(){var a=arguments[0];z(a)&&(a=w(a));var b=!1;return arguments.length>1&&(b=arguments[1]),f.collect({supplier:function(){return{}},accumulator:function(d,e){var f=a.call(c,e);if(d.hasOwnProperty(f)){if(!b)throw"duplicate mapping found for key: "+f;return d[f]=b.call(c,d[f],e),d}return d[f]=e,d}})},g.partitionBy=function(){var a=arguments[0];if(A(a))return i(a);if(B(a))return s(a);if(E(a))return i(function(b){return a.test(b)});if(D(a))return i(function(b){return x(a,b)});throw"partitionBy requires argument of type function, object, regexp or number"};var i=function(a){return f.collect({supplier:function(){return{"true":[],"false":[]}},accumulator:function(b,d){var e=a.call(c,d);return b.hasOwnProperty(e)||(b[e]=[]),b[e].push(d),b}})},s=function(a){return f.collect({supplier:function(){return[]},accumulator:function(b,c){if(0===b.length)return b.push([c]),b;var d=b[b.length-1];return d.length===a?(b.push([c]),b):(d.push(c),b)}})};g.joining=function(a){var b="",c="",d="";return a&&(z(a)?d=a:(b=a.prefix||b,c=a.suffix||c,d=a.delimiter||d)),f.collect({supplier:function(){return""},accumulator:function(a,b,c){var e=c?"":d;return a+e+String(b)},finisher:function(a){return b+a+c}})};var y=function(){this.value=f.next()};y.prototype=new e,y.prototype.next=function(){if(this.value===d)return{value:void 0,done:!0};var a=f.next(),b=a===d,c={value:this.value,done:b};return this.value=a,c},g.iterator=function(){return new y};var C=!1,F=function(a){return function(){try{if(C)throw"stream has already been operated upon";return a.apply(f,arguments)}finally{C=!0}}};for(var G in g)g.hasOwnProperty(G)&&(this[G]=F(g[G]));this.indexBy=this.toMap,this.partitioningBy=this.partitionBy,this.groupingBy=this.groupBy,this.each=this.forEach,this.toList=this.toArray,this.join=this.joining,this.avg=this.average,this.sort=this.sorted,this.size=this.count,this.findAny=this.findFirst};s.prototype.toString=function(){return"[object Stream]"};var t=function(a){this.isPresent=function(){return null!==a&&void 0!==a},this.get=function(){if(!this.isPresent())throw"optional value is not present";return a},this.ifPresent=function(b){this.isPresent()&&b.call(a,a)},this.orElse=function(b){return this.isPresent()?a:b},this.orElseGet=function(b){return this.isPresent()?a:b.call(c)},this.orElseThrow=function(b){if(this.isPresent())return a;throw b},this.filter=function(b){if(this.isPresent()){var d=b.call(c,a);return d?this:t.empty()}return this},this.map=function(b){if(this.isPresent()){var d=b.call(c,a);return t.ofNullable(d)}return this},this.flatMap=function(b){return this.isPresent()?b.call(c,a):this}};t.prototype.toString=function(){return"[object Optional]"},t.of=function(a){if(null===a||void 0===a)throw"value must be present";return new t(a)},t.ofNullable=function(a){return new t(a)},t.empty=function(){return new t(void 0)};var u=function(a,b){return a===b?0:a>b?1:-1},v=function(a){var b=w(a);return function(a,c){var d=b(a),e=b(c);return u(d,e)}},w=function(a){if(a.indexOf(".")<0)return function(b){return b[a]};var b=a.split(".");return function(a){for(var c=a,d=0;d<b.length;d++){var e=b[d];c=c[e]}return c}},x=function(a,b){if(!D(a))return a===b;if(!D(b))return!1;for(var c in a)if(a.hasOwnProperty(c)){if(!b.hasOwnProperty(c))return!1;var d=a[c],e=b[c],f=x(d,e);if(!f)return!1}return!0},y=Object.prototype.toString,z=function(a){return"[object String]"===y.call(a)},A=function(a){return"function"==typeof a||!1},B=function(a){return"[object Number]"===y.call(a)},C=Array.isArray||function(a){return"[object Array]"===y.call(a)},D=function(a){return"object"==typeof a&&!!a},E=function(a){return"[object RegExp]"===y.call(a)},F=function(a){return new s(a)};F.range=function(a,b){for(var c=[],d=a;b>d;d++)c.push(d);return F(c)},F.rangeClosed=function(a,b){return F.range(a,b+1)},F.of=function(){var a=Array.prototype.slice.call(arguments);return F(a)},F.generate=function(a){return F(a)},F.iterate=function(a,b){var d=!0,e=a;return F(function(){return d?(d=!1,a):e=b.call(c,e)})},F.empty=function(){return F([])},F.VERSION=b,F.Optional=t;var G=a.Stream;F.noConflict=function(){return a.Stream=G,F},"undefined"!=typeof module&&module.exports?module.exports=F:"function"==typeof define&&define.amd?define("streamjs",[],function(){return F}):a.Stream=F}).call(this);
//# sourceMappingURL=stream-min.map