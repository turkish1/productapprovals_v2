import{B as b,U as c,ab as f,L as v,M as y,o as l,c as d,d as s,N as r,z as a,q as B,v as p,V as w,O as u,e as g,P,b as k,f as C,R as $,T as A}from"./index-BQkIan-f.js";import{s as D}from"./index-C3Fv2zss.js";import{s as I}from"./index-CV2PRthc.js";import{s as S}from"./index-2NIKFeJb.js";var L=function(o){var n=o.dt;return`
.p-panel {
    border: 1px solid `.concat(n("panel.border.color"),`;
    border-radius: `).concat(n("panel.border.radius"),`;
    background: `).concat(n("panel.background"),`;
    color: `).concat(n("panel.color"),`;
}

.p-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: `).concat(n("panel.header.padding"),`;
    background: `).concat(n("panel.header.background"),`;
    color: `).concat(n("panel.header.color"),`;
    border-style: solid;
    border-width: `).concat(n("panel.header.border.width"),`;
    border-color: `).concat(n("panel.header.border.color"),`;
    border-radius: `).concat(n("panel.header.border.radius"),`;
}

.p-panel-toggleable .p-panel-header {
    padding: `).concat(n("panel.toggleable.header.padding"),`;
}

.p-panel-title {
    line-height: 1;
    font-weight: `).concat(n("panel.title.font.weight"),`;
}

.p-panel-content {
    padding: `).concat(n("panel.content.padding"),`;
}

.p-panel-footer {
    padding: `).concat(n("panel.footer.padding"),`;
}
`)},T={root:function(o){var n=o.props;return["p-panel p-component",{"p-panel-toggleable":n.toggleable}]},header:"p-panel-header",title:"p-panel-title",headerActions:"p-panel-header-actions",pcToggleButton:"p-panel-toggle-button",contentContainer:"p-panel-content-container",content:"p-panel-content",footer:"p-panel-footer"},K=b.extend({name:"panel",theme:L,classes:T}),N={name:"BasePanel",extends:v,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}}},style:K,provide:function(){return{$pcPanel:this,$parentInstance:this}}},E={name:"Panel",extends:N,inheritAttrs:!1,emits:["update:collapsed","toggle"],data:function(){return{id:this.$attrs.id,d_collapsed:this.collapsed}},watch:{"$attrs.id":function(o){this.id=o||c()},collapsed:function(o){this.d_collapsed=o}},mounted:function(){this.id=this.id||c()},methods:{toggle:function(o){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:o,value:this.d_collapsed})},onKeyDown:function(o){(o.code==="Enter"||o.code==="NumpadEnter"||o.code==="Space")&&(this.toggle(o),o.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header}},components:{PlusIcon:I,MinusIcon:D,Button:S},directives:{ripple:f}},V=["id"],M=["id","aria-labelledby"];function j(e,o,n,q,t,i){var h=y("Button");return l(),d("div",a({class:e.cx("root")},e.ptmi("root")),[s("div",a({class:e.cx("header")},e.ptm("header")),[r(e.$slots,"header",{id:t.id+"_header",class:w(e.cx("title"))},function(){return[e.header?(l(),d("span",a({key:0,id:t.id+"_header",class:e.cx("title")},e.ptm("title")),B(e.header),17,V)):p("",!0)]}),s("div",a({class:e.cx("headerActions")},e.ptm("headerActions")),[r(e.$slots,"icons"),e.toggleable?(l(),u(h,a({key:0,id:t.id+"_header",class:e.cx("pcToggleButton"),"aria-label":i.buttonAriaLabel,"aria-controls":t.id+"_content","aria-expanded":!t.d_collapsed,unstyled:e.unstyled,onClick:i.toggle,onKeydown:i.onKeyDown},e.toggleButtonProps,{pt:e.ptm("pcToggleButton")}),{icon:g(function(m){return[r(e.$slots,e.$slots.toggleicon?"toggleicon":"togglericon",{collapsed:t.d_collapsed},function(){return[(l(),u(P(t.d_collapsed?"PlusIcon":"MinusIcon"),a({class:m.class},e.ptm("pcToggleButton").icon),null,16,["class"]))]})]}),_:3},16,["id","class","aria-label","aria-controls","aria-expanded","unstyled","onClick","onKeydown","pt"])):p("",!0)],16)],16),k(A,a({name:"p-toggleable-content"},e.ptm("transition")),{default:g(function(){return[C(s("div",a({id:t.id+"_content",class:e.cx("contentContainer"),role:"region","aria-labelledby":t.id+"_header"},e.ptm("contentContainer")),[s("div",a({class:e.cx("content")},e.ptm("content")),[r(e.$slots,"default")],16),e.$slots.footer?(l(),d("div",a({key:0,class:e.cx("footer")},e.ptm("footer")),[r(e.$slots,"footer")],16)):p("",!0)],16,M),[[$,!t.d_collapsed]])]}),_:3},16)],16)}E.render=j;export{E as s};
