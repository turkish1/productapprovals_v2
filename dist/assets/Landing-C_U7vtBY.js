import{s as B}from"./index-C_1k2rea.js";import{B as I,s as E,o as i,c as l,r as L,m as p,t as j,a as N,n as D,b as P,d as S,e as w,u as R,f as q,w as V,g as F,h as _,A as T,i as t,j as c,k as u,l as v,p as W,q as H}from"./index-BkNQGnqg.js";import{u as K}from"./useGoogleAuth-BA7I7T9u.js";import{u as M}from"./useScreenSize-D_R42vDn.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-0KgbQIhW.js";import"./accountsStore-BLuyV_zk.js";import"./useAxios-CB5ECIRt.js";var G=function(s){var e=s.dt;return`
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
`)},O={root:function(s){var e=s.props;return["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},J=I.extend({name:"avatar",theme:G,classes:O}),Q={name:"BaseAvatar",extends:E,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:J,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},z={name:"Avatar",extends:Q,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},X=["aria-labelledby","aria-label"],Y=["src","alt"];function Z(a,s,e,m,x,d){return i(),l("div",p({class:a.cx("root"),"aria-labelledby":a.ariaLabelledby,"aria-label":a.ariaLabel},a.ptmi("root")),[L(a.$slots,"default",{},function(){return[a.label?(i(),l("span",p({key:0,class:a.cx("label")},a.ptm("label")),j(a.label),17)):a.$slots.icon?(i(),N(P(a.$slots.icon),{key:1,class:D(a.cx("icon"))},null,8,["class"])):a.icon?(i(),l("span",p({key:2,class:[a.cx("icon"),a.icon]},a.ptm("icon")),null,16)):a.image?(i(),l("img",p({key:3,src:a.image,alt:a.ariaLabel,onError:s[0]||(s[0]=function(){return d.onError&&d.onError.apply(d,arguments)})},a.ptm("image")),null,16,Y)):S("",!0)]})],16,X)}z.render=Z;const r=a=>(W("data-v-0f109889"),a=a(),H(),a),aa={class:"card flex flex-col items-center"},ea=v('<div class="flex flex-col items-center gap-2" data-v-0f109889><span class="text-xl font-medium" data-v-0f109889>Scroll Down</span><span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center" data-v-0f109889><i class="pi pi-arrow-down" data-v-0f109889></i></span></div><div class="h-[30rem]" data-v-0f109889></div><div class="flex flex-wrap justify-center gap-8" data-v-0f109889><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000" data-v-0f109889><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-0f109889><i class="pi pi-user !text-2xl" data-v-0f109889></i></div><span class="text-2xl font-bold" data-v-0f109889>Roofing</span><span class="text-muted-color text-center" data-v-0f109889>We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000" data-v-0f109889><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-0f109889><i class="pi pi-spin pi-cog !text-2xl" data-v-0f109889></i></div><span class="text-2xl font-bold" data-v-0f109889>Windows and Doors </span><span class="text-muted-color text-center" data-v-0f109889>Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000" data-v-0f109889><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center" data-v-0f109889><i class="pi pi-align-justify !text-2xl" data-v-0f109889></i></div><span class="text-2xl font-bold" data-v-0f109889>Private Providers</span><span class="text-muted-color text-center" data-v-0f109889>Soon to come</span></div></div><div class="h-[30rem]" data-v-0f109889></div>',4),ta={class:"flex flex-wrap justify-center gap-8"},sa={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},na=r(()=>t("span",{class:"text-2xl font-medium"},"Boris Sursky",-1)),ra=r(()=>t("span",{class:"text-center"},"Creator and Founder.",-1)),oa={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},ia=r(()=>t("span",{class:"text-2xl font-medium"},"Hugo Blanco",-1)),la=r(()=>t("span",{class:"text-center"},"Developer and co-Founder.",-1)),da={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},ca=r(()=>t("span",{class:"text-2xl font-medium"},"Future Investor",-1)),pa=r(()=>t("span",{class:"text-center"},"Position to be filled.",-1)),fa=v('<div class="h-[30rem]" data-v-0f109889></div><div class="flex flex-wrap justify-center gap-8" data-v-0f109889><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000" data-v-0f109889><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2" data-v-0f109889>150K</span><span class="text-2xl font-bold" data-v-0f109889>Permits Issued</span><span class="text-center" data-v-0f109889>Number of permits accepted by cities.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000" data-v-0f109889><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2" data-v-0f109889>$1.5M</span><span class="text-2xl font-bold" data-v-0f109889>Cost Saving</span><span class="text-center" data-v-0f109889>How much the city saved.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000" data-v-0f109889><span class="text-xl font-medium rounded-xl px-4 py-2" data-v-0f109889>14K</span><span class="text-2xl font-bold" data-v-0f109889>Time Saved in hours</span><span class="text-center" data-v-0f109889>The time cities now have to allocated to other projects.</span></div></div><div class="h-[20rem]" data-v-0f109889></div>',3),ua={class:"flex flex-wrap justify-center gap-8"},va=v('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000" data-v-0f109889><div class="rounded-full border-2 border-white w-48 h-12 flex items-center justify-center" data-v-0f109889><i class="pi pi-question-circle !text-2xl" data-v-0f109889></i></div><span class="text-2xl font-bold" data-v-0f109889>Support </span><span class="text-center" data-v-0f109889>Click here for support </span></div>',1),ma={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},xa=r(()=>t("div",{class:"rounded-full border-2 border-white w-48 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1)),ga=r(()=>t("span",{class:"text-2xl font-bold"},"Click to Register ",-1)),ha={class:"text-center"},ba={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},ya=r(()=>t("div",{class:"rounded-full border-2 border-white w-48 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-sign-in !text-2xl"})],-1)),wa=r(()=>t("span",{class:"text-center"},"Click to Login",-1)),_a={class:"text-2xl font-bold"},ja={key:0},Sa={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(a){const{accessToken:s,idPayload:e,signIn:m,localData:x}=K(),d=w([]),g=R(),h=w(!1);let k=q({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""});const b=()=>{x.value.forEach((n,f)=>{for(let o=0;o<n.length;o++)s.value&&(d.value.push(n[o]),k.phone=n[o].bphone,$())})};function $(){C()}function C(){g.push("/permitapp")}V(b,()=>{}),F(()=>{s.value&&fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=4",{headers:{Authorization:`Bearer ${s.value}`}}).then(n=>n.json()).then(console.log)}),_(()=>{const{width:n,isUltraWide:f}=M();return{width:n,isUltraWide:f}}),_(()=>{T.init({duration:800,easing:"ease-in-out",once:!0}),localStorage.clear()});function A(){g.push("/terms")}return(n,f)=>{const o=z,y=B;return i(),l("div",aa,[ea,t("div",ta,[t("div",sa,[c(o,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),na,ra]),t("div",oa,[c(o,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ia,la]),t("div",da,[c(o,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ca,pa])]),fa,t("div",ua,[va,t("div",ma,[xa,ga,t("span",ha,[c(y,{id:"register",icon:"pi pi-building",severity:"contrast",variant:"text",rounded:"","aria-label":"Register",size:n.size,loading:h.value,onClick:A},null,8,["size","loading"])])]),t("div",ba,[ya,wa,t("span",_a,[c(y,{icon:"pi pi-user",severity:"contrast",rounded:"",loading:h.value,onClick:u(m),onChange:b,raised:"",onInput:n.email},null,8,["loading","onClick","onInput"])]),u(e)?(i(),l("pre",ja,j(u(e)),1)):S("",!0)])])])}}},La=U(Sa,[["__scopeId","data-v-0f109889"]]);export{La as default};
