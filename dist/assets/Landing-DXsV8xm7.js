import{s as x}from"./index-BGjpVzn3.js";import{B as g,s as v,o as r,c as o,r as h,m as i,t as b,a as y,n as w,b as _,d as j,u as z,e as S,f as k,A as L,g as t,h as l,i as d}from"./index-15WpCrGV.js";import"./index-By4bQlEX.js";var $=function(s){var a=s.dt;return`
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
`)},C={root:function(s){var a=s.props;return["p-avatar p-component",{"p-avatar-image":a.image!=null,"p-avatar-circle":a.shape==="circle","p-avatar-lg":a.size==="large","p-avatar-xl":a.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},A=g.extend({name:"avatar",theme:$,classes:C}),B={name:"BaseAvatar",extends:v,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:A,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},f={name:"Avatar",extends:B,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},R=["aria-labelledby","aria-label"],E=["src","alt"];function D(e,s,a,p,u,n){return r(),o("div",i({class:e.cx("root"),"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},e.ptmi("root")),[h(e.$slots,"default",{},function(){return[e.label?(r(),o("span",i({key:0,class:e.cx("label")},e.ptm("label")),b(e.label),17)):e.$slots.icon?(r(),y(_(e.$slots.icon),{key:1,class:w(e.cx("icon"))},null,8,["class"])):e.icon?(r(),o("span",i({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):e.image?(r(),o("img",i({key:3,src:e.image,alt:e.ariaLabel,onError:s[0]||(s[0]=function(){return n.onError&&n.onError.apply(n,arguments)})},e.ptm("image")),null,16,E)):j("",!0)]})],16,R)}f.render=D;const N={class:"card flex flex-col items-center overflow-hidden"},P=d('<div class="flex flex-col items-center gap-2"><span class="text-xl font-medium">Scroll Down</span><span class="animate-bounce h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center"><i class="pi pi-arrow-down"></i></span></div><div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000"><div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-user !text-2xl"></i></div><span class="text-2xl font-bold">Roofing</span><span class="text-muted-color text-center">We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000"><div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-users !text-2xl"></i></div><span class="text-2xl font-bold">Windows and Doors </span><span class="text-muted-color text-center">Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000"><div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-building !text-2xl"></i></div><span class="text-2xl font-bold">Private Providers</span><span class="text-muted-color text-center">Soon to come</span></div></div><div class="h-[30rem]"></div>',4),V={class:"flex flex-wrap justify-center gap-8"},q={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},K=t("span",{class:"text-2xl font-medium"},"Donna Romito",-1),M=t("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1),W={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},F=t("span",{class:"text-2xl font-medium"},"Nancy Perez",-1),G=t("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1),I={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},O=t("span",{class:"text-2xl font-medium"},"Flavio Gomez",-1),T=t("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1),H=d('<div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">850K</span><span class="text-2xl font-bold">Customers</span><span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span><span class="text-2xl font-bold">Revenue</span><span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">140K</span><span class="text-2xl font-bold">Sales</span><span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></div></div><div class="h-[30rem]"></div>',3),J={class:"flex flex-wrap justify-center gap-8"},Q=d('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000"><div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"><i class="pi pi-wifi !text-2xl"></i></div><span class="text-2xl font-bold">Support </span><span class="text-center">Click here for support </span></div>',1),U=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1),X=t("span",{class:"text-center"},"Click to Register",-1),Y={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},Z=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-arrows-v !text-2xl"})],-1),aa={class:"text-2xl font-bold"},ea=t("span",{class:"text-center"},"Click to Login",-1),ia={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(e){const s=z(),a=S(!1),p=()=>{a.value=!0,setTimeout(()=>{a.value=!1},2e3),u()};k(()=>{L.init({duration:800,easing:"ease-in-out",once:!0})});function u(){s.push("/login")}function n(){s.push("/registration")}return(ta,sa)=>{const c=f,m=x;return r(),o("div",N,[P,t("div",V,[t("div",q,[l(c,{image:"https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",shape:"circle",size:"xlarge"}),K,M]),t("div",W,[l(c,{image:"https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png",shape:"circle",size:"xlarge"}),F,G]),t("div",I,[l(c,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),O,T])]),H,t("div",J,[Q,t("div",{class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},[U,t("span",{class:"text-2xl font-bold",onClick:n},"Register "),X]),t("div",Y,[Z,t("span",aa,[l(m,{label:"Login Page",severity:"secondary",variant:"text",loading:a.value,onClick:p},null,8,["loading"])]),ea])])])}}};export{ia as default};
