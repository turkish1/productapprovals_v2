import{_ as p}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as n,i as o,e as i,r as s,j as c,B as f,s as d,m as b}from"./index-CtCwtlm_.js";const u={},h={class:"close-btn"},m=o("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 256 256"},[o("path",{fill:"currentColor",d:"M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"})],-1),_=[m];function v(e,l){return t(),n("button",h,_)}const $=p(u,[["render",v]]),x={class:"modal-wrapper shadow-xl"},N={__name:"ModalWindow",setup(e){return i(!1),(l,a)=>(t(),n("div",x,[s(l.$slots,"default"),c($,{onClick:a[0]||(a[0]=r=>l.$emit("closePopup"))})]))}};var w=function(l){var a=l.dt;return`
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
    color: `.concat(a("floatlabel.color"),`;
    transition-duration: `).concat(a("floatlabel.transition.duration"),`;
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
    color: `).concat(a("floatlabel.focus.color"),`;
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
    color: `).concat(a("floatlabel.invalid.color"),`;
}
`)},g={root:"p-floatlabel"},y=f.extend({name:"floatlabel",theme:w,classes:g}),L={name:"BaseFloatLabel",extends:d,props:{},style:y,provide:function(){return{$pcFloatLabel:this,$parentInstance:this}}},B={name:"FloatLabel",extends:L,inheritAttrs:!1};function k(e,l,a,r,F,C){return t(),n("span",b({class:e.cx("root")},e.ptmi("root")),[s(e.$slots,"default")],16)}B.render=k;export{N as _,B as s};
