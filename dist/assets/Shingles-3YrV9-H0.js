import{_ as te,r as e,c as V,d as N,e as g,i as K,f as l,p as se,j as oe,k as R,a as A,t as G,a7 as j,s as B,o as z,F as J,W as de,q as W,n as Y,w as $e,aa as He,Y as b,ab as Oe,M as Ne,a6 as Ae,g as q,a3 as H,h as re,m as ce}from"./index-DFakVgkr.js";import{u as Ie}from"./roofList-MCHEpGrq.js";import{s as je}from"./index-BYqHq5Sb.js";import{s as Be}from"./index-dzyWIXyS.js";import{s as ue}from"./index-Di-8Fou_.js";import{s as Ke}from"./index-BrJCcpqK.js";import{s as ae}from"./index-koP3y7hN.js";import{s as ze}from"./index-Bghtzc8D.js";import{u as me}from"./useAxios-By7oBXLM.js";import{u as fe,_ as Re}from"./DripEdgeComponent-xhfZV6eL.js";import{s as _e}from"./index-Du49ks9e.js";import"./index-CX-0QwvH.js";import"./index-ITpdSWCU.js";import"./index-DOR5rjJ3.js";const Q=s=>(se("data-v-7c93ecbd"),s=s(),oe(),s),Ge={class:"card flex justify-center"},Ze=Q(()=>l("div",{class:"grid grid-cols-1 gap-2 place-content-center h-8 ..."},[l("p",{class:"text-center text-red-600"},"mEPermit Application")],-1)),We=Q(()=>l("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[l("p",{class:"text-center text-red-600"},"High Velocity Hurricane Zone (HVHZ)")],-1)),Ye=Q(()=>l("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[l("p",{class:"text-center text-red-600"},"Asphalt Shingles")],-1)),Je=Q(()=>l("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[l("p",{class:"text-center text-red-600"}," The Shingle roof system and its components shall be installed in strict compliance with the HVHZ portions of Chapter 15 FBC, the HVHZ Roof Application Standards (RAS) 111 & 115, and the submitted MDC (NOA) Notice of Acceptance(s) ")],-1)),Qe=Q(()=>l("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[l("p",{class:"text-center text-red-600"},"The mePermit applicant agrees to comply with these installation requirement when obtaining this roof permit.")],-1)),Xe={class:"flex justify-end gap-2"},et={__name:"AgreementsDialogShingle",setup(s){const o=e(!0);return e(null),(r,i)=>{const c=ue,u=Be,d=je;return V(),N("div",Ge,[g(d,{visible:o.value,"onUpdate:visible":i[2]||(i[2]=p=>o.value=p),modal:"",header:"Terms Of Use",style:{width:"70rem"}},{default:K(()=>[Ze,g(c),We,Ye,Je,Qe,l("div",Xe,[g(u,{modelValue:r.agreement,"onUpdate:modelValue":i[0]||(i[0]=p=>r.agreement=p),severity:"contrast",label:"I Agree",onClick:i[1]||(i[1]=p=>o.value=!1)},null,8,["modelValue"])])]),_:1},8,["visible"])])}}},tt=te(et,[["__scopeId","data-v-7c93ecbd"]]);function st({min:s=null,max:o=null,required:r=!1}){const i=e(null);return{errorshHeightMessage:i,validateShingleHeight:u=>{console.log(u,typeof u);const d=u;return s!==null&&d<s?(i.value=`Number must be greater than or equal to ${s}`,console.log("min",d,s),!1):o!==null&&d>=s&&d>=o?(i.value=`Number must be less than or equal to ${o}`,console.log("max",d),!1):r&&(u==null||u==="")?(i.value="This field is required",console.log("required"),!1):(i.value=null,!0)}}}function ot({min:s=null,max:o=null,required:r=!1}){const i=e(null);return{errorshingleMessage:i,validateShingleSlope:u=>{console.log(u,typeof u);const d=u;return s!==null&&d<s?(i.value=`Number must be greater than or equal to ${s}`,console.log("min",d,s),!1):o!==null&&d>=s&&d>=o?(i.value=`Number must be less than or equal to ${o}`,console.log("max",d),!1):r&&(u==null||u==="")?(i.value="This field is required",console.log("required"),!1):(i.value=null,!0)}}}const ge=R("polyinput",{state:()=>({polyinput:[],id:0}),actions:{addData(s){this.polyinput.push({polyData:s,completed:!1})},reset(){this.$reset()}}});function ke(){const s=e();e([]);const o=e([]);let r=e([]);const i=ge(),c=e(),u=e("");let d="https://o2cmgq2w4l.execute-api.us-east-1.amazonaws.com/shinglepoly/shinglepoly";const{execute:p,then:y,data:$}=me(d,{method:"GET"},{immediate:!1}),a=A({noa:"",applicant:"",material:"",description:"",expiration_date:""});function f(t){s.value=t,console.log(s.value),c.value=Number(s.value),h()}const h=async()=>{try{const t=await p({params:{noa:c.value}}).then(S=>(o.value=$.value,console.log(o.value),o.value));if(console.log(t),t.length!==0){if(a.applicant=o.value[0].applicant,a.material=o.value[0].material,a.description=o.value[0].description,a.expiration_date=o.value[0].expiration_date,a.length===0)return;i.addData(a),console.log(a,"System added")}}catch(t){console.log("Error, fectching data",t)}return r};return{inp:s,fetchData:h,takp:f,noaNum:o,error:u,results:r,...G(a),store:i}}const he=R("inputshingle",{state:()=>({inputshingle:[],id:0}),actions:{addShingle(s){this.inputshingle.push({shingleData:s,completed:!1})},reset(){this.$reset()}},getters:{shingleData:s=>s.shingleData}});function Me(){const s=e(),o=e([]);let r=e([]);const i=he(),c=e(),u=e("");let d="https://45ocd2dvi7.execute-api.us-east-1.amazonaws.com/shinglenoa/shinglenoa";const{execute:p,then:y,data:$}=me(d,{method:"GET"},{immediate:!1}),a=A({noa:"",applicant:"",material:"",description:"",expiration_date:""});function f(t){s.value=t,c.value=Number(s.value),h()}const h=async()=>{try{const t=await p({params:{noa:c.value}}).then(S=>(o.value=$.value,o.value));console.log(t.length),t.length===0||(console.log(o.value),a.applicant=o.value[0].applicant,a.material=o.value[0].material,a.description=o.value[0].description,a.expiration_date=o.value[0].expiration_date,i.addShingle(a),console.log(a,"System added"))}catch(t){console.log("Error, fectching data",t)}return r};return{input:s,fetchData:h,takeValue:f,noaNum:o,error:u,results:r,...G(a),store:i}}const Ue=R("systeminput",{state:()=>({systeminput:[],id:0}),actions:{addData(s){this.systeminput.push({systemData:s,completed:!1}),console.log(s,this.systeminput)},reset(){this.$reset()}},getters:{sysData:s=>s.systemData}});function pe(){const s=e();e([]);const o=e([]);let r=e([]);const i=Ue(),c=e(),u=e("");let d="https://3z97hfdsmb.execute-api.us-east-1.amazonaws.com/sbsapi/sbsapi";const{execute:p,then:y,data:$}=me(d,{method:"GET"},{immediate:!1}),a=A({noa:"",manufacturer:"",material:"",system:[],description:"",expiration_date:"",Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",Description_F8:"",Description_F9:"",Description_F10:"",Description_F11:"",arraySystem:[],maps:[],systemCheck:[]});e([]);function f(t){s.value=t,c.value=Number(s.value),h()}const h=async()=>{try{if((await p({params:{NOA:c.value}}).then(S=>(o.value=$.value,o.value))).length!==0){if(a.manufacturer=o.value[0].Manufacturer,a.material=o.value[0].Material,a.Description_F1=o.value[0].Description_F1,a.Description_F2=o.value[0].Description_F2,a.Description_F3=o.value[0].Description_F3,a.Description_F4=o.value[0].Description_F4,a.Description_F5=o.value[0].Description_F5,a.Description_F6=o.value[0].Description_F6,a.Description_F7=o.value[0].Description_F7,a.Description_F8=o.value[0].Description_F8,a.Description_F9=o.value[0].Description_F9,a.Description_F10=o.value[0].Description_F10,a.Description_F11=o.value[0].Description_F11,a.system=o.value[0].System,a.systemCheck=o.value[0].System,a.systemCheck.length>=2){a.maps=o.value[0].Maps;for(const[S]of Object.entries(a.maps))a.arraySystem.push(`${S}`),console.log(`${S}`)}else a.system=o.value[0].System,a.description=o.value[0].Description;i.addData(a),console.log(a,"System added")}}catch(t){console.log("Error, fectching data",t)}return r};return{inputsystem:s,fetchData:h,takef:f,noaNum:o,error:u,results:r,...G(a),store:i}}function at(s){const o=e(!1),r=e(!1),i=e(!1),c=e([]),u=e([]),d=e(s),p=e(),y=e(!1),$=A({slope_less_4:[" -- Select Underlayment -- ",'2 Plies ASTM # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c','2 Plies Polypropylene with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c',"(S/A) membrane adhered directly to a wood deck, per the NOA system F"],slope_more_4:["  -- Select Underlayment/Basesheet -- ",'1 Ply ASTM # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c','1 Ply Polypropylene with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c',"(S/A) membrane adhered directly to a wood deck, per the NOA system F"]});function a(){d.value?(p.value=Number(d.value),p.value>4&&p.value<=12&&(isSlopeValid.value=!0,y.value=!0,i.value=!0,r.value=!1),p.value>=2&&p.value<=4&&(console.log("Entered on 3: ",p.value,r.value),isSlopeValid.value=!0,o.value=!0,r.value=!0,i.value=!1),p.value<2&&(isSlopeValid.value=!1)):console.log("Not Mounted")}return{slopes:d,validateSlope:a,slopetypemore:u,slopetypeless:c,slopeNumber:p,slopeCondition:$,isSlopeLessFour:o,isSlopeMoreFour:y,isSelectVisible1:r,isSelectVisible2:i}}const lt=R("noashingle",{state:()=>({noashingle:[],id:0}),actions:{addShingle(s){this.noashingle.push({shingleNoaNumber:s,completed:!1})},reset(){this.$reset()}},getters:{shingleNoaNumber:s=>s.shingleNoaNumber}});function nt(){const s=e();e([]);let o=e([]);const r=lt(),i=e(""),c=A({noa:[]});function u(){y()}const d=j(()=>"https://i88176qin0.execute-api.us-east-1.amazonaws.com/getshinglenoa/getshinglenoa"),{data:p}=fe(d).get().json(),y=async()=>{c.noa=p,r.addShingle(c),console.log(c,"System added")};return{input:s,fetchData:y,callFunction:u,errors:i,results:o,...G(c),noaStore:r}}const it=s=>(se("data-v-8aeb27dd"),s=s(),oe(),s),rt={class:"autocomplete"},ct={class:"w-64 gap-2 mt-3 space-y-2 mb-2",style:{"margin-left":"20px"}},ut=it(()=>l("label",{for:"ac"},"Shingle NOA: 00000000",-1)),pt={key:0,class:"suggestions"},dt=["onMousedown"],mt={__name:"AutoComplete",props:{manufacturer:String,material:String,description:String},emits:["update"],setup(s,{emit:o}){const r=s,i=o,c=e(r.manufacturer,r.material,r.description),{callFunction:u,noaStore:d}=nt(),p=he(),{inputshingle:y}=B(p),{input:$,takeValue:a}=Me();let f=e();const h=e(""),t=A({manufacturer:"",material:"",description:""}),S=e([]),I=e(!1);z(()=>{u(),S.value=d.$state.noashingle});const E=j(()=>h.value?S.value[0].shingleNoaNumber.noa.filter(F=>F.toString().includes(h.value)):[]);let k=e(y._object.inputshingle);function U(){f.value=h.value,h.value!==null&&(a(f.value),C())}function C(){k.value.length!==null&&k.value.forEach((F,D)=>{console.log(F.shingleData,D),t.manufacturer=F.shingleData.applicant,t.material=F.shingleData.material,t.description=F.shingleData.description}),P()}const P=()=>{i("updated",c.value)},_=F=>{h.value=F,I.value=!1},x=()=>{I.value=!0},w=()=>{setTimeout(()=>{I.value=!1},200)};return(F,D)=>{const O=ae,Z=_e;return V(),N("div",rt,[l("div",ct,[g(Z,null,{default:K(()=>[g(O,{id:"shinglenoa",modelValue:h.value,"onUpdate:modelValue":D[0]||(D[0]=T=>h.value=T),inputId:"ac",onFocus:D[1]||(D[1]=T=>I.value=!0),onBlur:w,onInput:x,onChange:U},null,8,["modelValue"]),ut]),_:1})]),I.value&&E.value.length?(V(),N("ul",pt,[(V(!0),N(J,null,de(E.value,(T,L)=>(V(),N("li",{key:L,onMousedown:le=>_(T)},Y(T),41,dt))),128))])):W("",!0)])}}},ft=te(mt,[["__scopeId","data-v-8aeb27dd"]]),_t=R("noapoly",{state:()=>({noapoly:[],id:0}),actions:{addData(s){this.noapoly.push({polyNoaNumber:s,completed:!1})},reset(){this.$reset()}},getters:{polyNoaNumber:s=>s.polyNoaNumber}});function gt(){const s=e();e([]);let o=e([]);const r=_t(),i=e(""),c=A({noa:[]});function u(){y()}const d=j(()=>"https://s0fcmqq38a.execute-api.us-east-1.amazonaws.com/polynoaNumber/polynoaNumber"),{data:p}=fe(d).get().json(),y=async()=>{c.noa=p,console.log(c.noa),r.addData(c),console.log(c,"System added")};return{input:s,fetchData:y,callFunction:u,errors:i,results:o,...G(c),polyStores:r}}const ht=s=>(se("data-v-5b083b97"),s=s(),oe(),s),vt={class:"autocomplete"},yt={class:"w-64 gap-2 mt-3 space-y-2 mb-2",style:{"margin-left":"20px"}},Dt=ht(()=>l("label",{for:"ac"},"Fastened UDL NOA: 00000000",-1)),Ft={key:0,class:"suggestions"},St=["onMousedown"],xt={__name:"AutoCompletePoly",props:{manufacturer:String,material:String,description:String},emits:["update"],setup(s,{emit:o}){const r=s,{inp:i,takp:c}=ke();e(r.manufacturer,r.material,r.description);const{callFunction:u,polyStores:d}=gt(),p=ge(),{polyinput:y}=B(p);let $=e();const a=e(""),f=A({umanufacturer:"",umaterial:"",udescription:""}),h=e([]),t=e(!1);z(()=>{u(),h.value=d.$state});const S=j(()=>a.value?h.value.noapoly[0].polyNoaNumber.noa.filter(_=>_.toString().includes(a.value)):[]);let I=e(y._object.polyinput);function E(){$.value=a.value,a.value!==null&&c($.value),k()}function k(){I.value.length!==null&&I.value.forEach((_,x)=>{f.umanufacturer=_.polyData.applicant,f.umaterial=_.polyData.material,f.udescription=_.polyData.description})}const U=_=>{a.value=_,t.value=!1},C=()=>{t.value=!0},P=()=>{setTimeout(()=>{t.value=!1},200)};return(_,x)=>{const w=ae,F=_e;return V(),N("div",vt,[l("div",yt,[g(F,null,{default:K(()=>[g(w,{id:"udlInput",inputId:"ac",modelValue:a.value,"onUpdate:modelValue":x[0]||(x[0]=D=>a.value=D),onChange:E,onFocus:x[1]||(x[1]=D=>t.value=!0),onBlur:P,onInput:C},null,8,["modelValue"]),Dt]),_:1})]),t.value&&S.value.length?(V(),N("ul",Ft,[(V(!0),N(J,null,de(S.value,(D,O)=>(V(),N("li",{key:O,onMousedown:Z=>U(D)},Y(D),41,St))),128))])):W("",!0)])}}},bt=te(xt,[["__scopeId","data-v-5b083b97"]]),wt=R("noasa",{state:()=>({noasa:[],id:0}),actions:{addData(s){this.noasa.push({saNoaNumber:s,completed:!1})},reset(){this.$reset()}},getters:{saNoaNumber:s=>s.saNoaNumber}});function Vt(){const s=e();e([]);let o=e([]);const r=wt(),i=e(""),c=A({noa:[]});function u(){y()}const d=j(()=>"https://y44vai1808.execute-api.us-east-1.amazonaws.com/saNoaNumber/sanoaNumber"),{data:p}=fe(d).get().json(),y=async()=>{c.noa=p,r.addData(c),console.log(c,"System added")};return{input:s,fetchData:y,callFunction:u,errors:i,results:o,...G(c),saStore:r}}const $t=s=>(se("data-v-d8d46f31"),s=s(),oe(),s),Nt={class:"autocomplete"},At={class:"w-64 gap-2 mt-3 space-y-2 mb-2",style:{"margin-left":"20px"}},It=$t(()=>l("label",{for:"ac"},"S/A Membrane NOA: 00000000",-1)),kt={key:0,class:"suggestions"},Mt=["onMousedown"],Ut={__name:"AutoCompleteSA",props:{manufacturer:String,material:String,description:String},emits:["update"],setup(s,{emit:o}){const r=s;e(r.manufacturer,r.material,r.description);const{callFunction:i,saStore:c}=Vt(),u=Ue(),{input:d,takef:p}=pe();let y=e(),$=e();const a=e(""),f=A({samanufacturer:"",samaterial:"",sadescription:"",Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",Description_F8:"",Description_F9:"",Description_F10:"",Description_F11:"",system:[],maps:[],arrSystem:[]}),h=e([]),t=e(!1);z(()=>{i(),h.value=c.$state});const S=j(()=>a.value?h.value.noasa[0].saNoaNumber.noa.filter(_=>_.toString().includes(a.value)):[]);let I=e(u.$state.systeminput);function E(){y.value=a.value,$.value=a.value,a.value!==null&&p($.value),k()}function k(){I.value.forEach((_,x)=>{console.log(_.systemData.Description_F1,_.systemData.Description_F2),f.samanufacturer=_.systemData.manufacturer,f.samaterial=_.systemData.material,f.Description_F1=_.systemData.Description_F1,f.Description_F2=_.systemData.Description_F2,f.Description_F3=_.systemData.Description_F3,f.Description_F4=_.systemData.Description_F4,f.Description_F5=_.systemData.Description_F5,f.Description_F6=_.systemData.Description_F6,f.Description_F7=_.systemData.Description_F7,f.Description_F8=_.systemData.Description_F8,f.Description_F9=_.systemData.Description_F9,f.Description_F10=_.systemData.Description_F10,f.Description_F11=_.systemData.Description_F11,f.arrSystem=_.systemData.arraySystem,f.system=_.systemData.system})}const U=_=>{a.value=_,t.value=!1},C=()=>{t.value=!0},P=()=>{setTimeout(()=>{t.value=!1},200)};return(_,x)=>{const w=ae,F=_e;return V(),N("div",Nt,[l("div",At,[g(F,null,{default:K(()=>[g(w,{id:"sanoa",modelValue:a.value,"onUpdate:modelValue":x[0]||(x[0]=D=>a.value=D),inputId:"ac",onFocus:x[1]||(x[1]=D=>t.value=!0),onBlur:P,onInput:C,onChange:E},null,8,["modelValue"]),It]),_:1})]),t.value&&S.value.length?(V(),N("ul",kt,[(V(!0),N(J,null,de(S.value,(D,O)=>(V(),N("li",{key:O,onMousedown:Z=>U(D)},Y(D),41,Mt))),128))])):W("",!0)])}}},Tt=te(Ut,[["__scopeId","data-v-d8d46f31"]]),Ct={id:"shingle",class:"flex flex-col w-full gap-1 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},Pt={class:"w-64 gap-1 mt-3",style:{"margin-left":"20px"}},Lt={class:"w-64 flex flex-col gap-2",style:{"margin-left":"20px"}},Et=l("label",{for:"slope",style:{color:"red"}},"Slope *",-1),qt={class:"w-64 flex flex-col gap-2",style:{"margin-left":"20px"}},Ht=l("label",{for:"height",style:{color:"red"}},"Height *",-1),Ot={class:"w-64 flex flex-col gap-2 mt-3 mb-8",style:{"margin-left":"20px"}},jt=l("label",{for:"area"},"Area",-1),Bt={class:"w-96",style:{"margin-left":"2px"}},Kt={class:"w-96",style:{"margin-left":"2px"}},zt={class:"w-96",style:{"margin-left":"2px"}},Rt={class:"card grid gap-2 grid-cols-1"},Gt=l("label",{style:{color:"red"}},"Select Underlayment (S/A) *",-1),Zt={class:"card grid gap-2 grid-cols-1"},Wt=l("label",{style:{color:"red"}},"Select Underlayment (UDL) *",-1),Yt={class:"card gap-2 mt-10 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},Jt={class:"flex flex-row space-x-20 space-y-12",style:{"margin-left":"2px"}},Qt={class:"flex flex-row space-x-20"},Xt={class:"w-96 flex flex-col gap-2"},es=l("label",{for:"manufacturer"},"(UDL) NOA Applicant",-1),ts={class:"flex flex-col gap-2"},ss=l("label",{for:"material"},"(UDL) Material",-1),os={class:"w-128 flex flex-col gap-2"},as=l("label",{for:"description"},"(UDL) Description",-1),ls={class:"card gap-2 mt-5 space-x-1 space-y-6",style:{"margin-left":"1px"}},ns={class:"flex flex-row space-x-20"},is={class:"flex flex-col gap-2"},rs=l("label",{for:"saapplicant"},"S/A Applicant",-1),cs={class:"flex flex-col gap-2"},us=l("label",{for:"samaterial"},"S/A Material Type",-1),ps={class:"flex flex-col gap-2"},ds=l("label",{style:{color:"red"}},"Select System F *",-1),ms={class:"w-196 flex flex-col gap-2",style:{"margin-left":"1px"}},fs=l("label",{for:"sadescription"},"S/A Description",-1),_s={class:"max-w-screen-xl flex flex-row mt-8 space-x-10",style:{"margin-left":"1px"}},gs={class:"w-128 flex flex-col gap-2"},hs=l("label",{for:"manufacturer"},"Applicant",-1),vs={class:"w-128 flex flex-col gap-2"},ys=l("label",{for:"material"}," Material",-1),Ds={class:"w-196 flex flex-col gap-2"},Fs=l("label",{for:"description"},"Description",-1),Ss={__name:"InputItems",setup(s){const o=Ie(),{roofList:r}=B(o),{slopeCondition:i,isSlopeLessFour:c,isSlopeMoreFour:u}=at(),d=ge(),p=he(),y=pe(),{inputshingle:$}=B(p),{polyinput:a}=B(d),f=A({manufacturer:"",material:"",description:""}),h=A({umanufacturer:"",umaterial:"",udescription:""}),t=A({samanufacturer:"",samaterial:"",sadescription:"",Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",Description_F8:"",Description_F9:"",Description_F10:"",Description_F11:"",system:[],maps:[],arrSystem:[]});let S=e($._object.inputshingle);console.log(S.value);let I=e(a._object.polyinput),E=e(y.store.$state.systeminput),k=e(!1),U=e(!1),C=e(!1),P=e(!1),_=e(!1),x=e(!0),w=e(null);e(),e(),e(),e(),e(null),e(null),e(null);const F=A({area:"",height:""}),D=e(null);e(t.system);let O=e(i.slope_more_4),Z=e(i.slope_less_4);const T=e(),L=e(),le=e();Me(),e(!1),pe(),ke();const Te=e([{name:"--Select Deck Type--"},{name:'- 5/8" Plywood -'},{name:'- 3/4" Plywood -'},{name:'- 1" x 6" T & G -'},{name:'- 1" x 8" T & G -'},{name:'- Existing 1/2" Plywood -'}]);e(10),e(33);const Ce=e(!1);j(()=>{De(),qe(),Fe(),onKeydown(),xe(),ve()});function ve(){I.value.length!==null&&I.value.forEach((n,m)=>{h.umanufacturer=n.polyData.applicant,h.umaterial=n.polyData.material,h.udescription=n.polyData.description})}function ne(){E.value.forEach((n,m)=>{console.log(n.systemData.Description_F1,n.systemData.Description_F2),t.samanufacturer=n.systemData.manufacturer,t.samaterial=n.systemData.material,t.Description_F1=n.systemData.Description_F1,t.Description_F2=n.systemData.Description_F2,t.Description_F3=n.systemData.Description_F3,t.Description_F4=n.systemData.Description_F4,t.Description_F5=n.systemData.Description_F5,t.Description_F6=n.systemData.Description_F6,t.Description_F7=n.systemData.Description_F7,t.Description_F8=n.systemData.Description_F8,t.Description_F9=n.systemData.Description_F9,t.Description_F10=n.systemData.Description_F10,t.Description_F11=n.systemData.Description_F11,t.arrSystem=n.systemData.arraySystem,t.system=n.systemData.system})}function ye(n){console.log(typeof n.value),n.value==="F1"&&(console.log(t.Description_F1),t.sadescription=t.Description_F1),n.value==="F2"&&(t.sadescription=t.Description_F2),n.value==="F3"&&(t.sadescription=t.Description_F3),(n.value==="F4"||n.value==="E4")&&(t.sadescription=t.Description_F4),(n.value==="F5"||n.value==="E5")&&(t.sadescription=t.Description_F5),(n.value==="F6"||n.value==="E6")&&(t.sadescription=t.Description_F6),n.value==="F7"&&(t.sadescription=t.Description_F7),n.value==="F8"&&(t.sadescription=t.Description_F8),n.value==="F9"&&(t.sadescription=t.Description_F9),n.value==="F10"&&(t.sadescription=t.Description_F10),n.value==="F11"&&(t.sadescription=t.Description_F11)}function De(){console.log(S.value),S.value.length!==null&&S.value.forEach((n,m)=>{f.manufacturer=n.shingleData.applicant,f.material=n.shingleData.material,f.description=n.shingleData.description,Ce.value=!0})}z(()=>{r.value.forEach((n,m)=>{console.log(n.item,m),n.item==="Asphalt Shingle"&&(console.log(n.dim1),F.area=n.dim1)})}),z(()=>{}),$e(w,(n,m)=>{console.log("Slope change from",m,"to",typeof n),Se()});const{errorshingleMessage:ie,validateShingleSlope:Pe}=ot({min:2,max:12,required:!0}),{errorshHeightMessage:X,validateShingleHeight:Le}=st({min:10,max:30,required:!0});function Fe(){Se()}const Se=()=>{console.log(w.value),Pe(w.value),console.log(ie.value)},Ee=()=>{Le(F.height),console.log(X.value)};function xe(){Ee()}function be(){console.log(L),(L.value==='2 Plies ASTM # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c'||T.value==='1 Ply ASTM # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c')&&(k=!1,U=!1,C=!0),(L.value==='2 Plies Polypropylene with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c'||T.value==='1 Ply Polypropylene with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c')&&(k=!0,U=!1,C=!0),(L.value==="(S/A) membrane adhered directly to a wood deck, per the NOA system F"||T.value==="(S/A) membrane adhered directly to a wood deck, per the NOA system F")&&(k=!1,U=!0,C=!0),L._rawValue===null&&console.log("Not Mounted")}function we(){if(w.value){let n=Number(w.value);console.log(n),n<2&&(x=!1),n>=2&&n<=4&&(x=!0,c.value=!0,P=!0,_=!1),n>4&&n<=12&&(x=!0,u.value=!0,_=!0,P=!1),w.value===""&&(x.value=!1,c.value=!1,u.value=!1)}else console.log("Not Mounted")}function qe(){p.$reset(),d.$reset()}return He(D,X),$e(ne,ye,we),(n,m)=>{const ee=ze,M=ae,Ve=Ke;return V(),N(J,null,[l("div",Ct,[l("div",Pt,[g(ee,{modelValue:le.value,"onUpdate:modelValue":m[0]||(m[0]=v=>le.value=v),options:Te.value,optionLabel:"name",placeholder:"Select a Deck Type",class:"w-full md:w-56"},null,8,["modelValue","options"])]),l("div",Lt,[Et,g(M,{id:"slope",modelValue:b(w),"onUpdate:modelValue":m[1]||(m[1]=v=>Oe(w)?w.value=v:w=v),modelModifiers:{number:!0},type:"text",placeholder:"slope",invalid:b(w)===null,onInput:we,onChange:Fe},null,8,["modelValue","invalid"]),b(ie)?(V(),Ne(Ve,{key:0,class:"w-96 mt-1 ...",severity:"error",life:6e3,style:{"margin-left":"2px"}},{default:K(()=>[Ae(Y(b(ie)),1)]),_:1})):W("",!0)]),l("div",qt,[Ht,g(M,{id:"height",modelValue:F.height,"onUpdate:modelValue":m[2]||(m[2]=v=>F.height=v),modelModifiers:{number:!0},type:"text",placeholder:"height",invalid:n.height===null,onChange:xe},null,8,["modelValue","invalid"]),b(X)?(V(),Ne(Ve,{key:0,class:"w-96 mt-1",severity:"error",life:6e3,style:{"margin-left":"2px"}},{default:K(()=>[Ae(Y(b(X)),1)]),_:1})):W("",!0)]),l("div",Ot,[jt,g(M,{id:"area",modelValue:F.area,"onUpdate:modelValue":m[3]||(m[3]=v=>F.area=v),type:"text",placeholder:"area"},null,8,["modelValue"])]),g(Re),q(l("div",Bt,[g(bt,{onKeydown:re(ce(ve,["exact","stop"]),["tab"])},null,8,["onKeydown"])],512),[[H,b(k)]]),q(l("div",Kt,[g(Tt,{onKeydown:re(ce(ne,["exact","stop"]),["tab"])},null,8,["onKeydown"])],512),[[H,b(U)]]),q(l("div",zt,[g(ft,{onKeydown:re(ce(De,["exact","stop"]),["tab"])},null,8,["onKeydown"])],512),[[H,b(C)]]),q(l("div",Rt,[Gt,g(ee,{modelValue:T.value,"onUpdate:modelValue":m[4]||(m[4]=v=>T.value=v),options:b(O),placeholder:"make selection",onChange:be},null,8,["modelValue","options"])],512),[[H,b(_)]]),q(l("div",Zt,[Wt,g(ee,{modelValue:L.value,"onUpdate:modelValue":m[5]||(m[5]=v=>L.value=v),options:b(Z),placeholder:"make selection",onChange:be},null,8,["modelValue","options"])],512),[[H,b(P)]])]),g(b(ue)),g(b(ue)),l("div",Yt,[l("div",Jt,[q(l("div",Qt,[l("div",Xt,[es,g(M,{id:"manufacturer",modelValue:h.umanufacturer,"onUpdate:modelValue":m[6]||(m[6]=v=>h.umanufacturer=v)},null,8,["modelValue"])]),l("div",ts,[ss,g(M,{id:"material",modelValue:h.umaterial,"onUpdate:modelValue":m[7]||(m[7]=v=>h.umaterial=v)},null,8,["modelValue"])]),l("div",os,[as,g(M,{id:"description",modelValue:h.udescription,"onUpdate:modelValue":m[8]||(m[8]=v=>h.udescription=v)},null,8,["modelValue"])])],512),[[H,b(k)]])]),q(l("div",ls,[l("div",ns,[l("div",is,[rs,g(M,{id:"saapplicant",modelValue:t.samanufacturer,"onUpdate:modelValue":m[9]||(m[9]=v=>t.samanufacturer=v)},null,8,["modelValue"])]),l("div",cs,[us,g(M,{id:"saaterial",modelValue:t.samaterial,"onUpdate:modelValue":m[10]||(m[10]=v=>t.samaterial=v)},null,8,["modelValue"])]),l("div",ps,[ds,g(ee,{modelValue:D.value,"onUpdate:modelValue":m[11]||(m[11]=v=>D.value=v),options:t.system,placeholder:"",onClick:ne,onChange:ye},null,8,["modelValue","options"])])]),l("div",ms,[fs,g(M,{id:"sadescription",modelValue:t.sadescription,"onUpdate:modelValue":m[12]||(m[12]=v=>t.sadescription=v)},null,8,["modelValue"])])],512),[[H,b(U)]]),l("div",_s,[l("div",gs,[hs,g(M,{id:"manufacturer",modelValue:f.manufacturer,"onUpdate:modelValue":m[13]||(m[13]=v=>f.manufacturer=v)},null,8,["modelValue"])]),l("div",vs,[ys,g(M,{id:"material",modelValue:f.material,"onUpdate:modelValue":m[14]||(m[14]=v=>f.material=v)},null,8,["modelValue"])])]),l("div",Ds,[Fs,g(M,{id:"description",modelValue:f.description,"onUpdate:modelValue":m[15]||(m[15]=v=>f.description=v)},null,8,["modelValue"])])])],64)}}},xs={id:"shingle",class:"card w-full space-y-1",style:{"margin-left":"20px"}},Es={__name:"Shingles",setup(s){const o=Ie();B(o);const r=e(!1),i=e(o.$state.roofList);function c(){for(let p=0;p<i.value.length;p++)console.log(i.value[p].item),i.value[p].item==="Asphalt Shingle"&&(console.log("I am in",i.value[p].item),r.value=!0,console.log(r.value))}z(()=>{c()});let u=e(null);function d(){console.log(u)}return(p,y)=>(V(),N(J,null,[q(g(tt,null,null,512),[[H,r.value===!0]]),l("div",xs,[g(Ss,{slopeEntered:b(u),style:{"margin-left":"2px"},onChange:d},null,8,["slopeEntered"])])],64))}};export{Es as default};