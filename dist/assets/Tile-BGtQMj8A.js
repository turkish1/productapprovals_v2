import{B as V,ag as _,K as k,o as m,c as b,d as e,y as c,_ as g,r as y,a0 as r,p as w,f as x,b as a,Q as u,R as p,F as S,P as U}from"./index-C6rXEGaK.js";import{s as I}from"./index-B5PM4Gra.js";import{s as $}from"./index-CJ5XZ_OV.js";import{s as C}from"./index-TVQYxk_O.js";import{_ as z}from"./DripEdgeComponent-BcvL8sXe.js";import"./index-4TMI5pES.js";import"./index-C7aQId1r.js";import"./index-BZQ1bzJS.js";import"./useAxios-Dy7Wqj-j.js";import"./index-DDcqoSXM.js";var D=function(n){var o=n.dt;return`
.p-radiobutton {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: `.concat(o("radiobutton.width"),`;
    height: `).concat(o("radiobutton.height"),`;
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
    border: 1px solid `).concat(o("radiobutton.border.color"),`;
    background: `).concat(o("radiobutton.background"),`;
    width: `).concat(o("radiobutton.width"),`;
    height: `).concat(o("radiobutton.height"),`;
    transition: background `).concat(o("radiobutton.transition.duration"),", color ").concat(o("radiobutton.transition.duration"),", border-color ").concat(o("radiobutton.transition.duration"),", box-shadow ").concat(o("radiobutton.transition.duration"),", outline-color ").concat(o("radiobutton.transition.duration"),`;
    outline-color: transparent;
    box-shadow: `).concat(o("radiobutton.shadow"),`;
}

.p-radiobutton-icon {
    transition-duration: `).concat(o("radiobutton.transition.duration"),`;
    background: transparent;
    font-size: `).concat(o("radiobutton.icon.size"),`;
    width: `).concat(o("radiobutton.icon.size"),`;
    height: `).concat(o("radiobutton.icon.size"),`;
    border-radius: 50%;
    backface-visibility: hidden;
    transform: translateZ(0) scale(0.1);
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: `).concat(o("radiobutton.hover.border.color"),`;
}

.p-radiobutton-checked .p-radiobutton-box {
    border-color: `).concat(o("radiobutton.checked.border.color"),`;
    background: `).concat(o("radiobutton.checked.background"),`;
}

.p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(o("radiobutton.icon.checked.color"),`;
    transform: translateZ(0) scale(1, 1);
    visibility: visible;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: `).concat(o("radiobutton.checked.hover.border.color"),`;
    background: `).concat(o("radiobutton.checked.hover.background"),`;
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(o("radiobutton.icon.checked.hover.color"),`;
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: `).concat(o("radiobutton.focus.border.color"),`;
    box-shadow: `).concat(o("radiobutton.focus.ring.shadow"),`;
    outline: `).concat(o("radiobutton.focus.ring.width")," ").concat(o("radiobutton.focus.ring.style")," ").concat(o("radiobutton.focus.ring.color"),`;
    outline-offset: `).concat(o("radiobutton.focus.ring.offset"),`;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: `).concat(o("radiobutton.checked.focus.border.color"),`;
}

.p-radiobutton.p-invalid > .p-radiobutton-box {
    border-color: `).concat(o("radiobutton.invalid.border.color"),`;
}

.p-radiobutton.p-variant-filled .p-radiobutton-box {
    background: `).concat(o("radiobutton.filled.background"),`;
}

.p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
    background: `).concat(o("radiobutton.checked.background"),`;
}

.p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
    background: `).concat(o("radiobutton.checked.hover.background"),`;
}

.p-radiobutton.p-disabled {
    opacity: 1;
}

.p-radiobutton.p-disabled .p-radiobutton-box {
    background: `).concat(o("radiobutton.disabled.background"),`;
    border-color: `).concat(o("radiobutton.checked.disabled.border.color"),`;
}

.p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(o("radiobutton.icon.disabled.color"),`;
}
`)},B={root:function(n){var o=n.instance,s=n.props;return["p-radiobutton p-component",{"p-radiobutton-checked":o.checked,"p-disabled":s.disabled,"p-invalid":s.invalid,"p-variant-filled":s.variant?s.variant==="filled":o.$primevue.config.inputStyle==="filled"||o.$primevue.config.inputVariant==="filled"}]},box:"p-radiobutton-box",input:"p-radiobutton-input",icon:"p-radiobutton-icon"},T=V.extend({name:"radiobutton",theme:D,classes:B}),A={name:"BaseRadioButton",extends:k,props:{value:null,modelValue:null,binary:Boolean,name:{type:String,default:null},variant:{type:String,default:null},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:T,provide:function(){return{$pcRadioButton:this,$parentInstance:this}}},v={name:"RadioButton",extends:A,inheritAttrs:!1,emits:["update:modelValue","change","focus","blur"],methods:{getPTOptions:function(n){var o=n==="root"?this.ptmi:this.ptm;return o(n,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(n){if(!this.disabled&&!this.readonly){var o=this.binary?!this.checked:this.value;this.$emit("update:modelValue",o),this.$emit("change",n)}},onFocus:function(n){this.$emit("focus",n)},onBlur:function(n){this.$emit("blur",n)}},computed:{checked:function(){return this.modelValue!=null&&(this.binary?!!this.modelValue:_(this.modelValue,this.value))}}},O=["data-p-checked","data-p-disabled"],N=["id","value","name","checked","tabindex","disabled","readonly","aria-labelledby","aria-label","aria-invalid"];function L(l,n,o,s,d,i){return m(),b("div",c({class:l.cx("root")},i.getPTOptions("root"),{"data-p-checked":i.checked,"data-p-disabled":l.disabled}),[e("input",c({id:l.inputId,type:"radio",class:[l.cx("input"),l.inputClass],style:l.inputStyle,value:l.value,name:l.name,checked:i.checked,tabindex:l.tabindex,disabled:l.disabled,readonly:l.readonly,"aria-labelledby":l.ariaLabelledby,"aria-label":l.ariaLabel,"aria-invalid":l.invalid||void 0,onFocus:n[0]||(n[0]=function(){return i.onFocus&&i.onFocus.apply(i,arguments)}),onBlur:n[1]||(n[1]=function(){return i.onBlur&&i.onBlur.apply(i,arguments)}),onChange:n[2]||(n[2]=function(){return i.onChange&&i.onChange.apply(i,arguments)})},i.getPTOptions("input")),null,16,N),e("div",c({class:l.cx("box")},i.getPTOptions("box")),[e("div",c({class:l.cx("icon")},i.getPTOptions("icon")),null,16)],16)],16,O)}v.render=L;const f=l=>(w("data-v-04a611fa"),l=l(),x(),l),M={class:"lg:w-full min-h-[10px] flex flex-row gap-18",style:{"margin-left":"10px"}},P={width:"100%",align:"left"},F={valign:"middle"},R={style:{margin:"auto","font-size":"large","font-weight":"bold","font-family":"arial"}},Z=f(()=>e("td",null,"Zone 1:",-1)),E={ref:"zone1",readonly:"",size:"4",name:"p1",value:""},j={ref:"lambda1",readonly:"",size:"4",name:"lambda1",value:""},q={ref:"mg1",readonly:"",size:"4",name:"mg1",value:""},H={ref:"mr1",readonly:"",size:"4",name:"mr1",value:""},K={ref:"mf1",readonly:"",size:"4",name:"mf1",value:""},Q=f(()=>e("td",null,"Zone 2:",-1)),G={ref:"zone2",readonly:"",size:"4",name:"p2",value:""},J={ref:"lambda2",readonly:"",size:"4",name:"lambda2",value:""},W={ref:"mg2",readonly:"",size:"4",name:"mg2",value:""},X={ref:"mr2",readonly:"",size:"4",name:"mr2",value:""},Y={ref:"mf2",readonly:"",size:"4",name:"mf32",value:""},ee=f(()=>e("td",null,"Zone 3:",-1)),oe={ref:"zone3",readonly:"",size:"4",name:"p3",value:""},ne={ref:"lambda3",readonly:"",size:"4",name:"lambda3",value:""},te={ref:"mg3",readonly:"",size:"4",name:"mg5",value:""},le={ref:"mr3",readonly:"",size:"4",name:"mr3",value:""},ae={ref:"mf3",readonly:"",size:"4",name:"mf3",value:""},de={__name:"TileTable",setup(l){return y(null),(n,o)=>(m(),b("div",M,[e("table",P,[e("tbody",null,[e("tr",null,[e("td",F,[e("table",R,[e("tbody",null,[e("tr",null,[Z,e("td",null,[e("input",E,null,512),r(" x λ  ")]),e("td",null,[e("input",j,null,512),r(" - Mg: ")]),e("td",null,[e("input",q,null,512),r(" = Mr1: ")]),e("td",null,[e("input",H,null,512),r(" NOA Mf: ")]),e("td",null,[e("input",K,null,512)])]),e("tr",null,[Q,e("td",null,[e("input",G,null,512),r(" x λ  ")]),e("td",null,[e("input",J,null,512),r(" - Mg: ")]),e("td",null,[e("input",W,null,512),r(" = Mr2: ")]),e("td",null,[e("input",X,null,512),r(" NOA Mf: ")]),e("td",null,[e("input",Y,null,512)])]),e("tr",null,[ee,e("td",null,[e("input",oe,null,512),r(" x λ")]),e("td",null,[e("input",ne,null,512),r(" - Mg: ")]),e("td",null,[e("input",te,null,512),r(" = Mr3: ")]),e("td",null,[e("input",le,null,512),r(" NOA Mf: ")]),e("td",null,[e("input",ae,null,512)])])])])])])])])]))}},ie=g(de,[["__scopeId","data-v-04a611fa"]]),se={class:"flex flex-col w-full gap-2 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},re={class:"w-64 gap-2 mt-3 space-y-2",style:{"margin-left":"20px"}},ue={class:"w-64 mt-6 ...",style:{"margin-left":"20px"}},pe=e("label",{for:"slope"},"Slope",-1),ce=e("label",{class:"px-2",style:{color:"red"}},"*",-1),me={class:"w-64 mt-6 ...",style:{"margin-left":"20px"}},be=e("label",{for:"height"},"Height",-1),fe=e("label",{class:"px-2",style:{color:"red"}},"*",-1),he={class:"w-64 mt-6 ...",style:{"margin-left":"20px"}},ge=e("label",{for:"area"},"Area",-1),ye={class:"w-64 mt-3 ...",style:{"margin-left":"20px"}},ve=e("label",{for:"perimeter"},"Roof Permeter(a) = 4h",-1),Ve={class:"card md:w-full grid gap-1 grid-cols-1"},_e=e("label",{for:"underlaymentType"},"Select Underlayment (UDL) and/or Tile Capsheet",-1),ke={class:"w-96",style:{"margin-left":"2px"}},we={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},xe=e("label",{for:"udlInput"},"Fastened UDL NOA Number",-1),Se={class:"w-96",style:{"margin-left":"2px"}},Ue={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},Ie=e("label",{for:"saInput"},"S/A Membrane NOA Number",-1),$e={class:"w-96",style:{"margin-left":"2px"}},Ce={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},ze=e("label",{for:"shinglenoa"},"Tile Noa",-1),De={class:"card grid gap-2 grid-cols-1"},Be=e("label",{style:{color:"red"}},"Select Underlayment (S/A) *",-1),Te={class:"card grid gap-2 grid-cols-1"},Ae=e("label",{style:{color:"red"}},"Select Underlayment (UDL) *",-1),Oe={class:"card md:w-full gap-4 mt-10 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},Ne={class:"flex flex-row space-x-20 space-y-12",style:{"margin-left":"2px"}},Le={class:"flex flex-row space-x-20"},Me={class:"w-96 flex flex-col gap-2"},Pe=e("label",{for:"manufacturer"},"(UDL) NOA Applicant",-1),Fe={class:"flex flex-col gap-2"},Re=e("label",{for:"material"},"(UDL) Material",-1),Ze={class:"w-128 flex flex-col gap-2"},Ee=e("label",{for:"description"},"(UDL) Description",-1),je={class:"flex flex-row space-x-12 space-y-6",style:{"margin-left":"2px"}},qe={class:"flex flex-row space-x-20"},He={class:"flex flex-col gap-2"},Ke=e("label",{for:"saapplicant"},"S/A Applicant",-1),Qe={class:"flex flex-col gap-2"},Ge=e("label",{for:"samaterial"},"S/A Material Type",-1),Je={class:"flex flex-col gap-2"},We=e("label",{style:{color:"red"}},"Select System F *",-1),Xe={class:"w-128 flex flex-col gap-2"},Ye=e("label",{for:"sadescription"},"S/A Description",-1),eo={class:"flex flex-col gap-2"},oo=e("label",{for:"designpressure"},"Design psf:",-1),no={class:"flex flex-row mt-8 space-x-20",style:{"margin-left":"1px"}},to={class:"flex flex-col gap-2"},lo=e("label",{for:"manufacturer"},"Applicant",-1),ao={class:"flex flex-col gap-2"},io=e("label",{for:"material"}," Material",-1),so={class:"w-128 flex flex-col gap-2"},ro=e("label",{for:"description"},"Description",-1),uo={class:"flex flex-wrap gap-4",style:{"margin-left":"300px"}},po=e("label",{style:{"margin-left":"200px"}},"Select Exposure",-1),co={class:"flex items-center"},mo=e("label",{for:"exposureC",class:"ml-2"},"C",-1),bo={class:"flex items-center"},fo=e("label",{for:"exposureD",class:"ml-2"},"D",-1),ho={class:"flex flex-wrap gap-1",style:{"margin-right":"300px"}},go={__name:"InputTile",setup(l){return(n,o)=>{const s=C,d=$,i=I,h=v;return m(),b(S,null,[e("div",se,[e("div",re,[a(s,{modelValue:n.selectedDeck,"onUpdate:modelValue":o[0]||(o[0]=t=>n.selectedDeck=t),options:n.type,optionLabel:"name",placeholder:"Select a Deck Type",class:"w-full md:w-56"},null,8,["modelValue","options"])]),e("div",ue,[pe,ce,a(d,{id:"slope",modelValue:n.slope,"onUpdate:modelValue":o[1]||(o[1]=t=>n.slope=t),type:"text",placeholder:"slope",invalid:n.slope===null},null,8,["modelValue","invalid"])]),e("div",me,[be,fe,a(d,{id:"height",modelValue:n.height,"onUpdate:modelValue":o[2]||(o[2]=t=>n.height=t),type:"text",placeholder:"height"},null,8,["modelValue"])]),e("div",he,[ge,a(d,{id:"area",modelValue:n.area,"onUpdate:modelValue":o[3]||(o[3]=t=>n.area=t),type:"text",placeholder:"area"},null,8,["modelValue"])]),e("div",ye,[ve,a(d,{id:"perimeter",modelValue:n.perimeter,"onUpdate:modelValue":o[4]||(o[4]=t=>n.perimeter=t),type:"text",placeholder:"perimeter"},null,8,["modelValue"])]),e("div",Ve,[_e,a(s,{modelValue:n.selectedUnderlayment,"onUpdate:modelValue":o[5]||(o[5]=t=>n.selectedUnderlayment=t),options:n.underlaymentType,optionLabel:"selectedBasesheet",placeholder:"make selection"},null,8,["modelValue","options"])]),a(z),u(e("div",ke,[e("div",we,[xe,a(d,{id:"udlInput",modelValue:n.udlInput,"onUpdate:modelValue":o[6]||(o[6]=t=>n.udlInput=t),placeholder:"00000000",onInput:n.grabInput,onChange:n.checkInputPoly},null,8,["modelValue","onInput","onChange"])])],512),[[p,n.isUDLNOAValid]]),u(e("div",Se,[e("div",Ue,[Ie,a(d,{id:"saInput",modelValue:n.saInput,"onUpdate:modelValue":o[7]||(o[7]=t=>n.saInput=t),placeholder:"00000000",onInput:n.grabInput},null,8,["modelValue","onInput"])])],512),[[p,n.isSAValid]]),u(e("div",$e,[e("div",Ce,[ze,a(d,{id:"shinglenoa",modelValue:n.noaInput,"onUpdate:modelValue":o[8]||(o[8]=t=>n.noaInput=t),placeholder:"00000000",onInput:n.grabInput,onChange:n.checkInput},null,8,["modelValue","onInput","onChange"])])],512),[[p,n.isShingleValid]]),u(e("div",De,[Be,a(s,{modelValue:n.selectedSlopehigh,"onUpdate:modelValue":o[9]||(o[9]=t=>n.selectedSlopehigh=t),options:n.slopetypemore,placeholder:"make selection",onChange:n.getIndexs},null,8,["modelValue","options","onChange"])],512),[[p,n.isSelectVisible2]]),u(e("div",Te,[Ae,a(s,{modelValue:n.selectedSlopelow,"onUpdate:modelValue":o[10]||(o[10]=t=>n.selectedSlopelow=t),options:n.slopetypeless,placeholder:"make selection",onChange:n.getIndexs},null,8,["modelValue","options","onChange"])],512),[[p,n.isSelectVisible1]])]),a(i),a(i),e("div",Oe,[e("div",Ne,[u(e("div",Le,[e("div",Me,[Pe,a(d,{id:"manufacturer",modelValue:n.umanufacturer,"onUpdate:modelValue":o[11]||(o[11]=t=>n.umanufacturer=t)},null,8,["modelValue"])]),e("div",Fe,[Re,a(d,{id:"material",modelValue:n.umaterial,"onUpdate:modelValue":o[12]||(o[12]=t=>n.umaterial=t)},null,8,["modelValue"])]),e("div",Ze,[Ee,a(d,{id:"description",modelValue:n.udescription,"onUpdate:modelValue":o[13]||(o[13]=t=>n.udescription=t)},null,8,["modelValue"])])],512),[[p,n.isUDLNOAValid]])]),e("div",je,[u(e("div",qe,[e("div",He,[Ke,a(d,{id:"saapplicant",modelValue:n.samanufacturer,"onUpdate:modelValue":o[14]||(o[14]=t=>n.samanufacturer=t)},null,8,["modelValue"])]),e("div",Qe,[Ge,a(d,{id:"saaterial",modelValue:n.samaterial,"onUpdate:modelValue":o[15]||(o[15]=t=>n.samaterial=t)},null,8,["modelValue"])]),e("div",Je,[We,a(s,{modelValue:n.selectedsystemf,"onUpdate:modelValue":o[16]||(o[16]=t=>n.selectedsystemf=t),options:n.system,placeholder:"",onClick:n.checkInputSystem,onChange:n.updateselectSystem},null,8,["modelValue","options","onClick","onChange"])]),e("div",Xe,[Ye,a(d,{id:"sadescription",modelValue:n.sadescription,"onUpdate:modelValue":o[17]||(o[17]=t=>n.sadescription=t)},null,8,["modelValue"])]),e("div",eo,[oo,a(d,{id:"designpressure",modelValue:n.designpressure,"onUpdate:modelValue":o[18]||(o[18]=t=>n.designpressure=t),"aria-describedby":"username-help"},null,8,["modelValue"])])],512),[[p,n.isSAValid]])]),e("div",no,[e("div",to,[lo,a(d,{id:"manufacturer",modelValue:n.manufacturer,"onUpdate:modelValue":o[19]||(o[19]=t=>n.manufacturer=t)},null,8,["modelValue"])]),e("div",ao,[io,a(d,{id:"material",modelValue:n.material,"onUpdate:modelValue":o[20]||(o[20]=t=>n.material=t)},null,8,["modelValue"])]),e("div",so,[ro,a(d,{id:"description",modelValue:n.description,"onUpdate:modelValue":o[21]||(o[21]=t=>n.description=t)},null,8,["modelValue"])])]),a(i),e("div",uo,[po,e("div",co,[a(h,{modelValue:n.exposure,"onUpdate:modelValue":o[22]||(o[22]=t=>n.exposure=t),inputId:"C",name:"exposureC",value:"C"},null,8,["modelValue"]),mo]),e("div",bo,[a(h,{modelValue:n.exposure,"onUpdate:modelValue":o[23]||(o[23]=t=>n.exposure=t),inputId:"D",name:"exposureD",value:"D"},null,8,["modelValue"]),fo]),e("div",ho,[a(ie,{style:{"margin-left":"1px"}})])])])],64)}}},yo={class:"card w-full space-y-1",style:{"margin-left":"20px"}},vo={__name:"Tile",setup(l){let n=y(null);function o(){console.log(n)}return(s,d)=>(m(),b("div",yo,[a(go,{slopeEntered:U(n),style:{"margin-left":"2px"},onChange:o},null,8,["slopeEntered"])]))}},zo=g(vo,[["__scopeId","data-v-cd459e74"]]);export{zo as default};
