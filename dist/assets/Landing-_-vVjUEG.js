import{s as B}from"./index-D7cdsMnX.js";import{B as E,s as L,o as p,c as v,r as T,m as w,t as C,a as q,n as D,b as P,d as A,e as f,f as $,g as S,u as N,h as R,w as U,i as F,A as V,j as t,k as m,l as k,p as z,q as O,v as W}from"./index-JMpC5vnI.js";import{u as G}from"./accountsStore-xb8oO36w.js";import{u as H}from"./useAxios-Dv3B_cJm.js";import{u as K}from"./useScreenSize-kyWRYQZd.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-m3qcElWz.js";var J=function(o){var e=o.dt;return`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: `.concat(e("avatar.width"),`;
    height: `).concat(e("avatar.height"),`;
    font-size: `).concat(e("avatar.font.size"),`;
    background: `).concat(e("avatar.background"),`;
    border-radius: `).concat(e("avatar.border.radius"),`;
}

.p-avatar-image {
    background: transparent;
}

.p-avatar-circle {
    border-radius: 50%;
}

.p-avatar-circle img {
    border-radius: 50%;
}

.p-avatar-icon {
    font-size: `).concat(e("avatar.font.size"),`;
}

.p-avatar img {
    width: 100%;
    height: 100%;
}

.p-avatar-lg {
    width: `).concat(e("avatar.lg.width"),`;
    height: `).concat(e("avatar.lg.width"),`;
    font-size: `).concat(e("avatar.lg.font.size"),`;
}

.p-avatar-lg .p-avatar-icon {
    font-size: `).concat(e("avatar.lg.font.size"),`;
}

.p-avatar-xl {
    width: `).concat(e("avatar.xl.width"),`;
    height: `).concat(e("avatar.xl.width"),`;
    font-size: `).concat(e("avatar.xl.font.size"),`;
}

.p-avatar-xl .p-avatar-icon {
    font-size: `).concat(e("avatar.xl.font.size"),`;
}

.p-avatar-group {
    display: flex;
    align-items: center;
}

.p-avatar-group .p-avatar + .p-avatar {
    margin-left: `).concat(e("avatar.group.offset"),`;
}

.p-avatar-group .p-avatar {
    border: 2px solid `).concat(e("avatar.group.border.color"),`;
}
`)},Q={root:function(o){var e=o.props;return["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},X=E.extend({name:"avatar",theme:J,classes:Q}),Y={name:"BaseAvatar",extends:L,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:X,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},I={name:"Avatar",extends:Y,inheritAttrs:!1,emits:["error"],methods:{onError:function(o){this.$emit("error",o)}}},Z=["aria-labelledby","aria-label"],aa=["src","alt"];function ea(a,o,e,u,n,c){return p(),v("div",w({class:a.cx("root"),"aria-labelledby":a.ariaLabelledby,"aria-label":a.ariaLabel},a.ptmi("root")),[T(a.$slots,"default",{},function(){return[a.label?(p(),v("span",w({key:0,class:a.cx("label")},a.ptm("label")),C(a.label),17)):a.$slots.icon?(p(),q(P(a.$slots.icon),{key:1,class:D(a.cx("icon"))},null,8,["class"])):a.icon?(p(),v("span",w({key:2,class:[a.cx("icon"),a.icon]},a.ptm("icon")),null,16)):a.image?(p(),v("img",w({key:3,src:a.image,alt:a.ariaLabel,onError:o[0]||(o[0]=function(){return c.onError&&c.onError.apply(c,arguments)})},a.ptm("image")),null,16,aa)):A("",!0)]})],16,Z)}I.render=ea;const ta="https://ph2b5e3vusvx74ojurdlrlx5ie0ksqeg.lambda-url.us-east-1.on.aws/";function sa(){const a=f(null),o=f(null);let e=null;const u=f([]),n=$({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""}),c=f(null),{addUser:g}=G();S(()=>{e=google.accounts.oauth2.initTokenClient({client_id:"978320609817-r83rgg9qsb4ntam9dek995cqcn779qut.apps.googleusercontent.com",scope:["openid","email","profile","https://www.googleapis.com/auth/gmail.readonly"].join(" "),callback:x})});const h=()=>e.requestAccessToken({prompt:"consent"}),_=()=>{a.value&&google.accounts.oauth2.revoke(a.value,()=>{a.value=null,o.value=null})};async function x(s){if(s.error)return console.error(s);a.value=s.access_token,N("sessionTokenId",a.value,sessionStorage);const i=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${s.access_token}`}}).then(l=>l.json());c.value=i.email,await b()}const{execute:j}=H(ta,{method:"POST",headers:{"Content-Type":"application/json"}},{immediate:!1});async function b(){var s;try{const l=(await j({data:{email:c.value}})).data.value.body;return u.value=[l],await y(c),l}catch(i){console.error("API Error:",((s=i.response)==null?void 0:s.data)||i.message)}}async function y(s){var l;const i=s.value;for(const r of u.value)if(((l=r.email)==null?void 0:l.toLowerCase())===i.toLowerCase()){n.email=r.email,n.name=r.name,n.dba=r.dba,n.cphone=r.cphone,n.bphone=r.bphone,n.phone=r.bphone,n.expiration_date=r.expiration_date,n.projects=r.projects??[],n.secondary_status=r.secondary_status,n.license=r.license,await g(n);return}console.log("No user found with email",i)}return{accessToken:a,idPayload:o,signIn:h,signOut:_,getUserdata:b,checkEmail:y,localData:u,acctUser:n}}const d=a=>(O("data-v-d1475704"),a=a(),W(),a),na={class:"card flex flex-col items-center"},oa=z('<div class="flex flex-col items-center gap-2" data-v-d1475704><span class="text-xl font-medium" data-v-d1475704>Scroll Down</span><span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center" data-v-d1475704><i class="pi pi-arrow-down" data-v-d1475704></i></span></div><div class="h-[30rem]" data-v-d1475704></div><div class="flex flex-wrap justify-center gap-8" data-v-d1475704><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000" data-v-d1475704><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-d1475704><i class="pi pi-user !text-2xl" data-v-d1475704></i></div><span class="text-2xl font-bold" data-v-d1475704>Roofing</span><span class="text-muted-color text-center" data-v-d1475704>We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000" data-v-d1475704><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-d1475704><i class="pi pi-spin pi-cog !text-2xl" data-v-d1475704></i></div><span class="text-2xl font-bold" data-v-d1475704>Windows and Doors </span><span class="text-muted-color text-center" data-v-d1475704>Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000" data-v-d1475704><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-d1475704><i class="pi pi-align-justify !text-2xl" data-v-d1475704></i></div><span class="text-2xl font-bold" data-v-d1475704>Private Providers</span><span class="text-muted-color text-center" data-v-d1475704>Soon to come</span></div></div><div class="h-[30rem]" data-v-d1475704></div>',4),ra={class:"flex flex-wrap justify-center gap-8"},ia={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},la=d(()=>t("span",{class:"text-2xl font-medium"},"Boris Sursky",-1)),da=d(()=>t("span",{class:"text-center"},"Creator and Founder.",-1)),ca={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},pa=d(()=>t("span",{class:"text-2xl font-medium"},"Hugo Blanco",-1)),ua=d(()=>t("span",{class:"text-center"},"Developer and co-Founder.",-1)),va={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},fa=d(()=>t("span",{class:"text-2xl font-medium"},"Future Investor",-1)),ma=d(()=>t("span",{class:"text-center"},"Position to be filled.",-1)),ga=z('<div class="h-[30rem]" data-v-d1475704></div><div class="flex flex-wrap justify-center gap-8" data-v-d1475704><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000" data-v-d1475704><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2" data-v-d1475704>150K</span><span class="text-2xl font-bold" data-v-d1475704>Permits Issued</span><span class="text-center" data-v-d1475704>Number of permits accepted by cities.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000" data-v-d1475704><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2" data-v-d1475704>$1.5M</span><span class="text-2xl font-bold" data-v-d1475704>Cost Saving</span><span class="text-center" data-v-d1475704>How much the city saved.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000" data-v-d1475704><span class="text-xl font-medium rounded-xl px-4 py-2" data-v-d1475704>14K</span><span class="text-2xl font-bold" data-v-d1475704>Time Saved in hours</span><span class="text-center" data-v-d1475704>The time cities now have to allocated to other projects.</span></div></div><div class="h-[20rem]" data-v-d1475704></div>',3),ha={class:"flex flex-wrap justify-center gap-8"},xa=z('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000" data-v-d1475704><div class="rounded-full border-2 border-white w-48 h-12 flex items-center justify-center" data-v-d1475704><i class="pi pi-question-circle !text-2xl" data-v-d1475704></i></div><span class="text-2xl font-bold" data-v-d1475704>Support </span><span class="text-center" data-v-d1475704>Click here for support </span></div>',1),ba={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},ya=d(()=>t("div",{class:"rounded-full border-2 border-white w-48 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1)),wa=d(()=>t("span",{class:"text-2xl font-bold"},"Click to Register ",-1)),_a={class:"text-center"},ja={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},ka=d(()=>t("div",{class:"rounded-full border-2 border-white w-48 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-sign-in !text-2xl"})],-1)),Sa=d(()=>t("span",{class:"text-center"},"Click to Login",-1)),za={class:"text-2xl font-bold"},Ca={key:0},Aa={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(a){const{accessToken:o,idPayload:e,signIn:u,localData:n}=sa(),c=f([]),g=R(),h=f(!1);let _=$({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""});const x=()=>{o.value&&Array.isArray(n.value)?n.value.forEach(s=>{c.value.push(s),_.phone=s.bphone,j()}):console.warn("localData.value is not an array:",n.value)};function j(){b()}function b(){g.push("/permitapp")}U(x,()=>{}),F(()=>{o.value&&fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=4",{headers:{Authorization:`Bearer ${o.value}`}}).then(s=>s.json()).then(console.log)}),S(()=>{const{width:s,isUltraWide:i}=K();return{width:s,isUltraWide:i}}),S(()=>{V.init({duration:800,easing:"ease-in-out",once:!0}),localStorage.clear()});function y(){g.push("/terms")}return(s,i)=>{const l=I,r=B;return p(),v("div",na,[oa,t("div",ra,[t("div",ia,[m(l,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),la,da]),t("div",ca,[m(l,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),pa,ua]),t("div",va,[m(l,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),fa,ma])]),ga,t("div",ha,[xa,t("div",ba,[ya,wa,t("span",_a,[m(r,{id:"register",icon:"pi pi-building",severity:"contrast",variant:"text",rounded:"","aria-label":"Register",size:s.size,loading:h.value,onClick:y},null,8,["size","loading"])])]),t("div",ja,[ka,Sa,t("span",za,[m(r,{icon:"pi pi-user",severity:"contrast",rounded:"",loading:h.value,onClick:k(u),onChange:x,raised:"",onInput:s.email},null,8,["loading","onClick","onInput"])]),k(e)?(p(),v("pre",Ca,C(k(e)),1)):A("",!0)])])])}}},Da=M(Aa,[["__scopeId","data-v-d1475704"]]);export{Da as default};
