import{s as B}from"./index-DYYjDgrc.js";import{B as E,s as L,o,c as i,r as N,m as d,t as _,a as D,n as I,b as P,d as j,e as y,u as R,f as V,w as q,g as F,h as w,A as T,i as t,j as c,k as u,l as f}from"./index-DSTqCLlX.js";import{u as U}from"./useGoogleAuth-BtE26UsU.js";import{u as W}from"./useScreenSize-BAx4SvnI.js";import{u as G}from"./accountsStore-DC5JpqCv.js";import"./index-CAbWHwFS.js";import"./useAxios-DnBqunHC.js";var H=function(s){var a=s.dt;return`
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
`)},K={root:function(s){var a=s.props;return["p-avatar p-component",{"p-avatar-image":a.image!=null,"p-avatar-circle":a.shape==="circle","p-avatar-lg":a.size==="large","p-avatar-xl":a.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},M=E.extend({name:"avatar",theme:H,classes:K}),O={name:"BaseAvatar",extends:L,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:M,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},z={name:"Avatar",extends:O,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},J=["aria-labelledby","aria-label"],Q=["src","alt"];function X(e,s,a,m,x,l){return o(),i("div",d({class:e.cx("root"),"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},e.ptmi("root")),[N(e.$slots,"default",{},function(){return[e.label?(o(),i("span",d({key:0,class:e.cx("label")},e.ptm("label")),_(e.label),17)):e.$slots.icon?(o(),D(P(e.$slots.icon),{key:1,class:I(e.cx("icon"))},null,8,["class"])):e.icon?(o(),i("span",d({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):e.image?(o(),i("img",d({key:3,src:e.image,alt:e.ariaLabel,onError:s[0]||(s[0]=function(){return l.onError&&l.onError.apply(l,arguments)})},e.ptm("image")),null,16,Q)):j("",!0)]})],16,J)}z.render=X;const Y={class:"card flex flex-col items-center overflow-hidden"},Z=f('<div class="flex flex-col items-center gap-2"><span class="text-xl font-medium">Scroll Down</span><span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center"><i class="pi pi-arrow-down"></i></span></div><div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-user !text-2xl"></i></div><span class="text-2xl font-bold">Roofing</span><span class="text-muted-color text-center">We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-spin pi-cog !text-2xl"></i></div><span class="text-2xl font-bold">Windows and Doors </span><span class="text-muted-color text-center">Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-align-justify !text-2xl"></i></div><span class="text-2xl font-bold">Private Providers</span><span class="text-muted-color text-center">Soon to come</span></div></div><div class="h-[30rem]"></div>',4),ee={class:"flex flex-wrap justify-center gap-8"},ae={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},te=t("span",{class:"text-2xl font-medium"},"Boris Sursky",-1),se=t("span",{class:"text-center"},"Creator and Founder.",-1),ne={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},re=t("span",{class:"text-2xl font-medium"},"Hugo Blanco",-1),oe=t("span",{class:"text-center"},"Developer and co-Founder.",-1),ie={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},le=t("span",{class:"text-2xl font-medium"},"Future Investor",-1),ce=t("span",{class:"text-center"},"Position to be filled.",-1),de=f('<div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">150K</span><span class="text-2xl font-bold">Permits Issued</span><span class="text-center">Number of permits accepted by cities.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span><span class="text-2xl font-bold">Cost Saving</span><span class="text-center">How much the city saved.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">14K</span><span class="text-2xl font-bold">Time Saved in hours</span><span class="text-center">The time cities now have to allocated to other projects.</span></div></div><div class="h-[20rem]"></div>',3),pe={class:"flex flex-wrap justify-center gap-8"},ue=f('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000"><div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"><i class="pi pi-question-circle !text-2xl"></i></div><span class="text-2xl font-bold">Support </span><span class="text-center">Click here for support </span></div>',1),fe={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},me=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1),xe=t("span",{class:"text-2xl font-bold"},"Click to Register ",-1),ge={class:"text-center"},ve={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},he=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-sign-in !text-2xl"})],-1),be=t("span",{class:"text-center"},"Click to Login",-1),ye={class:"text-2xl font-bold"},we={key:0},Ae={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(e){const{accessToken:s,idPayload:a,signIn:m,localData:x}=U(),l=y([]),g=R(),v=y(!1);let S=V({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""});const{getUser:k}=G(),h=()=>{console.log(k),x.value.forEach((n,p)=>{for(let r=0;r<n.length;r++)s.value&&(l.value.push(n[r]),S.phone=n[r].bphone,$())})};function $(){C()}function C(){g.push("/permitapp")}q(h,()=>{}),F(()=>{s.value&&fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=4",{headers:{Authorization:`Bearer ${s.value}`}}).then(n=>n.json()).then(console.log)}),w(()=>{const{width:n,isUltraWide:p}=W();return{width:n,isUltraWide:p}}),w(()=>{T.init({duration:800,easing:"ease-in-out",once:!0}),localStorage.clear()});function A(){g.push("/registration")}return(n,p)=>{const r=z,b=B;return o(),i("div",Y,[Z,t("div",ee,[t("div",ae,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),te,se]),t("div",ne,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),re,oe]),t("div",ie,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),le,ce])]),de,t("div",pe,[ue,t("div",fe,[me,xe,t("span",ge,[c(b,{id:"register",icon:"pi pi-building",severity:"contrast",variant:"text",rounded:"","aria-label":"Register",size:n.size,loading:v.value,onClick:A},null,8,["size","loading"])])]),t("div",ve,[he,be,t("span",ye,[c(b,{icon:"pi pi-user",severity:"contrast",rounded:"",loading:v.value,onClick:u(m),onChange:h,raised:"",onInput:n.email},null,8,["loading","onClick","onInput"])]),u(a)?(o(),i("pre",we,_(u(a)),1)):j("",!0)])])])}}};export{Ae as default};
