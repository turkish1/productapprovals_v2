const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LowSlope-XU_0xuOD.js","assets/roofList-BNivsGGo.js","assets/index-BxJOCaJ4.js","assets/index-DY_NPeA5.css","assets/index-DhJyWDrr.js","assets/index-CRr0q9c-.js","assets/index-CvOtX9ZN.js","assets/index-BDaJX04X.js","assets/_plugin-vue_export-helper-DlAUqK2U.js","assets/index-JMCbk6V-.js","assets/index-CF3MUsIY.js","assets/index-MVIP50ph.js","assets/index-CWroZQGL.js","assets/index-QhA8hPC2.js","assets/index-Cn1bQQAe.js","assets/index-WovIr-YY.js","assets/DripEdgeComponent-CDxvI3vn.js","assets/useAxios-nnkpqxhT.js","assets/shingleStore-C9C3FvYi.js","assets/burpdfStore-CoXzjFEb.js","assets/LowSlope-BO-UeAkE.css","assets/Shingles-8mzRvmgv.js","assets/index-CoQ7X9Ow.js","assets/systemfStore-CppeW_us.js","assets/Shingles-BkniDLGk.css","assets/Tile-bVK57cNN.js","assets/index-B7ePADpC.js","assets/use-multiTile-CTOorY73.js","assets/tilesysfStore-Df2tAF35.js","assets/use-multiTile-B3VeypaN.css","assets/tilenoaStore-DzQWVuzC.js","assets/index-DDWI743p.js","assets/Tile-jmgF8-y9.css","assets/TileMech-CQoMPQQr.js","assets/use-tileMechanical-Digj96Zt.js","assets/TileMech-29bZxBBH.css"])))=>i.map(i=>d[i]);
import{B as q,M as E,c as l,d as w,N as b,z as _,S as ne,V as se,aq as re,b as z,O as m,i as s,g as j,P as M,v as S,f as o,ap as D,T as le,F as R,aa as oe,r as f,a8 as ce,a9 as F,s as pe,ar as ue,w as de,e as i,as as B,an as C,$ as T,ab as I,ac as A}from"./index-BxJOCaJ4.js";import{s as ve,a as fe,b as me}from"./index-B1q02OVi.js";import{s as he}from"./index-CRr0q9c-.js";import _e from"./Checkout-TK3FyCHs.js";import{u as Se}from"./permitapp-C-LV5LaY.js";import{u as ye}from"./roofList-BNivsGGo.js";import"./index-CvOtX9ZN.js";import"./index-WOmuC6aQ.js";import"./index-DmCnltfC.js";import"./accountsStore-u3HXw5Ue.js";import"./generalpageStore-EJhSLflg.js";import"./jspdf.es.min-D4DrmnTo.js";import"./burpdfStore-CoXzjFEb.js";import"./systemfStore-CppeW_us.js";import"./shingleStore-C9C3FvYi.js";import"./tilenoaStore-DzQWVuzC.js";import"./tilesysfStore-Df2tAF35.js";import"./use-tileMechanical-Digj96Zt.js";import"./useAxios-nnkpqxhT.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";var $e={root:"p-steppanels"},ke=q.extend({name:"steppanels",classes:$e}),ge={name:"BaseStepPanels",extends:E,props:{value:{type:String,default:void 0}},style:ke,provide:function(){return{$pcStepPanels:this,$parentInstance:this}}},G={name:"StepPanels",extends:ge,inheritAttrs:!1};function Ve(e,t,n,c,d,a){return l(),w("div",_({class:e.cx("root")},e.ptmi("root")),[b(e.$slots,"default")],16)}G.render=Ve;var Ce={root:function(t){var n=t.instance;return["p-steppanel",{"p-steppanel-active":n.isVertical&&n.active}]},content:"p-steppanel-content"},be=q.extend({name:"steppanel",classes:Ce}),H={name:"StepperSeparator",hostName:"Stepper",extends:E};function we(e,t,n,c,d,a){return l(),w("span",_({class:e.cx("separator")},e.ptm("separator")),null,16)}H.render=we;var Pe={name:"BaseStepPanel",extends:E,props:{value:{type:[String,Number],default:void 0},asChild:{type:Boolean,default:!1},as:{type:String,default:"DIV"}},style:be,provide:function(){return{$pcStepPanel:this,$parentInstance:this}}},J={name:"StepPanel",extends:Pe,inheritAttrs:!1,inject:{$pcStepper:{default:null},$pcStepItem:{default:null},$pcStepList:{default:null}},data:function(){return{isSeparatorVisible:!1}},mounted:function(){if(this.$el){var t,n,c=ne(this.$pcStepper.$el,'[data-pc-name="step"]'),d=se(this.isVertical?(t=this.$pcStepItem)===null||t===void 0?void 0:t.$el:(n=this.$pcStepList)===null||n===void 0?void 0:n.$el,'[data-pc-name="step"]'),a=re(d,c);this.isSeparatorVisible=this.isVertical&&a!==c.length-1}},methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{active:this.active}})},updateValue:function(t){this.$pcStepper.updateValue(t)}},computed:{active:function(){var t,n,c=this.$pcStepItem?(t=this.$pcStepItem)===null||t===void 0?void 0:t.value:this.value;return c===((n=this.$pcStepper)===null||n===void 0?void 0:n.d_value)},isVertical:function(){return!!this.$pcStepItem},activeValue:function(){var t;return this.isVertical?(t=this.$pcStepItem)===null||t===void 0?void 0:t.value:this.value},id:function(){var t;return"".concat((t=this.$pcStepper)===null||t===void 0?void 0:t.id,"_steppanel_").concat(this.activeValue)},ariaControls:function(){var t;return"".concat((t=this.$pcStepper)===null||t===void 0?void 0:t.id,"_step_").concat(this.activeValue)},a11yAttrs:function(){return{id:this.id,role:"tabpanel","aria-controls":this.ariaControls,"data-pc-name":"steppanel","data-p-active":this.active}}},components:{StepperSeparator:H}};function xe(e,t,n,c,d,a){var N=z("StepperSeparator");return a.isVertical?(l(),w(R,{key:0},[e.asChild?b(e.$slots,"default",{key:1,active:a.active,a11yAttrs:a.a11yAttrs,activateCallback:function(p){return a.updateValue(p)}}):(l(),m(le,_({key:0,name:"p-toggleable-content"},e.ptm("transition")),{default:s(function(){return[j((l(),m(M(e.as),_({id:a.id,class:e.cx("root"),role:"tabpanel","aria-controls":a.ariaControls},a.getPTOptions("root")),{default:s(function(){return[d.isSeparatorVisible?(l(),m(N,{key:0})):S("",!0),o("div",_({class:e.cx("content")},a.getPTOptions("content")),[b(e.$slots,"default",{active:a.active,activateCallback:function(p){return a.updateValue(p)}})],16)]}),_:3},16,["id","class","aria-controls"])),[[D,a.active]])]}),_:3},16))],64)):(l(),w(R,{key:1},[e.asChild?e.asChild&&a.active?b(e.$slots,"default",{key:1,active:a.active,a11yAttrs:a.a11yAttrs,activateCallback:function(p){return a.updateValue(p)}}):S("",!0):j((l(),m(M(e.as),_({key:0,id:a.id,class:e.cx("root"),role:"tabpanel","aria-controls":a.ariaControls},a.getPTOptions("root")),{default:s(function(){return[b(e.$slots,"default",{active:a.active,activateCallback:function(p){return a.updateValue(p)}})]}),_:3},16,["id","class","aria-controls"])),[[D,a.active]])],64))}J.render=xe;const Be={class:"flex justify-center md:w-3/4 px-2",style:{"margin-left":"200px"}},Te={class:"flex flex-col h-0 w-1024"},Ie={class:"flex pt-6 justify-end"},Ae={class:"flex flex-col h-0 w-600"},Ne={class:"flex pt-6 justify-between"},Oe={class:"flex flex-col h-0 w-1224"},Ee={class:"flex pt-6 justify-between"},Le={class:"flex flex-col h-0 w-1224"},je={class:"flex pt-6 justify-between"},Me={class:"flex flex-col h-0 w-1024"},De={class:"flex pt-6 justify-between"},rt={__name:"RoofInputSection",props:["page"],setup(e){const t=Se(),n=I(()=>A(()=>import("./LowSlope-XU_0xuOD.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),c=I(()=>A(()=>import("./Shingles-8mzRvmgv.js"),__vite__mapDeps([21,2,3,1,4,5,6,7,8,22,9,10,11,12,13,14,15,18,23,17,16,24]))),d=I(()=>A(()=>import("./Tile-bVK57cNN.js"),__vite__mapDeps([25,4,2,3,5,6,7,8,1,22,26,9,10,11,12,13,14,15,27,28,17,29,30,31,16,18,32]))),a=I(()=>A(()=>import("./TileMech-CQoMPQQr.js"),__vite__mapDeps([33,4,2,3,5,6,7,8,1,22,26,9,10,11,12,13,14,15,16,17,18,27,28,29,34,31,35]))),N=e;oe(()=>N.page),f(1);let h=f(!1);const p=f(2);t.$state.permitapp.length!==0&&(h=!0);const K=f(t.$state.permitapp),Q=ye(),y=f(!1),P=f(!1),$=f(!1),k=f(!1),O=h===!0?ce(K._value[0].miamibeach):"";F(()=>{if(O.value===null||O.value===NaN)return!0;O.value===p.value&&(console.log("Entry"),h.value=!0,y.value=!0)});const{roofList:U}=pe(Q);function W(){U.value.forEach((x,L)=>{console.log(x,L),x.item==="Asphalt Shingle"&&(y.value=!0,console.log(y,x.item))})}F(()=>{W()});function X(){P.value=!0}function Y(){$.value=!0,console.log($)}function Z(){k.value=!0,console.log(k)}return ue(async()=>{await B(y).toBe(!0),await B(P).toBe(!0),await B($).toBe(!0),await B(k).toBe(!0),console.log(P,k,$)}),de(c,n,d),(x,L)=>{const g=fe,ee=me,u=he,V=J,te=G,ae=z("router-view"),ie=ve;return l(),w("div",Be,[i(ie,{value:"1",linear:"",class:"basis-[400rem]"},{default:s(()=>[i(ee,null,{default:s(()=>[i(g,{value:"1"},{default:s(()=>[C("Shingles")]),_:1}),i(g,{value:"2"},{default:s(()=>[C("Low Slope")]),_:1}),i(g,{value:"3"},{default:s(()=>[C("Tile")]),_:1}),i(g,{value:"4"},{default:s(()=>[C("Mechanical")]),_:1}),i(g,{value:"5"},{default:s(()=>[C("Summary")]),_:1})]),_:1}),i(te,{class:"object-scale-down h-0 w-1200 ..."},{default:s(()=>[i(V,{value:"1"},{default:s(({activateCallback:r})=>[o("div",Te,[y.value?(l(),m(T(c),{key:0})):S("",!0),o("div",Ie,[i(u,{label:"Next",severity:"contrast",icon:"pi pi-arrow-right",onClick:v=>{r("2"),X()}},null,8,["onClick"])])])]),_:1}),i(V,{value:"2"},{default:s(({activateCallback:r})=>[o("div",Ae,[P.value?(l(),m(T(n),{key:0})):S("",!0),o("div",Ne,[i(u,{label:"Back",severity:"contrast",icon:"pi pi-arrow-left",onClick:v=>r("1")},null,8,["onClick"]),i(u,{label:"Next",severity:"contrast",icon:"pi pi-arrow-right",iconPos:"right",onClick:v=>{r("3"),Y()}},null,8,["onClick"])])])]),_:1}),i(V,{value:"3"},{default:s(({activateCallback:r})=>[o("div",Oe,[$.value?(l(),m(T(d),{key:0})):S("",!0),o("div",Ee,[i(u,{label:"Back",severity:"contrast",icon:"pi pi-arrow-left",onClick:v=>r("2")},null,8,["onClick"]),i(u,{label:"Next",severity:"contrast",icon:"pi pi-arrow-right",iconPos:"right",onClick:v=>{r("4"),Z()}},null,8,["onClick"])])])]),_:1}),i(V,{value:"4"},{default:s(({activateCallback:r})=>[o("div",Le,[k.value?(l(),m(T(a),{key:0})):S("",!0),o("div",je,[i(u,{label:"Back",severity:"contrast",icon:"pi pi-arrow-left",onClick:v=>r("3")},null,8,["onClick"]),i(u,{label:"Next",severity:"contrast",icon:"pi pi-arrow-right",iconPos:"right",onClick:v=>r("5")},null,8,["onClick"])])])]),_:1}),i(V,{value:"5"},{default:s(({activateCallback:r})=>[o("div",Me,[i(_e),o("div",De,[i(u,{label:"Back",severity:"contrast",icon:"pi pi-arrow-left",onClick:v=>r("4")},null,8,["onClick"]),i(u,{label:"Submit",severity:"contrast",icon:"pi pi-arrow-right",iconPos:"right",onClick:v=>r("6")},null,8,["onClick"])])])]),_:1})]),_:1}),i(ae)]),_:1})])}}};export{rt as default};