import{Y as D,Z as N,$ as U,r as $,e as W,a0 as j,a1 as L,U as B,K as T,H as M,c as A,o as E,a2 as G,a3 as H,M as C,i as d,t as m,V as y,A as c,P as g,Q as h,X as S,z as p,x as b,N as w,W as k,v as q,T as F,S as I,a4 as K,y as Q,B as X}from"./entry.5pQf0nAk.js";import{u as Y}from"./useAxios.ILhm5itt.js";function Z(e){return j()?(L(e),!0):!1}function O(e){return typeof e=="function"?e():B(e)}const x=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const J=()=>{};function ee(e){return e||T()}function te(...e){if(e.length!==1)return D(...e);const n=e[0];return typeof n=="function"?N(U(()=>({get:n,set:J}))):$(n)}function ne(e,n){ee(n)&&W(e,n)}function oe(e){var n;const o=O(e);return(n=o==null?void 0:o.$el)!=null?n:o}const ae=x?window:void 0,se=x?window.document:void 0;function re(){const e=$(!1);return T()&&E(()=>{e.value=!0}),e}function ie(e){const n=re();return A(()=>(n.value,!!e()))}function le(e,n,o={}){const{window:l=ae,...u}=o;let t;const i=ie(()=>l&&"MutationObserver"in l),s=()=>{t&&(t.disconnect(),t=void 0)},r=M(()=>oe(e),a=>{s(),i.value&&l&&a&&(t=new MutationObserver(n),t.observe(a,u))},{immediate:!0}),_=()=>t==null?void 0:t.takeRecords(),f=()=>{s(),r()};return Z(f),{isSupported:i,stop:f,takeRecords:_}}function ue(e=null,n={}){var o,l,u;const{document:t=se,restoreOnUnmount:i=a=>a}=n,s=(o=t==null?void 0:t.title)!=null?o:"",r=te((l=e??(t==null?void 0:t.title))!=null?l:null),_=e&&typeof e=="function";function f(a){if(!("titleTemplate"in n))return a;const v=n.titleTemplate||"%s";return typeof v=="function"?v(a):O(v).replace(/%s/g,a)}return M(r,(a,v)=>{a!==v&&t&&(t.title=f(typeof a=="string"?a:""))},{immediate:!0}),n.observe&&!n.titleTemplate&&t&&!_&&le((u=t.head)==null?void 0:u.querySelector("title"),()=>{t&&t.title!==r.value&&(r.value=f(t.title))},{childList:!0}),ne(()=>{if(i){const a=i(s,r.value||"");a!=null&&t&&(t.title=a)}}),r}const ce={style:{height:"100vh",overflow:"auto"}},de={class:"pa-md-3"},fe={__name:"app-layout",props:{ready:{type:Boolean,default:!0},defaultsProvider:{type:Object,default:()=>({})},loadingClass:{type:String,default:"w-100 d-flex align-center justify-center"},navigationClass:{type:String,default:""},headerClass:{type:String,default:""},mainClass:{type:String,default:""},footerClass:{type:String,default:""}},emits:[],setup(e,{emit:n}){const o=e;G(),ue(),H();const l=C({drawer:null,items:[{title:"Home",to:"/admin"},{title:"Pages",to:"/admin/page"},{title:"User",to:"/admin/user"},{title:"Test",to:"/admin/test"}]}),u=C({headerShow:!0,footerShow:!0,vTouch:{up:()=>{u.headerShow=!1,u.footerShow=!0},down:()=>{u.headerShow=!0,u.footerShow=!1}}}),t={...o.defaultsProvider},i=(s={})=>({defaultsProvider:t,...s});return(s,r)=>{const _=d("v-icon"),f=d("v-layout"),a=d("v-navigation-drawer"),v=d("v-btn"),P=d("v-app-bar"),R=d("v-main"),V=d("v-defaults-provider"),z=d("v-app");return m(),y(z,{class:"v-app-layout"},{default:c(()=>[p(V,{defaults:t},{default:c(()=>[o.ready?k("",!0):(m(),y(f,{key:0},{default:c(()=>[w(s.$slots,"loading",h(g(i())),()=>[b("div",{class:S(o.loadingClass)},[p(_,{icon:"svg-spinners:3-dots-fade",size:"30"})],2)])]),_:3})),o.ready?(m(),y(f,{key:1,class:"rounded rounded-md"},{default:c(()=>[p(a,{"model-value":l.drawer,width:"300",elevation:"0",class:S(`v-app-layout__navigation ${o.navigationClass}`),border:"0"},{default:c(()=>[b("div",ce,[w(s.$slots,"navigation",h(g(i())))])]),_:3},8,["model-value","class"]),p(R,{style:{height:"100vh",overflow:"auto",background:"#7f7f7f33"}},{default:c(()=>[p(P,{class:S(o.headerClass),density:"compact",elevation:"0"},{default:c(()=>[p(v,{icon:"ci:hamburger",size:"30",flat:"",onClick:r[0]||(r[0]=pe=>l.drawer=!l.drawer),class:"d-lg-none",stacked:""}),w(s.$slots,"header",h(g(i())))]),_:3},8,["class"]),b("div",de,[w(s.$slots,"main",h(g(i())))])]),_:3})]),_:3})):k("",!0)]),_:3})]),_:3})}}},_e={__name:"index",setup(e){const n=Y({method:"get",url:"https://raw.githubusercontent.com/labscriptdev/static-api/main/data/loteria.json",autoSubmit:!0,response:[]});return(o,l)=>{const u=K,t=d("v-list-item"),i=d("v-list"),s=fe;return m(),y(s,null,{main:c(()=>[p(u)]),navigation:c(()=>[p(i,null,{default:c(()=>[(m(!0),q(I,null,F(B(n).response,r=>(m(),y(t,{to:`/result/${r.id}`},{default:c(()=>[X(Q(r.name),1)]),_:2},1032,["to"]))),256))]),_:1})]),_:1})}}};export{_e as default};
