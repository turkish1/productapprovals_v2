import{s as I}from"./index-1KPC7BgF.js";import{B as E,s as L,o as m,c as x,r as q,m as w,t as A,a as D,n as P,b as R,d as $,e as b,f as T,g as S,u as N,h as F,w as z,A as U,i as t,j as y,k as C,l as k,p as V,q as O}from"./index-Dr66IyCx.js";import{u as W}from"./accountsStore-D7jRIMha.js";import{u as G}from"./useAxios-T-UJnv2d.js";import{u as H}from"./useScreenSize-BU7SbwH7.js";import{_ as K}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-Dp_RpEFz.js";var M=function(s){var e=s.dt;return`
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
`)},J={root:function(s){var e=s.props;return["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},Q=E.extend({name:"avatar",theme:M,classes:J}),X={name:"BaseAvatar",extends:L,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Q,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},B={name:"Avatar",extends:X,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},Y=["aria-labelledby","aria-label"],Z=["src","alt"];function aa(a,s,e,g,n,i){return m(),x("div",w({class:a.cx("root"),"aria-labelledby":a.ariaLabelledby,"aria-label":a.ariaLabel},a.ptmi("root")),[q(a.$slots,"default",{},function(){return[a.label?(m(),x("span",w({key:0,class:a.cx("label")},a.ptm("label")),A(a.label),17)):a.$slots.icon?(m(),D(R(a.$slots.icon),{key:1,class:P(a.cx("icon"))},null,8,["class"])):a.icon?(m(),x("span",w({key:2,class:[a.cx("icon"),a.icon]},a.ptm("icon")),null,16)):a.image?(m(),x("img",w({key:3,src:a.image,alt:a.ariaLabel,onError:s[0]||(s[0]=function(){return i.onError&&i.onError.apply(i,arguments)})},a.ptm("image")),null,16,Z)):$("",!0)]})],16,Y)}B.render=aa;const ea="https://ph2b5e3vusvx74ojurdlrlx5ie0ksqeg.lambda-url.us-east-1.on.aws/";function ta(){const a=b(null),s=b(null);let e=null;const g=b([]),n=T({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""}),i=b(null),{addUser:h}=W();S(()=>{e=google.accounts.oauth2.initTokenClient({client_id:"978320609817-r83rgg9qsb4ntam9dek995cqcn779qut.apps.googleusercontent.com",scope:["openid","email","profile","https://www.googleapis.com/auth/gmail.readonly"].join(" "),callback:o})});const _=()=>e.requestAccessToken({prompt:"consent"}),j=()=>{a.value&&google.accounts.oauth2.revoke(a.value,()=>{a.value=null,s.value=null})};async function o(c){if(c.error)return console.error(c);a.value=c.access_token,N("sessionTokenId",a.value,sessionStorage);const p=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${c.access_token}`}}).then(f=>f.json());i.value=p.email,await d()}const{execute:u}=G(ea,{method:"POST",headers:{"Content-Type":"application/json"}},{immediate:!1});async function d(){var c;try{const f=(await u({data:{email:i.value}})).data.value.body;return g.value=[f],await v(i),f}catch(p){console.error("API Error:",((c=p.response)==null?void 0:c.data)||p.message)}}async function v(c){var f;const p=c.value;for(const r of g.value)if(((f=r.email)==null?void 0:f.toLowerCase())===p.toLowerCase()){n.email=r.email,n.name=r.name,n.dba=r.dba,n.cphone=r.cphone,n.bphone=r.bphone,n.phone=r.bphone,n.expiration_date=r.expiration_date,n.projects=r.projects??[],n.secondary_status=r.secondary_status,n.license=r.license,await h(n);return}console.log("No user found with email",p)}return{accessToken:a,idPayload:s,signIn:_,signOut:j,getUserdata:d,checkEmail:v,localData:g,acctUser:n}}const l=a=>(V("data-v-788d50b6"),a=a(),O(),a),sa={class:"card flex flex-col items-center"},na=k('<div class="flex flex-col items-center gap-2" data-v-788d50b6><span class="text-xl font-medium" data-v-788d50b6>Scroll Down</span><span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center" data-v-788d50b6><i class="pi pi-arrow-down" data-v-788d50b6></i></span></div><div class="h-[30rem]" data-v-788d50b6></div><div class="flex flex-wrap justify-center gap-8" data-v-788d50b6><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000" data-v-788d50b6><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-788d50b6><i class="pi pi-user !text-2xl" data-v-788d50b6></i></div><span class="text-2xl font-bold" data-v-788d50b6>Roofing</span><span class="text-muted-color text-center" data-v-788d50b6>We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000" data-v-788d50b6><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-788d50b6><i class="pi pi-spin pi-cog !text-2xl" data-v-788d50b6></i></div><span class="text-2xl font-bold" data-v-788d50b6>Windows and Doors </span><span class="text-muted-color text-center" data-v-788d50b6>Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000" data-v-788d50b6><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-788d50b6><i class="pi pi-align-justify !text-2xl" data-v-788d50b6></i></div><span class="text-2xl font-bold" data-v-788d50b6>Private Providers</span><span class="text-muted-color text-center" data-v-788d50b6>Soon to come</span></div></div><div class="h-[30rem]" data-v-788d50b6></div>',4),oa={class:"flex flex-wrap justify-center gap-8"},ra={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},ia=l(()=>t("span",{class:"text-2xl font-medium"},"Boris Sursky",-1)),la=l(()=>t("span",{class:"text-center"},"Creator and Founder.",-1)),da={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},ca=l(()=>t("span",{class:"text-2xl font-medium"},"Hugo Blanco",-1)),pa=l(()=>t("span",{class:"text-center"},"Developer and co-Founder.",-1)),ua={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},va=l(()=>t("span",{class:"text-2xl font-medium"},"Future Investor",-1)),fa=l(()=>t("span",{class:"text-center"},"Position to be filled.",-1)),ma=k('<div class="h-[30rem]" data-v-788d50b6></div><div class="flex flex-wrap justify-center gap-8" data-v-788d50b6><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000" data-v-788d50b6><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2" data-v-788d50b6>150K</span><span class="text-2xl font-bold" data-v-788d50b6>Permits Issued</span><span class="text-center" data-v-788d50b6>Number of permits accepted by cities.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000" data-v-788d50b6><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2" data-v-788d50b6>$1.5M</span><span class="text-2xl font-bold" data-v-788d50b6>Cost Saving</span><span class="text-center" data-v-788d50b6>How much the city saved.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000" data-v-788d50b6><span class="text-xl font-medium rounded-xl px-4 py-2" data-v-788d50b6>14K</span><span class="text-2xl font-bold" data-v-788d50b6>Time Saved in hours</span><span class="text-center" data-v-788d50b6>The time cities now have to allocated to other projects.</span></div></div><div class="h-[20rem]" data-v-788d50b6></div>',3),ga={class:"flex flex-wrap justify-center gap-8"},ha=k('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000" data-v-788d50b6><div class="rounded-full border-2 border-white w-48 h-12 flex items-center justify-center" data-v-788d50b6><i class="pi pi-question-circle !text-2xl" data-v-788d50b6></i></div><span class="text-2xl font-bold" data-v-788d50b6>Support </span><span class="text-center" data-v-788d50b6>Click here for support </span></div>',1),xa={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},ba=l(()=>t("div",{class:"rounded-full border-2 border-white w-48 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1)),ya=l(()=>t("span",{class:"text-2xl font-bold"},"Click to Register ",-1)),wa={class:"text-center"},_a={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},ja=l(()=>t("div",{class:"rounded-full border-2 border-white w-48 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-sign-in !text-2xl"})],-1)),Sa=l(()=>t("span",{class:"text-center"},"Click to Login",-1)),ka={class:"text-2xl font-bold"},za={key:0},Ca={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(a){const{accessToken:s,idPayload:e,signIn:g,localData:n}=ta();b([]);const i=F(),h=b(!1);T({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""});const _=async()=>{h.value=!0;try{await g()}catch(o){console.error("Sign-in failed:",o)}finally{h.value=!1}};z(()=>{var o,u,d;if(console.log("Auth State:",{hasToken:!!s.value,localDataCount:(o=n.value)==null?void 0:o.length,navigating:s.value&&((u=n.value)==null?void 0:u.length)>0}),s.value&&((d=n.value)==null?void 0:d.length)>0){const v=setTimeout(()=>{i.push("/permitapp")},50);return()=>clearTimeout(v)}}),z(()=>{s.value&&fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=4",{headers:{Authorization:`Bearer ${s.value}`}}).then(o=>o.json()).then(console.log)}),S(()=>{const{width:o,isUltraWide:u}=H();return{width:o,isUltraWide:u}}),S(()=>{U.init({duration:800,easing:"ease-in-out",once:!0}),localStorage.clear()});function j(){i.push("/terms")}return(o,u)=>{const d=B,v=I;return m(),x("div",sa,[na,t("div",oa,[t("div",ra,[y(d,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ia,la]),t("div",da,[y(d,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ca,pa]),t("div",ua,[y(d,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),va,fa])]),ma,t("div",ga,[ha,t("div",xa,[ba,ya,t("span",wa,[y(v,{id:"register",icon:"pi pi-building",severity:"contrast",variant:"text",rounded:"","aria-label":"Register",size:o.size,loading:h.value,onClick:j},null,8,["size","loading"])])]),t("div",_a,[ja,Sa,t("span",ka,[y(v,{icon:"pi pi-user",severity:"contrast",rounded:"",loading:h.value,onClick:_,raised:""},null,8,["loading"])]),C(e)?(m(),x("pre",za,A(C(e)),1)):$("",!0)])])])}}},qa=K(Ca,[["__scopeId","data-v-788d50b6"]]);export{qa as default};
