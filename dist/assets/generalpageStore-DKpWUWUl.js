import{u as v}from"./pdfsignStore-BPKdML_o.js";import{u as b}from"./useAxios-BA6bsTvR.js";import{r as n,a as x,q as D}from"./index-CgNQnJ6L.js";function L(s){const o=n(),r=n(s),u=n(""),e=x({status:"",message:"",isFinished:"",isLoading:""}),i=n(),l=n("");let d="https://681byz7j80.execute-api.us-east-1.amazonaws.com/sendmenumber/sendmenumber";const{execute:m,then:S,data:p}=b(d,{method:"GET"},{immediate:!1});function f(a){console.log(a),o.value=a,console.log(r.value),u.value=o.value+"/",c()}const{confirmResponse:g,addResponse:h}=v(),c=async()=>{try{const a=await m({params:{processnumber:u.value}}).then(t=>{i.value=p.value,e.status=t.response.value.status,e.message=t.data.value,e.isFinished=t.isFinished,e.isLoading=t.isLoading,console.log(t)});return h(e),e}catch(a){console.log("Error, fectching data",a)}};return{error:l,getNumbers:f,procNum:i,sentInput:r,fetchData:c,confirmResponse:g,results:e}}const w=D("generalpdfinput",{state:()=>({generalpdfinput:[],id:0}),actions:{addgeneralpdfData(s){this.generalpdfinput.push({generalpdfData:s,completed:!1})}},getters:{generalpdfData:s=>s.generalpdfData}});export{w as a,L as u};