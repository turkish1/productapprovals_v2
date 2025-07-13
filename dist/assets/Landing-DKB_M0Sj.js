import{s as A}from"./index-Djx1JDVD.js";import{B,s as E,o,c as i,r as L,m as d,t as _,a as N,n as D,b as I,d as j,e as y,u as P,f as R,w as V,g as q,h as w,A as F,i as t,j as c,k as u,l as f}from"./index-CJ-TTj0b.js";import{u as T}from"./useGoogleAuth-BBZWAUJJ.js";import{u as W}from"./useScreenSize-B77PL8MX.js";import"./index-D2aoZYDJ.js";import"./accountsStore-C5_-Rl2_.js";import"./useAxios-BUPLXyC0.js";var H=function(s){var a=s.dt;return`
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
`)},K={root:function(s){var a=s.props;return["p-avatar p-component",{"p-avatar-image":a.image!=null,"p-avatar-circle":a.shape==="circle","p-avatar-lg":a.size==="large","p-avatar-xl":a.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},M=B.extend({name:"avatar",theme:H,classes:K}),U={name:"BaseAvatar",extends:E,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:M,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},z={name:"Avatar",extends:U,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},G=["aria-labelledby","aria-label"],O=["src","alt"];function J(e,s,a,m,x,l){return o(),i("div",d({class:e.cx("root"),"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},e.ptmi("root")),[L(e.$slots,"default",{},function(){return[e.label?(o(),i("span",d({key:0,class:e.cx("label")},e.ptm("label")),_(e.label),17)):e.$slots.icon?(o(),N(I(e.$slots.icon),{key:1,class:D(e.cx("icon"))},null,8,["class"])):e.icon?(o(),i("span",d({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):e.image?(o(),i("img",d({key:3,src:e.image,alt:e.ariaLabel,onError:s[0]||(s[0]=function(){return l.onError&&l.onError.apply(l,arguments)})},e.ptm("image")),null,16,O)):j("",!0)]})],16,G)}z.render=J;const Q={class:"card flex flex-col items-center overflow-hidden"},X=f('<div class="flex flex-col items-center gap-2"><span class="text-xl font-medium">Scroll Down</span><span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center"><i class="pi pi-arrow-down"></i></span></div><div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-user !text-2xl"></i></div><span class="text-2xl font-bold">Roofing</span><span class="text-muted-color text-center">We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-spin pi-cog !text-2xl"></i></div><span class="text-2xl font-bold">Windows and Doors </span><span class="text-muted-color text-center">Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-align-justify !text-2xl"></i></div><span class="text-2xl font-bold">Private Providers</span><span class="text-muted-color text-center">Soon to come</span></div></div><div class="h-[30rem]"></div>',4),Y={class:"flex flex-wrap justify-center gap-8"},Z={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},ee=t("span",{class:"text-2xl font-medium"},"Boris Sursky",-1),ae=t("span",{class:"text-center"},"Creator and Founder.",-1),te={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},se=t("span",{class:"text-2xl font-medium"},"Hugo Blanco",-1),ne=t("span",{class:"text-center"},"Developer and co-Founder.",-1),re={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},oe=t("span",{class:"text-2xl font-medium"},"Future Investor",-1),ie=t("span",{class:"text-center"},"Position to be filled.",-1),le=f('<div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">150K</span><span class="text-2xl font-bold">Permits Issued</span><span class="text-center">Number of permits accepted by cities.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span><span class="text-2xl font-bold">Cost Saving</span><span class="text-center">How much the city saved.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">14K</span><span class="text-2xl font-bold">Time Saved in hours</span><span class="text-center">The time cities now have to allocated to other projects.</span></div></div><div class="h-[20rem]"></div>',3),ce={class:"flex flex-wrap justify-center gap-8"},de=f('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000"><div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"><i class="pi pi-question-circle !text-2xl"></i></div><span class="text-2xl font-bold">Support </span><span class="text-center">Click here for support </span></div>',1),pe={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},ue=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1),fe=t("span",{class:"text-2xl font-bold"},"Click to Register ",-1),me={class:"text-center"},xe={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},ge=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-sign-in !text-2xl"})],-1),ve=t("span",{class:"text-center"},"Click to Login",-1),he={class:"text-2xl font-bold"},be={key:0},$e={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(e){const{accessToken:s,idPayload:a,signIn:m,localData:x}=T(),l=y([]),g=P(),v=y(!1);let S=R({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""});const h=()=>{x.value.forEach((n,p)=>{for(let r=0;r<n.length;r++)s.value&&(l.value.push(n[r]),S.phone=n[r].bphone,k())})};function k(){$()}function $(){g.push("/permitapp")}V(h,()=>{}),q(()=>{s.value&&fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=4",{headers:{Authorization:`Bearer ${s.value}`}}).then(n=>n.json()).then(console.log)}),w(()=>{const{width:n,isUltraWide:p}=W();return{width:n,isUltraWide:p}}),w(()=>{F.init({duration:800,easing:"ease-in-out",once:!0}),localStorage.clear()});function C(){g.push("/terms")}return(n,p)=>{const r=z,b=A;return o(),i("div",Q,[X,t("div",Y,[t("div",Z,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ee,ae]),t("div",te,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),se,ne]),t("div",re,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),oe,ie])]),le,t("div",ce,[de,t("div",pe,[ue,fe,t("span",me,[c(b,{id:"register",icon:"pi pi-building",severity:"contrast",variant:"text",rounded:"","aria-label":"Register",size:n.size,loading:v.value,onClick:C},null,8,["size","loading"])])]),t("div",xe,[ge,ve,t("span",he,[c(b,{icon:"pi pi-user",severity:"contrast",rounded:"",loading:v.value,onClick:u(m),onChange:h,raised:"",onInput:n.email},null,8,["loading","onClick","onInput"])]),u(a)?(o(),i("pre",be,_(u(a)),1)):j("",!0)])])])}}};export{$e as default};
