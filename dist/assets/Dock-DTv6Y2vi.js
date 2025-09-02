import{B as K,s as O,U as g,O as C,P as u,Q as y,m as d,R as P,T as w,S as v,o as c,c as l,i as p,F as _,z as T,K as f,a as I,n as E,b as L,y as F,j as h,e as B,v as N,k as U}from"./index-D7QWITLl.js";import j from"./UserDash-JjcpkwTD.js";import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";var z=function(t){var n=t.dt;return`
.p-dock {
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}

.p-dock-list-container {
    display: flex;
    pointer-events: auto;
    background: `.concat(n("dock.background"),`;
    border: 1px solid `).concat(n("dock.border.color"),`;
    padding: `).concat(n("dock.padding"),`;
    border-radius: `).concat(n("dock.border.radius"),`;
}

.p-dock-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 0 none;
}

.p-dock-item {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
    padding: `).concat(n("dock.item.padding"),`;
    border-radius: `).concat(n("dock.item.border.radius"),`;
}

.p-dock-item.p-focus {
    box-shadow: `).concat(n("dock.item.focus.ring.shadow"),`;
    outline: `).concat(n("dock.item.focus.ring.width")," ").concat(n("dock.item.focus.ring.style")," ").concat(n("dock.item.focus.ring.color"),`;
    outline-offset: `).concat(n("dock.item.focus.ring.offset"),`;
}

.p-dock-item-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    cursor: default;
    width: `).concat(n("dock.item.size"),`;
    height: `).concat(n("dock.item.size"),`;
}

.p-dock-top {
    left: 0;
    top: 0;
    width: 100%;
}

.p-dock-top .p-dock-item {
    transform-origin: center top;
}

.p-dock-bottom {
    left: 0;
    bottom: 0;
    width: 100%;
}

.p-dock-bottom .p-dock-item {
    transform-origin: center bottom;
}

.p-dock-right {
    right: 0;
    top: 0;
    height: 100%;
}

.p-dock-right .p-dock-item {
    transform-origin: center right;
}

.p-dock-right .p-dock-list {
    flex-direction: column;
}

.p-dock-left {
    left: 0;
    top: 0;
    height: 100%;
}

.p-dock-left .p-dock-item {
    transform-origin: center left;
}

.p-dock-left .p-dock-list {
    flex-direction: column;
}

.p-dock-mobile.p-dock-top .p-dock-list-container,
.p-dock-mobile.p-dock-bottom .p-dock-list-container {
    overflow-x: auto;
    width: 100%;
}
.p-dock-mobile.p-dock-top .p-dock-list-container .p-dock-list,
.p-dock-mobile.p-dock-bottom .p-dock-list-container .p-dock-list {
    margin: 0 auto;
}
.p-dock-mobile.p-dock-left .p-dock-list-container,
.p-dock-mobile.p-dock-right .p-dock-list-container {
    overflow-y: auto;
    height: 100%;
}
.p-dock-mobile.p-dock-left .p-dock-list-container .p-dock-list,
.p-dock-mobile.p-dock-right .p-dock-list-container .p-dock-list {
    margin: auto 0;
}
.p-dock-mobile .p-dock-list .p-dock-item {
    transform: none;
    margin: 0;
}
`)},H={root:function(t){var n=t.instance,o=t.props;return["p-dock p-component","p-dock-".concat(o.position),{"p-dock-mobile":n.queryMatches}]},listContainer:"p-dock-list-container",list:"p-dock-list",item:function(t){var n=t.instance,o=t.processedItem,r=t.id;return["p-dock-item",{"p-focus":n.isItemActive(r),"p-disabled":n.disabled(o)}]},itemContent:"p-dock-item-content",itemLink:"p-dock-item-link",itemIcon:"p-dock-item-icon"},R=K.extend({name:"dock",theme:z,classes:H}),V={name:"BaseDock",extends:O,props:{position:{type:String,default:"bottom"},model:null,class:null,style:null,tooltipOptions:null,menuId:{type:String,default:null},tabindex:{type:Number,default:0},breakpoint:{type:String,default:"960px"},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:R,provide:function(){return{$pcDock:this,$parentInstance:this}}};function x(e){return J(e)||G(e)||W(e)||Q()}function Q(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function W(e,t){if(e){if(typeof e=="string")return b(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}function G(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function J(e){if(Array.isArray(e))return b(e)}function b(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var M={name:"DockSub",hostName:"Dock",extends:O,emits:["focus","blur"],props:{position:{type:String,default:"bottom"},model:{type:Array,default:null},templates:{type:null,default:null},tooltipOptions:null,menuId:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},data:function(){return{id:this.menuId,currentIndex:-3,focused:!1,focusedOptionIndex:-1}},watch:{menuId:function(t){this.id=t||g()}},mounted:function(){this.id=this.id||g()},methods:{getItemId:function(t){return"".concat(this.id,"_").concat(t)},getItemProp:function(t,n){return t&&t.item?C(t.item[n]):void 0},getPTOptions:function(t,n,o){return this.ptm(t,{context:{index:o,item:n,active:this.isItemActive(this.getItemId(o))}})},isSameMenuItem:function(t){return t.currentTarget&&(t.currentTarget.isSameNode(t.target)||t.currentTarget.isSameNode(t.target.closest('[data-pc-section="item"]')))},isItemActive:function(t){return t===this.focusedOptionIndex},onListMouseLeave:function(){this.currentIndex=-3},onItemMouseEnter:function(t){this.currentIndex=t},onItemClick:function(t,n){if(this.isSameMenuItem(t)){var o=this.getItemProp(n,"command");o&&o({originalEvent:t,item:n.item})}},onListFocus:function(t){this.focused=!0,this.changeFocusedOptionIndex(0),this.$emit("focus",t)},onListBlur:function(t){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",t)},onListKeyDown:function(t){switch(t.code){case"ArrowDown":{(this.position==="left"||this.position==="right")&&this.onArrowDownKey(),t.preventDefault();break}case"ArrowUp":{(this.position==="left"||this.position==="right")&&this.onArrowUpKey(),t.preventDefault();break}case"ArrowRight":{(this.position==="top"||this.position==="bottom")&&this.onArrowDownKey(),t.preventDefault();break}case"ArrowLeft":{(this.position==="top"||this.position==="bottom")&&this.onArrowUpKey(),t.preventDefault();break}case"Home":{this.onHomeKey(),t.preventDefault();break}case"End":{this.onEndKey(),t.preventDefault();break}case"Enter":case"NumpadEnter":case"Space":{this.onSpaceKey(t),t.preventDefault();break}}},onArrowDownKey:function(){var t=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t)},onArrowUpKey:function(){var t=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t)},onHomeKey:function(){this.changeFocusedOptionIndex(0)},onEndKey:function(){this.changeFocusedOptionIndex(u(this.$refs.list,'li[data-pc-section="item"][data-p-disabled="false"]').length-1)},onSpaceKey:function(){var t=y(this.$refs.list,'li[id="'.concat("".concat(this.focusedOptionIndex),'"]')),n=t&&y(t,'[data-pc-section="itemlink"]');n?n.click():t&&t.click()},findNextOptionIndex:function(t){var n=u(this.$refs.list,'li[data-pc-section="item"][data-p-disabled="false"]'),o=x(n).findIndex(function(r){return r.id===t});return o>-1?o+1:0},findPrevOptionIndex:function(t){var n=u(this.$refs.list,'li[data-pc-section="item"][data-p-disabled="false"]'),o=x(n).findIndex(function(r){return r.id===t});return o>-1?o-1:0},changeFocusedOptionIndex:function(t){var n=u(this.$refs.list,'li[data-pc-section="item"][data-p-disabled="false"]'),o=t>=n.length?n.length-1:t<0?0:t;this.focusedOptionIndex=n[o].getAttribute("id")},disabled:function(t){return typeof t.disabled=="function"?t.disabled():t.disabled},getMenuItemProps:function(t,n){return{action:d({tabindex:-1,"aria-hidden":!0,class:this.cx("itemLink")},this.getPTOptions("itemLink",t,n)),icon:d({class:[this.cx("itemIcon"),t.icon]},this.getPTOptions("itemIcon",t,n))}}},computed:{focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null}},directives:{ripple:P,tooltip:w}},X=["id","aria-orientation","aria-activedescendant","tabindex","aria-label","aria-labelledby"],Y=["id","aria-label","aria-disabled","onClick","onMouseenter","data-p-focused","data-p-disabled"],Z=["href","target"];function $(e,t,n,o,r,i){var m=v("ripple"),S=v("tooltip");return c(),l("div",d({class:e.cx("listContainer")},e.ptm("listContainer")),[p("ul",d({ref:"list",id:r.id,class:e.cx("list"),role:"menu","aria-orientation":n.position==="bottom"||n.position==="top"?"horizontal":"vertical","aria-activedescendant":r.focused?i.focusedOptionId:void 0,tabindex:n.tabindex,"aria-label":n.ariaLabel,"aria-labelledby":n.ariaLabelledby,onFocus:t[0]||(t[0]=function(){return i.onListFocus&&i.onListFocus.apply(i,arguments)}),onBlur:t[1]||(t[1]=function(){return i.onListBlur&&i.onListBlur.apply(i,arguments)}),onKeydown:t[2]||(t[2]=function(){return i.onListKeyDown&&i.onListKeyDown.apply(i,arguments)}),onMouseleave:t[3]||(t[3]=function(){return i.onListMouseLeave&&i.onListMouseLeave.apply(i,arguments)})},e.ptm("list")),[(c(!0),l(_,null,T(n.model,function(a,s){return c(),l("li",d({key:s,id:i.getItemId(s),class:e.cx("item",{processedItem:a,id:i.getItemId(s)}),role:"menuitem","aria-label":a.label,"aria-disabled":i.disabled(a),onClick:function(k){return i.onItemClick(k,a)},onMouseenter:function(k){return i.onItemMouseEnter(s)},ref_for:!0},i.getPTOptions("item",a,s),{"data-p-focused":i.isItemActive(i.getItemId(s)),"data-p-disabled":i.disabled(a)||!1}),[p("div",d({class:e.cx("itemContent"),ref_for:!0},i.getPTOptions("itemContent",a,s)),[n.templates.item?(c(),I(L(n.templates.item),{key:1,item:a,index:s,label:a.label,props:i.getMenuItemProps(a,s)},null,8,["item","index","label","props"])):f((c(),l("a",d({key:0,href:a.url,class:e.cx("itemLink"),target:a.target,tabindex:"-1","aria-hidden":"true",ref_for:!0},i.getPTOptions("itemLink",a,s)),[!n.templates.icon&&!n.templates.itemicon?f((c(),l("span",d({key:0,class:[e.cx("itemIcon"),a.icon],ref_for:!0},i.getPTOptions("itemIcon",a,s)),null,16)),[[m]]):(c(),I(L(n.templates.icon||n.templates.itemicon),{key:1,item:a,class:E(e.cx("itemIcon"))},null,8,["item","class"]))],16,Z)),[[S,{value:a.label,disabled:!n.tooltipOptions},n.tooltipOptions]])],16)],16,Y)}),128))],16,X)],16)}M.render=$;var A={name:"Dock",extends:V,inheritAttrs:!1,matchMediaListener:null,data:function(){return{query:null,queryMatches:!1}},mounted:function(){this.bindMatchMediaListener()},beforeUnmount:function(){this.unbindMatchMediaListener()},methods:{bindMatchMediaListener:function(){var t=this;if(!this.matchMediaListener){var n=matchMedia("(max-width: ".concat(this.breakpoint,")"));this.query=n,this.queryMatches=n.matches,this.matchMediaListener=function(){t.queryMatches=n.matches,t.mobileActive=!1},this.query.addEventListener("change",this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&(this.query.removeEventListener("change",this.matchMediaListener),this.matchMediaListener=null)}},computed:{containerClass:function(){return[this.class,this.cx("root")]}},components:{DockSub:M}};function tt(e,t,n,o,r,i){var m=F("DockSub");return c(),l("div",d({class:i.containerClass,style:e.style},e.ptmi("root")),[h(m,{model:e.model,templates:e.$slots,tooltipOptions:e.tooltipOptions,position:e.position,menuId:e.menuId,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,tabindex:e.tabindex,pt:e.pt,unstyled:e.unstyled},null,8,["model","templates","tooltipOptions","position","menuId","aria-label","aria-labelledby","tabindex","pt","unstyled"])],16)}A.render=tt;const et={class:"card dock-demo"},nt={class:"dock-window",style:{"background-image":"'url((/closeup-programming-code-language.jpg))'"}},it=["alt","src"],ot={__name:"Dock",setup(e){const t=B([{label:"Finder",icon:"https://primefaces.org/cdn/primevue/images/dock/finder.svg"},{label:"App Store",icon:"https://primefaces.org/cdn/primevue/images/dock/appstore.svg"},{label:"Photos",icon:"https://primefaces.org/cdn/primevue/images/dock/photos.svg"},{label:"Trash",icon:"https://primefaces.org/cdn/primevue/images/dock/trash.png"}]);return(n,o)=>{const r=w;return c(),l("div",et,[h(j),p("div",nt,[h(U(A),{model:t.value,position:n.position},{itemicon:N(({item:i})=>[f(p("img",{alt:i.label,src:i.icon,style:{width:"100%"}},null,8,it),[[r,i.label,void 0,{top:!0}]])]),_:1},8,["model","position"])])])}}},ct=q(ot,[["__scopeId","data-v-5a4e5756"]]);export{ct as default};
