import{s as g}from"./index-BdyhjJQm.js";import{B as v,s as h,o as n,c as i,r as b,m as l,t as y,a as w,n as _,b as z,d as j,u as S,e as k,f as $,A as B,g as t,h as o,i as c}from"./index-CcotfURp.js";import"./index-WhpUTu4g.js";var C=function(s){var e=s.dt;return`
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
`)},L={root:function(s){var e=s.props;return["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},A=v.extend({name:"avatar",theme:C,classes:L}),E={name:"BaseAvatar",extends:h,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:A,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},m={name:"Avatar",extends:E,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},P=["aria-labelledby","aria-label"],D=["src","alt"];function N(a,s,e,p,u,r){return n(),i("div",l({class:a.cx("root"),"aria-labelledby":a.ariaLabelledby,"aria-label":a.ariaLabel},a.ptmi("root")),[b(a.$slots,"default",{},function(){return[a.label?(n(),i("span",l({key:0,class:a.cx("label")},a.ptm("label")),y(a.label),17)):a.$slots.icon?(n(),w(z(a.$slots.icon),{key:1,class:_(a.cx("icon"))},null,8,["class"])):a.icon?(n(),i("span",l({key:2,class:[a.cx("icon"),a.icon]},a.ptm("icon")),null,16)):a.image?(n(),i("img",l({key:3,src:a.image,alt:a.ariaLabel,onError:s[0]||(s[0]=function(){return r.onError&&r.onError.apply(r,arguments)})},a.ptm("image")),null,16,D)):j("",!0)]})],16,P)}m.render=N;const R={class:"card flex flex-col items-center overflow-hidden"},V=c('<div class="flex flex-col items-center gap-2"><span class="text-xl font-medium">Scroll Down</span><span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center"><i class="pi pi-arrow-down"></i></span></div><div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-user !text-2xl"></i></div><span class="text-2xl font-bold">Roofing</span><span class="text-muted-color text-center">We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-spin pi-cog !text-2xl"></i></div><span class="text-2xl font-bold">Windows and Doors </span><span class="text-muted-color text-center">Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-align-justify !text-2xl"></i></div><span class="text-2xl font-bold">Private Providers</span><span class="text-muted-color text-center">Soon to come</span></div></div><div class="h-[30rem]"></div>',4),q={class:"flex flex-wrap justify-center gap-8"},F={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},I=t("span",{class:"text-2xl font-medium"},"Boris Sursky",-1),T=t("span",{class:"text-center"},"Creator and Founder.",-1),H={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},K=t("span",{class:"text-2xl font-medium"},"Hugo Blanco",-1),M=t("span",{class:"text-center"},"Developer and co-Founder.",-1),W={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},O=t("span",{class:"text-2xl font-medium"},"Future Investor",-1),G=t("span",{class:"text-center"},"Position to be filled.",-1),J=c('<div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">150K</span><span class="text-2xl font-bold">Permits Issued</span><span class="text-center">Number of permits accepted by cities.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span><span class="text-2xl font-bold">Cost Saving</span><span class="text-center">How much the city saved.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">14K</span><span class="text-2xl font-bold">Time Saved in hours</span><span class="text-center">The time cities now have to allocated to other projects.</span></div></div><div class="h-[20rem]"></div>',3),Q={class:"flex flex-wrap justify-center gap-8"},U=c('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000"><div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"><i class="pi pi-question-circle !text-2xl"></i></div><span class="text-2xl font-bold">Support </span><span class="text-center">Click here for support </span></div>',1),X={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},Y=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1),Z=t("span",{class:"text-2xl font-bold"},"Click to Register ",-1),ee={class:"text-center"},ae={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},te=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-sign-in !text-2xl"})],-1),se=t("span",{class:"text-center"},"Click to Login",-1),ne={class:"text-2xl font-bold"},de={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(a){const s=S(),e=k(!1),p=()=>{e.value=!0,setTimeout(()=>{e.value=!1},2e3),u()};$(()=>{B.init({duration:800,easing:"ease-in-out",once:!0}),localStorage.clear()});function u(){s.push("/login")}function r(){s.push("/registration")}return(f,re)=>{const d=m,x=g;return n(),i("div",R,[V,t("div",q,[t("div",F,[o(d,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),I,T]),t("div",H,[o(d,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),K,M]),t("div",W,[o(d,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),O,G])]),J,t("div",Q,[U,t("div",X,[Y,Z,t("span",ee,[o(x,{id:"register",icon:"pi pi-building",severity:"contrast",variant:"text",rounded:"","aria-label":"Register",size:f.size,loading:e.value,onClick:r},null,8,["size","loading"])])]),t("div",ae,[te,se,t("span",ne,[o(x,{id:"signin",icon:"pi pi-user",severity:"contrast",variant:"text",rounded:"","aria-label":"Login Page",size:f.size,loading:e.value,onClick:p},null,8,["size","loading"])])])])])}}};export{de as default};
