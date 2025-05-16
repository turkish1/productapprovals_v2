import{B as m,s as x,o as r,c as n,r as g,m as o,t as v,a as h,n as b,b as y,d as w,u as _,e as j,A as z,f as t,g as c,h as d}from"./index-fvJRnA3k.js";var S=function(s){var e=s.dt;return`
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
`)},k={root:function(s){var e=s.props;return["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},L=m.extend({name:"avatar",theme:S,classes:k}),$={name:"BaseAvatar",extends:x,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:L,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},u={name:"Avatar",extends:$,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},C=["aria-labelledby","aria-label"],A=["src","alt"];function B(a,s,e,p,f,i){return r(),n("div",o({class:a.cx("root"),"aria-labelledby":a.ariaLabelledby,"aria-label":a.ariaLabel},a.ptmi("root")),[g(a.$slots,"default",{},function(){return[a.label?(r(),n("span",o({key:0,class:a.cx("label")},a.ptm("label")),v(a.label),17)):a.$slots.icon?(r(),h(y(a.$slots.icon),{key:1,class:b(a.cx("icon"))},null,8,["class"])):a.icon?(r(),n("span",o({key:2,class:[a.cx("icon"),a.icon]},a.ptm("icon")),null,16)):a.image?(r(),n("img",o({key:3,src:a.image,alt:a.ariaLabel,onError:s[0]||(s[0]=function(){return i.onError&&i.onError.apply(i,arguments)})},a.ptm("image")),null,16,A)):w("",!0)]})],16,C)}u.render=B;const R={class:"card flex flex-col items-center overflow-hidden"},E=d('<div class="flex flex-col items-center gap-2"><span class="text-xl font-medium">Scroll Down</span><span class="animate-bounce h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center"><i class="pi pi-arrow-down"></i></span></div><div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000"><div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-user !text-2xl"></i></div><span class="text-2xl font-bold">Roofing</span><span class="text-muted-color text-center">We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000"><div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-users !text-2xl"></i></div><span class="text-2xl font-bold">Windows and Doors </span><span class="text-muted-color text-center">Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000"><div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-building !text-2xl"></i></div><span class="text-2xl font-bold">Private Providers</span><span class="text-muted-color text-center">Soon to come</span></div></div><div class="h-[30rem]"></div>',4),D={class:"flex flex-wrap justify-center gap-8"},N={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},P=t("span",{class:"text-2xl font-medium"},"Donna Romito",-1),V=t("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1),q={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},K=t("span",{class:"text-2xl font-medium"},"Nancy Perez",-1),M=t("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1),W={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},F=t("span",{class:"text-2xl font-medium"},"Flavio Gomez",-1),G=t("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1),I=d('<div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">850K</span><span class="text-2xl font-bold">Customers</span><span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span><span class="text-2xl font-bold">Revenue</span><span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">140K</span><span class="text-2xl font-bold">Sales</span><span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></div></div><div class="h-[30rem]"></div>',3),O=d('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000"><div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"><i class="pi pi-wifi !text-2xl"></i></div><span class="text-2xl font-bold">Support </span><span class="text-center">Click here for support </span></div>',1),H=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1),J=t("span",{class:"text-center"},"Click to Register",-1),Q=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-arrows-v !text-2xl"})],-1),T=t("span",{class:"text-center"},"Click to Login",-1),X={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(a){const s=_();j(()=>{z.init({duration:800,easing:"ease-in-out",once:!0})});function e(){s.push("/login")}function p(){s.push("/registration")}return(f,i)=>{const l=u;return r(),n("div",R,[E,t("div",D,[t("div",N,[c(l,{image:"https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",shape:"circle",size:"xlarge"}),P,V]),t("div",q,[c(l,{image:"https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png",shape:"circle",size:"xlarge"}),K,M]),t("div",W,[c(l,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),F,G])]),I,t("div",{class:"flex flex-wrap justify-center gap-8"},[O,t("div",{class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},[H,t("span",{class:"text-2xl font-bold",onClick:p},"Register "),J]),t("div",{class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},[Q,t("span",{class:"text-2xl font-bold",onClick:e},"Login Page "),T])])])}}};export{X as default};
