import{_ as Be,r as e,c as E,d as X,e as m,i as J,f as a,p as Re,j as je,k as ee,a as b,t as te,s as K,a7 as Ge,o as Q,w as _e,aa as ze,Y as h,ab as O,M as ye,a6 as De,n as xe,q as Fe,g as w,a3 as V,h as Z,m as Y,F as we}from"./index-DOAtylLw.js";import{u as Ve}from"./roofList-vi3DIveR.js";import{s as Ze}from"./index-B4RTi0FE.js";import{s as Ye}from"./index-CBrp13Yh.js";import{s as W}from"./index-DweRegM-.js";import{s as Je}from"./index-CKmzD7Es.js";import{s as Qe}from"./index-7sBuOMZ9.js";import{s as We}from"./index-a6eh4qQ0.js";import{u as le}from"./useAxios-CA_CXyaw.js";import{_ as Xe}from"./DripEdgeComponent-ClT_Du5E.js";import"./index-BWS4ugzW.js";import"./index-DBRnB2lQ.js";import"./index-7XpVRMH9.js";const L=n=>(Re("data-v-7c93ecbd"),n=n(),je(),n),et={class:"card flex justify-center"},tt=L(()=>a("div",{class:"grid grid-cols-1 gap-2 place-content-center h-8 ..."},[a("p",{class:"text-center text-red-600"},"mEPermit Application")],-1)),lt=L(()=>a("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[a("p",{class:"text-center text-red-600"},"High Velocity Hurricane Zone (HVHZ)")],-1)),at=L(()=>a("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[a("p",{class:"text-center text-red-600"},"Asphalt Shingles")],-1)),ot=L(()=>a("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[a("p",{class:"text-center text-red-600"}," The Shingle roof system and its components shall be installed in strict compliance with the HVHZ portions of Chapter 15 FBC, the HVHZ Roof Application Standards (RAS) 111 & 115, and the submitted MDC (NOA) Notice of Acceptance(s) ")],-1)),st=L(()=>a("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[a("p",{class:"text-center text-red-600"},"The mePermit applicant agrees to comply with these installation requirement when obtaining this roof permit.")],-1)),nt={class:"flex justify-end gap-2"},it={__name:"AgreementsDialogShingle",setup(n){const l=e(!0);return e(null),(f,c)=>{const g=W,u=Ye,d=Ze;return E(),X("div",et,[m(d,{visible:l.value,"onUpdate:visible":c[2]||(c[2]=p=>l.value=p),modal:"",header:"Terms Of Use",style:{width:"70rem"}},{default:J(()=>[tt,m(g),lt,at,ot,st,a("div",nt,[m(u,{modelValue:f.agreement,"onUpdate:modelValue":c[0]||(c[0]=p=>f.agreement=p),severity:"contrast",label:"I Agree",onClick:c[1]||(c[1]=p=>l.value=!1)},null,8,["modelValue"])])]),_:1},8,["visible"])])}}},rt=Be(it,[["__scopeId","data-v-7c93ecbd"]]);function ct({min:n=null,max:l=null,required:f=!1}){const c=e(null);return{errorshHeightMessage:c,validateShingleHeight:u=>{console.log(u,typeof u);const d=u;return n!==null&&d<n?(c.value=`Number must be greater than or equal to ${n}`,console.log("min",d,n),!1):l!==null&&d>=n&&d>=l?(c.value=`Number must be less than or equal to ${l}`,console.log("max",d),!1):f&&(u==null||u==="")?(c.value="This field is required",console.log("required"),!1):(c.value=null,!0)}}}function ut({min:n=null,max:l=null,required:f=!1}){const c=e(null);return{errorshingleMessage:c,validateShingleSlope:u=>{console.log(u,typeof u);const d=u;return n!==null&&d<n?(c.value=`Number must be greater than or equal to ${n}`,console.log("min",d,n),!1):l!==null&&d>=n&&d>=l?(c.value=`Number must be less than or equal to ${l}`,console.log("max",d),!1):f&&(u==null||u==="")?(c.value="This field is required",console.log("required"),!1):(c.value=null,!0)}}}const be=ee("polyinput",{state:()=>({polyinput:[],id:0}),actions:{addData(n){this.polyinput.push({polyData:n,completed:!1})}},reset(){this.polyinput=[]}});function pt(){const n=e();e([]);const l=e([]);let f=e([]);const c=be(),g=e(),u=e("");let d="https://o2cmgq2w4l.execute-api.us-east-1.amazonaws.com/shinglepoly/shinglepoly";const{execute:p,then:F,data:x}=le(d,{method:"GET"},{immediate:!1}),i=b({noa:"",applicant:"",material:"",description:"",expiration_date:""});function _(t){n.value=t,console.log(n.value),g.value=Number(n.value),v()}const v=async()=>{try{const t=await p({params:{noa:g.value}}).then(S=>(l.value=x.value,console.log(l.value),l.value));if(console.log(t),t.length===0)alert("No data found!");else{if(i.applicant=l.value[0].applicant,i.material=l.value[0].material,i.description=l.value[0].description,i.expiration_date=l.value[0].expiration_date,i.length===0)return;c.addData(i),console.log(i,"System added")}}catch(t){console.log("Error, fectching data",t),alert("An error occurred while fetching data.")}return f};return{inp:n,fetchData:v,takp:_,noaNum:l,error:u,results:f,...te(i),store:c}}const Ae=ee("inputshingle",{state:()=>({inputshingle:[],id:0}),reset(){this.inputshingle=[]},actions:{addShingle(n){this.inputshingle.push({shingleData:n,completed:!1})}},getters:{shingleData:n=>n.shingleData}});function dt(){const n=e();e([]);const l=e([]);let f=e([]);const c=Ae(),g=e(),u=e("");let d="https://45ocd2dvi7.execute-api.us-east-1.amazonaws.com/shinglenoa/shinglenoa";const{execute:p,then:F,data:x}=le(d,{method:"GET"},{immediate:!1}),i=b({noa:"",applicant:"",material:"",description:"",expiration_date:""});function _(t){n.value=t,console.log(n.value),g.value=Number(n.value),v()}const v=async()=>{try{const t=await p({params:{noa:g.value}}).then(S=>(l.value=x.value,l.value));console.log(t.length),t.length===0?alert("No data found!"):(console.log(l.value),i.applicant=l.value[0].applicant,i.material=l.value[0].material,i.description=l.value[0].description,i.expiration_date=l.value[0].expiration_date,c.addShingle(i),console.log(i,"System added"))}catch(t){console.log("Error, fectching data",t),alert("An error occurred while fetching data.")}return f};return{input:n,fetchData:v,takeValue:_,noaNum:l,error:u,results:f,...te(i),store:c}}const mt=ee("systeminput",{state:()=>({systeminput:[],id:0}),actions:{addData(n){this.systeminput.push({systemData:n,completed:!1}),console.log(n,this.systeminput)}},getters:{sysData:n=>n.systemData},reset(){this.systeminput=[]}});function Se(){const n=e();e([]);const l=e([]);let f=e([]);const c=mt(),g=e(),u=e("");let d="https://3z97hfdsmb.execute-api.us-east-1.amazonaws.com/sbsapi/sbsapi";const{execute:p,then:F,data:x}=le(d,{method:"GET"},{immediate:!1}),i=b({noa:"",manufacturer:"",material:"",system:[],description:"",expiration_date:"",Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",Description_F8:"",Description_F9:"",Description_F10:"",Description_F11:"",arraySystem:[],maps:[],systemCheck:[]});e([]);function _(t){n.value=t,g.value=Number(n.value),v()}const v=async()=>{try{if((await p({params:{NOA:g.value}}).then(S=>(l.value=x.value,l.value))).length===0)alert("No data found!");else{if(i.manufacturer=l.value[0].Manufacturer,i.material=l.value[0].Material,i.Description_F1=l.value[0].Description_F1,i.Description_F2=l.value[0].Description_F2,i.Description_F3=l.value[0].Description_F3,i.Description_F4=l.value[0].Description_F4,i.Description_F5=l.value[0].Description_F5,i.Description_F6=l.value[0].Description_F6,i.Description_F7=l.value[0].Description_F7,i.Description_F8=l.value[0].Description_F8,i.Description_F9=l.value[0].Description_F9,i.Description_F10=l.value[0].Description_F10,i.Description_F11=l.value[0].Description_F11,i.system=l.value[0].System,i.systemCheck=l.value[0].System,i.systemCheck.length>=2){i.maps=l.value[0].Maps;for(const[S]of Object.entries(i.maps))i.arraySystem.push(`${S}`),console.log(`${S}`)}else i.system=l.value[0].System,i.description=l.value[0].Description;c.addData(i),console.log(i,"System added")}}catch(t){console.log("Error, fectching data",t),alert("An error occurred while fetching data.")}return f};return{inputsystem:n,fetchData:v,takef:_,noaNum:l,error:u,results:f,...te(i),store:c}}function ft(n){const l=e(!1),f=e(!1),c=e(!1),g=e([]),u=e([]),d=e(n),p=e(),F=e(!1),x=b({slope_less_4:[" -- Select Underlayment -- ",'2 Plies ASTM # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c','2 Plies Polypropylene with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c',"(S/A) membrane adhered directly to a wood deck, per the NOA system F"],slope_more_4:["  -- Select Underlayment/Basesheet -- ",'1 Ply ASTM # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c','1 Ply Polypropylene with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c',"(S/A) membrane adhered directly to a wood deck, per the NOA system F"]});function i(){d.value?(p.value=Number(d.value),p.value>4&&p.value<=12&&(isSlopeValid.value=!0,F.value=!0,c.value=!0,f.value=!1),p.value>=2&&p.value<=4&&(console.log("Entered on 3: ",p.value,f.value),isSlopeValid.value=!0,l.value=!0,f.value=!0,c.value=!1),p.value<2&&(isSlopeValid.value=!1)):console.log("Not Mounted")}return{slopes:d,validateSlope:i,slopetypemore:u,slopetypeless:g,slopeNumber:p,slopeCondition:x,isSlopeLessFour:l,isSlopeMoreFour:F,isSelectVisible1:f,isSelectVisible2:c}}const ht={id:"shingle",class:"flex flex-col w-full gap-1 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},gt={class:"w-64 gap-1 mt-3",style:{"margin-left":"20px"}},vt={class:"w-64 flex flex-col gap-2",style:{"margin-left":"20px"}},_t=a("label",{for:"slope",style:{color:"red"}},"Slope *",-1),yt={class:"w-64 flex flex-col gap-2",style:{"margin-left":"20px"}},Dt=a("label",{for:"height",style:{color:"red"}},"Height *",-1),xt={class:"w-64 flex flex-col gap-2 mt-3 mb-8",style:{"margin-left":"20px"}},Ft=a("label",{for:"area"},"Area",-1),St={class:"w-96",style:{"margin-left":"2px"}},wt={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},Vt=a("label",{for:"udlInput"},"Fastened UDL NOA Number",-1),bt={class:"w-96",style:{"margin-left":"2px"}},At={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},Nt=a("label",{for:"saInput"},"S/A Membrane NOA Number",-1),Ut={class:"w-96",style:{"margin-left":"2px"}},kt={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},It=a("label",{for:"shinglenoa"},"Shingle Noa",-1),Mt={class:"card grid gap-2 grid-cols-1"},$t=a("label",{style:{color:"red"}},"Select Underlayment (S/A) *",-1),Ct={class:"card grid gap-2 grid-cols-1"},Et=a("label",{style:{color:"red"}},"Select Underlayment (UDL) *",-1),Lt={class:"card gap-2 mt-10 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},Tt={class:"flex flex-row space-x-20 space-y-12",style:{"margin-left":"2px"}},Pt={class:"flex flex-row space-x-20"},Ht={class:"w-96 flex flex-col gap-2"},qt=a("label",{for:"manufacturer"},"(UDL) NOA Applicant",-1),Ot={class:"flex flex-col gap-2"},Kt=a("label",{for:"material"},"(UDL) Material",-1),Bt={class:"w-128 flex flex-col gap-2"},Rt=a("label",{for:"description"},"(UDL) Description",-1),jt={class:"card gap-2 mt-5 space-x-1 space-y-6",style:{"margin-left":"1px"}},Gt={class:"flex flex-row space-x-20"},zt={class:"flex flex-col gap-2"},Zt=a("label",{for:"saapplicant"},"S/A Applicant",-1),Yt={class:"flex flex-col gap-2"},Jt=a("label",{for:"samaterial"},"S/A Material Type",-1),Qt={class:"flex flex-col gap-2"},Wt=a("label",{style:{color:"red"}},"Select System F *",-1),Xt={class:"w-196 flex flex-col gap-2",style:{"margin-left":"1px"}},el=a("label",{for:"sadescription"},"S/A Description",-1),tl={class:"max-w-screen-xl flex flex-row mt-8 space-x-10",style:{"margin-left":"1px"}},ll={class:"w-128 flex flex-col gap-2"},al=a("label",{for:"manufacturer"},"Applicant",-1),ol={class:"w-128 flex flex-col gap-2"},sl=a("label",{for:"material"}," Material",-1),nl={class:"w-196 flex flex-col gap-2"},il=a("label",{for:"description"},"Description",-1),rl={__name:"InputItems",setup(n){const l=Ve(),{roofList:f}=K(l),{slopeCondition:c,isSlopeLessFour:g,isSlopeMoreFour:u}=ft(),d=be(),p=Ae(),F=Se(),{inputshingle:x}=K(p);e(!1);const{polyinput:i}=K(d),_=b({manufacturer:"",material:"",description:""}),v=b({umanufacturer:"",umaterial:"",udescription:""}),t=b({samanufacturer:"",samaterial:"",sadescription:"",Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",Description_F8:"",Description_F9:"",Description_F10:"",Description_F11:"",system:[],maps:[],arrSystem:[]});let S=e(x._object.inputshingle),ae=e(i._object.polyinput),Ne=e(F.store.$state.systeminput),M=e(!1),$=e(!1),T=e(!1),B=e(!1),R=e(!1),P=e(!0),D=e(null),oe=e(),se=e(),Ue=e(),ne=e(),U=e(null),A=e(null),k=e(null);const I=b({area:"",height:""});e(),e([]);const j=e(null);e(t.system);let ke=e(c.slope_more_4),Ie=e(c.slope_less_4);const C=e(),N=e(),ie=e(),{input:ul,takeValue:Me}=dt();e(!1);const{inputsystem:pl,takef:$e}=Se(),{inp:dl,takp:Ce}=pt(),Ee=e([{name:"--Select Deck Type--"},{name:'- 5/8" Plywood -'},{name:'- 3/4" Plywood -'},{name:'- 1" x 6" T & G -'},{name:'- 1" x 8" T & G -'},{name:'- Existing 1/2" Plywood -'}]);e(10),e(33);const Le=e(!1);Ge(()=>{pe(),Ke(),de(),re(),onKeydown(),fe(),ce()});function re(){oe.value=k.value,k.value!==null&&Me(oe.value)}function Te(){Ue.value=A.value,se.value=A.value,A.value!==null&&$e(se.value)}function Pe(){ne.value=U.value,U.value!==null&&Ce(ne.value)}function ce(){ae.value.length!==null&&ae.value.forEach((o,s)=>{v.umanufacturer=o.polyData.applicant,v.umaterial=o.polyData.material,v.udescription=o.polyData.description})}function G(){Ne.value.forEach((o,s)=>{console.log(o.systemData.Description_F1,o.systemData.Description_F2),t.samanufacturer=o.systemData.manufacturer,t.samaterial=o.systemData.material,t.Description_F1=o.systemData.Description_F1,t.Description_F2=o.systemData.Description_F2,t.Description_F3=o.systemData.Description_F3,t.Description_F4=o.systemData.Description_F4,t.Description_F5=o.systemData.Description_F5,t.Description_F6=o.systemData.Description_F6,t.Description_F7=o.systemData.Description_F7,t.Description_F8=o.systemData.Description_F8,t.Description_F9=o.systemData.Description_F9,t.Description_F10=o.systemData.Description_F10,t.Description_F11=o.systemData.Description_F11,t.arrSystem=o.systemData.arraySystem,t.system=o.systemData.system})}function ue(o){console.log(typeof o.value),o.value==="F1"&&(console.log(t.Description_F1),t.sadescription=t.Description_F1),o.value==="F2"&&(t.sadescription=t.Description_F2),o.value==="F3"&&(t.sadescription=t.Description_F3),(o.value==="F4"||o.value==="E4")&&(t.sadescription=t.Description_F4),(o.value==="F5"||o.value==="E5")&&(t.sadescription=t.Description_F5),(o.value==="F6"||o.value==="E6")&&(t.sadescription=t.Description_F6),o.value==="F7"&&(t.sadescription=t.Description_F7),o.value==="F8"&&(t.sadescription=t.Description_F8),o.value==="F9"&&(t.sadescription=t.Description_F9),o.value==="F10"&&(t.sadescription=t.Description_F10),o.value==="F11"&&(t.sadescription=t.Description_F11)}function pe(){S.value.length!==null&&S.value.forEach((o,s)=>{console.log(o.shingleData,s),_.manufacturer=o.shingleData.applicant,_.material=o.shingleData.material,_.description=o.shingleData.description,Le.value=!0})}Q(()=>{f.value.forEach((o,s)=>{console.log(o.item,s),o.item==="Asphalt Shingle"&&(console.log(o.dim1),I.area=o.dim1)})}),Q(()=>{}),_e(D,(o,s)=>{console.log("Slope change from",s,"to",typeof o),me()});const{errorshingleMessage:z,validateShingleSlope:He}=ut({min:2,max:12,required:!0}),{errorshHeightMessage:H,validateShingleHeight:qe}=ct({min:10,max:30,required:!0});function de(){me()}const me=()=>{console.log(D.value),He(D.value),console.log(z.value)},Oe=()=>{qe(I.height),console.log(H.value)};function fe(){Oe()}function he(){console.log(N),(N.value==='2 Plies ASTM # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c'||C.value==='1 Ply ASTM # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c')&&(M=!1,$=!1,T=!0),(N.value==='2 Plies Polypropylene with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c'||C.value==='1 Ply Polypropylene with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c')&&(M=!0,$=!1,T=!0),(N.value==="(S/A) membrane adhered directly to a wood deck, per the NOA system F"||C.value==="(S/A) membrane adhered directly to a wood deck, per the NOA system F")&&(M=!1,$=!0,T=!0),N._rawValue===null&&console.log("Not Mounted")}function ge(){if(D.value){let o=Number(D.value);console.log(o),o<2&&(P=!1),o>=2&&o<=4&&(P=!0,g.value=!0,B=!0,R=!1),o>4&&o<=12&&(P=!0,u.value=!0,R=!0,B=!1),D.value===""&&(P.value=!1,g.value=!1,u.value=!1)}else console.log("Not Mounted")}function Ke(){p.$reset(),d.$reset()}return ze(j,H),_e(G,ue,ge),(o,s)=>{const q=We,y=Qe,ve=Je;return E(),X(we,null,[a("div",ht,[a("div",gt,[m(q,{modelValue:ie.value,"onUpdate:modelValue":s[0]||(s[0]=r=>ie.value=r),options:Ee.value,optionLabel:"name",placeholder:"Select a Deck Type",class:"w-full md:w-56"},null,8,["modelValue","options"])]),a("div",vt,[_t,m(y,{id:"slope",modelValue:h(D),"onUpdate:modelValue":s[1]||(s[1]=r=>O(D)?D.value=r:D=r),modelModifiers:{number:!0},type:"text",placeholder:"slope",invalid:h(D)===null,onInput:ge,onChange:de},null,8,["modelValue","invalid"]),h(z)?(E(),ye(ve,{key:0,class:"w-96 mt-1 ...",severity:"error",life:6e3,style:{"margin-left":"2px"}},{default:J(()=>[De(xe(h(z)),1)]),_:1})):Fe("",!0)]),a("div",yt,[Dt,m(y,{id:"height",modelValue:I.height,"onUpdate:modelValue":s[2]||(s[2]=r=>I.height=r),modelModifiers:{number:!0},type:"text",placeholder:"height",invalid:o.height===null,onChange:fe},null,8,["modelValue","invalid"]),h(H)?(E(),ye(ve,{key:0,class:"w-96 mt-1",severity:"error",life:6e3,style:{"margin-left":"2px"}},{default:J(()=>[De(xe(h(H)),1)]),_:1})):Fe("",!0)]),a("div",xt,[Ft,m(y,{id:"area",modelValue:I.area,"onUpdate:modelValue":s[3]||(s[3]=r=>I.area=r),type:"text",placeholder:"area"},null,8,["modelValue"])]),m(Xe),w(a("div",St,[a("div",wt,[Vt,m(y,{id:"udlInput",modelValue:h(U),"onUpdate:modelValue":s[4]||(s[4]=r=>O(U)?U.value=r:U=r),placeholder:"00000000",onChange:Pe,onKeydown:Z(Y(ce,["exact","stop"]),["tab"])},null,8,["modelValue","onKeydown"])])],512),[[V,h(M)]]),w(a("div",bt,[a("div",At,[Nt,m(y,{id:"saInput",modelValue:h(A),"onUpdate:modelValue":s[5]||(s[5]=r=>O(A)?A.value=r:A=r),placeholder:"00000000",onChange:Te,onKeydown:Z(Y(G,["exact","stop"]),["tab"])},null,8,["modelValue","onKeydown"])])],512),[[V,h($)]]),w(a("div",Ut,[a("div",kt,[It,m(y,{id:"shinglenoa",modelValue:h(k),"onUpdate:modelValue":s[6]||(s[6]=r=>O(k)?k.value=r:k=r),placeholder:"00000000",onChange:re,onKeydown:Z(Y(pe,["exact","stop"]),["tab"])},null,8,["modelValue","onKeydown"])])],512),[[V,h(T)]]),w(a("div",Mt,[$t,m(q,{modelValue:C.value,"onUpdate:modelValue":s[7]||(s[7]=r=>C.value=r),options:h(ke),placeholder:"make selection",onChange:he},null,8,["modelValue","options"])],512),[[V,h(R)]]),w(a("div",Ct,[Et,m(q,{modelValue:N.value,"onUpdate:modelValue":s[8]||(s[8]=r=>N.value=r),options:h(Ie),placeholder:"make selection",onChange:he},null,8,["modelValue","options"])],512),[[V,h(B)]])]),m(h(W)),m(h(W)),a("div",Lt,[a("div",Tt,[w(a("div",Pt,[a("div",Ht,[qt,m(y,{id:"manufacturer",modelValue:v.umanufacturer,"onUpdate:modelValue":s[9]||(s[9]=r=>v.umanufacturer=r)},null,8,["modelValue"])]),a("div",Ot,[Kt,m(y,{id:"material",modelValue:v.umaterial,"onUpdate:modelValue":s[10]||(s[10]=r=>v.umaterial=r)},null,8,["modelValue"])]),a("div",Bt,[Rt,m(y,{id:"description",modelValue:v.udescription,"onUpdate:modelValue":s[11]||(s[11]=r=>v.udescription=r)},null,8,["modelValue"])])],512),[[V,h(M)]])]),w(a("div",jt,[a("div",Gt,[a("div",zt,[Zt,m(y,{id:"saapplicant",modelValue:t.samanufacturer,"onUpdate:modelValue":s[12]||(s[12]=r=>t.samanufacturer=r)},null,8,["modelValue"])]),a("div",Yt,[Jt,m(y,{id:"saaterial",modelValue:t.samaterial,"onUpdate:modelValue":s[13]||(s[13]=r=>t.samaterial=r)},null,8,["modelValue"])]),a("div",Qt,[Wt,m(q,{modelValue:j.value,"onUpdate:modelValue":s[14]||(s[14]=r=>j.value=r),options:t.system,placeholder:"",onClick:G,onChange:ue},null,8,["modelValue","options"])])]),a("div",Xt,[el,m(y,{id:"sadescription",modelValue:t.sadescription,"onUpdate:modelValue":s[15]||(s[15]=r=>t.sadescription=r)},null,8,["modelValue"])])],512),[[V,h($)]]),a("div",tl,[a("div",ll,[al,m(y,{id:"manufacturer",modelValue:_.manufacturer,"onUpdate:modelValue":s[16]||(s[16]=r=>_.manufacturer=r)},null,8,["modelValue"])]),a("div",ol,[sl,m(y,{id:"material",modelValue:_.material,"onUpdate:modelValue":s[17]||(s[17]=r=>_.material=r)},null,8,["modelValue"])])]),a("div",nl,[il,m(y,{id:"description",modelValue:_.description,"onUpdate:modelValue":s[18]||(s[18]=r=>_.description=r)},null,8,["modelValue"])])])],64)}}},cl={id:"shingle",class:"card w-full space-y-1",style:{"margin-left":"20px"}},bl={__name:"Shingles",setup(n){const l=Ve();K(l);const f=e(!1),c=e(l.$state.roofList);function g(){for(let p=0;p<c.value.length;p++)console.log(c.value[p].item),c.value[p].item==="Asphalt Shingle"&&(console.log("I am in",c.value[p].item),f.value=!0,console.log(f.value))}Q(()=>{g()});let u=e(null);function d(){console.log(u)}return(p,F)=>(E(),X(we,null,[w(m(rt,null,null,512),[[V,f.value===!0]]),a("div",cl,[m(rl,{slopeEntered:h(u),style:{"margin-left":"2px"},onChange:d},null,8,["slopeEntered"])])],64))}};export{bl as default};