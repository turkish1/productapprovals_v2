import{s as C}from"./index-BE0uYLvv.js";import{_ as S,s as x,r as f,o as _,c as v,e as s,d as c,h as P,P as p,f as B,Q as F,p as D,i as U,R as E,S as z,q as y,n as N,F as j}from"./index-C1cXTTxg.js";import{u as w}from"./permitapp-CYeeHHNB.js";import{u as $}from"./roofList-BJ6njoPS.js";import{s as V}from"./index-BlnTrmP9.js";import{s as M}from"./index-gvH1i5GA.js";import{h as q,E as G}from"./jspdf.es.min-Dce1sIpr.js";import{t as H}from"./index-CkZmHb6w.js";import"./index-_4CajcGH.js";import"./index-vGHOma5Z.js";import"./index-R75rnpNi.js";const I=d=>(D("data-v-db18bf53"),d=d(),U(),d),O={id:"roofselect",class:"card flex justify-center"},Q={class:"refresh"},W={class:"card flex flex-col gap-4"},J=I(()=>s("h1",{class:"h1"},"Select System",-1)),K={class:"card flex flex-col gap-4"},X=I(()=>s("h1",{class:"h1"},"Select System",-1)),Y={class:"add"},Z={class:"grid grid-cols-1 gap-2 place-content-end h42 .."},ee={__name:"RoofSystemForm",setup(d){const l=$(),m=w(),{permitapp:h}=x(m);console.log(h._object);const a=f(""),r=f(""),i=f([{name:" "},{name:"Low Slope"},{name:"Asphalt Shingle"},{name:"Mechanical Fastened Tile"},{name:"Mortar/Adhesive Tile"},{name:"Metal Panel"}]),b=f([{name:" "},{name:"Low Slope"},{name:"Mechanical Fastened Tile"},{name:"Mortar/Adhesive Tile"},{name:"Metal Panel"}]);H(w,()=>{console.log(h)});function R(){l.$reset()}const L=()=>{const t=document.getElementById("roofselect");console.log(t),q(t).then(n=>{const e=n.toDataURL("image/png"),u=new G;u.addImage(e,"PNG",10,10,190,0);const g=u.output("blob");o(g)});const o=async n=>{try{const e=await fileHandle.createWritable();await e.write(n),await e.close(),console.log("PDF saved successfully without popping download dialog!")}catch(e){console.error("Error saving file:",e)}}},T=f(!1);function k(t,o,n,e,u,g){t=r.value.name,t.length!==0&&(t==="Asphalt Shingle"&&(o=a.value,l.addSystemShingle(t,o)),t==="Low Slope"&&(n=a.value,l.addSystemBur(t,n)),t==="Mechanical Fastened Tile"&&(e=a.value,l.addSystemMTile(t,e)),t==="Mortar/Adhesive Tile"&&(u=a.value,l.addSystemATile(t,u)),t==="Metal Panel"&&(g=a.value,l.addSystemMetal(t,g)),A(),console.log(t,o,"System added"))}function A(){a.value="",r.value=""}return(t,o)=>{const n=C;return _(),v("div",O,[s("div",Q,[c(p(V),{plain:"",text:""},{default:P(()=>[s("i",{class:"pi pi-refresh",style:{"font-size":"2rem",color:"grey","margin-left":"10px","margin-top":"90px"},onClick:R})]),_:1})]),s("form",null,[s("div",W,[J,c(p(M),{modelValue:r.value,"onUpdate:modelValue":o[0]||(o[0]=e=>r.value=e),options:i.value,optionLabel:"name",placeholder:"Select roof system",class:"w-full md:w-56"},null,8,["modelValue","options"]),c(n,{type:"text",modelValue:a.value,"onUpdate:modelValue":o[1]||(o[1]=e=>a.value=e)},null,8,["modelValue"])]),B(s("div",K,[X,c(p(M),{modelValue:r.value,"onUpdate:modelValue":o[2]||(o[2]=e=>r.value=e),options:b.value,optionLabel:"name",placeholder:"Select roof system",class:"w-full md:w-56"},null,8,["modelValue","options"]),c(n,{type:"text",modelValue:a.value,"onUpdate:modelValue":o[3]||(o[3]=e=>a.value=e)},null,8,["modelValue"])],512),[[F,T.value]])]),s("div",Y,[s("i",{class:"pi pi-plus-circle",style:{"font-size":"2rem",color:"gray","margin-left":"1px","margin-top":"150px"},onClick:o[4]||(o[4]=e=>k(r.value,a.value))})]),s("div",Z,[s("div",null,[c(p(V),{class:"button",label:"Submit",severity:"contrast",style:{"margin-left":"5px","margin-top":"100px"},as:"router-link",to:"/generalpage",onClick:L})])])])}}},te=S(ee,[["__scopeId","data-v-db18bf53"]]),oe={class:"content"},se=["onClick"],ae={__name:"RoofSystemList",setup(d){const l=$(),{roofList:m}=x(l),{toggleCompleted:h}=x(l);return(a,r)=>(_(!0),v(j,null,E(p(m),i=>(_(),v("div",{key:i.id,class:"item"},[s("div",oe,[s("span",{class:z({completed:i.completed})},y(i.item)+" : "+y(i.dim1)+" : "+y(i.dim2),3),s("span",{onClick:N(b=>p(h)(i.id),["stop"])},"✔",8,se)])]))),128))}},le=S(ae,[["__scopeId","data-v-a1be5467"]]),ne={class:"container"},ce={class:"roof-app"},re={__name:"RoofSystemApp",setup(d){return(l,m)=>(_(),v("div",ne,[s("div",ce,[c(te),c(le)])]))}},ie=S(re,[["__scopeId","data-v-ddfbf9b8"]]),de={class:"row"},pe={class:"card flex flex-col gap-4"},me={__name:"RoofSystem",setup(d){return(l,m)=>(_(),v("div",de,[s("div",pe,[c(ie)])]))}},Ve=S(me,[["__scopeId","data-v-b011261b"]]);export{Ve as default};