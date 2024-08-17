import{B as I,a1 as L,G as P,o as m,c as b,b as e,n as V,_ as S,r as u,a as i,w as H,p as T,d as U,W as c,g as N,$ as F,H as R,J as Z,k as A,R as O,S as B,F as E}from"./index-BHrwafCQ.js";import{s as z}from"./index-ODJv3vKo.js";import{s as j}from"./index-DDgLTbu6.js";import{s as G}from"./index-C1GgYi6f.js";import{s as q}from"./index-Cscs0SGG.js";import{s as J}from"./index-BzBC0muh.js";import"./index-D9ruZIza.js";import"./index-BwmcmLO_.js";var W=function(t){var n=t.dt;return`
.p-radiobutton {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: `.concat(n("radiobutton.width"),`;
    height: `).concat(n("radiobutton.height"),`;
}

.p-radiobutton-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: 50%;
}

.p-radiobutton-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid `).concat(n("radiobutton.border.color"),`;
    background: `).concat(n("radiobutton.background"),`;
    width: `).concat(n("radiobutton.width"),`;
    height: `).concat(n("radiobutton.height"),`;
    transition: background `).concat(n("radiobutton.transition.duration"),", color ").concat(n("radiobutton.transition.duration"),", border-color ").concat(n("radiobutton.transition.duration"),", box-shadow ").concat(n("radiobutton.transition.duration"),", outline-color ").concat(n("radiobutton.transition.duration"),`;
    outline-color: transparent;
    box-shadow: `).concat(n("radiobutton.shadow"),`;
}

.p-radiobutton-icon {
    transition-duration: `).concat(n("radiobutton.transition.duration"),`;
    background: transparent;
    font-size: `).concat(n("radiobutton.icon.size"),`;
    width: `).concat(n("radiobutton.icon.size"),`;
    height: `).concat(n("radiobutton.icon.size"),`;
    border-radius: 50%;
    backface-visibility: hidden;
    transform: translateZ(0) scale(0.1);
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.hover.border.color"),`;
}

.p-radiobutton-checked .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.checked.border.color"),`;
    background: `).concat(n("radiobutton.checked.background"),`;
}

.p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(n("radiobutton.icon.checked.color"),`;
    transform: translateZ(0) scale(1, 1);
    visibility: visible;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.checked.hover.border.color"),`;
    background: `).concat(n("radiobutton.checked.hover.background"),`;
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(n("radiobutton.icon.checked.hover.color"),`;
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.focus.border.color"),`;
    box-shadow: `).concat(n("radiobutton.focus.ring.shadow"),`;
    outline: `).concat(n("radiobutton.focus.ring.width")," ").concat(n("radiobutton.focus.ring.style")," ").concat(n("radiobutton.focus.ring.color"),`;
    outline-offset: `).concat(n("radiobutton.focus.ring.offset"),`;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.checked.focus.border.color"),`;
}

.p-radiobutton.p-invalid > .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.invalid.border.color"),`;
}

.p-radiobutton.p-variant-filled .p-radiobutton-box {
    background: `).concat(n("radiobutton.filled.background"),`;
}

.p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
    background: `).concat(n("radiobutton.checked.background"),`;
}

.p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
    background: `).concat(n("radiobutton.checked.hover.background"),`;
}

.p-radiobutton.p-disabled {
    opacity: 1;
}

.p-radiobutton.p-disabled .p-radiobutton-box {
    background: `).concat(n("radiobutton.disabled.background"),`;
    border-color: `).concat(n("radiobutton.checked.disabled.border.color"),`;
}

.p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(n("radiobutton.icon.disabled.color"),`;
}
`)},K={root:function(t){var n=t.instance,l=t.props;return["p-radiobutton p-component",{"p-radiobutton-checked":n.checked,"p-disabled":l.disabled,"p-invalid":l.invalid,"p-variant-filled":l.variant?l.variant==="filled":n.$primevue.config.inputStyle==="filled"||n.$primevue.config.inputVariant==="filled"}]},box:"p-radiobutton-box",input:"p-radiobutton-input",icon:"p-radiobutton-icon"},Q=I.extend({name:"radiobutton",theme:W,classes:K}),X={name:"BaseRadioButton",extends:P,props:{value:null,modelValue:null,binary:Boolean,name:{type:String,default:null},variant:{type:String,default:null},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Q,provide:function(){return{$pcRadioButton:this,$parentInstance:this}}},C={name:"RadioButton",extends:X,inheritAttrs:!1,emits:["update:modelValue","change","focus","blur"],methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(t){if(!this.disabled&&!this.readonly){var n=this.binary?!this.checked:this.value;this.$emit("update:modelValue",n),this.$emit("change",t)}},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){this.$emit("blur",t)}},computed:{checked:function(){return this.modelValue!=null&&(this.binary?!!this.modelValue:L(this.modelValue,this.value))}}},Y=["data-p-checked","data-p-disabled"],ee=["id","value","name","checked","tabindex","disabled","readonly","aria-labelledby","aria-label","aria-invalid"];function oe(o,t,n,l,h,r){return m(),b("div",V({class:o.cx("root")},r.getPTOptions("root"),{"data-p-checked":r.checked,"data-p-disabled":o.disabled}),[e("input",V({id:o.inputId,type:"radio",class:[o.cx("input"),o.inputClass],style:o.inputStyle,value:o.value,name:o.name,checked:r.checked,tabindex:o.tabindex,disabled:o.disabled,readonly:o.readonly,"aria-labelledby":o.ariaLabelledby,"aria-label":o.ariaLabel,"aria-invalid":o.invalid||void 0,onFocus:t[0]||(t[0]=function(){return r.onFocus&&r.onFocus.apply(r,arguments)}),onBlur:t[1]||(t[1]=function(){return r.onBlur&&r.onBlur.apply(r,arguments)}),onChange:t[2]||(t[2]=function(){return r.onChange&&r.onChange.apply(r,arguments)})},r.getPTOptions("input")),null,16,ee),e("div",V({class:o.cx("box")},r.getPTOptions("box")),[e("div",V({class:o.cx("icon")},r.getPTOptions("icon")),null,16)],16)],16,Y)}C.render=oe;const y=o=>(T("data-v-1a088407"),o=o(),U(),o),te={class:"card flex justify-center ."},ne=y(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-8 ..."},[e("p",{class:"text-center text-red-600"},"mEPermit Application")],-1)),ae=y(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[e("p",{class:"text-center text-red-600"},"High Velocity Hurricane Zone (HVHZ)")],-1)),le=y(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[e("p",{class:"text-center text-red-600"},"Tile")],-1)),ie=y(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[e("p",{class:"text-center text-red-600"}," The Tile roof system and its components shall be installed in strict compliance with the HVHZ portions of Chapter 15 FBC, the HVHZ Roof Application Standards (RAS) 111 & 115, and the submitted MDC (NOA) Notice of Acceptance(s) ")],-1)),de=y(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[e("p",{class:"text-center text-red-600"},"The mePermit applicant agrees to comply with these installation requirement when obtaining this roof permit.")],-1)),se={class:"flex justify-end gap-2"},re={__name:"AgreementsDialog",setup(o){const t=u(!0);return(n,l)=>{const h=z,r=J,p=q;return m(),b("div",te,[i(p,{visible:t.value,"onUpdate:visible":l[2]||(l[2]=s=>t.value=s),modal:"",header:"Terms Of Use",style:{width:"70rem"}},{default:H(()=>[ne,i(h),ae,le,ie,de,e("div",se,[i(r,{type:"button",modelValue:n.agreement,"onUpdate:modelValue":l[0]||(l[0]=s=>n.agreement=s),severity:"contrast",label:"I Agree",onClick:l[1]||(l[1]=s=>t.value=!1)},null,8,["modelValue"])])]),_:1},8,["visible"])])}}},$=S(re,[["__scopeId","data-v-1a088407"]]),D=o=>(T("data-v-04a611fa"),o=o(),U(),o),ue={class:"lg:w-full min-h-[10px] flex flex-row gap-18",style:{"margin-left":"10px"}},ce={width:"100%",align:"left"},pe={valign:"middle"},me={style:{margin:"auto","font-size":"large","font-weight":"bold","font-family":"arial"}},be=D(()=>e("td",null,"Zone 1:",-1)),he={ref:"zone1",readonly:"",size:"4",name:"p1",value:""},fe={ref:"lambda1",readonly:"",size:"4",name:"lambda1",value:""},ge={ref:"mg1",readonly:"",size:"4",name:"mg1",value:""},ve={ref:"mr1",readonly:"",size:"4",name:"mr1",value:""},ye={ref:"mf1",readonly:"",size:"4",name:"mf1",value:""},_e=D(()=>e("td",null,"Zone 2:",-1)),xe={ref:"zone2",readonly:"",size:"4",name:"p2",value:""},Ve={ref:"lambda2",readonly:"",size:"4",name:"lambda2",value:""},ke={ref:"mg2",readonly:"",size:"4",name:"mg2",value:""},we={ref:"mr2",readonly:"",size:"4",name:"mr2",value:""},Ae={ref:"mf2",readonly:"",size:"4",name:"mf32",value:""},Se=D(()=>e("td",null,"Zone 3:",-1)),Te={ref:"zone3",readonly:"",size:"4",name:"p3",value:""},Ue={ref:"lambda3",readonly:"",size:"4",name:"lambda3",value:""},De={ref:"mg3",readonly:"",size:"4",name:"mg5",value:""},Ne={ref:"mr3",readonly:"",size:"4",name:"mr3",value:""},Oe={ref:"mf3",readonly:"",size:"4",name:"mf3",value:""},Be={__name:"TileTable",setup(o){return u(null),(t,n)=>(m(),b("div",ue,[e("table",ce,[e("tbody",null,[e("tr",null,[e("td",pe,[e("table",me,[e("tbody",null,[e("tr",null,[be,e("td",null,[e("input",he,null,512),c(" x λ  ")]),e("td",null,[e("input",fe,null,512),c(" - Mg: ")]),e("td",null,[e("input",ge,null,512),c(" = Mr1: ")]),e("td",null,[e("input",ve,null,512),c(" NOA Mf: ")]),e("td",null,[e("input",ye,null,512)])]),e("tr",null,[_e,e("td",null,[e("input",xe,null,512),c(" x λ  ")]),e("td",null,[e("input",Ve,null,512),c(" - Mg: ")]),e("td",null,[e("input",ke,null,512),c(" = Mr2: ")]),e("td",null,[e("input",we,null,512),c(" NOA Mf: ")]),e("td",null,[e("input",Ae,null,512)])]),e("tr",null,[Se,e("td",null,[e("input",Te,null,512),c(" x λ")]),e("td",null,[e("input",Ue,null,512),c(" - Mg: ")]),e("td",null,[e("input",De,null,512),c(" = Mr3: ")]),e("td",null,[e("input",Ne,null,512),c(" NOA Mf: ")]),e("td",null,[e("input",Oe,null,512)])])])])])])])])]))}},ze=S(Be,[["__scopeId","data-v-04a611fa"]]),Ce={components:{AgreementsDialog:$,TileTable1:ze},setup(){const o=u([]),t=u(!1),n=u(""),l=u("Tile");N(()=>{t.value=!0});const h=u(),r=u([{name:"--Select Deck Type--"},{name:'- 5/8" Plywood -'},{name:'- 3/4" Plywood -'},{name:'- 1" x 6" T & G -'},{name:'- 1" x 8" T & G -'},{name:'- Existing 1/2" Plywood -'}]),p=u(),s=u([{selectedBasesheet:"-- Select Tile Capsheet/Underlayment --",key:0},{selectedBasesheet:"Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30",key:1},{selectedBasesheet:"(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F",key:2},{selectedBasesheet:"(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E",key:3}]),_=u(),k=u(),x=u(),w=u(),a=u(""),M=u(""),f=u(""),g=u(""),v=u("");return F(p,()=>{o.value=p.value.key,console.log(o.value),o.value===1?(f.value=!1,g.value=!1,v.value=!1):o.value===2?(f.value=!1,g.value=!1,v.value=!0):o.value===3?(f.value=!0,g.value=!0,v.value=!0):o.value===0&&(f.value=!1,g.value=!1,v.value=!1)}),{onMounted:N,roofType:l,underlaymentNOA:a,exposure:n,saNOA:M,isUDLNOAValid:g,isUDLValid:f,isSAValid:v,save:o,selectedUnderlayment:p,underlaymentType:s,selectedDeck:h,perimeter:w,type:r,slope:_,height:x,area:k}}},d=o=>(T("data-v-42d1200b"),o=o(),U(),o),$e={class:"flex flex-col md:w-3/4 min-h-[420px] gap-6 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px","margin-bottom":"4px"}},Me={class:"columns-2 mt-2"},Ie={class:"w-64 mt-6 ...",style:{"margin-left":"20px"}},Le=d(()=>e("label",{for:"slope"},"Slope",-1)),Pe=d(()=>e("label",{class:"px-2",style:{color:"red"}},"*",-1)),He={class:"w-64 mt-6 ...",style:{"margin-left":"20px"}},Fe=d(()=>e("label",{for:"height"},"Height",-1)),Re=d(()=>e("label",{class:"px-2",style:{color:"red"}},"*",-1)),Ze={class:"w-64 mt-6 ...",style:{"margin-left":"20px"}},Ee=d(()=>e("label",{for:"area"},"Area",-1)),je={class:"w-64 mt-3 ...",style:{"margin-left":"20px"}},Ge=d(()=>e("label",{for:"perimeter"},"Roof Permeter(a) = 4h",-1)),qe={key:0,class:"w-72 gap-2 mt-12 ...",style:{"margin-left":"20px"}},Je=d(()=>e("label",{for:"underlaymentNOA"},"UDL Anchor Sheer NOA Number",-1)),We=d(()=>e("label",{class:"px-1",style:{color:"red"}},"*",-1)),Ke={key:1,class:"w-72 gap-2 mt-14 ...",style:{"margin-left":"20px"}},Qe=d(()=>e("label",{for:"saNOA"},"S/A Tile Capsheet NOA Number",-1)),Xe=d(()=>e("label",{class:"px-1",style:{color:"red"}},"*",-1)),Ye={class:"card md:w-1/2 grid gap-1 grid-cols-1"},eo=d(()=>e("label",{for:"decktype"},"Select a Deck Type",-1)),oo={class:"card md:w-full grid gap-1 grid-cols-1"},to=d(()=>e("label",{for:"underlaymentType"},"Select Underlayment (UDL) and/or Tile Capsheet",-1)),no={class:"card md:w-3/4 min-h-[500px] gap-2 mt-4 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},ao={class:"flex flex-row space-x-8",style:{"margin-left":"10px"}},lo={class:"flex flex-col gap-2"},io=d(()=>e("label",{for:"tilenoa"},"Tile Noa",-1)),so={class:"flex flex-col gap-2"},ro=d(()=>e("label",{for:"manufacturer"},"Tile Manufacturer",-1)),uo={class:"flex flex-col gap-2"},co=d(()=>e("label",{for:"material"},"Tile Material",-1)),po={class:"flex flex-col gap-2"},mo=d(()=>e("label",{for:"description"},"Description",-1)),bo={class:"flex flex-col gap-2"},ho=d(()=>e("label",{for:"systemnumber"},"System Number",-1)),fo={class:"flex space-x-4 md:w-1/4"},go={class:"flex flex-col gap-2"},vo=d(()=>e("label",{for:"manufacturer"},"(UDL) NOA Applicant",-1)),yo={class:"flex flex-col gap-2"},_o=d(()=>e("label",{for:"material"},"(UDL) Material",-1)),xo={class:"flex flex-col gap-2"},Vo=d(()=>e("label",{for:"description"},"(UDL) Description",-1)),ko={class:"flex flex-col gap-2"},wo=d(()=>e("label",{for:"expiredate_sa"},"Expiration Date:",-1)),Ao={class:"flex space-x-4 md:w-1/4"},So={class:"flex flex-col gap-2"},To=d(()=>e("label",{for:"saapplicant"},"S/A Applicant",-1)),Uo={class:"flex flex-col gap-2"},Do=d(()=>e("label",{for:"samaterial"},"S/A Material Type",-1)),No={class:"flex flex-col gap-2"},Oo=d(()=>e("label",{for:"sadescription"},"S/A Description",-1)),Bo={class:"flex flex-col gap-2"},zo=d(()=>e("label",{for:"designpressure"},"Design psf:",-1)),Co={class:"flex flex-col gap-2"},$o=d(()=>e("label",{for:"expiredate_sa"},"Expiration Date:",-1)),Mo={class:"flex flex-wrap gap-4",style:{"margin-left":"300px"}},Io=d(()=>e("label",{style:{"margin-left":"200px"}},"Select Exposure",-1)),Lo={class:"flex items-center"},Po=d(()=>e("label",{for:"exposureC",class:"ml-2"},"C",-1)),Ho={class:"flex items-center"},Fo=d(()=>e("label",{for:"exposureD",class:"ml-2"},"D",-1)),Ro={class:"flex flex-wrap gap-1",style:{"margin-right":"300px"}};function Zo(o,t,n,l,h,r){const p=$,s=G,_=j,k=z,x=C,w=R("TileTable1");return m(),b(E,null,[e("div",$e,[o.isDialog===!0?(m(),Z(p,{key:0})):A("",!0),e("div",Me,[e("div",Ie,[Le,Pe,i(s,{id:"slope",modelValue:l.slope,"onUpdate:modelValue":t[0]||(t[0]=a=>l.slope=a),type:"text",placeholder:"slope",invalid:l.slope===null},null,8,["modelValue","invalid"])]),e("div",He,[Fe,Re,i(s,{id:"height",modelValue:l.height,"onUpdate:modelValue":t[1]||(t[1]=a=>l.height=a),type:"text",placeholder:"height"},null,8,["modelValue"])]),e("div",Ze,[Ee,i(s,{id:"area",modelValue:l.area,"onUpdate:modelValue":t[2]||(t[2]=a=>l.area=a),type:"text",placeholder:"area"},null,8,["modelValue"])]),e("div",je,[Ge,i(s,{id:"perimeter",modelValue:l.perimeter,"onUpdate:modelValue":t[3]||(t[3]=a=>l.perimeter=a),type:"text",placeholder:"perimeter"},null,8,["modelValue"])]),l.isUDLValid?(m(),b("div",qe,[Je,We,i(s,{id:"underlaymentNOA",modelValue:l.underlaymentNOA,"onUpdate:modelValue":t[4]||(t[4]=a=>l.underlaymentNOA=a),type:"text",placeholder:" "},null,8,["modelValue"])])):A("",!0),l.isSAValid?(m(),b("div",Ke,[Qe,Xe,i(s,{id:"saNOA",modelValue:l.saNOA,"onUpdate:modelValue":t[5]||(t[5]=a=>l.saNOA=a),type:"text",placeholder:" "},null,8,["modelValue"])])):A("",!0),e("div",Ye,[eo,i(_,{modelValue:l.selectedDeck,"onUpdate:modelValue":t[6]||(t[6]=a=>l.selectedDeck=a),options:l.type,optionLabel:"name",placeholder:"make selection"},null,8,["modelValue","options"])]),e("div",oo,[to,i(_,{modelValue:l.selectedUnderlayment,"onUpdate:modelValue":t[7]||(t[7]=a=>l.selectedUnderlayment=a),options:l.underlaymentType,optionLabel:"selectedBasesheet",placeholder:"make selection"},null,8,["modelValue","options"])])])]),e("div",no,[e("div",ao,[e("div",lo,[io,i(s,{id:"tilenoa",modelValue:o.tilenoa,"onUpdate:modelValue":t[8]||(t[8]=a=>o.tilenoa=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",so,[ro,i(s,{id:"manufacturer",modelValue:o.manufacturer,"onUpdate:modelValue":t[9]||(t[9]=a=>o.manufacturer=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",uo,[co,i(s,{id:"material",modelValue:o.material,"onUpdate:modelValue":t[10]||(t[10]=a=>o.material=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",po,[mo,i(s,{id:"description",modelValue:o.description,"onUpdate:modelValue":t[11]||(t[11]=a=>o.description=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",bo,[ho,i(s,{id:"systemnumber",modelValue:o.systemnumber,"onUpdate:modelValue":t[12]||(t[12]=a=>o.systemnumber=a),"aria-describedby":"username-help"},null,8,["modelValue"])])]),O(e("div",fo,[e("div",go,[vo,i(s,{id:"manufacturer",modelValue:o.manufacturer,"onUpdate:modelValue":t[13]||(t[13]=a=>o.manufacturer=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",yo,[_o,i(s,{id:"material",modelValue:o.material,"onUpdate:modelValue":t[14]||(t[14]=a=>o.material=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",xo,[Vo,i(s,{id:"description",modelValue:o.description,"onUpdate:modelValue":t[15]||(t[15]=a=>o.description=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",ko,[wo,i(s,{id:"expiredate_sa",modelValue:o.expiredate_sa,"onUpdate:modelValue":t[16]||(t[16]=a=>o.expiredate_sa=a),"aria-describedby":"username-help"},null,8,["modelValue"])])],512),[[B,l.isUDLNOAValid]]),O(e("div",Ao,[e("div",So,[To,i(s,{id:"saapplicant",modelValue:o.saapplicant,"onUpdate:modelValue":t[17]||(t[17]=a=>o.saapplicant=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",Uo,[Do,i(s,{id:"saaterial",modelValue:o.samaterial,"onUpdate:modelValue":t[18]||(t[18]=a=>o.samaterial=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",No,[Oo,i(s,{id:"sadescription",modelValue:o.sadescription,"onUpdate:modelValue":t[19]||(t[19]=a=>o.sadescription=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",Bo,[zo,i(s,{id:"designpressure",modelValue:o.designpressure,"onUpdate:modelValue":t[20]||(t[20]=a=>o.designpressure=a),"aria-describedby":"username-help"},null,8,["modelValue"])]),e("div",Co,[$o,i(s,{id:"expiredate_sa",modelValue:o.expiredate_sa,"onUpdate:modelValue":t[21]||(t[21]=a=>o.expiredate_sa=a),"aria-describedby":"username-help"},null,8,["modelValue"])])],512),[[B,l.isSAValid]]),i(k),e("div",Mo,[Io,e("div",Lo,[i(x,{modelValue:l.exposure,"onUpdate:modelValue":t[22]||(t[22]=a=>l.exposure=a),inputId:"C",name:"exposureC",value:"C"},null,8,["modelValue"]),Po]),e("div",Ho,[i(x,{modelValue:l.exposure,"onUpdate:modelValue":t[23]||(t[23]=a=>l.exposure=a),inputId:"D",name:"exposureD",value:"D"},null,8,["modelValue"]),Fo]),e("div",Ro,[i(w,{style:{"margin-left":"1px"}})])])])],64)}const Xo=S(Ce,[["render",Zo],["__scopeId","data-v-42d1200b"]]);export{Xo as default};
