import{s as T}from"./index-CfC_oFIi.js";import{_ as S,x as w,r as f,o as _,c as v,e as s,d as c,h as A,R as m,f as C,S as B,p as D,i as U,l as z,V as E,t as y,z as N,F as j}from"./index-CC9RM5J4.js";import{u as b}from"./permitapp-BZXH-fNx.js";import{u as $}from"./roofList-Cu10b8vF.js";import{s as V}from"./index-BFqd3J45.js";import{s as M}from"./index-D0J61ynR.js";import{h as H,E as G}from"./jspdf.es.min-ZUQxa_iL.js";import{t as O}from"./index-BcGqECGe.js";import"./index-DofdxD5p.js";import"./index-usFgwfve.js";import"./index-Dvev-DnW.js";const I=p=>(D("data-v-91d42983"),p=p(),U(),p),W={id:"roofselect",class:"card flex justify-center"},q={class:"refresh"},J={class:"card flex flex-col gap-4"},K=I(()=>s("h1",{class:"h1"},"Select System",-1)),Q={class:"card flex flex-col gap-4"},X=I(()=>s("h1",{class:"h1"},"Select System",-1)),Y={class:"add"},Z={class:"grid grid-cols-1 gap-2 place-content-end h42 .."},ee={__name:"RoofSystemForm",setup(p){const l=$(),u=b(),{permitapp:h}=w(u);console.log(h._object);const a=f(""),i=f(""),r=f([{name:" "},{name:"Low Slope"},{name:"Asphalt Shingle"},{name:"Mechanical Fastened Tile"},{name:"Mortar/Adhesive Tile"},{name:"Metal Panel"}]),x=f([{name:" "},{name:"Low Slope"},{name:"Mechanical Fastened Tile"},{name:"Mortar/Adhesive Tile"},{name:"Metal Panel"}]);O(b,()=>{console.log(h)});function R(){l.$reset()}const L=()=>{const e=document.getElementById("roofselect");console.log(e),H(e).then(n=>{const o=n.toDataURL("image/png"),d=new G;d.addImage(o,"PNG",10,10,190,0);const g=d.output("blob");t(g)});const t=async n=>{try{const d=await(await window.showSaveFilePicker({suggestedName:"generated.pdf",types:[{description:"PDF file",accept:{"application/pdf":[".pdf"]}}]})).createWritable();await d.write(n),await d.close(),console.log("PDF saved successfully without popping download dialog!")}catch(o){console.error("Error saving file:",o)}}},k=f(!1);function F(e,t,n,o,d,g){e=i.value.name,e.length!==0&&(e==="Asphalt Shingle"&&(t=a.value,l.addSystemShingle(e,t)),e==="Low Slope"&&(n=a.value,l.addSystemBur(e,n)),e==="Mechanical Fastened Tile"&&(o=a.value,l.addSystemMTile(e,o)),e==="Mortar/Adhesive Tile"&&(d=a.value,l.addSystemATile(e,d)),e==="Metal Panel"&&(g=a.value,l.addSystemMetal(e,g)),P(),console.log(e,t,"System added"))}function P(){a.value="",i.value=""}return(e,t)=>{const n=T;return _(),v("div",W,[s("div",q,[c(m(V),{plain:"",text:""},{default:A(()=>[s("i",{class:"pi pi-refresh",style:{"font-size":"2rem",color:"grey","margin-left":"10px","margin-top":"90px"},onClick:R})]),_:1})]),s("form",null,[s("div",J,[K,c(m(M),{modelValue:i.value,"onUpdate:modelValue":t[0]||(t[0]=o=>i.value=o),options:r.value,optionLabel:"name",placeholder:"Select roof system",class:"w-full md:w-56"},null,8,["modelValue","options"]),c(n,{type:"text",modelValue:a.value,"onUpdate:modelValue":t[1]||(t[1]=o=>a.value=o)},null,8,["modelValue"])]),C(s("div",Q,[X,c(m(M),{modelValue:i.value,"onUpdate:modelValue":t[2]||(t[2]=o=>i.value=o),options:x.value,optionLabel:"name",placeholder:"Select roof system",class:"w-full md:w-56"},null,8,["modelValue","options"]),c(n,{type:"text",modelValue:a.value,"onUpdate:modelValue":t[3]||(t[3]=o=>a.value=o)},null,8,["modelValue"])],512),[[B,k.value]])]),s("div",Y,[s("i",{class:"pi pi-plus-circle",style:{"font-size":"2rem",color:"gray","margin-left":"1px","margin-top":"150px"},onClick:t[4]||(t[4]=o=>F(i.value,a.value))})]),s("div",Z,[s("div",null,[c(m(V),{class:"button",label:"Submit",severity:"contrast",style:{"margin-left":"5px","margin-top":"100px"},as:"router-link",to:"/generalpage",onClick:L})])])])}}},te=S(ee,[["__scopeId","data-v-91d42983"]]),oe={class:"content"},se=["onClick"],ae={__name:"RoofSystemList",setup(p){const l=$(),{roofList:u}=w(l),{toggleCompleted:h}=w(l);return(a,i)=>(_(!0),v(j,null,z(m(u),r=>(_(),v("div",{key:r.id,class:"item"},[s("div",oe,[s("span",{class:E({completed:r.completed})},y(r.item)+" : "+y(r.dim1)+" : "+y(r.dim2),3),s("span",{onClick:N(x=>m(h)(r.id),["stop"])},"✔",8,se)])]))),128))}},le=S(ae,[["__scopeId","data-v-a1be5467"]]),ne={class:"container"},ce={class:"roof-app"},ie={__name:"RoofSystemApp",setup(p){return(l,u)=>(_(),v("div",ne,[s("div",ce,[c(te),c(le)])]))}},re=S(ie,[["__scopeId","data-v-ddfbf9b8"]]),de={class:"row"},pe={class:"card flex flex-col gap-4"},me={__name:"RoofSystem",setup(p){return(l,u)=>(_(),v("div",de,[s("div",pe,[c(re)])]))}},Ve=S(me,[["__scopeId","data-v-b011261b"]]);export{Ve as default};