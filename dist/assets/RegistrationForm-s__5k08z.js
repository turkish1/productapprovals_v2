import{s as H,_ as O}from"./index-DYEjmN6Z.js";import{r as d,a as h,t as C,k as q,s as Q,u as W,o as y,w as z,l as J,m as K,c as S,d as U,f as a,e as n,i as I,n as X,q as Y,v as Z,F as $,p as ee,j as ae,x as oe}from"./index-T8icP3pW.js";import{s as te}from"./index-DkVhOQ32.js";import{u as se,s as le}from"./auth-Dj4Hp_mA.js";import{s as ne}from"./index-BehpAyoj.js";import{s as de}from"./index-D9eHNsJr.js";import{s as ie}from"./index-C50fHmYq.js";import{u as re}from"./accountsStore-Dw2GbVU_.js";import{u as k}from"./useAxios-BtQcNlmB.js";import ce from"./html2canvas.esm-CBrSDip1.js";import{E as me}from"./jspdf.es.min-8CfFjWIP.js";import{_ as pe}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-bynL453S.js";import"./index-BXCOgNLG.js";import"./index-DSuMMUzg.js";import"./index-DOme14GI.js";import"./index-Ctibokb8.js";function fe(){d([]);const i=d([]),o=d("");let x=d([]);const{accountUsers:e,getUser:v,addUser:s}=re();let r=h({license:"",dba:"",name:"",username:"",password:"",secondary_status:"",expiration_date:"",address:"",projects:[],password:"",cphone:"",bphone:"",email:"",date:new Date});const p=d("");let c="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/accounts";const{execute:_,data:b}=k(c,{method:"POST"},{immediate:!1});let f=h({});function g(u){console.log(u),f=u,_({data:u}),o.value="Form submitted successfully!",s(f),console.log(f,"System added")}return{takp:g,noaNum:i,formData:r,error:p,accountUsers:e,getUser:v,addUser:s,accountUsers:e,results:x,responseMessage:o,...C(f)}}const ue=q("cccinput",{state:()=>({cccinput:[],id:0}),actions:{addData(i){this.cccinput.push({cccAccounts:i,completed:!1})}},getters:{cccData:i=>i.cccAccounts}});function _e(){const i=d(""),o=d(""),x=d("");d("");const e=d("");let v="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/contractors";const{execute:s,then:r,data:p}=k(v,{method:"GET"},{immediate:!1}),c=h({});let _=h({license:"",dba:"",name:"",license_status:"",expiration_date:"",address:""});return ue(),s().then(b=>(c.value=p.value,_=c.value,x)),{error:o,responseMessage:i,contractors:c,licenseNumbers:e,cccAccounts:_}}const xe={setup(){let i=h({});const{authStore:o}=se(),{message:x}=Q(o),e=W();let v=d(!1),s=h({license:"",dba:"",name:"",username:"",password:"",secondary_status:"",expiration_date:"",address:"",projects:[],password:"",cphone:"",bphone:"",email:"",date:new Date});const{contractors:r}=_e(),p=d("");y(()=>{i=r,console.log(i)});const c=d(""),{Data:_,takp:b}=fe(),f=async()=>{b(s),s.license="",s.name="",s.secondary_status="",s.dba="",s.username="",s.password="",s.address="",s.cphone="",s.bphone="",s.email="",s.insurance="",s.carrier="",t()};function g(){i.value.forEach(m=>{p.value=s.license.toUpperCase(),p.value===m.alt_license&&(s.dba=m.DBA,s.name=m.name,s.expiration_date=m.expiration_date,s.address=m.address1,s.city=m.city,c.value=m.secondary_status,console.log(m.DBA,s.dba)),u()})}z(u,()=>{});function u(){c.value===""&&(s.secondary_status=""),c.value==="A"&&(s.secondary_status="Active"),c.value==="I"&&(s.secondary_status="Inactive")}const t=()=>{e.push("/")},A=J(),B=d(),M=()=>{B.value.upload()},P=()=>{A.add({severity:"constrast",summary:"Contrast",detail:"File Uploaded",life:3e3})},N=d([{name:"Florida",code:"Florida"},{name:"Georgia",code:"Georgia"}]),F=d([{name:"Miami",code:"Miami"},{name:"Homestead",code:"Homestead"},{name:"Miami Beach",code:"Miami Beach"},{name:"Miami Gardens",code:"Miami Gardens"}]),G=d([{name:"Roofing Contractor",code:"Roofing"},{name:"General Contractor",code:"General"}]),L=d(null),R=d(null),E=d(null);return K(()=>{const m=document.getElementById("shingle");console.log(m),ce(m).then(V=>{const D=V.toDataURL("image/png"),w=new me;w.addImage(D,"PNG",10,10,190,0);const j=w.output("blob");T(j)});const T=async V=>{try{const w=await(await window.showSaveFilePicker({suggestedName:"permitapp.pdf",types:[{description:"PDF file",accept:{"application/pdf":[".pdf"]}}]})).createWritable();await w.write(V),await w.close(),console.log("PDF saved successfully without popping download dialog!")}catch(D){console.error("Error saving file:",D)}}},()=>{console.log("Called Unmounted")}),{formDatas:s,...C(s),disabled:v,navigateNext:t,authStore:o,message:x,checkLicense:g,trade:G,trades:L,onSubmit:f,onUpload:P,onMounted:y,upload:M,dropdownItemCt:F,dropdownItemSt:N,dropdownItemct:E,dropdownItemst:R}}},l=i=>(ee("data-v-22628a4d"),i=i(),ae(),i),ve={class:"card flex flex-col gap-7"},be=l(()=>a("div",{class:"font-semibold text-xl"},"Contractor Information",-1)),he={class:"flex flex-col gap-2"},ge=l(()=>a("label",{for:"lic1"},"State of Florida License No.",-1)),we={class:"flex flex-wrap gap-2"},De=l(()=>a("label",{for:"trade"},"Trade",-1)),Ve={class:"flex flex-col gap-2"},ye=l(()=>a("label",{for:"dba"},"DBA",-1)),Se={class:"flex flex-col gap-2"},Ue=l(()=>a("label",{for:"name"},"Qualifier Name",-1)),Ie={class:"flex flex-col gap-2"},Ce=l(()=>a("label",{for:"secondary_status"},"License Status",-1)),ke={class:"flex flex-col gap-2"},Ae=l(()=>a("label",{for:"license"},"License Expiration Date",-1)),Be={class:"flex flex-col gap-2"},Me=l(()=>a("label",{for:"license"},"Insurance Policy Number",-1)),Pe={class:"flex flex-col gap-2"},Ne=l(()=>a("label",{for:"license"},"Insurance Carrier",-1)),Fe={class:"flex flex-col gap-2"},Ge=l(()=>a("label",{for:"username"},"User Name",-1)),Le={class:"flex flex-col gap-2"},Re=l(()=>a("label",{for:"fname"},"Password",-1)),Ee=l(()=>a("div",{class:"font-semibold text-xm mb-4"},"Pick a password",-1)),Te=l(()=>a("ul",{class:"pl-2 ml-2 my-0 leading-normal"},[a("li",null,"At least one lowercase"),a("li",null,"At least one uppercase"),a("li",null,"At least one numeric"),a("li",null,"Minimum 8 characters")],-1)),je=l(()=>a("div",{class:"font-semibold text-xl"},"Contact Info",-1)),He={class:"flex flex-wrap gap-4"},Oe={class:"flex flex-col grow basis-0 gap-3"},qe=l(()=>a("label",{for:"addr"},"Business Address",-1)),Qe={class:"flex flex-col grow basis-1 gap-3"},We=l(()=>a("label",{for:"state"},"City",-1)),ze={class:"flex flex-wrap gap-2 w-full"},Je=l(()=>a("label",{for:"state"},"State",-1)),Ke={class:"flex flex-col grow basis-0 gap-3"},Xe=l(()=>a("label",{for:"bphone"},"Business Phone",-1)),Ye={class:"flex flex-col grow basis-0 gap-3"},Ze=l(()=>a("label",{for:"cphone"},"Cell Phone Number",-1)),$e={class:"flex flex-col grow basis-0 gap-3"},ea=l(()=>a("label",{for:"email1"},"Email",-1)),aa={class:"card md:w-1/4 flex justify-center flex-wrap gap-4"},oa={class:"card md:w-1/3 flex flex-col gap-2"},ta=l(()=>a("label",{for:"addr"},"Upload Insurance Information",-1)),sa={key:0};function la(i,o,x,e,v,s){const r=ie,p=de,c=ne,_=le,b=H,f=te,g=oe,u=O;return S(),U($,null,[a("form",{class:"container w-1/2",onSubmit:o[16]||(o[16]=X((...t)=>e.onSubmit&&e.onSubmit(...t),["prevent"])),style:{"margin-left":"300px"}},[a("div",ve,[be,a("div",he,[ge,n(r,{type:"text",modelValue:e.formDatas.license,"onUpdate:modelValue":o[0]||(o[0]=t=>e.formDatas.license=t),placeholder:"CRC000000",invalid:e.formDatas.license==="",onInput:e.checkLicense},null,8,["modelValue","invalid","onInput"])]),a("div",we,[De,n(p,{id:"trad",modelValue:e.trades,"onUpdate:modelValue":o[1]||(o[1]=t=>e.trades=t),options:e.trade,optionLabel:"name",placeholder:"Select One",class:"w-full"},null,8,["modelValue","options"])]),a("div",Ve,[ye,n(r,{id:"dba",type:"text",modelValue:e.formDatas.dba,"onUpdate:modelValue":o[2]||(o[2]=t=>e.formDatas.dba=t),placeholder:" ",invalid:e.formDatas.dba===""},null,8,["modelValue","invalid"])]),a("div",Se,[Ue,n(r,{id:"name",type:"text",modelValue:e.formDatas.name,"onUpdate:modelValue":o[3]||(o[3]=t=>e.formDatas.name=t),placeholder:" ",invalid:e.formDatas.name===""},null,8,["modelValue","invalid"])]),a("div",Ie,[Ce,n(r,{id:"secondary_status",type:"text",modelValue:e.formDatas.secondary_status,"onUpdate:modelValue":o[4]||(o[4]=t=>e.formDatas.secondary_status=t),placeholder:" ",invalid:e.formDatas.secondary_status===""},null,8,["modelValue","invalid"])]),a("div",ke,[Ae,n(r,{id:"license",type:"text",modelValue:e.formDatas.expiration_date,"onUpdate:modelValue":o[5]||(o[5]=t=>e.formDatas.expiration_date=t),placeholder:" ",invalid:e.formDatas.expiration_date===""},null,8,["modelValue","invalid"])]),a("div",Be,[Me,n(r,{id:"license",type:"text",modelValue:e.formDatas.insurance,"onUpdate:modelValue":o[6]||(o[6]=t=>e.formDatas.insurance=t),placeholder:" ",invalid:e.formDatas.expiration_date===""},null,8,["modelValue","invalid"])]),a("div",Pe,[Ne,n(r,{id:"license",type:"text",modelValue:e.formDatas.carrier,"onUpdate:modelValue":o[7]||(o[7]=t=>e.formDatas.carrier=t),placeholder:" ",invalid:e.formDatas.expiration_date===""},null,8,["modelValue","invalid"])]),a("div",Fe,[Ge,n(r,{id:"username",type:"text",modelValue:e.formDatas.username,"onUpdate:modelValue":o[8]||(o[8]=t=>e.formDatas.username=t),placeholder:"user name",invalid:e.formDatas.username===""},null,8,["modelValue","invalid"])]),a("div",Le,[Re,n(_,{modelValue:e.formDatas.password,"onUpdate:modelValue":o[9]||(o[9]=t=>e.formDatas.password=t)},{header:I(()=>[Ee]),footer:I(()=>[n(c),Te]),_:1},8,["modelValue"]),je,a("div",He,[a("div",Oe,[qe,n(r,{id:"addr",type:"text",modelValue:e.formDatas.address,"onUpdate:modelValue":o[10]||(o[10]=t=>e.formDatas.address=t),placeholder:"address"},null,8,["modelValue"])]),a("div",Qe,[We,n(r,{id:"city",type:"text",modelValue:e.formDatas.city,"onUpdate:modelValue":o[11]||(o[11]=t=>e.formDatas.city=t),placeholder:"city"},null,8,["modelValue"])]),a("div",ze,[Je,n(p,{id:"state",modelValue:e.dropdownItemst,"onUpdate:modelValue":o[12]||(o[12]=t=>e.dropdownItemst=t),options:e.dropdownItemSt,optionLabel:"name",placeholder:"Select One",class:"w-full"},null,8,["modelValue","options"])]),a("div",Ke,[Xe,n(b,{modelValue:e.formDatas.bphone,"onUpdate:modelValue":o[13]||(o[13]=t=>e.formDatas.bphone=t),mask:"(999) 999-9999",placeholder:"(999) 999-9999",invalid:e.formDatas.bphone===""},null,8,["modelValue","invalid"])]),a("div",Ye,[Ze,n(b,{modelValue:e.formDatas.cphone,"onUpdate:modelValue":o[14]||(o[14]=t=>e.formDatas.cphone=t),mask:"(999) 999-9999",placeholder:"(999) 999-9999",invalid:e.formDatas.cphone===""},null,8,["modelValue","invalid"])]),a("div",$e,[ea,n(r,{id:"email1",modelValue:e.formDatas.email,"onUpdate:modelValue":o[15]||(o[15]=t=>e.formDatas.email=t),type:"text",placeholder:"email",invalid:e.formDatas.email===""},null,8,["modelValue","invalid"])])]),a("div",aa,[n(f,{label:"Submit",severity:"contrast",raised:"",onClick:e.onSubmit,disabled:e.disabled},null,8,["onClick","disabled"])])]),a("div",oa,[ta,n(g),n(u,{class:"w-2/3"})])])],32),i.responseMessage?(S(),U("p",sa,Y(i.responseMessage),1)):Z("",!0)],64)}const ya=pe(xe,[["render",la],["__scopeId","data-v-22628a4d"]]);export{ya as default};