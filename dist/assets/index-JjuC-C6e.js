import{B as y,ap as $,ax as p,ay as f,K as O,c as g,d as A,L as S,y as E}from"./index-DOTPlwWl.js";var j=y.extend({name:"animateonscroll-directive"}),w=$.extend({style:j});function b(t){"@babel/helpers - typeof";return b=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(t)}function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?v(Object(n),!0).forEach(function(r){C(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function C(t,e,n){return(e=I(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function I(t){var e=_(t,"string");return b(e)=="symbol"?e:e+""}function _(t,e){if(b(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e||"default");if(b(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function h(t,e){return B(t)||x(t,e)||P(t,e)||L()}function L(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function P(t,e){if(t){if(typeof t=="string")return m(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(t,e):void 0}}function m(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function x(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r,a,l,c,s=[],o=!0,u=!1;try{if(l=(n=n.call(t)).next,e!==0)for(;!(o=(r=l.call(n)).done)&&(s.push(r.value),s.length!==e);o=!0);}catch(i){u=!0,a=i}finally{try{if(!o&&n.return!=null&&(c=n.return(),Object(c)!==c))return}finally{if(u)throw a}}return s}}function B(t){if(Array.isArray(t))return t}var z=w.extend("animateonscroll",{created:function(){this.$value=this.$value||{},this.$el.style.opacity=this.$value.enterClass?"0":""},mounted:function(){this.$el.setAttribute("data-pd-animateonscroll",!0),this.bindIntersectionObserver()},unmounted:function(){this.unbindAnimationEvents(),this.unbindIntersectionObserver()},observer:void 0,resetObserver:void 0,isObserverActive:!1,animationState:void 0,animationEndListener:void 0,methods:{bindAnimationEvents:function(){var e=this;this.animationEndListener||(this.animationEndListener=function(){p(e.$el,[e.$value.enterClass,e.$value.leaveClass]),!e.$modifiers.once&&e.resetObserver.observe(e.$el),e.unbindAnimationEvents()},this.$el.addEventListener("animationend",this.animationEndListener))},bindIntersectionObserver:function(){var e=this,n=this.$value,r=n.root,a=n.rootMargin,l=n.threshold,c=l===void 0?.5:l,s={root:r,rootMargin:a,threshold:c};this.observer=new IntersectionObserver(function(o){var u=h(o,1),i=u[0];e.isObserverActive?i.boundingClientRect.top>0&&(i.isIntersecting?e.enter():e.leave()):i.isIntersecting&&e.enter(),e.isObserverActive=!0},s),setTimeout(function(){return e.observer.observe(e.$el)},0),this.resetObserver=new IntersectionObserver(function(o){var u=h(o,1),i=u[0];i.boundingClientRect.top>0&&!i.isIntersecting&&(e.$el.style.opacity=e.$value.enterClass?"0":"",p(e.$el,[e.$value.enterClass,e.$value.leaveClass]),e.resetObserver.unobserve(e.$el)),e.animationState=void 0},d(d({},s),{},{threshold:0}))},enter:function(){this.animationState!=="enter"&&this.$value.enterClass&&(this.$el.style.opacity="",p(this.$el,this.$value.leaveClass),f(this.$el,this.$value.enterClass),this.$modifiers.once&&this.unbindIntersectionObserver(this.$el),this.bindAnimationEvents(),this.animationState="enter")},leave:function(){this.animationState!=="leave"&&this.$value.leaveClass&&(this.$el.style.opacity=this.$value.enterClass?"0":"",p(this.$el,this.$value.enterClass),f(this.$el,this.$value.leaveClass),this.bindAnimationEvents(),this.animationState="leave")},unbindAnimationEvents:function(){this.animationEndListener&&(this.$el.removeEventListener("animationend",this.animationEndListener),this.animationEndListener=void 0)},unbindIntersectionObserver:function(){var e,n;(e=this.observer)===null||e===void 0||e.unobserve(this.$el),(n=this.resetObserver)===null||n===void 0||n.unobserve(this.$el),this.isObserverActive=!1}}}),T=function(e){var n=e.dt;return`
.p-floatlabel {
    display: block;
    position: relative;
}

.p-floatlabel label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    margin-top: -.5rem;
    transition-property: all;
    transition-timing-function: ease;
    line-height: 1;
    left: 0.75rem;
    color: `.concat(n("floatlabel.color"),`;
    transition-duration: `).concat(n("floatlabel.transition.duration"),`;
}

.p-floatlabel:has(textarea) label {
    top: 1rem;
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-focus) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    top: -.75rem;
    font-size: 12px;
    color: `).concat(n("floatlabel.focus.color"),`;
}

.p-floatlabel .p-placeholder,
.p-floatlabel input::placeholder,
.p-floatlabel .p-inputtext::placeholder {
    opacity: 0;
    transition-property: all;
    transition-timing-function: ease;
}

.p-floatlabel .p-focus .p-placeholder,
.p-floatlabel input:focus::placeholder,
.p-floatlabel .p-inputtext:focus::placeholder {
    opacity: 1;
    transition-property: all;
    transition-timing-function: ease;
}

.p-floatlabel > .p-invalid + label {
    color: `).concat(n("floatlabel.invalid.color"),`;
}
`)},k={root:"p-floatlabel"},D=y.extend({name:"floatlabel",theme:T,classes:k}),F={name:"BaseFloatLabel",extends:O,props:{},style:D,provide:function(){return{$pcFloatLabel:this,$parentInstance:this}}},M={name:"FloatLabel",extends:F,inheritAttrs:!1};function K(t,e,n,r,a,l){return g(),A("span",E({class:t.cx("root")},t.ptmi("root")),[S(t.$slots,"default")],16)}M.render=K;export{z as A,M as s};
