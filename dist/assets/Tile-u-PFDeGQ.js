import{T as je}from"./index-CVaaf1ac.js";import{s as et}from"./index-_chco_Hq.js";import{s as tt}from"./index-CYlNlSDT.js";import{s as lt}from"./index-kc_xTFUo.js";import{s as st}from"./index-DBGDDv5N.js";import{k as Ue,r as a,a as G,t as Ne,a3 as L,s as at,o as ot,w as De,a6 as nt,c as Ce,d as Me,f as t,e as m,Y as D,a7 as me,g as v,$ as O,a8 as I,a2 as F,M as it,i as rt,q as ut,F as ct,_ as dt}from"./index-B0iIhuxd.js";import{u as _e}from"./useAxios-MoK05tYO.js";import{c as Ae,i as pt,b as mt,u as we}from"./index-BgOtcB1e.js";import{u as _t}from"./roofList-CBZ2Px-W.js";import{h as ft,E as vt}from"./jspdf.es.min-QN_A7OR4.js";import{s as Ve}from"./index-C8gfBxaY.js";import{s as ye}from"./index-2X8A1MD_.js";import{_ as ht}from"./DripEdgeComponent-C3AmuCCT.js";import"./index-BG_ybJ1n.js";import"./index-CDtNPN5S.js";const Ie=Ue("tilesysEinput",{state:()=>({tilesysEinput:[],id:0}),actions:{addData(r){this.tilesysEinput.push({systemDataE:r,completed:!1}),console.log(r,this.tilesysEinput)}},getters:{sysEData:r=>r.systemDataE}});function gt(){const r=a();a([]);const c=a([]);let _=a([]);const V=Ie(),E=a("");let d="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilesysteme";const{execute:R,then:N,data:T}=_e(d,{method:"GET"},{immediate:!1}),l=G({noa:"",manufacturer:"",material:"",system:[],designPressure:[],Anchor_Base_Sheet:[],Anchor_Base_Sheet_E1:"",Anchor_Base_Sheet_E2:"",Anchor_Base_Sheet_E3:"",Anchor_Base_Sheet_E4:"",Anchor_Base_Sheet_E5:"",Anchor_Base_Sheet_E6:"",Anchor_Base_Sheet_E7:"",TileCap_Sheet_Description:[],TileCap_Sheet_Description_E1:"",TileCap_Sheet_Description_E2:"",TileCap_Sheet_Description_E3:"",TileCap_Sheet_Description_E4:"",TileCap_Sheet_Description_E5:"",TileCap_Sheet_Description_E6:"",TileCap_Sheet_Description_E7:"",arraySystem:[],Maps:[],systemCheck:[]});a([]);function C(y){r.value=y,console.log(r.value),R().then(B=>(c.value=T.value,Object.entries(c.value.result).map(u=>{let n=Number(r.value);u[1].NOA===n&&(l.manufacturer=u[1].Manufacturer,l.material=u[1].Material,l.Anchor_Base_Sheet_E1=u[1].Anchor_Base_Sheet_E1,l.Anchor_Base_Sheet_E1=u[1].Anchor_Base_Sheet_E1,l.Anchor_Base_Sheet_E2=u[1].Anchor_Base_Sheet_E2,l.Anchor_Base_Sheet_E3=u[1].Anchor_Base_Sheet_E3,l.Anchor_Base_Sheet_E4=u[1].Anchor_Base_Sheet_E4,l.Anchor_Base_Sheet_E5=u[1].Anchor_Base_Sheet_E5,l.Anchor_Base_Sheet_E6=u[1].Anchor_Base_Sheet_E6,l.Anchor_Base_Sheet_E7=u[1].Anchor_Base_Sheet_E7,l.TileCap_Sheet_Description_E1=u[1].TileCap_Sheet_Description_E1,l.TileCap_Sheet_Description_E2=u[1].TileCap_Sheet_Description_E2,l.TileCap_Sheet_Description_E3=u[1].TileCap_Sheet_Description_E3,l.TileCap_Sheet_Description_E4=u[1].TileCap_Sheet_Description_E4,l.TileCap_Sheet_Description_E5=u[1].TileCap_Sheet_Description_E5,l.TileCap_Sheet_Description_E6=u[1].TileCap_Sheet_Description_E6,l.TileCap_Sheet_Description_E7=u[1].TileCap_Sheet_Description_E7,l.system=u[1].System,l.designPressure=u[1].DesignPressure,l.Maps=u[1].Maps,l.Anchor_Base_Sheet=u[1].Anchor_Base_Sheet,l.TileCap_Sheet_Description=u[1].TileCap_Sheet_Description,V.addData(l),console.log("System added"))}),_))}return{inputsystem:r,getV:C,noaNum:c,error:E,res:_,...Ne(l),store:V}}const Oe=Ue("tilefinput",{state:()=>({tilefinput:[],id:0}),actions:{addData(r){this.tilefinput.push({systemData:r,completed:!1}),console.log(r,this.tilefinput)}},getters:{sysData:r=>r.systemData}});function Dt(){const r=a();a([]);const c=a();let _=a([]);const V=Oe(),E=a("");let d="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilesystemf";const{execute:R,then:N,data:T}=_e(d,{method:"GET"},{immediate:!1}),l=G({noa:"",manufacturer:"",material:"",system:[],designPressure:[],description:"",Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",arraySystem:[],systemCheck:[]});a([]);function C(y){r.value=y,R().then(B=>(c.value=T.value,Object.entries(c.value.result).map(u=>{let n=Number(r.value);u[1].NOA===n&&(l.manufacturer=u[1].Manufacturer,l.material=u[1].Material,l.Description_F1=u[1].TileCap_Sheet_Description_F1,l.Description_F2=u[1].TileCap_Sheet_Description_F2,l.Description_F3=u[1].TileCap_Sheet_Description_F3,l.Description_F4=u[1].TileCap_Sheet_Description_F4,l.Description_F5=u[1].TileCap_Sheet_Description_F5,l.Description_F6=u[1].TileCap_Sheet_Description_F6,l.Description_F7=u[1].TileCap_Sheet_Description_F7,l.designPressure=u[1].DesignPressure,l.system=u[1].System,V.addData(l),console.log("System added"))}),_))}return{inputsystem:r,takef:C,noaNum:c,results:_,error:E,...Ne(l),store:V}}const yt=Ae(()=>{const r=a([]),c=L(()=>r.value);function _(V){r.value.push(V)}return{tilenoa:r,getNumber:c,addNoa:_}});function St(){const r=a();a([]);const c=a([]);let _=a([]);const V=a(""),E=a(""),{tilenoa:d,getNoa:R,addNoa:N}=yt(),T=G({noa:"",applicant:"",material:[],description:"",Table2:[],Table3:[],expiration_date:"",resistance:[],selection:""});let l="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilenoa";const{execute:C,then:y,data:B}=_e(l,{method:"GET"},{immediate:!0});function u(n){console.log(n),r.value=n,console.log(r.value),C().then(i=>(c.value=B.value.result,_.value=c.value.forEach((x,K)=>{let z=Number(r.value);if(x.NOA===z){if(console.log("In am In..."),T.applicant=x.applicant,T.material=x.AdhesiveMaterial,T.selection=x.AdhesiveMaterials,T.description=x.description,T.Table2=x.Table2,T.Table3=x.Table3,T.resistance=x.Resistance,console.log(x.AdhesiveMaterial),T.length===0)return;N(T),console.log(T,"System added")}}),_))}return{getTilenoa:u,tilenoa:d,getNoa:R,addNoa:N,responseMessage:V,noaNum:c,error:E,results:_,tileData:T}}const Et=Ae(()=>{const r=a([]),c=L(()=>r.value);function _(V){r.value.push(V)}return{tilenoas:r,getNumber:c,addNoa:_}});function Tt(){const r=a();a([]);const c=a([]);let _=a([]);const V=a(""),E=a(""),{tilenoas:d,getNoa:R,addNoa:N}=Et();let T="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilenoasingle";const{execute:l,then:C,data:y}=_e(T,{method:"GET"},{immediate:!0}),B=G({noa:"",applicant:"",material:[],description:"",Table2:[],Table3:[],expiration_date:"",resistance:[],selection:""});function u(n){console.log(n),r.value=n,console.log(r.value),l().then(i=>(c.value=y.value.result,_.value=c.value.forEach((x,K)=>{let z=Number(r.value);if(x.NOA===z){if(console.log("In am In..."),B.applicant=x.applicant,B.material=x.AdhesiveMaterial,B.selection=x.AdhesiveMaterials,B.description=x.description,B.Table2=x.Table2,B.Table3=x.Table3,B.resistance=x.Resistance,console.log(x.AdhesiveMaterial),B.length===0)return;N(B),console.log(B,"System added")}}),_))}return{getTilenoas:u,tilenoas:d,getNoa:R,addNoa:N,responseMessage:V,noaNum:c,error:E,results:_,tileDatas:B}}const Le=Ae(()=>{const r=a([]),c=a([]),_=a([]),V=L(()=>r.value),E=L(()=>c.value),d=L(()=>_.value);L(()=>tilenoa.value);function R(l){r.value.push(l)}function N(l){c.value.push(l)}function T(l){_.value.push(l)}return{slopes:r,heights:c,getSlopes:V,getZones:d,getHeight:E,zones:_,addDimzones:T,addDimslope:R,addDimheight:N}});function xt(){const r=a(""),c=a(),_=a(),V=a([]),E=a(),d=a(!1),R=a(null),N=a([]),T=a(),l=a(),C=G({table1:"",table2:"",table3:"",zn:[],zones:{lessfifteen:[],fifteen:[],twenty:[],twentyfive:[],thirty:[],thirtyfive:[]}}),{addDimzones:y,addDimslope:B,addDimheight:u}=Le();d.value=!0;let n="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/zonec2023";const{execute:i,then:x,data:K}=_e(n,{method:"GET"},{immediate:!1});let z=G({}),k=G({});const H={fifteen:15,twenty:20,twentyfive:25,thirty:30,thirtyfive:35,forty:40},pe=((M,A,b)=>Math.max(Math.min(M,Math.max(A,b)),Math.min(A,b)))(2,4.5,6),Y=((M,A,b)=>Math.max(Math.min(M,Math.max(A,b)),Math.min(A,b)))(4.5,6,12);function Q(M,A){c.value=M,_.value=A,r.value=Number(c.value),_.value=Number(_.value),r.value>=Y&&(console.log("Six is true"),re("table3")),pe<r.value&&r.value<Y&&(console.log("less than Six is true"),re("table2")),r.value<pe&&(console.log("less than 4.5 is true"),re("table1"))}function re(M){return N.value=M,V.value=i().then(A=>{N.value==="table3"&&(console.log("table3 executed"),E.value=K.value.result.WindExposureC2023_db.slp_six_twelve,console.log(E.value),console.log("table3",E.value),ue(r.value,_.value,E.value),B(r.value),u(_.value)),N.value==="table2"&&(console.log("table2 executed"),E.value=K.value.result.WindExposureC2023_db.slp_four_six,console.log("table2",E.value),ue(r.value,_.value,E.value),B(r.value),u(_.value)),N.value==="table1"&&(console.log("table1 executed"),E.value=K.value.result.WindExposureC2023_db.slp_two_four,console.log(E.value),ue(r.value,_.value,E.value),B(r.value),u(_.value))}),V.value}function ue(M,A,b){T.value=M,l.value=A,z=b,console.log(z),X(z)}function X(M){const A=M,b=Number(H.fifteen),j=Number(H.twenty),W=Number(H.twentyfive),$=Number(H.thirty),ee=Number(H.thirtyfive),Fe=Number(H.forty);console.log(typeof l.value,l.value,typeof j,j,typeof W,W),l.value<b?(z=A.lessfifteen,console.log("if 15 statement was executed"),Object.entries(z).map(U=>{console.log("Object statement was executed"),U[0];const p=U[1];C.zones.lessfifteen.push(p)}),k=C.zones.lessfifteen,console.log(k),y(k)):l.value>=b&&l.value<j?(console.log(l.value,j,b),z=A.fifteen,console.log("if statement for 15 to 20 was executed"),Object.entries(z).map(U=>{console.log("Object statement was executed"),U[0];const p=U[1];C.zones.fifteen.push(p)}),k=C.zones.fifteen,console.log(k),y(k)):l.value<W&&l.value>=j?(console.log(l.value,j,W),z=A.twenty,console.log("if 22 statement was executed"),Object.entries(z).map(U=>{U[0];const p=U[1];C.zones.twenty.push(p)}),k=C.zones.twenty,console.log(k),y(k)):l.value<$&&l.value>=W?(console.log(l.value,$,W),z=A.twentyfive,console.log("if 25 statement was executed"),Object.entries(z).map(U=>{console.log("Object statement was executed"),U[0];const p=U[1];C.zones.twentyfive.push(p)}),k=C.zones.twentyfive,console.log(k),y(k)):l.value<ee&&l.value>=$?(z=A.thirty,console.log("if statement 32 was executed"),Object.entries(z).map(U=>{console.log("Object statement was executed"),U[0];const p=U[1];C.zones.thirty.push(p)}),k=C.zones.thirty,console.log(k),y(k)):l.value<Fe&&l.value>=ee&&(z=A.thirtyfive,console.log(l.value,$,ee),Object.entries(z).map(U=>{console.log("Object statement was executed"),U[0];const p=U[1];C.zones.thirtyfive.push(p)}),k=C.zones.thirtyfive,console.log(k),y(k))}return d.value=!1,{type:N,error:R,newSlp:T,tb:k,processData:X,newHgt:l,slopeSelection:ue,loading:d,zoneData:E,slope:r,tables:C,results:V,getData:Q}}const bt={id:"tile",class:"flex flex-col w-full gap-2 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"10px"}},wt={class:"w-64 gap-2 mt-3 space-y-2",style:{"margin-left":"20px"}},Vt={class:"w-64 mt-6 ...",style:{"margin-left":"20px"}},Ct=t("label",{for:"slope"},"Slope",-1),At=t("label",{class:"px-2",style:{color:"red"}},"*",-1),kt={class:"w-64 mt-6 space-y-2",style:{"margin-left":"20px"}},Ft=t("label",{for:"height"},"Height",-1),Bt=t("label",{class:"px-2",style:{color:"red"}},"*",-1),zt={class:"w-64 mt-6 space-y-2",style:{"margin-left":"20px"}},Pt=t("label",{for:"area"},"Area of Tile",-1),Ut={class:"w-64 mt-3 ...",style:{"margin-left":"20px"}},Nt=t("label",{for:"perimeter"},"Roof Permeter(a) = 4h",-1),Mt={class:"card md:w-1/2 grid gap-1 grid-cols-1"},It=t("label",{for:"underlaymentType"},"Select Underlayment (UDL) and/or Tile Capsheet",-1),Ot={class:"w-96",style:{"margin-left":"2px"}},Lt={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},Gt=t("label",{for:"udlInput"},"Fastened UDL NOA Number",-1),Rt={class:"w-96",style:{"margin-left":"2px"}},$t={class:"w-64 gap-2 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},qt=t("label",{for:"saInput"},"S/A Membrane NOA Number",-1),Ht={class:"w-56 flex flex-col gap-2",style:{"margin-left":"100px"}},Wt=t("label",{style:{color:"red"}},"Select Exposure",-1),Zt={class:"flex items-center space-x-2"},Yt={class:"field-radiobutton space-x-4 gap-2"},Jt=t("label",{for:"option3"},"C",-1),Kt={class:"field-radiobutton space-x-4 gap-2"},Qt=t("label",{for:"option4"},"D",-1),Xt=t("label",{style:{color:"red"}},"Select a Paddy Category",-1),jt={class:"flex items-center"},el={class:"field-radiobutton space-x-3 gap-2"},tl=t("label",{for:"option1"},"Single",-1),ll={class:"field-radiobutton space-x-3 gap-2"},sl=t("label",{for:"option2"},"Double",-1),al={class:"w-96",style:{"margin-left":"3px"}},ol={class:"w-64 gap-4 mt-1 space-y-1 mb-2",style:{"margin-left":"20px"}},nl=t("label",{for:"tilenoa"},"Tile Noas",-1),il={class:"card md:w-full gap-4 mt-10 bg-white shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},rl={class:"columns-3 flex flex-row space-x-20 space-y-12",style:{"margin-left":"2px"}},ul={class:"flex flex-row space-x-20"},cl={class:"w-96 flex flex-col gap-2"},dl=t("label",{for:"manufacturer"},"(UDL) NOA Applicant",-1),pl={class:"flex flex-col gap-2"},ml=t("label",{for:"material"},"(UDL) Material",-1),_l={class:"w-128 flex flex-col gap-2"},fl=t("label",{for:"anchor"},"Anchor Base Sheet",-1),vl={class:"w-full flex flex-row space-x-30 space-y-12",style:{"margin-left":"2px"}},hl={class:"break-after-column flex flex-row space-x-8 space-y-4",style:{"margin-left":"2px"}},gl={class:"w-56 flex flex-col gap-2 mt-3"},Dl=t("label",{style:{color:"red"}},"Select System E *",-1),yl={class:"w-128 flex flex-col gap-2"},Sl=t("label",{for:"description"},"(UDL) Description",-1),El={class:"flex flex-col gap-2"},Tl=t("label",{for:"designPressure"},"Design psf:",-1),xl={class:"flex flex-row space-x-12 space-y-6",style:{"margin-left":"2px"}},bl={class:"flex flex-row space-x-20"},wl={class:"flex flex-col gap-2"},Vl=t("label",{for:"saapplicant"},"S/A Applicant",-1),Cl={class:"flex flex-col gap-2"},Al=t("label",{for:"samaterial"},"S/A Material Type",-1),kl={class:"flex flex-col gap-2"},Fl=t("label",{style:{color:"red"}},"Select System F *",-1),Bl={class:"w-128 flex flex-col gap-2"},zl=t("label",{for:"sadescription"},"S/A Description",-1),Pl={class:"flex flex-col gap-2"},Ul=t("label",{for:"designpressure"},"Design psf:",-1),Nl={class:"flex flex-row mt-8 space-x-20",style:{"margin-left":"1px"}},Ml={class:"w-96 flex flex-col gap-2"},Il=t("label",{for:"manufacturer"},"Tile Applicant",-1),Ol={class:"w-128 flex flex-col gap-2"},Ll=t("label",{for:"material"},"Tile Description",-1),Gl={class:"w-128 flex flex-col gap-2"},Rl=t("label",{for:"material"},"Tile Adhesive Material",-1),$l={class:"flex flex-wrap gap-1 mt-10",style:{"margin-left":"6px"}},ql={class:"lg:w-full min-h-[10px] flex flex-row gap-18",style:{"margin-left":"10px"}},Hl={width:"100%",align:"left"},Wl={valign:"middle"},Zl={style:{margin:"auto","font-size":"large","font-weight":"bold","font-family":"arial"}},Yl=t("td",null,"Zone 1:",-1),Jl=t("td",null,"Zone 2:",-1),Kl=t("td",null,"Zone 3:",-1),Ql={__name:"InputTile",setup(r){const c=a(null),_=Oe(),V=Ie(),{getTilenoa:E,tileData:d}=St(),{takef:R}=Dt(),{getV:N}=gt(),{getTilenoas:T,tileDatas:l}=Tt(),{zones:C}=Le(),y=G({manufacturer:"",material:[],description:"",resistance:[],Table2:[],Table3:[]}),B=_t(),{roofList:u}=at(B);ot(()=>{u.value.forEach((o,e)=>{console.log(o.item,e),o.item==="Adhesive Set Tile"&&(console.log(o.dim4),b.area=o.dim4)})});const n=G({manufacturer:"",material:"",system:[],designpressure:[],description:[],Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",arrDesignPressure:[]}),i=G({noa:"",manufacturer:"",material:"",system:[],designPressure:[],Anchor_Base_Sheet:[],TileCap_Sheet_Description:[],Anchor_Base_Sheet_E1:"",Anchor_Base_Sheet_E2:"",Anchor_Base_Sheet_E3:"",Anchor_Base_Sheet_E4:"",Anchor_Base_Sheet_E5:"",Anchor_Base_Sheet_E6:"",Anchor_Base_Sheet_E7:"",TileCap_Sheet_Description:[],TileCap_Sheet_Description_E1:"",TileCap_Sheet_Description_E2:"",TileCap_Sheet_Description_E3:"",TileCap_Sheet_Description_E4:"",TileCap_Sheet_Description_E5:"",TileCap_Sheet_Description_E6:"",TileCap_Sheet_Description_E7:"",arrDesignPressure:[]});let x=a(_.$state.tilefinput),K=a(V.$state.tilesysEinput),z=a(V.$state.tilesysEinput),k=a(),H=a(d),Se=a(l),pe=a();const ke=a(!1);let Y=a(null),Q=a(null);const re=a(),ue=a([{name:"--Select Deck Type--"},{name:'- 5/8" Plywood -'},{name:'- 3/4" Plywood -'},{name:'- 1" x 6" T & G -'},{name:'- 1" x 8" T & G -'},{name:'- Existing 1/2" Plywood -'}]),X=a([]);let M=a(""),A=a("");const b=G({area:"",per:"",height:"",slope:""}),j=a(.4);function W(){b.height=A.value,b.slope=M.value,b.per=(b.height*j.value).toFixed(2),U(b.slope,b.height)}L(()=>{W()});const $=a(null);function ee(){console.log($.value)}const{tables:Fe,getData:U}=xt(),p=G({zone:"",lambda1:"",mg1:"",mr1:"",mf1:""}),S=G({zone:"",lambda2:"",mg2:"",mr2:"",mf2:""}),w=G({zone:"",lambda3:"",mg3:"",mr3:"",mf3:""});De(p,ee,S);function Be(){K.value.length!==null&&K.value.forEach((o,e)=>{i.manufacturer=o.systemDataE.manufacturer,i.material=o.systemDataE.material,i.system=o.systemDataE.system,i.Anchor_Base_Sheet=o.systemDataE.Anchor_Base_Sheet})}const Ge=a(),Re=a(),$e=L(()=>{be(),Be(),W(),he()}),Ee=a(null),ze=a(null),Te=a(null),Pe=a(null);let fe=a(""),le=a(!1),ce=a(!1),te=a(!1),de=a();const qe=a([{selectedBasesheet:"-- Select Tile Capsheet/Underlayment --",key:0},{selectedBasesheet:"Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30",key:1},{selectedBasesheet:"(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F",key:2},{selectedBasesheet:"(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E",key:3}]);De(de,()=>{X.value=de.value.key,X.value===1?(te.value=!0,fe.value=!1,le.value=!1,ce.value=!1):X.value===2?(te.value=!0,fe.value=!1,le.value=!1,ce.value=!0):X.value===3?(te.value=!0,fe.value=!0,le.value=!0,ce.value=!1):X.value===0&&(fe.value=!1,le.value=!1,ce.value=!1,te.value=!1)});const Z={two:2,three:3,four:4,five:5,six:6,seven:7};a(!0),nt(te,$e);const He=a(!1);function ve(){x.value.forEach((o,e)=>{n.Description_F1=o.systemData.Description_F1,n.Description_F2=o.systemData.Description_F2,n.Description_F3=o.systemData.Description_F3,n.Description_F4=o.systemData.Description_F4,n.Description_F5=o.systemData.Description_F5,n.Description_F6=o.systemData.Description_F6,n.Description_F7=o.systemData.Description_F7,n.arrDesignPressure=o.systemData.designPressure,o.systemData.system.length>1?Ze():n.system=o.systemData.system})}function We(){z.value.forEach((o,e)=>{i.Maps=o.systemDataE.Maps,i.Anchor_Base_Sheet_E1=o.systemDataE.Anchor_Base_Sheet_E1,i.Anchor_Base_Sheet_E2=o.systemDataE.Anchor_Base_Sheet_E2,i.Anchor_Base_Sheet_E3=o.systemDataE.Anchor_Base_Sheet_E3,i.Anchor_Base_Sheet_E4=o.systemDataE.Anchor_Base_Sheet_E4,i.Anchor_Base_Sheet_E5=o.systemDataE.Anchor_Base_Sheet_E5,i.Anchor_Base_Sheet_E6=o.systemDataE.Anchor_Base_Sheet_E6,i.Anchor_Base_Sheet_E7=o.systemDataE.Anchor_Base_Sheet_E7,i.TileCap_Sheet_Description_E1=o.systemDataE.TileCap_Sheet_Description_E1,i.TileCap_Sheet_Description_E2=o.systemDataE.TileCap_Sheet_Description_E2,i.TileCap_Sheet_Description_E3=o.systemDataE.TileCap_Sheet_Description_E3,i.TileCap_Sheet_Description_E4=o.systemDataE.TileCap_Sheet_Description_E4,i.TileCap_Sheet_Description_E5=o.systemDataE.TileCap_Sheet_Description_E5,i.TileCap_Sheet_Description_E6=o.systemDataE.TileCap_Sheet_Description_E6,i.TileCap_Sheet_Description_E7=o.systemDataE.TileCap_Sheet_Description_E7,i.arrDesignPressure=o.systemDataE.designPressure,o.systemDataE.system.length>1||(i.system=o.systemDataE.system,i.description=o.systemDataE.description,i.designPressure=o.systemDataE.designPressure)})}function Ze(){n.system=n.system}const g=a(!1),Ye=a(""),Je=a(null);function he(){console.log(c.value),c.value==="single"&&(g.value=!0)}De(he,ee,()=>{Ye.value=c.value,console.log(c.value,$.value)});function xe(o){console.log(typeof o.target.value),H.value=Q.value,Se.value=Q.value,k.value=Y.value,pe.value=udlInput.value,H.value!==null&&(console.log(c.value,"Outside"),c.value==="single"?(console.log(c.value,"Entered"),T(Se.value)):E(H.value)),Y.value!==null&&R(k.value),udlInput.value!==null&&N(pe.value)}function be(){x.value.length!==null&&x.value.forEach((o,e)=>{n.manufacturer=o.systemData.manufacturer,n.material=o.systemData.material,n.system=o.systemData.system}),H.value.length!==null&&(y.manufacturer=g.value===!0?l.applicant:d.applicant,y.description=g.value===!0?l.description:d.description,console.log(C._value,y.manufacturer),C._value.forEach((o,e)=>{p.zone=o[0],S.zone=o[1],w.zone=o[2]}))}let se=a(!1),q=a(!1);function Ke(){console.log(d,l),y.material=g.value===!0?l.material:d.material,y.paddies=g.value===!0?l.resistance:d.resistance,console.log(y.material,g.value,l.material),p.lambda1=g.value===!0?l.Table2.Direct_Deck:d.Table2.Direct_Deck,S.lambda2=g.value===!0?l.Table2.Direct_Deck:d.Table2.Direct_Deck,w.lambda3=g.value===!0?l.Table2.Direct_Deck:d.Table2.Direct_Deck;const e=((ne,ie,s)=>Math.max(Math.min(ne,Math.max(ie,s)),Math.min(ie,s)))(2,Number(b.slope),12);console.log(e),e<=Z.three||e===Z.three||e<Z.four?(console.log("Is Less"),p.mg1=g.value===!0?l.Table3.two.Direct_Deck:d.Table3.two.Direct_Deck,S.mg2=g.value===!0?l.Table3.two.Direct_Deck:d.Table3.two.Direct_Deck,w.mg3=g.value===!0?l.Table3.two.Direct_Deck:d.Table3.two.Direct_Deck):e<Z.five||e===Z.four?(console.log("Is Less"),p.mg1=g.value===!0?l.Table3.four.Direct_Deck:d.Table3.four.Direct_Deck,S.mg2=g.value===!0?l.Table3.four.Direct_Deck:d.Table3.four.Direct_Deck,w.mg3=g.value===!0?l.Table3.four.Direct_Deck:d.Table3.four.Direct_Deck):e===Z.five||e<Z.six?(console.log("Is Less"),p.mg1=g.value===!0?l.Table3.five.Direct_Deck:d.Table3.five.Direct_Deck,S.mg2=g.value===!0?l.Table3.five.Direct_Deck:d.Table3.five.Direct_Deck,w.mg3=g.value===!0?l.Table3.five.Direct_Deck:d.Table3.five.Direct_Deck):e==Z.six||e<Z.seven?(p.mg1=g.value===!0?l.Table3.six.Direct_Deck:d.Table3.six.Direct_Deck,S.mg2=g.value===!0?l.Table3.six.Direct_Deck:d.Table3.six.Direct_Deck,w.mg3=g.value===!0?l.Table3.six.Direct_Deck:d.Table3.six.Direct_Deck):e>=Z.seven&&(console.log("Is Less"),p.mg1=g.value===!0?l.Table3.seven.Direct_Deck:d.Table3.seven.Direct_Deck,S.mg2=g.value===!0?l.Table3.seven.Direct_Deck:d.Table3.seven.Direct_Deck,w.mg3=g.value===!0?l.Table3.seven.Direct_Deck:d.Table3.seven.Direct_Deck);const h=L(()=>p.zone*p.lambda1);console.log(h.value);const f=L(()=>S.zone*S.lambda2);console.log(f.value);const P=L(()=>w.zone*w.lambda3);console.log(h.value,f.value,P.value),p.mr1=L(()=>(h.value-p.mg1).toFixed(2)),S.mr2=L(()=>(f.value-S.mg2).toFixed(2)),w.mr3=L(()=>(P.value-w.mg3).toFixed(2))}const ae=a([]),J=a([]);function oe(o){console.log(o.value);let e=g.value===!0?l.selection:d.selection;Je.value=Object.entries(e).map(h=>{const f=h[0],P=h[1];ae.value.push(f),J.value.push(P),console.log(P,f),console.log(ae.value,J.value),console.log(J.value[0],J.value[1]),console.log(ae.value)});for(let h=0;h<ae.value.length;h++){console.log(ae.value[h],J.value[h],h),ae.value[h]===o.value&&(console.log(ae.value[h],J.value[h]),p.mf1=J.value[h],S.mf2=J.value[h],w.mf3=J.value[h]);const f=we(p.mf1),P=we(p.mf2),ne=we(p.mf3);console.log(f.value),(p.mr1>f.value||o.value)&&(console.log("I am in mr greater",q.value),q=!0),(p.mr1<f.value||o.value)&&(se.value=!0,q=!1),S.mr2>P.value?(console.log("I am in mr greater",q.value),q=!0):(se.value=!0,q=!1),w.mr3>ne.modelValue?(console.log("I am in mr greater",q.value),q=!0):(se.value=!0,q=!1)}}function Qe(){Re.value=Object.entries(Ee).map(o=>{const e=o[1];e==="F1"&&(n.description=n.Description_F1,n.designpressure=n.arrDesignPressure[0]),e==="F2"&&(n.description=n.Description_F2,n.designpressure=n.arrDesignPressure[1]===null?n.arrDesignPressure[0]:n.arrDesignPressure[1],console.log(n.arrDesignPressure)),e==="F3"&&(n.description=n.Description_F3,n.designpressure=n.arrDesignPressure[2]),e==="F4"&&(n.description=n.Description_F4,n.designpressure=n.arrDesignPressure[3]),e==="F5"&&(n.description=n.Description_F5,n.designpressure=n.arrDesignPressure[4]),e==="F6"&&(n.description=n.Description_F6,n.designpressure=n.arrDesignPressure[5],e==="F7"&&(n.description=n.Description_F7,n.designpressure=n.arrDesignPressure[6]))})}function ge(){Ge.value=Object.entries(Te).map(o=>{const e=o[1];console.log(o[1]),(e==="E1"||e==="E8")&&(i.TileCap_Sheet_Description=i.TileCap_Sheet_Description_E1,i.designPressure=i.arrDesignPressure[0]),(e==="E2"||e==="E9")&&(i.TileCap_Sheet_Description=i.TileCap_Sheet_Description_E2,i.designPressure=i.arrDesignPressure[1]),(e==="E3"||e==="E10")&&(i.TileCap_Sheet_Description=i.TileCap_Sheet_Description_E3,i.designPressure=i.arrDesignPressure[2]),(e==="E4"||e==="E11")&&(i.TileCap_Sheet_Description=i.TileCap_Sheet_Description_E4,i.designPressure=i.arrDesignPressure[3]),(e==="E5"||e==="E12")&&(i.TileCap_Sheet_Description=i.TileCap_Sheet_Description_E5,i.designPressure=i.arrDesignPressure[4]),(e==="E6"||e==="E13")&&(i.TileCap_Sheet_Description=i.TileCap_Sheet_Description_E6,i.designPressure=i.arrDesignPressure[5],(e==="E7"||e==="E14")&&(i.TileCap_Sheet_Description=i.TileCap_Sheet_Description_E7,i.designPressure=i.arrDesignPressure[6]))})}const Xe=()=>{const o=document.getElementById("tile");console.log(o),ft(o).then(h=>{const f=h.toDataURL("image/png"),P=new vt;P.addImage(f,"PNG",10,10,190,0);const ne=P.output("blob");e(ne)});const e=async h=>{try{const P=await(await window.showSaveFilePicker({suggestedName:"tile.pdf",types:[{description:"PDF file",accept:{"application/pdf":[".pdf"]}}]})).createWritable();await P.write(h),await P.close(),console.log("PDF saved successfully without popping download dialog!")}catch(f){console.error("Error saving file:",f)}}};return pt(async()=>{await mt(ke).changed(),Xe(),alert("Generated, PDF!")}),De(ve,q,se),(o,e)=>{const h=st,f=lt,P=tt,ne=et,ie=je;return Ce(),Me(ct,null,[t("div",bt,[t("div",wt,[m(h,{modelValue:re.value,"onUpdate:modelValue":e[0]||(e[0]=s=>re.value=s),options:ue.value,optionLabel:"name",placeholder:"Select a Deck Type",class:"w-full md:w-56"},null,8,["modelValue","options"])]),t("div",Vt,[Ct,At,m(f,{id:"slope",modelValue:D(M),"onUpdate:modelValue":e[1]||(e[1]=s=>me(M)?M.value=s:M=s),type:"text",placeholder:"slope",invalid:o.slope===null},null,8,["modelValue","invalid"])]),t("div",kt,[Ft,Bt,v(m(f,{id:"height",modelValue:D(A),"onUpdate:modelValue":e[2]||(e[2]=s=>me(A)?A.value=s:A=s),type:"text",placeholder:"height",onChange:W},null,8,["modelValue"]),[[ie,"Press Enter after value",void 0,{bottom:!0}]])]),t("div",zt,[Pt,m(f,{id:"area",modelValue:b.area,"onUpdate:modelValue":e[3]||(e[3]=s=>b.area=s),type:"text",placeholder:"area"},null,8,["modelValue"])]),t("div",Ut,[Nt,m(f,{id:"perimeter",modelValue:b.per,"onUpdate:modelValue":e[4]||(e[4]=s=>b.per=s),type:"text",placeholder:" ",onChange:W},null,8,["modelValue"])]),t("div",Mt,[It,m(h,{modelValue:D(de),"onUpdate:modelValue":e[5]||(e[5]=s=>me(de)?de.value=s:de=s),options:qe.value,optionLabel:"selectedBasesheet",placeholder:"make selection",onClick:ve},null,8,["modelValue","options"])]),m(ht),v(t("div",Ot,[t("div",Lt,[Gt,v(m(f,{id:"udlInput",modelValue:o.udlInput,"onUpdate:modelValue":e[6]||(e[6]=s=>o.udlInput=s),placeholder:"00000000",onInput:xe,onChange:Be},null,8,["modelValue"]),[[ie,"Press Enter after value",void 0,{bottom:!0}]])])],512),[[O,D(le)]]),v(t("div",Rt,[t("div",$t,[qt,v(m(f,{id:"saInput",modelValue:D(Y),"onUpdate:modelValue":e[7]||(e[7]=s=>me(Y)?Y.value=s:Y=s),placeholder:"00000000",onInput:xe,onChange:be},null,8,["modelValue"]),[[ie,"Press Enter after value",void 0,{bottom:!0}]])])],512),[[O,D(ce)]]),v(t("div",Ht,[Wt,t("div",Zt,[t("div",Yt,[m(D(ye),{inputId:"option3",name:"option",value:"c",variant:"filled",invalid:$.value===null,modelValue:$.value,"onUpdate:modelValue":e[8]||(e[8]=s=>$.value=s),onUpdate:ee},null,8,["invalid","modelValue"]),Jt]),t("div",Kt,[m(D(ye),{inputId:"option4",name:"option",value:"d",variant:"filled",invalid:$.value===null,modelValue:$.value,"onUpdate:modelValue":e[9]||(e[9]=s=>$.value=s),onUpdate:ee},null,8,["invalid","modelValue"]),Qt])]),m(D(Ve)),Xt,t("div",jt,[t("div",el,[m(D(ye),{inputId:"option1",name:"options",value:"single",variant:"filled",invalid:c.value===null,modelValue:c.value,"onUpdate:modelValue":e[10]||(e[10]=s=>c.value=s),onUpdate:he},null,8,["invalid","modelValue"]),tl]),t("div",ll,[m(D(ye),{style:{"margin-left":"5px"},inputId:"option2",name:"options",value:"double",variant:"filled",invalid:c.value===null,modelValue:c.value,"onUpdate:modelValue":e[11]||(e[11]=s=>c.value=s),onUpdate:he},null,8,["invalid","modelValue"]),sl])])],512),[[O,D(te)]]),v(t("div",al,[t("div",ol,[nl,v(m(f,{id:"tilenoa",modelValue:D(Q),"onUpdate:modelValue":e[12]||(e[12]=s=>me(Q)?Q.value=s:Q=s),placeholder:"00000000",onChange:xe,onClick:be},null,8,["modelValue"]),[[ie,"Press Enter after value",void 0,{bottom:!0}]])])],512),[[O,D(te)]])]),m(D(Ve)),m(D(Ve)),t("div",il,[t("div",rl,[v(t("div",ul,[t("div",cl,[dl,m(f,{id:"manufacturer",modelValue:i.manufacturer,"onUpdate:modelValue":e[13]||(e[13]=s=>i.manufacturer=s)},null,8,["modelValue"])]),t("div",pl,[ml,m(f,{id:"material",modelValue:i.material,"onUpdate:modelValue":e[14]||(e[14]=s=>i.material=s)},null,8,["modelValue"])]),t("div",_l,[fl,m(h,{modelValue:Pe.value,"onUpdate:modelValue":e[15]||(e[15]=s=>Pe.value=s),options:i.Anchor_Base_Sheet,placeholder:"",onClick:We,onChange:ge},null,8,["modelValue","options"])])],512),[[O,D(le)]])]),t("div",vl,[v(t("div",hl,[t("div",gl,[Dl,m(h,{modelValue:Te.value,"onUpdate:modelValue":e[16]||(e[16]=s=>Te.value=s),options:i.system,placeholder:"",onClick:ve,onChange:ge},null,8,["modelValue","options"])]),t("div",yl,[Sl,m(f,{id:"description",modelValue:i.TileCap_Sheet_Description,"onUpdate:modelValue":e[17]||(e[17]=s=>i.TileCap_Sheet_Description=s),onChange:ge},null,8,["modelValue"])]),t("div",El,[Tl,m(f,{id:"designPressure",modelValue:i.designPressure,"onUpdate:modelValue":e[18]||(e[18]=s=>i.designPressure=s),onChange:ge},null,8,["modelValue"])])],512),[[O,D(le)]])]),t("div",xl,[v(t("div",bl,[t("div",wl,[Vl,m(f,{id:"saapplicant",modelValue:n.manufacturer,"onUpdate:modelValue":e[19]||(e[19]=s=>n.manufacturer=s)},null,8,["modelValue"])]),t("div",Cl,[Al,m(f,{id:"saaterial",modelValue:n.material,"onUpdate:modelValue":e[20]||(e[20]=s=>n.material=s)},null,8,["modelValue"])]),t("div",kl,[Fl,m(h,{modelValue:Ee.value,"onUpdate:modelValue":e[21]||(e[21]=s=>Ee.value=s),options:n.system,placeholder:"",onClick:ve,onChange:Qe},null,8,["modelValue","options"])]),t("div",Bl,[zl,m(f,{id:"capsheetdescription",modelValue:n.description,"onUpdate:modelValue":e[22]||(e[22]=s=>n.description=s)},null,8,["modelValue"])]),t("div",Pl,[Ul,m(f,{id:"designpressure",modelValue:n.designpressure,"onUpdate:modelValue":e[23]||(e[23]=s=>n.designpressure=s),"aria-describedby":"username-help"},null,8,["modelValue"])])],512),[[O,D(ce)]])]),v(t("div",Nl,[t("div",Ml,[Il,m(f,{id:"manufacturer",modelValue:y.manufacturer,"onUpdate:modelValue":e[24]||(e[24]=s=>y.manufacturer=s)},null,8,["modelValue"])]),t("div",Ol,[Ll,m(f,{id:"description",modelValue:y.description,"onUpdate:modelValue":e[25]||(e[25]=s=>y.description=s)},null,8,["modelValue"])]),t("div",Gl,[Rl,m(h,{modelValue:ze.value,"onUpdate:modelValue":e[26]||(e[26]=s=>ze.value=s),options:y.material,placeholder:"make a selection",onClick:Ke,onChange:oe},null,8,["modelValue","options"])])],512),[[O,D(te)]]),t("div",$l,[t("div",ql,[t("table",Hl,[t("tbody",null,[t("tr",null,[t("td",Wl,[t("table",Zl,[t("tbody",null,[t("tr",null,[Yl,t("td",null,[v(t("input",{"onUpdate:modelValue":e[27]||(e[27]=s=>p.zone=s),readonly:"",size:"4",name:"p1",value:""},null,512),[[I,p.zone]]),F(" x λ  ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[28]||(e[28]=s=>p.lambda1=s),readonly:"",size:"4",name:"lambda1",value:""},null,512),[[I,p.lambda1]]),F(" - Mg: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[29]||(e[29]=s=>p.mg1=s),readonly:"",size:"4",name:"mg1",value:""},null,512),[[I,p.mg1]]),F(" = Mr1: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[30]||(e[30]=s=>p.mr1=s),readonly:"",size:"4",name:"mr1",value:""},null,512),[[I,p.mr1]]),F(" NOA Mf: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[31]||(e[31]=s=>p.mf1=s),readonly:"",size:"4",name:"mf1",value:""},null,512),[[I,p.mf1]]),F("  ")]),v(m(P,{size:"small",icon:"pi pi-check",severity:"success",onChange:oe},null,512),[[O,D(se)]]),F("  "),v(m(P,{size:"small",icon:"pi pi-times",severity:"danger",onChange:oe},null,512),[[O,D(q)]]),F("  ")]),t("tr",null,[Jl,t("td",null,[v(t("input",{"onUpdate:modelValue":e[32]||(e[32]=s=>S.zone=s),readonly:"",size:"4",name:"p2",value:""},null,512),[[I,S.zone]]),F(" x λ  ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[33]||(e[33]=s=>S.lambda2=s),readonly:"",size:"4",name:"lambda2",value:""},null,512),[[I,S.lambda2]]),F(" - Mg: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[34]||(e[34]=s=>S.mg2=s),readonly:"",size:"4",name:"mg2",value:""},null,512),[[I,S.mg2]]),F(" = Mr2: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[35]||(e[35]=s=>S.mr2=s),readonly:"",size:"4",name:"mr2",value:""},null,512),[[I,S.mr2]]),F(" NOA Mf: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[36]||(e[36]=s=>S.mf2=s),readonly:"",size:"4",name:"mf32",value:""},null,512),[[I,S.mf2]]),F(" ")]),v(m(P,{size:"small",icon:"pi pi-check",severity:"success",onChange:oe},null,512),[[O,D(se)]]),F("  "),v(m(P,{size:"small",icon:"pi pi-times",severity:"danger",onChange:oe},null,512),[[O,D(q)]]),F("  ")]),t("tr",null,[Kl,t("td",null,[v(t("input",{"onUpdate:modelValue":e[37]||(e[37]=s=>w.zone=s),readonly:"",size:"4",name:"p3",value:""},null,512),[[I,w.zone]]),F(" x λ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[38]||(e[38]=s=>w.lambda3=s),readonly:"",size:"4",name:"lambda3",value:""},null,512),[[I,w.lambda3]]),F(" - Mg: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[39]||(e[39]=s=>w.mg3=s),readonly:"",size:"4",name:"mg5",value:""},null,512),[[I,w.mg3]]),F(" = Mr3: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[40]||(e[40]=s=>w.mr3=s),readonly:"",size:"4",name:"mr3",value:""},null,512),[[I,w.mr3]]),F(" NOA Mf: ")]),t("td",null,[v(t("input",{"onUpdate:modelValue":e[41]||(e[41]=s=>w.mf3=s),readonly:"",size:"4",name:"mf3",value:""},null,512),[[I,w.mf3]]),F(" ")]),v(m(P,{size:"small",icon:"pi pi-check",severity:"success",onChange:oe},null,512),[[O,D(se)]]),F("  "),v(m(P,{size:"small",icon:"pi pi-times",severity:"danger",onChange:oe},null,512),[[O,D(q)]]),F("  ")]),He.value?(Ce(),it(ne,{key:0,severity:"error",life:3e3},{default:rt(()=>[F("Select Another Material")]),_:1})):ut("",!0)])])])])])])])])])],64)}}},Xl={id:"tile",class:"card w-full space-y-1",style:{"margin-left":"20px"}},jl={__name:"Tile",setup(r){let c=a(null);function _(){console.log(c)}return(V,E)=>(Ce(),Me("div",Xl,[m(Ql,{slopeEntered:D(c),style:{"margin-left":"2px"},onChange:_},null,8,["slopeEntered"])]))}},fs=dt(jl,[["__scopeId","data-v-9e75fe87"]]);export{fs as default};