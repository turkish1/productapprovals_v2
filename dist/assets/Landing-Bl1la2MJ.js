import{s as B}from"./index-Dni1F9oq.js";import{B as E,s as L,o,c as i,r as N,m as d,t as _,a as W,n as D,b as I,d as j,e as m,f as v,g as P,u as R,h as U,w as M,i as V,A as q,j as t,k as c,l as f,p as x}from"./index-BFHByW5m.js";import{u as F}from"./useGoogleAuth-BktNxbkN.js";import{u as T}from"./accountsStore-C0mR6WLj.js";import"./index-tf2bG66K.js";import"./useAxios-c5LqnOyH.js";var G=function(s){var a=s.dt;return`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: `.concat(a("avatar.width"),`;
    height: `).concat(a("avatar.height"),`;
    font-size: `).concat(a("avatar.font.size"),`;
    background: `).concat(a("avatar.background"),`;
    border-radius: `).concat(a("avatar.border.radius"),`;
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
    font-size: `).concat(a("avatar.font.size"),`;
}

.p-avatar img {
    width: 100%;
    height: 100%;
}

.p-avatar-lg {
    width: `).concat(a("avatar.lg.width"),`;
    height: `).concat(a("avatar.lg.width"),`;
    font-size: `).concat(a("avatar.lg.font.size"),`;
}

.p-avatar-lg .p-avatar-icon {
    font-size: `).concat(a("avatar.lg.font.size"),`;
}

.p-avatar-xl {
    width: `).concat(a("avatar.xl.width"),`;
    height: `).concat(a("avatar.xl.width"),`;
    font-size: `).concat(a("avatar.xl.font.size"),`;
}

.p-avatar-xl .p-avatar-icon {
    font-size: `).concat(a("avatar.xl.font.size"),`;
}

.p-avatar-group {
    display: flex;
    align-items: center;
}

.p-avatar-group .p-avatar + .p-avatar {
    margin-left: `).concat(a("avatar.group.offset"),`;
}

.p-avatar-group .p-avatar {
    border: 2px solid `).concat(a("avatar.group.border.color"),`;
}
`)},H={root:function(s){var a=s.props;return["p-avatar p-component",{"p-avatar-image":a.image!=null,"p-avatar-circle":a.shape==="circle","p-avatar-lg":a.size==="large","p-avatar-xl":a.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},K=E.extend({name:"avatar",theme:G,classes:H}),O={name:"BaseAvatar",extends:L,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:K,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},z={name:"Avatar",extends:O,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},J=["aria-labelledby","aria-label"],Q=["src","alt"];function X(e,s,a,p,g,l){return o(),i("div",d({class:e.cx("root"),"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},e.ptmi("root")),[N(e.$slots,"default",{},function(){return[e.label?(o(),i("span",d({key:0,class:e.cx("label")},e.ptm("label")),_(e.label),17)):e.$slots.icon?(o(),W(I(e.$slots.icon),{key:1,class:D(e.cx("icon"))},null,8,["class"])):e.icon?(o(),i("span",d({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):e.image?(o(),i("img",d({key:3,src:e.image,alt:e.ariaLabel,onError:s[0]||(s[0]=function(){return l.onError&&l.onError.apply(l,arguments)})},e.ptm("image")),null,16,Q)):j("",!0)]})],16,J)}z.render=X;function Y(){const e=m(window.innerWidth),s=()=>e.value=window.innerWidth;return v(()=>window.addEventListener("resize",s)),P(()=>window.removeEventListener("resize",s)),{width:e,isUltraWide:()=>e.value>2560,isMobile:()=>e.value<=768}}const Z={class:"card flex flex-col items-center overflow-hidden"},ee=x('<div class="flex flex-col items-center gap-2"><span class="text-xl font-medium">Scroll Down</span><span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center"><i class="pi pi-arrow-down"></i></span></div><div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-user !text-2xl"></i></div><span class="text-2xl font-bold">Roofing</span><span class="text-muted-color text-center">We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-spin pi-cog !text-2xl"></i></div><span class="text-2xl font-bold">Windows and Doors </span><span class="text-muted-color text-center">Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-align-justify !text-2xl"></i></div><span class="text-2xl font-bold">Private Providers</span><span class="text-muted-color text-center">Soon to come</span></div></div><div class="h-[30rem]"></div>',4),ae={class:"flex flex-wrap justify-center gap-8"},te={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},se=t("span",{class:"text-2xl font-medium"},"Boris Sursky",-1),ne=t("span",{class:"text-center"},"Creator and Founder.",-1),re={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},oe=t("span",{class:"text-2xl font-medium"},"Hugo Blanco",-1),ie=t("span",{class:"text-center"},"Developer and co-Founder.",-1),le={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},ce=t("span",{class:"text-2xl font-medium"},"Future Investor",-1),de=t("span",{class:"text-center"},"Position to be filled.",-1),pe=x('<div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">150K</span><span class="text-2xl font-bold">Permits Issued</span><span class="text-center">Number of permits accepted by cities.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span><span class="text-2xl font-bold">Cost Saving</span><span class="text-center">How much the city saved.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">14K</span><span class="text-2xl font-bold">Time Saved in hours</span><span class="text-center">The time cities now have to allocated to other projects.</span></div></div><div class="h-[20rem]"></div>',3),ue={class:"flex flex-wrap justify-center gap-8"},fe=x('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000"><div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"><i class="pi pi-question-circle !text-2xl"></i></div><span class="text-2xl font-bold">Support </span><span class="text-center">Click here for support </span></div>',1),me={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},ve=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1),xe=t("span",{class:"text-2xl font-bold"},"Click to Register ",-1),ge={class:"text-center"},he={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},be=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-sign-in !text-2xl"})],-1),we=t("span",{class:"text-center"},"Click to Login",-1),ye={class:"text-2xl font-bold"},_e={key:0},Ae={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(e){const{accessToken:s,idPayload:a,signIn:p,localData:g}=F(),l=m([]),h=R(),b=m(!1);let S=U({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""});const{getUser:k}=T(),w=()=>{console.log(k),g.value.forEach((n,u)=>{for(let r=0;r<n.length;r++)s.value&&(l.value.push(n[r]),S.phone=n[r].bphone,$())})};function $(){C()}function C(){h.push("/permitapp")}M(w,()=>{}),V(()=>{s.value&&fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=4",{headers:{Authorization:`Bearer ${s.value}`}}).then(n=>n.json()).then(console.log)}),v(()=>{const{width:n,isUltraWide:u}=Y();return{width:n,isUltraWide:u}}),v(()=>{q.init({duration:800,easing:"ease-in-out",once:!0}),localStorage.clear()});function A(){h.push("/registration")}return(n,u)=>{const r=z,y=B;return o(),i("div",Z,[ee,t("div",ae,[t("div",te,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),se,ne]),t("div",re,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),oe,ie]),t("div",le,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ce,de])]),pe,t("div",ue,[fe,t("div",me,[ve,xe,t("span",ge,[c(y,{id:"register",icon:"pi pi-building",severity:"contrast",variant:"text",rounded:"","aria-label":"Register",size:n.size,loading:b.value,onClick:A},null,8,["size","loading"])])]),t("div",he,[be,we,t("span",ye,[c(y,{icon:"pi pi-user",severity:"contrast",rounded:"",loading:b.value,onClick:f(p),onChange:w,raised:"",onInput:n.email},null,8,["loading","onClick","onInput"])]),f(a)?(o(),i("pre",_e,_(f(a)),1)):j("",!0)])])])}}};export{Ae as default};
