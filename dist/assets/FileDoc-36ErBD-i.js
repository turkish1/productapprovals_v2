import{s as n}from"./index-BqXp0dL1.js";import{k as r,r as p,o as m,c as _,e as o,d as s,s as u}from"./index-DdN46Z8B.js";import{a as f}from"./index-YWKtAkG6.js";import"./index-DE1daec3.js";import"./index-ixxyzFaq.js";import"./index-BAi__19D.js";const v={class:"grid grid-cols-12 gap-8"},x={class:"col-span-full lg:col-span-6"},h={class:"card"},g=o("div",{class:"font-semibold text-xl mb-4"},"Advanced",-1),U={class:"col-span-full lg:col-span-6"},b={class:"card"},y=o("div",{class:"font-semibold text-xl mb-4"},"Basic",-1),k={class:"card flex flex-col gap-6 items-center justify-center"},A={__name:"FileDoc",setup(B){const c=r(),e=p(),l=()=>{e.value.upload()},t=()=>{c.add({severity:"info",summary:"Success",detail:"File Uploaded",life:3e3})};return(F,S)=>{const a=f,i=u,d=n;return m(),_("div",v,[o("div",x,[o("div",h,[g,s(a,{name:"demo[]",onUploader:t,multiple:!0,accept:"image/*",maxFileSize:1e6,customUpload:""})])]),o("div",U,[o("div",b,[y,o("div",k,[s(i),s(a,{ref_key:"fileupload",ref:e,mode:"basic",name:"demo[]",accept:"image/*",maxFileSize:1e6,onUploader:t,customUpload:""},null,512),s(d,{label:"Upload",onClick:l,severity:"secondary"})])])])])}}};export{A as default};