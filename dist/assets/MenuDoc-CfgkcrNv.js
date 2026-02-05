import{B as G,U as T,N as F,a6 as z,a1 as y,b3 as U,P as x,m,s as S,a5 as I,R as q,v as K,Q as W,o as l,c as d,F as P,x as O,i as h,K as H,a as v,b as k,d as p,n as M,t as _,j as g,S as L,ai as me,aj as Z,a4 as X,b7 as oe,ag as A,r as E,aO as Be,an as D,at as $,a7 as B,y as le,aa as de,b8 as fe,ao as Re,b9 as Ne,ba as Ge,aU as je,au as Ue,bb as qe,e as C,z as V}from"./index-j-3Mtl8U.js";import{s as he}from"./index-B7dN212y.js";import{s as ee,f as te,b as We,a as Ze,e as Xe,c as Ye,d as Qe}from"./index-DxZ4nlOA.js";import{s as be}from"./index-_0mHO_Wm.js";import{s as Je}from"./index-DE1lEZuq.js";import{s as $e,a as et,b as tt}from"./index-CpuG-aKn.js";import{s as nt,a as it}from"./index--UZ88lY3.js";import{s as at}from"./index-QQQD2DU0.js";import"./index-BHpMlWsk.js";var ot=function(e){var t=e.dt;return`
.p-panelmenu {
    display: flex;
    flex-direction: column;
    gap: `.concat(t("panelmenu.gap"),`;
}

.p-panelmenu-panel {
    background: `).concat(t("panelmenu.panel.background"),`;
    border-width: `).concat(t("panelmenu.panel.border.width"),`;
    border-style: solid;
    border-color: `).concat(t("panelmenu.panel.border.color"),`;
    color: `).concat(t("panelmenu.panel.color"),`;
    border-radius: `).concat(t("panelmenu.panel.border.radius"),`;
    padding: `).concat(t("panelmenu.panel.padding"),`;
}

.p-panelmenu-panel:first-child {
    border-width: `).concat(t("panelmenu.panel.first.border.width"),`;
    border-top-left-radius: `).concat(t("panelmenu.panel.first.top.border.radius"),`;
    border-top-right-radius: `).concat(t("panelmenu.panel.first.top.border.radius"),`;
}

.p-panelmenu-panel:last-child {
    border-width: `).concat(t("panelmenu.panel.last.border.width"),`;
    border-bottom-left-radius: `).concat(t("panelmenu.panel.last.bottom.border.radius"),`;
    border-bottom-right-radius: `).concat(t("panelmenu.panel.last.bottom.border.radius"),`;
}

.p-panelmenu-header {
    outline: 0 none;
}

.p-panelmenu-header-content {
    border-radius: `).concat(t("panelmenu.item.border.radius"),`;
    transition: background `).concat(t("panelmenu.transition.duration"),", color ").concat(t("panelmenu.transition.duration"),", outline-color ").concat(t("panelmenu.transition.duration"),", box-shadow ").concat(t("panelmenu.transition.duration"),`;
    outline-color: transparent;
    color: `).concat(t("panelmenu.item.color"),`;
}

.p-panelmenu-header-link {
    display: flex;
    gap: `).concat(t("panelmenu.item.gap"),`;
    padding: `).concat(t("panelmenu.item.padding"),`;
    align-items: center;
    user-select: none;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    color: inherit;
}

.p-panelmenu-header-icon,
.p-panelmenu-item-icon {
    color: `).concat(t("panelmenu.item.icon.color"),`;
}

.p-panelmenu-submenu-icon {
    color: `).concat(t("panelmenu.submenu.icon.color"),`;
}

.p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content {
    background: `).concat(t("panelmenu.item.focus.background"),`;
    color: `).concat(t("panelmenu.item.focus.color"),`;
}

.p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content .p-panelmenu-header-icon {
    color: `).concat(t("panelmenu.item.icon.focus.color"),`;
}

.p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content .p-panelmenu-submenu-icon {
    color: `).concat(t("panelmenu.submenu.icon.focus.color"),`;
}

.p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover {
    background: `).concat(t("panelmenu.item.focus.background"),`;
    color: `).concat(t("panelmenu.item.focus.color"),`;
}

.p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover .p-panelmenu-header-icon {
    color: `).concat(t("panelmenu.item.icon.focus.color"),`;
}

.p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover .p-panelmenu-submenu-icon {
    color: `).concat(t("panelmenu.submenu.icon.focus.color"),`;
}

.p-panelmenu-submenu {
    margin: 0;
    padding: 0 0 0 `).concat(t("panelmenu.submenu.indent"),`;
    outline: 0;
    list-style: none;
}

.p-panelmenu-item-link {
    display: flex;
    gap: `).concat(t("panelmenu.item.gap"),`;
    padding: `).concat(t("panelmenu.item.padding"),`;
    align-items: center;
    user-select: none;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    position: relative;
    overflow: hidden;
}

.p-panelmenu-item-label {
    line-height: 1;
}

.p-panelmenu-item-content {
    border-radius: `).concat(t("panelmenu.item.border.radius"),`;
    transition: background `).concat(t("panelmenu.transition.duration"),", color ").concat(t("panelmenu.transition.duration"),", outline-color ").concat(t("panelmenu.transition.duration"),", box-shadow ").concat(t("panelmenu.transition.duration"),`;
    color: `).concat(t("panelmenu.item.color"),`;
    outline-color: transparent;
}

.p-panelmenu-item.p-focus > .p-panelmenu-item-content {
    background: `).concat(t("panelmenu.item.focus.background"),`;
    color: `).concat(t("panelmenu.item.focus.color"),`;
}

.p-panelmenu-item.p-focus > .p-panelmenu-item-content .p-panelmenu-item-icon {
    color: `).concat(t("panelmenu.item.focus.color"),`;
}

.p-panelmenu-item.p-focus > .p-panelmenu-item-content .p-panelmenu-submenu-icon {
    color: `).concat(t("panelmenu.submenu.icon.focus.color"),`;
}

.p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover {
    background: `).concat(t("panelmenu.item.focus.background"),`;
    color: `).concat(t("panelmenu.item.focus.color"),`;
}

.p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover .p-panelmenu-item-icon {
    color: `).concat(t("panelmenu.item.icon.focus.color"),`;
}

.p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover .p-panelmenu-submenu-icon {
    color: `).concat(t("panelmenu.submenu.icon.focus.color"),`;
}
`)},rt={root:"p-panelmenu p-component",panel:"p-panelmenu-panel",header:function(e){var t=e.instance,a=e.item;return["p-panelmenu-header",{"p-panelmenu-header-active":t.isItemActive(a)&&!!a.items,"p-disabled":t.isItemDisabled(a)}]},headerContent:"p-panelmenu-header-content",headerLink:"p-panelmenu-header-link",headerIcon:"p-panelmenu-header-icon",headerLabel:"p-panelmenu-header-label",contentContainer:"p-panelmenu-content-container",content:"p-panelmenu-content",rootList:"p-panelmenu-root-list",item:function(e){var t=e.instance,a=e.processedItem;return["p-panelmenu-item",{"p-focus":t.isItemFocused(a),"p-disabled":t.isItemDisabled(a)}]},itemContent:"p-panelmenu-item-content",itemLink:"p-panelmenu-item-link",itemIcon:"p-panelmenu-item-icon",itemLabel:"p-panelmenu-item-label",submenuIcon:"p-panelmenu-submenu-icon",submenu:"p-panelmenu-submenu",separator:"p-menuitem-separator"},st=G.extend({name:"panelmenu",theme:ot,classes:rt}),ut={name:"BasePanelMenu",extends:S,props:{model:{type:Array,default:null},expandedKeys:{type:Object,default:null},multiple:{type:Boolean,default:!1},tabindex:{type:Number,default:0}},style:st,provide:function(){return{$pcPanelMenu:this,$parentInstance:this}}},Ie={name:"PanelMenuSub",hostName:"PanelMenu",extends:S,emits:["item-toggle","item-mousemove"],props:{panelId:{type:String,default:null},focusedItemId:{type:String,default:null},items:{type:Array,default:null},level:{type:Number,default:0},templates:{type:Object,default:null},activeItemPath:{type:Object,default:null},tabindex:{type:Number,default:-1}},methods:{getItemId:function(e){return"".concat(this.panelId,"_").concat(e.key)},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,a){return e&&e.item?F(e.item[t],a):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getPTOptions:function(e,t,a){return this.ptm(e,{context:{item:t,index:a,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t)}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return I(e.items)},onItemClick:function(e,t){this.getItemProp(t,"command",{originalEvent:e,item:t.item}),this.$emit("item-toggle",{processedItem:t,expanded:!this.isItemActive(t)})},onItemToggle:function(e){this.$emit("item-toggle",e)},onItemMouseMove:function(e,t){this.$emit("item-mousemove",{originalEvent:e,processedItem:t})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,"separator")}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(a){return t.isItemVisible(a)&&t.getItemProp(a,"separator")}).length+1},getMenuItemProps:function(e,t){return{action:m({class:this.cx("itemLink"),tabindex:-1,"aria-hidden":!0},this.getPTOptions("itemLink",e,t)),icon:m({class:[this.cx("itemIcon"),this.getItemProp(e,"icon")]},this.getPTOptions("itemIcon",e,t)),label:m({class:this.cx("itemLabel")},this.getPTOptions("itemLabel",e,t)),submenuicon:m({class:this.cx("submenuIcon")},this.getPTOptions("submenuicon",e,t))}}},components:{ChevronRightIcon:ee,ChevronDownIcon:he},directives:{ripple:q}},ct=["tabindex"],mt=["id","aria-label","aria-expanded","aria-level","aria-setsize","aria-posinset","data-p-focused","data-p-disabled"],lt=["onClick","onMousemove"],dt=["href","target"];function ft(n,e,t,a,o,i){var u=K("PanelMenuSub",!0),c=W("ripple");return l(),d("ul",{class:M(n.cx("submenu")),tabindex:t.tabindex},[(l(!0),d(P,null,O(t.items,function(r,s){return l(),d(P,{key:i.getItemKey(r)},[i.isItemVisible(r)&&!i.getItemProp(r,"separator")?(l(),d("li",m({key:0,id:i.getItemId(r),class:[n.cx("item",{processedItem:r}),i.getItemProp(r,"class")],style:i.getItemProp(r,"style"),role:"treeitem","aria-label":i.getItemLabel(r),"aria-expanded":i.isItemGroup(r)?i.isItemActive(r):void 0,"aria-level":t.level+1,"aria-setsize":i.getAriaSetSize(),"aria-posinset":i.getAriaPosInset(s),ref_for:!0},i.getPTOptions("item",r,s),{"data-p-focused":i.isItemFocused(r),"data-p-disabled":i.isItemDisabled(r)}),[h("div",m({class:n.cx("itemContent"),onClick:function(b){return i.onItemClick(b,r)},onMousemove:function(b){return i.onItemMouseMove(b,r)},ref_for:!0},i.getPTOptions("itemContent",r,s)),[t.templates.item?(l(),v(k(t.templates.item),{key:1,item:r.item,root:!1,active:i.isItemActive(r),hasSubmenu:i.isItemGroup(r),label:i.getItemLabel(r),props:i.getMenuItemProps(r,s)},null,8,["item","active","hasSubmenu","label","props"])):H((l(),d("a",m({key:0,href:i.getItemProp(r,"url"),class:n.cx("itemLink"),target:i.getItemProp(r,"target"),tabindex:"-1","aria-hidden":"true",ref_for:!0},i.getPTOptions("itemLink",r,s)),[i.isItemGroup(r)?(l(),d(P,{key:0},[t.templates.submenuicon?(l(),v(k(t.templates.submenuicon),m({key:0,class:n.cx("submenuIcon"),active:i.isItemActive(r),ref_for:!0},i.getPTOptions("submenuIcon",r,s)),null,16,["class","active"])):(l(),v(k(i.isItemActive(r)?"ChevronDownIcon":"ChevronRightIcon"),m({key:1,class:n.cx("submenuIcon"),ref_for:!0},i.getPTOptions("submenuIcon",r,s)),null,16,["class"]))],64)):p("",!0),t.templates.itemicon?(l(),v(k(t.templates.itemicon),{key:1,item:r.item,class:M(n.cx("itemIcon"))},null,8,["item","class"])):i.getItemProp(r,"icon")?(l(),d("span",m({key:2,class:[n.cx("itemIcon"),i.getItemProp(r,"icon")],ref_for:!0},i.getPTOptions("itemIcon",r,s)),null,16)):p("",!0),h("span",m({class:n.cx("itemLabel"),ref_for:!0},i.getPTOptions("itemLabel",r,s)),_(i.getItemLabel(r)),17)],16,dt)),[[c]])],16,lt),g(Z,m({name:"p-toggleable-content",ref_for:!0},n.ptm("transition")),{default:L(function(){return[H(h("div",m({class:n.cx("contentContainer"),ref_for:!0},n.ptm("contentContainer")),[i.isItemVisible(r)&&i.isItemGroup(r)?(l(),v(u,m({key:0,id:i.getItemId(r)+"_list",role:"group",panelId:t.panelId,focusedItemId:t.focusedItemId,items:r.items,level:t.level+1,templates:t.templates,activeItemPath:t.activeItemPath,onItemToggle:i.onItemToggle,onItemMousemove:e[0]||(e[0]=function(f){return n.$emit("item-mousemove",f)}),pt:n.pt,unstyled:n.unstyled,ref_for:!0},n.ptm("submenu")),null,16,["id","panelId","focusedItemId","items","level","templates","activeItemPath","onItemToggle","pt","unstyled"])):p("",!0)],16),[[me,i.isItemActive(r)]])]}),_:2},1040)],16,mt)):p("",!0),i.isItemVisible(r)&&i.getItemProp(r,"separator")?(l(),d("li",m({key:1,style:i.getItemProp(r,"style"),class:[n.cx("separator"),i.getItemProp(r,"class")],role:"separator",ref_for:!0},n.ptm("separator")),null,16)):p("",!0)],64)}),128))],10,ct)}Ie.render=ft;function ht(n,e){return gt(n)||pt(n,e)||It(n,e)||bt()}function bt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function It(n,e){if(n){if(typeof n=="string")return re(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?re(n,e):void 0}}function re(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,a=Array(e);t<e;t++)a[t]=n[t];return a}function pt(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var a,o,i,u,c=[],r=!0,s=!1;try{if(i=(t=t.call(n)).next,e!==0)for(;!(r=(a=i.call(t)).done)&&(c.push(a.value),c.length!==e);r=!0);}catch(f){s=!0,o=f}finally{try{if(!r&&t.return!=null&&(u=t.return(),Object(u)!==u))return}finally{if(s)throw o}}return c}}function gt(n){if(Array.isArray(n))return n}var pe={name:"PanelMenuList",hostName:"PanelMenu",extends:S,emits:["item-toggle","header-focus"],props:{panelId:{type:String,default:null},items:{type:Array,default:null},templates:{type:Object,default:null},expandedKeys:{type:Object,default:null}},searchTimeout:null,searchValue:null,data:function(){return{focused:!1,focusedItem:null,activeItemPath:[]}},watch:{expandedKeys:function(e){this.autoUpdateActiveItemPath(e)}},mounted:function(){this.autoUpdateActiveItemPath(this.expandedKeys)},methods:{getItemProp:function(e,t){return e&&e.item?F(e.item[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.parentKey})},isItemGroup:function(e){return I(e.items)},onFocus:function(e){this.focused=!0,this.focusedItem=this.focusedItem||(this.isElementInPanel(e,e.relatedTarget)?this.findFirstItem():this.findLastItem())},onBlur:function(){this.focused=!1,this.focusedItem=null,this.searchValue=""},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Space":this.onSpaceKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":case"Tab":case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!t&&X(e.key)&&this.searchItems(e,e.key);break}},onArrowDownKey:function(e){var t=I(this.focusedItem)?this.findNextItem(this.focusedItem):this.findFirstItem();this.changeFocusedItem({originalEvent:e,processedItem:t,focusOnNext:!0}),e.preventDefault()},onArrowUpKey:function(e){var t=I(this.focusedItem)?this.findPrevItem(this.focusedItem):this.findLastItem();this.changeFocusedItem({originalEvent:e,processedItem:t,selfCheck:!0}),e.preventDefault()},onArrowLeftKey:function(e){var t=this;if(I(this.focusedItem)){var a=this.activeItemPath.some(function(o){return o.key===t.focusedItem.key});a?this.activeItemPath=this.activeItemPath.filter(function(o){return o.key!==t.focusedItem.key}):this.focusedItem=I(this.focusedItem.parent)?this.focusedItem.parent:this.focusedItem,e.preventDefault()}},onArrowRightKey:function(e){var t=this;if(I(this.focusedItem)){var a=this.isItemGroup(this.focusedItem);if(a){var o=this.activeItemPath.some(function(i){return i.key===t.focusedItem.key});o?this.onArrowDownKey(e):(this.activeItemPath=this.activeItemPath.filter(function(i){return i.parentKey!==t.focusedItem.parentKey}),this.activeItemPath.push(this.focusedItem))}e.preventDefault()}},onHomeKey:function(e){this.changeFocusedItem({originalEvent:e,processedItem:this.findFirstItem(),allowHeaderFocus:!1}),e.preventDefault()},onEndKey:function(e){this.changeFocusedItem({originalEvent:e,processedItem:this.findLastItem(),focusOnNext:!0,allowHeaderFocus:!1}),e.preventDefault()},onEnterKey:function(e){if(I(this.focusedItem)){var t=x(this.$el,'li[id="'.concat("".concat(this.focusedItemId),'"]')),a=t&&(x(t,'[data-pc-section="itemlink"]')||x(t,"a,button"));a?a.click():t&&t.click()}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onItemToggle:function(e){var t=e.processedItem,a=e.expanded;this.expandedKeys?this.$emit("item-toggle",{item:t.item,expanded:a}):(this.activeItemPath=this.activeItemPath.filter(function(o){return o.parentKey!==t.parentKey}),a&&this.activeItemPath.push(t)),this.focusedItem=t,y(this.$el)},onItemMouseMove:function(e){this.focused&&(this.focusedItem=e.processedItem)},isElementInPanel:function(e,t){var a=e.currentTarget.closest('[data-pc-section="panel"]');return a&&a.contains(t)},isItemMatched:function(e){var t;return this.isValidItem(e)&&((t=this.getItemLabel(e))===null||t===void 0?void 0:t.toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale)))},isVisibleItem:function(e){return!!e&&(e.level===0||this.isItemActive(e))&&this.isItemVisible(e)},isValidItem:function(e){return!!e&&!this.isItemDisabled(e)&&!this.getItemProp(e,"separator")},findFirstItem:function(){var e=this;return this.visibleItems.find(function(t){return e.isValidItem(t)})},findLastItem:function(){var e=this;return oe(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItem:function(e){var t=this,a=this.visibleItems.findIndex(function(i){return i.key===e.key}),o=a<this.visibleItems.length-1?this.visibleItems.slice(a+1).find(function(i){return t.isValidItem(i)}):void 0;return o||e},findPrevItem:function(e){var t=this,a=this.visibleItems.findIndex(function(i){return i.key===e.key}),o=a>0?oe(this.visibleItems.slice(0,a),function(i){return t.isValidItem(i)}):void 0;return o||e},searchItems:function(e,t){var a=this;this.searchValue=(this.searchValue||"")+t;var o=null,i=!1;if(I(this.focusedItem)){var u=this.visibleItems.findIndex(function(c){return c.key===a.focusedItem.key});o=this.visibleItems.slice(u).find(function(c){return a.isItemMatched(c)}),o=A(o)?this.visibleItems.slice(0,u).find(function(c){return a.isItemMatched(c)}):o}else o=this.visibleItems.find(function(c){return a.isItemMatched(c)});return I(o)&&(i=!0),A(o)&&A(this.focusedItem)&&(o=this.findFirstItem()),I(o)&&this.changeFocusedItem({originalEvent:e,processedItem:o,allowHeaderFocus:!1}),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){a.searchValue="",a.searchTimeout=null},500),i},changeFocusedItem:function(e){var t=e.originalEvent,a=e.processedItem,o=e.focusOnNext,i=e.selfCheck,u=e.allowHeaderFocus,c=u===void 0?!0:u;I(this.focusedItem)&&this.focusedItem.key!==a.key?(this.focusedItem=a,this.scrollInView()):c&&this.$emit("header-focus",{originalEvent:t,focusOnNext:o,selfCheck:i})},scrollInView:function(){var e=x(this.$el,'li[id="'.concat("".concat(this.focusedItemId),'"]'));e&&e.scrollIntoView&&e.scrollIntoView({block:"nearest",inline:"start"})},autoUpdateActiveItemPath:function(e){var t=this;this.activeItemPath=Object.entries(e||{}).reduce(function(a,o){var i=ht(o,2),u=i[0],c=i[1];if(c){var r=t.findProcessedItemByItemKey(u);r&&a.push(r)}return a},[])},findProcessedItemByItemKey:function(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0;if(t=t||a===0&&this.processedItems,!t)return null;for(var o=0;o<t.length;o++){var i=t[o];if(this.getItemProp(i,"key")===e)return i;var u=this.findProcessedItemByItemKey(e,i.items,a+1);if(u)return u}},createProcessedItems:function(e){var t=this,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",u=[];return e&&e.forEach(function(c,r){var s=(i!==""?i+"_":"")+r,f={item:c,index:r,level:a,key:s,parent:o,parentKey:i};f.items=t.createProcessedItems(c.items,a+1,f,s),u.push(f)}),u},flatItems:function(e){var t=this,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e&&e.forEach(function(o){t.isVisibleItem(o)&&(a.push(o),t.flatItems(o.items,a))}),a}},computed:{processedItems:function(){return this.createProcessedItems(this.items||[])},visibleItems:function(){return this.flatItems(this.processedItems)},focusedItemId:function(){return I(this.focusedItem)?"".concat(this.panelId,"_").concat(this.focusedItem.key):null}},components:{PanelMenuSub:Ie}};function vt(n,e,t,a,o,i){var u=K("PanelMenuSub");return l(),v(u,m({id:t.panelId+"_list",class:n.cx("rootList"),role:"tree",tabindex:-1,"aria-activedescendant":o.focused?i.focusedItemId:void 0,panelId:t.panelId,focusedItemId:o.focused?i.focusedItemId:void 0,items:i.processedItems,templates:t.templates,activeItemPath:o.activeItemPath,onFocus:i.onFocus,onBlur:i.onBlur,onKeydown:i.onKeyDown,onItemToggle:i.onItemToggle,onItemMousemove:i.onItemMouseMove,pt:n.pt,unstyled:n.unstyled},n.ptm("rootList")),null,16,["id","class","aria-activedescendant","panelId","focusedItemId","items","templates","activeItemPath","onFocus","onBlur","onKeydown","onItemToggle","onItemMousemove","pt","unstyled"])}pe.render=vt;function R(n){"@babel/helpers - typeof";return R=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(n)}function se(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(n,o).enumerable})),t.push.apply(t,a)}return t}function yt(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?se(Object(t),!0).forEach(function(a){kt(n,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):se(Object(t)).forEach(function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(t,a))})}return n}function kt(n,e,t){return(e=xt(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function xt(n){var e=Pt(n,"string");return R(e)=="symbol"?e:e+""}function Pt(n,e){if(R(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var a=t.call(n,e||"default");if(R(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var ge={name:"PanelMenu",extends:ut,inheritAttrs:!1,emits:["update:expandedKeys","panel-open","panel-close"],data:function(){return{id:this.$attrs.id,activeItem:null,activeItems:[]}},watch:{"$attrs.id":function(e){this.id=e||T()}},mounted:function(){this.id=this.id||T()},methods:{getItemProp:function(e,t){return e?F(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getPTOptions:function(e,t,a){return this.ptm(e,{context:{index:a,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t)}})},isItemActive:function(e){return this.expandedKeys?this.expandedKeys[this.getItemProp(e,"key")]:this.multiple?this.activeItems.some(function(t){return z(e,t)}):z(e,this.activeItem)},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return z(e,this.activeItem)},getPanelId:function(e){return"".concat(this.id,"_").concat(e)},getPanelKey:function(e){return this.getPanelId(e)},getHeaderId:function(e){return"".concat(this.getPanelId(e),"_header")},getContentId:function(e){return"".concat(this.getPanelId(e),"_content")},onHeaderClick:function(e,t){if(this.isItemDisabled(t)){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),this.changeActiveItem(e,t),y(e.currentTarget)},onHeaderKeyDown:function(e,t){switch(e.code){case"ArrowDown":this.onHeaderArrowDownKey(e);break;case"ArrowUp":this.onHeaderArrowUpKey(e);break;case"Home":this.onHeaderHomeKey(e);break;case"End":this.onHeaderEndKey(e);break;case"Enter":case"NumpadEnter":case"Space":this.onHeaderEnterKey(e,t);break}},onHeaderArrowDownKey:function(e){var t=U(e.currentTarget,"data-p-active")===!0?x(e.currentTarget.nextElementSibling,'[data-pc-section="rootlist"]'):null;t?y(t):this.updateFocusedHeader({originalEvent:e,focusOnNext:!0}),e.preventDefault()},onHeaderArrowUpKey:function(e){var t=this.findPrevHeader(e.currentTarget.parentElement)||this.findLastHeader(),a=U(t,"data-p-active")===!0?x(t.nextElementSibling,'[data-pc-section="rootlist"]'):null;a?y(a):this.updateFocusedHeader({originalEvent:e,focusOnNext:!1}),e.preventDefault()},onHeaderHomeKey:function(e){this.changeFocusedHeader(e,this.findFirstHeader()),e.preventDefault()},onHeaderEndKey:function(e){this.changeFocusedHeader(e,this.findLastHeader()),e.preventDefault()},onHeaderEnterKey:function(e,t){var a=x(e.currentTarget,'[data-pc-section="headerlink"]');a?a.click():this.onHeaderClick(e,t),e.preventDefault()},findNextHeader:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=t?e:e.nextElementSibling,o=x(a,'[data-pc-section="header"]');return o?U(o,"data-p-disabled")?this.findNextHeader(o.parentElement):o:null},findPrevHeader:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=t?e:e.previousElementSibling,o=x(a,'[data-pc-section="header"]');return o?U(o,"data-p-disabled")?this.findPrevHeader(o.parentElement):o:null},findFirstHeader:function(){return this.findNextHeader(this.$el.firstElementChild,!0)},findLastHeader:function(){return this.findPrevHeader(this.$el.lastElementChild,!0)},updateFocusedHeader:function(e){var t=e.originalEvent,a=e.focusOnNext,o=e.selfCheck,i=t.currentTarget.closest('[data-pc-section="panel"]'),u=o?x(i,'[data-pc-section="header"]'):a?this.findNextHeader(i):this.findPrevHeader(i);u?this.changeFocusedHeader(t,u):a?this.onHeaderHomeKey(t):this.onHeaderEndKey(t)},changeActiveItem:function(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(!this.isItemDisabled(t)){var o=this.isItemActive(t),i=o?"panel-close":"panel-open";this.activeItem=a?t:this.activeItem&&z(t,this.activeItem)?null:t,this.multiple&&(this.activeItems.some(function(u){return z(t,u)})?this.activeItems=this.activeItems.filter(function(u){return!z(t,u)}):this.activeItems.push(t)),this.changeExpandedKeys({item:t,expanded:!o}),this.$emit(i,{originalEvent:e,item:t})}},changeExpandedKeys:function(e){var t=e.item,a=e.expanded,o=a===void 0?!1:a;if(this.expandedKeys){var i=yt({},this.expandedKeys);o?i[t.key]=!0:delete i[t.key],this.$emit("update:expandedKeys",i)}},changeFocusedHeader:function(e,t){t&&y(t)},getMenuItemProps:function(e,t){return{icon:m({class:[this.cx("headerIcon"),this.getItemProp(e,"icon")]},this.getPTOptions("headerIcon",e,t)),label:m({class:this.cx("headerLabel")},this.getPTOptions("headerLabel",e,t))}}},components:{PanelMenuList:pe,ChevronRightIcon:ee,ChevronDownIcon:he}},wt=["id"],Lt=["id","tabindex","aria-label","aria-expanded","aria-controls","aria-disabled","onClick","onKeydown","data-p-active","data-p-disabled"],Kt=["href"],Mt=["id","aria-labelledby"];function Ct(n,e,t,a,o,i){var u=K("PanelMenuList");return l(),d("div",m({id:o.id,class:n.cx("root")},n.ptmi("root")),[(l(!0),d(P,null,O(n.model,function(c,r){return l(),d(P,{key:i.getPanelKey(r)},[i.isItemVisible(c)?(l(),d("div",m({key:0,style:i.getItemProp(c,"style"),class:[n.cx("panel"),i.getItemProp(c,"class")],ref_for:!0},n.ptm("panel")),[h("div",m({id:i.getHeaderId(r),class:[n.cx("header",{item:c}),i.getItemProp(c,"headerClass")],tabindex:i.isItemDisabled(c)?-1:n.tabindex,role:"button","aria-label":i.getItemLabel(c),"aria-expanded":i.isItemActive(c),"aria-controls":i.getContentId(r),"aria-disabled":i.isItemDisabled(c),onClick:function(f){return i.onHeaderClick(f,c)},onKeydown:function(f){return i.onHeaderKeyDown(f,c)},ref_for:!0},i.getPTOptions("header",c,r),{"data-p-active":i.isItemActive(c),"data-p-disabled":i.isItemDisabled(c)}),[h("div",m({class:n.cx("headerContent"),ref_for:!0},i.getPTOptions("headerContent",c,r)),[n.$slots.item?(l(),v(k(n.$slots.item),{key:1,item:c,root:!0,active:i.isItemActive(c),hasSubmenu:i.getItemProp(c,"items"),label:i.getItemLabel(c),props:i.getMenuItemProps(c,r)},null,8,["item","active","hasSubmenu","label","props"])):(l(),d("a",m({key:0,href:i.getItemProp(c,"url"),class:n.cx("headerLink"),tabindex:-1,ref_for:!0},i.getPTOptions("headerLink",c,r)),[i.getItemProp(c,"items")?E(n.$slots,"submenuicon",{key:0,active:i.isItemActive(c)},function(){return[(l(),v(k(i.isItemActive(c)?"ChevronDownIcon":"ChevronRightIcon"),m({class:n.cx("submenuIcon"),ref_for:!0},i.getPTOptions("submenuIcon",c,r)),null,16,["class"]))]}):p("",!0),n.$slots.headericon?(l(),v(k(n.$slots.headericon),{key:1,item:c,class:M([n.cx("headerIcon"),i.getItemProp(c,"icon")])},null,8,["item","class"])):i.getItemProp(c,"icon")?(l(),d("span",m({key:2,class:[n.cx("headerIcon"),i.getItemProp(c,"icon")],ref_for:!0},i.getPTOptions("headerIcon",c,r)),null,16)):p("",!0),h("span",m({class:n.cx("headerLabel"),ref_for:!0},i.getPTOptions("headerLabel",c,r)),_(i.getItemLabel(c)),17)],16,Kt))],16)],16,Lt),g(Z,m({name:"p-toggleable-content",ref_for:!0},n.ptm("transition")),{default:L(function(){return[H(h("div",m({id:i.getContentId(r),class:n.cx("contentContainer"),role:"region","aria-labelledby":i.getHeaderId(r),ref_for:!0},n.ptm("contentContainer")),[i.getItemProp(c,"items")?(l(),d("div",m({key:0,class:n.cx("content"),ref_for:!0},n.ptm("content")),[g(u,{panelId:i.getPanelId(r),items:i.getItemProp(c,"items"),templates:n.$slots,expandedKeys:n.expandedKeys,onItemToggle:i.changeExpandedKeys,onHeaderFocus:i.updateFocusedHeader,pt:n.pt,unstyled:n.unstyled},null,8,["panelId","items","templates","expandedKeys","onItemToggle","onHeaderFocus","pt","unstyled"])],16)):p("",!0)],16,Mt),[[me,i.isItemActive(c)]])]}),_:2},1040)],16)):p("",!0)],64)}),128))],16,wt)}ge.render=Ct;var ne={name:"BarsIcon",extends:Be},At=h("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M13.3226 3.6129H0.677419C0.497757 3.6129 0.325452 3.54152 0.198411 3.41448C0.0713707 3.28744 0 3.11514 0 2.93548C0 2.75581 0.0713707 2.58351 0.198411 2.45647C0.325452 2.32943 0.497757 2.25806 0.677419 2.25806H13.3226C13.5022 2.25806 13.6745 2.32943 13.8016 2.45647C13.9286 2.58351 14 2.75581 14 2.93548C14 3.11514 13.9286 3.28744 13.8016 3.41448C13.6745 3.54152 13.5022 3.6129 13.3226 3.6129ZM13.3226 7.67741H0.677419C0.497757 7.67741 0.325452 7.60604 0.198411 7.479C0.0713707 7.35196 0 7.17965 0 6.99999C0 6.82033 0.0713707 6.64802 0.198411 6.52098C0.325452 6.39394 0.497757 6.32257 0.677419 6.32257H13.3226C13.5022 6.32257 13.6745 6.39394 13.8016 6.52098C13.9286 6.64802 14 6.82033 14 6.99999C14 7.17965 13.9286 7.35196 13.8016 7.479C13.6745 7.60604 13.5022 7.67741 13.3226 7.67741ZM0.677419 11.7419H13.3226C13.5022 11.7419 13.6745 11.6706 13.8016 11.5435C13.9286 11.4165 14 11.2442 14 11.0645C14 10.8848 13.9286 10.7125 13.8016 10.5855C13.6745 10.4585 13.5022 10.3871 13.3226 10.3871H0.677419C0.497757 10.3871 0.325452 10.4585 0.198411 10.5855C0.0713707 10.7125 0 10.8848 0 11.0645C0 11.2442 0.0713707 11.4165 0.198411 11.5435C0.325452 11.6706 0.497757 11.7419 0.677419 11.7419Z",fill:"currentColor"},null,-1),St=[At];function Et(n,e,t,a,o,i){return l(),d("svg",m({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},n.pti()),St,16)}ne.render=Et;var Ft=function(e){var t=e.dt;return`
.p-megamenu {
    position: relative;
    display: flex;
    align-items: center;
    background: `.concat(t("megamenu.background"),`;
    border: 1px solid `).concat(t("megamenu.border.color"),`;
    border-radius: `).concat(t("megamenu.border.radius"),`;
    color: `).concat(t("megamenu.color"),`;
    gap: `).concat(t("megamenu.gap"),`;
}

.p-megamenu-start,
.p-megamenu-end {
    display: flex;
    align-items: center;
}

.p-megamenu-root-list {
    margin: 0;
    padding: 0;
    list-style: none;
    outline: 0 none;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: `).concat(t("megamenu.gap"),`;
}

.p-megamenu-root-list > .p-megamenu-item > .p-menumegamenubar-item-content {
    border-radius: `).concat(t("megamenu.base.item.border.radius"),`;
}

.p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content > .p-megamenu-item-link {
    padding: `).concat(t("megamenu.base.item.padding"),`;
}

.p-megamenu-item-content {
    transition: background `).concat(t("megamenu.transition.duration"),", color ").concat(t("megamenu.transition.duration"),`;
    border-radius: `).concat(t("megamenu.item.border.radius"),`;
    color: `).concat(t("megamenu.item.color"),`;
}

.p-megamenu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: `).concat(t("megamenu.item.padding"),`;
    gap: `).concat(t("megamenu.item.gap"),`;
    user-select: none;
    outline: 0 none;
}

.p-megamenu-item-label {
    line-height: 1;
}

.p-megamenu-item-icon {
    color: `).concat(t("megamenu.item.icon.color"),`;
}

.p-megamenu-submenu-icon {
    color: `).concat(t("megamenu.submenu.icon.color"),`;
    font-size: `).concat(t("megamenu.submenu.icon.size"),`;
    width: `).concat(t("megamenu.submenu.icon.size"),`;
    height: `).concat(t("megamenu.submenu.icon.size"),`;
}

.p-megamenu-item.p-focus > .p-megamenu-item-content {
    color: `).concat(t("megamenu.item.focus.color"),`;
    background: `).concat(t("megamenu.item.focus.background"),`;
}

.p-megamenu-item.p-focus > .p-megamenu-item-content .p-megamenu-item-icon {
    color: `).concat(t("megamenu.item.icon.focus.color"),`;
}

.p-megamenu-item.p-focus > .p-megamenu-item-content .p-megamenu-submenu-icon {
    color: `).concat(t("megamenu.submenu.icon.focus.color"),`;
}

.p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover {
    color: `).concat(t("megamenu.item.focus.color"),`;
    background: `).concat(t("megamenu.item.focus.background"),`;
}

.p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover .p-megamenu-item-icon {
    color: `).concat(t("megamenu.item.icon.focus.color"),`;
}

.p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover .p-megamenu-submenu-icon {
    color: `).concat(t("megamenu.submenu.icon.focus.color"),`;
}

.p-megamenu-item-active > .p-megamenu-item-content {
    color: `).concat(t("megamenu.item.active.color"),`;
    background: `).concat(t("megamenu.item.active.background"),`;
}

.p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-item-icon {
    color: `).concat(t("megamenu.item.icon.active.color"),`;
}

.p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-submenu-icon {
    color: `).concat(t("megamenu.submenu.icon.active.color"),`;
}

.p-megamenu-overlay {
    display: none;
    position: absolute;
    width: auto;
    z-index: 1;
    left: 0;
    min-width: 100%;
    padding: `).concat(t("megamenu.overlay.padding"),`;
    background: `).concat(t("megamenu.overlay.background"),`;
    color: `).concat(t("megamenu.overlay.color"),`;
    border: 1px solid `).concat(t("megamenu.overlay.border.color"),`;
    border-radius: `).concat(t("megamenu.overlay.border.radius"),`;
    box-shadow: `).concat(t("megamenu.overlay.shadow"),`;
}

.p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay {
    display: block;
}

.p-megamenu-submenu {
    margin: 0;
    list-style: none;
    padding: `).concat(t("megamenu.submenu.padding"),`;
    min-width: 12.5rem;
    display: flex;
    flex-direction: column;
    gap: `).concat(t("megamenu.submenu.gap"),`
}

.p-megamenu-submenu-label {
    padding: `).concat(t("megamenu.submenu.label.padding"),`;
    color: `).concat(t("megamenu.submenu.label.color"),`;
    font-weight: `).concat(t("megamenu.submenu.label.font.weight"),`;
    background: `).concat(t("megamenu.submenu.label.background"),`;
}

.p-megamenu-separator {
    border-top: 1px solid `).concat(t("megamenu.separator.border.color"),`;
}

.p-megamenu-horizontal {
    align-items: center;
    padding: `).concat(t("megamenu.horizontal.orientation.padding"),`;
}

.p-megamenu-horizontal .p-megamenu-root-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: `).concat(t("megamenu.horizontal.orientation.gap"),`;
}

.p-megamenu-horizontal .p-megamenu-end {
    margin-left: auto;
    align-self: center;
}

.p-megamenu-vertical {
    display: inline-flex;
    min-width: 12.5rem;
    flex-direction: column;
    align-items: stretch;
    padding: `).concat(t("megamenu.vertical.orientation.padding"),`;
}

.p-megamenu-vertical .p-megamenu-root-list {
    align-items: stretch;
    flex-direction: column;
    gap: `).concat(t("megamenu.vertical.orientation.gap"),`;
}

.p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay {
    left: 100%;
    top: 0;
}

.p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon {
    margin-left: auto;
}

.p-megamenu-grid {
    display: flex;
}

.p-megamenu-col-2,
.p-megamenu-col-3,
.p-megamenu-col-4,
.p-megamenu-col-6,
.p-megamenu-col-12 {
    flex: 0 0 auto;
    padding: `).concat(t("megamenu.overlay.gap"),`;
}

.p-megamenu-col-2 {
    width: 16.6667%;
}

.p-megamenu-col-3 {
    width: 25%;
}

.p-megamenu-col-4 {
    width: 33.3333%;
}

.p-megamenu-col-6 {
    width: 50%;
}

.p-megamenu-col-12 {
    width: 100%;
}

.p-megamenu-button {
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: `).concat(t("megamenu.mobile.button.size"),`;
    height: `).concat(t("megamenu.mobile.button.size"),`;
    position: relative;
    color: `).concat(t("megamenu.mobile.button.color"),`;
    border: 0 none;
    background: transparent;
    border-radius: `).concat(t("megamenu.mobile.button.border.radius"),`;
    transition: background `).concat(t("megamenu.transition.duration"),", color ").concat(t("megamenu.transition.duration"),", outline-color ").concat(t("megamenu.transition.duration"),", ox-shadow ").concat(t("megamenu.transition.duration"),`;
    outline-color: transparent;
}

.p-megamenu-button:hover {
    color: `).concat(t("megamenu.mobile.button.hover.color"),`;
    background: `).concat(t("megamenu.mobile.button.hover.background"),`;
}

.p-megamenu-button:focus-visible {
    box-shadow: `).concat(t("megamenu.mobile.button.focus.ring.shadow"),`;
    outline: `).concat(t("megamenu.mobile.button.focus.ring.width")," ").concat(t("megamenu.mobile.button.focus.ring.style")," ").concat(t("megamenu.mobile.button.focus.ring.color"),`;
    outline-offset: `).concat(t("megamenu.mobile.button.focus.ring.offset"),`;
}

.p-megamenu-mobile {
    display: flex;
}

.p-megamenu-mobile .p-megamenu-button {
    display: flex;
}

.p-megamenu-mobile .p-megamenu-root-list {
    position: absolute;
    display: none;
    flex-direction: column;
    top: 100%;
    left: 0;
    z-index: 1;
    width: 100%;
    padding: `).concat(t("megamenu.submenu.padding"),`;
    gap: `).concat(t("megamenu.submenu.gap"),`;
    background: `).concat(t("megamenu.overlay.background"),`;
    border: 1px solid `).concat(t("megamenu.overlay.border.color"),`;
    box-shadow: `).concat(t("menubar.overlay.shadow"),`;
}

.p-megamenu-mobile-active .p-megamenu-root-list {
    display: flex;
}

.p-megamenu-mobile .p-megamenu-root-list .p-megamenu-item {
    width: 100%;
    position: static;
}

.p-megamenu-mobile .p-megamenu-overlay {
    position: static;
    border: 0 none;
    border-radius: 0;
    box-shadow: none;
}

.p-megamenu-mobile .p-megamenu-grid {
    flex-wrap: wrap;
    overflow: auto;
    max-height: 90%;
}

.p-megamenu-mobile .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon {
    margin-left: auto;
    transition: transform 0.2s;
}

.p-megamenu-mobile .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-submenu-icon {
    transform: rotate(-180deg);
}
`)},Ot={submenu:function(e){var t=e.instance,a=e.processedItem;return{display:t.isItemActive(a)?"block":"none"}}},Dt={root:function(e){var t=e.instance;return["p-megamenu p-component",{"p-megamenu-mobile":t.queryMatches,"p-megamenu-mobile-active":t.mobileActive,"p-megamenu-horizontal":t.horizontal,"p-megamenu-vertical":t.vertical}]},start:"p-megamenu-start",button:"p-megamenu-button",rootList:"p-megamenu-root-list",submenuLabel:function(e){var t=e.instance,a=e.processedItem;return["p-megamenu-submenu-label",{"p-disabled":t.isItemDisabled(a)}]},item:function(e){var t=e.instance,a=e.processedItem;return["p-megamenu-item",{"p-megamenu-item-active":t.isItemActive(a),"p-focus":t.isItemFocused(a),"p-disabled":t.isItemDisabled(a)}]},itemContent:"p-megamenu-item-content",itemLink:"p-megamenu-item-link",itemIcon:"p-megamenu-item-icon",itemLabel:"p-megamenu-item-label",submenuIcon:"p-megamenu-submenu-icon",overlay:"p-megamenu-overlay",grid:"p-megamenu-grid",column:function(e){var t=e.instance,a=e.processedItem,o=t.isItemGroup(a)?a.items.length:0,i;if(t.$parentInstance.queryMatches)i="p-megamenu-col-12";else switch(o){case 2:i="p-megamenu-col-6";break;case 3:i="p-megamenu-col-4";break;case 4:i="p-megamenu-col-3";break;case 6:i="p-megamenu-col-2";break;default:i="p-megamenu-col-12";break}return i},submenu:"p-megamenu-submenu",separator:"p-megamenu-separator",end:"p-megamenu-end"},Tt=G.extend({name:"megamenu",theme:Ft,classes:Dt,inlineStyles:Ot}),Vt={name:"BaseMegaMenu",extends:S,props:{model:{type:Array,default:null},orientation:{type:String,default:"horizontal"},breakpoint:{type:String,default:"960px"},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Tt,provide:function(){return{$pcMegaMenu:this,$parentInstance:this}}},ve={name:"MegaMenuSub",hostName:"MegaMenu",extends:S,emits:["item-click","item-mouseenter"],props:{menuId:{type:String,default:null},focusedItemId:{type:String,default:null},horizontal:{type:Boolean,default:!1},submenu:{type:Object,default:null},mobileActive:{type:Boolean,default:!1},items:{type:Array,default:null},level:{type:Number,default:0},templates:{type:Object,default:null},activeItem:{type:Object,default:null},tabindex:{type:Number,default:0}},methods:{getSubListId:function(e){return"".concat(this.getItemId(e),"_list")},getSubListKey:function(e){return this.getSubListId(e)},getItemId:function(e){return"".concat(this.menuId,"_").concat(e.key)},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,a){return e&&e.item?F(e.item[t],a):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getPTOptions:function(e,t,a){return this.ptm(a,{context:{item:e,index:t,active:this.isItemActive(e),focused:this.isItemFocused(e),disabled:this.isItemDisabled(e)}})},isItemActive:function(e){return I(this.activeItem)?this.activeItem.key===e.key:!1},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return I(e.items)},onItemClick:function(e,t){this.getItemProp(t,"command",{originalEvent:e,item:t.item}),this.$emit("item-click",{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit("item-mouseenter",{originalEvent:e,processedItem:t})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,"separator")}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(a){return t.isItemVisible(a)&&t.getItemProp(a,"separator")}).length+1},getMenuItemProps:function(e,t){return{action:m({class:this.cx("itemLink"),tabindex:-1,"aria-hidden":!0},this.getPTOptions(e,t,"itemLink")),icon:m({class:[this.cx("itemIcon"),this.getItemProp(e,"icon")]},this.getPTOptions(e,t,"itemIcon")),label:m({class:this.cx("label")},this.getPTOptions(e,t,"label")),submenuicon:m({class:this.cx("submenuIcon")},this.getPTOptions(e,t,"submenuIcon"))}}},components:{AngleRightIcon:te,AngleDownIcon:be},directives:{ripple:q}},_t=["tabindex"],zt=["id","aria-label","aria-disabled","aria-expanded","aria-haspopup","aria-level","aria-setsize","aria-posinset","data-p-active","data-p-focused","data-p-disabled"],Ht=["onClick","onMouseenter"],Bt=["href","target"],Rt=["id"];function Nt(n,e,t,a,o,i){var u=K("MegaMenuSub",!0),c=W("ripple");return l(),d("ul",m({class:t.level===0?n.cx("rootList"):n.cx("submenu"),tabindex:t.tabindex},t.level===0?n.ptm("rootList"):n.ptm("submenu")),[t.submenu?(l(),d("li",m({key:0,class:[n.cx("submenuLabel",{submenu:t.submenu}),i.getItemProp(t.submenu,"class")],style:i.getItemProp(t.submenu,"style"),role:"presentation"},n.ptm("submenuLabel")),_(i.getItemLabel(t.submenu)),17)):p("",!0),(l(!0),d(P,null,O(t.items,function(r,s){return l(),d(P,{key:i.getItemKey(r)},[i.isItemVisible(r)&&!i.getItemProp(r,"separator")?(l(),d("li",m({key:0,id:i.getItemId(r),style:i.getItemProp(r,"style"),class:[n.cx("item",{processedItem:r}),i.getItemProp(r,"class")],role:"menuitem","aria-label":i.getItemLabel(r),"aria-disabled":i.isItemDisabled(r)||void 0,"aria-expanded":i.isItemGroup(r)?i.isItemActive(r):void 0,"aria-haspopup":i.isItemGroup(r)&&!i.getItemProp(r,"to")?"menu":void 0,"aria-level":t.level+1,"aria-setsize":i.getAriaSetSize(),"aria-posinset":i.getAriaPosInset(s),ref_for:!0},i.getPTOptions(r,s,"item"),{"data-p-active":i.isItemActive(r),"data-p-focused":i.isItemFocused(r),"data-p-disabled":i.isItemDisabled(r)}),[h("div",m({class:n.cx("itemContent"),onClick:function(b){return i.onItemClick(b,r)},onMouseenter:function(b){return i.onItemMouseEnter(b,r)},ref_for:!0},i.getPTOptions(r,s,"itemContent")),[t.templates.item?(l(),v(k(t.templates.item),{key:1,item:r.item,hasSubmenu:i.isItemGroup(r),label:i.getItemLabel(r),props:i.getMenuItemProps(r,s)},null,8,["item","hasSubmenu","label","props"])):H((l(),d("a",m({key:0,href:i.getItemProp(r,"url"),class:n.cx("itemLink"),target:i.getItemProp(r,"target"),tabindex:"-1","aria-hidden":"true",ref_for:!0},i.getPTOptions(r,s,"itemLink")),[t.templates.itemicon?(l(),v(k(t.templates.itemicon),{key:0,item:r.item,class:M(n.cx("itemIcon"))},null,8,["item","class"])):i.getItemProp(r,"icon")?(l(),d("span",m({key:1,class:[n.cx("itemIcon"),i.getItemProp(r,"icon")],ref_for:!0},i.getPTOptions(r,s,"itemIcon")),null,16)):p("",!0),h("span",m({class:n.cx("itemLabel"),ref_for:!0},i.getPTOptions(r,s,"itemLabel")),_(i.getItemLabel(r)),17),i.isItemGroup(r)?(l(),d(P,{key:2},[t.templates.submenuicon?(l(),v(k(t.templates.submenuicon),m({key:0,active:i.isItemActive(r),class:n.cx("submenuIcon"),ref_for:!0},i.getPTOptions(r,s,"submenuIcon")),null,16,["active","class"])):(l(),v(k(t.horizontal||t.mobileActive?"AngleDownIcon":"AngleRightIcon"),m({key:1,class:n.cx("submenuIcon"),ref_for:!0},i.getPTOptions(r,s,"submenuIcon")),null,16,["class"]))],64)):p("",!0)],16,Bt)),[[c]])],16,Ht),i.isItemVisible(r)&&i.isItemGroup(r)?(l(),d("div",m({key:0,class:n.cx("overlay"),ref_for:!0},n.ptm("overlay")),[h("div",m({class:n.cx("grid"),ref_for:!0},n.ptm("grid")),[(l(!0),d(P,null,O(r.items,function(f){return l(),d("div",m({key:i.getItemKey(f),class:n.cx("column",{processedItem:r}),ref_for:!0},n.ptm("column")),[(l(!0),d(P,null,O(f,function(b){return l(),v(u,{key:i.getSubListKey(b),id:i.getSubListId(b),style:le(n.sx("submenu",!0,{processedItem:r})),role:"menu",menuId:t.menuId,focusedItemId:t.focusedItemId,submenu:b,items:b.items,templates:t.templates,level:t.level+1,mobileActive:t.mobileActive,pt:n.pt,unstyled:n.unstyled,onItemClick:e[0]||(e[0]=function(w){return n.$emit("item-click",w)}),onItemMouseenter:e[1]||(e[1]=function(w){return n.$emit("item-mouseenter",w)})},null,8,["id","style","menuId","focusedItemId","submenu","items","templates","level","mobileActive","pt","unstyled"])}),128))],16)}),128))],16)],16)):p("",!0)],16,zt)):p("",!0),i.isItemVisible(r)&&i.getItemProp(r,"separator")?(l(),d("li",m({key:1,id:i.getItemId(r),class:[n.cx("separator"),i.getItemProp(r,"class")],style:i.getItemProp(r,"style"),role:"separator",ref_for:!0},n.ptm("separator")),null,16,Rt)):p("",!0)],64)}),128))],16,_t)}ve.render=Nt;var ye={name:"MegaMenu",extends:Vt,inheritAttrs:!1,emits:["focus","blur"],outsideClickListener:null,resizeListener:null,matchMediaListener:null,container:null,menubar:null,searchTimeout:null,searchValue:null,data:function(){return{id:this.$attrs.id,mobileActive:!1,focused:!1,focusedItemInfo:{index:-1,key:"",parentKey:""},activeItem:null,dirty:!1,query:null,queryMatches:!1}},watch:{"$attrs.id":function(e){this.id=e||T()},activeItem:function(e){I(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener())}},mounted:function(){this.id=this.id||T(),this.bindMatchMediaListener()},beforeUnmount:function(){this.mobileActive=!1,this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener()},methods:{getItemProp:function(e,t){return e?F(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemGroup:function(e){return I(this.getItemProp(e,"items"))},isItemSeparator:function(e){return this.getItemProp(e,"separator")},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&I(e.items)},toggle:function(e){var t=this;this.mobileActive?(this.mobileActive=!1,D.clear(this.menubar),this.hide()):(this.mobileActive=!0,D.set("menu",this.menubar,this.$primevue.config.zIndex.menu),setTimeout(function(){t.show()},1)),this.bindOutsideClickListener(),e.preventDefault()},show:function(){this.focusedItemInfo={index:this.findFirstFocusedItemIndex(),level:0,parentKey:""},y(this.menubar)},hide:function(e,t){var a=this;this.mobileActive&&(this.mobileActive=!1,setTimeout(function(){y(a.$refs.menubutton)},0)),this.activeItem=null,this.focusedItemInfo={index:-1,key:"",parentKey:""},t&&y(this.menubar),this.dirty=!1},onFocus:function(e){if(this.focused=!0,this.focusedItemInfo.index===-1){var t=this.findFirstFocusedItemIndex(),a=this.findVisibleItem(t);this.focusedItemInfo={index:t,key:a.key,parentKey:a.parentKey}}this.$emit("focus",e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,key:"",parentKey:""},this.searchValue="",this.dirty=!1,this.$emit("blur",e)},onKeyDown:function(e){if(this.disabled){e.preventDefault();return}var t=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Space":this.onSpaceKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!t&&X(e.key)&&this.searchItems(e,e.key);break}},onItemChange:function(e){var t=e.processedItem,a=e.isFocus;if(!A(t)){var o=t.index,i=t.key,u=t.parentKey,c=t.items,r=I(c);r&&(this.activeItem=t),this.focusedItemInfo={index:o,key:i,parentKey:u},r&&(this.dirty=!0),a&&y(this.menubar)}},onItemClick:function(e){var t=e.originalEvent,a=e.processedItem,o=this.isProccessedItemGroup(a),i=A(a.parent),u=this.isSelected(a);if(u){var c=a.index,r=a.key,s=a.parentKey;this.activeItem=null,this.focusedItemInfo={index:c,key:r,parentKey:s},this.dirty=!i,y(this.menubar)}else o?this.onItemChange(e):this.hide(t)},onItemMouseEnter:function(e){!this.mobileActive&&this.dirty&&this.onItemChange(e)},menuButtonClick:function(e){this.toggle(e)},menuButtonKeydown:function(e){(e.code==="Enter"||e.code==="NumpadEnter"||e.code==="Space")&&this.menuButtonClick(e)},onArrowDownKey:function(e){if(this.horizontal)if(I(this.activeItem)&&this.activeItem.key===this.focusedItemInfo.key)this.focusedItemInfo={index:-1,key:"",parentKey:this.activeItem.key};else{var t=this.findVisibleItem(this.focusedItemInfo.index),a=this.isProccessedItemGroup(t);a&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,key:t.key,parentKey:t.parentKey},this.searchValue="")}var o=this.focusedItemInfo.index!==-1?this.findNextItemIndex(this.focusedItemInfo.index):this.findFirstFocusedItemIndex();this.changeFocusedItemInfo(e,o),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey&&this.horizontal){if(this.focusedItemInfo.index!==-1){var t=this.findVisibleItem(this.focusedItemInfo.index),a=this.isProccessedItemGroup(t);!a&&I(this.activeItem)&&(this.focusedItemInfo.index===0?(this.focusedItemInfo={index:this.activeItem.index,key:this.activeItem.key,parentKey:this.activeItem.parentKey},this.activeItem=null):this.changeFocusedItemInfo(e,this.findFirstItemIndex()))}e.preventDefault()}else{var o=this.focusedItemInfo.index!==-1?this.findPrevItemIndex(this.focusedItemInfo.index):this.findLastFocusedItemIndex();this.changeFocusedItemInfo(e,o),e.preventDefault()}},onArrowLeftKey:function(e){var t=this.findVisibleItem(this.focusedItemInfo.index),a=this.isProccessedItemGroup(t);if(a){if(this.horizontal){var o=this.focusedItemInfo.index!==-1?this.findPrevItemIndex(this.focusedItemInfo.index):this.findLastFocusedItemIndex();this.changeFocusedItemInfo(e,o)}}else{this.vertical&&I(this.activeItem)&&t.columnIndex===0&&(this.focusedItemInfo={index:this.activeItem.index,key:this.activeItem.key,parentKey:this.activeItem.parentKey},this.activeItem=null);var i=t.columnIndex-1,u=this.visibleItems.findIndex(function(c){return c.columnIndex===i});u!==-1&&this.changeFocusedItemInfo(e,u)}e.preventDefault()},onArrowRightKey:function(e){var t=this.findVisibleItem(this.focusedItemInfo.index),a=this.isProccessedItemGroup(t);if(a){if(this.vertical)if(I(this.activeItem)&&this.activeItem.key===t.key)this.focusedItemInfo={index:-1,key:"",parentKey:this.activeItem.key};else{var o=this.findVisibleItem(this.focusedItemInfo.index),i=this.isProccessedItemGroup(o);i&&(this.onItemChange({originalEvent:e,processedItem:o}),this.focusedItemInfo={index:-1,key:o.key,parentKey:o.parentKey},this.searchValue="")}var u=this.focusedItemInfo.index!==-1?this.findNextItemIndex(this.focusedItemInfo.index):this.findFirstFocusedItemIndex();this.changeFocusedItemInfo(e,u)}else{var c=t.columnIndex+1,r=this.visibleItems.findIndex(function(s){return s.columnIndex===c});r!==-1&&this.changeFocusedItemInfo(e,r)}e.preventDefault()},onHomeKey:function(e){this.changeFocusedItemInfo(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemInfo(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=x(this.menubar,'li[id="'.concat("".concat(this.focusedItemId),'"]')),a=t&&x(t,'a[data-pc-section="itemlink"]');a?a.click():t&&t.click();var o=this.visibleItems[this.focusedItemInfo.index],i=this.isProccessedItemGroup(o);!i&&this.changeFocusedItemInfo(e,this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){I(this.activeItem)&&(this.focusedItemInfo={index:this.activeItem.index,key:this.activeItem.key},this.activeItem=null),e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.findVisibleItem(this.focusedItemInfo.index),a=this.isProccessedItemGroup(t);!a&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var a=e.container&&!e.container.contains(t.target),o=!(e.target&&(e.target===t.target||e.target.contains(t.target)));a&&o&&e.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(t){$()||e.hide(t,!0),e.mobileActive=!1},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia("(max-width: ".concat(this.breakpoint,")"));this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches,e.mobileActive=!1},this.query.addEventListener("change",this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&(this.query.removeEventListener("change",this.matchMediaListener),this.matchMediaListener=null)},isItemMatched:function(e){var t;return this.isValidItem(e)&&((t=this.getProccessedItemLabel(e))===null||t===void 0?void 0:t.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()))},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return I(this.activeItem)?this.activeItem.key===e.key:!1},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return B(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,a=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(o){return t.isValidItem(o)}):-1;return a>-1?a+e+1:e},findPrevItemIndex:function(e){var t=this,a=e>0?B(this.visibleItems.slice(0,e),function(o){return t.isValidItem(o)}):-1;return a>-1?a:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},findVisibleItem:function(e){return I(this.visibleItems)?this.visibleItems[e]:null},searchItems:function(e,t){var a=this;this.searchValue=(this.searchValue||"")+t;var o=-1,i=!1;return this.focusedItemInfo.index!==-1?(o=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(u){return a.isItemMatched(u)}),o=o===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(u){return a.isItemMatched(u)}):o+this.focusedItemInfo.index):o=this.visibleItems.findIndex(function(u){return a.isItemMatched(u)}),o!==-1&&(i=!0),o===-1&&this.focusedItemInfo.index===-1&&(o=this.findFirstFocusedItemIndex()),o!==-1&&this.changeFocusedItemInfo(e,o),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){a.searchValue="",a.searchTimeout=null},500),i},changeFocusedItemInfo:function(e,t){var a=this.findVisibleItem(t);this.focusedItemInfo.index=t,this.focusedItemInfo.key=I(a)?a.key:"",this.scrollInView()},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e!==-1?"".concat(this.id,"_").concat(e):this.focusedItemId,a=x(this.menubar,'li[id="'.concat(t,'"]'));a&&a.scrollIntoView&&a.scrollIntoView({block:"nearest",inline:"start"})},createProcessedItems:function(e){var t=this,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",u=arguments.length>4?arguments[4]:void 0,c=[];return e&&e.forEach(function(r,s){var f=(i!==""?i+"_":"")+(u!==void 0?u+"_":"")+s,b={item:r,index:s,level:a,key:f,parent:o,parentKey:i,columnIndex:u!==void 0?u:o.columnIndex!==void 0?o.columnIndex:s};b.items=a===0&&r.items&&r.items.length>0?r.items.map(function(w,Y){return t.createProcessedItems(w,a+1,b,f,Y)}):t.createProcessedItems(r.items,a+1,b,f),c.push(b)}),c},containerRef:function(e){this.container=e},menubarRef:function(e){this.menubar=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=I(this.activeItem)?this.activeItem:null;return e&&e.key===this.focusedItemInfo.parentKey?e.items.reduce(function(t,a){return a.forEach(function(o){o.items.forEach(function(i){t.push(i)})}),t},[]):this.processedItems},horizontal:function(){return this.orientation==="horizontal"},vertical:function(){return this.orientation==="vertical"},focusedItemId:function(){return I(this.focusedItemInfo.key)?"".concat(this.id,"_").concat(this.focusedItemInfo.key):null}},components:{MegaMenuSub:ve,BarsIcon:ne}},Gt=["id"],jt=["aria-haspopup","aria-expanded","aria-controls","aria-label"];function Ut(n,e,t,a,o,i){var u=K("BarsIcon"),c=K("MegaMenuSub");return l(),d("div",m({ref:i.containerRef,id:o.id,class:n.cx("root")},n.ptmi("root")),[n.$slots.start?(l(),d("div",m({key:0,class:n.cx("start")},n.ptm("start")),[E(n.$slots,"start")],16)):p("",!0),E(n.$slots,n.$slots.button?"button":"menubutton",{id:o.id,class:M(n.cx("button")),toggleCallback:function(s){return i.menuButtonClick(s)}},function(){var r;return[n.model&&n.model.length>0?(l(),d("a",m({key:0,ref:"menubutton",role:"button",tabindex:"0",class:n.cx("button"),"aria-haspopup":!!(n.model.length&&n.model.length>0),"aria-expanded":o.mobileActive,"aria-controls":o.id,"aria-label":(r=n.$primevue.config.locale.aria)===null||r===void 0?void 0:r.navigation,onClick:e[0]||(e[0]=function(s){return i.menuButtonClick(s)}),onKeydown:e[1]||(e[1]=function(s){return i.menuButtonKeydown(s)})},n.ptm("button")),[E(n.$slots,n.$slots.buttonicon?"buttonicon":"menubuttonicon",{},function(){return[g(u,de(fe(n.ptm("buttonicon"))),null,16)]})],16,jt)):p("",!0)]}),g(c,{ref:i.menubarRef,id:o.id+"_list",tabindex:n.disabled?-1:n.tabindex,role:"menubar","aria-label":n.ariaLabel,"aria-labelledby":n.ariaLabelledby,"aria-disabled":n.disabled||void 0,"aria-orientation":n.orientation,"aria-activedescendant":o.focused?i.focusedItemId:void 0,menuId:o.id,focusedItemId:o.focused?i.focusedItemId:void 0,items:i.processedItems,horizontal:i.horizontal,templates:n.$slots,activeItem:o.activeItem,mobileActive:o.mobileActive,level:0,pt:n.pt,unstyled:n.unstyled,onFocus:i.onFocus,onBlur:i.onBlur,onKeydown:i.onKeyDown,onItemClick:i.onItemClick,onItemMouseenter:i.onItemMouseEnter},null,8,["id","tabindex","aria-label","aria-labelledby","aria-disabled","aria-orientation","aria-activedescendant","menuId","focusedItemId","items","horizontal","templates","activeItem","mobileActive","pt","unstyled","onFocus","onBlur","onKeydown","onItemClick","onItemMouseenter"]),n.$slots.end?(l(),d("div",m({key:1,class:n.cx("end")},n.ptm("end")),[E(n.$slots,"end")],16)):p("",!0)],16,Gt)}ye.render=Ut;var qt=function(e){var t=e.dt;return`
.p-contextmenu {
    background: `.concat(t("contextmenu.background"),`;
    color: `).concat(t("contextmenu.color"),`;
    border: 1px solid `).concat(t("contextmenu.border.color"),`;
    border-radius: `).concat(t("contextmenu.border.radius"),`;
    box-shadow: `).concat(t("contextmenu.shadow"),`;
    min-width: 12.5rem;
}

.p-contextmenu-root-list,
.p-contextmenu-submenu {
    margin: 0;
    padding: `).concat(t("contextmenu.list.padding"),`;
    list-style: none;
    outline: 0 none;
    display: flex;
    flex-direction: column;
    gap: `).concat(t("contextmenu.list.gap"),`;
}

.p-contextmenu-submenu {
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    z-index: 1;
    background: `).concat(t("contextmenu.background"),`;
    color: `).concat(t("contextmenu.color"),`;
    border: 1px solid `).concat(t("contextmenu.border.color"),`;
    border-radius: `).concat(t("contextmenu.border.radius"),`;
    box-shadow: `).concat(t("contextmenu.shadow"),`;
}

.p-contextmenu-item {
    position: relative;
}

.p-contextmenu-item-content {
    transition: background `).concat(t("contextmenu.transition.duration"),", color ").concat(t("contextmenu.transition.duration"),`;
    border-radius: `).concat(t("contextmenu.item.border.radius"),`;
    color: `).concat(t("contextmenu.item.color"),`;
}

.p-contextmenu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: `).concat(t("contextmenu.item.padding"),`;
    gap: `).concat(t("contextmenu.item.gap"),`;
    user-select: none;
}

.p-contextmenu-item-label {
    line-height: 1;
}

.p-contextmenu-item-icon {
    color: `).concat(t("contextmenu.item.icon.color"),`;
}

.p-contextmenu-submenu-icon {
    color: `).concat(t("contextmenu.submenu.icon.color"),`;
    margin-left: auto;
    font-size: `).concat(t("contextmenu.submenu.icon.size"),`;
    width: `).concat(t("contextmenu.submenu.icon.size"),`;
    height: `).concat(t("contextmenu.submenu.icon.size"),`;
}

.p-contextmenu-item.p-focus > .p-contextmenu-item-content {
    color: `).concat(t("contextmenu.item.focus.color"),`;
    background: `).concat(t("contextmenu.item.focus.background"),`;
}

.p-contextmenu-item.p-focus > .p-contextmenu-item-content .p-contextmenu-item-icon {
    color: `).concat(t("contextmenu.item.icon.focus.color"),`;
}

.p-contextmenu-item.p-focus > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
    color: `).concat(t("contextmenu.submenu.icon.focus.color"),`;
}

.p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover {
    color: `).concat(t("contextmenu.item.focus.color"),`;
    background: `).concat(t("contextmenu.item.focus.background"),`;
}

.p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover .p-contextmenu-item-icon {
    color: `).concat(t("contextmenu.item.icon.focus.color"),`;
}

.p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover .p-contextmenu-submenu-icon {
    color: `).concat(t("contextmenu.submenu.icon.focus.color"),`;
}

.p-contextmenu-item-active > .p-contextmenu-item-content {
    color: `).concat(t("contextmenu.item.active.color"),`;
    background: `).concat(t("contextmenu.item.active.background"),`;
}

.p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-item-icon {
    color: `).concat(t("contextmenu.item.icon.active.color"),`;
}

.p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
    color: `).concat(t("contextmenu.submenu.icon.active.color"),`;
}

.p-contextmenu-separator {
    border-top: 1px solid  `).concat(t("contextmenu.separator.border.color"),`;
}

.p-contextmenu-enter-from,
.p-contextmenu-leave-active {
    opacity: 0;
}

.p-contextmenu-enter-active {
    transition: opacity 250ms;
}
`)},Wt={root:"p-contextmenu p-component",rootList:"p-contextmenu-root-list",item:function(e){var t=e.instance,a=e.processedItem;return["p-contextmenu-item",{"p-contextmenu-item-active":t.isItemActive(a),"p-focus":t.isItemFocused(a),"p-disabled":t.isItemDisabled(a)}]},itemContent:"p-contextmenu-item-content",itemLink:"p-contextmenu-item-link",itemIcon:"p-contextmenu-item-icon",itemLabel:"p-contextmenu-item-label",submenuIcon:"p-contextmenu-submenu-icon",submenu:"p-contextmenu-submenu",separator:"p-contextmenu-separator"},Zt=G.extend({name:"contextmenu",theme:qt,classes:Wt}),Xt={name:"BaseContextMenu",extends:S,props:{model:{type:Array,default:null},appendTo:{type:[String,Object],default:"body"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},global:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Zt,provide:function(){return{$pcContextMenu:this,$parentInstance:this}}},ke={name:"ContextMenuSub",hostName:"ContextMenu",extends:S,emits:["item-click","item-mouseenter","item-mousemove"],props:{items:{type:Array,default:null},menuId:{type:String,default:null},focusedItemId:{type:String,default:null},root:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},level:{type:Number,default:0},templates:{type:Object,default:null},activeItemPath:{type:Object,default:null},tabindex:{type:Number,default:0}},methods:{getItemId:function(e){return"".concat(this.menuId,"_").concat(e.key)},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,a){return e&&e.item?F(e.item[t],a):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getItemLabelId:function(e){return"".concat(this.menuId,"_").concat(e.key,"_label")},getPTOptions:function(e,t,a){return this.ptm(e,{context:{item:t,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t),index:a}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return I(e.items)},onItemClick:function(e,t){this.getItemProp(t,"command",{originalEvent:e,item:t.item}),this.$emit("item-click",{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit("item-mouseenter",{originalEvent:e,processedItem:t})},onItemMouseMove:function(e,t){this.$emit("item-mousemove",{originalEvent:e,processedItem:t,isFocus:!0})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,"separator")}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(a){return t.isItemVisible(a)&&t.getItemProp(a,"separator")}).length+1},onEnter:function(){qe(this.$refs.container,this.level)},getMenuItemProps:function(e,t){return{action:m({class:this.cx("itemLink"),tabindex:-1,"aria-hidden":!0},this.getPTOptions("itemLink",e,t)),icon:m({class:[this.cx("itemIcon"),this.getItemProp(e,"icon")]},this.getPTOptions("itemIcon",e,t)),label:m({class:this.cx("itemLabel")},this.getPTOptions("itemLabel",e,t)),submenuicon:m({class:this.cx("submenuIcon")},this.getPTOptions("submenuicon",e,t))}}},components:{AngleRightIcon:te},directives:{ripple:q}},Yt=["tabindex"],Qt=["id","aria-label","aria-disabled","aria-expanded","aria-haspopup","aria-level","aria-setsize","aria-posinset","data-p-active","data-p-focused","data-p-disabled"],Jt=["onClick","onMouseenter","onMousemove"],$t=["href","target"],en=["id"],tn=["id"];function nn(n,e,t,a,o,i){var u=K("AngleRightIcon"),c=K("ContextMenuSub",!0),r=W("ripple");return l(),v(Z,m({name:"p-contextmenusub",onEnter:i.onEnter},n.ptm("menu.transition")),{default:L(function(){return[t.root||t.visible?(l(),d("ul",m({key:0,ref:"container",tabindex:t.tabindex},n.ptm("rootList")),[(l(!0),d(P,null,O(t.items,function(s,f){return l(),d(P,{key:i.getItemKey(s)},[i.isItemVisible(s)&&!i.getItemProp(s,"separator")?(l(),d("li",m({key:0,id:i.getItemId(s),style:i.getItemProp(s,"style"),class:[n.cx("item",{processedItem:s}),i.getItemProp(s,"class")],role:"menuitem","aria-label":i.getItemLabel(s),"aria-disabled":i.isItemDisabled(s)||void 0,"aria-expanded":i.isItemGroup(s)?i.isItemActive(s):void 0,"aria-haspopup":i.isItemGroup(s)&&!i.getItemProp(s,"to")?"menu":void 0,"aria-level":t.level+1,"aria-setsize":i.getAriaSetSize(),"aria-posinset":i.getAriaPosInset(f),ref_for:!0},i.getPTOptions("item",s,f),{"data-p-active":i.isItemActive(s),"data-p-focused":i.isItemFocused(s),"data-p-disabled":i.isItemDisabled(s)}),[h("div",m({class:n.cx("itemContent"),onClick:function(w){return i.onItemClick(w,s)},onMouseenter:function(w){return i.onItemMouseEnter(w,s)},onMousemove:function(w){return i.onItemMouseMove(w,s)},ref_for:!0},i.getPTOptions("itemContent",s,f)),[t.templates.item?(l(),v(k(t.templates.item),{key:1,item:s.item,hasSubmenu:i.getItemProp(s,"items"),label:i.getItemLabel(s),props:i.getMenuItemProps(s,f)},null,8,["item","hasSubmenu","label","props"])):H((l(),d("a",m({key:0,href:i.getItemProp(s,"url"),class:n.cx("itemLink"),target:i.getItemProp(s,"target"),tabindex:"-1","aria-hidden":"true",ref_for:!0},i.getPTOptions("itemLink",s,f)),[t.templates.itemicon?(l(),v(k(t.templates.itemicon),{key:0,item:s.item,class:M(n.cx("itemIcon"))},null,8,["item","class"])):i.getItemProp(s,"icon")?(l(),d("span",m({key:1,class:[n.cx("itemIcon"),i.getItemProp(s,"icon")],ref_for:!0},i.getPTOptions("itemIcon",s,f)),null,16)):p("",!0),h("span",m({id:i.getItemLabelId(s),class:n.cx("itemLabel"),ref_for:!0},i.getPTOptions("itemLabel",s,f)),_(i.getItemLabel(s)),17,en),i.getItemProp(s,"items")?(l(),d(P,{key:2},[t.templates.submenuicon?(l(),v(k(t.templates.submenuicon),{key:0,active:i.isItemActive(s),class:M(n.cx("submenuIcon"))},null,8,["active","class"])):(l(),v(u,m({key:1,class:n.cx("submenuIcon"),ref_for:!0},i.getPTOptions("submenuicon",s,f)),null,16,["class"]))],64)):p("",!0)],16,$t)),[[r]])],16,Jt),i.isItemVisible(s)&&i.isItemGroup(s)?(l(),v(c,m({key:0,id:i.getItemId(s)+"_list",role:"menu",class:n.cx("submenu"),menuId:t.menuId,focusedItemId:t.focusedItemId,items:s.items,templates:t.templates,activeItemPath:t.activeItemPath,level:t.level+1,visible:i.isItemActive(s)&&i.isItemGroup(s),pt:n.pt,unstyled:n.unstyled,onItemClick:e[0]||(e[0]=function(b){return n.$emit("item-click",b)}),onItemMouseenter:e[1]||(e[1]=function(b){return n.$emit("item-mouseenter",b)}),onItemMousemove:e[2]||(e[2]=function(b){return n.$emit("item-mousemove",b)}),"aria-labelledby":i.getItemLabelId(s),ref_for:!0},n.ptm("submenu")),null,16,["id","class","menuId","focusedItemId","items","templates","activeItemPath","level","visible","pt","unstyled","aria-labelledby"])):p("",!0)],16,Qt)):p("",!0),i.isItemVisible(s)&&i.getItemProp(s,"separator")?(l(),d("li",m({key:1,id:i.getItemId(s),style:i.getItemProp(s,"style"),class:[n.cx("separator"),i.getItemProp(s,"class")],role:"separator",ref_for:!0},n.ptm("separator")),null,16,tn)):p("",!0)],64)}),128))],16,Yt)):p("",!0)]}),_:1},16,["onEnter"])}ke.render=nn;var xe={name:"ContextMenu",extends:Xt,inheritAttrs:!1,emits:["focus","blur","show","hide","before-show","before-hide"],target:null,outsideClickListener:null,resizeListener:null,documentContextMenuListener:null,pageX:null,pageY:null,container:null,list:null,data:function(){return{id:this.$attrs.id,focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:""},activeItemPath:[],visible:!1,submenuVisible:!1}},watch:{"$attrs.id":function(e){this.id=e||T()},activeItemPath:function(e){I(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):this.visible||(this.unbindOutsideClickListener(),this.unbindResizeListener())}},mounted:function(){this.id=this.id||T(),this.global&&this.bindDocumentContextMenuListener()},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.unbindDocumentContextMenuListener(),this.container&&this.autoZIndex&&D.clear(this.container),this.target=null,this.container=null},methods:{getItemProp:function(e,t){return e?F(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemGroup:function(e){return I(this.getItemProp(e,"items"))},isItemSeparator:function(e){return this.getItemProp(e,"separator")},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&I(e.items)},toggle:function(e){this.visible?this.hide():this.show(e)},show:function(e){this.$emit("before-show"),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:""},y(this.list),this.pageX=e.pageX,this.pageY=e.pageY,this.visible?this.position():this.visible=!0,e.stopPropagation(),e.preventDefault()},hide:function(){this.$emit("before-hide"),this.visible=!1,this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:""}},onFocus:function(e){this.focused=!0,this.focusedItemInfo=this.focusedItemInfo.index!==-1?this.focusedItemInfo:{index:-1,level:0,parentKey:""},this.$emit("focus",e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:""},this.searchValue="",this.$emit("blur",e)},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Space":this.onSpaceKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!t&&X(e.key)&&this.searchItems(e,e.key);break}},onItemChange:function(e){var t=e.processedItem,a=e.isFocus;if(!A(t)){var o=t.index,i=t.key,u=t.level,c=t.parentKey,r=t.items,s=I(r),f=this.activeItemPath.filter(function(b){return b.parentKey!==c&&b.parentKey!==i});s&&(f.push(t),this.submenuVisible=!0),this.focusedItemInfo={index:o,level:u,parentKey:c},this.activeItemPath=f,a&&y(this.list)}},onItemClick:function(e){var t=e.processedItem,a=this.isProccessedItemGroup(t),o=this.isSelected(t);if(o){var i=t.index,u=t.key,c=t.level,r=t.parentKey;this.activeItemPath=this.activeItemPath.filter(function(s){return u!==s.key&&u.startsWith(s.key)}),this.focusedItemInfo={index:i,level:c,parentKey:r},y(this.list)}else a?this.onItemChange(e):this.hide()},onItemMouseEnter:function(e){this.onItemChange(e)},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},onArrowDownKey:function(e){var t=this.focusedItemInfo.index!==-1?this.findNextItemIndex(this.focusedItemInfo.index):this.findFirstFocusedItemIndex();this.changeFocusedItemIndex(e,t),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index],a=this.isProccessedItemGroup(t);!a&&this.onItemChange({originalEvent:e,processedItem:t})}this.popup&&this.hide(),e.preventDefault()}else{var o=this.focusedItemInfo.index!==-1?this.findPrevItemIndex(this.focusedItemInfo.index):this.findLastFocusedItemIndex();this.changeFocusedItemIndex(e,o),e.preventDefault()}},onArrowLeftKey:function(e){var t=this,a=this.visibleItems[this.focusedItemInfo.index],o=this.activeItemPath.find(function(u){return u.key===a.parentKey}),i=A(a.parent);i||(this.focusedItemInfo={index:-1,parentKey:o?o.parentKey:""},this.searchValue="",this.onArrowDownKey(e)),this.activeItemPath=this.activeItemPath.filter(function(u){return u.parentKey!==t.focusedItemInfo.parentKey}),e.preventDefault()},onArrowRightKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index],a=this.isProccessedItemGroup(t);a&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.searchValue="",this.onArrowDownKey(e)),e.preventDefault()},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=x(this.list,'li[id="'.concat("".concat(this.focusedItemIdx),'"]')),a=t&&x(t,'a[data-pc-section="itemlink"]');a?a.click():t&&t.click();var o=this.visibleItems[this.focusedItemInfo.index],i=this.isProccessedItemGroup(o);!i&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){this.hide(),!this.popup&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex()),e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index],a=this.isProccessedItemGroup(t);!a&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},onEnter:function(e){Re(e,{position:"absolute"}),this.position(),this.autoZIndex&&D.set("menu",e,this.baseZIndex+this.$primevue.config.zIndex.menu)},onAfterEnter:function(){this.bindOutsideClickListener(),this.bindResizeListener(),this.$emit("show"),y(this.list)},onLeave:function(){this.$emit("hide"),this.container=null},onAfterLeave:function(e){this.autoZIndex&&D.clear(e),this.unbindOutsideClickListener(),this.unbindResizeListener()},position:function(){var e=this.pageX+1,t=this.pageY+1,a=this.container.offsetParent?this.container.offsetWidth:Ne(this.container),o=this.container.offsetParent?this.container.offsetHeight:Ge(this.container),i=je();e+a-document.body.scrollLeft>i.width&&(e-=a),t+o-document.body.scrollTop>i.height&&(t-=o),e<document.body.scrollLeft&&(e=document.body.scrollLeft),t<document.body.scrollTop&&(t=document.body.scrollTop),this.container.style.left=e+"px",this.container.style.top=t+"px"},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var a=e.container&&!e.container.contains(t.target),o=e.visible?!(e.target&&(e.target===t.target||e.target.contains(t.target))):!0;a&&o&&e.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!$()&&e.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},bindDocumentContextMenuListener:function(){var e=this;this.documentContextMenuListener||(this.documentContextMenuListener=function(t){t.button===2&&e.show(t)},document.addEventListener("contextmenu",this.documentContextMenuListener))},unbindDocumentContextMenuListener:function(){this.documentContextMenuListener&&(document.removeEventListener("contextmenu",this.documentContextMenuListener),this.documentContextMenuListener=null)},isItemMatched:function(e){var t;return this.isValidItem(e)&&((t=this.getProccessedItemLabel(e))===null||t===void 0?void 0:t.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()))},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return B(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,a=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(o){return t.isValidItem(o)}):-1;return a>-1?a+e+1:e},findPrevItemIndex:function(e){var t=this,a=e>0?B(this.visibleItems.slice(0,e),function(o){return t.isValidItem(o)}):-1;return a>-1?a:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,t){var a=this;this.searchValue=(this.searchValue||"")+t;var o=-1,i=!1;return this.focusedItemInfo.index!==-1?(o=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(u){return a.isItemMatched(u)}),o=o===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(u){return a.isItemMatched(u)}):o+this.focusedItemInfo.index):o=this.visibleItems.findIndex(function(u){return a.isItemMatched(u)}),o!==-1&&(i=!0),o===-1&&this.focusedItemInfo.index===-1&&(o=this.findFirstFocusedItemIndex()),o!==-1&&this.changeFocusedItemIndex(e,o),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){a.searchValue="",a.searchTimeout=null},500),i},changeFocusedItemIndex:function(e,t){this.focusedItemInfo.index!==t&&(this.focusedItemInfo.index=t,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e!==-1?"".concat(this.id,"_").concat(e):this.focusedItemIdx,a=x(this.list,'li[id="'.concat(t,'"]'));a&&a.scrollIntoView&&a.scrollIntoView({block:"nearest",inline:"start"})},createProcessedItems:function(e){var t=this,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",u=[];return e&&e.forEach(function(c,r){var s=(i!==""?i+"_":"")+r,f={item:c,index:r,level:a,key:s,parent:o,parentKey:i};f.items=t.createProcessedItems(c.items,a+1,f,s),u.push(f)}),u},containerRef:function(e){this.container=e},listRef:function(e){this.list=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,t=this.activeItemPath.find(function(a){return a.key===e.focusedItemInfo.parentKey});return t?t.items:this.processedItems},focusedItemIdx:function(){return this.focusedItemInfo.index!==-1?"".concat(this.id).concat(I(this.focusedItemInfo.parentKey)?"_"+this.focusedItemInfo.parentKey:"","_").concat(this.focusedItemInfo.index):null}},components:{ContextMenuSub:ke,Portal:Ue}};function an(n,e,t,a,o,i){var u=K("ContextMenuSub"),c=K("Portal");return l(),v(c,{appendTo:n.appendTo},{default:L(function(){return[g(Z,m({name:"p-contextmenu",onEnter:i.onEnter,onAfterEnter:i.onAfterEnter,onLeave:i.onLeave,onAfterLeave:i.onAfterLeave},n.ptm("transition")),{default:L(function(){return[o.visible?(l(),d("div",m({key:0,ref:i.containerRef,class:n.cx("root")},n.ptmi("root")),[g(u,{ref:i.listRef,id:o.id+"_list",class:M(n.cx("rootList")),role:"menubar",root:!0,tabindex:n.tabindex,"aria-orientation":"vertical","aria-activedescendant":o.focused?i.focusedItemIdx:void 0,menuId:o.id,focusedItemId:o.focused?i.focusedItemIdx:void 0,items:i.processedItems,templates:n.$slots,activeItemPath:o.activeItemPath,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,level:0,visible:o.submenuVisible,pt:n.pt,unstyled:n.unstyled,onFocus:i.onFocus,onBlur:i.onBlur,onKeydown:i.onKeyDown,onItemClick:i.onItemClick,onItemMouseenter:i.onItemMouseEnter,onItemMousemove:i.onItemMouseMove},null,8,["id","class","tabindex","aria-activedescendant","menuId","focusedItemId","items","templates","activeItemPath","aria-labelledby","aria-label","visible","pt","unstyled","onFocus","onBlur","onKeydown","onItemClick","onItemMouseenter","onItemMousemove"])],16)):p("",!0)]}),_:1},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:1},8,["appendTo"])}xe.render=an;var on=function(e){var t=e.dt;return`
.p-breadcrumb {
    background: `.concat(t("breadcrumb.background"),`;
    padding: `).concat(t("breadcrumb.padding"),`;
    overflow-x: auto;
}

.p-breadcrumb-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: `).concat(t("breadcrumb.gap"),`;
}

.p-breadcrumb-separator {
    display: flex;
    align-items: center;
    color: `).concat(t("breadcrumb.separator.color"),`;
}

.p-breadcrumb::-webkit-scrollbar {
    display: none;
}

.p-breadcrumb-item-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: `).concat(t("breadcrumb.item.gap"),`;
    transition: background `).concat(t("breadcrumb.transition.duration"),", color ").concat(t("breadcrumb.transition.duration"),", outline-color ").concat(t("breadcrumb.transition.duration"),", box-shadow ").concat(t("breadcrumb.transition.duration"),`;
    border-radius: `).concat(t("breadcrumb.item.border.radius"),`;
    outline-color: transparent;
    color: `).concat(t("breadcrumb.item.color"),`;
}

.p-breadcrumb-item-link:focus-visible {
    box-shadow: `).concat(t("breadcrumb.item.focus.ring.shadow"),`;
    outline: `).concat(t("breadcrumb.item.focus.ring.width")," ").concat(t("breadcrumb.item.focus.ring.style")," ").concat(t("breadcrumb.item.focus.ring.color"),`;
    outline-offset: `).concat(t("breadcrumb.item.focus.ring.offset"),`;
}

.p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
    color: `).concat(t("breadcrumb.item.hover.color"),`;
}

.p-breadcrumb-item-label {
    transition: inherit;
}

.p-breadcrumb-item-icon {
    color: `).concat(t("breadcrumb.item.icon.color"),`;
    transition: inherit;
}

.p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
    color: `).concat(t("breadcrumb.item.icon.hover.color"),`;
}
`)},rn={root:"p-breadcrumb p-component",list:"p-breadcrumb-list",homeItem:"p-breadcrumb-home-item",separator:"p-breadcrumb-separator",item:function(e){var t=e.instance;return["p-breadcrumb-item",{"p-disabled":t.disabled()}]},itemLink:"p-breadcrumb-item-link",itemIcon:"p-breadcrumb-item-icon",itemLabel:"p-breadcrumb-item-label"},sn=G.extend({name:"breadcrumb",theme:on,classes:rn}),un={name:"BaseBreadcrumb",extends:S,props:{model:{type:Array,default:null},home:{type:null,default:null}},style:sn,provide:function(){return{$pcBreadcrumb:this,$parentInstance:this}}},Pe={name:"BreadcrumbItem",hostName:"Breadcrumb",extends:S,props:{item:null,templates:null,index:null},methods:{onClick:function(e){this.item.command&&this.item.command({originalEvent:e,item:this.item})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},isCurrentUrl:function(){var e=this.item,t=e.to,a=e.url,o=typeof window<"u"?window.location.pathname:"";return t===o||a===o?"page":void 0}},computed:{ptmOptions:function(){return{context:{item:this.item,index:this.index}}},getMenuItemProps:function(){var e=this;return{action:m({class:this.cx("itemLink"),"aria-current":this.isCurrentUrl(),onClick:function(a){return e.onClick(a)}},this.ptm("itemLink",this.ptmOptions)),icon:m({class:[this.cx("icon"),this.item.icon]},this.ptm("icon",this.ptmOptions)),label:m({class:this.cx("label")},this.ptm("label",this.ptmOptions))}}}},cn=["href","target","aria-current"];function mn(n,e,t,a,o,i){return i.visible()?(l(),d("li",m({key:0,class:[n.cx("item"),t.item.class]},n.ptm("item",i.ptmOptions)),[t.templates.item?(l(),v(k(t.templates.item),{key:1,item:t.item,label:i.label(),props:i.getMenuItemProps},null,8,["item","label","props"])):(l(),d("a",m({key:0,href:t.item.url||"#",class:n.cx("itemLink"),target:t.item.target,"aria-current":i.isCurrentUrl(),onClick:e[0]||(e[0]=function(){return i.onClick&&i.onClick.apply(i,arguments)})},n.ptm("itemLink",i.ptmOptions)),[t.templates&&t.templates.itemicon?(l(),v(k(t.templates.itemicon),{key:0,item:t.item,class:M(n.cx("itemIcon",i.ptmOptions))},null,8,["item","class"])):t.item.icon?(l(),d("span",m({key:1,class:[n.cx("itemIcon"),t.item.icon]},n.ptm("itemIcon",i.ptmOptions)),null,16)):p("",!0),t.item.label?(l(),d("span",m({key:2,class:n.cx("itemLabel")},n.ptm("itemLabel",i.ptmOptions)),_(i.label()),17)):p("",!0)],16,cn))],16)):p("",!0)}Pe.render=mn;var we={name:"Breadcrumb",extends:un,inheritAttrs:!1,components:{BreadcrumbItem:Pe,ChevronRightIcon:ee}};function ln(n,e,t,a,o,i){var u=K("BreadcrumbItem"),c=K("ChevronRightIcon");return l(),d("nav",m({class:n.cx("root")},n.ptmi("root")),[h("ol",m({class:n.cx("list")},n.ptm("list")),[n.home?(l(),v(u,m({key:0,item:n.home,class:n.cx("homeItem"),templates:n.$slots,pt:n.pt,unstyled:n.unstyled},n.ptm("homeItem")),null,16,["item","class","templates","pt","unstyled"])):p("",!0),(l(!0),d(P,null,O(n.model,function(r,s){return l(),d(P,{key:r.label+"_"+s},[n.home||s!==0?(l(),d("li",m({key:0,class:n.cx("separator"),ref_for:!0},n.ptm("separator")),[E(n.$slots,"separator",{},function(){return[g(c,m({"aria-hidden":"true",ref_for:!0},n.ptm("separatorIcon")),null,16)]})],16)):p("",!0),g(u,{item:r,index:s,templates:n.$slots,pt:n.pt,unstyled:n.unstyled},null,8,["item","index","templates","pt","unstyled"])],64)}),128))],16)],16)}we.render=ln;var dn=function(e){var t=e.dt;return`
.p-menubar {
    display: flex;
    align-items: center;
    background: `.concat(t("menubar.background"),`;
    border: 1px solid `).concat(t("menubar.border.color"),`;
    border-radius: `).concat(t("menubar.border.radius"),`;
    color: `).concat(t("menubar.color"),`;
    padding: `).concat(t("menubar.padding"),`;
    gap: `).concat(t("menubar.gap"),`;
}

.p-menubar-start,
.p-megamenu-end {
    display: flex;
    align-items: center;
}

.p-menubar-root-list,
.p-menubar-submenu {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    outline: 0 none;
}

.p-menubar-root-list {
    align-items: center;
    flex-wrap: wrap;
    gap: `).concat(t("menubar.gap"),`;
}

.p-menubar-root-list > .p-menubar-item > .p-menubar-item-content {
    border-radius: `).concat(t("menubar.base.item.border.radius"),`;
}

.p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
    padding: `).concat(t("menubar.base.item.padding"),`;
}

.p-menubar-item-content {
    transition: background `).concat(t("menubar.transition.duration"),", color ").concat(t("menubar.transition.duration"),`;
    border-radius: `).concat(t("menubar.item.border.radius"),`;
    color: `).concat(t("menubar.item.color"),`;
}

.p-menubar-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: `).concat(t("menubar.item.padding"),`;
    gap: `).concat(t("menubar.item.gap"),`;
    user-select: none;
    outline: 0 none;
}

.p-menubar-item-label {
    line-height: 1;
}

.p-menubar-item-icon {
    color: `).concat(t("menubar.item.icon.color"),`;
}

.p-menubar-submenu-icon {
    color: `).concat(t("menubar.submenu.icon.color"),`;
    margin-left: auto;
    font-size: `).concat(t("menubar.submenu.icon.size"),`;
    width: `).concat(t("menubar.submenu.icon.size"),`;
    height: `).concat(t("menubar.submenu.icon.size"),`;
}

.p-menubar-item.p-focus > .p-menubar-item-content {
    color: `).concat(t("menubar.item.focus.color"),`;
    background: `).concat(t("menubar.item.focus.background"),`;
}

.p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-item-icon {
    color: `).concat(t("menubar.item.icon.focus.color"),`;
}

.p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-submenu-icon {
    color: `).concat(t("menubar.submenu.icon.focus.color"),`;
}

.p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover {
    color: `).concat(t("menubar.item.focus.color"),`;
    background: `).concat(t("menubar.item.focus.background"),`;
}

.p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-item-icon {
    color: `).concat(t("menubar.item.icon.focus.color"),`;
}

.p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-submenu-icon {
    color: `).concat(t("menubar.submenu.icon.focus.color"),`;
}

.p-menubar-item-active > .p-menubar-item-content {
    color: `).concat(t("menubar.item.active.color"),`;
    background: `).concat(t("menubar.item.active.background"),`;
}

.p-menubar-item-active > .p-menubar-item-content .p-menubar-item-icon {
    color: `).concat(t("menubar.item.icon.active.color"),`;
}

.p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
    color: `).concat(t("menubar.submenu.icon.active.color"),`;
}

.p-menubar-submenu {
    display: none;
    position: absolute;
    min-width: 12.5rem;
    z-index: 1;
    background: `).concat(t("menubar.submenu.background"),`;
    border: 1px solid `).concat(t("menubar.submenu.border.color"),`;
    border-radius: `).concat(t("menubar.border.radius"),`;
    box-shadow: `).concat(t("menubar.submenu.shadow"),`;
    color: `).concat(t("menubar.submenu.color"),`;
    flex-direction: column;
    padding: `).concat(t("menubar.submenu.padding"),`;
    gap: `).concat(t("menubar.submenu.gap"),`;
}

.p-menubar-submenu .p-menubar-separator {
    border-top: 1px solid `).concat(t("menubar.separator.border.color"),`;
}

.p-menubar-submenu .p-menubar-item {
    position: relative;
}

 .p-menubar-submenu > .p-menubar-item-active > .p-menubar-submenu {
    display: block;
    left: 100%;
    top: 0;
}

.p-menubar-end {
    margin-left: auto;
    align-self: center;
}

.p-menubar-button {
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: `).concat(t("menubar.mobile.button.size"),`;
    height: `).concat(t("menubar.mobile.button.size"),`;
    position: relative;
    color: `).concat(t("menubar.mobile.button.color"),`;
    border: 0 none;
    background: transparent;
    border-radius: `).concat(t("menubar.mobile.button.border.radius"),`;
    transition: background `).concat(t("menubar.transition.duration"),", color ").concat(t("menubar.transition.duration"),", outline-color ").concat(t("menubar.transition.duration"),`;
    outline-color: transparent;
}

.p-menubar-button:hover {
    color: `).concat(t("menubar.mobile.button.hover.color"),`;
    background: `).concat(t("menubar.mobile.button.hover.background"),`;
}

.p-menubar-button:focus-visible {
    box-shadow: `).concat(t("menubar.mobile.button.focus.ring.shadow"),`;
    outline: `).concat(t("menubar.mobile.button.focus.ring.width")," ").concat(t("menubar.mobile.button.focus.ring.style")," ").concat(t("menubar.mobile.button.focus.ring.color"),`;
    outline-offset: `).concat(t("menubar.mobile.button.focus.ring.offset"),`;
}

.p-menubar-mobile {
    position: relative;
}

.p-menubar-mobile .p-menubar-button {
    display: flex;
}

.p-menubar-mobile .p-menubar-root-list {
    position: absolute;
    display: none;
    width: 100%;
    padding: `).concat(t("menubar.submenu.padding"),`;
    background: `).concat(t("menubar.submenu.background"),`;
    border: 1px solid `).concat(t("menubar.submenu.border.color"),`;
    box-shadow: `).concat(t("menubar.submenu.shadow"),`;
}

.p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content {
    border-radius: `).concat(t("menubar.item.border.radius"),`;
}

.p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
    padding: `).concat(t("menubar.item.padding"),`;
}

.p-menubar-mobile-active .p-menubar-root-list {
    display: flex;
    flex-direction: column;
    top: 100%;
    left: 0;
    z-index: 1;
}

.p-menubar-mobile .p-menubar-root-list .p-menubar-item {
    width: 100%;
    position: static;
}

.p-menubar-mobile .p-menubar-root-list .p-menubar-separator {
    border-top: 1px solid `).concat(t("menubar.separator.border.color"),`;
}

.p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon {
    margin-left: auto;
    transition: transform 0.2s;
}

.p-menubar-mobile .p-menubar-root-list > .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
    transform: rotate(-180deg);
}

.p-menubar-mobile .p-menubar-submenu .p-menubar-submenu-icon {
    transition: transform 0.2s;
    transform: rotate(90deg);
}

.p-menubar-mobile  .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
    transform: rotate(-90deg);
}

.p-menubar-mobile .p-menubar-submenu {
    width: 100%;
    position: static;
    box-shadow: none;
    border: 0 none;
    padding-left: `).concat(t("menubar.submenu.mobile.indent"),`;
}
`)},fn={submenu:function(e){var t=e.instance,a=e.processedItem;return{display:t.isItemActive(a)?"flex":"none"}}},hn={root:function(e){var t=e.instance;return["p-menubar p-component",{"p-menubar-mobile":t.queryMatches,"p-menubar-mobile-active":t.mobileActive}]},start:"p-menubar-start",button:"p-menubar-button",rootList:"p-menubar-root-list",item:function(e){var t=e.instance,a=e.processedItem;return["p-menubar-item",{"p-menubar-item-active":t.isItemActive(a),"p-focus":t.isItemFocused(a),"p-disabled":t.isItemDisabled(a)}]},itemContent:"p-menubar-item-content",itemLink:"p-menubar-item-link",itemIcon:"p-menubar-item-icon",itemLabel:"p-menubar-item-label",submenuIcon:"p-menubar-submenu-icon",submenu:"p-menubar-submenu",separator:"p-menubar-separator",end:"p-menubar-end"},bn=G.extend({name:"menubar",theme:dn,classes:hn,inlineStyles:fn}),In={name:"BaseMenubar",extends:S,props:{model:{type:Array,default:null},buttonProps:{type:null,default:null},breakpoint:{type:String,default:"960px"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:bn,provide:function(){return{$pcMenubar:this,$parentInstance:this}}},Le={name:"MenubarSub",hostName:"Menubar",extends:S,emits:["item-mouseenter","item-click","item-mousemove"],props:{items:{type:Array,default:null},root:{type:Boolean,default:!1},popup:{type:Boolean,default:!1},mobileActive:{type:Boolean,default:!1},templates:{type:Object,default:null},level:{type:Number,default:0},menuId:{type:String,default:null},focusedItemId:{type:String,default:null},activeItemPath:{type:Object,default:null}},list:null,methods:{getItemId:function(e){return"".concat(this.menuId,"_").concat(e.key)},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,a){return e&&e.item?F(e.item[t],a):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getItemLabelId:function(e){return"".concat(this.menuId,"_").concat(e.key,"_label")},getPTOptions:function(e,t,a){return this.ptm(a,{context:{item:e,index:t,active:this.isItemActive(e),focused:this.isItemFocused(e),disabled:this.isItemDisabled(e),level:this.level}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return I(e.items)},onItemClick:function(e,t){this.getItemProp(t,"command",{originalEvent:e,item:t.item}),this.$emit("item-click",{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit("item-mouseenter",{originalEvent:e,processedItem:t})},onItemMouseMove:function(e,t){this.$emit("item-mousemove",{originalEvent:e,processedItem:t})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,"separator")}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(a){return t.isItemVisible(a)&&t.getItemProp(a,"separator")}).length+1},getMenuItemProps:function(e,t){return{action:m({class:this.cx("itemLink"),tabindex:-1,"aria-hidden":!0},this.getPTOptions(e,t,"itemLink")),icon:m({class:[this.cx("itemIcon"),this.getItemProp(e,"icon")]},this.getPTOptions(e,t,"itemIcon")),label:m({class:this.cx("itemLabel")},this.getPTOptions(e,t,"itemLabel")),submenuicon:m({class:this.cx("submenuIcon")},this.getPTOptions(e,t,"submenuIcon"))}}},components:{AngleRightIcon:te,AngleDownIcon:be},directives:{ripple:q}},pn=["id","aria-label","aria-disabled","aria-expanded","aria-haspopup","aria-level","aria-setsize","aria-posinset","data-p-active","data-p-focused","data-p-disabled"],gn=["onClick","onMouseenter","onMousemove"],vn=["href","target"],yn=["id"],kn=["id"];function xn(n,e,t,a,o,i){var u=K("MenubarSub",!0),c=W("ripple");return l(),d("ul",m({class:t.level===0?n.cx("rootList"):n.cx("submenu")},t.level===0?n.ptm("rootList"):n.ptm("submenu")),[(l(!0),d(P,null,O(t.items,function(r,s){return l(),d(P,{key:i.getItemKey(r)},[i.isItemVisible(r)&&!i.getItemProp(r,"separator")?(l(),d("li",m({key:0,id:i.getItemId(r),style:i.getItemProp(r,"style"),class:[n.cx("item",{processedItem:r}),i.getItemProp(r,"class")],role:"menuitem","aria-label":i.getItemLabel(r),"aria-disabled":i.isItemDisabled(r)||void 0,"aria-expanded":i.isItemGroup(r)?i.isItemActive(r):void 0,"aria-haspopup":i.isItemGroup(r)&&!i.getItemProp(r,"to")?"menu":void 0,"aria-level":t.level+1,"aria-setsize":i.getAriaSetSize(),"aria-posinset":i.getAriaPosInset(s),ref_for:!0},i.getPTOptions(r,s,"item"),{"data-p-active":i.isItemActive(r),"data-p-focused":i.isItemFocused(r),"data-p-disabled":i.isItemDisabled(r)}),[h("div",m({class:n.cx("itemContent"),onClick:function(b){return i.onItemClick(b,r)},onMouseenter:function(b){return i.onItemMouseEnter(b,r)},onMousemove:function(b){return i.onItemMouseMove(b,r)},ref_for:!0},i.getPTOptions(r,s,"itemContent")),[t.templates.item?(l(),v(k(t.templates.item),{key:1,item:r.item,root:t.root,hasSubmenu:i.getItemProp(r,"items"),label:i.getItemLabel(r),props:i.getMenuItemProps(r,s)},null,8,["item","root","hasSubmenu","label","props"])):H((l(),d("a",m({key:0,href:i.getItemProp(r,"url"),class:n.cx("itemLink"),target:i.getItemProp(r,"target"),tabindex:"-1","aria-hidden":"true",ref_for:!0},i.getPTOptions(r,s,"itemLink")),[t.templates.itemicon?(l(),v(k(t.templates.itemicon),{key:0,item:r.item,class:M(n.cx("itemIcon"))},null,8,["item","class"])):i.getItemProp(r,"icon")?(l(),d("span",m({key:1,class:[n.cx("itemIcon"),i.getItemProp(r,"icon")],ref_for:!0},i.getPTOptions(r,s,"itemIcon")),null,16)):p("",!0),h("span",m({id:i.getItemLabelId(r),class:n.cx("itemLabel"),ref_for:!0},i.getPTOptions(r,s,"itemLabel")),_(i.getItemLabel(r)),17,yn),i.getItemProp(r,"items")?(l(),d(P,{key:2},[t.templates.submenuicon?(l(),v(k(t.templates.submenuicon),{key:0,root:t.root,active:i.isItemActive(r),class:M(n.cx("submenuIcon"))},null,8,["root","active","class"])):(l(),v(k(t.root?"AngleDownIcon":"AngleRightIcon"),m({key:1,class:n.cx("submenuIcon"),ref_for:!0},i.getPTOptions(r,s,"submenuIcon")),null,16,["class"]))],64)):p("",!0)],16,vn)),[[c]])],16,gn),i.isItemVisible(r)&&i.isItemGroup(r)?(l(),v(u,{key:0,id:i.getItemId(r)+"_list",menuId:t.menuId,role:"menu",style:le(n.sx("submenu",!0,{processedItem:r})),focusedItemId:t.focusedItemId,items:r.items,mobileActive:t.mobileActive,activeItemPath:t.activeItemPath,templates:t.templates,level:t.level+1,"aria-labelledby":i.getItemLabelId(r),pt:n.pt,unstyled:n.unstyled,onItemClick:e[0]||(e[0]=function(f){return n.$emit("item-click",f)}),onItemMouseenter:e[1]||(e[1]=function(f){return n.$emit("item-mouseenter",f)}),onItemMousemove:e[2]||(e[2]=function(f){return n.$emit("item-mousemove",f)})},null,8,["id","menuId","style","focusedItemId","items","mobileActive","activeItemPath","templates","level","aria-labelledby","pt","unstyled"])):p("",!0)],16,pn)):p("",!0),i.isItemVisible(r)&&i.getItemProp(r,"separator")?(l(),d("li",m({key:1,id:i.getItemId(r),class:[n.cx("separator"),i.getItemProp(r,"class")],style:i.getItemProp(r,"style"),role:"separator",ref_for:!0},n.ptm("separator")),null,16,kn)):p("",!0)],64)}),128))],16)}Le.render=xn;var Ke={name:"Menubar",extends:In,inheritAttrs:!1,emits:["focus","blur"],matchMediaListener:null,data:function(){return{id:this.$attrs.id,mobileActive:!1,focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:""},activeItemPath:[],dirty:!1,query:null,queryMatches:!1}},watch:{"$attrs.id":function(e){this.id=e||T()},activeItemPath:function(e){I(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener())}},outsideClickListener:null,container:null,menubar:null,mounted:function(){this.id=this.id||T(),this.bindMatchMediaListener()},beforeUnmount:function(){this.mobileActive=!1,this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener(),this.container&&D.clear(this.container),this.container=null},methods:{getItemProp:function(e,t){return e?F(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemGroup:function(e){return I(this.getItemProp(e,"items"))},isItemSeparator:function(e){return this.getItemProp(e,"separator")},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&I(e.items)},toggle:function(e){var t=this;this.mobileActive?(this.mobileActive=!1,D.clear(this.menubar),this.hide()):(this.mobileActive=!0,D.set("menu",this.menubar,this.$primevue.config.zIndex.menu),setTimeout(function(){t.show()},1)),this.bindOutsideClickListener(),e.preventDefault()},show:function(){y(this.menubar)},hide:function(e,t){var a=this;this.mobileActive&&(this.mobileActive=!1,setTimeout(function(){y(a.$refs.menubutton)},0)),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:""},t&&y(this.menubar),this.dirty=!1},onFocus:function(e){this.focused=!0,this.focusedItemInfo=this.focusedItemInfo.index!==-1?this.focusedItemInfo:{index:this.findFirstFocusedItemIndex(),level:0,parentKey:""},this.$emit("focus",e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:""},this.searchValue="",this.dirty=!1,this.$emit("blur",e)},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Space":this.onSpaceKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!t&&X(e.key)&&this.searchItems(e,e.key);break}},onItemChange:function(e){var t=e.processedItem,a=e.isFocus;if(!A(t)){var o=t.index,i=t.key,u=t.level,c=t.parentKey,r=t.items,s=I(r),f=this.activeItemPath.filter(function(b){return b.parentKey!==c&&b.parentKey!==i});s&&f.push(t),this.focusedItemInfo={index:o,level:u,parentKey:c},this.activeItemPath=f,s&&(this.dirty=!0),a&&y(this.menubar)}},onItemClick:function(e){var t=e.originalEvent,a=e.processedItem,o=this.isProccessedItemGroup(a),i=A(a.parent),u=this.isSelected(a);if(u){var c=a.index,r=a.key,s=a.level,f=a.parentKey;this.activeItemPath=this.activeItemPath.filter(function(w){return r!==w.key&&r.startsWith(w.key)}),this.focusedItemInfo={index:c,level:s,parentKey:f},this.dirty=!i,y(this.menubar)}else if(o)this.onItemChange(e);else{var b=i?a:this.activeItemPath.find(function(w){return w.parentKey===""});this.hide(t),this.changeFocusedItemIndex(t,b?b.index:-1),this.mobileActive=!1,y(this.menubar)}},onItemMouseEnter:function(e){this.dirty&&this.onItemChange(e)},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},menuButtonClick:function(e){this.toggle(e)},menuButtonKeydown:function(e){(e.code==="Enter"||e.code==="NumpadEnter"||e.code==="Space")&&this.menuButtonClick(e)},onArrowDownKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index],a=t?A(t.parent):null;if(a){var o=this.isProccessedItemGroup(t);o&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.onArrowRightKey(e))}else{var i=this.focusedItemInfo.index!==-1?this.findNextItemIndex(this.focusedItemInfo.index):this.findFirstFocusedItemIndex();this.changeFocusedItemIndex(e,i)}e.preventDefault()},onArrowUpKey:function(e){var t=this,a=this.visibleItems[this.focusedItemInfo.index],o=A(a.parent);if(o){var i=this.isProccessedItemGroup(a);if(i){this.onItemChange({originalEvent:e,processedItem:a}),this.focusedItemInfo={index:-1,parentKey:a.key};var u=this.findLastItemIndex();this.changeFocusedItemIndex(e,u)}}else{var c=this.activeItemPath.find(function(s){return s.key===a.parentKey});if(this.focusedItemInfo.index===0)this.focusedItemInfo={index:-1,parentKey:c?c.parentKey:""},this.searchValue="",this.onArrowLeftKey(e),this.activeItemPath=this.activeItemPath.filter(function(s){return s.parentKey!==t.focusedItemInfo.parentKey});else{var r=this.focusedItemInfo.index!==-1?this.findPrevItemIndex(this.focusedItemInfo.index):this.findLastFocusedItemIndex();this.changeFocusedItemIndex(e,r)}}e.preventDefault()},onArrowLeftKey:function(e){var t=this,a=this.visibleItems[this.focusedItemInfo.index],o=a?this.activeItemPath.find(function(u){return u.key===a.parentKey}):null;if(o)this.onItemChange({originalEvent:e,processedItem:o}),this.activeItemPath=this.activeItemPath.filter(function(u){return u.parentKey!==t.focusedItemInfo.parentKey}),e.preventDefault();else{var i=this.focusedItemInfo.index!==-1?this.findPrevItemIndex(this.focusedItemInfo.index):this.findLastFocusedItemIndex();this.changeFocusedItemIndex(e,i),e.preventDefault()}},onArrowRightKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index],a=t?this.activeItemPath.find(function(u){return u.key===t.parentKey}):null;if(a){var o=this.isProccessedItemGroup(t);o&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.onArrowDownKey(e))}else{var i=this.focusedItemInfo.index!==-1?this.findNextItemIndex(this.focusedItemInfo.index):this.findFirstFocusedItemIndex();this.changeFocusedItemIndex(e,i),e.preventDefault()}},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=x(this.menubar,'li[id="'.concat("".concat(this.focusedItemId),'"]')),a=t&&x(t,'a[data-pc-section="itemlink"]');a?a.click():t&&t.click();var o=this.visibleItems[this.focusedItemInfo.index],i=this.isProccessedItemGroup(o);!i&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){if(this.focusedItemInfo.level!==0){var t=this.focusedItemInfo;this.hide(e,!1),this.focusedItemInfo={index:Number(t.parentKey.split("_")[0]),level:0,parentKey:""}}e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index],a=this.isProccessedItemGroup(t);!a&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var a=e.container&&!e.container.contains(t.target),o=!(e.target&&(e.target===t.target||e.target.contains(t.target)));a&&o&&e.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(t){$()||e.hide(t,!0),e.mobileActive=!1},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia("(max-width: ".concat(this.breakpoint,")"));this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches,e.mobileActive=!1},this.query.addEventListener("change",this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&(this.query.removeEventListener("change",this.matchMediaListener),this.matchMediaListener=null)},isItemMatched:function(e){var t;return this.isValidItem(e)&&((t=this.getProccessedItemLabel(e))===null||t===void 0?void 0:t.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()))},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return B(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,a=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(o){return t.isValidItem(o)}):-1;return a>-1?a+e+1:e},findPrevItemIndex:function(e){var t=this,a=e>0?B(this.visibleItems.slice(0,e),function(o){return t.isValidItem(o)}):-1;return a>-1?a:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,t){var a=this;this.searchValue=(this.searchValue||"")+t;var o=-1,i=!1;return this.focusedItemInfo.index!==-1?(o=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(u){return a.isItemMatched(u)}),o=o===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(u){return a.isItemMatched(u)}):o+this.focusedItemInfo.index):o=this.visibleItems.findIndex(function(u){return a.isItemMatched(u)}),o!==-1&&(i=!0),o===-1&&this.focusedItemInfo.index===-1&&(o=this.findFirstFocusedItemIndex()),o!==-1&&this.changeFocusedItemIndex(e,o),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){a.searchValue="",a.searchTimeout=null},500),i},changeFocusedItemIndex:function(e,t){this.focusedItemInfo.index!==t&&(this.focusedItemInfo.index=t,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e!==-1?"".concat(this.id,"_").concat(e):this.focusedItemId,a=x(this.menubar,'li[id="'.concat(t,'"]'));a&&a.scrollIntoView&&a.scrollIntoView({block:"nearest",inline:"start"})},createProcessedItems:function(e){var t=this,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",u=[];return e&&e.forEach(function(c,r){var s=(i!==""?i+"_":"")+r,f={item:c,index:r,level:a,key:s,parent:o,parentKey:i};f.items=t.createProcessedItems(c.items,a+1,f,s),u.push(f)}),u},containerRef:function(e){this.container=e},menubarRef:function(e){this.menubar=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,t=this.activeItemPath.find(function(a){return a.key===e.focusedItemInfo.parentKey});return t?t.items:this.processedItems},focusedItemId:function(){return this.focusedItemInfo.index!==-1?"".concat(this.id).concat(I(this.focusedItemInfo.parentKey)?"_"+this.focusedItemInfo.parentKey:"","_").concat(this.focusedItemInfo.index):null}},components:{MenubarSub:Le,BarsIcon:ne}};function N(n){"@babel/helpers - typeof";return N=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},N(n)}function ue(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(n,o).enumerable})),t.push.apply(t,a)}return t}function ce(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ue(Object(t),!0).forEach(function(a){Pn(n,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):ue(Object(t)).forEach(function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(t,a))})}return n}function Pn(n,e,t){return(e=wn(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function wn(n){var e=Ln(n,"string");return N(e)=="symbol"?e:e+""}function Ln(n,e){if(N(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var a=t.call(n,e||"default");if(N(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var Kn=["aria-haspopup","aria-expanded","aria-controls","aria-label"];function Mn(n,e,t,a,o,i){var u=K("BarsIcon"),c=K("MenubarSub");return l(),d("div",m({ref:i.containerRef,class:n.cx("root")},n.ptmi("root")),[n.$slots.start?(l(),d("div",m({key:0,class:n.cx("start")},n.ptm("start")),[E(n.$slots,"start")],16)):p("",!0),E(n.$slots,n.$slots.button?"button":"menubutton",{id:o.id,class:M(n.cx("button")),toggleCallback:function(s){return i.menuButtonClick(s)}},function(){var r;return[n.model&&n.model.length>0?(l(),d("a",m({key:0,ref:"menubutton",role:"button",tabindex:"0",class:n.cx("button"),"aria-haspopup":!!(n.model.length&&n.model.length>0),"aria-expanded":o.mobileActive,"aria-controls":o.id,"aria-label":(r=n.$primevue.config.locale.aria)===null||r===void 0?void 0:r.navigation,onClick:e[0]||(e[0]=function(s){return i.menuButtonClick(s)}),onKeydown:e[1]||(e[1]=function(s){return i.menuButtonKeydown(s)})},ce(ce({},n.buttonProps),n.ptm("button"))),[E(n.$slots,n.$slots.buttonicon?"buttonicon":"menubuttonicon",{},function(){return[g(u,de(fe(n.ptm("buttonicon"))),null,16)]})],16,Kn)):p("",!0)]}),g(c,{ref:i.menubarRef,id:o.id+"_list",role:"menubar",items:i.processedItems,templates:n.$slots,root:!0,mobileActive:o.mobileActive,tabindex:"0","aria-activedescendant":o.focused?i.focusedItemId:void 0,menuId:o.id,focusedItemId:o.focused?i.focusedItemId:void 0,activeItemPath:o.activeItemPath,level:0,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,pt:n.pt,unstyled:n.unstyled,onFocus:i.onFocus,onBlur:i.onBlur,onKeydown:i.onKeyDown,onItemClick:i.onItemClick,onItemMouseenter:i.onItemMouseEnter,onItemMousemove:i.onItemMouseMove},null,8,["id","items","templates","mobileActive","aria-activedescendant","menuId","focusedItemId","activeItemPath","aria-labelledby","aria-label","pt","unstyled","onFocus","onBlur","onKeydown","onItemClick","onItemMouseenter","onItemMousemove"]),n.$slots.end?(l(),d("div",m({key:1,class:n.cx("end")},n.ptm("end")),[E(n.$slots,"end")],16)):p("",!0)],16)}Ke.render=Mn;const Cn={class:"card"},An=h("div",{class:"font-semibold text-xl mb-4"},"Menubar",-1),Sn={class:"card"},En=h("div",{class:"font-semibold text-xl mb-4"},"Breadcrumb",-1),Fn={class:"flex flex-col md:flex-row gap-8"},On={class:"md:w-1/2"},Dn={class:"card"},Tn=h("div",{class:"font-semibold text-xl mb-4"},"Steps",-1),Vn={class:"md:w-1/2"},_n={class:"card"},zn=h("div",{class:"font-semibold text-xl mb-4"},"TabMenu",-1),Hn={class:"flex flex-col md:flex-row gap-8 mt-6"},Bn={class:"md:w-1/3"},Rn={class:"card"},Nn=h("div",{class:"font-semibold text-xl mb-4"},"Tiered Menu",-1),Gn={class:"md:w-1/3"},jn={class:"card"},Un=h("div",{class:"font-semibold text-xl mb-4"},"Plain Menu",-1),qn={class:"md:w-1/3"},Wn={class:"card"},Zn=h("div",{class:"font-semibold text-xl mb-4"},"Overlay Menu",-1),Xn=h("div",{class:"font-semibold text-xl mb-4"},"Context Menu",-1),Yn={class:"flex flex-col md:flex-row gap-8 mt-8"},Qn={class:"md:w-1/2"},Jn={class:"card"},$n=h("div",{class:"font-semibold text-xl mb-4"},"MegaMenu | Horizontal",-1),ei=h("div",{class:"font-semibold text-xl mb-4 mt-8"},"MegaMenu | Vertical",-1),ti={class:"md:w-1/2"},ni={class:"card"},ii=h("div",{class:"font-semibold text-xl mb-4"},"PanelMenu",-1),hi={__name:"MenuDoc",setup(n){const e=C(null),t=C(null),a=C([{label:"Customers",icon:"pi pi-fw pi-table",items:[{label:"New",icon:"pi pi-fw pi-user-plus",items:[{label:"Customer",icon:"pi pi-fw pi-plus"},{label:"Duplicate",icon:"pi pi-fw pi-copy"}]},{label:"Edit",icon:"pi pi-fw pi-user-edit"}]},{label:"Orders",icon:"pi pi-fw pi-shopping-cart",items:[{label:"View",icon:"pi pi-fw pi-list"},{label:"Search",icon:"pi pi-fw pi-search"}]},{label:"Shipments",icon:"pi pi-fw pi-envelope",items:[{label:"Tracker",icon:"pi pi-fw pi-compass"},{label:"Map",icon:"pi pi-fw pi-map-marker"},{label:"Manage",icon:"pi pi-fw pi-pencil"}]},{label:"Profile",icon:"pi pi-fw pi-user",items:[{label:"Settings",icon:"pi pi-fw pi-cog"},{label:"Billing",icon:"pi pi-fw pi-file"}]},{label:"Quit",icon:"pi pi-fw pi-sign-out"}]),o=C({icon:"pi pi-home",to:"/"}),i=C([{label:"Computer"},{label:"Notebook"},{label:"Accessories"},{label:"Backpacks"},{label:"Item"}]),u=C([{label:"Customers",icon:"pi pi-fw pi-table",items:[{label:"New",icon:"pi pi-fw pi-user-plus",items:[{label:"Customer",icon:"pi pi-fw pi-plus"},{label:"Duplicate",icon:"pi pi-fw pi-copy"}]},{label:"Edit",icon:"pi pi-fw pi-user-edit"}]},{label:"Orders",icon:"pi pi-fw pi-shopping-cart",items:[{label:"View",icon:"pi pi-fw pi-list"},{label:"Search",icon:"pi pi-fw pi-search"}]},{label:"Shipments",icon:"pi pi-fw pi-envelope",items:[{label:"Tracker",icon:"pi pi-fw pi-compass"},{label:"Map",icon:"pi pi-fw pi-map-marker"},{label:"Manage",icon:"pi pi-fw pi-pencil"}]},{label:"Profile",icon:"pi pi-fw pi-user",items:[{label:"Settings",icon:"pi pi-fw pi-cog"},{label:"Billing",icon:"pi pi-fw pi-file"}]},{separator:!0},{label:"Quit",icon:"pi pi-fw pi-sign-out"}]),c=C([{label:"Save",icon:"pi pi-save"},{label:"Update",icon:"pi pi-refresh"},{label:"Delete",icon:"pi pi-trash"},{separator:!0},{label:"Home",icon:"pi pi-home"}]),r=C([{label:"Customers",items:[{label:"New",icon:"pi pi-fw pi-plus"},{label:"Edit",icon:"pi pi-fw pi-user-edit"}]},{label:"Orders",items:[{label:"View",icon:"pi pi-fw pi-list"},{label:"Search",icon:"pi pi-fw pi-search"}]}]),s=C([{label:"Save",icon:"pi pi-save"},{label:"Update",icon:"pi pi-refresh"},{label:"Delete",icon:"pi pi-trash"},{separator:!0},{label:"Options",icon:"pi pi-cog"}]),f=C([{label:"Fashion",icon:"pi pi-fw pi-tag",items:[[{label:"Woman",items:[{label:"Woman Item"},{label:"Woman Item"},{label:"Woman Item"}]},{label:"Men",items:[{label:"Men Item"},{label:"Men Item"},{label:"Men Item"}]}],[{label:"Kids",items:[{label:"Kids Item"},{label:"Kids Item"}]},{label:"Luggage",items:[{label:"Luggage Item"},{label:"Luggage Item"},{label:"Luggage Item"}]}]]},{label:"Electronics",icon:"pi pi-fw pi-desktop",items:[[{label:"Computer",items:[{label:"Computer Item"},{label:"Computer Item"}]},{label:"Camcorder",items:[{label:"Camcorder Item"},{label:"Camcorder Item"},{label:"Camcorder Item"}]}],[{label:"TV",items:[{label:"TV Item"},{label:"TV Item"}]},{label:"Audio",items:[{label:"Audio Item"},{label:"Audio Item"},{label:"Audio Item"}]}],[{label:"Sports.7",items:[{label:"Sports.7.1"},{label:"Sports.7.2"}]}]]},{label:"Furniture",icon:"pi pi-fw pi-image",items:[[{label:"Living Room",items:[{label:"Living Room Item"},{label:"Living Room Item"}]},{label:"Kitchen",items:[{label:"Kitchen Item"},{label:"Kitchen Item"},{label:"Kitchen Item"}]}],[{label:"Bedroom",items:[{label:"Bedroom Item"},{label:"Bedroom Item"}]},{label:"Outdoor",items:[{label:"Outdoor Item"},{label:"Outdoor Item"},{label:"Outdoor Item"}]}]]},{label:"Sports",icon:"pi pi-fw pi-star",items:[[{label:"Basketball",items:[{label:"Basketball Item"},{label:"Basketball Item"}]},{label:"Football",items:[{label:"Football Item"},{label:"Football Item"},{label:"Football Item"}]}],[{label:"Tennis",items:[{label:"Tennis Item"},{label:"Tennis Item"}]}]]}]),b=C([{label:"Customers",icon:"pi pi-fw pi-table",items:[{label:"New",icon:"pi pi-fw pi-user-plus",items:[{label:"Customer",icon:"pi pi-fw pi-plus"},{label:"Duplicate",icon:"pi pi-fw pi-copy"}]},{label:"Edit",icon:"pi pi-fw pi-user-edit"}]},{label:"Orders",icon:"pi pi-fw pi-shopping-cart",items:[{label:"View",icon:"pi pi-fw pi-list"},{label:"Search",icon:"pi pi-fw pi-search"}]},{label:"Shipments",icon:"pi pi-fw pi-envelope",items:[{label:"Tracker",icon:"pi pi-fw pi-compass"},{label:"Map",icon:"pi pi-fw pi-map-marker"},{label:"Manage",icon:"pi pi-fw pi-pencil"}]},{label:"Profile",icon:"pi pi-fw pi-user",items:[{label:"Settings",icon:"pi pi-fw pi-cog"},{label:"Billing",icon:"pi pi-fw pi-file"}]}]),w=j=>{e.value.toggle(j)},Y=j=>{t.value.show(j)};return(j,ai)=>{const Me=nt,Ce=at,Ae=it,Se=Ke,Ee=we,Q=et,Fe=tt,Oe=$e,J=Ye,De=Qe,Te=We,Ve=Ze,ie=Xe,_e=Je,ze=xe,ae=ye,He=ge;return l(),d(P,null,[h("div",Cn,[An,g(Se,{model:a.value},{end:L(()=>[g(Ae,{iconPosition:"left"},{default:L(()=>[g(Me,{class:"pi pi-search"}),g(Ce,{type:"text",placeholder:"Search"})]),_:1})]),_:1},8,["model"])]),h("div",Sn,[En,g(Ee,{home:o.value,model:i.value},null,8,["home","model"])]),h("div",Fn,[h("div",On,[h("div",Dn,[Tn,g(Oe,{value:"1"},{default:L(()=>[g(Fe,null,{default:L(()=>[g(Q,{value:"1"},{default:L(()=>[V("Header I")]),_:1}),g(Q,{value:"2"},{default:L(()=>[V("Header II")]),_:1}),g(Q,{value:"3"},{default:L(()=>[V("Header III")]),_:1})]),_:1})]),_:1})])]),h("div",Vn,[h("div",_n,[zn,g(Te,{value:"0"},{default:L(()=>[g(De,null,{default:L(()=>[g(J,{value:"0"},{default:L(()=>[V("Header I")]),_:1}),g(J,{value:"1"},{default:L(()=>[V("Header II")]),_:1}),g(J,{value:"2"},{default:L(()=>[V("Header III")]),_:1})]),_:1})]),_:1})])])]),h("div",Hn,[h("div",Bn,[h("div",Rn,[Nn,g(Ve,{model:u.value},null,8,["model"])])]),h("div",Gn,[h("div",jn,[Un,g(ie,{model:r.value},null,8,["model"])])]),h("div",qn,[h("div",Wn,[Zn,g(ie,{ref_key:"menu",ref:e,model:c.value,popup:!0},null,8,["model"]),g(_e,{type:"button",label:"Options",icon:"pi pi-angle-down",onClick:w,style:{width:"auto"}})]),h("div",{class:"card",onContextmenu:Y},[Xn,V(" Right click to display. "),g(ze,{ref_key:"contextMenu",ref:t,model:s.value},null,8,["model"])],32)])]),h("div",Yn,[h("div",Qn,[h("div",Jn,[$n,g(ae,{model:f.value},null,8,["model"]),ei,g(ae,{model:f.value,orientation:"vertical"},null,8,["model"])])]),h("div",ti,[h("div",ni,[ii,g(He,{model:b.value},null,8,["model"])])])])],64)}}};export{hi as default};
