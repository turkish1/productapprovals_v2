import{s as jl}from"./index-CvRNTRHp.js";import{s as Ye}from"./index-DiEwfU-M.js";import{s as we}from"./index-aKk477FY.js";import{_ as _l}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{r as n,c as j,d as se,e as _,i as pe,f as e,p as ml,j as hl,q as Gl,a as Z,a9 as $,au as Jl,n as Ql,s as fl,o as el,w as Ve,aw as Wl,a7 as O,am as y,g as d,ap as A,k as h,l as Ce,t as Je,z as _e,ax as pl,h as Qe,y as We,F as ll,m as Xl,aq as N,az as Yl}from"./index-CgNQnJ6L.js";import{u as vl}from"./roofList-BrSQlseT.js";import{s as et,A as lt}from"./index-DNHJpOaw.js";import{T as tt}from"./index-vwj9G8Jb.js";import{s as st}from"./index-DuTs0ifl.js";import{s as ot}from"./index-DnGreqLG.js";import{s as at}from"./index-CM5QBXxM.js";import{_ as nt}from"./DripEdgeComponent-lQ6bQ7WR.js";import{b as it,d as rt,c as ut,u as ct,e as dt,f as Xe,s as pt,g as _t}from"./use-multiTile-DIZ691ik.js";import{u as mt}from"./use-tileMechanical-pYZvMT-d.js";import{u as ht}from"./tilesysfStore-DUqwa6rE.js";import"./index-CYYWrO-X.js";import"./index-Dyb14ImA.js";import"./index-D6IC_tKW.js";import"./index-B2u7HEDz.js";import"./index-DL8GpLhZ.js";import"./index-CF-4BZst.js";import"./useAxios-BA6bsTvR.js";import"./dripEdgeStore-B8Vvtl0V.js";const ie=E=>(ml("data-v-9378eef3"),E=E(),hl(),E),ft={class:"card flex justify-center"},vt=ie(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-8 ..."},[e("p",{class:"text-center text-red-600"},"mEPermit Application")],-1)),gt=ie(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[e("p",{class:"text-center text-red-600"},"High Velocity Hurricane Zone (HVHZ)")],-1)),yt=ie(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[e("p",{class:"text-center text-red-600"},"Concrete & Clay Roof Tiles")],-1)),Et=ie(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-16 ..."},[e("p",{class:"text-center text-red-600"}," The tile roof system and its components shall be installed in strict compliance with the FBC 2023 HVHZ portions of Chapter 15, the HVHZ Tile Application Standards: RAS-119, RAS-120 & RAS-127 and the submitted MDC Notice of Acceptance(s). ")],-1)),St=ie(()=>e("div",{class:"grid grid-cols-1 gap-2 place-content-center h-12 ..."},[e("p",{class:"text-center text-red-600"},"The mePermit applicant agrees to comply with these installation requirements when obtaining this permit.")],-1)),Dt={class:"flex justify-end gap-2"},xt=ie(()=>e("label",{class:"ml-2"}," I Agree",-1)),Tt={__name:"AgreementsDialogMechTile",setup(E){const C=n(!0),q=n(null);return(v,w)=>{const z=we,V=Ye,X=jl;return j(),se("div",ft,[_(X,{visible:C.value,"onUpdate:visible":w[2]||(w[2]=U=>C.value=U),modal:"",header:"Terms Of Use",style:{width:"70rem"}},{default:pe(()=>[vt,_(z),gt,yt,Et,St,e("div",Dt,[xt,_(V,{modelValue:v.agreement,"onUpdate:modelValue":w[0]||(w[0]=U=>v.agreement=U),value:"1",invalid:q.value===null,onClick:w[1]||(w[1]=U=>C.value=!1)},null,8,["modelValue","invalid"])])]),_:1},8,["visible"])])}}},bt=_l(Tt,[["__scopeId","data-v-9378eef3"]]),wt=Gl("tileMechInput",{state:()=>({tileMechInput:[],id:0}),actions:{addSystem(E){this.tileMechInput.push({tileMechNumber:E,completed:!1})},reset(){this.$reset()}},getters:{tileMechNumber:E=>E.tileMechNumber}});function Vt(){let E=n([]);const C=wt(),q=n(""),v=Z({noa:[]});function w(){X()}const z=$(()=>"https://tpqi7lyaja.execute-api.us-east-1.amazonaws.com/mechanicalTileApi/mechanicalTileApi"),{data:V}=Jl(z).get().json(),X=async()=>{v.noa=V,C.addSystem(v),console.log("System added")};return{tileMechNumber:v,fetchData:X,callNumber:w,errors:q,results:E,...Ql(v),mechanicalStore:C}}function Ct({min:E=null,max:C=null,required:q=!1}){const v=n(null);return{errorHeightMessage:v,validateTileHeight:z=>{const V=z;return E!==null&&V<E?(v.value=`Number must be greater than or equal to ${E}`,console.log("min",V,E),!1):C!==null&&V>=E&&V>=C?(v.value=`Number must be less than or equal to ${C}`,console.log("max",V),!1):q&&(z==null||z==="")?(v.value="This field is required",console.log("required"),!1):(v.value=null,!0)}}}function At({min:E=null,max:C=null,required:q=!1}){const v=n(null);return{errorMessage:v,validateNumber:z=>{const V=z;return E!==null&&V<E?(v.value=`Number must be greater than or equal to ${E}`,!1):C!==null&&V>=E&&V>=C?(v.value=`Number must be less than or equal to ${C}`,console.log("max",V),!1):q&&(z==null||z==="")?(v.value="This field is required",console.log("required"),!1):(v.value=null,!0)}}}const f=E=>(ml("data-v-323fa401"),E=E(),hl(),E),kt={id:"tile",class:"flex flex-col w-full gap-2 shadow-lg shadow-cyan-800",style:{"margin-left":"10px"}},Ft=f(()=>e("label",{for:"title",style:{color:"whitesmoke","margin-left":"650px"}},"Mechanical Tile Roof",-1)),Bt={class:"w-64 gap-2 mt-3 space-y-2",style:{"margin-left":"20px"}},Mt={class:"w-64 mt-6 space-y-2",style:{"margin-left":"20px"}},zt=f(()=>e("label",{for:"slope"},"Roof Slope",-1)),Ut=f(()=>e("label",{class:"px-2",style:{color:"red"}},"*",-1)),It={class:"w-64 mt-6 space-y-2",style:{"margin-left":"20px"}},Pt=f(()=>e("label",{for:"height"},"Height",-1)),$t=f(()=>e("label",{class:"px-2",style:{color:"red"}},"*",-1)),Nt=f(()=>e("div",null,null,-1)),Lt={class:"w-64 mt-6 space-y-2",style:{"margin-left":"20px"}},Rt=f(()=>e("label",{style:{color:"whitesmoke"},for:"area"},"Area of Tile",-1)),Ht={class:"w-64 mt-3 ...",style:{"margin-left":"20px"}},qt=f(()=>e("label",{for:"perimeter"},"Roof Permeter(a) = 4h",-1)),Ot={class:"card md:w-1/2 flex flex-col w-96 mb-4 gap-2",style:{"margin-left":"1px"}},Kt=f(()=>e("label",{style:{color:"whitesmoke"},for:"underlaymentType"},"Select Underlayment (UDL) and/or Tile Capsheet",-1)),Zt={class:"w-96",style:{"margin-left":"2px"}},jt={class:"w-96",style:{"margin-left":"2px"}},Gt={class:"w-56 flex flex-col gap-2",style:{"margin-left":"100px"}},Jt=f(()=>e("label",{style:{color:"red"}},"Select Exposure",-1)),Qt={class:"flex items-center space-x-2"},Wt={class:"field-radiobutton space-x-4 gap-2"},Xt=f(()=>e("label",{for:"option3"},"C",-1)),Yt={class:"field-radiobutton space-x-4 gap-2"},es=f(()=>e("label",{for:"option4"},"D",-1)),ls={class:"w-128",style:{"margin-left":"3px"}},ts={class:"flex animate-duration-2000 animate-ease-in-out"},ss={class:"autocomplete"},os={class:"w-128 gap-2 mt-3 space-y-2 mb-4",style:{"margin-left":"20px"}},as=f(()=>e("label",{for:"ac"},"Tile NOA: 00000000",-1)),ns={key:0,class:"suggestions"},is=["onMousedown"],rs={class:"card md:w-full gap-4 mt-10 shadow-lg shadow-cyan-800",style:{"margin-left":"5px"}},us={class:"columns-3 flex flex-row space-x-20 space-y-12",style:{"margin-left":"2px"}},cs={class:"flex flex-row space-x-20"},ds={class:"w-96 flex flex-col gap-2"},ps=f(()=>e("label",{style:{color:"whitesmoke"},for:"manufacturer"},"(UDL) NOA Applicant",-1)),_s={class:"flex flex-col gap-2"},ms=f(()=>e("label",{style:{color:"whitesmoke"},for:"material"},"(UDL) Material",-1)),hs={class:"w-56 flex flex-col gap-1"},fs=f(()=>e("label",{style:{color:"red"}},"Select System E *",-1)),vs={class:"flex flex-col gap-2"},gs=f(()=>e("label",{style:{color:"whitesmoke"},for:"designPressure"},"Design psf:",-1)),ys={class:"w-full flex flex-row space-x-36 space-y-8",style:{"margin-left":"2px"}},Es={class:"break-after-column flex flex-row space-x-12 space-y-4",style:{"margin-left":"2px"}},Ss={class:"min-w-[680px] flex flex-col gap-2"},Ds=f(()=>e("label",{style:{color:"whitesmoke"},class:"mt-3",for:"anchor"},"Anchor Base Sheet",-1)),xs={class:"min-w-[480px] flex flex-col gap-2"},Ts=f(()=>e("label",{style:{color:"whitesmoke"},for:"description"},"(UDL) Description",-1)),bs={class:"card gap-4 mt-10 space-x-10 space-y-6"},ws={class:"flex flex-row gap-3 space-x-20"},Vs={class:"w-128 flex flex-col gap-2"},Cs=f(()=>e("label",{style:{color:"whitesmoke"},for:"saapplicant"},"S/A Applicant",-1)),As={class:"w-128 flex flex-col gap-2"},ks=f(()=>e("label",{style:{color:"whitesmoke"},for:"samaterial"},"S/A Material Type",-1)),Fs={class:"w-72 flex flex-col gap-2"},Bs=f(()=>e("label",{style:{color:"red"}},"Select System F *",-1)),Ms={class:"w-72 flex flex-col gap-2"},zs=f(()=>e("label",{style:{color:"whitesmoke"},for:"designpressure"},"Design psf:",-1)),Us={class:"max-w-screen-lg gap-2 flex flex-col gap-2"},Is=f(()=>e("label",{style:{color:"whitesmoke"},for:"sadescription"},"S/A Description",-1)),Ps={class:"w-full flex flex-row mt-8 space-x-10",style:{"margin-left":"1px"}},$s={class:"min-w-[450px] flex flex-col gap-2"},Ns=f(()=>e("label",{style:{color:"whitesmoke"},for:"manufacturer"},"Tile Applicant",-1)),Ls={class:"w-128 flex flex-col gap-2"},Rs=f(()=>e("label",{style:{color:"whitesmoke"},for:"material"},"Tile Material",-1)),Hs={class:"min-w-[700px] flex flex-col gap-2"},qs=f(()=>e("label",{style:{color:"whitesmoke"},for:"description"},"Tile Description",-1)),Os={class:"w-full flex flex-row mt-8 space-x-10",style:{"margin-left":"1px"}},Ks={class:"w-72 flex flex-col gap-2"},Zs=f(()=>e("label",{style:{color:"red"}},"Select Mechanical Tile Fastnener *",-1)),js={class:"w-full flex flex-row mt-8 space-x-10"},Gs={class:"min-w-[500px] flex flex-col gap-2"},Js=f(()=>e("label",{style:{color:"whitesmoke"},for:"selecttile"},"Tile Type",-1)),Qs={class:"w-72 flex flex-col gap-2"},Ws=f(()=>e("label",{style:{color:"red"}},"Select Mechanical Tile Fastnener *",-1)),Xs={class:"flex flex-wrap gap-1 mt-10",style:{"margin-left":"6px"}},Ys={class:"lg:w-full min-h-[10px] flex flex-row gap-18",style:{"margin-left":"10px"}},eo={width:"100%",align:"left"},lo={valign:"middle"},to={style:{margin:"auto","font-size":"large","font-weight":"bold","font-family":"arial"}},so=f(()=>e("td",{style:{color:"whitesmoke"}},"Zone 1:",-1)),oo={style:{color:"whitesmoke"}},ao={style:{color:"whitesmoke"}},no={style:{color:"whitesmoke"}},io={style:{color:"whitesmoke"}},ro={style:{color:"whitesmoke"}},uo=f(()=>e("td",{style:{color:"whitesmoke"}},"Zone 2:",-1)),co={style:{color:"whitesmoke"}},po={style:{color:"whitesmoke"}},_o={style:{color:"whitesmoke"}},mo={style:{color:"whitesmoke"}},ho={style:{color:"whitesmoke"}},fo=f(()=>e("td",{style:{color:"whitesmoke"}},"Zone 3:",-1)),vo={style:{color:"whitesmoke"}},go={style:{color:"whitesmoke"}},yo={style:{color:"whitesmoke"}},Eo={style:{color:"whitesmoke"}},So={style:{color:"whitesmoke"}},Do={__name:"InputMechTile",setup(E){const C=ht(),{workoutData:q,multiTiles:v}=it(),w=n(""),{tbd:z,zoned:V}=rt(),X=n([]),U=n(!1),{callNumber:tl,mechanicalStore:gl}=Vt(),{takeMechInput:yl,mechanicalData:sl,mechStore:k}=mt(),{Edatamounted:Ae,etileStore:ee}=ut(),{zones:re}=ct(),P=Z({manufacturer:"",noa:"",material:"",description:"",Table2:[],Table3:[],expiration_date:"",resistance:[],selection:"",select_tile:[],tile_map:[],table2_map:[],two_ten_d_RS_Nails:null,one_number_eight_screw:null,two_number_eight_screw:null,mechanicaltilefastener:[],fastenerValues:[],slope:0,height:0,dripEdgeMaterial:[],dripEdgeSize:[],deckType:"",expiration_date:"",prescriptiveSelection:"",perimeter:""}),El=vl(),{roofList:Sl}=fl(El),ol=n([]);let ue=n("");const T=Z({area:"",per:"",height:"",slope:""}),r=Z({zone:"",lambda1:"",mg1:"",mr1:"",mf1:""}),u=Z({zone:"",lambda2:"",mg2:"",mr2:"",mf2:""}),i=Z({zone:"",lambda3:"",mg3:"",mr3:"",mf3:""});$(()=>{ye()}),el(()=>{tl(),ol.value=gl.$state.tileMechInput[0].tileMechNumber}),el(()=>{Sl.value.forEach((t,l)=>{t.item==="Mechanical Fastened Tile"&&(T.area=t.dim3)})});let ce=n(sl);function ke(){console.log(w.value),console.log(ce),ce.value=w.value,console.log(w.value,ce.value),ce.value!==null&&yl(ce.value)}const al=$(()=>X.value=ol.value.noa.filter(t=>t.toString().includes(w.value))),a=Z({manufacturer:"",material:"",system:[],designpressure:[],pressure:"",prescriptiveSelection:"",description:[],Description_F1:"",Description_F2:"",Description_F3:"",Description_F4:"",Description_F5:"",Description_F6:"",Description_F7:"",Description_F8:"",Description_F9:"",Description_F10:"",Description_F11:"",Description_F12:"",arrDesignPressure:[]}),o=Z({noa:"",manufacturer:"",material:"",system:[],designPressure:[],Anchor_Base_Sheet:[],TileCap_Sheet_Description:[],Anchor_Base_Sheet_E1:"",Anchor_Base_Sheet_E2:"",Anchor_Base_Sheet_E3:"",Anchor_Base_Sheet_E4:"",Anchor_Base_Sheet_E5:"",Anchor_Base_Sheet_E6:"",Anchor_Base_Sheet_E7:"",Anchor_Base_Sheet_E8:"",Anchor_Base_Sheet_E9:"",Anchor_Base_Sheet_E10:"",Anchor_Base_Sheet_E11:"",Anchor_Base_Sheet_E12:"",Anchor_Base_Sheet_E13:"",TileCap_Sheet_Description:[],TileCap_Sheet_Description_E1:"",TileCap_Sheet_Description_E2:"",TileCap_Sheet_Description_E3:"",TileCap_Sheet_Description_E4:"",TileCap_Sheet_Description_E5:"",TileCap_Sheet_Description_E6:"",TileCap_Sheet_Description_E7:"",TileCap_Sheet_Description_E8:"",TileCap_Sheet_Description_E9:"",TileCap_Sheet_Description_E10:"",TileCap_Sheet_Description_E11:"",TileCap_Sheet_Description_E12:"",TileCap_Sheet_Description_E13:"",arrDesignPressure:[],tileCap:"",Anchor_Base:"",systemSelected:"",TileCap_Sheet_Description:[],prescriptiveSelection:"",syst:"",pressure:""});let Fe=n(C.$state.tilefinput),Dl=n(ee.$state.tilesysEinput),m=n(k.tilemech.value);console.log(k.tilemech.value);const xl=t=>{w.value=t,U.value=!1},Tl=()=>{U.value=!0},bl=()=>{setTimeout(()=>{U.value=!1},200)},me=n(),wl=n([{name:" Select Deck Type "},{name:' 5/8" Plywood  '},{name:' 3/4" Plywood  '},{name:' 1" x 6" T & G '},{name:' 1" x 8" T & G '},{name:' Existing 1/2" Plywood '}]),de=n([]),he=Z({keys:"",values:[]}),F=Z({k:"",v:[]});function Be(){ae.value==="d"?(console.log(V,ae),Rl(T.slope,T.height),V.value.forEach(t=>{r.zone=t[0],u.zone=t[1],i.zone=t[2]})):(Ll(T.slope,T.height),re.value.forEach(t=>{r.zone=t[0],u.zone=t[1],i.zone=t[2]})),m.value[0].Table2.content==="multiple"&&(console.log(m,v.select_tile),q(m,v.select_tile),oe=!0,P.select_tile=v.select_tile)}Ve(r,Ee,u);const Me=n("");function Vl(t){console.log(me._value.name,t.value.name),me._value.name===t.value.name&&(Me.value=t.value.name,console.log(Me.value))}function Cl(t){console.log(t.value),console.log(v.table2_map),console.log(v.tile_map);let l=v.table2_map;Object.entries(l).map(p=>{const b=p[0],D=p[1];console.log(b),t.value===b&&(he.values=D[0],r.lambda1=he.values,u.lambda2=he.values,i.lambda3=he.values)});let c=v.tile_map;Object.entries(c).map(p=>{const b=p[0],D=p[1];console.log(b),t.value===b&&(F.v=D,console.log(F.v),console.log(D));const M=((be,cl,dl)=>Math.max(Math.min(be,Math.max(cl,dl)),Math.min(cl,dl)))(2,Number(T.slope),12);console.log(M),M<=B.three?(r.mg1=F.v[0],u.mg2=F.v[0],i.mg3=F.v[0]):M===B.three||M<B.four?(r.mg1=F.v[1],u.mg2=F.v[1],i.mg3=F.v[1]):M<B.five||M===B.four?(console.log("Is Less"),r.mg1=F.v[2],u.mg2=F.v[2],i.mg3=F.v[2]):M===B.five||M<B.six?(console.log("Is Less"),r.mg1=F.v[3],u.mg2=F.v[3],i.mg3=F.v[3]):M==B.six||M<B.seven?(r.mg1=F.v[4],u.mg2=F.v[4],i.mg3=F.v[4]):M>=B.seven&&(console.log("Is Less"),r.mg1=F.v[5],u.mg2=F.v[5],i.mg3=F.v[5]);const s=$(()=>r.zone*r.lambda1),ne=$(()=>u.zone*u.lambda2),Te=$(()=>i.zone*i.lambda3);r.mr1=$(()=>(s.value-r.mg1).toFixed(2)),u.mr2=$(()=>(ne.value-u.mg2).toFixed(2)),i.mr3=$(()=>(Te.value-i.mg3).toFixed(2))}),P.mechanicaltilefastener=m.value[0].mechanicaltilefastener,P.fastenerValues=m.value[0].fastenerValues}function nl(){console.log(Ae.value),Ae.value.length!==null&&Ae.value.forEach((t,l)=>{o.manufacturer=t.systemDataE.manufacturer,o.material=t.systemDataE.material,o.system=t.systemDataE.system})}$(()=>{rl(),Ze(),je(),Ge(),nl(),ye(),ke(),ge(),il(),$e()});const L=n(null),fe=n(null);n(null);const I=n(null);let oe=n(!1);n(!1);let ve=n(!1),le=n(!1),te=n(!1),G=n(!1),Q=n();const Al=n([{selectedBasesheet:"-- Select Tile Capsheet/Underlayment --",key:0},{selectedBasesheet:"Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30",key:1},{selectedBasesheet:"(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F",key:2},{selectedBasesheet:"(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E",key:3}]);Ve(Q,()=>{de.value=Q.value.key,de.value===1?(G.value=!0,ve.value=!1,le.value=!1,te.value=!1):de.value===2?(G.value=!0,ve.value=!1,le.value=!1,te.value=!0):de.value===3?(G.value=!0,ve.value=!0,le.value=!0,te.value=!1):de.value===0&&(ve.value=!1,le.value=!1,te.value=!1,G.value=!1)});const B={two:2,three:3,four:4,five:5,six:6,seven:7};n(!0),Wl(G,r.mr1,u.mr2,i.mr3);const kl=n(!1);function ze(){Fe.value.forEach((t,l)=>{a.Description_F1=t.systemData.Description_F1,a.Description_F2=t.systemData.Description_F2,a.Description_F3=t.systemData.Description_F3,a.Description_F4=t.systemData.Description_F4,a.Description_F5=t.systemData.Description_F5,a.Description_F6=t.systemData.Description_F6,a.Description_F7=t.systemData.Description_F7,a.Description_F8=t.systemData.Description_F8,a.Description_F9=t.systemData.Description_F9,a.arrDesignPressure=t.systemData.designPressure,t.systemData.system.length>1?Bl():a.system=t.systemData.system})}const S=Z({Anchor_Base_Sheet_E1:"",Anchor_Base_Sheet_E2:"",Anchor_Base_Sheet_E3:"",Anchor_Base_Sheet_E4:"",Anchor_Base_Sheet_E5:"",Anchor_Base_Sheet_E6:"",Anchor_Base_Sheet_E7:"",Anchor_Base_Sheet_E8:"",Anchor_Base_Sheet_E9:"",Anchor_Base_Sheet_E10:"",Anchor_Base_Sheet_E11:"",Anchor_Base_Sheet_E12:"",Anchor_Base_Sheet_E13:""});function Fl(){Dl.value.forEach((t,l)=>{o.Maps=t.systemDataE.Maps,S.Anchor_Base_Sheet_E1=t.systemDataE.Anchor_Base_Sheet_E1,S.Anchor_Base_Sheet_E2=t.systemDataE.Anchor_Base_Sheet_E2,S.Anchor_Base_Sheet_E3=t.systemDataE.Anchor_Base_Sheet_E3,S.Anchor_Base_Sheet_E4=t.systemDataE.Anchor_Base_Sheet_E4,S.Anchor_Base_Sheet_E5=t.systemDataE.Anchor_Base_Sheet_E5,S.Anchor_Base_Sheet_E6=t.systemDataE.Anchor_Base_Sheet_E6,S.Anchor_Base_Sheet_E7=t.systemDataE.Anchor_Base_Sheet_E7,S.Anchor_Base_Sheet_E8=t.systemDataE.Anchor_Base_Sheet_E8,S.Anchor_Base_Sheet_E9=t.systemDataE.Anchor_Base_Sheet_E9,S.Anchor_Base_Sheet_E10=t.systemDataE.Anchor_Base_Sheet_E10,S.Anchor_Base_Sheet_E11=t.systemDataE.Anchor_Base_Sheet_E11,S.Anchor_Base_Sheet_E12=t.systemDataE.Anchor_Base_Sheet_E12,S.Anchor_Base_Sheet_E13=t.systemDataE.Anchor_Base_Sheet_E13,o.TileCap_Sheet_Description_E1=t.systemDataE.TileCap_Sheet_Description_E1,o.TileCap_Sheet_Description_E2=t.systemDataE.TileCap_Sheet_Description_E2,o.TileCap_Sheet_Description_E3=t.systemDataE.TileCap_Sheet_Description_E3,o.TileCap_Sheet_Description_E4=t.systemDataE.TileCap_Sheet_Description_E4,o.TileCap_Sheet_Description_E5=t.systemDataE.TileCap_Sheet_Description_E5,o.TileCap_Sheet_Description_E6=t.systemDataE.TileCap_Sheet_Description_E6,o.TileCap_Sheet_Description_E7=t.systemDataE.TileCap_Sheet_Description_E7,o.TileCap_Sheet_Description_E8=t.systemDataE.TileCap_Sheet_Description_E8,o.TileCap_Sheet_Description_E9=t.systemDataE.TileCap_Sheet_Description_E9,o.TileCap_Sheet_Description_E10=t.systemDataE.TileCap_Sheet_Description_E10,o.TileCap_Sheet_Description_E11=t.systemDataE.TileCap_Sheet_Description_E11,o.TileCap_Sheet_Description_E12=t.systemDataE.TileCap_Sheet_Description_E12,o.TileCap_Sheet_Description_E13=t.systemDataE.TileCap_Sheet_Description_E13,o.arrDesignPressure=t.systemDataE.designPressure,t.systemDataE.system.length>1||(o.system=t.systemDataE.system)})}function Bl(){a.system=a.system}const Ml=n(null),zl=$(W,()=>{r.mf1=De.value,u.mf2=De.value,i.mf3=De.value});let Ue=n(!1);const{errorMessage:Ie,validateNumber:Ul}=At({min:4,max:12,required:!0}),{errorHeightMessage:Pe,validateTileHeight:Il}=Ct({min:10,max:40,required:!0});function $e(){Pl()}const Pl=()=>{Ul(T.slope),console.log(T.slope)},$l=()=>{Il(T.height),console.log(T.height)};function ge(){(Ie.value===null||Pe.value===null)&&(Ue=!0,console.log("Entered checkmarks"))}function il(){$l(),console.log(height.value)}const Nl=n(.4),{getData:Ll}=dt(),{getDatas:Rl}=Xe();function ye(){T.height=ue.value,T.per=(T.height*Nl.value).toFixed(2),ge()}function Hl(){Fe.value.length!==null&&Fe.value.forEach((t,l)=>{console.log(t),a.manufacturer=t.systemData.manufacturer,a.material=t.systemData.material,a.system=t.systemData.system})}let Ne=n(!1);n(!1);function rl(){m.value.length!==null&&(console.log(m.value[0]),P.description=m.value[0].description,P.material=m.value[0].material,m.value[0].Table2.content==="multiple"?(Ne=!1,oe=!0):(G=!0,Ne=!0,oe=!1)),Ee(),Be()}const ul=n(!1),ae=n(""),J=n("");function Ee(){console.log(J),J.value==="d"?(ae.value="d",console.log(ul),console.log(J)):(ae.value="c",console.log(J),ul.value=!0),ke()}let Le=n(!1),Re=n(!1),Se=n(!1),He=n(!1),qe=n(!1),Oe=n(!1);function ql(){m.value[0].Table2.content==="multiple"&&Be(),ae.value==="d"?(console.log("D exposure"),console.log(z,V),console.log(Xe()),V.value.forEach((D,H)=>{r.zone=D[0],u.zone=D[1],i.zone=D[2]})):(console.log("Else C exposure"),console.log(re),re.value.forEach((D,H)=>{r.zone=D[0],u.zone=D[1],i.zone=D[2]})),P.mechanicaltilefastener=m.value[0].mechanicaltilefastener,P.fastenerValues=m.value[0].fastenerValues,r.lambda1=m.value[0].Table2.Direct_Deck,u.lambda2=m.value[0].Table2.Direct_Deck,i.lambda3=m.value[0].Table2.Direct_Deck;const l=((D,H,M)=>Math.max(Math.min(D,Math.max(H,M)),Math.min(H,M)))(2,Number(T.slope),12);console.log(l),l<=B.three?(console.log("Is Less then three"),r.mg1=m.value[0].Table3.two,u.mg2=m.value[0].Table3.two,i.mg3=m.value[0].Table3.two,console.log(i.mg3)):l===B.three||l<B.four?(console.log("Is Less than four but equal to or higher than three",sl.Table3.three),r.mg1=m.value[0].Table3.three,u.mg2=m.value[0].Table3.three,i.mg3=m.value[0].Table3.three,console.log(i.mg3)):l<B.five||l===B.four?(console.log("Is Less"),r.mg1=m.value[0].Table3.four,u.mg2=m.value[0].Table3.four,i.mg3=m.value[0].Table3.four):l===B.five||l<B.six?(console.log("Is Less"),r.mg1=m.value[0].Table3.five,u.mg2=m.value[0].Table3.five,i.mg3=m.value[0].Table3.five,console.log(i.mg3)):l==B.six||l<B.seven?(r.mg1=m.value[0].Table3.six,u.mg2=m.value[0].Table3.six,i.mg3=m.value[0].Table3.six):l>=B.seven&&(console.log("Is Less"),r.mg1=m.value[0].Table3.seven,u.mg2=m.value[0].Table3.seven,i.mg3=m.value[0].Table3.seven,console.log(i.mg3));const c=$(()=>r.zone*r.lambda1),p=$(()=>u.zone*u.lambda2),b=$(()=>i.zone*i.lambda3);r.mr1=$(()=>(c.value-r.mg1).toFixed(2)),u.mr2=$(()=>(p.value-u.mg2).toFixed(2)),i.mr3=$(()=>(b.value-i.mg3).toFixed(2)),k.tilemech.value[0].slope=T.slope,k.tilemech.value[0].height=T.height,k.tilemech.value[0].area=T.area,k.tilemech.value[0].perimeter=T.per,k.tilemech.value[0].deckType=Me.value,k.tilemech.value[0].zoneone=r.zone,k.tilemech.value[0].zonetwo=u.zone,k.tilemech.value[0].zonethree=i.zone,k.tilemech.value[0].lambda1=r.lambda1,k.tilemech.value[0].lambda2=u.lambda2,k.tilemech.value[0].lambda3=i.lambda3,k.tilemech.value[0].mg1=r.mg1,k.tilemech.value[0].mg2=u.mg2,k.tilemech.value[0].mg3=i.mg3,k.tilemech.value[0].mr1=r.mr1,k.tilemech.value[0].mr2=u.mr2,k.tilemech.value[0].mr3=i.mr3,console.log(k.tilemech.value[0]),k.tilemech.value[0].prescriptiveSelection=Q.value}const Ke=n([]),Y=n([]);n(null);const De=n();function W(t){console.log(t.value);let l=P.fastenerValues;console.log(l),ae.value==="d"?(console.log("D exposure"),console.log(z,V),console.log(Xe()),V.value.forEach((c,p)=>{r.zone=c[0],u.zone=c[1],i.zone=c[2]})):(console.log("Else C exposure"),console.log(re),re.value.forEach((c,p)=>{r.zone=c[0],u.zone=c[1],i.zone=c[2]})),Ml.value=Object.entries(l).map(c=>{const p=c[0],b=c[1];Ke.value.push(p),Y.value.push(b),console.log(b,p),console.log(Y.value[0],Y.value[1])});for(let c=0;c<Ke.value.length;c++){console.log(Y.value[c]),De.value=Y.value[c],Ke.value[c]===t.value&&(r.mf1=Y.value[c],u.mf2=Y.value[c],i.mf3=Y.value[c]);const p=r.mf1,b=u.mf2,D=i.mf3,H=O(p),M=O(b),s=O(D);console.log(H.value,M.value,s.value),console.log(typeof H.value,typeof M.value,typeof s.value);const ne=O(r.mr1),Te=O(u.mr2),be=O(i.mr3);be.value<s.value?(console.log("I am less than MF3",be.value,s.value),Se=!0,Oe=!1,console.log(Se.value)):(Ge(),console.log("Entered Else")),ne.value<H.value?(console.log("I am less than MF1",ne.value),Le=!0,He=!1):(Ze(),console.log("entered else")),Te.value<M.value?(console.log("I am less than MF2"),Re=!0,qe=!1):je()}}function Ze(){const t=r.mf1;console.log(r.mf1);const l=O(t);O(r.mr1).value>l.value&&(console.log("I am greater than MF1"),He=!0,Le=!1)}function je(){const t=u.mf2,l=O(t);O(u.mr2).value>l.value&&(console.log("I am greater than MF2"),qe=!0,Re=!1)}function Ge(){const t=i.mf3,l=O(t),c=O(i.mr3);c.value>l.value&&(console.log("I am greater than MF3",c.value,l.value),Oe=!0,Se=!1)}const x=n({}),Ol=n({});function Kl(t){let l=a.system,c=a.arrDesignPressure,p=l;l.forEach((b,D)=>{x.value[b]=c[D]}),p.forEach((b,D)=>{Ol.value[b]=l[D]}),console.log(l,p,c),x.value.F1!==null&&t.value!==null&&R(),x.value.F2!==null&&t.value!==null&&K(),x.value.F3!==null&&t.value!==null&&K(),x.value.F4!==null&&t.value!==null&&K(),x.value.F5!==null&&t.value!==null&&K(),x.value.F6!==null&&t.value!==null&&K(),x.value.F7!==null&&t.value!==null&&K(),x.value.F8!==null&&t.value!==null&&K(),x.value.F9!==null&&t.value!==null&&K(),x.value.F10!==null&&t.value!==null&&K(),x.value.F11!==null&&t.value!==null&&K(),x.value.F12!==null&&t.value!==null&&K()}const g=n({}),Zl=n({});function xe(t){let l=o.system,c=o.arrDesignPressure,p=l;l.forEach((b,D)=>{g.value[b]=c[D]}),p.forEach((b,D)=>{Zl.value[b]=l[D]}),g.value.E1!==null&&t.value!==null&&R(),g.value.E2!==null&&t.value!==null&&R(),g.value.E3!==null&&t.value!==null&&R(),g.value.E4!==null&&t.value!==null&&R(),g.value.E5!==null&&t.value!==null&&R(),g.value.E6!==null&&t.value!==null&&R(),g.value.E7!==null&&t.value!==null&&R(),g.value.E8!==null&&t.value!==null&&R(),g.value.E9!==null&&t.value!==null&&R(),g.value.E10!==null&&t.value!==null&&R(),g.value.E11!==null&&t.value!==null&&R(),g.value.E12!==null&&t.value!==null&&R(),g.value.E13!==null&&t.value!==null&&R()}function R(){I.value==="E1"&&(o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E1,o.designPressure=g.value.E1,o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E1),I.value==="E2"&&(console.log(I.value,typeof I),o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E2,o.designPressure=g.value.E2,o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E2,console.log(o.TileCap_Sheet_Description_E2,g.value.E2,S.Anchor_Base_Sheet_E2)),I.value==="E3"&&(o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E3,o.designPressure=g.value.E3,o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E3),I.value==="E4"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E4,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E4,o.designPressure=g.value.E4),I.value==="E5"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E5,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E5,o.designPressure=g.value.E5),I.value==="E6"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E6,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E6,o.designPressure=g.value.E6),I.value==="E7"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E7,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E7,o.designPressure=g.value.E7),I.value==="E8"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E8,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E8,o.designPressure=g.value.E8),I.value==="E9"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E9,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E9,o.designPressure=g.value.E9),I.value==="E10"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E10,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E10,o.designPressure=g.value.E10),I.value==="E11"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E11,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E11,o.designPressure=g.value.E11),I.value==="E12"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E12,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E12,o.designPressure=g.value.E12),I.value==="E13"&&(o.Anchor_Base_Sheet=S.Anchor_Base_Sheet_E13,o.TileCap_Sheet_Description=o.TileCap_Sheet_Description_E13,o.designPressure=g.value.E13),ee.$state.tilesysEinput.length!==0&&(ee.$state.tilesysEinput[0].systemDataE.Anchor_Base=o.Anchor_Base_Sheet,ee.$state.tilesysEinput[0].systemDataE.tileCap=o.TileCap_Sheet_Description,ee.$state.tilesysEinput[0].systemDataE.dP=o.designPressure,ee.$state.tilesysEinput[0].systemDataE.systemSelected=I.value,ee.$state.tilesysEinput[0].systemDataE.prescriptiveSelection=Q.value)}function K(){L.value==="F1"&&(a.description=a.Description_F1,a.designpressure=x.value.F1),L.value==="F2"&&(a.description=a.Description_F2,a.designpressure=x.value.F2),L.value==="F3"&&(a.description=a.Description_F3,a.designpressure=x.value.F3,console.log(a.arrDesignPressure)),L.value==="F4"&&(a.description=a.Description_F4,a.designpressure=x.value.F4),L.value==="F5"&&(a.description=a.Description_F5,a.designpressure=x.value.F5),L.value==="F6"&&(a.description=a.Description_F6,a.designpressure=x.value.F6),L.value==="F7"&&(a.description=a.Description_F7,a.designpressure=x.value.F7),L.value==="F8"&&(a.description=a.Description_F8,a.designpressure=x.value.F8),L.value==="F9"&&(a.description=a.Description_F9,a.designpressure=x.value.F9),L.value==="F10"&&(a.description=a.Description_F10,a.designpressure=x.value.F10),L.value==="F11"&&(a.description=a.Description_F11,a.designpressure=x.value.F11),L.value==="F12"&&(a.description=a.Description_F12,a.designpressure=x.value.F12),C.$state.tilefinput.length!==0&&(C.$state.tilefinput[0].systemData.description=a.description,C.$state.tilefinput[0].systemData.pressure=a.designpressure,C.$state.tilefinput[0].systemData.prescriptiveSelection=Q.value)}return Ve(ze,zl,$e),(t,l)=>{const c=at,p=ot,b=st,D=et,H=tt,M=lt;return j(),se(ll,null,[e("div",kt,[Ft,e("div",Bt,[_(c,{modelValue:me.value,"onUpdate:modelValue":l[0]||(l[0]=s=>me.value=s),options:wl.value,optionLabel:"name",placeholder:"Select a Deck Type",class:"w-full md:w-56",onChange:Vl},null,8,["modelValue","options"])]),e("div",Mt,[zt,Ut,y(),d(e("i",{class:"pi pi-check",style:{color:"green","font-size":"1.2rem"},onChange:ge},null,544),[[A,h(Ue)]]),y("  "),d(_(p,{id:"slope",placeholder:"slope",modelValue:T.slope,"onUpdate:modelValue":l[1]||(l[1]=s=>T.slope=s),modelModifiers:{number:!0},onChange:$e},null,8,["modelValue"]),[[H,"Press Tab after value",void 0,{bottom:!0}]]),h(Ie)?(j(),Ce(b,{key:0,class:"w-96 mt-1 ...",severity:"error",life:6e3,style:{"margin-left":"2px"}},{default:pe(()=>[y(Je(h(Ie)),1)]),_:1})):_e("",!0)]),e("div",It,[Pt,$t,y(),d(e("i",{class:"pi pi-check",style:{color:"green","font-size":"1.2rem"},onChange:ge},null,544),[[A,h(Ue)]]),y("  "),d(_(p,{id:"height",modelValue:h(ue),"onUpdate:modelValue":l[2]||(l[2]=s=>pl(ue)?ue.value=s:ue=s),modelModifiers:{number:!0},type:"text",placeholder:"height",onInput:ye,onChange:il},null,8,["modelValue"]),[[H,"Press Tab after value",void 0,{bottom:!0}]]),h(Pe)?(j(),Ce(b,{key:0,class:"w-96 mt-1",severity:"error",life:6e3,style:{"margin-left":"2px"}},{default:pe(()=>[y(Je(h(Pe)),1)]),_:1})):_e("",!0)]),Nt,e("div",Lt,[Rt,_(p,{id:"area",modelValue:T.area,"onUpdate:modelValue":l[3]||(l[3]=s=>T.area=s),type:"text",placeholder:"area"},null,8,["modelValue"])]),e("div",Ht,[qt,_(p,{id:"perimeter",modelValue:T.per,"onUpdate:modelValue":l[4]||(l[4]=s=>T.per=s),type:"text",placeholder:" ",onChange:ye},null,8,["modelValue"])]),e("div",Ot,[Kt,_(c,{modelValue:h(Q),"onUpdate:modelValue":l[5]||(l[5]=s=>pl(Q)?Q.value=s:Q=s),options:Al.value,optionLabel:"selectedBasesheet",placeholder:"make selection",onChange:ze},null,8,["modelValue","options"])]),_(nt),d(e("div",Zt,[_(pt,{onKeydown:Qe(We(nl,["exact","stop"]),["tab"])},null,8,["onKeydown"])],512),[[A,h(le)]]),d(e("div",jt,[_(_t,{onKeydown:Qe(We(Hl,["exact","stop"]),["tab"])},null,8,["onKeydown"])],512),[[A,h(te)]]),d(e("div",Gt,[Jt,e("div",Qt,[e("div",Wt,[_(h(Ye),{inputId:"option3",name:"option",value:"c",variant:"filled",invalid:J.value===null,modelValue:J.value,"onUpdate:modelValue":l[6]||(l[6]=s=>J.value=s),onUpdate:Ee},null,8,["invalid","modelValue"]),Xt]),e("div",Yt,[_(h(Ye),{inputId:"option4",name:"option",value:"d",variant:"filled",invalid:J.value===null,modelValue:J.value,"onUpdate:modelValue":l[7]||(l[7]=s=>J.value=s),onUpdate:Ee},null,8,["invalid","modelValue"]),es])]),_(h(we))],512),[[A,h(G)]]),d(e("div",ls,[d((j(),se("div",ts,[e("div",ss,[e("div",os,[_(D,null,{default:pe(()=>[d(_(p,{id:"tilenoa",modelValue:w.value,"onUpdate:modelValue":l[8]||(l[8]=s=>w.value=s),inputId:"ac",onFocus:l[9]||(l[9]=s=>U.value=!0),onBlur:bl,onInput:Tl,onClick:ke,onKeydown:Qe(We(rl,["exact","stop"]),["tab"])},null,8,["modelValue","onKeydown"]),[[H,"Press Tab after value",void 0,{bottom:!0}]]),as]),_:1})]),U.value&&al.value.length?(j(),se("ul",ns,[(j(!0),se(ll,null,Xl(al.value,(s,ne)=>(j(),se("li",{key:ne,onMousedown:Te=>xl(s)},Je(s),41,is))),128))])):_e("",!0)])])),[[M,{enterClass:"animate-flipup",leaveClass:"animate-fadeout"}]])],512),[[A,h(G)]])]),_(h(we)),_(h(we)),e("div",rs,[e("div",us,[d(e("div",cs,[e("div",ds,[ps,_(p,{id:"manufacturer",modelValue:o.manufacturer,"onUpdate:modelValue":l[10]||(l[10]=s=>o.manufacturer=s)},null,8,["modelValue"])]),e("div",_s,[ms,_(p,{id:"material",modelValue:o.material,"onUpdate:modelValue":l[11]||(l[11]=s=>o.material=s)},null,8,["modelValue"])]),e("div",hs,[fs,_(c,{modelValue:I.value,"onUpdate:modelValue":l[12]||(l[12]=s=>I.value=s),options:o.system,placeholder:"",onClick:Fl,onChange:xe},null,8,["modelValue","options"])]),e("div",vs,[gs,_(p,{id:"designPressure",modelValue:o.designPressure,"onUpdate:modelValue":l[13]||(l[13]=s=>o.designPressure=s),onChange:xe},null,8,["modelValue"])])],512),[[A,h(le)]])]),e("div",ys,[d(e("div",Es,[e("div",Ss,[Ds,_(p,{id:"anchor",modelValue:o.Anchor_Base_Sheet,"onUpdate:modelValue":l[14]||(l[14]=s=>o.Anchor_Base_Sheet=s),onChange:xe},null,8,["modelValue"])]),e("div",xs,[Ts,_(p,{id:"description",modelValue:o.TileCap_Sheet_Description,"onUpdate:modelValue":l[15]||(l[15]=s=>o.TileCap_Sheet_Description=s),onChange:xe},null,8,["modelValue"])])],512),[[A,h(le)]])]),e("div",bs,[d(e("div",ws,[e("div",Vs,[Cs,_(p,{id:"saapplicant",modelValue:a.manufacturer,"onUpdate:modelValue":l[16]||(l[16]=s=>a.manufacturer=s)},null,8,["modelValue"])]),e("div",As,[ks,_(p,{id:"saaterial",modelValue:a.material,"onUpdate:modelValue":l[17]||(l[17]=s=>a.material=s)},null,8,["modelValue"])]),e("div",Fs,[Bs,_(c,{modelValue:L.value,"onUpdate:modelValue":l[18]||(l[18]=s=>L.value=s),options:a.system,placeholder:"",onClick:ze,onChange:Kl},null,8,["modelValue","options"])]),e("div",Ms,[zs,_(p,{id:"designpressure",modelValue:a.designpressure,"onUpdate:modelValue":l[19]||(l[19]=s=>a.designpressure=s)},null,8,["modelValue"])])],512),[[A,h(te)]]),d(e("div",Us,[Is,_(p,{id:"capsheetdescription",modelValue:a.description,"onUpdate:modelValue":l[20]||(l[20]=s=>a.description=s)},null,8,["modelValue"])],512),[[A,h(te)]])]),d(e("div",Ps,[e("div",$s,[Ns,_(p,{id:"manufacturer",modelValue:P.manufacturer,"onUpdate:modelValue":l[21]||(l[21]=s=>P.manufacturer=s)},null,8,["modelValue"])]),e("div",Ls,[Rs,_(p,{id:"description",modelValue:P.material,"onUpdate:modelValue":l[22]||(l[22]=s=>P.material=s)},null,8,["modelValue"])]),d(e("div",Hs,[qs,_(p,{id:"description",modelValue:P.description,"onUpdate:modelValue":l[23]||(l[23]=s=>P.description=s)},null,8,["modelValue"])],512),[[A,!h(oe)]])],512),[[A,h(G)]]),d(e("div",Os,[d(e("div",Ks,[Zs,_(c,{modelValue:fe.value,"onUpdate:modelValue":l[24]||(l[24]=s=>fe.value=s),options:P.mechanicaltilefastener,onClick:ql,onChange:W},null,8,["modelValue","options"])],512),[[A,h(Ne)]])],512),[[A,h(G)]]),d(e("div",js,[e("div",Gs,[Js,_(c,{modelValue:t.selectedMulti,"onUpdate:modelValue":l[25]||(l[25]=s=>t.selectedMulti=s),options:P.select_tile,placeholder:"make a selection",onClick:Be,onChange:Cl},null,8,["modelValue","options"])]),d(e("div",Qs,[Ws,_(c,{modelValue:fe.value,"onUpdate:modelValue":l[26]||(l[26]=s=>fe.value=s),options:P.mechanicaltilefastener,onChange:W},null,8,["modelValue","options"])],512),[[A,h(oe)]])],512),[[A,h(oe)]]),e("div",Xs,[e("div",Ys,[e("table",eo,[e("tbody",null,[e("tr",null,[e("td",lo,[e("table",to,[e("tbody",null,[e("tr",null,[so,e("td",oo,[d(e("input",{"onUpdate:modelValue":l[27]||(l[27]=s=>r.zone=s),readonly:"",size:"4",name:"p1",value:""},null,512),[[N,r.zone]]),y(" x λ  ")]),e("td",ao,[d(e("input",{"onUpdate:modelValue":l[28]||(l[28]=s=>r.lambda1=s),readonly:"",size:"4",name:"lambda1",value:""},null,512),[[N,r.lambda1]]),y(" - Mg: ")]),e("td",no,[d(e("input",{"onUpdate:modelValue":l[29]||(l[29]=s=>r.mg1=s),readonly:"",size:"4",name:"mg1",value:""},null,512),[[N,r.mg1]]),y(" = Mr1: ")]),e("td",io,[d(e("input",{"onUpdate:modelValue":l[30]||(l[30]=s=>r.mr1=s),readonly:"",size:"4",name:"mr1",value:""},null,512),[[N,r.mr1]]),y(" NOA Mf: ")]),e("td",ro,[d(e("input",{"onUpdate:modelValue":l[31]||(l[31]=s=>r.mf1=s),readonly:"false",size:"6",name:"mf1",value:"",onChange:W},null,544),[[N,r.mf1]]),y("  ")]),d(e("i",{class:"pi pi-check",style:{color:"green","font-size":"1.5rem"},onChange:W},null,544),[[A,h(Le)]]),y("  "),d(e("i",{class:"pi pi-times",style:{color:"red","font-size":"1.5rem"},onChange:Ze},null,544),[[A,h(He)]]),y("  ")]),e("tr",null,[uo,e("td",co,[d(e("input",{"onUpdate:modelValue":l[32]||(l[32]=s=>u.zone=s),readonly:"",size:"4",name:"p2",value:""},null,512),[[N,u.zone]]),y(" x λ  ")]),e("td",po,[d(e("input",{"onUpdate:modelValue":l[33]||(l[33]=s=>u.lambda2=s),readonly:"",size:"4",name:"lambda2",value:""},null,512),[[N,u.lambda2]]),y(" - Mg: ")]),e("td",_o,[d(e("input",{"onUpdate:modelValue":l[34]||(l[34]=s=>u.mg2=s),readonly:"",size:"4",name:"mg2",value:""},null,512),[[N,u.mg2]]),y(" = Mr2: ")]),e("td",mo,[d(e("input",{"onUpdate:modelValue":l[35]||(l[35]=s=>u.mr2=s),readonly:"",size:"4",name:"mr2",value:""},null,512),[[N,u.mr2]]),y(" NOA Mf: ")]),e("td",ho,[d(e("input",{"onUpdate:modelValue":l[36]||(l[36]=s=>u.mf2=s),readonly:"false",size:"6",name:"mf2",value:"",onChange:W},null,544),[[N,u.mf2]]),y(" ")]),d(e("i",{class:"pi pi-check",style:{color:"green","font-size":"1.5rem"},onChange:W},null,544),[[A,h(Re)]]),y("  "),d(e("i",{class:"pi pi-times",style:{color:"red","font-size":"1.5rem"},onChange:je},null,544),[[A,h(qe)]]),y("  ")]),e("tr",null,[fo,e("td",vo,[d(e("input",{"onUpdate:modelValue":l[37]||(l[37]=s=>i.zone=s),readonly:"",size:"4",name:"p3",value:""},null,512),[[N,i.zone]]),y(" x λ")]),e("td",go,[d(e("input",{"onUpdate:modelValue":l[38]||(l[38]=s=>i.lambda3=s),readonly:"",size:"4",name:"lambda3",value:""},null,512),[[N,i.lambda3]]),y(" - Mg: ")]),e("td",yo,[d(e("input",{"onUpdate:modelValue":l[39]||(l[39]=s=>i.mg3=s),readonly:"",size:"4",name:"mg5",value:""},null,512),[[N,i.mg3]]),y(" = Mr3: ")]),e("td",Eo,[d(e("input",{"onUpdate:modelValue":l[40]||(l[40]=s=>i.mr3=s),readonly:"",size:"4",name:"mr3",value:""},null,512),[[N,i.mr3]]),y(" NOA Mf: ")]),e("td",So,[d(e("input",{"onUpdate:modelValue":l[41]||(l[41]=s=>i.mf3=s),readonly:"false",size:"6",name:"mf3",value:"",onChange:W},null,544),[[N,i.mf3]]),y(" ")]),d(e("i",{class:"pi pi-check",style:{color:"green","font-size":"1.5rem"},onChange:W},null,544),[[A,h(Se)]]),y("  "),d(e("i",{class:"pi pi-times",style:{color:"red","font-size":"1.5rem"},onChange:Ge},null,544),[[A,h(Oe)]]),y("  ")]),kl.value?(j(),Ce(b,{key:0,severity:"error",life:3e3},{default:pe(()=>[y("Select Another Material")]),_:1})):_e("",!0)])])])])])])])])])],64)}}},xo=_l(Do,[["__scopeId","data-v-323fa401"]]),To={id:"tile",class:"card w-full space-y-1",style:{"margin-left":"20px"}},Go={__name:"TileMech",setup(E){const C=Yl(),q=vl();fl(q);const v=n(!1),w=n(q.$state.roofList);let z=n(null);function V(){console.log(z)}Ve(v,U=>{U?(console.log("Dialog is now visible"),console.log(C)):console.log("Dialog has been closed")});function X(){for(let U=0;U<w.value.length;U++)console.log(w.value[U].item),w.value[U].item==="Mechanical Fastened Tile"&&(console.log("I am in",w.value[U].item),v.value=!0,console.log(v.value))}return el(()=>{X()}),(U,tl)=>(j(),se(ll,null,[v.value===!0?(j(),Ce(bt,{key:0})):_e("",!0),e("div",To,[_(xo,{slopeEntered:h(z),style:{"margin-left":"2px"},onChange:V},null,8,["slopeEntered"])])],64))}};export{Go as default};