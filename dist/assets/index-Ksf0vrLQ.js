import{B as q,U as F,R as T,a9 as y,a1 as P,aF as w,V as p,z as l,M as D,a8 as h,W,b as C,X as J,c,d,F as k,Y as V,f as b,g as L,O as I,P as v,v as g,_ as E,q as _,e as O,i as N,ai as j,T as B,a7 as X,bb as S,J as H,N as Y}from"./index-bfcxjBKy.js";import{s as U}from"./index-BeD02XQp.js";import{s as R}from"./index-Dvre47Eq.js";var Q=function(e){var t=e.dt;return`
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
`)},Z={root:"p-panelmenu p-component",panel:"p-panelmenu-panel",header:function(e){var t=e.instance,i=e.item;return["p-panelmenu-header",{"p-panelmenu-header-active":t.isItemActive(i)&&!!i.items,"p-disabled":t.isItemDisabled(i)}]},headerContent:"p-panelmenu-header-content",headerLink:"p-panelmenu-header-link",headerIcon:"p-panelmenu-header-icon",headerLabel:"p-panelmenu-header-label",contentContainer:"p-panelmenu-content-container",content:"p-panelmenu-content",rootList:"p-panelmenu-root-list",item:function(e){var t=e.instance,i=e.processedItem;return["p-panelmenu-item",{"p-focus":t.isItemFocused(i),"p-disabled":t.isItemDisabled(i)}]},itemContent:"p-panelmenu-item-content",itemLink:"p-panelmenu-item-link",itemIcon:"p-panelmenu-item-icon",itemLabel:"p-panelmenu-item-label",submenuIcon:"p-panelmenu-submenu-icon",submenu:"p-panelmenu-submenu",separator:"p-menuitem-separator"},$=q.extend({name:"panelmenu",theme:Q,classes:Z}),ee={name:"BasePanelMenu",extends:D,props:{model:{type:Array,default:null},expandedKeys:{type:Object,default:null},multiple:{type:Boolean,default:!1},tabindex:{type:Number,default:0}},style:$,provide:function(){return{$pcPanelMenu:this,$parentInstance:this}}},G={name:"PanelMenuSub",hostName:"PanelMenu",extends:D,emits:["item-toggle","item-mousemove"],props:{panelId:{type:String,default:null},focusedItemId:{type:String,default:null},items:{type:Array,default:null},level:{type:Number,default:0},templates:{type:Object,default:null},activeItemPath:{type:Object,default:null},tabindex:{type:Number,default:-1}},methods:{getItemId:function(e){return"".concat(this.panelId,"_").concat(e.key)},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,i){return e&&e.item?T(e.item[t],i):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getPTOptions:function(e,t,i){return this.ptm(e,{context:{item:t,index:i,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t)}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return h(e.items)},onItemClick:function(e,t){this.getItemProp(t,"command",{originalEvent:e,item:t.item}),this.$emit("item-toggle",{processedItem:t,expanded:!this.isItemActive(t)})},onItemToggle:function(e){this.$emit("item-toggle",e)},onItemMouseMove:function(e,t){this.$emit("item-mousemove",{originalEvent:e,processedItem:t})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,"separator")}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(i){return t.isItemVisible(i)&&t.getItemProp(i,"separator")}).length+1},getMenuItemProps:function(e,t){return{action:l({class:this.cx("itemLink"),tabindex:-1,"aria-hidden":!0},this.getPTOptions("itemLink",e,t)),icon:l({class:[this.cx("itemIcon"),this.getItemProp(e,"icon")]},this.getPTOptions("itemIcon",e,t)),label:l({class:this.cx("itemLabel")},this.getPTOptions("itemLabel",e,t)),submenuicon:l({class:this.cx("submenuIcon")},this.getPTOptions("submenuicon",e,t))}}},components:{ChevronRightIcon:R,ChevronDownIcon:U},directives:{ripple:W}},te=["tabindex"],ne=["id","aria-label","aria-expanded","aria-level","aria-setsize","aria-posinset","data-p-focused","data-p-disabled"],ae=["onClick","onMousemove"],ie=["href","target"];function re(n,e,t,i,o,a){var u=C("PanelMenuSub",!0),s=J("ripple");return c(),d("ul",{class:E(n.cx("submenu")),tabindex:t.tabindex},[(c(!0),d(k,null,V(t.items,function(r,m){return c(),d(k,{key:a.getItemKey(r)},[a.isItemVisible(r)&&!a.getItemProp(r,"separator")?(c(),d("li",l({key:0,id:a.getItemId(r),class:[n.cx("item",{processedItem:r}),a.getItemProp(r,"class")],style:a.getItemProp(r,"style"),role:"treeitem","aria-label":a.getItemLabel(r),"aria-expanded":a.isItemGroup(r)?a.isItemActive(r):void 0,"aria-level":t.level+1,"aria-setsize":a.getAriaSetSize(),"aria-posinset":a.getAriaPosInset(m),ref_for:!0},a.getPTOptions("item",r,m),{"data-p-focused":a.isItemFocused(r),"data-p-disabled":a.isItemDisabled(r)}),[b("div",l({class:n.cx("itemContent"),onClick:function(A){return a.onItemClick(A,r)},onMousemove:function(A){return a.onItemMouseMove(A,r)},ref_for:!0},a.getPTOptions("itemContent",r,m)),[t.templates.item?(c(),I(v(t.templates.item),{key:1,item:r.item,root:!1,active:a.isItemActive(r),hasSubmenu:a.isItemGroup(r),label:a.getItemLabel(r),props:a.getMenuItemProps(r,m)},null,8,["item","active","hasSubmenu","label","props"])):L((c(),d("a",l({key:0,href:a.getItemProp(r,"url"),class:n.cx("itemLink"),target:a.getItemProp(r,"target"),tabindex:"-1","aria-hidden":"true",ref_for:!0},a.getPTOptions("itemLink",r,m)),[a.isItemGroup(r)?(c(),d(k,{key:0},[t.templates.submenuicon?(c(),I(v(t.templates.submenuicon),l({key:0,class:n.cx("submenuIcon"),active:a.isItemActive(r),ref_for:!0},a.getPTOptions("submenuIcon",r,m)),null,16,["class","active"])):(c(),I(v(a.isItemActive(r)?"ChevronDownIcon":"ChevronRightIcon"),l({key:1,class:n.cx("submenuIcon"),ref_for:!0},a.getPTOptions("submenuIcon",r,m)),null,16,["class"]))],64)):g("",!0),t.templates.itemicon?(c(),I(v(t.templates.itemicon),{key:1,item:r.item,class:E(n.cx("itemIcon"))},null,8,["item","class"])):a.getItemProp(r,"icon")?(c(),d("span",l({key:2,class:[n.cx("itemIcon"),a.getItemProp(r,"icon")],ref_for:!0},a.getPTOptions("itemIcon",r,m)),null,16)):g("",!0),b("span",l({class:n.cx("itemLabel"),ref_for:!0},a.getPTOptions("itemLabel",r,m)),_(a.getItemLabel(r)),17)],16,ie)),[[s]])],16,ae),O(B,l({name:"p-toggleable-content",ref_for:!0},n.ptm("transition")),{default:N(function(){return[L(b("div",l({class:n.cx("contentContainer"),ref_for:!0},n.ptm("contentContainer")),[a.isItemVisible(r)&&a.isItemGroup(r)?(c(),I(u,l({key:0,id:a.getItemId(r)+"_list",role:"group",panelId:t.panelId,focusedItemId:t.focusedItemId,items:r.items,level:t.level+1,templates:t.templates,activeItemPath:t.activeItemPath,onItemToggle:a.onItemToggle,onItemMousemove:e[0]||(e[0]=function(f){return n.$emit("item-mousemove",f)}),pt:n.pt,unstyled:n.unstyled,ref_for:!0},n.ptm("submenu")),null,16,["id","panelId","focusedItemId","items","level","templates","activeItemPath","onItemToggle","pt","unstyled"])):g("",!0)],16),[[j,a.isItemActive(r)]])]}),_:2},1040)],16,ne)):g("",!0),a.isItemVisible(r)&&a.getItemProp(r,"separator")?(c(),d("li",l({key:1,style:a.getItemProp(r,"style"),class:[n.cx("separator"),a.getItemProp(r,"class")],role:"separator",ref_for:!0},n.ptm("separator")),null,16)):g("",!0)],64)}),128))],10,te)}G.render=re;function oe(n,e){return ce(n)||le(n,e)||ue(n,e)||se()}function se(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ue(n,e){if(n){if(typeof n=="string")return M(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?M(n,e):void 0}}function M(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=Array(e);t<e;t++)i[t]=n[t];return i}function le(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,o,a,u,s=[],r=!0,m=!1;try{if(a=(t=t.call(n)).next,e!==0)for(;!(r=(i=a.call(t)).done)&&(s.push(i.value),s.length!==e);r=!0);}catch(f){m=!0,o=f}finally{try{if(!r&&t.return!=null&&(u=t.return(),Object(u)!==u))return}finally{if(m)throw o}}return s}}function ce(n){if(Array.isArray(n))return n}var z={name:"PanelMenuList",hostName:"PanelMenu",extends:D,emits:["item-toggle","header-focus"],props:{panelId:{type:String,default:null},items:{type:Array,default:null},templates:{type:Object,default:null},expandedKeys:{type:Object,default:null}},searchTimeout:null,searchValue:null,data:function(){return{focused:!1,focusedItem:null,activeItemPath:[]}},watch:{expandedKeys:function(e){this.autoUpdateActiveItemPath(e)}},mounted:function(){this.autoUpdateActiveItemPath(this.expandedKeys)},methods:{getItemProp:function(e,t){return e&&e.item?T(e.item[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.parentKey})},isItemGroup:function(e){return h(e.items)},onFocus:function(e){this.focused=!0,this.focusedItem=this.focusedItem||(this.isElementInPanel(e,e.relatedTarget)?this.findFirstItem():this.findLastItem())},onBlur:function(){this.focused=!1,this.focusedItem=null,this.searchValue=""},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Space":this.onSpaceKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":case"Tab":case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!t&&X(e.key)&&this.searchItems(e,e.key);break}},onArrowDownKey:function(e){var t=h(this.focusedItem)?this.findNextItem(this.focusedItem):this.findFirstItem();this.changeFocusedItem({originalEvent:e,processedItem:t,focusOnNext:!0}),e.preventDefault()},onArrowUpKey:function(e){var t=h(this.focusedItem)?this.findPrevItem(this.focusedItem):this.findLastItem();this.changeFocusedItem({originalEvent:e,processedItem:t,selfCheck:!0}),e.preventDefault()},onArrowLeftKey:function(e){var t=this;if(h(this.focusedItem)){var i=this.activeItemPath.some(function(o){return o.key===t.focusedItem.key});i?this.activeItemPath=this.activeItemPath.filter(function(o){return o.key!==t.focusedItem.key}):this.focusedItem=h(this.focusedItem.parent)?this.focusedItem.parent:this.focusedItem,e.preventDefault()}},onArrowRightKey:function(e){var t=this;if(h(this.focusedItem)){var i=this.isItemGroup(this.focusedItem);if(i){var o=this.activeItemPath.some(function(a){return a.key===t.focusedItem.key});o?this.onArrowDownKey(e):(this.activeItemPath=this.activeItemPath.filter(function(a){return a.parentKey!==t.focusedItem.parentKey}),this.activeItemPath.push(this.focusedItem))}e.preventDefault()}},onHomeKey:function(e){this.changeFocusedItem({originalEvent:e,processedItem:this.findFirstItem(),allowHeaderFocus:!1}),e.preventDefault()},onEndKey:function(e){this.changeFocusedItem({originalEvent:e,processedItem:this.findLastItem(),focusOnNext:!0,allowHeaderFocus:!1}),e.preventDefault()},onEnterKey:function(e){if(h(this.focusedItem)){var t=p(this.$el,'li[id="'.concat("".concat(this.focusedItemId),'"]')),i=t&&(p(t,'[data-pc-section="itemlink"]')||p(t,"a,button"));i?i.click():t&&t.click()}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onItemToggle:function(e){var t=e.processedItem,i=e.expanded;this.expandedKeys?this.$emit("item-toggle",{item:t.item,expanded:i}):(this.activeItemPath=this.activeItemPath.filter(function(o){return o.parentKey!==t.parentKey}),i&&this.activeItemPath.push(t)),this.focusedItem=t,P(this.$el)},onItemMouseMove:function(e){this.focused&&(this.focusedItem=e.processedItem)},isElementInPanel:function(e,t){var i=e.currentTarget.closest('[data-pc-section="panel"]');return i&&i.contains(t)},isItemMatched:function(e){var t;return this.isValidItem(e)&&((t=this.getItemLabel(e))===null||t===void 0?void 0:t.toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale)))},isVisibleItem:function(e){return!!e&&(e.level===0||this.isItemActive(e))&&this.isItemVisible(e)},isValidItem:function(e){return!!e&&!this.isItemDisabled(e)&&!this.getItemProp(e,"separator")},findFirstItem:function(){var e=this;return this.visibleItems.find(function(t){return e.isValidItem(t)})},findLastItem:function(){var e=this;return S(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItem:function(e){var t=this,i=this.visibleItems.findIndex(function(a){return a.key===e.key}),o=i<this.visibleItems.length-1?this.visibleItems.slice(i+1).find(function(a){return t.isValidItem(a)}):void 0;return o||e},findPrevItem:function(e){var t=this,i=this.visibleItems.findIndex(function(a){return a.key===e.key}),o=i>0?S(this.visibleItems.slice(0,i),function(a){return t.isValidItem(a)}):void 0;return o||e},searchItems:function(e,t){var i=this;this.searchValue=(this.searchValue||"")+t;var o=null,a=!1;if(h(this.focusedItem)){var u=this.visibleItems.findIndex(function(s){return s.key===i.focusedItem.key});o=this.visibleItems.slice(u).find(function(s){return i.isItemMatched(s)}),o=H(o)?this.visibleItems.slice(0,u).find(function(s){return i.isItemMatched(s)}):o}else o=this.visibleItems.find(function(s){return i.isItemMatched(s)});return h(o)&&(a=!0),H(o)&&H(this.focusedItem)&&(o=this.findFirstItem()),h(o)&&this.changeFocusedItem({originalEvent:e,processedItem:o,allowHeaderFocus:!1}),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){i.searchValue="",i.searchTimeout=null},500),a},changeFocusedItem:function(e){var t=e.originalEvent,i=e.processedItem,o=e.focusOnNext,a=e.selfCheck,u=e.allowHeaderFocus,s=u===void 0?!0:u;h(this.focusedItem)&&this.focusedItem.key!==i.key?(this.focusedItem=i,this.scrollInView()):s&&this.$emit("header-focus",{originalEvent:t,focusOnNext:o,selfCheck:a})},scrollInView:function(){var e=p(this.$el,'li[id="'.concat("".concat(this.focusedItemId),'"]'));e&&e.scrollIntoView&&e.scrollIntoView({block:"nearest",inline:"start"})},autoUpdateActiveItemPath:function(e){var t=this;this.activeItemPath=Object.entries(e||{}).reduce(function(i,o){var a=oe(o,2),u=a[0],s=a[1];if(s){var r=t.findProcessedItemByItemKey(u);r&&i.push(r)}return i},[])},findProcessedItemByItemKey:function(e,t){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0;if(t=t||i===0&&this.processedItems,!t)return null;for(var o=0;o<t.length;o++){var a=t[o];if(this.getItemProp(a,"key")===e)return a;var u=this.findProcessedItemByItemKey(e,a.items,i+1);if(u)return u}},createProcessedItems:function(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",u=[];return e&&e.forEach(function(s,r){var m=(a!==""?a+"_":"")+r,f={item:s,index:r,level:i,key:m,parent:o,parentKey:a};f.items=t.createProcessedItems(s.items,i+1,f,m),u.push(f)}),u},flatItems:function(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e&&e.forEach(function(o){t.isVisibleItem(o)&&(i.push(o),t.flatItems(o.items,i))}),i}},computed:{processedItems:function(){return this.createProcessedItems(this.items||[])},visibleItems:function(){return this.flatItems(this.processedItems)},focusedItemId:function(){return h(this.focusedItem)?"".concat(this.panelId,"_").concat(this.focusedItem.key):null}},components:{PanelMenuSub:G}};function me(n,e,t,i,o,a){var u=C("PanelMenuSub");return c(),I(u,l({id:t.panelId+"_list",class:n.cx("rootList"),role:"tree",tabindex:-1,"aria-activedescendant":o.focused?a.focusedItemId:void 0,panelId:t.panelId,focusedItemId:o.focused?a.focusedItemId:void 0,items:a.processedItems,templates:t.templates,activeItemPath:o.activeItemPath,onFocus:a.onFocus,onBlur:a.onBlur,onKeydown:a.onKeyDown,onItemToggle:a.onItemToggle,onItemMousemove:a.onItemMouseMove,pt:n.pt,unstyled:n.unstyled},n.ptm("rootList")),null,16,["id","class","aria-activedescendant","panelId","focusedItemId","items","templates","activeItemPath","onFocus","onBlur","onKeydown","onItemToggle","onItemMousemove","pt","unstyled"])}z.render=me;function K(n){"@babel/helpers - typeof";return K=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},K(n)}function x(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(o){return Object.getOwnPropertyDescriptor(n,o).enumerable})),t.push.apply(t,i)}return t}function de(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?x(Object(t),!0).forEach(function(i){fe(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):x(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function fe(n,e,t){return(e=he(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function he(n){var e=pe(n,"string");return K(e)=="symbol"?e:e+""}function pe(n,e){if(K(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(K(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var Ie={name:"PanelMenu",extends:ee,inheritAttrs:!1,emits:["update:expandedKeys","panel-open","panel-close"],data:function(){return{id:this.$attrs.id,activeItem:null,activeItems:[]}},watch:{"$attrs.id":function(e){this.id=e||F()}},mounted:function(){this.id=this.id||F()},methods:{getItemProp:function(e,t){return e?T(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getPTOptions:function(e,t,i){return this.ptm(e,{context:{index:i,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t)}})},isItemActive:function(e){return this.expandedKeys?this.expandedKeys[this.getItemProp(e,"key")]:this.multiple?this.activeItems.some(function(t){return y(e,t)}):y(e,this.activeItem)},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return y(e,this.activeItem)},getPanelId:function(e){return"".concat(this.id,"_").concat(e)},getPanelKey:function(e){return this.getPanelId(e)},getHeaderId:function(e){return"".concat(this.getPanelId(e),"_header")},getContentId:function(e){return"".concat(this.getPanelId(e),"_content")},onHeaderClick:function(e,t){if(this.isItemDisabled(t)){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),this.changeActiveItem(e,t),P(e.currentTarget)},onHeaderKeyDown:function(e,t){switch(e.code){case"ArrowDown":this.onHeaderArrowDownKey(e);break;case"ArrowUp":this.onHeaderArrowUpKey(e);break;case"Home":this.onHeaderHomeKey(e);break;case"End":this.onHeaderEndKey(e);break;case"Enter":case"NumpadEnter":case"Space":this.onHeaderEnterKey(e,t);break}},onHeaderArrowDownKey:function(e){var t=w(e.currentTarget,"data-p-active")===!0?p(e.currentTarget.nextElementSibling,'[data-pc-section="rootlist"]'):null;t?P(t):this.updateFocusedHeader({originalEvent:e,focusOnNext:!0}),e.preventDefault()},onHeaderArrowUpKey:function(e){var t=this.findPrevHeader(e.currentTarget.parentElement)||this.findLastHeader(),i=w(t,"data-p-active")===!0?p(t.nextElementSibling,'[data-pc-section="rootlist"]'):null;i?P(i):this.updateFocusedHeader({originalEvent:e,focusOnNext:!1}),e.preventDefault()},onHeaderHomeKey:function(e){this.changeFocusedHeader(e,this.findFirstHeader()),e.preventDefault()},onHeaderEndKey:function(e){this.changeFocusedHeader(e,this.findLastHeader()),e.preventDefault()},onHeaderEnterKey:function(e,t){var i=p(e.currentTarget,'[data-pc-section="headerlink"]');i?i.click():this.onHeaderClick(e,t),e.preventDefault()},findNextHeader:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,i=t?e:e.nextElementSibling,o=p(i,'[data-pc-section="header"]');return o?w(o,"data-p-disabled")?this.findNextHeader(o.parentElement):o:null},findPrevHeader:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,i=t?e:e.previousElementSibling,o=p(i,'[data-pc-section="header"]');return o?w(o,"data-p-disabled")?this.findPrevHeader(o.parentElement):o:null},findFirstHeader:function(){return this.findNextHeader(this.$el.firstElementChild,!0)},findLastHeader:function(){return this.findPrevHeader(this.$el.lastElementChild,!0)},updateFocusedHeader:function(e){var t=e.originalEvent,i=e.focusOnNext,o=e.selfCheck,a=t.currentTarget.closest('[data-pc-section="panel"]'),u=o?p(a,'[data-pc-section="header"]'):i?this.findNextHeader(a):this.findPrevHeader(a);u?this.changeFocusedHeader(t,u):i?this.onHeaderHomeKey(t):this.onHeaderEndKey(t)},changeActiveItem:function(e,t){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(!this.isItemDisabled(t)){var o=this.isItemActive(t),a=o?"panel-close":"panel-open";this.activeItem=i?t:this.activeItem&&y(t,this.activeItem)?null:t,this.multiple&&(this.activeItems.some(function(u){return y(t,u)})?this.activeItems=this.activeItems.filter(function(u){return!y(t,u)}):this.activeItems.push(t)),this.changeExpandedKeys({item:t,expanded:!o}),this.$emit(a,{originalEvent:e,item:t})}},changeExpandedKeys:function(e){var t=e.item,i=e.expanded,o=i===void 0?!1:i;if(this.expandedKeys){var a=de({},this.expandedKeys);o?a[t.key]=!0:delete a[t.key],this.$emit("update:expandedKeys",a)}},changeFocusedHeader:function(e,t){t&&P(t)},getMenuItemProps:function(e,t){return{icon:l({class:[this.cx("headerIcon"),this.getItemProp(e,"icon")]},this.getPTOptions("headerIcon",e,t)),label:l({class:this.cx("headerLabel")},this.getPTOptions("headerLabel",e,t))}}},components:{PanelMenuList:z,ChevronRightIcon:R,ChevronDownIcon:U}},ge=["id"],be=["id","tabindex","aria-label","aria-expanded","aria-controls","aria-disabled","onClick","onKeydown","data-p-active","data-p-disabled"],ve=["href"],ye=["id","aria-labelledby"];function Pe(n,e,t,i,o,a){var u=C("PanelMenuList");return c(),d("div",l({id:o.id,class:n.cx("root")},n.ptmi("root")),[(c(!0),d(k,null,V(n.model,function(s,r){return c(),d(k,{key:a.getPanelKey(r)},[a.isItemVisible(s)?(c(),d("div",l({key:0,style:a.getItemProp(s,"style"),class:[n.cx("panel"),a.getItemProp(s,"class")],ref_for:!0},n.ptm("panel")),[b("div",l({id:a.getHeaderId(r),class:[n.cx("header",{item:s}),a.getItemProp(s,"headerClass")],tabindex:a.isItemDisabled(s)?-1:n.tabindex,role:"button","aria-label":a.getItemLabel(s),"aria-expanded":a.isItemActive(s),"aria-controls":a.getContentId(r),"aria-disabled":a.isItemDisabled(s),onClick:function(f){return a.onHeaderClick(f,s)},onKeydown:function(f){return a.onHeaderKeyDown(f,s)},ref_for:!0},a.getPTOptions("header",s,r),{"data-p-active":a.isItemActive(s),"data-p-disabled":a.isItemDisabled(s)}),[b("div",l({class:n.cx("headerContent"),ref_for:!0},a.getPTOptions("headerContent",s,r)),[n.$slots.item?(c(),I(v(n.$slots.item),{key:1,item:s,root:!0,active:a.isItemActive(s),hasSubmenu:a.getItemProp(s,"items"),label:a.getItemLabel(s),props:a.getMenuItemProps(s,r)},null,8,["item","active","hasSubmenu","label","props"])):(c(),d("a",l({key:0,href:a.getItemProp(s,"url"),class:n.cx("headerLink"),tabindex:-1,ref_for:!0},a.getPTOptions("headerLink",s,r)),[a.getItemProp(s,"items")?Y(n.$slots,"submenuicon",{key:0,active:a.isItemActive(s)},function(){return[(c(),I(v(a.isItemActive(s)?"ChevronDownIcon":"ChevronRightIcon"),l({class:n.cx("submenuIcon"),ref_for:!0},a.getPTOptions("submenuIcon",s,r)),null,16,["class"]))]}):g("",!0),n.$slots.headericon?(c(),I(v(n.$slots.headericon),{key:1,item:s,class:E([n.cx("headerIcon"),a.getItemProp(s,"icon")])},null,8,["item","class"])):a.getItemProp(s,"icon")?(c(),d("span",l({key:2,class:[n.cx("headerIcon"),a.getItemProp(s,"icon")],ref_for:!0},a.getPTOptions("headerIcon",s,r)),null,16)):g("",!0),b("span",l({class:n.cx("headerLabel"),ref_for:!0},a.getPTOptions("headerLabel",s,r)),_(a.getItemLabel(s)),17)],16,ve))],16)],16,be),O(B,l({name:"p-toggleable-content",ref_for:!0},n.ptm("transition")),{default:N(function(){return[L(b("div",l({id:a.getContentId(r),class:n.cx("contentContainer"),role:"region","aria-labelledby":a.getHeaderId(r),ref_for:!0},n.ptm("contentContainer")),[a.getItemProp(s,"items")?(c(),d("div",l({key:0,class:n.cx("content"),ref_for:!0},n.ptm("content")),[O(u,{panelId:a.getPanelId(r),items:a.getItemProp(s,"items"),templates:n.$slots,expandedKeys:n.expandedKeys,onItemToggle:a.changeExpandedKeys,onHeaderFocus:a.updateFocusedHeader,pt:n.pt,unstyled:n.unstyled},null,8,["panelId","items","templates","expandedKeys","onItemToggle","onHeaderFocus","pt","unstyled"])],16)):g("",!0)],16,ye),[[j,a.isItemActive(s)]])]}),_:2},1040)],16)):g("",!0)],64)}),128))],16,ge)}Ie.render=Pe;export{Ie as s};