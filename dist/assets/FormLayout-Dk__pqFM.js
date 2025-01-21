import{E as c,P as p,c as r,d as f,Q as y,D as u,M as $,r as d,l as w,i as z,f as e,e as s}from"./index-DeT8qJPO.js";import{s as F}from"./index--2j9WujN.js";import{s as V}from"./index-FsCY37pH.js";import{s as k}from"./index-B9MRs-EQ.js";import"./index-Wequ7aIz.js";import"./index-CPXuqxum.js";import"./index-Shg5-gsl.js";import"./index-lu4dCpup.js";import"./index-B5OyP0Bi.js";var B={root:"p-fluid"},I=c.extend({name:"fluid",classes:B}),S={name:"BaseFluid",extends:p,style:I,provide:function(){return{$pcFluid:this,$parentInstance:this}}},x={name:"Fluid",extends:S,inheritAttrs:!1};function E(a,l,t,n,i,o){return r(),f("div",u({class:a.cx("root")},a.ptmi("root")),[y(a.$slots,"default")],16)}x.render=E;var O=function(l){var t=l.dt;return`
.p-textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: `.concat(t("textarea.color"),`;
    background: `).concat(t("textarea.background"),`;
    padding: `).concat(t("textarea.padding.y")," ").concat(t("textarea.padding.x"),`;
    border: 1px solid `).concat(t("textarea.border.color"),`;
    transition: background `).concat(t("textarea.transition.duration"),", color ").concat(t("textarea.transition.duration"),", border-color ").concat(t("textarea.transition.duration"),", outline-color ").concat(t("textarea.transition.duration"),", box-shadow ").concat(t("textarea.transition.duration"),`;
    appearance: none;
    border-radius: `).concat(t("textarea.border.radius"),`;
    outline-color: transparent;
    box-shadow: `).concat(t("textarea.shadow"),`;
}

.p-textarea:enabled:hover {
    border-color: `).concat(t("textarea.hover.border.color"),`;
}

.p-textarea:enabled:focus {
    border-color: `).concat(t("textarea.focus.border.color"),`;
    box-shadow: `).concat(t("textarea.focus.ring.shadow"),`;
    outline: `).concat(t("textarea.focus.ring.width")," ").concat(t("textarea.focus.ring.style")," ").concat(t("textarea.focus.ring.color"),`;
    outline-offset: `).concat(t("textarea.focus.ring.offset"),`;
}

.p-textarea.p-invalid {
    border-color: `).concat(t("textarea.invalid.border.color"),`;
}

.p-textarea.p-variant-filled {
    background: `).concat(t("textarea.filled.background"),`;
}

.p-textarea.p-variant-filled:enabled:focus {
    background: `).concat(t("textarea.filled.focus.background"),`;
}

.p-textarea:disabled {
    opacity: 1;
    background: `).concat(t("textarea.disabled.background"),`;
    color: `).concat(t("textarea.disabled.color"),`;
}

.p-textarea::placeholder {
    color: `).concat(t("textarea.placeholder.color"),`;
}

.p-textarea-fluid {
    width: 100%;
}

.p-textarea-resizable {
    overflow: hidden;
    resize: none;
}
`)},P={root:function(l){var t=l.instance,n=l.props;return["p-textarea p-component",{"p-filled":t.filled,"p-textarea-resizable ":n.autoResize,"p-invalid":n.invalid,"p-variant-filled":n.variant?n.variant==="filled":t.$primevue.config.inputStyle==="filled"||t.$primevue.config.inputVariant==="filled","p-textarea-fluid":t.hasFluid}]}},T=c.extend({name:"textarea",theme:O,classes:P}),A={name:"BaseTextarea",extends:p,props:{modelValue:null,autoResize:Boolean,invalid:{type:Boolean,default:!1},variant:{type:String,default:null},fluid:{type:Boolean,default:null}},style:T,provide:function(){return{$pcTextarea:this,$parentInstance:this}}},m={name:"Textarea",extends:A,inheritAttrs:!1,emits:["update:modelValue"],inject:{$pcFluid:{default:null}},mounted:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},updated:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},methods:{resize:function(){this.$el.style.height="auto",this.$el.style.height=this.$el.scrollHeight+"px",parseFloat(this.$el.style.height)>=parseFloat(this.$el.style.maxHeight)?(this.$el.style.overflowY="scroll",this.$el.style.height=this.$el.style.maxHeight):this.$el.style.overflow="hidden"},onInput:function(l){this.autoResize&&this.resize(),this.$emit("update:modelValue",l.target.value)}},computed:{filled:function(){return this.modelValue!=null&&this.modelValue.toString().length>0},ptmParams:function(){return{context:{disabled:this.$attrs.disabled||this.$attrs.disabled===""}}},hasFluid:function(){return $(this.fluid)?!!this.$pcFluid:this.fluid}}},H=["value","aria-invalid"];function L(a,l,t,n,i,o){return r(),f("textarea",u({class:a.cx("root"),value:a.modelValue,"aria-invalid":a.invalid||void 0,onInput:l[0]||(l[0]=function(){return o.onInput&&o.onInput.apply(o,arguments)})},a.ptmi("root",o.ptmParams)),null,16,H)}m.render=L;const N={class:"flex flex-col md:flex-row gap-8"},R={class:"md:w-1/2"},U={class:"card flex flex-col gap-4"},j=e("div",{class:"font-semibold text-xl"},"Vertical",-1),C={class:"flex flex-col gap-2"},D=e("label",{for:"name1"},"Name",-1),G={class:"flex flex-col gap-2"},M=e("label",{for:"email1"},"Email",-1),Q={class:"flex flex-col gap-2"},Y=e("label",{for:"age1"},"Age",-1),Z={class:"card flex flex-col gap-4"},q=e("div",{class:"font-semibold text-xl"},"Vertical Grid",-1),J={class:"flex flex-wrap gap-4"},K={class:"flex flex-col grow basis-0 gap-2"},W=e("label",{for:"name2"},"Name",-1),X={class:"flex flex-col grow basis-0 gap-2"},ee=e("label",{for:"email2"},"Email",-1),te={class:"md:w-1/2"},ae={class:"card flex flex-col gap-4"},oe=e("div",{class:"font-semibold text-xl"},"Horizontal",-1),se={class:"grid grid-cols-12 gap-2"},le=e("label",{for:"name3",class:"flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0"},"Name",-1),ne={class:"col-span-12 md:col-span-10"},ie={class:"grid grid-cols-12 gap-2"},re=e("label",{for:"email3",class:"flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0"},"Email",-1),de={class:"col-span-12 md:col-span-10"},ce={class:"card flex flex-col gap-4"},pe=e("div",{class:"font-semibold text-xl"},"Inline",-1),fe={class:"flex flex-wrap items-start gap-4"},ue={class:"field"},xe=e("label",{for:"firstname1",class:"sr-only"},"Firstname",-1),me={class:"field"},he=e("label",{for:"lastname1",class:"sr-only"},"Lastname",-1),_e={class:"card flex flex-col gap-4"},ve=e("div",{class:"font-semibold text-xl"},"Help Text",-1),ge={class:"flex flex-wrap gap-2"},be=e("label",{for:"username"},"Username",-1),ye=e("small",null,"Enter your username to reset your password.",-1),$e={class:"flex mt-8"},we={class:"card flex flex-col gap-4 w-full"},ze=e("div",{class:"font-semibold text-xl"},"Advanced",-1),Fe={class:"flex flex-col md:flex-row gap-4"},Ve={class:"flex flex-wrap gap-2 w-full"},ke=e("label",{for:"firstname2"},"Firstname",-1),Be={class:"flex flex-wrap gap-2 w-full"},Ie=e("label",{for:"lastname2"},"Lastname",-1),Se={class:"flex flex-wrap"},Ee=e("label",{for:"address"},"Address",-1),Oe={class:"flex flex-col md:flex-row gap-4"},Pe={class:"flex flex-wrap gap-2 w-full"},Te=e("label",{for:"state"},"State",-1),Ae={class:"flex flex-wrap gap-2 w-full"},He=e("label",{for:"zip"},"Zip",-1),Qe={__name:"FormLayout",setup(a){const l=d([{name:"Option 1",code:"Option 1"},{name:"Option 2",code:"Option 2"},{name:"Option 3",code:"Option 3"}]),t=d(null);return(n,i)=>{const o=k,h=V,_=m,v=F,g=x;return r(),w(g,null,{default:z(()=>[e("div",N,[e("div",R,[e("div",U,[j,e("div",C,[D,s(o,{id:"name1",type:"text"})]),e("div",G,[M,s(o,{id:"email1",type:"text"})]),e("div",Q,[Y,s(o,{id:"age1",type:"text"})])]),e("div",Z,[q,e("div",J,[e("div",K,[W,s(o,{id:"name2",type:"text"})]),e("div",X,[ee,s(o,{id:"email2",type:"text"})])])])]),e("div",te,[e("div",ae,[oe,e("div",se,[le,e("div",ne,[s(o,{id:"name3",type:"text"})])]),e("div",ie,[re,e("div",de,[s(o,{id:"email3",type:"text"})])])]),e("div",ce,[pe,e("div",fe,[e("div",ue,[xe,s(o,{id:"firstname1",type:"text",placeholder:"Firstname"})]),e("div",me,[he,s(o,{id:"lastname1",type:"text",placeholder:"Lastname"})]),s(h,{label:"Submit",fluid:!1})])]),e("div",_e,[ve,e("div",ge,[be,s(o,{id:"username",type:"text"}),ye])])])]),e("div",$e,[e("div",we,[ze,e("div",Fe,[e("div",Ve,[ke,s(o,{id:"firstname2",type:"text"})]),e("div",Be,[Ie,s(o,{id:"lastname2",type:"text"})])]),e("div",Se,[Ee,s(_,{id:"address",rows:"4"})]),e("div",Oe,[e("div",Pe,[Te,s(v,{id:"state",modelValue:t.value,"onUpdate:modelValue":i[0]||(i[0]=b=>t.value=b),options:l.value,optionLabel:"name",placeholder:"Select One",class:"w-full"},null,8,["modelValue","options"])]),e("div",Ae,[He,s(o,{id:"zip",type:"text"})])])])])]),_:1})}}};export{Qe as default};
