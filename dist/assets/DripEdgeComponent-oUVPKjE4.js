import{s as h}from"./index-Bg1t4VZB.js";import{u as z}from"./useAxios-BXjO8pu8.js";import{r as e,w as g,aa as S,c as V,d as y,e as f,f as _}from"./index-BHzPe7uK.js";function E(){const s=e([]),l=e([]),o=e([]),r=e([]),u=e(!1),a=e(null),n=e([]);u.value=!0;let t="https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/dripmaterials";const{execute:p,then:d,data:v}=z(t,{method:"GET"},{immediate:!1});return o.value=p().then(c=>{l.value=v.value.result,s.value=v.value.result.Drip_Edge_Material_Type;for(let i=0;i<s.value.length;i++)n.value.push(s.value[i]);return r.value.push(l.value.size1,l.value.size2,l.value.size3,l.value.size4),s.value}),u.value=!1,{type:n,error:a,loading:u,hold:s,results:o,typeSize:r,holdSize:l}}const b={class:"flex flex-col w-96 mb-4 gap-3",style:{"margin-left":"20px"}},k=_("label",null,"Drip Edge Material",-1),x=_("label",null,"Drip Edge Size",-1),C={__name:"DripEdgeComponent",setup(s){const{type:l,holdSize:o}=E(),r=e(),u=e(),a=e(null),n=e(),t=e();function p(){n.value=l.value}g(n,t,l);function d(){a.value?(console.log(a.value),a.value.label==="Galvanized Steel Metal ¹"&&(t.value=o.value.size1),a.value.label==="Stainless Steel Metal ²"&&(t.value=o.value.size2),a.value.label==="Aluminum Metal ³"&&(t.value=o.value.size3),a.value.label==="Copper Metal ⁴"&&(t.value=o.value.size4)):console.log("The element not mounted yet")}return S(p,d),(v,c)=>{const i=h;return V(),y("div",b,[k,f(i,{ref_key:"selectedValue",ref:a,modelValue:r.value,"onUpdate:modelValue":c[0]||(c[0]=m=>r.value=m),options:n.value,placeholder:"make selection",onClick:p},null,8,["modelValue","options"]),x,f(i,{modelValue:u.value,"onUpdate:modelValue":c[1]||(c[1]=m=>u.value=m),options:t.value,placeholder:"make selection",onClick:d},null,8,["modelValue","options"])])}}};export{C as _};