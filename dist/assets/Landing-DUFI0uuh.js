import{s as A}from"./index-AIXxn6MI.js";import{B,s as E,o,c as i,r as L,m as d,t as y,a as N,n as D,b as I,d as w,e as b,u as P,f as R,w as V,g as q,h as F,A as T,i as t,j as c,k as p,l as u}from"./index-CIDJ1oKW.js";import{u as G}from"./useGoogleAuth-Z7Z3yFvn.js";import{u as H}from"./accountsStore-9_2W8G9N.js";import"./index-DtgwnBnV.js";import"./useAxios-4TyI85c3.js";var K=function(s){var a=s.dt;return`
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
`)},M={root:function(s){var a=s.props;return["p-avatar p-component",{"p-avatar-image":a.image!=null,"p-avatar-circle":a.shape==="circle","p-avatar-lg":a.size==="large","p-avatar-xl":a.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},U=B.extend({name:"avatar",theme:K,classes:M}),W={name:"BaseAvatar",extends:E,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:U,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},_={name:"Avatar",extends:W,inheritAttrs:!1,emits:["error"],methods:{onError:function(s){this.$emit("error",s)}}},O=["aria-labelledby","aria-label"],J=["src","alt"];function Q(e,s,a,f,m,l){return o(),i("div",d({class:e.cx("root"),"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},e.ptmi("root")),[L(e.$slots,"default",{},function(){return[e.label?(o(),i("span",d({key:0,class:e.cx("label")},e.ptm("label")),y(e.label),17)):e.$slots.icon?(o(),N(I(e.$slots.icon),{key:1,class:D(e.cx("icon"))},null,8,["class"])):e.icon?(o(),i("span",d({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):e.image?(o(),i("img",d({key:3,src:e.image,alt:e.ariaLabel,onError:s[0]||(s[0]=function(){return l.onError&&l.onError.apply(l,arguments)})},e.ptm("image")),null,16,J)):w("",!0)]})],16,O)}_.render=Q;const X={class:"card flex flex-col items-center overflow-hidden"},Y=u('<div class="flex flex-col items-center gap-2"><span class="text-xl font-medium">Scroll Down</span><span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center"><i class="pi pi-arrow-down"></i></span></div><div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-user !text-2xl"></i></div><span class="text-2xl font-bold">Roofing</span><span class="text-muted-color text-center">We provide roofing permit automation</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-spin pi-cog !text-2xl"></i></div><span class="text-2xl font-bold">Windows and Doors </span><span class="text-muted-color text-center">Soon to come </span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000"><div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center"><i class="pi pi-align-justify !text-2xl"></i></div><span class="text-2xl font-bold">Private Providers</span><span class="text-muted-color text-center">Soon to come</span></div></div><div class="h-[30rem]"></div>',4),Z={class:"flex flex-wrap justify-center gap-8"},ee={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-up","data-aos-duration":"1000"},ae=t("span",{class:"text-2xl font-medium"},"Boris Sursky",-1),te=t("span",{class:"text-center"},"Creator and Founder.",-1),se={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-down","data-aos-duration":"1000"},ne=t("span",{class:"text-2xl font-medium"},"Hugo Blanco",-1),re=t("span",{class:"text-center"},"Developer and co-Founder.",-1),oe={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"slide-right","data-aos-duration":"1000"},ie=t("span",{class:"text-2xl font-medium"},"Future Investor",-1),le=t("span",{class:"text-center"},"Position to be filled.",-1),ce=u('<div class="h-[30rem]"></div><div class="flex flex-wrap justify-center gap-8"><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">150K</span><span class="text-2xl font-bold">Permits Issued</span><span class="text-center">Number of permits accepted by cities.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span><span class="text-2xl font-bold">Cost Saving</span><span class="text-center">How much the city saved.</span></div><div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000"><span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">14K</span><span class="text-2xl font-bold">Time Saved in hours</span><span class="text-center">The time cities now have to allocated to other projects.</span></div></div><div class="h-[20rem]"></div>',3),de={class:"flex flex-wrap justify-center gap-8"},pe=u('<div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000"><div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"><i class="pi pi-question-circle !text-2xl"></i></div><span class="text-2xl font-bold">Support </span><span class="text-center">Click here for support </span></div>',1),ue={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-up","data-aos-duration":"1000"},fe=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-database !text-2xl"})],-1),me=t("span",{class:"text-2xl font-bold"},"Click to Register ",-1),xe={class:"text-center"},ge={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4","data-aos":"flip-left","data-aos-duration":"1000"},ve=t("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[t("i",{class:"pi pi-sign-in !text-2xl"})],-1),he=t("span",{class:"text-center"},"Click to Login",-1),be={class:"text-2xl font-bold"},ye={key:0},$e={__name:"Landing",props:{heading:{type:String,required:!0},tagline:String},setup(e){const{accessToken:s,idPayload:a,signIn:f,localData:m}=G(),l=b([]),x=P(),g=b(!1);let j=R({dba:"",email:"",cphone:"",bphone:"",expiration_date:"",name:"",projects:[],secondary_status:"",license:"",phone:""});const{getUser:z}=H(),v=()=>{console.log(z),m.value.forEach((n,C)=>{for(let r=0;r<n.length;r++)s.value&&(l.value.push(n[r]),j.phone=n[r].bphone,S())})};function S(){k()}function k(){x.push("/permitapp")}V(v,()=>{}),q(()=>{s.value&&fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=4",{headers:{Authorization:`Bearer ${s.value}`}}).then(n=>n.json()).then(console.log)}),F(()=>{T.init({duration:800,easing:"ease-in-out",once:!0}),localStorage.clear()});function $(){x.push("/registration")}return(n,C)=>{const r=_,h=A;return o(),i("div",X,[Y,t("div",Z,[t("div",ee,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ae,te]),t("div",se,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ne,re]),t("div",oe,[c(r,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),ie,le])]),ce,t("div",de,[pe,t("div",ue,[fe,me,t("span",xe,[c(h,{id:"register",icon:"pi pi-building",severity:"contrast",variant:"text",rounded:"","aria-label":"Register",size:n.size,loading:g.value,onClick:$},null,8,["size","loading"])])]),t("div",ge,[ve,he,t("span",be,[c(h,{icon:"pi pi-user",severity:"contrast",rounded:"",loading:g.value,onClick:p(f),onChange:v,raised:"",onInput:n.email},null,8,["loading","onClick","onInput"])]),p(a)?(o(),i("pre",ye,y(p(a)),1)):w("",!0)])])])}}};export{$e as default};
