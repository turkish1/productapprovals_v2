import{s as te}from"./index-1KPC7BgF.js";import{_ as ne}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{o as r,a as w,S as O,z as A,t as v,k as oe,B as q,au as ie,s as W,c as s,r as d,m as a,b as z,d as y,a5 as I,U as j,av as F,a0 as k,a1 as b,ag as G,aw as le,ax as ae,ay as re,az as se,aA as ce,aB as ue,a6 as pe,a7 as H,P as de,aC as he,R as fe,v as C,Q as me,n as L,y as ye,F as E,x as U,j as D,i as M,aj as ge,ab as be,K as ve}from"./index-Dr66IyCx.js";import{O as Oe,s as Ie}from"./index-CLZ-AEOC.js";import{s as we}from"./index-Dp_RpEFz.js";import{s as Se}from"./index-D6eGTuC8.js";import{s as ke}from"./index-D6dvvsKy.js";const Ce={__name:"Buttons",props:{label:String,variant:String,severity:String},emits:["click"],setup(t){return(e,n)=>(r(),w(oe(te),{class:"p-button hover:bg-fuchsia-600",size:"medium",onClick:n[0]||(n[0]=i=>e.$emit("click"))},{default:O(()=>[A(v(t.label),1)]),_:1}))}},st=ne(Ce,[["__scopeId","data-v-b747a5e7"]]);var Le=function(e){var n=e.dt;return`
.p-chip {
    display: inline-flex;
    align-items: center;
    background: `.concat(n("chip.background"),`;
    color: `).concat(n("chip.color"),`;
    border-radius: `).concat(n("chip.border.radius"),`;
    padding: `).concat(n("chip.padding.y")," ").concat(n("chip.padding.x"),`;
    gap: `).concat(n("chip.gap"),`;
}

.p-chip-icon {
    color: `).concat(n("chip.icon.color"),`;
    font-size: `).concat(n("chip.icon.font.size"),`;
    width: `).concat(n("chip.icon.size"),`;
    height: `).concat(n("chip.icon.size"),`;
}

.p-chip-image {
    border-radius: 50%;
    width: `).concat(n("chip.image.width"),`;
    height: `).concat(n("chip.image.height"),`;
    margin-left: calc(-1 * `).concat(n("chip.padding.y"),`);
}

.p-chip:has(.p-chip-remove-icon) {
    padding-right: `).concat(n("chip.padding.y"),`;
}

.p-chip:has(.p-chip-image) {
    padding-top: calc(`).concat(n("chip.padding.y"),` / 2);
    padding-bottom: calc(`).concat(n("chip.padding.y"),` / 2);
}

.p-chip-remove-icon {
    cursor: pointer;
    font-size: `).concat(n("chip.remove.icon.size"),`;
    width: `).concat(n("chip.remove.icon.size"),`;
    height: `).concat(n("chip.remove.icon.size"),`;
    color: `).concat(n("chip.remove.icon.color"),`;
    border-radius: 50%;
    transition: outline-color `).concat(n("chip.transition.duration"),", box-shadow ").concat(n("chip.transition.duration"),`;
    outline-color: transparent;
}

.p-chip-remove-icon:focus-visible {
    box-shadow: `).concat(n("chip.remove.icon.focus.ring.shadow"),`;
    outline: `).concat(n("chip.remove.icon.focus.ring.width")," ").concat(n("chip.remove.icon.focus.ring.style")," ").concat(n("chip.remove.icon.focus.ring.color"),`;
    outline-offset: `).concat(n("chip.remove.icon.focus.ring.offset"),`;
}
`)},Me={root:"p-chip p-component",image:"p-chip-image",icon:"p-chip-icon",label:"p-chip-label",removeIcon:"p-chip-remove-icon"},xe=q.extend({name:"chip",theme:Le,classes:Me}),Ke={name:"BaseChip",extends:W,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},removable:{type:Boolean,default:!1},removeIcon:{type:String,default:void 0}},style:xe,provide:function(){return{$pcChip:this,$parentInstance:this}}},Q={name:"Chip",extends:Ke,inheritAttrs:!1,emits:["remove"],data:function(){return{visible:!0}},methods:{onKeydown:function(e){(e.key==="Enter"||e.key==="Backspace")&&this.close(e)},close:function(e){this.visible=!1,this.$emit("remove",e)}},components:{TimesCircleIcon:ie}},Ve=["aria-label"],De=["src"];function Ae(t,e,n,i,l,o){return l.visible?(r(),s("div",a({key:0,class:t.cx("root"),"aria-label":t.label},t.ptmi("root")),[d(t.$slots,"default",{},function(){return[t.image?(r(),s("img",a({key:0,src:t.image},t.ptm("image"),{class:t.cx("image")}),null,16,De)):t.$slots.icon?(r(),w(z(t.$slots.icon),a({key:1,class:t.cx("icon")},t.ptm("icon")),null,16,["class"])):t.icon?(r(),s("span",a({key:2,class:[t.cx("icon"),t.icon]},t.ptm("icon")),null,16)):y("",!0),t.label?(r(),s("div",a({key:3,class:t.cx("label")},t.ptm("label")),v(t.label),17)):y("",!0)]}),t.removable?d(t.$slots,"removeicon",{key:0,removeCallback:o.close,keydownCallback:o.onKeydown},function(){return[(r(),w(z(t.removeIcon?"span":"TimesCircleIcon"),a({tabindex:"0",class:[t.cx("removeIcon"),t.removeIcon],onClick:o.close,onKeydown:o.onKeydown},t.ptm("removeIcon")),null,16,["class","onClick","onKeydown"]))]}):y("",!0)],16,Ve)):y("",!0)}Q.render=Ae;var Te=function(e){var n=e.dt;return`
.p-autocomplete {
    display: inline-flex;
}

.p-autocomplete-loader {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    right: `.concat(n("autocomplete.padding.x"),`;
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-loader {
    right: calc(`).concat(n("autocomplete.dropdown.width")," + ").concat(n("autocomplete.padding.x"),`);
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input {
    flex: 1 1 auto;
    width: 1%;
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input,
.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input-multiple {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.p-autocomplete-dropdown {
    cursor: pointer;
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: `).concat(n("autocomplete.dropdown.width"),`;
    border-top-right-radius: `).concat(n("autocomplete.dropdown.border.radius"),`;
    border-bottom-right-radius: `).concat(n("autocomplete.dropdown.border.radius"),`;
    background: `).concat(n("autocomplete.dropdown.background"),`;
    border: 1px solid `).concat(n("autocomplete.dropdown.border.color"),`;
    border-left: 0 none;
    color: `).concat(n("autocomplete.dropdown.color"),`;
    transition: background `).concat(n("autocomplete.transition.duration"),", color ").concat(n("autocomplete.transition.duration"),", border-color ").concat(n("autocomplete.transition.duration"),", outline-color ").concat(n("autocomplete.transition.duration"),", box-shadow ").concat(n("autocomplete.transition.duration"),`;
    outline-color: transparent;
}

.p-autocomplete-dropdown:not(:disabled):hover {
    background: `).concat(n("autocomplete.dropdown.hover.background"),`;
    border-color: `).concat(n("autocomplete.dropdown.hover.border.color"),`;
    color: `).concat(n("autocomplete.dropdown.hover.color"),`;
}

.p-autocomplete-dropdown:not(:disabled):active {
    background: `).concat(n("autocomplete.dropdown.active.background"),`;
    border-color: `).concat(n("autocomplete.dropdown.active.border.color"),`;
    color: `).concat(n("autocomplete.dropdown.active.color"),`;
}

.p-autocomplete-dropdown:focus-visible {
    box-shadow: `).concat(n("autocomplete.dropdown.focus.ring.shadow"),`;
    outline: `).concat(n("autocomplete.dropdown.focus.ring.width")," ").concat(n("autocomplete.dropdown.focus.ring.style")," ").concat(n("autocomplete.dropdown.focus.ring.color"),`;
    outline-offset: `).concat(n("autocomplete.dropdown.focus.ring.offset"),`;
}

.p-autocomplete .p-autocomplete-overlay {
    min-width: 100%;
}

.p-autocomplete-overlay {
    position: absolute;
    overflow: auto;
    top: 0;
    left: 0;
    background: `).concat(n("autocomplete.overlay.background"),`;
    color: `).concat(n("autocomplete.overlay.color"),`;
    border: 1px solid `).concat(n("autocomplete.overlay.border.color"),`;
    border-radius: `).concat(n("autocomplete.overlay.border.radius"),`;
    box-shadow: `).concat(n("autocomplete.overlay.shadow"),`;
}

.p-autocomplete-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: `).concat(n("autocomplete.list.gap"),`;
    padding: `).concat(n("autocomplete.list.padding"),`;
}

.p-autocomplete-option {
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: `).concat(n("autocomplete.option.padding"),`;
    border: 0 none;
    color: `).concat(n("autocomplete.option.color"),`;
    background: transparent;
    transition: background `).concat(n("autocomplete.transition.duration"),", color ").concat(n("autocomplete.transition.duration"),", border-color ").concat(n("autocomplete.transition.duration"),`;
    border-radius: `).concat(n("autocomplete.option.border.radius"),`;
}

.p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled).p-focus {
    background: `).concat(n("autocomplete.option.focus.background"),`;
    color: `).concat(n("autocomplete.option.focus.color"),`;
}

.p-autocomplete-option-selected {
    background: `).concat(n("autocomplete.option.selected.background"),`;
    color: `).concat(n("autocomplete.option.selected.color"),`;
}

.p-autocomplete-option-selected.p-focus {
    background: `).concat(n("autocomplete.option.selected.focus.background"),`;
    color: `).concat(n("autocomplete.option.selected.focus.color"),`;
}

.p-autocomplete-option-group {
    margin: 0;
    padding: `).concat(n("autocomplete.option.group.padding"),`;
    color: `).concat(n("autocomplete.option.group.color"),`;
    background: `).concat(n("autocomplete.option.group.background"),`;
    font-weight: `).concat(n("autocomplete.option.group.font.weight"),`;
}

.p-autocomplete-input-multiple {
    margin: 0;
    list-style-type: none;
    cursor: text;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: calc(`).concat(n("autocomplete.padding.y")," / 2) ").concat(n("autocomplete.padding.x"),`;
    gap: calc(`).concat(n("autocomplete.padding.y"),` / 2);
    color: `).concat(n("autocomplete.color"),`;
    background: `).concat(n("autocomplete.background"),`;
    border: 1px solid `).concat(n("autocomplete.border.color"),`;
    border-radius: `).concat(n("autocomplete.border.radius"),`;
    width: 100%;
    transition: background `).concat(n("autocomplete.transition.duration"),", color ").concat(n("autocomplete.transition.duration"),", border-color ").concat(n("autocomplete.transition.duration"),", outline-color ").concat(n("autocomplete.transition.duration"),", box-shadow ").concat(n("autocomplete.transition.duration"),`;
    outline-color: transparent;
    box-shadow: `).concat(n("autocomplete.shadow"),`;
}

.p-autocomplete:not(.p-disabled):hover .p-autocomplete-input-multiple {
    border-color: `).concat(n("autocomplete.hover.border.color"),`;
}

.p-autocomplete:not(.p-disabled).p-focus .p-autocomplete-input-multiple {
    border-color: `).concat(n("autocomplete.focus.border.color"),`;
    box-shadow: `).concat(n("autocomplete.focus.ring.shadow"),`;
    outline: `).concat(n("autocomplete.focus.ring.width")," ").concat(n("autocomplete.focus.ring.style")," ").concat(n("autocomplete.focus.ring.color"),`;
    outline-offset: `).concat(n("autocomplete.focus.ring.offset"),`;
}

.p-autocomplete.p-invalid .p-autocomplete-input-multiple {
    border-color: `).concat(n("autocomplete.invalid.border.color"),`;
}

.p-variant-filled.p-autocomplete-input-multiple {
    background: `).concat(n("autocomplete.filled.background"),`;
}

.p-autocomplete:not(.p-disabled).p-focus .p-variant-filled.p-autocomplete-input-multiple  {
    background: `).concat(n("autocomplete.filled.focus.background"),`;
}

.p-autocomplete.p-disabled .p-autocomplete-input-multiple {
    opacity: 1;
    background: `).concat(n("autocomplete.disabled.background"),`;
    color: `).concat(n("autocomplete.disabled.color"),`;
}

.p-autocomplete-chip.p-chip {
    padding-top: calc(`).concat(n("autocomplete.padding.y"),` / 2);
    padding-bottom: calc(`).concat(n("autocomplete.padding.y"),` / 2);
    border-radius: `).concat(n("autocomplete.chip.border.radius"),`;
}

.p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-left: calc(`).concat(n("autocomplete.padding.y"),` / 2);
    padding-right: calc(`).concat(n("autocomplete.padding.y"),` / 2);
}

.p-autocomplete-chip-item.p-focus .p-autocomplete-chip {
    background: `).concat(n("inputchips.chip.focus.background"),`;
    color: `).concat(n("inputchips.chip.focus.color"),`;
}

.p-autocomplete-input-chip {
    flex: 1 1 auto;
    display: inline-flex;
    padding-top: calc(`).concat(n("autocomplete.padding.y"),` / 2);
    padding-bottom: calc(`).concat(n("autocomplete.padding.y"),` / 2);
}

.p-autocomplete-input-chip input {
    border: 0 none;
    outline: 0 none;
    background: transparent;
    margin: 0;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    width: 100%;
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: inherit;
}

.p-autocomplete-input-chip input::placeholder {
    color: `).concat(n("autocomplete.placeholder.color"),`;
}

.p-autocomplete-empty-message {
    padding: `).concat(n("autocomplete.empty.message.padding"),`;
}

.p-autocomplete-fluid {
    display: flex;
}

.p-autocomplete-fluid:has(.p-autocomplete-dropdown) .p-autocomplete-input {
    width: 1%;
}
`)},Fe={root:{position:"relative"}},Ee={root:function(e){var n=e.instance,i=e.props;return["p-autocomplete p-component p-inputwrapper",{"p-disabled":i.disabled,"p-invalid":i.invalid,"p-focus":n.focused,"p-inputwrapper-filled":i.modelValue||I(n.inputValue),"p-inputwrapper-focus":n.focused,"p-autocomplete-open":n.overlayVisible,"p-autocomplete-fluid":n.hasFluid}]},pcInput:"p-autocomplete-input",inputMultiple:function(e){var n=e.props,i=e.instance;return["p-autocomplete-input-multiple",{"p-variant-filled":n.variant?n.variant==="filled":i.$primevue.config.inputStyle==="filled"||i.$primevue.config.inputVariant==="filled"}]},chipItem:function(e){var n=e.instance,i=e.i;return["p-autocomplete-chip-item",{"p-focus":n.focusedMultipleOptionIndex===i}]},pcChip:"p-autocomplete-chip",chipIcon:"p-autocomplete-chip-icon",inputChip:"p-autocomplete-input-chip",loader:"p-autocomplete-loader",dropdown:"p-autocomplete-dropdown",overlay:"p-autocomplete-overlay p-component",list:"p-autocomplete-list",optionGroup:"p-autocomplete-option-group",option:function(e){var n=e.instance,i=e.option,l=e.i,o=e.getItemOptions;return["p-autocomplete-option",{"p-autocomplete-option-selected":n.isSelected(i),"p-focus":n.focusedOptionIndex===n.getOptionIndex(l,o),"p-disabled":n.isOptionDisabled(i)}]},emptyMessage:"p-autocomplete-empty-message"},Be=q.extend({name:"autocomplete",theme:Te,classes:Ee,inlineStyles:Fe}),ze={name:"BaseAutoComplete",extends:W,props:{modelValue:null,suggestions:{type:Array,default:null},optionLabel:null,optionDisabled:null,optionGroupLabel:null,optionGroupChildren:null,scrollHeight:{type:String,default:"14rem"},dropdown:{type:Boolean,default:!1},dropdownMode:{type:String,default:"blank"},multiple:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},variant:{type:String,default:null},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},placeholder:{type:String,default:null},dataKey:{type:String,default:null},minLength:{type:Number,default:1},delay:{type:Number,default:300},appendTo:{type:[String,Object],default:"body"},forceSelection:{type:Boolean,default:!1},completeOnFocus:{type:Boolean,default:!1},inputId:{type:String,default:null},inputStyle:{type:Object,default:null},inputClass:{type:[String,Object],default:null},panelStyle:{type:Object,default:null},panelClass:{type:[String,Object],default:null},overlayStyle:{type:Object,default:null},overlayClass:{type:[String,Object],default:null},dropdownIcon:{type:String,default:null},dropdownClass:{type:[String,Object],default:null},loader:{type:String,default:null},loadingIcon:{type:String,default:null},removeTokenIcon:{type:String,default:null},chipIcon:{type:String,default:null},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!1},selectOnFocus:{type:Boolean,default:!1},focusOnHover:{type:Boolean,default:!0},searchLocale:{type:String,default:void 0},searchMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptySearchMessage:{type:String,default:null},tabindex:{type:Number,default:0},typeahead:{type:Boolean,default:!0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null},fluid:{type:Boolean,default:null}},style:Be,provide:function(){return{$pcAutoComplete:this,$parentInstance:this}}};function P(t){"@babel/helpers - typeof";return P=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(t)}function N(t){return Ge(t)||je(t)||Re(t)||Pe()}function Pe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Re(t,e){if(t){if(typeof t=="string")return R(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?R(t,e):void 0}}function je(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Ge(t){if(Array.isArray(t))return R(t)}function R(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,i=Array(e);n<e;n++)i[n]=t[n];return i}var He={name:"AutoComplete",extends:ze,inheritAttrs:!1,emits:["update:modelValue","change","focus","blur","item-select","item-unselect","option-select","option-unselect","dropdown-click","clear","complete","before-show","before-hide","show","hide"],inject:{$pcFluid:{default:null}},outsideClickListener:null,resizeListener:null,scrollHandler:null,overlay:null,virtualScroller:null,searchTimeout:null,dirty:!1,data:function(){return{id:this.$attrs.id,clicked:!1,focused:!1,focusedOptionIndex:-1,focusedMultipleOptionIndex:-1,overlayVisible:!1,searching:!1}},watch:{"$attrs.id":function(e){this.id=e||j()},suggestions:function(){this.searching&&(this.show(),this.focusedOptionIndex=this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,this.searching=!1),this.autoUpdateModel()}},mounted:function(){this.id=this.id||j(),this.autoUpdateModel()},updated:function(){this.overlayVisible&&this.alignOverlay()},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.overlay&&(F.clear(this.overlay),this.overlay=null)},methods:{getOptionIndex:function(e,n){return this.virtualScrollerDisabled?e:n&&n(e).index},getOptionLabel:function(e){return this.optionLabel?k(e,this.optionLabel):e},getOptionValue:function(e){return e},getOptionRenderKey:function(e,n){return(this.dataKey?k(e,this.dataKey):this.getOptionLabel(e))+"_"+n},getPTOptions:function(e,n,i,l){return this.ptm(l,{context:{selected:this.isSelected(e),focused:this.focusedOptionIndex===this.getOptionIndex(i,n),disabled:this.isOptionDisabled(e)}})},isOptionDisabled:function(e){return this.optionDisabled?k(e,this.optionDisabled):!1},isOptionGroup:function(e){return this.optionGroupLabel&&e.optionGroup&&e.group},getOptionGroupLabel:function(e){return k(e,this.optionGroupLabel)},getOptionGroupChildren:function(e){return k(e,this.optionGroupChildren)},getAriaPosInset:function(e){var n=this;return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter(function(i){return n.isOptionGroup(i)}).length:e)+1},show:function(e){this.$emit("before-show"),this.dirty=!0,this.overlayVisible=!0,this.focusedOptionIndex=this.focusedOptionIndex!==-1?this.focusedOptionIndex:this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,e&&b(this.multiple?this.$refs.focusInput:this.$refs.focusInput.$el)},hide:function(e){var n=this,i=function(){n.$emit("before-hide"),n.dirty=e,n.overlayVisible=!1,n.clicked=!1,n.focusedOptionIndex=-1,e&&b(n.multiple?n.$refs.focusInput:n.$refs.focusInput.$el)};setTimeout(function(){i()},0)},onFocus:function(e){this.disabled||(!this.dirty&&this.completeOnFocus&&this.search(e,e.target.value,"focus"),this.dirty=!0,this.focused=!0,this.overlayVisible&&(this.focusedOptionIndex=this.focusedOptionIndex!==-1?this.focusedOptionIndex:this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,this.scrollInView(this.focusedOptionIndex)),this.$emit("focus",e))},onBlur:function(e){this.dirty=!1,this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",e)},onKeyDown:function(e){if(this.disabled){e.preventDefault();return}switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"Backspace":this.onBackspaceKey(e);break}this.clicked=!1},onInput:function(e){var n=this;if(this.typeahead){this.searchTimeout&&clearTimeout(this.searchTimeout);var i=e.target.value;this.multiple||this.updateModel(e,i),i.length===0?(this.hide(),this.$emit("clear")):i.length>=this.minLength?(this.focusedOptionIndex=-1,this.searchTimeout=setTimeout(function(){n.search(e,i,"input")},this.delay)):this.hide()}},onChange:function(e){var n=this;if(this.forceSelection){var i=!1;if(this.visibleOptions&&!this.multiple){var l=this.multiple?this.$refs.focusInput.value:this.$refs.focusInput.$el.value,o=this.visibleOptions.find(function(g){return n.isOptionMatched(g,l||"")});o!==void 0&&(i=!0,!this.isSelected(o)&&this.onOptionSelect(e,o))}i||(this.multiple?this.$refs.focusInput.value="":this.$refs.focusInput.$el.value="",this.$emit("clear"),!this.multiple&&this.updateModel(e,null))}},onMultipleContainerFocus:function(){this.disabled||(this.focused=!0)},onMultipleContainerBlur:function(){this.focusedMultipleOptionIndex=-1,this.focused=!1},onMultipleContainerKeyDown:function(e){if(this.disabled){e.preventDefault();return}switch(e.code){case"ArrowLeft":this.onArrowLeftKeyOnMultiple(e);break;case"ArrowRight":this.onArrowRightKeyOnMultiple(e);break;case"Backspace":this.onBackspaceKeyOnMultiple(e);break}},onContainerClick:function(e){this.clicked=!0,!(this.disabled||this.searching||this.loading||this.isInputClicked(e)||this.isDropdownClicked(e))&&(!this.overlay||!this.overlay.contains(e.target))&&b(this.multiple?this.$refs.focusInput:this.$refs.focusInput.$el)},onDropdownClick:function(e){var n=void 0;if(this.overlayVisible)this.hide(!0);else{var i=this.multiple?this.$refs.focusInput:this.$refs.focusInput.$el;b(i),n=i.value,this.dropdownMode==="blank"?this.search(e,"","dropdown"):this.dropdownMode==="current"&&this.search(e,n,"dropdown")}this.$emit("dropdown-click",{originalEvent:e,query:n})},onOptionSelect:function(e,n){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,l=this.getOptionValue(n);this.multiple?(this.$refs.focusInput.value="",this.isSelected(n)||this.updateModel(e,[].concat(N(this.modelValue||[]),[l]))):this.updateModel(e,l),this.$emit("item-select",{originalEvent:e,value:n}),this.$emit("option-select",{originalEvent:e,value:n}),i&&this.hide(!0)},onOptionMouseMove:function(e,n){this.focusOnHover&&this.changeFocusedOptionIndex(e,n)},onOverlayClick:function(e){Oe.emit("overlay-click",{originalEvent:e,target:this.$el})},onOverlayKeyDown:function(e){switch(e.code){case"Escape":this.onEscapeKey(e);break}},onArrowDownKey:function(e){if(this.overlayVisible){var n=this.focusedOptionIndex!==-1?this.findNextOptionIndex(this.focusedOptionIndex):this.clicked?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex();this.changeFocusedOptionIndex(e,n),e.preventDefault()}},onArrowUpKey:function(e){if(this.overlayVisible)if(e.altKey)this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{var n=this.focusedOptionIndex!==-1?this.findPrevOptionIndex(this.focusedOptionIndex):this.clicked?this.findLastOptionIndex():this.findLastFocusedOptionIndex();this.changeFocusedOptionIndex(e,n),e.preventDefault()}},onArrowLeftKey:function(e){var n=e.currentTarget;this.focusedOptionIndex=-1,this.multiple&&(G(n.value)&&this.hasSelectedOption?(b(this.$refs.multiContainer),this.focusedMultipleOptionIndex=this.modelValue.length):e.stopPropagation())},onArrowRightKey:function(e){this.focusedOptionIndex=-1,this.multiple&&e.stopPropagation()},onHomeKey:function(e){var n=e.currentTarget,i=n.value.length;n.setSelectionRange(0,e.shiftKey?i:0),this.focusedOptionIndex=-1,e.preventDefault()},onEndKey:function(e){var n=e.currentTarget,i=n.value.length;n.setSelectionRange(e.shiftKey?0:i,i),this.focusedOptionIndex=-1,e.preventDefault()},onPageUpKey:function(e){this.scrollInView(0),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey:function(e){this.typeahead?this.overlayVisible?(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.hide()):(this.focusedOptionIndex=-1,this.onArrowDownKey(e)):this.multiple&&(this.updateModel(e,[].concat(N(this.modelValue||[]),[e.target.value])),this.$refs.focusInput.value="")},onEscapeKey:function(e){this.overlayVisible&&this.hide(!0),e.preventDefault()},onTabKey:function(e){this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide()},onBackspaceKey:function(e){if(this.multiple){if(I(this.modelValue)&&!this.$refs.focusInput.value){var n=this.modelValue[this.modelValue.length-1],i=this.modelValue.slice(0,-1);this.$emit("update:modelValue",i),this.$emit("item-unselect",{originalEvent:e,value:n}),this.$emit("option-unselect",{originalEvent:e,value:n})}e.stopPropagation()}},onArrowLeftKeyOnMultiple:function(){this.focusedMultipleOptionIndex=this.focusedMultipleOptionIndex<1?0:this.focusedMultipleOptionIndex-1},onArrowRightKeyOnMultiple:function(){this.focusedMultipleOptionIndex++,this.focusedMultipleOptionIndex>this.modelValue.length-1&&(this.focusedMultipleOptionIndex=-1,b(this.$refs.focusInput))},onBackspaceKeyOnMultiple:function(e){this.focusedMultipleOptionIndex!==-1&&this.removeOption(e,this.focusedMultipleOptionIndex)},onOverlayEnter:function(e){F.set("overlay",e,this.$primevue.config.zIndex.overlay),le(e,{position:"absolute",top:"0",left:"0"}),this.alignOverlay()},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit("show")},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit("hide"),this.overlay=null},onOverlayAfterLeave:function(e){F.clear(e)},alignOverlay:function(){var e=this.multiple?this.$refs.multiContainer:this.$refs.focusInput.$el;this.appendTo==="self"?ae(this.overlay,e):(this.overlay.style.minWidth=re(e)+"px",se(this.overlay,e))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(n){e.overlayVisible&&e.overlay&&e.isOutsideClicked(n)&&e.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new ce(this.$refs.container,function(){e.overlayVisible&&e.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!ue()&&e.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isOutsideClicked:function(e){return!this.overlay.contains(e.target)&&!this.isInputClicked(e)&&!this.isDropdownClicked(e)},isInputClicked:function(e){return this.multiple?e.target===this.$refs.multiContainer||this.$refs.multiContainer.contains(e.target):e.target===this.$refs.focusInput.$el},isDropdownClicked:function(e){return this.$refs.dropdownButton?e.target===this.$refs.dropdownButton||this.$refs.dropdownButton.contains(e.target):!1},isOptionMatched:function(e,n){var i;return this.isValidOption(e)&&((i=this.getOptionLabel(e))===null||i===void 0?void 0:i.toLocaleLowerCase(this.searchLocale))===n.toLocaleLowerCase(this.searchLocale)},isValidOption:function(e){return I(e)&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption:function(e){return this.isValidOption(e)&&this.isSelected(e)},isEquals:function(e,n){return pe(e,n,this.equalityKey)},isSelected:function(e){var n=this,i=this.getOptionValue(e);return this.multiple?(this.modelValue||[]).some(function(l){return n.isEquals(l,i)}):this.isEquals(this.modelValue,this.getOptionValue(e))},findFirstOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(n){return e.isValidOption(n)})},findLastOptionIndex:function(){var e=this;return H(this.visibleOptions,function(n){return e.isValidOption(n)})},findNextOptionIndex:function(e){var n=this,i=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(l){return n.isValidOption(l)}):-1;return i>-1?i+e+1:e},findPrevOptionIndex:function(e){var n=this,i=e>0?H(this.visibleOptions.slice(0,e),function(l){return n.isValidOption(l)}):-1;return i>-1?i:e},findSelectedOptionIndex:function(){var e=this;return this.hasSelectedOption?this.visibleOptions.findIndex(function(n){return e.isValidSelectedOption(n)}):-1},findFirstFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},search:function(e,n,i){n!=null&&(i==="input"&&n.trim().length===0||(this.searching=!0,this.$emit("complete",{originalEvent:e,query:n})))},removeOption:function(e,n){var i=this,l=this.modelValue[n],o=this.modelValue.filter(function(g,S){return S!==n}).map(function(g){return i.getOptionValue(g)});this.updateModel(e,o),this.$emit("item-unselect",{originalEvent:e,value:l}),this.$emit("option-unselect",{originalEvent:e,value:l}),this.dirty=!0,b(this.multiple?this.$refs.focusInput:this.$refs.focusInput.$el)},changeFocusedOptionIndex:function(e,n){this.focusedOptionIndex!==n&&(this.focusedOptionIndex=n,this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions[n],!1))},scrollInView:function(){var e=this,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1;this.$nextTick(function(){var i=n!==-1?"".concat(e.id,"_").concat(n):e.focusedOptionId,l=de(e.list,'li[id="'.concat(i,'"]'));l?l.scrollIntoView&&l.scrollIntoView({block:"nearest",inline:"start"}):e.virtualScrollerDisabled||e.virtualScroller&&e.virtualScroller.scrollToIndex(n!==-1?n:e.focusedOptionIndex)})},autoUpdateModel:function(){this.selectOnFocus&&this.autoOptionFocus&&!this.hasSelectedOption&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex(),this.onOptionSelect(null,this.visibleOptions[this.focusedOptionIndex],!1))},updateModel:function(e,n){this.$emit("update:modelValue",n),this.$emit("change",{originalEvent:e,value:n})},flatOptions:function(e){var n=this;return(e||[]).reduce(function(i,l,o){i.push({optionGroup:l,group:!0,index:o});var g=n.getOptionGroupChildren(l);return g&&g.forEach(function(S){return i.push(S)}),i},[])},overlayRef:function(e){this.overlay=e},listRef:function(e,n){this.list=e,n&&n(e)},virtualScrollerRef:function(e){this.virtualScroller=e}},computed:{visibleOptions:function(){return this.optionGroupLabel?this.flatOptions(this.suggestions):this.suggestions||[]},inputValue:function(){if(I(this.modelValue))if(P(this.modelValue)==="object"){var e=this.getOptionLabel(this.modelValue);return e??this.modelValue}else return this.modelValue;else return""},hasSelectedOption:function(){return I(this.modelValue)},equalityKey:function(){return this.dataKey},searchResultMessageText:function(){return I(this.visibleOptions)&&this.overlayVisible?this.searchMessageText.replaceAll("{0}",this.visibleOptions.length):this.emptySearchMessageText},searchMessageText:function(){return this.searchMessage||this.$primevue.config.locale.searchMessage||""},emptySearchMessageText:function(){return this.emptySearchMessage||this.$primevue.config.locale.emptySearchMessage||""},selectionMessageText:function(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||""},emptySelectionMessageText:function(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||""},selectedMessageText:function(){return this.hasSelectedOption?this.selectionMessageText.replaceAll("{0}",this.multiple?this.modelValue.length:"1"):this.emptySelectionMessageText},listAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.listLabel:void 0},focusedOptionId:function(){return this.focusedOptionIndex!==-1?"".concat(this.id,"_").concat(this.focusedOptionIndex):null},focusedMultipleOptionId:function(){return this.focusedMultipleOptionIndex!==-1?"".concat(this.id,"_multiple_option_").concat(this.focusedMultipleOptionIndex):null},ariaSetSize:function(){var e=this;return this.visibleOptions.filter(function(n){return!e.isOptionGroup(n)}).length},virtualScrollerDisabled:function(){return!this.virtualScrollerOptions},panelId:function(){return this.id+"_panel"},hasFluid:function(){return G(this.fluid)?!!this.$pcFluid:this.fluid}},components:{InputText:Se,VirtualScroller:ke,Portal:he,ChevronDownIcon:Ie,SpinnerIcon:we,Chip:Q},directives:{ripple:fe}};function x(t){"@babel/helpers - typeof";return x=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(t)}function $(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(l){return Object.getOwnPropertyDescriptor(t,l).enumerable})),n.push.apply(n,i)}return n}function B(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?$(Object(n),!0).forEach(function(i){Ue(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function Ue(t,e,n){return(e=Ne(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Ne(t){var e=$e(t,"string");return x(e)=="symbol"?e:e+""}function $e(t,e){if(x(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(x(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var qe=["aria-activedescendant"],We=["id","aria-label","aria-setsize","aria-posinset"],Qe=["id","placeholder","tabindex","disabled","aria-label","aria-labelledby","aria-expanded","aria-controls","aria-activedescendant","aria-invalid"],Ze=["disabled","aria-expanded","aria-controls"],Je=["id"],Xe=["id","aria-label"],Ye=["id"],_e=["id","aria-label","aria-selected","aria-disabled","aria-setsize","aria-posinset","onClick","onMousemove","data-p-selected","data-p-focus","data-p-disabled"];function et(t,e,n,i,l,o){var g=C("InputText"),S=C("Chip"),Z=C("SpinnerIcon"),J=C("VirtualScroller"),X=C("Portal"),Y=me("ripple");return r(),s("div",a({ref:"container",class:t.cx("root"),style:t.sx("root"),onClick:e[11]||(e[11]=function(){return o.onContainerClick&&o.onContainerClick.apply(o,arguments)})},t.ptmi("root")),[t.multiple?y("",!0):(r(),w(g,{key:0,ref:"focusInput",id:t.inputId,type:"text",class:L([t.cx("pcInput"),t.inputClass]),style:ye(t.inputStyle),value:o.inputValue,placeholder:t.placeholder,tabindex:t.disabled?-1:t.tabindex,fluid:o.hasFluid,disabled:t.disabled,invalid:t.invalid,variant:t.variant,autocomplete:"off",role:"combobox","aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,"aria-haspopup":"listbox","aria-autocomplete":"list","aria-expanded":l.overlayVisible,"aria-controls":o.panelId,"aria-activedescendant":l.focused?o.focusedOptionId:void 0,onFocus:o.onFocus,onBlur:o.onBlur,onKeydown:o.onKeyDown,onInput:o.onInput,onChange:o.onChange,unstyled:t.unstyled,pt:t.ptm("pcInput")},null,8,["id","class","style","value","placeholder","tabindex","fluid","disabled","invalid","variant","aria-label","aria-labelledby","aria-expanded","aria-controls","aria-activedescendant","onFocus","onBlur","onKeydown","onInput","onChange","unstyled","pt"])),t.multiple?(r(),s("ul",a({key:1,ref:"multiContainer",class:t.cx("inputMultiple"),tabindex:"-1",role:"listbox","aria-orientation":"horizontal","aria-activedescendant":l.focused?o.focusedMultipleOptionId:void 0,onFocus:e[5]||(e[5]=function(){return o.onMultipleContainerFocus&&o.onMultipleContainerFocus.apply(o,arguments)}),onBlur:e[6]||(e[6]=function(){return o.onMultipleContainerBlur&&o.onMultipleContainerBlur.apply(o,arguments)}),onKeydown:e[7]||(e[7]=function(){return o.onMultipleContainerKeyDown&&o.onMultipleContainerKeyDown.apply(o,arguments)})},t.ptm("inputMultiple")),[(r(!0),s(E,null,U(t.modelValue,function(p,c){return r(),s("li",a({key:"".concat(c,"_").concat(o.getOptionLabel(p)),id:l.id+"_multiple_option_"+c,class:t.cx("chipItem",{i:c}),role:"option","aria-label":o.getOptionLabel(p),"aria-selected":!0,"aria-setsize":t.modelValue.length,"aria-posinset":c+1,ref_for:!0},t.ptm("chipItem")),[d(t.$slots,"chip",a({class:t.cx("pcChip"),value:p,index:c,removeCallback:function(f){return o.removeOption(f,c)},ref_for:!0},t.ptm("pcChip")),function(){return[D(S,{class:L(t.cx("pcChip")),label:o.getOptionLabel(p),removeIcon:t.chipIcon||t.removeTokenIcon,removable:"",unstyled:t.unstyled,onRemove:function(f){return o.removeOption(f,c)},pt:t.ptm("pcChip")},{removeicon:O(function(){return[d(t.$slots,t.$slots.chipicon?"chipicon":"removetokenicon",{class:L(t.cx("chipIcon")),index:c,removeCallback:function(f){return o.removeOption(f,c)}})]}),_:2},1032,["class","label","removeIcon","unstyled","onRemove","pt"])]})],16,We)}),128)),M("li",a({class:t.cx("inputChip"),role:"option"},t.ptm("inputChip")),[M("input",a({ref:"focusInput",id:t.inputId,type:"text",style:t.inputStyle,class:t.inputClass,placeholder:t.placeholder,tabindex:t.disabled?-1:t.tabindex,disabled:t.disabled,autocomplete:"off",role:"combobox","aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,"aria-haspopup":"listbox","aria-autocomplete":"list","aria-expanded":l.overlayVisible,"aria-controls":l.id+"_list","aria-activedescendant":l.focused?o.focusedOptionId:void 0,"aria-invalid":t.invalid||void 0,onFocus:e[0]||(e[0]=function(){return o.onFocus&&o.onFocus.apply(o,arguments)}),onBlur:e[1]||(e[1]=function(){return o.onBlur&&o.onBlur.apply(o,arguments)}),onKeydown:e[2]||(e[2]=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)}),onInput:e[3]||(e[3]=function(){return o.onInput&&o.onInput.apply(o,arguments)}),onChange:e[4]||(e[4]=function(){return o.onChange&&o.onChange.apply(o,arguments)})},t.ptm("input")),null,16,Qe)],16)],16,qe)):y("",!0),l.searching||t.loading?d(t.$slots,t.$slots.loader?"loader":"loadingicon",{key:2,class:L(t.cx("loader"))},function(){return[t.loader||t.loadingIcon?(r(),s("i",a({key:0,class:["pi-spin",t.cx("loader"),t.loader,t.loadingIcon],"aria-hidden":"true"},t.ptm("loader")),null,16)):(r(),w(Z,a({key:1,class:t.cx("loader"),spin:"","aria-hidden":"true"},t.ptm("loader")),null,16,["class"]))]}):y("",!0),d(t.$slots,t.$slots.dropdown?"dropdown":"dropdownbutton",{toggleCallback:function(c){return o.onDropdownClick(c)}},function(){return[t.dropdown?(r(),s("button",a({key:0,ref:"dropdownButton",type:"button",class:[t.cx("dropdown"),t.dropdownClass],disabled:t.disabled,"aria-haspopup":"listbox","aria-expanded":l.overlayVisible,"aria-controls":o.panelId,onClick:e[8]||(e[8]=function(){return o.onDropdownClick&&o.onDropdownClick.apply(o,arguments)})},t.ptm("dropdown")),[d(t.$slots,"dropdownicon",{class:L(t.dropdownIcon)},function(){return[(r(),w(z(t.dropdownIcon?"span":"ChevronDownIcon"),a({class:t.dropdownIcon},t.ptm("dropdownIcon")),null,16,["class"]))]})],16,Ze)):y("",!0)]}),M("span",a({role:"status","aria-live":"polite",class:"p-hidden-accessible"},t.ptm("hiddenSearchResult"),{"data-p-hidden-accessible":!0}),v(o.searchResultMessageText),17),D(X,{appendTo:t.appendTo},{default:O(function(){return[D(ge,a({name:"p-connected-overlay",onEnter:o.onOverlayEnter,onAfterEnter:o.onOverlayAfterEnter,onLeave:o.onOverlayLeave,onAfterLeave:o.onOverlayAfterLeave},t.ptm("transition")),{default:O(function(){return[l.overlayVisible?(r(),s("div",a({key:0,ref:o.overlayRef,id:o.panelId,class:[t.cx("overlay"),t.panelClass,t.overlayClass],style:B(B(B({},t.panelStyle),t.overlayStyle),{},{"max-height":o.virtualScrollerDisabled?t.scrollHeight:""}),onClick:e[9]||(e[9]=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}),onKeydown:e[10]||(e[10]=function(){return o.onOverlayKeyDown&&o.onOverlayKeyDown.apply(o,arguments)})},t.ptm("overlay")),[d(t.$slots,"header",{value:t.modelValue,suggestions:o.visibleOptions}),D(J,a({ref:o.virtualScrollerRef},t.virtualScrollerOptions,{style:{height:t.scrollHeight},items:o.visibleOptions,tabindex:-1,disabled:o.virtualScrollerDisabled,pt:t.ptm("virtualScroller")}),be({content:O(function(p){var c=p.styleClass,K=p.contentRef,f=p.items,m=p.getItemOptions,_=p.contentStyle,V=p.itemSize;return[M("ul",a({ref:function(h){return o.listRef(h,K)},id:l.id+"_list",class:[t.cx("list"),c],style:_,role:"listbox","aria-label":o.listAriaLabel},t.ptm("list")),[(r(!0),s(E,null,U(f,function(u,h){return r(),s(E,{key:o.getOptionRenderKey(u,o.getOptionIndex(h,m))},[o.isOptionGroup(u)?(r(),s("li",a({key:0,id:l.id+"_"+o.getOptionIndex(h,m),style:{height:V?V+"px":void 0},class:t.cx("optionGroup"),role:"option",ref_for:!0},t.ptm("optionGroup")),[d(t.$slots,"optiongroup",{option:u.optionGroup,index:o.getOptionIndex(h,m)},function(){return[A(v(o.getOptionGroupLabel(u.optionGroup)),1)]})],16,Ye)):ve((r(),s("li",a({key:1,id:l.id+"_"+o.getOptionIndex(h,m),style:{height:V?V+"px":void 0},class:t.cx("option",{option:u,i:h,getItemOptions:m}),role:"option","aria-label":o.getOptionLabel(u),"aria-selected":o.isSelected(u),"aria-disabled":o.isOptionDisabled(u),"aria-setsize":o.ariaSetSize,"aria-posinset":o.getAriaPosInset(o.getOptionIndex(h,m)),onClick:function(T){return o.onOptionSelect(T,u)},onMousemove:function(T){return o.onOptionMouseMove(T,o.getOptionIndex(h,m))},"data-p-selected":o.isSelected(u),"data-p-focus":l.focusedOptionIndex===o.getOptionIndex(h,m),"data-p-disabled":o.isOptionDisabled(u),ref_for:!0},o.getPTOptions(u,m,h,"option")),[d(t.$slots,"option",{option:u,index:o.getOptionIndex(h,m)},function(){return[A(v(o.getOptionLabel(u)),1)]})],16,_e)),[[Y]])],64)}),128)),!f||f&&f.length===0?(r(),s("li",a({key:0,class:t.cx("emptyMessage"),role:"option"},t.ptm("emptyMessage")),[d(t.$slots,"empty",{},function(){return[A(v(o.searchResultMessageText),1)]})],16)):y("",!0)],16,Xe)]}),_:2},[t.$slots.loader?{name:"loader",fn:O(function(p){var c=p.options;return[d(t.$slots,"loader",{options:c})]}),key:"0"}:void 0]),1040,["style","items","disabled","pt"]),d(t.$slots,"footer",{value:t.modelValue,suggestions:o.visibleOptions}),M("span",a({role:"status","aria-live":"polite",class:"p-hidden-accessible"},t.ptm("hiddenSelectedMessage"),{"data-p-hidden-accessible":!0}),v(o.selectedMessageText),17)],16,Je)):y("",!0)]}),_:3},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])],16)}He.render=et;export{st as B,He as s};
