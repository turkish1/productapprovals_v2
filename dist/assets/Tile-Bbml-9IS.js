import{s as gt}from"./index-CCxC4mEs.js";import{s as Ge}from"./index-D7Sd0rAS.js";import{s as Ce}from"./index-cUWPKNTK.js";import{_ as Dt,r as s,c as ue,d as Oe,e as m,i as we,f as e,p as yt,j as bt,k as Ze,a as O,t as Ke,a7 as $,s as We,o as Ye,w as fe,aa as St,Y as g,M as Ve,a6 as V,n as je,q as Ae,g as h,ab as ve,a3 as P,h as Pe,ac as I,F as Je}from"./index-BHzPe7uK.js";import{u as Qe}from"./roofList-DiWDAaEV.js";import{u as Tt}from"./index-QDexJ2vw.js";import{T as Et}from"./index-BCoyMUki.js";import{s as xt}from"./index-0cKyUU7r.js";import{s as Ct}from"./index-DjTWmlHN.js";import{s as wt}from"./index-Bg1t4VZB.js";import{u as he}from"./useAxios-BXjO8pu8.js";import{c as $e,i as Vt,u as Ie}from"./index-B4_BgJvT.js";import"./jspdf.es.min-DDgNbKDY.js";import{s as xe}from"./index-RZ-K7INE.js";import{_ as At}from"./DripEdgeComponent-oUVPKjE4.js";import"./index-BH6tNwnW.js";import"./index-DPNp1ouw.js";const ge=o=>(yt("data-v-79dc7d09"),o=o(),bt(),o),kt={class:"card flex justify-center"},Bt=ge(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-8 ..."},[e("p",{class:"text-center text-red-600"},"mEPermit Application")],-1)),Ft=ge(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[e("p",{class:"text-center text-red-600"},"High Velocity Hurricane Zone (HVHZ)")],-1)),zt=ge(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[e("p",{class:"text-center text-red-600"},"Concrete & Clay Roof Tiles")],-1)),Nt=ge(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[e("p",{class:"text-center text-red-600"}," The tile roof system and its components shall be installed in strict compliance with the FBC 2023 HVHZ portions of Chapter 15, the HVHZ Tile Application Standards: RAS-119, RAS-120 & RAS-127 and the submitted MDC Notice of Acceptance(s). ")],-1)),Ut=ge(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[e("p",{class:"text-center text-red-600"},"The mePermit applicant agrees to comply with these installation requirements when obtaining this permit.")],-1)),Mt={class:"flex justify-end gap-2"},Pt={__name:"AgreementsDialogTile",setup(o){const r=s(!0);return s(null),(a,p)=>{const u=Ce,v=Ge,D=gt;return ue(),Oe("div",kt,[m(D,{visible:r.value,"onUpdate:visible":p[2]||(p[2]=b=>r.value=b),modal:"",header:"Terms Of Use",style:{width:"70rem"}},{default:we(()=>[Bt,m(u),Ft,zt,Nt,Ut,e("div",Mt,[m(v,{modelValue:a.agreement,"onUpdate:modelValue":p[0]||(p[0]=b=>a.agreement=b),severity:"contrast",label:"I Agree",onClick:p[1]||(p[1]=b=>r.value=!1)},null,8,["modelValue"])])]),_:1},8,["visible"])])}}},It=Dt(Pt,[["__scopeId","data-v-79dc7d09"]]),Xe=Ze("tilefinput",{state:()=>({tilefinput:[],id:0}),actions:{addData(o){this.tilefinput.push({systemData:o,completed:!1}),console.log(o,this.tilefinput)}},getters:{sysData:o=>o.systemData}});function Ot(){const o=s(),r=s(),a=s();let p=s([]);const u=Xe(),v=s("");let D="https://9vevtvy376.execute-api.us-east-1.amazonaws.com/systemf/systemf";const{execute:b,then:E,data:i}=he(D,{method:"GET"},{immediate:!1}),f=O({noa:"",manufacturer:"",material:"",system:[],designPressure:[],description:"",Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",arraySystem:[],systemCheck:[]});s([]);function M(_){o.value=_,r.value=Number(o.value),b({params:{NOA:r.value}}).then(F=>(a.value=i.value,console.log(a.value[0]),f.manufacturer=a.value[0].Manufacturer,f.material=a.value[0].Material,f.Description_F1=a.value[0].TileCap_Sheet_Description_F1,f.Description_F2=a.value[0].TileCap_Sheet_Description_F2,f.Description_F3=a.value[0].TileCap_Sheet_Description_F3,f.Description_F4=a.value[0].TileCap_Sheet_Description_F4,f.Description_F5=a.value[0].TileCap_Sheet_Description_F5,f.Description_F6=a.value[0].TileCap_Sheet_Description_F6,f.Description_F7=a.value[0].TileCap_Sheet_Description_F7,f.designPressure=a.value[0].DesignPressure,f.system=a.value[0].System,u.addData(f),console.log("System added"),p))}return{inputsystem:o,takef:M,noaNum:a,results:p,error:v,...Ke(f),store:u}}const $t=$e(()=>{const o=s([]),r=$(()=>o.value);function a(p){o.value.push(p)}return{tilenoa:o,getNumber:r,addNoa:a}});function Ht(){const o=s(),r=s([]);let a=s([]);const p=s(),u=s(""),v=s(""),{tilenoa:D,getNoa:b,addNoa:E}=$t(),i=O({noa:"",applicant:"",material:[],description:"",Table2:[],Table3:[],expiration_date:"",resistance:[],selection:""});let f="https://jtk1qa20ul.execute-api.us-east-1.amazonaws.com/doublepd/doublepd";const{execute:M,then:_,data:F}=he(f,{method:"GET"},{immediate:!0});function N(Q){console.log(Q),o.value=Q,p.value=Number(o.value),M({params:{NOA:p.value}}).then(De=>(r.value=F.value,console.log(r.value[0]),i.applicant=r.value[0].applicant,i.material=r.value[0].AdhesiveMaterial,i.selection=r.value[0].AdhesiveMaterials,i.description=r.value[0].description,i.Table2=r.value[0].Table2,i.Table3=r.value[0].Table3,i.resistance=r.value[0].Resistance,console.log(r.value[0].AdhesiveMaterial),E(i),console.log(i,"System added"),a))}return{getTilenoa:N,tilenoa:D,getNoa:b,addNoa:E,responseMessage:u,noaNum:r,error:v,results:a,tileData:i}}const Lt=$e(()=>{const o=s([]),r=$(()=>o.value);function a(p){o.value.push(p)}return{tilenoas:o,getNumber:r,addNoa:a}});function qt(){const o=s(),r=s([]);let a=s([]);const p=s(),u=s(""),v=s(""),{tilenoas:D,getNoa:b,addNoa:E}=Lt();let i="https://q5vantupjl.execute-api.us-east-1.amazonaws.com/singlepd/singlepd";const{execute:f,then:M,data:_}=he(i,{method:"GET"},{immediate:!0}),F=O({noa:"",applicant:"",material:[],description:"",Table2:[],Table3:[],expiration_date:"",resistance:[],selection:""});function N(Q){o.value=Q,console.log(o.value),p.value=Number(o.value),f({params:{NOA:p.value}}).then(De=>(r.value=_.value,console.log(r.value[0]),F.applicant=r.value[0].applicant,F.material=r.value[0].AdhesiveMaterial,F.selection=r.value[0].AdhesiveMaterials,F.description=r.value[0].description,F.Table2=r.value[0].Table2,F.Table3=r.value[0].Table3,F.resistance=r.value[0].Resistance,console.log(r.value[0].AdhesiveMaterial),E(F),console.log(F,"System added"),a))}return{getTilenoas:N,tilenoas:D,getNoa:b,addNoa:E,responseMessage:u,noaNum:r,error:v,results:a,tileDatas:F}}const et=Ze("tilesysEinput",{state:()=>({tilesysEinput:[],id:0}),actions:{addData(o){this.tilesysEinput.push({systemDataE:o,completed:!1}),console.log(o,this.tilesysEinput)}},getters:{sysEData:o=>o.systemDataE}});function Rt(){const o=s(),r=s(),a=s([]);s([]);const p=et(),u=s("");let v="https://q7pzfsbv8f.execute-api.us-east-1.amazonaws.com/systeme/systeme";const{execute:D,then:b,data:E}=he(v,{method:"GET"},{immediate:!1}),i=O({noa:"",manufacturer:"",material:"",system:[],designPressure:[],Anchor_Base_Sheet:[],Anchor_Base_Sheet_E1:"",Anchor_Base_Sheet_E2:"",Anchor_Base_Sheet_E3:"",Anchor_Base_Sheet_E4:"",Anchor_Base_Sheet_E5:"",Anchor_Base_Sheet_E6:"",Anchor_Base_Sheet_E7:"",TileCap_Sheet_Description:[],TileCap_Sheet_Description_E1:"",TileCap_Sheet_Description_E2:"",TileCap_Sheet_Description_E3:"",TileCap_Sheet_Description_E4:"",TileCap_Sheet_Description_E5:"",TileCap_Sheet_Description_E6:"",TileCap_Sheet_Description_E7:"",arraySystem:[],Maps:[],systemCheck:[]});s([]);function f(M){o.value=M,console.log(o.value,M),r.value=Number(o.value),D({params:{NOA:r.value}}).then(_=>{a.value=E.value,i.manufacturer=a.value[0].Manufacturer,i.material=a.value[0].Material,i.Anchor_Base_Sheet_E1=a.value[0].Anchor_Base_Sheet_E1,i.Anchor_Base_Sheet_E1=a.value[0].Anchor_Base_Sheet_E1,i.Anchor_Base_Sheet_E2=a.value[0].Anchor_Base_Sheet_E2,i.Anchor_Base_Sheet_E3=a.value[0].Anchor_Base_Sheet_E3,i.Anchor_Base_Sheet_E4=a.value[0].Anchor_Base_Sheet_E4,i.Anchor_Base_Sheet_E5=a.value[0].Anchor_Base_Sheet_E5,i.Anchor_Base_Sheet_E6=a.value[0].Anchor_Base_Sheet_E6,i.Anchor_Base_Sheet_E7=a.value[0].Anchor_Base_Sheet_E7,i.TileCap_Sheet_Description_E1=a.value[0].TileCap_Sheet_Description_E1,i.TileCap_Sheet_Description_E2=a.value[0].TileCap_Sheet_Description_E2,i.TileCap_Sheet_Description_E3=a.value[0].TileCap_Sheet_Description_E3,i.TileCap_Sheet_Description_E4=a.value[0].TileCap_Sheet_Description_E4,i.TileCap_Sheet_Description_E5=a.value[0].TileCap_Sheet_Description_E5,i.TileCap_Sheet_Description_E6=a.value[0].TileCap_Sheet_Description_E6,i.TileCap_Sheet_Description_E7=a.value[0].TileCap_Sheet_Description_E7,i.system=a.value[0].System,i.designPressure=a.value[0].DesignPressure,i.Maps=a.value[0].Maps,i.Anchor_Base_Sheet=a.value[0].Anchor_Base_Sheet,i.TileCap_Sheet_Description=a.value[0].TileCap_Sheet_Description,p.addData(i),console.log("System added")})}return{inputsystem:o,getV:f,noaNum:a,error:u,...Ke(i),store:p}}function jt(){const o=O({noa:"",manufacturer:"",material:"",system:[],designPressure:[],Anchor_Base_Sheet:[],TileCap_Sheet_Description:[],Anchor_Base_Sheet_E1:"",Anchor_Base_Sheet_E2:"",Anchor_Base_Sheet_E3:"",Anchor_Base_Sheet_E4:"",Anchor_Base_Sheet_E5:"",Anchor_Base_Sheet_E6:"",Anchor_Base_Sheet_E7:"",TileCap_Sheet_Description:[],TileCap_Sheet_Description_E1:"",TileCap_Sheet_Description_E2:"",TileCap_Sheet_Description_E3:"",TileCap_Sheet_Description_E4:"",TileCap_Sheet_Description_E5:"",TileCap_Sheet_Description_E6:"",TileCap_Sheet_Description_E7:"",arrDesignPressure:[]}),r=et(),{inputsystem:a,getV:p,noaNum:u,error:v,systemDataE:D}=Rt();let b=s(r.$state.tilesysEinput);console.log(r,u.value);function E(){b.value.length!==null&&(b.value.forEach((i,f)=>{o.manufacturer=i.systemDataE.manufacturer,o.material=i.systemDataE.material,o.system=i.systemDataE.system,o.Anchor_Base_Sheet=i.systemDataE.Anchor_Base_Sheet}),console.log(b.value))}return{EcheckInput:E,Edatamounted:b,udlTiles:o,etileStore:r,inputsystem:a,getV:p,noaNum:u,error:v,systemDataE:D}}const tt=$e(()=>{const o=s([]),r=s([]),a=s([]),p=$(()=>o.value),u=$(()=>r.value),v=$(()=>a.value);$(()=>tilenoa.value);function D(i){o.value.push(i)}function b(i){r.value.push(i)}function E(i){a.value.push(i)}return{slopes:o,heights:r,getSlopes:p,getZones:v,getHeight:u,zones:a,addDimzones:E,addDimslope:D,addDimheight:b}});function Gt(){const o=s(""),r=s(),a=s(),p=s([]),u=s(),v=s(!1),D=s(null),b=s([]),E=s(),i=s(),f=O({table1:"",table2:"",table3:"",zn:[],zones:{lessfifteen:[],fifteen:[],twenty:[],twentyfive:[],thirty:[],thirtyfive:[]}}),{addDimzones:M,addDimslope:_,addDimheight:F}=tt();v.value=!0;let N="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/zonec2023";const{execute:Q,then:De,data:c}=he(N,{method:"GET"},{immediate:!1});let n=O({}),A=O({});const X={fifteen:15,twenty:20,twentyfive:25,thirty:30,thirtyfive:35,forty:40},se=((L,k,U)=>Math.max(Math.min(L,Math.max(k,U)),Math.min(k,U)))(2,4.5,6),ce=((L,k,U)=>Math.max(Math.min(L,Math.max(k,U)),Math.min(k,U)))(4.5,6,12);function ee(L,k){r.value=L,a.value=k,o.value=Number(r.value),a.value=Number(a.value),o.value>=ce&&(console.log("Six is true"),Z("table3")),se<o.value&&o.value<ce&&(console.log("less than Six is true"),Z("table2")),o.value<se&&(console.log("less than 4.5 is true"),Z("table1"))}function Z(L){return b.value=L,p.value=Q().then(k=>{b.value==="table3"&&(console.log("table3 executed"),u.value=c.value.result.WindExposureC2023_db.slp_six_twelve,console.log(u.value),console.log("table3",u.value),H(o.value,a.value,u.value),_(o.value),F(a.value)),b.value==="table2"&&(console.log("table2 executed"),u.value=c.value.result.WindExposureC2023_db.slp_four_six,console.log("table2",u.value),H(o.value,a.value,u.value),_(o.value),F(a.value)),b.value==="table1"&&(console.log("table1 executed"),u.value=c.value.result.WindExposureC2023_db.slp_two_four,console.log(u.value),H(o.value,a.value,u.value),_(o.value),F(a.value))}),p.value}function H(L,k,U){E.value=L,i.value=k,n=U,console.log(n),_e(n)}function _e(L){const k=L,U=Number(X.fifteen),B=Number(X.twenty),te=Number(X.twentyfive),Y=Number(X.thirty),j=Number(X.thirtyfive),de=Number(X.forty);console.log(typeof i.value,i.value,typeof B,B,typeof te,te),i.value<U?(n=k.lessfifteen,console.log("if 15 statement was executed"),Object.entries(n).map(z=>{console.log("Object statement was executed"),z[0];const q=z[1];f.zones.lessfifteen.push(q)}),A=f.zones.lessfifteen,console.log(A),M(A)):i.value>=U&&i.value<B?(console.log(i.value,B,U),n=k.fifteen,console.log("if statement for 15 to 20 was executed"),Object.entries(n).map(z=>{console.log("Object statement was executed"),z[0];const q=z[1];f.zones.fifteen.push(q)}),A=f.zones.fifteen,console.log(A),M(A)):i.value<te&&i.value>=B?(console.log(i.value,B,te),n=k.twenty,console.log("if 22 statement was executed"),Object.entries(n).map(z=>{z[0];const q=z[1];f.zones.twenty.push(q)}),A=f.zones.twenty,console.log(A),M(A)):i.value<Y&&i.value>=te?(console.log(i.value,Y,te),n=k.twentyfive,console.log("if 25 statement was executed"),Object.entries(n).map(z=>{console.log("Object statement was executed"),z[0];const q=z[1];f.zones.twentyfive.push(q)}),A=f.zones.twentyfive,console.log(A),M(A)):i.value<j&&i.value>=Y?(n=k.thirty,console.log("if statement 32 was executed"),Object.entries(n).map(z=>{console.log("Object statement was executed"),z[0];const q=z[1];f.zones.thirty.push(q)}),A=f.zones.thirty,console.log(A),M(A)):i.value<de&&i.value>=j&&(n=k.thirtyfive,console.log(i.value,Y,j),Object.entries(n).map(z=>{console.log("Object statement was executed"),z[0];const q=z[1];f.zones.thirtyfive.push(q)}),A=f.zones.thirtyfive,console.log(A),M(A))}return v.value=!1,{type:b,error:D,newSlp:E,tb:A,processData:_e,newHgt:i,slopeSelection:H,loading:v,zoneData:u,slope:o,tables:f,results:p,getData:ee}}function Zt({min:o=null,max:r=null,required:a=!1}){const p=s(null);return{errorHeightMessage:p,validateTileHeight:v=>{console.log(v,typeof v);const D=v;return o!==null&&D<o?(p.value=`Number must be greater than or equal to ${o}`,console.log("min",D,o),!1):r!==null&&D>=o&&D>=r?(p.value=`Number must be less than or equal to ${r}`,console.log("max",D),!1):a&&(v==null||v==="")?(p.value="This field is required",console.log("required"),!1):(p.value=null,!0)}}}function Kt({min:o=null,max:r=null,required:a=!1}){const p=s(null);return{errorMessage:p,validateNumber:v=>{console.log(v,typeof v);const D=v;return o!==null&&D<o?(p.value=`Number must be greater than or equal to ${o}`,console.log("min",D,o),!1):r!==null&&D>=o&&D>=r?(p.value=`Number must be less than or equal to ${r}`,console.log("max",D),!1):a&&(v==null||v==="")?(p.value="This field is required",console.log("required"),!1):(p.value=null,!0)}}}const Wt={id:"tile",class:"flex flex-col w-full gap-2 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"10px"}},Yt={class:"w-64 gap-2 mt-3 space-y-2",style:{"margin-left":"20px"}},Jt={class:"w-64 mt-6 ...",style:{"margin-left":"20px"}},Qt=e("label",{for:"slope"},"Slope",-1),Xt=e("label",{class:"px-2",style:{color:"red"}},"*",-1),el={class:"w-64 mt-6 space-y-2",style:{"margin-left":"20px"}},tl=e("label",{for:"height"},"Height",-1),ll=e("label",{class:"px-2",style:{color:"red"}},"*",-1),sl=e("div",null,null,-1),al={class:"w-64 mt-6 space-y-2",style:{"margin-left":"20px"}},ol=e("label",{for:"area"},"Area of Tile",-1),nl={class:"w-64 mt-3 ...",style:{"margin-left":"20px"}},il=e("label",{for:"perimeter"},"Roof Permeter(a) = 4h",-1),rl={class:"card md:w-3/4 grid gap-1 grid-cols-1"},ul=e("label",{for:"underlaymentType"},"Select Underlayment (UDL) and/or Tile Capsheet",-1),cl={class:"w-96",style:{"margin-left":"2px"}},dl={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},pl=e("label",{for:"udlInput"},"Fastened UDL NOA Number",-1),ml={class:"w-96",style:{"margin-left":"2px"}},_l={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},vl=e("label",{for:"saInput"},"S/A Membrane NOA Number",-1),fl={class:"w-56 flex flex-col gap-2",style:{"margin-left":"100px"}},hl=e("label",{style:{color:"red"}},"Select Exposure",-1),gl={class:"flex items-center space-x-2"},Dl={class:"field-radiobutton space-x-4 gap-2"},yl=e("label",{for:"option3"},"C",-1),bl={class:"field-radiobutton space-x-4 gap-2"},Sl=e("label",{for:"option4"},"D",-1),Tl=e("label",{style:{color:"red"}},"Select a Paddy Category",-1),El={class:"flex items-center"},xl={class:"field-radiobutton space-x-3 gap-2"},Cl=e("label",{for:"option1"},"Single",-1),wl={class:"field-radiobutton space-x-3 gap-2"},Vl=e("label",{for:"option2"},"Double",-1),Al={class:"w-96",style:{"margin-left":"3px"}},kl={class:"w-64 gap-4 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},Bl=e("label",{for:"tilenoa"},"Tile Noas",-1),Fl={class:"card md:w-full gap-4 mt-10 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},zl={class:"columns-3 flex flex-row space-x-20 space-y-12",style:{"margin-left":"2px"}},Nl={class:"flex flex-row space-x-20"},Ul={class:"w-96 flex flex-col gap-2"},Ml=e("label",{for:"manufacturer"},"(UDL) NOA Applicant",-1),Pl={class:"flex flex-col gap-2"},Il=e("label",{for:"material"},"(UDL) Material",-1),Ol={class:"w-128 flex flex-col gap-2"},$l=e("label",{for:"anchor"},"Anchor Base Sheet",-1),Hl={class:"w-full flex flex-row space-x-30 space-y-8",style:{"margin-left":"2px"}},Ll={class:"break-after-column flex flex-row space-x-8 space-y-4",style:{"margin-left":"2px"}},ql={class:"w-56 flex flex-col gap-2 mt-3"},Rl=e("label",{style:{color:"red"}},"Select System E *",-1),jl={class:"w-128 flex flex-col gap-2"},Gl=e("label",{for:"description"},"(UDL) Description",-1),Zl={class:"flex flex-col gap-2"},Kl=e("label",{for:"designPressure"},"Design psf:",-1),Wl={class:"card gap-4 mt-10 space-x-10 space-y-6"},Yl={class:"flex flex-row gap-3 space-x-20"},Jl={class:"w-128 flex flex-col gap-2"},Ql=e("label",{for:"saapplicant"},"S/A Applicant",-1),Xl={class:"w-128 flex flex-col gap-2"},es=e("label",{for:"samaterial"},"S/A Material Type",-1),ts={class:"w-72 flex flex-col gap-2"},ls=e("label",{style:{color:"red"}},"Select System F *",-1),ss={class:"w-72 flex flex-col gap-2"},as=e("label",{for:"designpressure"},"Design psf:",-1),os={class:"max-w-screen-lg gap-2 flex flex-col gap-2"},ns=e("label",{for:"sadescription"},"S/A Description",-1),is={class:"flex flex-row mt-8 space-x-20",style:{"margin-left":"1px"}},rs={class:"w-96 flex flex-col gap-2"},us=e("label",{for:"manufacturer"},"Tile Applicant",-1),cs={class:"w-128 flex flex-col gap-2"},ds=e("label",{for:"material"},"Tile Description",-1),ps={class:"w-128 flex flex-col gap-2"},ms=e("label",{for:"material"},"Tile Adhesive Material",-1),_s={class:"flex flex-wrap gap-1 mt-10",style:{"margin-left":"6px"}},vs={class:"lg:w-full min-h-[10px] flex flex-row gap-18",style:{"margin-left":"10px"}},fs={width:"100%",align:"left"},hs={valign:"middle"},gs={style:{margin:"auto","font-size":"large","font-weight":"bold","font-family":"arial"}},Ds=e("td",null,"Zone 1:",-1),ys=e("td",null,"Zone 2:",-1),bs=e("td",null,"Zone 3:",-1),Ss={__name:"InputTile",setup(o){const r=s(null),a=Xe(),{getTilenoa:p,tileData:u}=Ht(),{EcheckInput:v,Edatamounted:D,etileStore:b,getV:E,systemDataE:i}=jt(),{takef:f}=Ot(),{getTilenoas:M,tileDatas:_}=qt(),{zones:F}=tt(),N=O({manufacturer:"",material:[],description:"",resistance:[],Table2:[],Table3:[]}),Q=Qe(),{roofList:De}=We(Q);Ye(()=>{De.value.forEach((d,t)=>{console.log(d.item,t),d.item==="Adhesive Set Tile"&&(console.log(d.dim4),B.area=d.dim4)})});const c=O({manufacturer:"",material:"",system:[],designpressure:[],description:[],Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",arrDesignPressure:[]}),n=O({noa:"",manufacturer:"",material:"",system:[],designPressure:[],Anchor_Base_Sheet:[],TileCap_Sheet_Description:[],Anchor_Base_Sheet_E1:"",Anchor_Base_Sheet_E2:"",Anchor_Base_Sheet_E3:"",Anchor_Base_Sheet_E4:"",Anchor_Base_Sheet_E5:"",Anchor_Base_Sheet_E6:"",Anchor_Base_Sheet_E7:"",TileCap_Sheet_Description:[],TileCap_Sheet_Description_E1:"",TileCap_Sheet_Description_E2:"",TileCap_Sheet_Description_E3:"",TileCap_Sheet_Description_E4:"",TileCap_Sheet_Description_E5:"",TileCap_Sheet_Description_E6:"",TileCap_Sheet_Description_E7:"",arrDesignPressure:[]});let A=s(a.$state.tilefinput),X=s(b.$state.tilesysEinput),ke=s(),se=s(u),Be=s(_),ce=s();s(!1);let ee=s(null),Z=s(null),H=s(null);const _e=s(),L=s([{name:"--Select Deck Type--"},{name:'- 5/8" Plywood -'},{name:'- 3/4" Plywood -'},{name:'- 1" x 6" T & G -'},{name:'- 1" x 8" T & G -'},{name:'- Existing 1/2" Plywood -'}]),k=s([]);s("");let U=s("");const B=O({area:"",per:"",height:"",slope:""}),te=s(.4);function Y(){B.height=U.value,B.per=(B.height*te.value).toFixed(2),q(B.slope,B.height)}$(()=>{Y()});const j=s(null);function de(){console.log(j.value)}const{tables:z,getData:q}=Gt(),y=O({zone:"",lambda1:"",mg1:"",mr1:"",mf1:""}),x=O({zone:"",lambda2:"",mg2:"",mr2:"",mf2:""}),w=O({zone:"",lambda3:"",mg3:"",mr3:"",mf3:""});fe(y,de,x);const lt=s(),st=s(),at=$(()=>{Re(),v(),Y(),Se(),Te(),qe(),Me()}),Fe=s(null),He=s(null),ze=s(null),Le=s(null);let ye=s(""),ae=s(!1),oe=s(!1),le=s(!1),pe=s();const ot=s([{selectedBasesheet:"-- Select Tile Capsheet/Underlayment --",key:0},{selectedBasesheet:"Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30",key:1},{selectedBasesheet:"(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F",key:2},{selectedBasesheet:"(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E",key:3}]);fe(pe,()=>{k.value=pe.value.key,k.value===1?(le.value=!0,ye.value=!1,ae.value=!1,oe.value=!1):k.value===2?(le.value=!0,ye.value=!1,ae.value=!1,oe.value=!0):k.value===3?(le.value=!0,ye.value=!0,ae.value=!0,oe.value=!1):k.value===0&&(ye.value=!1,ae.value=!1,oe.value=!1,le.value=!1)});const K={two:2,three:3,four:4,five:5,six:6,seven:7};s(!0),St(le,at);const nt=s(!1);function be(){A.value.forEach((d,t)=>{c.Description_F1=d.systemData.Description_F1,c.Description_F2=d.systemData.Description_F2,c.Description_F3=d.systemData.Description_F3,c.Description_F4=d.systemData.Description_F4,c.Description_F5=d.systemData.Description_F5,c.Description_F6=d.systemData.Description_F6,c.Description_F7=d.systemData.Description_F7,c.arrDesignPressure=d.systemData.designPressure,d.systemData.system.length>1?rt():c.system=d.systemData.system})}function it(){X.value.forEach((d,t)=>{n.Maps=d.systemDataE.Maps,n.Anchor_Base_Sheet_E1=d.systemDataE.Anchor_Base_Sheet_E1,n.Anchor_Base_Sheet_E2=d.systemDataE.Anchor_Base_Sheet_E2,n.Anchor_Base_Sheet_E3=d.systemDataE.Anchor_Base_Sheet_E3,n.Anchor_Base_Sheet_E4=d.systemDataE.Anchor_Base_Sheet_E4,n.Anchor_Base_Sheet_E5=d.systemDataE.Anchor_Base_Sheet_E5,n.Anchor_Base_Sheet_E6=d.systemDataE.Anchor_Base_Sheet_E6,n.Anchor_Base_Sheet_E7=d.systemDataE.Anchor_Base_Sheet_E7,n.TileCap_Sheet_Description_E1=d.systemDataE.TileCap_Sheet_Description_E1,n.TileCap_Sheet_Description_E2=d.systemDataE.TileCap_Sheet_Description_E2,n.TileCap_Sheet_Description_E3=d.systemDataE.TileCap_Sheet_Description_E3,n.TileCap_Sheet_Description_E4=d.systemDataE.TileCap_Sheet_Description_E4,n.TileCap_Sheet_Description_E5=d.systemDataE.TileCap_Sheet_Description_E5,n.TileCap_Sheet_Description_E6=d.systemDataE.TileCap_Sheet_Description_E6,n.TileCap_Sheet_Description_E7=d.systemDataE.TileCap_Sheet_Description_E7,n.arrDesignPressure=d.systemDataE.designPressure,d.systemDataE.system.length>1||(n.system=d.systemDataE.system,n.description=d.systemDataE.description,n.designPressure=d.systemDataE.designPressure)})}function rt(){c.system=c.system}const S=s(!1),ut=s(""),ct=s(null);function Se(){r.value==="single"&&(S.value=!0)}fe(Se,de,()=>{ut.value=r.value,console.log(r.value,j.value)});function Te(){se.value=Z.value,Be.value=Z.value,ke.value=ee.value,ce.value=H.value,console.log(H.value,ce.value),se.value!==null&&(console.log(r.value,"Outside"),r.value==="single"?(console.log(r.value,"Entered"),M(Be.value)):p(se.value)),ee.value!==null&&f(ke.value),H.value!==null&&(console.log(H.value),E(ce.value))}const{errorMessage:Ne,validateNumber:dt}=Kt({min:2,max:12,required:!0}),{errorHeightMessage:Ue,validateTileHeight:pt}=Zt({min:10,max:40,required:!0});function Me(){mt()}const mt=()=>{dt(B.slope),console.log(Ne.value)},_t=()=>{pt(B.height),console.log(Ue.value)};function qe(){_t(),console.log(height.value)}function vt(){A.value.length!==null&&A.value.forEach((d,t)=>{c.manufacturer=d.systemData.manufacturer,c.material=d.systemData.material,c.system=d.systemData.system})}function Re(){se.value.length!==null&&(N.manufacturer=S.value===!0?_.applicant:u.applicant,N.description=S.value===!0?_.description:u.description,console.log(F._value,N.manufacturer),F._value.forEach((d,t)=>{y.zone=d[0],x.zone=d[1],w.zone=d[2]}))}let me=s(!1),R=s(!1);function ft(){console.log(u,_),N.material=S.value===!0?_.material:u.material,N.paddies=S.value===!0?_.resistance:u.resistance,console.log(N.material,S.value,_.material),y.lambda1=S.value===!0?_.Table2.Direct_Deck:u.Table2.Direct_Deck,x.lambda2=S.value===!0?_.Table2.Direct_Deck:u.Table2.Direct_Deck,w.lambda3=S.value===!0?_.Table2.Direct_Deck:u.Table2.Direct_Deck;const t=((W,re,l)=>Math.max(Math.min(W,Math.max(re,l)),Math.min(re,l)))(2,Number(B.slope),12);console.log(t),t<=K.three||t===K.three||t<K.four?(console.log("Is Less"),y.mg1=S.value===!0?_.Table3.two.Direct_Deck:u.Table3.two.Direct_Deck,x.mg2=S.value===!0?_.Table3.two.Direct_Deck:u.Table3.two.Direct_Deck,w.mg3=S.value===!0?_.Table3.two.Direct_Deck:u.Table3.two.Direct_Deck):t<K.five||t===K.four?(console.log("Is Less"),y.mg1=S.value===!0?_.Table3.four.Direct_Deck:u.Table3.four.Direct_Deck,x.mg2=S.value===!0?_.Table3.four.Direct_Deck:u.Table3.four.Direct_Deck,w.mg3=S.value===!0?_.Table3.four.Direct_Deck:u.Table3.four.Direct_Deck):t===K.five||t<K.six?(console.log("Is Less"),y.mg1=S.value===!0?_.Table3.five.Direct_Deck:u.Table3.five.Direct_Deck,x.mg2=S.value===!0?_.Table3.five.Direct_Deck:u.Table3.five.Direct_Deck,w.mg3=S.value===!0?_.Table3.five.Direct_Deck:u.Table3.five.Direct_Deck):t==K.six||t<K.seven?(y.mg1=S.value===!0?_.Table3.six.Direct_Deck:u.Table3.six.Direct_Deck,x.mg2=S.value===!0?_.Table3.six.Direct_Deck:u.Table3.six.Direct_Deck,w.mg3=S.value===!0?_.Table3.six.Direct_Deck:u.Table3.six.Direct_Deck):t>=K.seven&&(console.log("Is Less"),y.mg1=S.value===!0?_.Table3.seven.Direct_Deck:u.Table3.seven.Direct_Deck,x.mg2=S.value===!0?_.Table3.seven.Direct_Deck:u.Table3.seven.Direct_Deck,w.mg3=S.value===!0?_.Table3.seven.Direct_Deck:u.Table3.seven.Direct_Deck);const C=$(()=>y.zone*y.lambda1);console.log(C.value);const T=$(()=>x.zone*x.lambda2);console.log(T.value);const G=$(()=>w.zone*w.lambda3);console.log(C.value,T.value,G.value),y.mr1=$(()=>(C.value-y.mg1).toFixed(2)),x.mr2=$(()=>(T.value-x.mg2).toFixed(2)),w.mr3=$(()=>(G.value-w.mg3).toFixed(2))}const ne=s([]),J=s([]);function ie(d){console.log(d.value);let t=S.value===!0?_.selection:u.selection;ct.value=Object.entries(t).map(C=>{const T=C[0],G=C[1];ne.value.push(T),J.value.push(G),console.log(G,T),console.log(ne.value,J.value),console.log(J.value[0],J.value[1]),console.log(ne.value)});for(let C=0;C<ne.value.length;C++){console.log(ne.value[C],J.value[C],C),ne.value[C]===d.value&&(console.log(ne.value[C],J.value[C]),y.mf1=J.value[C],x.mf2=J.value[C],w.mf3=J.value[C]);const T=Ie(y.mf1),G=Ie(y.mf2),W=Ie(y.mf3);console.log(T.value),(y.mr1>T.value||d.value)&&(console.log("I am in mr greater",R.value),R=!0),(y.mr1<T.value||d.value)&&(me.value=!0,R=!1),x.mr2>G.value?(console.log("I am in mr greater",R.value),R=!0):(me.value=!0,R=!1),w.mr3>W.modelValue?(console.log("I am in mr greater",R.value),R=!0):(me.value=!0,R=!1)}}function ht(){st.value=Object.entries(Fe).map(d=>{const t=d[1];t==="F1"&&(c.description=c.Description_F1,c.designpressure=c.arrDesignPressure[0]),t==="F2"&&(c.description=c.Description_F2,c.designpressure=c.arrDesignPressure[1]===null?c.arrDesignPressure[0]:c.arrDesignPressure[1],console.log(c.arrDesignPressure)),t==="F3"&&(c.description=c.Description_F3,c.designpressure=c.arrDesignPressure[2]),t==="F4"&&(c.description=c.Description_F4,c.designpressure=c.arrDesignPressure[3]),t==="F5"&&(c.description=c.Description_F5,c.designpressure=c.arrDesignPressure[4]),t==="F6"&&(c.description=c.Description_F6,c.designpressure=c.arrDesignPressure[5],t==="F7"&&(c.description=c.Description_F7,c.designpressure=c.arrDesignPressure[6]))})}function Ee(){lt.value=Object.entries(ze).map(d=>{const t=d[1];console.log(d[1]),(t==="E1"||t==="E8")&&(n.TileCap_Sheet_Description=n.TileCap_Sheet_Description_E1,n.designPressure=n.arrDesignPressure[0]),(t==="E2"||t==="E9")&&(n.TileCap_Sheet_Description=n.TileCap_Sheet_Description_E2,n.designPressure=n.arrDesignPressure[1]),(t==="E3"||t==="E10")&&(n.TileCap_Sheet_Description=n.TileCap_Sheet_Description_E3,n.designPressure=n.arrDesignPressure[2]),(t==="E4"||t==="E11")&&(n.TileCap_Sheet_Description=n.TileCap_Sheet_Description_E4,n.designPressure=n.arrDesignPressure[3]),(t==="E5"||t==="E12")&&(n.TileCap_Sheet_Description=n.TileCap_Sheet_Description_E5,n.designPressure=n.arrDesignPressure[4]),(t==="E6"||t==="E13")&&(n.TileCap_Sheet_Description=n.TileCap_Sheet_Description_E6,n.designPressure=n.arrDesignPressure[5],(t==="E7"||t==="E14")&&(n.TileCap_Sheet_Description=n.TileCap_Sheet_Description_E7,n.designPressure=n.arrDesignPressure[6]))})}return Vt(async()=>{}),fe(be,Me,R),(d,t)=>{const C=wt,T=Ct,G=xt,W=Ge,re=Et;return ue(),Oe(Je,null,[e("div",Wt,[e("div",Yt,[m(C,{modelValue:_e.value,"onUpdate:modelValue":t[0]||(t[0]=l=>_e.value=l),options:L.value,optionLabel:"name",placeholder:"Select a Deck Type",class:"w-full md:w-56"},null,8,["modelValue","options"])]),e("div",Jt,[Qt,Xt,m(T,{id:"slope",placeholder:"slope",modelValue:B.slope,"onUpdate:modelValue":t[1]||(t[1]=l=>B.slope=l),modelModifiers:{number:!0},onChange:Me},null,8,["modelValue"]),g(Ne)?(ue(),Ve(G,{key:0,class:"w-96 mt-1 ...",severity:"error",life:6e3,style:{"margin-left":"2px"}},{default:we(()=>[V(je(g(Ne)),1)]),_:1})):Ae("",!0)]),e("div",el,[tl,ll,h(m(T,{id:"height",modelValue:g(U),"onUpdate:modelValue":t[2]||(t[2]=l=>ve(U)?U.value=l:U=l),modelModifiers:{number:!0},type:"text",placeholder:"height",onInput:Y,onChange:qe},null,8,["modelValue"]),[[re,"Press Enter after value",void 0,{bottom:!0}]]),g(Ue)?(ue(),Ve(G,{key:0,class:"w-96 mt-1",severity:"error",life:6e3,style:{"margin-left":"2px"}},{default:we(()=>[V(je(g(Ue)),1)]),_:1})):Ae("",!0)]),sl,e("div",al,[ol,m(T,{id:"area",modelValue:B.area,"onUpdate:modelValue":t[3]||(t[3]=l=>B.area=l),type:"text",placeholder:"area"},null,8,["modelValue"])]),e("div",nl,[il,m(T,{id:"perimeter",modelValue:B.per,"onUpdate:modelValue":t[4]||(t[4]=l=>B.per=l),type:"text",placeholder:" ",onChange:Y},null,8,["modelValue"])]),e("div",rl,[ul,m(C,{modelValue:g(pe),"onUpdate:modelValue":t[5]||(t[5]=l=>ve(pe)?pe.value=l:pe=l),options:ot.value,optionLabel:"selectedBasesheet",placeholder:"make selection",onChange:be},null,8,["modelValue","options"])]),m(At),h(e("div",cl,[e("div",dl,[pl,h(m(T,{id:"udlInput",modelValue:g(H),"onUpdate:modelValue":t[6]||(t[6]=l=>ve(H)?H.value=l:H=l),placeholder:"00000000",onChange:Te,onKeydown:Pe(g(v),["tab"])},null,8,["modelValue","onKeydown"]),[[re,"Press Tab after value",void 0,{bottom:!0}]])])],512),[[P,g(ae)]]),h(e("div",ml,[e("div",_l,[vl,h(m(T,{id:"saInput",modelValue:g(ee),"onUpdate:modelValue":t[7]||(t[7]=l=>ve(ee)?ee.value=l:ee=l),placeholder:"00000000",onChange:Te,onKeydown:Pe(vt,["tab"])},null,8,["modelValue"]),[[re,"Press Tab after value",void 0,{bottom:!0}]])])],512),[[P,g(oe)]]),h(e("div",fl,[hl,e("div",gl,[e("div",Dl,[m(g(xe),{inputId:"option3",name:"option",value:"c",variant:"filled",invalid:j.value===null,modelValue:j.value,"onUpdate:modelValue":t[8]||(t[8]=l=>j.value=l),onUpdate:de},null,8,["invalid","modelValue"]),yl]),e("div",bl,[m(g(xe),{inputId:"option4",name:"option",value:"d",variant:"filled",invalid:j.value===null,modelValue:j.value,"onUpdate:modelValue":t[9]||(t[9]=l=>j.value=l),onUpdate:de},null,8,["invalid","modelValue"]),Sl])]),m(g(Ce)),Tl,e("div",El,[e("div",xl,[m(g(xe),{inputId:"option1",name:"options",value:"single",variant:"filled",invalid:r.value===null,modelValue:r.value,"onUpdate:modelValue":t[10]||(t[10]=l=>r.value=l),onUpdate:Se},null,8,["invalid","modelValue"]),Cl]),e("div",wl,[m(g(xe),{style:{"margin-left":"5px"},inputId:"option2",name:"options",value:"double",variant:"filled",invalid:r.value===null,modelValue:r.value,"onUpdate:modelValue":t[11]||(t[11]=l=>r.value=l),onUpdate:Se},null,8,["invalid","modelValue"]),Vl])])],512),[[P,g(le)]]),h(e("div",Al,[e("div",kl,[Bl,h(m(T,{id:"tilenoa",modelValue:g(Z),"onUpdate:modelValue":t[12]||(t[12]=l=>ve(Z)?Z.value=l:Z=l),placeholder:"00000000",onChange:Te,onKeydown:Pe(Re,["tab"])},null,8,["modelValue"]),[[re,"Press Tab after value",void 0,{bottom:!0}]])])],512),[[P,g(le)]])]),m(g(Ce)),m(g(Ce)),e("div",Fl,[e("div",zl,[h(e("div",Nl,[e("div",Ul,[Ml,m(T,{id:"manufacturer",modelValue:n.manufacturer,"onUpdate:modelValue":t[13]||(t[13]=l=>n.manufacturer=l)},null,8,["modelValue"])]),e("div",Pl,[Il,m(T,{id:"material",modelValue:n.material,"onUpdate:modelValue":t[14]||(t[14]=l=>n.material=l)},null,8,["modelValue"])]),e("div",Ol,[$l,m(C,{modelValue:Le.value,"onUpdate:modelValue":t[15]||(t[15]=l=>Le.value=l),options:n.Anchor_Base_Sheet,placeholder:"",onClick:it,onChange:Ee},null,8,["modelValue","options"])])],512),[[P,g(ae)]])]),e("div",Hl,[h(e("div",Ll,[e("div",ql,[Rl,m(C,{modelValue:ze.value,"onUpdate:modelValue":t[16]||(t[16]=l=>ze.value=l),options:n.system,placeholder:"",onClick:be,onChange:Ee},null,8,["modelValue","options"])]),e("div",jl,[Gl,m(T,{id:"description",modelValue:n.TileCap_Sheet_Description,"onUpdate:modelValue":t[17]||(t[17]=l=>n.TileCap_Sheet_Description=l),onChange:Ee},null,8,["modelValue"])]),e("div",Zl,[Kl,m(T,{id:"designPressure",modelValue:n.designPressure,"onUpdate:modelValue":t[18]||(t[18]=l=>n.designPressure=l),onChange:Ee},null,8,["modelValue"])])],512),[[P,g(ae)]])]),e("div",Wl,[h(e("div",Yl,[e("div",Jl,[Ql,m(T,{id:"saapplicant",modelValue:c.manufacturer,"onUpdate:modelValue":t[19]||(t[19]=l=>c.manufacturer=l)},null,8,["modelValue"])]),e("div",Xl,[es,m(T,{id:"saaterial",modelValue:c.material,"onUpdate:modelValue":t[20]||(t[20]=l=>c.material=l)},null,8,["modelValue"])]),e("div",ts,[ls,m(C,{modelValue:Fe.value,"onUpdate:modelValue":t[21]||(t[21]=l=>Fe.value=l),options:c.system,placeholder:"",onClick:be,onChange:ht},null,8,["modelValue","options"])]),e("div",ss,[as,m(T,{id:"designpressure",modelValue:c.designpressure,"onUpdate:modelValue":t[22]||(t[22]=l=>c.designpressure=l)},null,8,["modelValue"])])],512),[[P,g(oe)]]),h(e("div",os,[ns,m(T,{id:"capsheetdescription",modelValue:c.description,"onUpdate:modelValue":t[23]||(t[23]=l=>c.description=l)},null,8,["modelValue"])],512),[[P,g(oe)]])]),h(e("div",is,[e("div",rs,[us,m(T,{id:"manufacturer",modelValue:N.manufacturer,"onUpdate:modelValue":t[24]||(t[24]=l=>N.manufacturer=l)},null,8,["modelValue"])]),e("div",cs,[ds,m(T,{id:"description",modelValue:N.description,"onUpdate:modelValue":t[25]||(t[25]=l=>N.description=l)},null,8,["modelValue"])]),e("div",ps,[ms,m(C,{modelValue:He.value,"onUpdate:modelValue":t[26]||(t[26]=l=>He.value=l),options:N.material,placeholder:"make a selection",onClick:ft,onChange:ie},null,8,["modelValue","options"])])],512),[[P,g(le)]]),e("div",_s,[e("div",vs,[e("table",fs,[e("tbody",null,[e("tr",null,[e("td",hs,[e("table",gs,[e("tbody",null,[e("tr",null,[Ds,e("td",null,[h(e("input",{"onUpdate:modelValue":t[27]||(t[27]=l=>y.zone=l),readonly:"",size:"4",name:"p1",value:""},null,512),[[I,y.zone]]),V(" x λ  ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[28]||(t[28]=l=>y.lambda1=l),readonly:"",size:"4",name:"lambda1",value:""},null,512),[[I,y.lambda1]]),V(" - Mg: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[29]||(t[29]=l=>y.mg1=l),readonly:"",size:"4",name:"mg1",value:""},null,512),[[I,y.mg1]]),V(" = Mr1: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[30]||(t[30]=l=>y.mr1=l),readonly:"",size:"4",name:"mr1",value:""},null,512),[[I,y.mr1]]),V(" NOA Mf: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[31]||(t[31]=l=>y.mf1=l),readonly:"",size:"4",name:"mf1",value:""},null,512),[[I,y.mf1]]),V("  ")]),h(m(W,{size:"small",icon:"pi pi-check",severity:"success",onChange:ie},null,512),[[P,g(me)]]),V("  "),h(m(W,{size:"small",icon:"pi pi-times",severity:"danger",onChange:ie},null,512),[[P,g(R)]]),V("  ")]),e("tr",null,[ys,e("td",null,[h(e("input",{"onUpdate:modelValue":t[32]||(t[32]=l=>x.zone=l),readonly:"",size:"4",name:"p2",value:""},null,512),[[I,x.zone]]),V(" x λ  ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[33]||(t[33]=l=>x.lambda2=l),readonly:"",size:"4",name:"lambda2",value:""},null,512),[[I,x.lambda2]]),V(" - Mg: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[34]||(t[34]=l=>x.mg2=l),readonly:"",size:"4",name:"mg2",value:""},null,512),[[I,x.mg2]]),V(" = Mr2: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[35]||(t[35]=l=>x.mr2=l),readonly:"",size:"4",name:"mr2",value:""},null,512),[[I,x.mr2]]),V(" NOA Mf: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[36]||(t[36]=l=>x.mf2=l),readonly:"",size:"4",name:"mf32",value:""},null,512),[[I,x.mf2]]),V(" ")]),h(m(W,{size:"small",icon:"pi pi-check",severity:"success",onChange:ie},null,512),[[P,g(me)]]),V("  "),h(m(W,{size:"small",icon:"pi pi-times",severity:"danger",onChange:ie},null,512),[[P,g(R)]]),V("  ")]),e("tr",null,[bs,e("td",null,[h(e("input",{"onUpdate:modelValue":t[37]||(t[37]=l=>w.zone=l),readonly:"",size:"4",name:"p3",value:""},null,512),[[I,w.zone]]),V(" x λ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[38]||(t[38]=l=>w.lambda3=l),readonly:"",size:"4",name:"lambda3",value:""},null,512),[[I,w.lambda3]]),V(" - Mg: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[39]||(t[39]=l=>w.mg3=l),readonly:"",size:"4",name:"mg5",value:""},null,512),[[I,w.mg3]]),V(" = Mr3: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[40]||(t[40]=l=>w.mr3=l),readonly:"",size:"4",name:"mr3",value:""},null,512),[[I,w.mr3]]),V(" NOA Mf: ")]),e("td",null,[h(e("input",{"onUpdate:modelValue":t[41]||(t[41]=l=>w.mf3=l),readonly:"",size:"4",name:"mf3",value:""},null,512),[[I,w.mf3]]),V(" ")]),h(m(W,{size:"small",icon:"pi pi-check",severity:"success",onChange:ie},null,512),[[P,g(me)]]),V("  "),h(m(W,{size:"small",icon:"pi pi-times",severity:"danger",onChange:ie},null,512),[[P,g(R)]]),V("  ")]),nt.value?(ue(),Ve(G,{key:0,severity:"error",life:3e3},{default:we(()=>[V("Select Another Material")]),_:1})):Ae("",!0)])])])])])])])])])],64)}}},Ts={id:"tile",class:"card w-full space-y-1",style:{"margin-left":"20px"}},Hs={__name:"Tile",setup(o){const r=Tt(),a=Qe();We(a);const p=s(!1),u=s(a.$state.roofList);let v=s(null);function D(){console.log(v)}fe(p,E=>{E?(console.log("Dialog is now visible"),console.log(r)):console.log("Dialog has been closed")});function b(){for(let E=0;E<u.value.length;E++)console.log(u.value[E].item),u.value[E].item==="Adhesive Set Tile"&&(console.log("I am in",u.value[E].item),p.value=!0,console.log(p.value))}return Ye(()=>{b()}),(E,i)=>(ue(),Oe(Je,null,[p.value===!0?(ue(),Ve(It,{key:0})):Ae("",!0),e("div",Ts,[m(Ss,{slopeEntered:g(v),style:{"margin-left":"2px"},onChange:D},null,8,["slopeEntered"])])],64))}};export{Hs as default};