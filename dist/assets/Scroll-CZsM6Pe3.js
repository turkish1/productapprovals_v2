import{C as k,N as I,b as n,c as i,O as E,B as p,t as h,P as b,$ as B,Q as w,x as j,an as S,e,u as A,r as m,az as D,o as N,au as R,F as y,k as T,f as l,d as _,p as O,i as P,ay as V}from"./index-DViMhdpk.js";import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";var F=function(r){var s=r.dt;return`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: `.concat(s("avatar.width"),`;
    height: `).concat(s("avatar.height"),`;
    font-size: `).concat(s("avatar.font.size"),`;
    background: `).concat(s("avatar.background"),`;
    border-radius: `).concat(s("avatar.border.radius"),`;
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
    font-size: `).concat(s("avatar.font.size"),`;
}

.p-avatar img {
    width: 100%;
    height: 100%;
}

.p-avatar-lg {
    width: `).concat(s("avatar.lg.width"),`;
    height: `).concat(s("avatar.lg.width"),`;
    font-size: `).concat(s("avatar.lg.font.size"),`;
}

.p-avatar-lg .p-avatar-icon {
    font-size: `).concat(s("avatar.lg.font.size"),`;
}

.p-avatar-xl {
    width: `).concat(s("avatar.xl.width"),`;
    height: `).concat(s("avatar.xl.width"),`;
    font-size: `).concat(s("avatar.xl.font.size"),`;
}

.p-avatar-xl .p-avatar-icon {
    font-size: `).concat(s("avatar.xl.font.size"),`;
}

.p-avatar-group {
    display: flex;
    align-items: center;
}

.p-avatar-group .p-avatar + .p-avatar {
    margin-left: `).concat(s("avatar.group.offset"),`;
}

.p-avatar-group .p-avatar {
    border: 2px solid `).concat(s("avatar.group.border.color"),`;
}
`)},G={root:function(r){var s=r.props;return["p-avatar p-component",{"p-avatar-image":s.image!=null,"p-avatar-circle":s.shape==="circle","p-avatar-lg":s.size==="large","p-avatar-xl":s.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},M=k.extend({name:"avatar",theme:F,classes:G}),K={name:"BaseAvatar",extends:I,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:M,provide:function(){return{$pcAvatar:this,$parentInstance:this}}},$={name:"Avatar",extends:K,inheritAttrs:!1,emits:["error"],methods:{onError:function(r){this.$emit("error",r)}}},W=["aria-labelledby","aria-label"],X=["src","alt"];function J(a,r,s,u,d,c){return n(),i("div",p({class:a.cx("root"),"aria-labelledby":a.ariaLabelledby,"aria-label":a.ariaLabel},a.ptmi("root")),[E(a.$slots,"default",{},function(){return[a.label?(n(),i("span",p({key:0,class:a.cx("label")},a.ptm("label")),h(a.label),17)):a.$slots.icon?(n(),b(w(a.$slots.icon),{key:1,class:B(a.cx("icon"))},null,8,["class"])):a.icon?(n(),i("span",p({key:2,class:[a.cx("icon"),a.icon]},a.ptm("icon")),null,16)):a.image?(n(),i("img",p({key:3,src:a.image,alt:a.ariaLabel,onError:r[0]||(r[0]=function(){return c.onError&&c.onError.apply(c,arguments)})},a.ptm("image")),null,16,X)):j("",!0)]})],16,W)}$.render=J;const Q="/assets/AdhesiveTile_new-Bwn3EXxm.png",U={class:"features",style:{"margin-top":"550px"}},H=S('<div class="grid grid-flow-col justify-items-start ..." style="margin-left:100px;"><img src="'+Q+'"><div class="grid grid-flow-col justify-items-center..."><article class="text-wrap"><p class="underline decoration-1">Enter the respective parameters and have your permit in no time.</p></article></div></div>',1),Y=[H],Z={__name:"Grid",props:{features:{type:String}},setup(a){return(r,s)=>(n(),i("section",U,Y))}},ee="/assets/shingles_new-CajW_dIw.png",te={class:"intro",style:{"margin-top":"150px"}},ae=e("div",{class:"grid grid-flow-col justify-items-start ...",style:{"margin-left":"100px"}},[e("img",{src:ee}),e("div",{class:"grid grid-flow-col justify-items-center..."},[e("article",{class:"text-wrap"},[e("h3",null,"Roofing & Building Code Experts"),e("p",null,"Our system will automate your permit submittal and approvals.")])])],-1),se={__name:"LandingIntro",props:{heading:{type:String,required:!0},tagline:String},setup(a){return(r,s)=>(n(),i("section",te,[e("h1",null,h(a.heading),1),e("p",null,h(a.tagline),1),ae]))}},ne={class:"features"},ie=e("h2",null,"Features",-1),re=[ie],oe={__name:"Story",props:{features:{type:String}},setup(a){return(r,s)=>(n(),i("section",ne,re))}},t=a=>(O("data-v-e192d3d6"),a=a(),P(),a),le={key:0,class:"loading-indicator"},ce={class:"card flex flex-col items-center overflow-hidden"},de=S('<div class="flex flex-col items-center gap-2" data-v-e192d3d6><span class="text-xl font-medium" data-v-e192d3d6>Scroll Down</span><span class="animate-bounce h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center" data-v-e192d3d6><i class="pi pi-arrow-down" data-v-e192d3d6></i></span></div><div class="h-[30rem]" data-v-e192d3d6></div>',2),pe={class:"flex flex-wrap justify-center gap-8"},me={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},ue=t(()=>e("div",{class:"rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"},[e("i",{class:"pi pi-user !text-2xl"})],-1)),fe=t(()=>e("span",{class:"text-2xl font-bold"},"Individual",-1)),_e=t(()=>e("span",{class:"text-muted-color text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),he=[ue,fe,_e],xe={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},ge=t(()=>e("div",{class:"rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"},[e("i",{class:"pi pi-users !text-2xl"})],-1)),ve=t(()=>e("span",{class:"text-2xl font-bold"},"Team",-1)),ye=t(()=>e("span",{class:"text-muted-color text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),be=[ge,ve,ye],we={class:"flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},je=t(()=>e("div",{class:"rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center"},[e("i",{class:"pi pi-building !text-2xl"})],-1)),Se=t(()=>e("span",{class:"text-2xl font-bold"},"Enterprise",-1)),$e=t(()=>e("span",{class:"text-muted-color text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),ze=[je,Se,$e],Ce=t(()=>e("div",{class:"h-[30rem]"},null,-1)),Le={class:"flex flex-wrap justify-center gap-8"},ke={class:"flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},Ie=t(()=>e("span",{class:"text-2xl font-medium"},"Jenna Thompson",-1)),Ee=t(()=>e("span",{class:"text-muted-color text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),Be={class:"flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},Ae=t(()=>e("span",{class:"text-2xl font-medium"},"Isabel Garcia",-1)),De=t(()=>e("span",{class:"text-muted-color text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),Ne={class:"flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},Re=t(()=>e("span",{class:"text-2xl font-medium"},"Xavier Mason",-1)),Te=t(()=>e("span",{class:"text-muted-color text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),Oe=t(()=>e("div",{class:"h-[30rem]"},null,-1)),Pe={class:"flex flex-wrap justify-center gap-8"},Ve={class:"flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},qe=t(()=>e("span",{class:"bg-white/20 text-xl font-medium rounded-xl px-4 py-2"},"850K",-1)),Fe=t(()=>e("span",{class:"text-2xl font-bold"},"Customers",-1)),Ge=t(()=>e("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),Me=[qe,Fe,Ge],Ke={class:"flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},We=t(()=>e("span",{class:"bg-white/20 text-xl font-medium rounded-xl px-4 py-2"},"$1.5M",-1)),Xe=t(()=>e("span",{class:"text-2xl font-bold"},"Revenue",-1)),Je=t(()=>e("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),Qe=[We,Xe,Je],Ue={class:"flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},He=t(()=>e("span",{class:"bg-white/20 text-xl font-medium rounded-xl px-4 py-2"},"140K",-1)),Ye=t(()=>e("span",{class:"text-2xl font-bold"},"Sales",-1)),Ze=t(()=>e("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),et=[He,Ye,Ze],tt=t(()=>e("div",{class:"h-[30rem]"},null,-1)),at={class:"flex flex-wrap justify-center gap-8"},st={class:"flex flex-col bg-purple-500 text-white border-purple-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},nt=t(()=>e("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[e("i",{class:"pi pi-wifi !text-2xl"})],-1)),it=t(()=>e("span",{class:"text-2xl font-bold"},"Bandwidth",-1)),rt=t(()=>e("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),ot=[nt,it,rt],lt={class:"flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},ct=t(()=>e("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[e("i",{class:"pi pi-database !text-2xl"})],-1)),dt=t(()=>e("span",{class:"text-2xl font-bold"},"Storage",-1)),pt=t(()=>e("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),mt=[ct,dt,pt],ut={class:"flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"},ft=t(()=>e("div",{class:"rounded-full border-2 border-white w-12 h-12 flex items-center justify-center"},[e("i",{class:"pi pi-arrows-v !text-2xl"})],-1)),_t=t(()=>e("span",{class:"text-2xl font-bold"},"Requests",-1)),ht=t(()=>e("span",{class:"text-center"},"Lorem ipsum dolor sit amet consectetur adipisicing elit.",-1)),xt=[ft,_t,ht],gt={__name:"Scroll",setup(a){const r=A(),s=[{component:se,props:{heading:"Digital Roof Solutions",tagline:"Get your permit faster with us 🚀"}},{component:Z,props:{features:["99.9 % Uptime","1‑click Deploy","24/7 Support"]}},{component:oe,props:{feature:"We offer automated roofing reviews."}}],u=m([s[0]]),d=m(0),c=m(!1),z=()=>{d.value>=s.length-1||(c.value=!0,setTimeout(()=>{d.value+=1,u.value.push(s[d.value]),c.value=!1},800))},x=m(null),{stop:C}=D(x,([g])=>{g.isIntersecting&&z()},{threshold:1});return N(()=>{setTimeout(()=>{r.push("/login")},5e3)}),R(()=>{d.value===s.length-1&&C()}),(g,vt)=>{const f=$,o=V;return n(),i(y,null,[e("div",{ref_key:"scrollContainer",ref:x,class:"infinite-container"},[(n(!0),i(y,null,T(u.value,(v,L)=>(n(),b(w(v.component),p({key:L,ref_for:!0},v.props,{class:"page-wrapper"}),null,16))),128)),c.value?(n(),i("div",le,"Loading more content...")):j("",!0)],512),e("div",ce,[de,e("div",pe,[l((n(),i("div",me,he)),[[o,{enterClass:"animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000",leaveClass:"animate-leave fade-out-0"}]]),l((n(),i("div",xe,be)),[[o,{enterClass:"animate-enter fade-in-10 animate-duration-1000",leaveClass:"animate-leave fade-out-0"}]]),l((n(),i("div",we,ze)),[[o,{enterClass:"animate-enter fade-in-10 slide-in-from-r-8 animate-duration-1000",leaveClass:"animate-leave fade-out-0"}]])]),Ce,e("div",Le,[l((n(),i("div",ke,[_(f,{image:"https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",shape:"circle",size:"xlarge"}),Ie,Ee])),[[o,{enterClass:"animate-enter fade-in-10 slide-in-from-t-20 animate-duration-1000"}]]),l((n(),i("div",Be,[_(f,{image:"https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png",shape:"circle",size:"xlarge"}),Ae,De])),[[o,{enterClass:"animate-enter fade-in-10 slide-in-from-b-20 animate-duration-1000"}]]),l((n(),i("div",Ne,[_(f,{image:"https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",shape:"circle",size:"xlarge"}),Re,Te])),[[o,{enterClass:"animate-enter fade-in-10 slide-in-from-t-20 animate-duration-1000"}]])]),Oe,e("div",Pe,[l((n(),i("div",Ve,Me)),[[o,{enterClass:"animate-enter fade-in-10 spin-in-45 slide-in-from-t-12 animate-duration-1000"}]]),l((n(),i("div",Ke,Qe)),[[o,{enterClass:"animate-enter fade-in-10 zoom-in-50 slide-in-from-t-20 animate-duration-1000"}]]),l((n(),i("div",Ue,et)),[[o,{enterClass:"animate-enter fade-in-10 spin-in-[-45deg] slide-in-from-t-16 animate-duration-1000"}]])]),tt,e("div",at,[l((n(),i("div",st,ot)),[[o,{enterClass:"animate-enter fade-in-10 zoom-in-50 animate-duration-1000"}]]),l((n(),i("div",lt,mt)),[[o,{enterClass:"animate-enter fade-in-10 zoom-in-75 animate-duration-1000"}]]),l((n(),i("div",ut,xt)),[[o,{enterClass:"animate-enter fade-in-10 zoom-in-50 animate-duration-1000"}]])])])],64)}}},wt=q(gt,[["__scopeId","data-v-e192d3d6"]]);export{wt as default};
