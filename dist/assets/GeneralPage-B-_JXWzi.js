import{s as X}from"./index-DdlkgvTE.js";import{s as Y}from"./index-B02ggSSV.js";import{B as C,A as ee,G as H,o as k,c as B,I as D,n as W,_ as te,s as j,u as oe,r,g as le,b as t,a as n,L as p,a0 as d,w as v,at as ne,W as z,p as ae,d as re}from"./index-PiqeIkyu.js";import{s as pe}from"./index-B3gFczQW.js";import{u as se}from"./permitapp-DbFOSM_c.js";import{u as ue}from"./roofList-D1N7cP8X.js";import{s as m}from"./index-Cz06TIR3.js";import"./index-DSHhLsKL.js";import"./index-zPrrnJtx.js";var de=function(c){var a=c.dt;return`
.p-inputgroup {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.p-inputgroupaddon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: `.concat(a("inputgroup.addon.background"),`;
    color: `).concat(a("inputgroup.addon.color"),`;
    border-top: 1px solid `).concat(a("inputgroup.addon.border.color"),`;
    border-left: 1px solid `).concat(a("inputgroup.addon.border.color"),`;
    border-bottom: 1px solid `).concat(a("inputgroup.addon.border.color"),`;
    padding: 0.5rem 0.75rem;
    min-width: 2.5rem;
}

.p-inputgroup .p-floatlabel {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.p-inputgroup .p-inputtext,
.p-inputgroup-fluid .p-inputtext,
.p-inputgroup .p-inputwrapper,
.p-inputgroup-fluid .p-input {
    flex: 1 1 auto;
    width: 1%;
}

.p-inputgroupaddon:last-child {
    border-right: 1px solid `).concat(a("inputgroup.addon.border.color"),`;
}

.p-inputgroup > .p-component,
.p-inputgroup > .p-inputwrapper > .p-inputtext,
.p-inputgroup > .p-floatlabel > .p-component {
    border-radius: 0;
    margin: 0;
}

.p-inputgroup > .p-component + .p-inputgroupaddon,
.p-inputgroup > .p-inputwrapper > .p-inputtext + .p-inputgroupaddon,
.p-inputgroup > .p-floatlabel > .p-component + .p-inputgroupaddon {
    border-left: 0 none;
}

.p-inputgroup > .p-component:focus,
.p-inputgroup > .p-inputwrapper > .p-inputtext:focus,
.p-inputgroup > .p-floatlabel > .p-component:focus {
    z-index: 1;
}

.p-inputgroup > .p-component:focus ~ label,
.p-inputgroup > .p-inputwrapper > .p-inputtext:focus~label,
.p-inputgroup > .p-floatlabel > .p-component:focus~label {
    z-index: 1;
}

.p-inputgroupaddon:first-child,
.p-inputgroup button:first-child,
.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:first-child,
.p-inputgroup > .p-inputwrapper:first-child > .p-inputtext {
    border-top-left-radius: `).concat(a("inputgroup.addon.border.radius"),`;
    border-bottom-left-radius: `).concat(a("inputgroup.addon.border.radius"),`;
}

.p-inputgroup .p-floatlabel:first-child input {
    border-top-left-radius: `).concat(a("inputgroup.addon.border.radius"),`;
    border-bottom-left-radius: `).concat(a("inputgroup.addon.border.radius"),`;
}

.p-inputgroupaddon:last-child,
.p-inputgroup button:last-child,
.p-inputgroup input:last-child,
.p-inputgroup > .p-inputwrapper:last-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext {
    border-top-right-radius: `).concat(a("inputgroup.addon.border.radius"),`;
    border-bottom-right-radius: `).concat(a("inputgroup.addon.border.radius"),`;
}

.p-inputgroup .p-floatlabel:last-child input {
    border-top-right-radius: `).concat(a("inputgroup.addon.border.radius"),`;
    border-bottom-right-radius: `).concat(a("inputgroup.addon.border.radius"),`;
}

.p-inputgroup-fluid .p-button {
    width: auto;
}

.p-inputgroup-fluid .p-button.p-button-icon-only {
    width: 2.5rem;
}
`)},ie={root:function(c){var a=c.instance;return["p-inputgroup",{"p-inputgroup-fluid":a.hasFluid}]}},ce=C.extend({name:"inputgroup",theme:de,classes:ie}),me={name:"BaseInputGroup",extends:H,props:{fluid:{type:Boolean,default:null}},style:ce,provide:function(){return{$pcInputGroup:this,$parentInstance:this}}},Z={name:"InputGroup",extends:me,inheritAttrs:!1,inject:{$pcFluid:{default:null}},computed:{hasFluid:function(){return ee(this.fluid)?!!this.$pcFluid:this.fluid}}};function fe(s,c,a,G,U,P){return k(),B("div",W({class:s.cx("root")},s.ptmi("root")),[D(s.$slots,"default")],16)}Z.render=fe;var ge={root:"p-inputgroupaddon"},ve=C.extend({name:"inputgroupaddon",classes:ge}),he={name:"BaseInputGroupAddon",extends:H,style:ve,provide:function(){return{$pcInputGroupAddon:this,$parentInstance:this}}},q={name:"InputGroupAddon",extends:he,inheritAttrs:!1};function be(s,c,a,G,U,P){return k(),B("div",W({class:s.cx("root")},s.ptmi("root")),[D(s.$slots,"default")],16)}q.render=be;const u=s=>(ae("data-v-a3f7478f"),s=s(),re(),s),xe={class:"flex flex-col md:flex-row gap-8",style:{"margin-left":"320px"}},_e={class:"md:w-3/4"},Ve={class:"card flex flex-col gap-4"},we={class:"container"},ye={class:"row"},Ie={class:"card flex flex-col gap-4"},Se=ne('<div class="grid grid-cols-1 gap-1 place-content-center h-8 ..." data-v-a3f7478f><p class="text-center font-semibold text-xl" data-v-a3f7478f>2023 HVHZ</p></div><div class="grid grid-cols-1 gap-1 place-content-center h-7 ..." data-v-a3f7478f><p class="text-center italic font-semibold text-xl" data-v-a3f7478f>mEPermit</p></div><div class="grid grid-cols-1 gap-1 place-content-center h-6 ..." data-v-a3f7478f><p class="text-center font-semibold text-xl" data-v-a3f7478f>General Information Page</p></div>',3),Ae={class:"flex flex-wrap gap-4"},Ne={class:"flex flex-col grow basis-0 gap-3"},$e=u(()=>t("label",{for:"master"},"Master Permit",-1)),Ue={class:"flex flex-col grow basis-0 gap-3"},Ge=u(()=>t("label",{for:"process"},"mEProcess Number",-1)),Pe={class:"flex flex-col gap-3"},Te=u(()=>t("label",{for:"contractor"},"Licensed DBA Name ",-1)),ke={class:"flex flex-col grow basis-0 gap-3"},Be=u(()=>t("label",{for:"cphone"},"Phone Number",-1)),Me={class:"flex flex-col grow basis-0 gap-3"},Ee=u(()=>t("label",{for:"email1"},"Email",-1)),Fe={class:"card flex flex-wrap justify-center gap-2"},Le={class:"flex items-center"},Re=u(()=>t("label",{for:"newroof",class:"ml-2"}," New Roof",-1)),je={class:"flex items-center"},ze=u(()=>t("label",{for:"reroof",class:"ml-2"}," Re-Roof",-1)),Ce={class:"card flex flex-wrap justify-center gap-4"},He={class:"flex items-center"},De=u(()=>t("label",{for:"slope1",class:"ml-2"}," Low Slope ",-1)),We={class:"flex items-center"},Ze=u(()=>t("label",{for:"mtile1",class:"ml-2"}," Mechanical Fastened Tile ",-1)),qe={class:"flex items-center"},Je=u(()=>t("label",{for:"adtile1",class:"ml-2"}," Mortar/Adhesive Set Tile ",-1)),Ke=u(()=>t("br",null,null,-1)),Oe=u(()=>t("label",null,null,-1)),Qe={class:"flex items-center"},Xe=u(()=>t("label",{for:"shingle1",class:"ml-2"}," Asphalt Shingle ",-1)),Ye={class:"flex items-center"},et=u(()=>t("label",{for:"metal",class:"ml-2"}," Metal Panel ",-1)),tt=u(()=>t("label",{style:{"margin-left":"350px"}},"Roof Area ",-1)),ot={class:"card flex flex-col md:flex-row gap-4"},lt=u(()=>t("i",{class:"pi pi-angle-down"},null,-1)),nt={class:"card md:w-1/3 flex flex-col gap-4"},at={__name:"GeneralPage",setup(s){const c=se(),{permitapp:a}=j(c),G=ue(),{roofList:U}=j(G),P=oe();let h=r(0),M=r(0),E=r(0),F=r(0);const b=r(0);let f=r(0),L=r(0),R=r(0),x=r(!1),_=r(!1),V=r(!1),w=r(!1),y=r(),I=r(),S=r(),A=r(),N=r();const T=r(!1);console.log(U,a),le(()=>{U.value.forEach((l,o)=>{console.log(l.item,o),l.item==="Low Slope"&&(M.value=l.dim,T.value=!0),l.item==="Asphalt Shingle"&&(F.value=l.dim,V.value=!0),l.item==="Mechanical Fastened Tile"&&(E.value=l.dim,x.value=!0),l.item==="Mortar/Adhesive Set Tile"&&(L.value=l.dim,_.value=!0),l.item==="Mortar/Adhesive Set Tile"&&(R.value=l.dim,w.value=!0)}),a.value.forEach((l,o)=>{y.value=l.formdt.permit,I.value=l.formdt.processNumber,S.value=l.formdt.phone,A.value=l.formdt.email,N.value=l.formdt.contractor}),J()});function J(){let l=Number(M.value),o=Number(F.value),i=Number(E.value),g=Number(L.value),$=Number(R.value);b.value=i+g+$,f.value=l+o,console.log(b.value),h.value=f.value+b.value}const K=()=>{P.push("/roofinputsection")};return(l,o)=>{const i=pe,g=q,$=Z,O=Y,Q=X;return k(),B("div",xe,[t("div",_e,[t("div",Ve,[t("div",we,[t("div",ye,[t("div",Ie,[Se,t("div",Ae,[t("div",Ne,[$e,n(i,{id:"master",modelValue:p(y),"onUpdate:modelValue":o[0]||(o[0]=e=>d(y)?y.value=e:y=e),type:"text",planceholder:"permit number"},null,8,["modelValue"])]),t("div",Ue,[Ge,n(i,{id:"process",modelValue:p(I),"onUpdate:modelValue":o[1]||(o[1]=e=>d(I)?I.value=e:I=e),type:"text",planceholder:"mEProcess"},null,8,["modelValue"])]),t("div",Pe,[Te,n(i,{id:"contractor",modelValue:p(N),"onUpdate:modelValue":o[2]||(o[2]=e=>d(N)?N.value=e:N=e),type:"text"},null,8,["modelValue"])]),t("div",ke,[Be,n(i,{id:"cphone",modelValue:p(S),"onUpdate:modelValue":o[3]||(o[3]=e=>d(S)?S.value=e:S=e),type:"text",planceholder:"Number"},null,8,["modelValue"])]),t("div",Me,[Ee,n(i,{id:"email1",modelValue:p(A),"onUpdate:modelValue":o[4]||(o[4]=e=>d(A)?A.value=e:A=e),type:"text",planceholder:""},null,8,["modelValue"])])])])]),t("div",Fe,[t("div",Le,[n(p(m),{modelValue:l.newroof,"onUpdate:modelValue":o[5]||(o[5]=e=>l.newroof=e),inputId:"newroof",name:"newroof",value:"newroof"},null,8,["modelValue"]),Re]),t("div",je,[n(p(m),{modelValue:l.reroof,"onUpdate:modelValue":o[6]||(o[6]=e=>l.reroof=e),inputId:"reroof",name:"reroof",value:"reroof"},null,8,["modelValue"]),ze])]),t("div",Ce,[t("div",He,[n(p(m),{modelValue:T.value,"onUpdate:modelValue":o[7]||(o[7]=e=>T.value=e),inputId:"slope1",name:"lowslope",value:"Low Slope",severity:"contrast",binary:!0},null,8,["modelValue"]),De]),t("div",We,[n(p(m),{modelValue:p(x),"onUpdate:modelValue":o[8]||(o[8]=e=>d(x)?x.value=e:x=e),inputId:"mtile1",name:"mtile",value:"Mechanical Fastened Tile",severity:"contrast",binary:!0},null,8,["modelValue"]),Ze]),t("div",qe,[n(p(m),{modelValue:p(_),"onUpdate:modelValue":o[9]||(o[9]=e=>d(_)?_.value=e:_=e),inputId:"adtile1",name:"adtile",value:"Mortar/Adhesive Set Tile",severity:"contrast",binary:!0},null,8,["modelValue"]),Je]),Ke,Oe,t("div",Qe,[n(p(m),{modelValue:p(V),"onUpdate:modelValue":o[10]||(o[10]=e=>d(V)?V.value=e:V=e),inputId:"shingle1",name:"shingle",value:"Asphalt Shingle",severity:"contrast",binary:!0},null,8,["modelValue"]),Xe]),t("div",Ye,[n(p(m),{modelValue:p(w),"onUpdate:modelValue":o[11]||(o[11]=e=>d(w)?w.value=e:w=e),inputId:"metal1",name:"metal1",value:"metal panel",severity:"contrast",binary:!0},null,8,["modelValue"]),et])]),tt,t("div",ot,[n($,null,{default:v(()=>[n(g,null,{default:v(()=>[lt]),_:1}),n(i,{modelValue:p(f),"onUpdate:modelValue":o[12]||(o[12]=e=>d(f)?f.value=e:f=e),placeholder:"Low Slope"},null,8,["modelValue"])]),_:1}),n($,null,{default:v(()=>[n(g,null,{default:v(()=>[z("\\")]),_:1}),n(O,{modelValue:b.value,"onUpdate:modelValue":o[13]||(o[13]=e=>b.value=e),placeholder:"Steep Sloped"},null,8,["modelValue"]),n(g)]),_:1}),n($,null,{default:v(()=>[n(g,null,{default:v(()=>[z("Total")]),_:1}),n(i,{modelValue:p(h),"onUpdate:modelValue":o[14]||(o[14]=e=>d(h)?h.value=e:h=e),placeholder:""},null,8,["modelValue"])]),_:1})]),t("div",nt,[n(Q,{type:"submit",label:"Submit",severity:"contrast",raised:"",onClick:K})])])])])])}}},gt=te(at,[["__scopeId","data-v-a3f7478f"]]);export{gt as default};
