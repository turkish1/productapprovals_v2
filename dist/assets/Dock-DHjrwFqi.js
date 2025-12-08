import{e as u,g as P,o as c,c as d,i as p,B as C,s as O,U as y,N as K,O as m,P as v,m as l,R as T,T as M,Q as I,F as E,x as F,K as h,a as L,n as U,b as x,v as B,j as b,S as N,k as j}from"./index-BA1eTbHH.js";import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";const z={class:"relative h-screen"},H=p("div",{class:"absolute inset-0 opacity-10"},null,-1),R=p("div",{class:"relative z-10 p-4"},null,-1),J=[H,R],V={__name:"UserDash",setup(t){u(1e3),u(120),u(5e3);const e=u([]);return u([{label:"Add",icon:"pi pi-pencil",command:()=>{toast.add({severity:"info",summary:"Add",detail:"Data Added",life:3e3})}},{label:"Update",icon:"pi pi-refresh",command:()=>{toast.add({severity:"success",summary:"Update",detail:"Data Updated",life:3e3})}},{label:"Delete",icon:"pi pi-trash",command:()=>{toast.add({severity:"error",summary:"Delete",detail:"Data Deleted",life:3e3})}},{label:"Upload",icon:"pi pi-upload",command:()=>{router.push("/fileupload")}},{label:"Vue Website",icon:"pi pi-external-link",command:()=>{window.location.href="https://vuejs.org/"}}]),u([{label:"Mail",icon:"pi pi-envelope",badge:5,items:[{label:"Compose",icon:"pi pi-file-edit",shortcut:"⌘+N"},{label:"Inbox",icon:"pi pi-inbox",badge:5},{label:"Sent",icon:"pi pi-send",shortcut:"⌘+S"},{label:"Trash",icon:"pi pi-trash",shortcut:"⌘+T"}]},{label:"Reports",icon:"pi pi-chart-bar",shortcut:"⌘+R",items:[{label:"Projects",icon:"pi pi-chart-line",badge:3},{label:"Products",icon:"pi pi-list",badge:6}]},{label:"Profile",icon:"pi pi-user",shortcut:"⌘+W",items:[{label:"Settings",icon:"pi pi-cog",shortcut:"⌘+O"},{label:"Privacy",icon:"pi pi-shield",shortcut:"⌘+P"}]}]),P(()=>{e.value=[{user:"John Doe",activity:"Logged in",date:"2024-09-01"},{user:"Jane Smith",activity:"Purchased Item",date:"2024-09-02"},{user:"Bob Johnson",activity:"Logged out",date:"2024-09-03"}]}),(n,o)=>(c(),d("div",z,J))}};var W=function(e){var n=e.dt;return`
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
`)},Q={root:function(e){var n=e.instance,o=e.props;return["p-dock p-component","p-dock-".concat(o.position),{"p-dock-mobile":n.queryMatches}]},listContainer:"p-dock-list-container",list:"p-dock-list",item:function(e){var n=e.instance,o=e.processedItem,r=e.id;return["p-dock-item",{"p-focus":n.isItemActive(r),"p-disabled":n.disabled(o)}]},itemContent:"p-dock-item-content",itemLink:"p-dock-item-link",itemIcon:"p-dock-item-icon"},G=C.extend({name:"dock",theme:W,classes:Q}),X={name:"BaseDock",extends:O,props:{position:{type:String,default:"bottom"},model:null,class:null,style:null,tooltipOptions:null,menuId:{type:String,default:null},tabindex:{type:Number,default:0},breakpoint:{type:String,default:"960px"},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:G,provide:function(){return{$pcDock:this,$parentInstance:this}}};function w(t){return ee(t)||$(t)||Z(t)||Y()}function Y(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Z(t,e){if(t){if(typeof t=="string")return g(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(t,e):void 0}}function $(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ee(t){if(Array.isArray(t))return g(t)}function g(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}var D={name:"DockSub",hostName:"Dock",extends:O,emits:["focus","blur"],props:{position:{type:String,default:"bottom"},model:{type:Array,default:null},templates:{type:null,default:null},tooltipOptions:null,menuId:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},data:function(){return{id:this.menuId,currentIndex:-3,focused:!1,focusedOptionIndex:-1}},watch:{menuId:function(e){this.id=e||y()}},mounted:function(){this.id=this.id||y()},methods:{getItemId:function(e){return"".concat(this.id,"_").concat(e)},getItemProp:function(e,n){return e&&e.item?K(e.item[n]):void 0},getPTOptions:function(e,n,o){return this.ptm(e,{context:{index:o,item:n,active:this.isItemActive(this.getItemId(o))}})},isSameMenuItem:function(e){return e.currentTarget&&(e.currentTarget.isSameNode(e.target)||e.currentTarget.isSameNode(e.target.closest('[data-pc-section="item"]')))},isItemActive:function(e){return e===this.focusedOptionIndex},onListMouseLeave:function(){this.currentIndex=-3},onItemMouseEnter:function(e){this.currentIndex=e},onItemClick:function(e,n){if(this.isSameMenuItem(e)){var o=this.getItemProp(n,"command");o&&o({originalEvent:e,item:n.item})}},onListFocus:function(e){this.focused=!0,this.changeFocusedOptionIndex(0),this.$emit("focus",e)},onListBlur:function(e){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",e)},onListKeyDown:function(e){switch(e.code){case"ArrowDown":{(this.position==="left"||this.position==="right")&&this.onArrowDownKey(),e.preventDefault();break}case"ArrowUp":{(this.position==="left"||this.position==="right")&&this.onArrowUpKey(),e.preventDefault();break}case"ArrowRight":{(this.position==="top"||this.position==="bottom")&&this.onArrowDownKey(),e.preventDefault();break}case"ArrowLeft":{(this.position==="top"||this.position==="bottom")&&this.onArrowUpKey(),e.preventDefault();break}case"Home":{this.onHomeKey(),e.preventDefault();break}case"End":{this.onEndKey(),e.preventDefault();break}case"Enter":case"NumpadEnter":case"Space":{this.onSpaceKey(e),e.preventDefault();break}}},onArrowDownKey:function(){var e=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e)},onArrowUpKey:function(){var e=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e)},onHomeKey:function(){this.changeFocusedOptionIndex(0)},onEndKey:function(){this.changeFocusedOptionIndex(m(this.$refs.list,'li[data-pc-section="item"][data-p-disabled="false"]').length-1)},onSpaceKey:function(){var e=v(this.$refs.list,'li[id="'.concat("".concat(this.focusedOptionIndex),'"]')),n=e&&v(e,'[data-pc-section="itemlink"]');n?n.click():e&&e.click()},findNextOptionIndex:function(e){var n=m(this.$refs.list,'li[data-pc-section="item"][data-p-disabled="false"]'),o=w(n).findIndex(function(r){return r.id===e});return o>-1?o+1:0},findPrevOptionIndex:function(e){var n=m(this.$refs.list,'li[data-pc-section="item"][data-p-disabled="false"]'),o=w(n).findIndex(function(r){return r.id===e});return o>-1?o-1:0},changeFocusedOptionIndex:function(e){var n=m(this.$refs.list,'li[data-pc-section="item"][data-p-disabled="false"]'),o=e>=n.length?n.length-1:e<0?0:e;this.focusedOptionIndex=n[o].getAttribute("id")},disabled:function(e){return typeof e.disabled=="function"?e.disabled():e.disabled},getMenuItemProps:function(e,n){return{action:l({tabindex:-1,"aria-hidden":!0,class:this.cx("itemLink")},this.getPTOptions("itemLink",e,n)),icon:l({class:[this.cx("itemIcon"),e.icon]},this.getPTOptions("itemIcon",e,n))}}},computed:{focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null}},directives:{ripple:T,tooltip:M}},te=["id","aria-orientation","aria-activedescendant","tabindex","aria-label","aria-labelledby"],ne=["id","aria-label","aria-disabled","onClick","onMouseenter","data-p-focused","data-p-disabled"],ie=["href","target"];function oe(t,e,n,o,r,i){var f=I("ripple"),A=I("tooltip");return c(),d("div",l({class:t.cx("listContainer")},t.ptm("listContainer")),[p("ul",l({ref:"list",id:r.id,class:t.cx("list"),role:"menu","aria-orientation":n.position==="bottom"||n.position==="top"?"horizontal":"vertical","aria-activedescendant":r.focused?i.focusedOptionId:void 0,tabindex:n.tabindex,"aria-label":n.ariaLabel,"aria-labelledby":n.ariaLabelledby,onFocus:e[0]||(e[0]=function(){return i.onListFocus&&i.onListFocus.apply(i,arguments)}),onBlur:e[1]||(e[1]=function(){return i.onListBlur&&i.onListBlur.apply(i,arguments)}),onKeydown:e[2]||(e[2]=function(){return i.onListKeyDown&&i.onListKeyDown.apply(i,arguments)}),onMouseleave:e[3]||(e[3]=function(){return i.onListMouseLeave&&i.onListMouseLeave.apply(i,arguments)})},t.ptm("list")),[(c(!0),d(E,null,F(n.model,function(a,s){return c(),d("li",l({key:s,id:i.getItemId(s),class:t.cx("item",{processedItem:a,id:i.getItemId(s)}),role:"menuitem","aria-label":a.label,"aria-disabled":i.disabled(a),onClick:function(k){return i.onItemClick(k,a)},onMouseenter:function(k){return i.onItemMouseEnter(s)},ref_for:!0},i.getPTOptions("item",a,s),{"data-p-focused":i.isItemActive(i.getItemId(s)),"data-p-disabled":i.disabled(a)||!1}),[p("div",l({class:t.cx("itemContent"),ref_for:!0},i.getPTOptions("itemContent",a,s)),[n.templates.item?(c(),L(x(n.templates.item),{key:1,item:a,index:s,label:a.label,props:i.getMenuItemProps(a,s)},null,8,["item","index","label","props"])):h((c(),d("a",l({key:0,href:a.url,class:t.cx("itemLink"),target:a.target,tabindex:"-1","aria-hidden":"true",ref_for:!0},i.getPTOptions("itemLink",a,s)),[!n.templates.icon&&!n.templates.itemicon?h((c(),d("span",l({key:0,class:[t.cx("itemIcon"),a.icon],ref_for:!0},i.getPTOptions("itemIcon",a,s)),null,16)),[[f]]):(c(),L(x(n.templates.icon||n.templates.itemicon),{key:1,item:a,class:U(t.cx("itemIcon"))},null,8,["item","class"]))],16,ie)),[[A,{value:a.label,disabled:!n.tooltipOptions},n.tooltipOptions]])],16)],16,ne)}),128))],16,te)],16)}D.render=oe;var S={name:"Dock",extends:X,inheritAttrs:!1,matchMediaListener:null,data:function(){return{query:null,queryMatches:!1}},mounted:function(){this.bindMatchMediaListener()},beforeUnmount:function(){this.unbindMatchMediaListener()},methods:{bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var n=matchMedia("(max-width: ".concat(this.breakpoint,")"));this.query=n,this.queryMatches=n.matches,this.matchMediaListener=function(){e.queryMatches=n.matches,e.mobileActive=!1},this.query.addEventListener("change",this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&(this.query.removeEventListener("change",this.matchMediaListener),this.matchMediaListener=null)}},computed:{containerClass:function(){return[this.class,this.cx("root")]}},components:{DockSub:D}};function ae(t,e,n,o,r,i){var f=B("DockSub");return c(),d("div",l({class:i.containerClass,style:t.style},t.ptmi("root")),[b(f,{model:t.model,templates:t.$slots,tooltipOptions:t.tooltipOptions,position:t.position,menuId:t.menuId,"aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,tabindex:t.tabindex,pt:t.pt,unstyled:t.unstyled},null,8,["model","templates","tooltipOptions","position","menuId","aria-label","aria-labelledby","tabindex","pt","unstyled"])],16)}S.render=ae;const re={class:"card dock-demo"},se={class:"dock-window",style:{"background-image":"'url((/closeup-programming-code-language.jpg))'"}},ce=["alt","src"],le={__name:"Dock",setup(t){const e=u([{label:"Finder",icon:"https://primefaces.org/cdn/primevue/images/dock/finder.svg"},{label:"App Store",icon:"https://primefaces.org/cdn/primevue/images/dock/appstore.svg"},{label:"Photos",icon:"https://primefaces.org/cdn/primevue/images/dock/photos.svg"},{label:"Trash",icon:"https://primefaces.org/cdn/primevue/images/dock/trash.png"}]);return(n,o)=>{const r=M;return c(),d("div",re,[b(V),p("div",se,[b(j(S),{model:e.value,position:n.position},{itemicon:N(({item:i})=>[h(p("img",{alt:i.label,src:i.icon,style:{width:"100%"}},null,8,ce),[[r,i.label,void 0,{top:!0}]])]),_:1},8,["model","position"])])])}}},pe=q(le,[["__scopeId","data-v-5a4e5756"]]);export{pe as default};
