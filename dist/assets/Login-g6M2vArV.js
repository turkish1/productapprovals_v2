import{T}from"./index-f1F2WLqa.js";import{s as E}from"./index-CShloVyL.js";import{s as S}from"./index-DTn3wfMk.js";import{s as $}from"./index-CopbqutW.js";import{s as N}from"./index-CmhA5Hl5.js";import{s as G}from"./index-CrNPW04k.js";import{_ as K}from"./FloatingConfigurator-WVdDt1PP.js";import{_ as R,r,u as H,a as k,w as L,o as q,c as z,b as l,d as t,e as V,f as M,g as U,F as O,h as J,p as Q,i as W}from"./index-w9Dbtzee.js";import{u as X}from"./accountsStore-Do386Vb6.js";import{u as Y}from"./useAxios-Dpe2zGpd.js";import{E as Z}from"./jspdf.es.min-D2pN0J6d.js";import"./index-Bby35NBu.js";import"./index-CgsjByvT.js";import"./index-C1TUBJb7.js";import"./index-Dd_wmtm5.js";const c=d=>(Q("data-v-bd4397c1"),d=d(),W(),d),ee={class:"bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"},se={class:"flex flex-col items-center justify-center"},te={style:{"border-radius":"56px",padding:"0.3rem",background:"linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"}},ae={class:"w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20",style:{"border-radius":"53px"}},oe=c(()=>t("div",{class:"card flex justify-center"},null,-1)),re=c(()=>t("label",{for:"username",class:"block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"},"Username",-1)),le=c(()=>t("label",{for:"password1",class:"block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"},"Password",-1)),ne={class:"flex items-center justify-between mt-2 mb-8 gap-8"},ce={class:"flex items-center"},ie=c(()=>t("label",{for:"rememberme1"},"Remember me",-1)),de=c(()=>t("span",{class:"font-medium no-underline ml-2 text-right cursor-pointer text-primary"},"Forgot password?",-1)),ue=c(()=>t("p",{class:"m-0"},"Try another password Boris",-1)),me={__name:"Login",setup(d){const j=()=>{const e=new Z;e.text("Hello world!",10,10),e.save("sample.pdf")},u=r(""),_=r(""),v=r(!1),b=H(),m=r(!1),x=r([]);let h=k({});const D=r([]);let a=k({dba:"",email:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:""});async function g(){let e="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/getaccounts";const{execute:o,then:s,data:i}=Y(e,{method:"GET"},{immediate:!1});let p=r([]);p.value=o().then(w=>{h=i.value;for(const[y,f]of Object.entries(h))x.value.push(f)})}const C=r("");L(A,()=>{});const{accountUsers:pe,getUser:fe,addUser:I}=X();function A(){x.value.forEach((e,o)=>{for(let s=0;s<e.length;s++)u.value===e[s].password?(D.value.push(e[s]),a.email=e[s].email,a.name=e[s].name,a.dba=e[s].DBA,a.phone=e[s].phone,a.expiration_date=e[s].expiration_date,a.projects=e[s].projects,C.value=e[s].secondary_status,e[s].secondary_status==="A"?a.secondary_status="Active":a.secondary_status="InActive",a.license=e[s].license,I(a),F()):m.value=!0;console.log("UserData",a)})}function B(){b.push("/registration")}const F=()=>{b.push("/dashboard")};return(e,o)=>{const s=K,i=G,p=N,w=$,y=S,f=E,P=T;return q(),z(O,null,[l(s),t("div",ee,[t("div",se,[t("div",null,[l(i,{severity:"contrast",class:"w-2/3",onClick:j},{default:V(()=>[J("Generate PDF")]),_:1})]),t("div",te,[t("div",ae,[oe,t("div",null,[l(i,{class:"block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2",label:"Click to Register",severity:"secondary",raised:"",style:{"margin-left":"150px"},onClick:B}),re,l(p,{id:"username",type:"text",placeholder:"username",class:"w-full md:w-[30rem] mb-8",modelValue:u.value,"onUpdate:modelValue":o[0]||(o[0]=n=>u.value=n)},null,8,["modelValue"]),le,M(l(w,{id:"password1",modelValue:_.value,"onUpdate:modelValue":o[1]||(o[1]=n=>_.value=n),placeholder:"Password",toggleMask:!0,class:"mb-4",onKeyup:U(g,["enter"]),fluid:"",feedback:!1},null,8,["modelValue"]),[[P,"Press Enter after value",void 0,{bottom:!0}]]),t("div",ne,[t("div",ce,[l(y,{modelValue:v.value,"onUpdate:modelValue":o[2]||(o[2]=n=>v.value=n),id:"rememberme1",binary:"",class:"mr-2"},null,8,["modelValue"]),ie]),de]),l(i,{label:"Sign In",severity:"contrast",class:"w-full",onKeyup:U(g,["enter"])})])])])]),l(f,{visible:m.value,"onUpdate:visible":o[3]||(o[3]=n=>m.value=n),maximizable:"",modal:"",header:"Header",style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:V(()=>[ue]),_:1},8,["visible"])])],64)}}},Ae=R(me,[["__scopeId","data-v-bd4397c1"]]);export{Ae as default};