import{s as n}from"./index-BlnTrmP9.js";import{m as r,r as p,o as m,c as _,e as o,d as e,x as u}from"./index-C1cXTTxg.js";import{a as f}from"./index-pXNEA63j.js";import"./index-_4CajcGH.js";import"./index-B3LcLxqr.js";import"./index-Bv3DZ5dC.js";const v={class:"grid grid-cols-12 gap-8"},x={class:"col-span-full lg:col-span-6"},h={class:"card"},g=o("div",{class:"font-semibold text-xl mb-4"},"Advanced",-1),U={class:"col-span-full lg:col-span-6"},b={class:"card"},y=o("div",{class:"font-semibold text-xl mb-4"},"Basic",-1),B={class:"card flex flex-col gap-6 items-center justify-center"},A={__name:"FileDoc",setup(F){const c=r(),s=p(),l=()=>{s.value.upload()},t=()=>{c.add({severity:"info",summary:"Success",detail:"File Uploaded",life:3e3})};return(k,S)=>{const a=f,i=u,d=n;return m(),_("div",v,[o("div",x,[o("div",h,[g,e(a,{name:"demo[]",onUploader:t,multiple:!0,accept:"image/*",maxFileSize:1e6,customUpload:""})])]),o("div",U,[o("div",b,[y,o("div",B,[e(i),e(a,{ref_key:"fileupload",ref:s,mode:"basic",name:"demo[]",accept:"image/*",maxFileSize:1e6,onUploader:t,customUpload:""},null,512),e(d,{label:"Upload",onClick:l,severity:"secondary"})])])])])}}};export{A as default};