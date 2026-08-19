import{initializeApp as Tn}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";import{getFirestore as An,getDocs as st,collection as ot,getDoc as jn,doc as pe,setDoc as we}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const ke="https://script.google.com/macros/s/AKfycbzqtSn6Xm9DSOUJTTcC_mdkvSLkUBIoNdhfr-oE2ET6WyPYQys9FWgPdecsu4sbXXA/exec",En={apiKey:"AIzaSyAmy7pXtqLpq7GsvYZY9xVxjQr5PyL43IE",authDomain:"dreamsai-22e7c.firebaseapp.com",projectId:"dreamsai-22e7c",storageBucket:"dreamsai-22e7c.firebasestorage.app",messagingSenderId:"590220962512",appId:"1:590220962512:web:0d2ceb339b6b1531688cd5"},kn=Tn(En),X=An(kn),k={STYLISTS:"dreamsai_celebrity_stylists_v6",CELEBRITIES:"dreamsai_celebrities_v6",PROJECTS:"dreamsai_celebrity_projects_v6",ACTIVE_CONTEXT:"dreamsai_celebrity_active_context_v6"};function re(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.warn(`[CelebrityStore] Error reading ${e} from localStorage`,n),t}}function U(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.warn(`[CelebrityStore] Error saving ${e} to localStorage`,n)}}function Dn(){let e=re(k.STYLISTS,null),t=re(k.CELEBRITIES,null),n=re(k.PROJECTS,null);if((!e||!Array.isArray(e)||e.length===0)&&(e=[{id:"sty_ananya_01",name:"Ananya Sharma",title:"Lead Red Carpet Stylist",specialty:"High Fine & Couture Jewellery",createdAt:new Date().toISOString()},{id:"sty_rohan_02",name:"Rohan Mehta",title:"Celebrity Fashion Director",specialty:"Runway & Award Season",createdAt:new Date().toISOString()}],U(k.STYLISTS,e)),(!t||!Array.isArray(t)||t.length===0)&&(t=[{id:"cel_shreya_001",name:"Shreya",category:"A-List Actress & Icon",house:"Red Carpet Gala",phone:"+91 9876543210",email:"shreya@atelier.com",createdAt:new Date().toISOString()},{id:"cel_rahul_002",name:"Rahul",category:"Fashion Icon & Artist",house:"Vogue Showcase",phone:"+91 9812345678",email:"rahul@vogue.com",createdAt:new Date().toISOString()}],U(k.CELEBRITIES,t)),!n||!Array.isArray(n)||n.length===0){const a=new Date,i=new Date(a.getTime()-3*24*60*60*1e3).toISOString(),o=new Date(a.getTime()-1*24*60*60*1e3).toISOString().split("T")[0],s=new Date(a.getTime()+2*24*60*60*1e3).toISOString().split("T")[0];n=[{id:"proj_shreya_mon_001",celebrityId:"cel_shreya_001",stylistId:"sty_ananya_01",headStylist:"Natasha K",jewelleryBrand:"Ascend Fine Jewellery",code:"LB-2026-FW01",title:"Red Carpet Gala Pull (Shreya)",season:"Fall / Winter 2026",purpose:"Red Carpet Gala",status:"Active",projectStatus:"Waiting for Return",notes:"Requirement provided by Shreya. Curated by Stylist Ananya Sharma.",finalTraySharedDate:new Date(a.getTime()-5*24*60*60*1e3).toISOString().split("T")[0],followUpDate:s,returnDueDate:o,productStats:{sent:18,returned:14,pending:3,missing:1},deliverables:{completed:3,total:5},socialPosting:{status:"Pending",postingDate:"2026-08-05"},payment:{invoiceAmount:15e4,amountReceived:1e5,status:"Partial"},createdAt:i,updatedAt:i,selectedSerials:[],pdfRecords:[{id:"pdf_001",pdfTitle:"Shreya_Gala_Curation_Mon.pdf",pdfKind:"Celebrity Lookbook",generatedAt:i,itemCount:0}],activityLog:[{id:"act_001",timestamp:i,action:"Curation Initiated",details:"Lookbook created for Celebrity Shreya by Stylist Ananya Sharma."}]},{id:"proj_rahul_vogue_002",celebrityId:"cel_rahul_002",stylistId:"sty_rohan_02",headStylist:"Vikram R",jewelleryBrand:"Luxe Heritage Jewels",code:"LB-2026-FW02",title:"Vogue Cover Showcase (Rahul)",season:"Fall / Winter 2026",purpose:"Editorial Shoot",status:"Lookbook Sent",projectStatus:"Active",notes:"High priority editorial lookbook shoot.",finalTraySharedDate:new Date().toISOString().split("T")[0],followUpDate:new Date(a.getTime()+4*24*60*60*1e3).toISOString().split("T")[0],returnDueDate:new Date(a.getTime()+7*24*60*60*1e3).toISOString().split("T")[0],productStats:{sent:12,returned:12,pending:0,missing:0},deliverables:{completed:4,total:4},socialPosting:{status:"Posted",postingDate:"2026-07-30"},payment:{invoiceAmount:22e4,amountReceived:22e4,status:"Paid"},createdAt:a.toISOString(),updatedAt:a.toISOString(),selectedSerials:[],pdfRecords:[],activityLog:[]}],U(k.PROJECTS,De(n))}}Dn();function De(e=[]){return Array.isArray(e)?[...e].sort((t,n)=>{const a=new Date(t.updatedAt||t.createdAt||0).getTime();return new Date(n.updatedAt||n.createdAt||0).getTime()-a}):[]}function qt(e=[],t=[]){const n=new Map;(Array.isArray(e)?e:[]).forEach(s=>{s&&s.id&&n.set(s.id,s)});const a=new Map,i=new Map;(Array.isArray(t)?t:[]).forEach(s=>{if(!s||!s.id)return;const r=i.get(s.id);if(!r)i.set(s.id,s);else{const l=new Date(r.updatedAt||r.createdAt||0).getTime();new Date(s.updatedAt||s.createdAt||0).getTime()>l&&i.set(s.id,s)}}),Array.from(i.values()).forEach(s=>{var u,g,h,f,P,C,v,S,p,w,$,E,j,H,D,q,K,ie,Ie,Me,_,$e,Re,qe,Ne,Le,Te,At,jt,Et,kt,Dt,Bt;const r=n.get(s.id);if(!r){a.set(s.id,{...s});return}const l=new Date(r.updatedAt||r.createdAt||0).getTime(),d=new Date(s.updatedAt||s.createdAt||0).getTime(),c=l>=d?{...s,...r}:{...r,...s};a.set(s.id,{...c,title:c.title||r.title||s.title,status:c.status||r.status||s.status,projectStatus:c.projectStatus||r.projectStatus||s.projectStatus,finalTraySharedDate:c.finalTraySharedDate||r.finalTraySharedDate||s.finalTraySharedDate||"",followUpDate:c.followUpDate||r.followUpDate||s.followUpDate||"",returnDueDate:c.returnDueDate||r.returnDueDate||s.returnDueDate||"",selectedSerials:Array.isArray(c.selectedSerials)&&c.selectedSerials.length>0?c.selectedSerials:Array.isArray(r.selectedSerials)&&r.selectedSerials.length>0?r.selectedSerials:s.selectedSerials||[],productStats:{sent:((u=c.productStats)==null?void 0:u.sent)??((g=r.productStats)==null?void 0:g.sent)??((h=s.productStats)==null?void 0:h.sent)??0,returned:((f=c.productStats)==null?void 0:f.returned)??((P=r.productStats)==null?void 0:P.returned)??((C=s.productStats)==null?void 0:C.returned)??0,pending:((v=c.productStats)==null?void 0:v.pending)??((S=r.productStats)==null?void 0:S.pending)??((p=s.productStats)==null?void 0:p.pending)??0,missing:((w=c.productStats)==null?void 0:w.missing)??(($=r.productStats)==null?void 0:$.missing)??((E=s.productStats)==null?void 0:E.missing)??0},deliverables:{completed:((j=c.deliverables)==null?void 0:j.completed)??((H=r.deliverables)==null?void 0:H.completed)??((D=s.deliverables)==null?void 0:D.completed)??0,total:((q=c.deliverables)==null?void 0:q.total)??((K=r.deliverables)==null?void 0:K.total)??((ie=s.deliverables)==null?void 0:ie.total)??5},socialPosting:{status:((Ie=c.socialPosting)==null?void 0:Ie.status)||((Me=r.socialPosting)==null?void 0:Me.status)||((_=s.socialPosting)==null?void 0:_.status)||"Pending",postingDate:(($e=c.socialPosting)==null?void 0:$e.postingDate)||((Re=r.socialPosting)==null?void 0:Re.postingDate)||((qe=s.socialPosting)==null?void 0:qe.postingDate)||""},payment:{invoiceAmount:((Ne=c.payment)==null?void 0:Ne.invoiceAmount)??((Le=r.payment)==null?void 0:Le.invoiceAmount)??((Te=s.payment)==null?void 0:Te.invoiceAmount)??0,amountReceived:((At=c.payment)==null?void 0:At.amountReceived)??((jt=r.payment)==null?void 0:jt.amountReceived)??((Et=s.payment)==null?void 0:Et.amountReceived)??0,status:((kt=c.payment)==null?void 0:kt.status)||((Dt=r.payment)==null?void 0:Dt.status)||((Bt=s.payment)==null?void 0:Bt.status)||"Pending"},pdfRecords:Array.isArray(c.pdfRecords)&&c.pdfRecords.length>0?c.pdfRecords:r.pdfRecords||s.pdfRecords||[],updatedAt:l>=d?r.updatedAt||new Date().toISOString():s.updatedAt||r.updatedAt||new Date().toISOString()}),n.delete(s.id)}),n.forEach((s,r)=>{a.set(r,{...s})});const o=Array.from(a.values());return De(o)}async function _t(){try{const e=await st(ot(X,"projects")),t=[];if(e.forEach(s=>t.push(s.data())),t.length>0){const s=re(k.PROJECTS,[]),r=qt(s,t);U(k.PROJECTS,r)}const n=await st(ot(X,"stylists")),a=[];n.forEach(s=>a.push(s.data())),a.length>0&&U(k.STYLISTS,a);const i=await st(ot(X,"celebrities")),o=[];i.forEach(s=>o.push(s.data())),o.length>0&&U(k.CELEBRITIES,o);try{const s=await jn(pe(X,"app_state","active_context"));if(s.exists()){const r=s.data();r&&r.celebrityId&&U(k.ACTIVE_CONTEXT,{celebrityId:r.celebrityId,projectId:r.projectId})}}catch(s){console.warn("[FirebaseSync] Note reading active context:",s)}return console.log("[FirebaseSync] Successfully pulled and merged data from Firestore."),typeof window<"u"&&typeof window.renderHomepageProjectsGateway=="function"&&window.renderHomepageProjectsGateway(),{ok:!0}}catch(e){return console.warn("[FirebaseSync] Error fetching from Firebase",e),null}}_t();function ge(){return re(k.STYLISTS,[])}function ce(e){return ge().find(n=>n.id===e)||null}function zt({name:e,title:t="Personal Stylist",specialty:n="Couture Jewellery"}){const a=ge(),i={id:"sty_"+Date.now()+"_"+Math.random().toString(36).substr(2,4),name:e.trim(),title:t.trim(),specialty:n.trim(),createdAt:new Date().toISOString()};return a.unshift(i),U(k.STYLISTS,a),we(pe(X,"stylists",i.id),i).catch(o=>console.warn("Firebase sync error",o)),i}function Se(){return re(k.CELEBRITIES,[])}function Be(e){return Se().find(n=>n.id===e)||null}function ut({name:e,category:t="A-List Actress & Icon",house:n="",phone:a="",email:i=""}){const o=Se(),s={id:"cel_"+Date.now()+"_"+Math.random().toString(36).substr(2,4),name:e.trim(),category:t||"A-List Actress & Icon",house:n.trim(),phone:a.trim(),email:i.trim(),createdAt:new Date().toISOString()};return o.unshift(s),U(k.CELEBRITIES,o),we(pe(X,"celebrities",s.id),s).catch(r=>console.warn("Firebase sync error",r)),s}function G(e=null,t=null){let n=re(k.PROJECTS,[]);return n=De(n),e&&(n=n.filter(a=>a.celebrityId===e)),t&&(n=n.filter(a=>a.stylistId===t)),n}function Pe(e){return G().find(n=>n.id===e)||null}function Ye({celebrityId:e,stylistId:t=null,title:n,season:a="Fall / Winter 2026",purpose:i="Red Carpet Pull",notes:o="",selectedSerials:s=null}){const r=G(),l=Be(e),d=l?l.name:"Celebrity",c=ge(),u=t?ce(t):c[0]||null,g=new Date,h=`LB-${g.getFullYear()}-${(r.length+1).toString().padStart(3,"0")}`;let f=[];Array.isArray(s)&&s.length>0?f=[...s]:typeof window<"u"&&Array.isArray(window.selected)&&window.selected.length>0&&(f=[...window.selected]);const P={id:"proj_"+Date.now()+"_"+Math.random().toString(36).substr(2,4),celebrityId:e,stylistId:u?u.id:null,code:h,title:n.trim()||`${d} Curation`,season:a||"FW-2026",purpose:i||"Red Carpet Pull",status:"Curating",notes:o.trim(),createdAt:g.toISOString(),updatedAt:g.toISOString(),selectedSerials:f,pdfRecords:[],activityLog:[{id:"act_"+Date.now(),timestamp:g.toISOString(),action:"Curation Initiated",details:`Created lookbook "${n}" for Celebrity ${d}${u?` by Stylist ${u.name}`:""}${f.length?` with ${f.length} initial selected items`:""}.`}]};return r.unshift(P),U(k.PROJECTS,De(r)),Ce(e,P.id),we(pe(X,"projects",P.id),P).catch(C=>console.warn("Firebase sync error",C)),P}function me(e,t){const n=re(k.PROJECTS,[]),a=n.findIndex(o=>o.id===e);if(a===-1)return null;n[a]={...n[a],...t,updatedAt:new Date().toISOString()};const i=De(n);return U(k.PROJECTS,i),we(pe(X,"projects",n[a].id),n[a]).catch(o=>console.warn("Firebase sync error",o)),n[a]}function Wt(e,t){const n=Pe(e);if(!n)return null;const a=n.selectedSerials?n.selectedSerials.length:0,i=t.length,o=me(e,{selectedSerials:[...t]});return a!==i&&Xe(e,"Selection Updated",`curation updated: ${i} pieces selected.`),o}function Xe(e,t,n){const a=G(),i=a.findIndex(s=>s.id===e);if(i===-1)return null;const o={id:"act_"+Date.now()+"_"+Math.random().toString(36).substr(2,3),timestamp:new Date().toISOString(),action:t,details:n};return a[i].activityLog||(a[i].activityLog=[]),a[i].activityLog.unshift(o),a[i].updatedAt=new Date().toISOString(),U(k.PROJECTS,a),we(pe(X,"projects",a[i].id),a[i]).catch(s=>console.warn("Firebase sync error",s)),o}function Bn(e,{pdfTitle:t,pdfKind:n,itemCount:a,dataUrl:i=null}){const o=G(),s=o.findIndex(l=>l.id===e);if(s===-1)return null;const r={id:"pdf_"+Date.now(),pdfTitle:t,pdfKind:n||"Celebrity Lookbook",generatedAt:new Date().toISOString(),itemCount:a||0,dataUrl:i};return o[s].pdfRecords||(o[s].pdfRecords=[]),o[s].pdfRecords.unshift(r),o[s].updatedAt=new Date().toISOString(),U(k.PROJECTS,o),we(pe(X,"projects",o[s].id),o[s]).catch(l=>console.warn("Firebase sync error",l)),Xe(e,"PDF Exported",`Generated ${n} PDF (${t}) with ${a} items.`),r}function oe(){const e={celebrityId:null,projectId:null},t=re(k.ACTIVE_CONTEXT,e),n=Se(),a=G(),i=ge();let o=a.find(l=>l.id===t.projectId)||a[0]||null,s=o?n.find(l=>l.id===o.celebrityId)||n[0]:n.find(l=>l.id===t.celebrityId)||n[0]||null,r=o&&o.stylistId?ce(o.stylistId):i[0]||null;return{celebrityId:s?s.id:null,projectId:o?o.id:null,stylistId:r?r.id:null,celebrity:s,project:o,stylist:r}}function Ce(e,t){const n={celebrityId:e,projectId:t,updatedAt:new Date().toISOString()};return U(k.ACTIVE_CONTEXT,n),we(pe(X,"app_state","active_context"),n).catch(a=>console.warn("Firebase sync active context error",a)),oe()}const x=Object.freeze(Object.defineProperty({__proto__:null,API_URL:ke,addProjectPdfRecord:Bn,createProject:Ye,fetchDataFromFirebase:_t,getActiveContext:oe,getCelebrities:Se,getCelebrityById:Be,getProjectById:Pe,getProjects:G,getStylistById:ce,getStylists:ge,logProjectActivity:Xe,mergeProjects:qt,saveCelebrity:ut,saveStylist:zt,setActiveContext:Ce,sortProjectsDescending:De,updateProject:me,updateProjectItems:Wt},Symbol.toStringTag,{value:"Module"}));let xt=null;const Ue={filtersOpen:!1},V={currentPage:1,pageSize:10},y={searchCelebrity:"",searchStylist:"",searchBrand:"",projectStatus:"",paymentStatus:"",returnStatus:"",socialStatus:""};function pt(e){return e.projectStatus||e.status||"Active"}function xn(e){const t=String(e||"").trim();return t==="Completed"?"proj-completed":t==="Return pending"?"proj-return":t==="Missing deliverables"?"proj-deliverables":t==="Social pending"?"proj-social":t==="Active"||t==="Lookbook Sent"?"proj-active":"proj-upcoming"}function gt(e){var t;return((t=e.payment)==null?void 0:t.status)||"Pending"}function Fn(e){const t=String(e||"").trim();return t==="Paid"?"pay-paid":t==="Partial"?"pay-partial":t==="Overdue"?"pay-overdue":"pay-pending"}function mt(e){var t;return((t=e.socialPosting)==null?void 0:t.status)||"Pending"}function Mn(e){const t=String(e||"").trim();return t==="Posted"?"soc-posted":t==="Verified"?"soc-verified":"soc-pending"}function Je(e){const t=e.productStats||{};return{sent:Number(t.sent||0),returned:Number(t.returned||0),pending:Number(t.pending||0),missing:Number(t.missing||0)}}function Jt(e){const t=e.deliverables||{},n=Number(t.completed||0),a=Math.max(Number(t.total||0),1);return{completed:n,total:a,percent:a?Math.round(n/a*100):0}}function Ae(e){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(e||0))}function rt(e,t=15){if(!e)return"";const n=new Date(e);if(isNaN(n.getTime()))return"";n.setDate(n.getDate()+t);const a=n.getFullYear(),i=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${i}-${o}`}function Q(e){if(!e)return"—";const t=new Date(e);if(Number.isNaN(t.getTime()))return e;const n=t.getDate(),i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],o=t.getFullYear();return`${n} ${i} ${o}`}function Gt(e){if(!e)return"none";const t=new Date;t.setHours(0,0,0,0);const n=new Date(e);return Number.isNaN(n.getTime())?"none":(n.setHours(0,0,0,0),n<t?"overdue":n.getTime()===t.getTime()?"due":"future")}function Ft(e){if(!e)return!1;const t=new Date;t.setHours(0,0,0,0);const n=new Date(e);return Number.isNaN(n.getTime())?!1:(n.setHours(0,0,0,0),n<t)}function Rn(e){return{total:e.length,active:e.filter(t=>{const n=String(pt(t)).toLowerCase();return n==="active"||n==="lookbook sent"||n.includes("active")}).length,pendingReturns:e.filter(t=>{const n=Je(t);return n.pending>0||n.missing>0}).length,missingProducts:e.filter(t=>Je(t).missing>0).length,pendingDeliverables:e.filter(t=>{const n=Jt(t);return n.completed<n.total}).length,pendingSocial:e.filter(t=>mt(t)==="Pending").length,pendingPayments:e.filter(t=>gt(t)!=="Paid").length,revenueReceived:e.reduce((t,n)=>{var a;return t+Number(((a=n.payment)==null?void 0:a.amountReceived)||0)},0)}}function Kt(e){const t=y.searchCelebrity.trim().toLowerCase(),n=y.searchStylist.trim().toLowerCase(),a=y.searchBrand.trim().toLowerCase();return e.filter(i=>{const o=Be(i.celebrityId),s=ce(i.stylistId),r=o?o.name:"",l=s?s.name:"",d=i.jewelleryBrand||"",c=pt(i),u=gt(i),g=(()=>{const f=Je(i);return f.missing>0?"Missing":f.pending>0?"Pending":f.returned>0?"Returned":"Completed"})(),h=mt(i);return!(t&&!r.toLowerCase().includes(t)||n&&!l.toLowerCase().includes(n)||a&&!d.toLowerCase().includes(a)||y.projectStatus&&c!==y.projectStatus||y.paymentStatus&&u!==y.paymentStatus||y.returnStatus&&g!==y.returnStatus||y.socialStatus&&h!==y.socialStatus)})}function Nn(){clearTimeout(xt),xt=window.setTimeout(()=>{L()},160)}let Mt=!1;function Ln(){Mt||(Mt=!0,document.addEventListener("click",e=>{}))}function On(){Ue.filtersOpen=!Ue.filtersOpen,L()}function Un(e){const t=G(),n=Kt(t),a=Math.ceil(n.length/V.pageSize);e<1||a>0&&e>a||(V.currentPage=e,L())}function Hn({onProjectSwitch:e}){fe(),L(),Jn(),qn(),Ln(),Nt(),window.openProjectDrawer=Wn,window.closeProjectDrawer=et,window.openNewProjectDialog=Rt,window.closeNewProjectDialog=Qt,window.handleStylistSelectChange=_n,window.submitNewProjectDialog=t=>zn(t,e),window.handleCelebrityChange=Kn,window.handleProjectChange=(t,n,a="browse")=>Yn(t,n||e,a),window.handleCreateCelebritySubmit=Xn,window.handleCreateProjectSubmit=t=>Zn(t,e),window.handleQuickNewProject=()=>Rt(),window.showHomepageGateway=Nt,window.unlockStudioWorkspace=Ze,window.updateCurrentProjectStatus=ea,window.renderHomepageProjectsGateway=()=>L(),window.renderDashboard=se,window.renderProjectDashboard=se,window.toggleHomepageProjectFilters=On,window.changeHomepageProjectPage=Un,window.quickFilterOverview=t=>{t==="active"?(y.projectStatus=y.projectStatus==="Active"?"":"Active",y.returnStatus="",y.paymentStatus=""):t==="pendingReturns"?(y.returnStatus=y.returnStatus==="Pending"?"":"Pending",y.projectStatus="",y.paymentStatus=""):t==="missing"?(y.returnStatus=y.returnStatus==="Missing"?"":"Missing",y.projectStatus="",y.paymentStatus=""):t==="revenue"?(y.paymentStatus=y.paymentStatus==="Paid"?"":"Paid",y.projectStatus="",y.returnStatus=""):(y.projectStatus="",y.returnStatus="",y.paymentStatus=""),V.currentPage=1,L()},window.handleHomepageProjectFilterChange=(t,n)=>{y[t]=n,V.currentPage=1,["searchCelebrity","searchStylist","searchBrand"].includes(t)?Nn():L()},window.clearHomepageProjectFilters=()=>{Object.assign(y,{searchCelebrity:"",searchStylist:"",searchBrand:"",projectStatus:"",paymentStatus:"",returnStatus:"",socialStatus:""}),V.currentPage=1,L()}}function fe(){let e=document.getElementById("dreamsaiProjectBar");if(!e){const g=document.querySelector(".top-bar")||document.body.firstElementChild||document.body;e=document.createElement("div"),e.id="dreamsaiProjectBar",e.className="dreamsai-project-bar fashion-bar",g.prepend(e)}const{celebrity:t,project:n,stylist:a}=oe(),i=t?t.name:"Unassigned",o=a?a.name:"Unassigned Stylist",s=n?n.title:"No Active Project",r=n?n.code:"N/A",l=n?n.status:"Curating",d=n&&n.selectedSerials?n.selectedSerials.length:0,c=n&&n.pdfRecords?n.pdfRecords.length:0;let u="badge-curating";l==="Lookbook Sent"&&(u="badge-sent"),l==="Celebrity Approved"&&(u="badge-approved"),l==="Sample Reserved"&&(u="badge-reserved"),l==="Order Placed"&&(u="badge-order"),e.innerHTML=`
    <div class="project-bar-container">
      <div class="project-bar-left">
        <button class="btn-switch-projects" onclick="showHomepageGateway()" title="Return to Projects Gateway">
          <i class="fa-solid fa-grid-2-plus"></i> <span>Gateway</span>
        </button>

        <div class="project-bar-divider"></div>

        <div class="project-meta-group">
          <span class="project-pill" onclick="openProjectDrawer()" title="Click to view project details">
            <i class="fa-solid fa-layer-group"></i>
            <span class="project-title-text">${b(s)}</span>
            <span class="project-code">${b(r)}</span>
          </span>
          <span class="status-badge ${u}">${b(l)}</span>
        </div>
      </div>

      <div class="project-bar-center">
        <div class="people-pills-group">
          <span class="meta-pill stylist-pill" title="Stylist">
            <i class="fa-solid fa-user-tie"></i>
            <span class="pill-label">Stylist:</span>
            <strong>${b(o)}</strong>
          </span>
          <span class="meta-pill celebrity-pill" title="Celebrity">
            <i class="fa-solid fa-star"></i>
            <span class="pill-label">Celebrity:</span>
            <strong>${b(i)}</strong>
          </span>
        </div>
      </div>

      <div class="project-bar-right">
        <div class="project-bar-stats">
          <span class="stat-tag" title="Selected pieces">
            <i class="fa-solid fa-gem"></i>
            <strong>${d}</strong> <span class="stat-lbl">Pieces</span>
          </span>
          <span class="stat-tag" title="Exported PDFs">
            <i class="fa-solid fa-file-pdf"></i>
            <strong>${c}</strong> <span class="stat-lbl">PDFs</span>
          </span>
        </div>

        <button class="btn-project-manage fashion-btn" onclick="openProjectDrawer()" title="Open Project Manager">
          <i class="fa-solid fa-sliders"></i>
          <span>Manager</span>
        </button>
      </div>
    </div>
  `}function L(e){let t=document.getElementById("homepageProjectsGatewayContainer");t||(t=document.createElement("div"),t.id="homepageProjectsGatewayContainer",t.className="homepage-gateway-overlay",(document.querySelector(".app-main")||document.body).prepend(t));const n=document.activeElement,a=n&&n.tagName==="INPUT"?n.getAttribute("placeholder"):"",i=n&&typeof n.selectionStart=="number"?n.selectionStart:null,o=n&&typeof n.selectionEnd=="number"?n.selectionEnd:null,s=G();s.forEach(p=>{if(p.finalTraySharedDate&&!p.followUpDate){const w=rt(p.finalTraySharedDate,15);w&&(p.followUpDate=w,me(p.id,{followUpDate:w}))}});const r=Kt(s),{project:l}=oe(),d=Rn(s),c=r.length,u=Math.ceil(c/V.pageSize);V.currentPage=Math.min(V.currentPage,Math.max(u,1));const g=V.currentPage,h=(g-1)*V.pageSize,f=h+V.pageSize,P=r.slice(h,f),C=c===0?0:h+1,v=Math.min(f,c);let S="";if(c>0){let p=[];if(u<=7)for(let j=1;j<=u;j++)p.push(j);else{p.push(1),g>3&&p.push("...");const j=Math.max(2,g-1),H=Math.min(u-1,g+1);for(let D=j;D<=H;D++)p.includes(D)||p.push(D);g<u-2&&p.push("..."),p.push(u)}const w=p.map(j=>j==="..."?'<span class="hp-pagination-ellipsis">...</span>':`<button class="hp-pagination-page ${j===g?"is-active":""}"
                      onclick="window.changeHomepageProjectPage(${j})"
                      aria-label="Page ${j}">
                ${j}
              </button>`).join(""),$=g<=1,E=g>=u;S=`
      <div class="hp-pagination-container">
        <div class="hp-pagination-info">
          Showing <strong>${C}–${v}</strong> of <strong>${c}</strong> projects
        </div>
        ${u>1?`
        <div class="hp-pagination-controls" role="navigation" aria-label="Projects Pagination">
          <button class="hp-pagination-btn"
                  onclick="window.changeHomepageProjectPage(${g-1})"
                  ${$?'disabled aria-disabled="true"':""}>
            <i class="fa-solid fa-arrow-left"></i> Previous
          </button>

          <div class="hp-pagination-pages">
            ${w}
          </div>

          <button class="hp-pagination-btn"
                  onclick="window.changeHomepageProjectPage(${g+1})"
                  ${E?'disabled aria-disabled="true"':""}>
            Next <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        `:""}
      </div>
    `}if(t.innerHTML=`
    <div class="hp-gateway-wrapper">
      <div class="hp-gateway-header">
        <div class="hp-gateway-title">
          <h2><i class="fa-solid fa-gem" style="color: #d4af37; margin-right: 8px;"></i> ASCEND Communications</h2>
          <p>PR Campaign Dashboard — monitor active pulls, pending returns, client deliverables, and launch new projects.</p>
        </div>
        <div class="hp-gateway-actions">
          <button class="btn-create-project-main" onclick="openNewProjectDialog()">
            <i class="fa-solid fa-plus"></i> New Project
          </button>
        </div>
      </div>

      <!-- Direct Homepage Overview Statistics with Visual Indicators -->
      <div class="hp-overview-section">
        <div class="hp-summary-cards-grid">
          <button class="hp-summary-card card-indicator-green ${y.projectStatus==="Active"?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('active')"
                  title="Filter Active Projects">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-active"><i class="fa-solid fa-chart-line"></i></div>
              <span class="hp-status-pill pill-green"><span class="pulse-dot dot-green"></span> Active</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${d.active}</span>
              <span class="summary-lbl">Active Projects</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-amber ${y.returnStatus==="Pending"?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('pendingReturns')"
                  title="Filter Pending Returns">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-pending-returns"><i class="fa-solid fa-rotate-left"></i></div>
              <span class="hp-status-pill pill-amber"><span class="pulse-dot dot-amber"></span> Pending</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${d.pendingReturns}</span>
              <span class="summary-lbl">Pending Returns</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-red ${y.returnStatus==="Missing"?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('missing')"
                  title="Filter Missing Products">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-missing"><i class="fa-solid fa-triangle-exclamation"></i></div>
              <span class="hp-status-pill pill-red"><span class="pulse-dot dot-red"></span> Missing</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${d.missingProducts}</span>
              <span class="summary-lbl">Missing Products</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-slate ${!y.projectStatus&&!y.returnStatus&&!y.paymentStatus?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('all')"
                  title="View All Projects">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-total"><i class="fa-solid fa-folder-open"></i></div>
              <span class="hp-status-pill pill-slate">Total</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${d.total}</span>
              <span class="summary-lbl">Total Projects</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-emerald ${y.paymentStatus==="Paid"?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('revenue')"
                  title="Filter Settled Revenue">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-revenue"><i class="fa-solid fa-indian-rupee-sign"></i></div>
              <span class="hp-status-pill pill-emerald"><i class="fa-solid fa-check"></i> Settled</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${Ae(d.revenueReceived||d.totalValue)}</span>
              <span class="summary-lbl">Revenue Received</span>
            </div>
          </button>
        </div>
      </div>

      <div class="hp-toolbar-actions">
        <div class="hp-section-heading">
          <h3 class="hp-section-title">Projects Directory</h3>
          <span class="hp-project-count-badge">${r.length} ${r.length===1?"Project":"Projects"}</span>
        </div>

        <button class="hp-filter-toggle-btn ${Ue.filtersOpen?"is-active":""}"
                onclick="event.stopPropagation(); window.toggleHomepageProjectFilters()"
                aria-expanded="${Ue.filtersOpen}"
                aria-controls="homepageProjectFilterPanel"
                aria-label="Toggle Project Filters">
          <i class="fa-solid fa-sliders"></i> Filters
        </button>
      </div>

      <div id="homepageProjectFilterPanel" class="hp-filter-toolbar ${Ue.filtersOpen?"is-open":"is-collapsed"}">
        <div class="filter-inputs-row">
          <div class="input-with-icon">
            <i class="fa-solid fa-user"></i>
            <input type="text" placeholder="Search by Celebrity" value="${b(y.searchCelebrity)}" oninput="window.handleHomepageProjectFilterChange('searchCelebrity', this.value)">
          </div>
          <div class="input-with-icon">
            <i class="fa-solid fa-user-tie"></i>
            <input type="text" placeholder="Search by Stylist" value="${b(y.searchStylist)}" oninput="window.handleHomepageProjectFilterChange('searchStylist', this.value)">
          </div>
          <div class="input-with-icon">
            <i class="fa-solid fa-gem"></i>
            <input type="text" placeholder="Search by Jewellery Brand" value="${b(y.searchBrand)}" oninput="window.handleHomepageProjectFilterChange('searchBrand', this.value)">
          </div>
        </div>
        <div class="filter-selects-row">
          <select value="${b(y.projectStatus)}" onchange="window.handleHomepageProjectFilterChange('projectStatus', this.value)">
            <option value="">Project Status</option>
            <option value="Upcoming" ${y.projectStatus==="Upcoming"?"selected":""}>Upcoming</option>
            <option value="Active" ${y.projectStatus==="Active"?"selected":""}>Active</option>
            <option value="Return pending" ${y.projectStatus==="Return pending"?"selected":""}>Return pending</option>
            <option value="Missing deliverables" ${y.projectStatus==="Missing deliverables"?"selected":""}>Missing deliverables</option>
            <option value="Social pending" ${y.projectStatus==="Social pending"?"selected":""}>Social pending</option>
            <option value="Completed" ${y.projectStatus==="Completed"?"selected":""}>Completed</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('paymentStatus', this.value)">
            <option value="">Payment Status</option>
            <option value="Paid" ${y.paymentStatus==="Paid"?"selected":""}>Paid</option>
            <option value="Partial" ${y.paymentStatus==="Partial"?"selected":""}>Partial</option>
            <option value="Pending" ${y.paymentStatus==="Pending"?"selected":""}>Pending</option>
            <option value="Overdue" ${y.paymentStatus==="Overdue"?"selected":""}>Overdue</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('returnStatus', this.value)">
            <option value="">Return Status</option>
            <option value="Returned" ${y.returnStatus==="Returned"?"selected":""}>Returned</option>
            <option value="Pending" ${y.returnStatus==="Pending"?"selected":""}>Pending</option>
            <option value="Missing" ${y.returnStatus==="Missing"?"selected":""}>Missing</option>
            <option value="Completed" ${y.returnStatus==="Completed"?"selected":""}>Completed</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('socialStatus', this.value)">
            <option value="">Social Posting</option>
            <option value="Pending" ${y.socialStatus==="Pending"?"selected":""}>Pending</option>
            <option value="Posted" ${y.socialStatus==="Posted"?"selected":""}>Posted</option>
            <option value="Verified" ${y.socialStatus==="Verified"?"selected":""}>Verified</option>
          </select>
          <button class="btn-clear-filters" onclick="window.clearHomepageProjectFilters()">Clear Filters</button>
        </div>
      </div>

      <div class="hp-projects-cards-grid">
        ${r.length===0?'<div class="hp-project-card"><strong>No projects match the selected filters.</strong></div>':P.map(p=>{const w=l&&p.id===l.id,$=Be(p.celebrityId),E=ce(p.stylistId),j=$?$.name:p.celebrityName||"Celebrity",H=p.headStylist||(E?E.name:"Unassigned Stylist"),D=p.finalTraySharedDate||"",q=p.followUpDate||(D?rt(D,15):""),K=p.returnDueDate||"",ie=!!(D||q||K);return`
            <div class="hp-project-card ${w?"active-project":""}" onclick="window.handleProjectChange('${p.id}', null, 'browse')" role="button" tabindex="0" aria-label="Open ${b(p.title)} inventory">
              <div class="hp-card-stylist-block">
                <span class="hp-meta-label">STYLIST</span>
                <span class="hp-stylist-val">${b(H)}</span>
              </div>

              <div class="hp-card-title-block">
                <h3 class="hp-project-title">${b(p.title)}</h3>
              </div>

              <div class="hp-card-celebrity-block">
                <span class="hp-meta-label">CELEBRITY</span>
                <span class="hp-celebrity-val">${b(j)}</span>
              </div>

              ${ie?`
                <div class="hp-card-divider-clean"></div>
                <div class="hp-dates-vertical">
                  ${D?`
                    <div class="hp-date-line">
                      <span class="hp-date-type">Final List</span>
                      <span class="hp-date-val">${b(Q(D))}</span>
                    </div>
                  `:""}
                  ${q?`
                    <div class="hp-date-line">
                      <span class="hp-date-type">Follow-up</span>
                      <span class="hp-date-val">${b(Q(q))}</span>
                    </div>
                  `:""}
                  ${K?`
                    <div class="hp-date-line">
                      <span class="hp-date-type">Return Due</span>
                      <span class="hp-date-val">${b(Q(K))}</span>
                    </div>
                  `:""}
                </div>
              `:""}

              <div class="hp-card-footer-actions">
                <button class="hp-card-btn-dashboard" onclick="event.stopPropagation(); window.handleProjectChange('${p.id}', null, 'dashboard')" title="Open Project Dashboard">
                  <i class="fa-solid fa-gauge-high"></i> Dashboard
                </button>
                <div class="hp-card-browse-link" onclick="event.stopPropagation(); window.handleProjectChange('${p.id}', null, 'browse')" title="Open Inventory">
                  <span class="hp-browse-lbl">Inventory</span>
                  <span class="hp-arrow-link"><i class="fa-solid fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>

      ${S}
    </div>
  `,ta(),a){const p=t.querySelector(`input[placeholder="${a}"]`);p&&window.requestAnimationFrame(()=>{if(p.focus(),i!==null&&o!==null){const w=Math.min(i,p.value.length),$=Math.min(o,p.value.length);p.setSelectionRange(w,$)}})}}function qn(e){if(document.getElementById("newProjectModalOverlay"))return;const t=Se(),n=t[0]?t[0].name:"Shreya",a=`
    <div id="newProjectModalOverlay" class="project-modal-overlay" style="display: none;">
      <div class="project-modal-card fashion-theme" style="max-width: 520px;">
        <div class="project-modal-header">
          <h3><i class="fa-solid fa-folder-plus"></i> New Project</h3>
          <button class="btn-close-modal" onclick="closeNewProjectDialog()">&times;</button>
        </div>
        <form onsubmit="submitNewProjectDialog(event)" style="padding: 24px;">
          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Celebrity Name:</label>
            <input type="text" id="dialogCelebrityName" value="${b(n)}" placeholder="e.g. Shreya" required class="pm-select" style="margin-top: 6px; width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Project Title:</label>
            <input type="text" id="dialogProjectTitle" placeholder="e.g. Monday Bridal Selection" required class="pm-select" style="margin-top: 6px; width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Stylist:</label>
            <select id="dialogStylistSelect" class="pm-select" onchange="handleStylistSelectChange(this.value)" style="margin-top: 6px; width: 100%;">
              <!-- Dynamic populated -->
            </select>

            <div id="newStylistInputContainer" style="display: none; margin-top: 10px;">
              <input type="text" id="dialogNewStylistName" placeholder="Enter New Stylist Name (e.g. Natasha)" class="pm-select" style="width: 100%; border-color: #d4af37;" />
            </div>
          </div>

          <button type="submit" class="btn-proceed-large" style="margin-top: 0;">
            <i class="fa-solid fa-arrow-right"></i> Create Project
          </button>
        </form>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",a)}function Rt(){const e=document.getElementById("newProjectModalOverlay"),t=document.getElementById("dialogStylistSelect"),n=document.getElementById("newStylistInputContainer");if(t){const a=ge();t.innerHTML=`
      ${a.map(i=>`<option value="${i.id}">${b(i.name)} (${b(i.title)})</option>`).join("")}
      <option value="__NEW_STYLIST__">+ Add New Stylist...</option>
    `}n&&(n.style.display="none"),e&&(e.style.display="flex")}function Qt(){const e=document.getElementById("newProjectModalOverlay");e&&(e.style.display="none")}function _n(e){const t=document.getElementById("newStylistInputContainer"),n=document.getElementById("dialogNewStylistName");e==="__NEW_STYLIST__"?(t&&(t.style.display="block"),n&&n.focus()):t&&(t.style.display="none")}function zn(e,t){e.preventDefault();const n=document.getElementById("dialogCelebrityName"),a=document.getElementById("dialogProjectTitle"),i=document.getElementById("dialogStylistSelect"),o=document.getElementById("dialogNewStylistName");if(!n||!n.value.trim()||!a||!a.value.trim())return;const s=n.value.trim(),r=a.value.trim();let l=i?i.value:null;if(l==="__NEW_STYLIST__"){if(!o||!o.value.trim()){alert("Please enter the name of the new Stylist.");return}l=zt({name:o.value.trim(),title:"Stylist"}).id}let c=Se().find(g=>g.name.toLowerCase()===s.toLowerCase());c||(c=ut({name:s,category:"A-List Celebrity"}));const u=Ye({celebrityId:c.id,stylistId:l,title:r});Ce(c.id,u.id),fe(),L(),Qt(),et(),Ze(),typeof t=="function"&&t(u),typeof window.switchTab=="function"&&window.switchTab("browse")}function Nt(){document.body.classList.add("gateway-active");const e=document.getElementById("homepageProjectsGatewayContainer");e&&(e.style.display="block"),document.querySelectorAll(".sidebar-nav-item, .bottom-nav-item").forEach(i=>i.classList.remove("active"));const n=document.getElementById("tabDashboardBtn");n&&n.classList.add("active");const a=document.getElementById("bottomNavHome");a&&a.classList.add("active")}function Ze(){document.body.classList.remove("gateway-active");const e=document.getElementById("homepageProjectsGatewayContainer");e&&(e.style.display="none")}function Wn(){const e=document.getElementById("projectDrawerModal");e&&(tt(),e.style.display="flex")}function et(){const e=document.getElementById("projectDrawerModal");e&&(e.style.display="none")}function Jn(){if(document.getElementById("projectDrawerModal"))return;document.body.insertAdjacentHTML("beforeend",`
    <div id="projectDrawerModal" class="project-modal-overlay" style="display: none;">
      <div class="project-modal-card fashion-theme">
        <div class="project-modal-header">
          <h3><i class="fa-solid fa-crown"></i> Stylists &amp; Celebrities Workspace Studio</h3>
          <button class="btn-close-modal" onclick="closeProjectDrawer()">&times;</button>
        </div>
        <div class="project-modal-body" id="projectModalBody">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `)}function tt(){const e=document.getElementById("projectModalBody");if(!e)return;const t=Se();ge();const{celebrity:n,project:a}=oe(),i=n?n.id:"",o=i?G(i):[];e.innerHTML=`
    <div class="project-manager-grid">
      <div class="pm-section pm-sidebar">
        <h4>1. Celebrity / Muse Directory</h4>
        <div class="form-group">
          <select id="pmCelebritySelect" class="pm-select" onchange="handleCelebrityChange(this.value)">
            ${t.map(s=>`<option value="${s.id}" ${s.id===i?"selected":""}>${b(s.name)} (${b(s.category||"Celebrity")})</option>`).join("")}
          </select>
        </div>

        <button class="btn-secondary-sm full-width" onclick="toggleNewCelebrityForm()">+ Add New Celebrity</button>

        <form id="newCelebrityForm" style="display: none;" onsubmit="handleCreateCelebritySubmit(event)" class="pm-inline-form">
          <input type="text" id="newCelebrityName" placeholder="Celebrity Name (e.g. Shreya)" required />
          <select id="newCelebrityCategory" class="pm-select-sm">
            <option value="A-List Actress & Icon">A-List Actress & Icon</option>
            <option value="Red Carpet Musician">Red Carpet Musician</option>
          </select>
          <button type="submit" class="btn-primary-sm">Save Celebrity</button>
        </form>

        <hr class="pm-divider" />

        <h4>2. Celebrity Projects / Lookbooks</h4>
        <div class="project-list-box">
          ${o.length===0?'<p class="pm-empty">No projects created yet for this celebrity.</p>':""}
          ${o.map(s=>{const r=a&&s.id===a.id,l=ce(s.stylistId),d=l?l.name:"Unassigned";return`
              <div class="project-item-card ${r?"active":""}" onclick="handleProjectChange('${s.id}')">
                <div class="pic-header">
                  <strong>${b(s.title)}</strong>
                  <span class="pic-badge">${b(s.status)}</span>
                </div>
                <div class="pic-meta">
                  <span>Stylist: ${b(d)}</span> • <span>${b(s.code)}</span>
                </div>
              </div>
            `}).join("")}
        </div>

        <button class="btn-primary-sm full-width" onclick="openNewProjectDialog()">+ New Project</button>
      </div>

      <div class="pm-section pm-details">
        ${a?Gn(a):'<p class="pm-empty">Select or create a project to proceed.</p>'}
      </div>
    </div>
  `}function Gn(e){const t=ce(e.stylistId),n=t?t.name:"Unassigned";return`
    <div class="pd-header">
      <div>
        <h3>${b(e.title)} <small>(${b(e.code)})</small></h3>
        <p class="pd-subtitle">
          <span><i class="fa-solid fa-user-tie"></i> Stylist: <strong>${b(n)}</strong></span>
        </p>
      </div>
      <div class="pd-status-control">
        <label>Stage:</label>
        <select onchange="updateCurrentProjectStatus('${e.id}', this.value)" class="pm-select-sm fashion-status-select">
          <option value="Curating" ${e.status==="Curating"?"selected":""}>1. Curating (In)</option>
          <option value="Lookbook Sent" ${e.status==="Lookbook Sent"?"selected":""}>2. Lookbook Sent to Celebrity</option>
          <option value="Celebrity Approved" ${e.status==="Celebrity Approved"?"selected":""}>3. Celebrity Approved Pieces</option>
          <option value="Sample Reserved" ${e.status==="Sample Reserved"?"selected":""}>4. Sample Reserved / Pull</option>
          <option value="Order Placed" ${e.status==="Order Placed"?"selected":""}>5. Production / Order Placed</option>
        </select>
      </div>
    </div>

    ${e.notes?`<div class="pd-notes-box"><i class="fa-solid fa-pen-nib"></i> <strong>Notes:</strong> ${b(e.notes)}</div>`:""}

    <button class="btn-proceed-large" onclick="handleProjectChange('${e.id}')">
      <i class="fa-solid fa-circle-check"></i> Proceed with this Project
    </button>
  `}function Kn(e){const t=G(e),n=t.length>0?t[0].id:null;Ce(e,n),tt()}let ze=!1;function Qn(){let e=document.getElementById("projectSwitchLoader");e||(e=document.createElement("div"),e.id="projectSwitchLoader",e.style.cssText="position: fixed; inset: 0; background: rgba(15, 17, 23, 0.4); backdrop-filter: blur(4px); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; gap: 12px; font-family: var(--font-sans);",e.innerHTML=`
      <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2.5rem; color: #c5a059;"></i>
      <span style="font-weight: 600; font-size: 0.95rem; letter-spacing: 0.05em;">Switching Project...</span>
    `,document.body.appendChild(e)),e.style.display="flex"}function Vt(){const e=document.getElementById("projectSwitchLoader");e&&(e.style.display="none")}function Vn(e,t,n){Vt(),ze=!1;let a=document.getElementById("projectSwitchErrorModal");a||(a=document.createElement("div"),a.id="projectSwitchErrorModal",a.className="project-modal-overlay",document.body.appendChild(a)),a.innerHTML=`
    <div class="project-modal-card" style="max-width: 440px; padding: 24px; text-align: center;">
      <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.8rem; color: #ef4444; margin-bottom: 12px;"></i>
      <h3 style="margin: 0 0 8px; font-family: var(--font-serif); font-size: 1.3rem;">Unable to Switch Project</h3>
      <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 20px;">We encountered an issue loading project ID: <strong>${b(e||"Unknown")}</strong>.</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button class="btn-dash-action" onclick="document.getElementById('projectSwitchErrorModal').style.display='none'">Dismiss</button>
        <button class="btn-dash-action btn-dash-primary" onclick="document.getElementById('projectSwitchErrorModal').style.display='none'; handleProjectChange('${e}', null, '${n}')">
          <i class="fa-solid fa-rotate-right"></i> Retry
        </button>
      </div>
    </div>
  `,a.style.display="flex"}function Yn(e,t,n="browse"){ze||(ze=!0,Qn(),setTimeout(()=>{try{const a=Pe(e);if(!a)throw new Error(`Project ${e} not found in store.`);Ce(a.celebrityId,a.id),fe(),et(),Ze(),typeof t=="function"&&t(a),typeof window.switchTab=="function"&&window.switchTab(n),n==="dashboard"&&se(),Vt(),ze=!1}catch(a){console.error("Project Switch Failed:",a),Vn(e,t,n)}},180))}function Xn(e){e.preventDefault();const t=document.getElementById("newCelebrityName"),n=document.getElementById("newCelebrityCategory"),a=document.getElementById("newCelebrityPhone");if(!t||!t.value.trim())return;const i=ut({name:t.value,category:n?n.value:"A-List Actress & Icon",phone:a?a.value:""}),o=ge(),s=Ye({celebrityId:i.id,stylistId:o[0]?o[0].id:null,title:`${i.name} Requirement`});Ce(i.id,s.id),fe(),tt(),se()}function Zn(e,t){e.preventDefault();const n=document.getElementById("newProjectTitle"),a=document.getElementById("newProjectStylist"),i=document.getElementById("newProjectNotes");if(!n||!n.value.trim())return;const{celebrityId:o}=oe();if(!o)return;const s=Ye({celebrityId:o,stylistId:a?a.value:null,title:n.value,notes:i?i.value:""});Ce(o,s.id),fe(),L(),et(),Ze(),typeof t=="function"&&t(s),typeof window.switchTab=="function"&&window.switchTab("dashboard"),se()}function ea(e,t){me(e,{status:t,projectStatus:t}),Xe(e,"Stage Updated",`Curation stage updated to "${t}".`),fe(),tt(),L(),se()}window.openQuickEditProjectModal=function(e){const t=Pe(e);if(!t)return;let n=document.getElementById("quickEditProjectModal");n||(document.body.insertAdjacentHTML("beforeend",`
      <div id="quickEditProjectModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 560px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-pen-to-square"></i> Edit Project Details</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickEditProjectModal').style.display='none'">&times;</button>
          </div>
          <form id="quickEditProjectForm" onsubmit="handleQuickEditProjectSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qeProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Project Title:</label>
              <input type="text" id="qeTitle" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Head Stylist:</label>
                <input type="text" id="qeHeadStylist" class="pm-select" required />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Jewellery Brand:</label>
                <input type="text" id="qeBrand" class="pm-select" required />
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Shared Date:</label>
                <input type="date" id="qeSharedDate" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Follow-up Date:</label>
                <input type="date" id="qeFollowUpDate" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Return Due Date:</label>
                <input type="date" id="qeReturnDueDate" class="pm-select" />
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Project Status:</label>
                <select id="qeProjectStatus" class="pm-select">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Active">Active</option>
                  <option value="Return pending">Return pending</option>
                  <option value="Missing deliverables">Missing deliverables</option>
                  <option value="Social pending">Social pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Payment Status:</label>
                <select id="qePaymentStatus" class="pm-select">
                  <option value="Pending">🔴 Pending</option>
                  <option value="Partial">🟡 Partial</option>
                  <option value="Paid">🟢 Paid</option>
                  <option value="Overdue">🔴 Overdue</option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Invoice Amount (₹):</label>
                <input type="number" id="qeInvoiceAmt" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Amount Received (₹):</label>
                <input type="number" id="qeAmtReceived" class="pm-select" />
              </div>
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Project Details</button>
          </form>
        </div>
      </div>
    `),n=document.getElementById("quickEditProjectModal")),document.getElementById("qeProjectId").value=t.id,document.getElementById("qeTitle").value=t.title,document.getElementById("qeHeadStylist").value=t.headStylist||"Natasha K",document.getElementById("qeBrand").value=t.jewelleryBrand||"Ascend Fine Jewellery",document.getElementById("qeSharedDate").value=t.finalTraySharedDate||"",document.getElementById("qeFollowUpDate").value=t.followUpDate||"",document.getElementById("qeReturnDueDate").value=t.returnDueDate||"",document.getElementById("qeProjectStatus").value=t.projectStatus||t.status||"Active";const a=t.payment||{invoiceAmount:15e4,amountReceived:1e5,status:"Partial"};document.getElementById("qePaymentStatus").value=a.status||"Pending",document.getElementById("qeInvoiceAmt").value=a.invoiceAmount||0,document.getElementById("qeAmtReceived").value=a.amountReceived||0,n.style.display="flex"};window.handleQuickEditProjectSubmit=function(e){e.preventDefault();const t=document.getElementById("qeProjectId").value;if(!t)return;const n={title:document.getElementById("qeTitle").value.trim(),headStylist:document.getElementById("qeHeadStylist").value.trim(),jewelleryBrand:document.getElementById("qeBrand").value.trim(),finalTraySharedDate:document.getElementById("qeSharedDate").value,followUpDate:document.getElementById("qeFollowUpDate").value,returnDueDate:document.getElementById("qeReturnDueDate").value,projectStatus:document.getElementById("qeProjectStatus").value,status:document.getElementById("qeProjectStatus").value,payment:{invoiceAmount:parseFloat(document.getElementById("qeInvoiceAmt").value)||0,amountReceived:parseFloat(document.getElementById("qeAmtReceived").value)||0,status:document.getElementById("qePaymentStatus").value}};me(t,n),document.getElementById("quickEditProjectModal").style.display="none",L(),fe(),se()};window.openQuickUpdateReturnModal=function(e){const t=Pe(e);if(!t)return;const n=t.productStats||{sent:18,returned:14,pending:3,missing:1};let a=document.getElementById("quickReturnModal");a||(document.body.insertAdjacentHTML("beforeend",`
      <div id="quickReturnModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 440px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-rotate-left"></i> Update Product Return Status</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickReturnModal').style.display='none'">&times;</button>
          </div>
          <form onsubmit="handleQuickReturnSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qrProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Total Products Sent:</label>
              <input type="number" id="qrSent" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">🟢 Products Returned:</label>
              <input type="number" id="qrReturned" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">🟡 Pending Returns:</label>
              <input type="number" id="qrPending" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
              <label style="font-weight:700; font-size:0.85rem;">🔴 Missing Products:</label>
              <input type="number" id="qrMissing" class="pm-select" required />
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Product Status</button>
          </form>
        </div>
      </div>
    `),a=document.getElementById("quickReturnModal")),document.getElementById("qrProjectId").value=t.id,document.getElementById("qrSent").value=n.sent||0,document.getElementById("qrReturned").value=n.returned||0,document.getElementById("qrPending").value=n.pending||0,document.getElementById("qrMissing").value=n.missing||0,a.style.display="flex"};window.handleQuickReturnSubmit=function(e){e.preventDefault();const t=document.getElementById("qrProjectId").value;if(!t)return;const n={sent:parseInt(document.getElementById("qrSent").value)||0,returned:parseInt(document.getElementById("qrReturned").value)||0,pending:parseInt(document.getElementById("qrPending").value)||0,missing:parseInt(document.getElementById("qrMissing").value)||0};me(t,{productStats:n}),document.getElementById("quickReturnModal").style.display="none",L(),se()};window.openQuickUpdateDeliverablesModal=function(e){const t=Pe(e);if(!t)return;const n=t.deliverables||{completed:3,total:5};let a=document.getElementById("quickDeliverablesModal");a||(document.body.insertAdjacentHTML("beforeend",`
      <div id="quickDeliverablesModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 440px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-list-check"></i> Update Deliverables</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickDeliverablesModal').style.display='none'">&times;</button>
          </div>
          <form onsubmit="handleQuickDeliverablesSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qdProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Completed Deliverables:</label>
              <input type="number" id="qdCompleted" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
              <label style="font-weight:700; font-size:0.85rem;">Total Deliverables Agreed:</label>
              <input type="number" id="qdTotal" class="pm-select" required />
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Deliverables Progress</button>
          </form>
        </div>
      </div>
    `),a=document.getElementById("quickDeliverablesModal")),document.getElementById("qdProjectId").value=t.id,document.getElementById("qdCompleted").value=n.completed||0,document.getElementById("qdTotal").value=n.total||0,a.style.display="flex"};window.handleQuickDeliverablesSubmit=function(e){e.preventDefault();const t=document.getElementById("qdProjectId").value;if(!t)return;const n={completed:parseInt(document.getElementById("qdCompleted").value)||0,total:parseInt(document.getElementById("qdTotal").value)||0};me(t,{deliverables:n}),document.getElementById("quickDeliverablesModal").style.display="none",L(),se()};window.quickToggleSocialPosted=function(e){const t=Pe(e);if(!t)return;const n=t.socialPosting||{status:"Pending"};let a="Posted",i=new Date().toISOString().split("T")[0];n.status==="Pending"?a="Posted":n.status==="Posted"?a="Verified":(a="Pending",i=""),me(e,{socialPosting:{status:a,postingDate:i}}),L(),se()};window.toggleNewCelebrityForm=function(){const e=document.getElementById("newCelebrityForm");e&&(e.style.display=e.style.display==="none"?"flex":"none")};function ta(){if(sessionStorage.getItem("hp_followup_reminder_shown")==="true")return;const e=G(),t=new Date;t.setHours(0,0,0,0);const n=e.filter(a=>{if(!a.followUpDate)return!1;const i=new Date(a.followUpDate);return isNaN(i.getTime())?!1:(i.setHours(0,0,0,0),t>=i)});n.length!==0&&(sessionStorage.setItem("hp_followup_reminder_shown","true"),na(n))}function na(e){let t=document.getElementById("followUpReminderModalOverlay");t||(t=document.createElement("div"),t.id="followUpReminderModalOverlay",t.className="project-modal-overlay",document.body.appendChild(t));const n=e.map(a=>{const i=Be(a.celebrityId),o=ce(a.stylistId),s=i?i.name:"Celebrity",r=o?o.name:"Stylist",l=Gt(a.followUpDate),d=l==="overdue"?"Overdue":"Due Today",c=l==="overdue"?"badge-missing":"badge-pending";return`
      <div style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 8px; margin-bottom: 10px; background: #fafaf9; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
        <div>
          <div style="font-weight: 700; font-size: 0.92rem; color: #1c1917;">${b(a.title)}</div>
          <div style="font-size: 0.82rem; color: #78716c; margin-top: 2px;">
            <i class="fa-solid fa-star"></i> ${b(s)} &nbsp;|&nbsp; <i class="fa-solid fa-user-tie"></i> ${b(r)}
          </div>
          <div style="font-size: 0.8rem; color: #a8a29e; margin-top: 2px;">
            Follow-up date: <strong>${Q(a.followUpDate)}</strong>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <span class="prod-badge ${c}" style="margin:0;">${d}</span>
          <button class="btn-qa btn-qa-primary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="window.closeFollowUpReminderModal(); window.handleProjectChange('${a.id}');">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project
          </button>
        </div>
      </div>
    `}).join("");t.innerHTML=`
    <div class="project-modal-card fashion-theme" style="max-width: 540px; box-sizing: border-box;">
      <div class="project-modal-header">
        <h3><i class="fa-solid fa-bell" style="color: #fb923c;"></i> Follow-up Reminders (${e.length})</h3>
        <button class="btn-close-modal" onclick="window.closeFollowUpReminderModal()">&times;</button>
      </div>
      <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
        <p style="margin: 0 0 14px 0; font-size: 0.88rem; color: #78716c;">
          The following campaign project(s) have reached or passed their 15-day follow-up date:
        </p>
        ${n}
      </div>
      <div class="project-modal-footer" style="padding: 12px 20px; display: flex; justify-content: flex-end; background: #fafaf9; border-top: 1px solid #e7e5e4;">
        <button class="btn-qa btn-qa-secondary" onclick="window.closeFollowUpReminderModal()">Dismiss</button>
      </div>
    </div>
  `,t.style.display="flex"}window.closeFollowUpReminderModal=function(){const e=document.getElementById("followUpReminderModalOverlay");e&&(e.style.display="none")};function se(){var Le;const e=document.getElementById("projectDashboardContent")||document.getElementById("dashboardTab");if(!e)return;const{celebrity:t,project:n,stylist:a}=oe(),i=G(),o=n||(i.length>0?i[0]:null);if(!o){e.innerHTML=`
      <div class="dash-empty-state">
        <i class="fa-solid fa-folder-open"></i>
        <h3>No Project Selected</h3>
        <p>Choose an existing project from the Home catalog or create a new campaign.</p>
        <button class="btn-dash-action btn-dash-primary" onclick="showHomepageGateway()">
          <i class="fa-solid fa-house"></i> Go to All Projects
        </button>
      </div>
    `;return}const s=t||Be(o.celebrityId),r=a||ce(o.stylistId),l=s?s.name:o.celebrityName||"Celebrity",d=o.headStylist||(r?r.name:"Unassigned Stylist"),c=o.code||o.id||"N/A",u=o.jewelleryBrand||"Ascend Fine Jewellery",g=o.season||"Fall / Winter 2026",h=o.purpose||"Client Styling & PR Pull",f=pt(o),P=gt(o),C=mt(o),v=Je(o),S=Jt(o),p=o.finalTraySharedDate||"",w=o.followUpDate||(p?rt(p,15):""),$=o.returnDueDate||"",E=((Le=o.socialPosting)==null?void 0:Le.postingDate)||"",j=Gt(w),H=Ft($),D=v.sent||v.returned+v.pending+v.missing||0,q=D>0?Math.round(v.returned/D*100):v.returned>0?100:0,K=o.payment||{invoiceAmount:0,amountReceived:0},ie=Number(K.invoiceAmount||0),Ie=Number(K.amountReceived||0),Me=Math.max(0,ie-Ie),_=S.completed||0,$e=S.total||0,Re=$e>0?Math.round(_/$e*100):0,qe=Array.isArray(o.selectedSerials)?o.selectedSerials.length:Array.isArray(window.selected)?window.selected.length:0,Ne=Array.isArray(o.activityLog)?o.activityLog:[];e.innerHTML=`
    <div class="dash-workspace-wrapper">
      <!-- TOP NAVIGATION & ACTION BAR -->
      <div class="dash-nav-header">
        <button class="btn-dash-back" onclick="showHomepageGateway()" title="Return to Home Gateway">
          <i class="fa-solid fa-arrow-left"></i> All Projects
        </button>

        <div class="dash-quick-actions">
          <button class="btn-dash-action" onclick="window.openQuickEditProjectModal('${o.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit Project
          </button>
          <button class="btn-dash-action" onclick="window.openQuickUpdateReturnModal('${o.id}')">
            <i class="fa-solid fa-rotate-left"></i> Manage Returns
          </button>
          <button class="btn-dash-action" onclick="window.openQuickUpdateDeliverablesModal('${o.id}')">
            <i class="fa-solid fa-list-check"></i> Update Deliverables
          </button>
          <button class="btn-dash-action" onclick="window.quickToggleSocialPosted('${o.id}')">
            <i class="fa-solid fa-share-nodes"></i> Toggle Social
          </button>
          <button class="btn-dash-action btn-dash-primary" onclick="switchTab('browse')">
            <i class="fa-solid fa-gem"></i> Browse Catalog
          </button>
        </div>
      </div>

      <!-- PROJECT HERO BANNER -->
      <div class="dash-hero-banner">
        <div class="dash-hero-meta">
          <div class="dash-eyebrow-row">
            <span class="dash-tag-stylist"><i class="fa-solid fa-user-tie"></i> Stylist: <strong>${b(d)}</strong></span>
            <span class="dash-divider">•</span>
            <span class="dash-tag-celeb"><i class="fa-solid fa-star"></i> Celebrity: <strong>${b(l)}</strong></span>
            <span class="dash-divider">•</span>
            <span class="dash-tag-code">ID: <strong>${b(c)}</strong></span>
          </div>
          <h1 class="dash-project-title">${b(o.title)}</h1>
          <p class="dash-project-subtitle">${b(u)} &nbsp;|&nbsp; ${b(g)} &nbsp;|&nbsp; ${b(h)}</p>
        </div>

        <div class="dash-hero-status-box">
          <div class="dash-status-label">Project Status</div>
          <div class="dash-status-pill-wrap">
            <span class="proj-status-badge ${xn(f)}">${b(f)}</span>
          </div>
          <div class="dash-stage-select-wrap">
            <label for="dashStageSelect">Stage:</label>
            <select id="dashStageSelect" onchange="window.updateCurrentProjectStatus('${o.id}', this.value)" class="dash-stage-select">
              <option value="Curating" ${o.status==="Curating"?"selected":""}>1. Curating</option>
              <option value="Lookbook Sent" ${o.status==="Lookbook Sent"?"selected":""}>2. Lookbook Sent</option>
              <option value="Celebrity Approved" ${o.status==="Celebrity Approved"?"selected":""}>3. Celebrity Approved</option>
              <option value="Sample Reserved" ${o.status==="Sample Reserved"?"selected":""}>4. Sample Reserved</option>
              <option value="Order Placed" ${o.status==="Order Placed"?"selected":""}>5. Order Placed</option>
            </select>
          </div>
        </div>
      </div>

      <!-- KEY METRICS ROW -->
      <div class="dash-metrics-grid">
        <div class="dash-metric-card" onclick="switchTab('selected')" style="cursor: pointer;" title="View Pieces in Pull">
          <div class="dash-metric-icon icon-curated"><i class="fa-solid fa-gem"></i></div>
          <div class="dash-metric-data">
            <span class="dash-metric-val">${qe}</span>
            <span class="dash-metric-lbl">Curated Pieces in Pull</span>
          </div>
        </div>

        <div class="dash-metric-card" onclick="window.openQuickUpdateReturnModal('${o.id}')" style="cursor: pointer;" title="Update Return Progress">
          <div class="dash-metric-icon icon-returns"><i class="fa-solid fa-rotate-left"></i></div>
          <div class="dash-metric-data">
            <span class="dash-metric-val">${v.returned} / ${D}</span>
            <span class="dash-metric-lbl">Products Returned (${q}%)</span>
          </div>
        </div>

        <div class="dash-metric-card" onclick="window.openQuickEditProjectModal('${o.id}')" style="cursor: pointer;" title="Update Financials">
          <div class="dash-metric-icon icon-payment"><i class="fa-solid fa-indian-rupee-sign"></i></div>
          <div class="dash-metric-data">
            <span class="dash-metric-val">${Ae(Ie)}</span>
            <span class="dash-metric-lbl">Received of ${Ae(ie)}</span>
          </div>
        </div>

        <div class="dash-metric-card" onclick="window.quickToggleSocialPosted('${o.id}')" style="cursor: pointer;" title="Toggle Social Post State">
          <div class="dash-metric-icon icon-social"><i class="fa-solid fa-share-nodes"></i></div>
          <div class="dash-metric-data">
            <span class="dash-metric-val">${b(C)}</span>
            <span class="dash-metric-lbl">Social Media Status</span>
          </div>
        </div>
      </div>

      <!-- MAIN OPERATIONAL SECTIONS GRID -->
      <div class="dash-sections-grid">
        <!-- 1. IMPORTANT DATES -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-regular fa-calendar-days"></i> Important Dates</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickEditProjectModal('${o.id}')">Edit Dates</button>
          </div>
          <div class="dash-dates-list">
            <div class="dash-date-row">
              <div class="dash-date-label-wrap">
                <span class="dash-date-name">Final List (Shared)</span>
                <span class="dash-date-desc">Curated selection sent to stylist</span>
              </div>
              <div class="dash-date-value ${Ft(p)?"text-overdue":""}">
                ${b(Q(p))}
              </div>
            </div>

            <div class="dash-date-row">
              <div class="dash-date-label-wrap">
                <span class="dash-date-name">15-Day Follow-up</span>
                <span class="dash-date-desc">Check-in with stylist & muse</span>
              </div>
              <div class="dash-date-value-wrap">
                <span class="dash-date-value ${j==="overdue"?"text-overdue":""}">${b(Q(w))}</span>
                ${j==="overdue"?'<span class="dash-badge-danger">Overdue</span>':j==="due"?'<span class="dash-badge-warning">Due Today</span>':'<span class="dash-badge-neutral">Upcoming</span>'}
              </div>
            </div>

            <div class="dash-date-row">
              <div class="dash-date-label-wrap">
                <span class="dash-date-name">Return Due Date</span>
                <span class="dash-date-desc">Expected return to inventory</span>
              </div>
              <div class="dash-date-value-wrap">
                <span class="dash-date-value ${H?"text-overdue":""}">${b(Q($))}</span>
                ${H?'<span class="dash-badge-danger">Past Due</span>':""}
              </div>
            </div>

            <div class="dash-date-row">
              <div class="dash-date-label-wrap">
                <span class="dash-date-name">Social Posting Date</span>
                <span class="dash-date-desc">Scheduled publication</span>
              </div>
              <div class="dash-date-value">
                ${b(E?Q(E):"Not scheduled")}
              </div>
            </div>
          </div>
        </div>

        <!-- 2. PRODUCT STATUS & RETURNS -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-rotate-left"></i> Product Status & Returns</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickUpdateReturnModal('${o.id}')">Update Counts</button>
          </div>
          
          <div class="dash-progress-wrap">
            <div class="dash-progress-labels">
              <span>Return Completion Rate</span>
              <strong>${q}% (${v.returned}/${D})</strong>
            </div>
            <div class="dash-progress-track">
              <div class="dash-progress-fill" style="width: ${Math.min(100,Math.max(0,q))}%;"></div>
            </div>
          </div>

          <div class="dash-product-stats-grid">
            <div class="dash-pstat-box">
              <span class="dash-pstat-lbl">Sent</span>
              <span class="dash-pstat-val">${D}</span>
            </div>
            <div class="dash-pstat-box box-returned">
              <span class="dash-pstat-lbl">Returned</span>
              <span class="dash-pstat-val">${v.returned}</span>
            </div>
            <div class="dash-pstat-box box-pending">
              <span class="dash-pstat-lbl">Pending</span>
              <span class="dash-pstat-val">${v.pending}</span>
            </div>
            <div class="dash-pstat-box box-missing">
              <span class="dash-pstat-lbl">Missing</span>
              <span class="dash-pstat-val">${v.missing}</span>
            </div>
          </div>

          <div class="dash-card-actions-footer">
            <button class="btn-dash-action" onclick="window.openQuickUpdateReturnModal('${o.id}')">
              <i class="fa-solid fa-pen"></i> Quick Return Update
            </button>
            <button class="btn-dash-action" onclick="switchTab('returnProducts')">
              <i class="fa-solid fa-boxes-stacked"></i> Full Returns Workspace
            </button>
          </div>
        </div>

        <!-- 3. SOCIAL MEDIA & PR -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-share-nodes"></i> Social & PR Coverage</h3>
            <button class="dash-card-header-btn" onclick="window.quickToggleSocialPosted('${o.id}')">Toggle Status</button>
          </div>

          <div class="dash-social-details">
            <div class="dash-detail-row">
              <span class="dash-detail-lbl">Posting Status</span>
              <span class="soc-badge ${Mn(C)}">${b(C)}</span>
            </div>
            <div class="dash-detail-row">
              <span class="dash-detail-lbl">Scheduled / Published Date</span>
              <span class="dash-detail-val">${b(E?Q(E):"Pending Confirmation")}</span>
            </div>
            <div class="dash-detail-row">
              <span class="dash-detail-lbl">Celebrity Tags</span>
              <span class="dash-detail-val">@${b(l.toLowerCase().replace(/\\s+/g,""))} · @ascendjewels</span>
            </div>
          </div>

          <div class="dash-card-actions-footer">
            <button class="btn-dash-action" onclick="window.quickToggleSocialPosted('${o.id}')">
              <i class="fa-solid fa-circle-check"></i> Advance Social Stage (${C})
            </button>
          </div>
        </div>

        <!-- 4. PAYMENT & INVOICING -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-wallet"></i> Payment & Invoicing</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickEditProjectModal('${o.id}')">Edit Payment</button>
          </div>

          <div class="dash-payment-breakdown">
            <div class="dash-pay-main-row">
              <div>
                <span class="dash-pay-status-lbl">Payment Status</span>
                <div style="margin-top: 4px;">
                  <span class="soc-badge ${Fn(P)}">${b(P)}</span>
                </div>
              </div>
              <div style="text-align: right;">
                <span class="dash-pay-status-lbl">Invoice Total</span>
                <div class="dash-pay-total-val">${Ae(ie)}</div>
              </div>
            </div>

            <div class="dash-pay-sub-grid">
              <div class="dash-pay-box">
                <span class="dash-pay-box-lbl">Amount Received</span>
                <span class="dash-pay-box-val text-success">${Ae(Ie)}</span>
              </div>
              <div class="dash-pay-box">
                <span class="dash-pay-box-lbl">Outstanding Balance</span>
                <span class="dash-pay-box-val ${Me>0?"text-danger":"text-muted"}">${Ae(Me)}</span>
              </div>
            </div>
          </div>

          <div class="dash-card-actions-footer">
            <button class="btn-dash-action" onclick="window.openQuickEditProjectModal('${o.id}')">
              <i class="fa-solid fa-receipt"></i> Update Invoice / Payment
            </button>
          </div>
        </div>

        <!-- 5. DELIVERABLES -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-list-check"></i> Deliverables</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickUpdateDeliverablesModal('${o.id}')">Update</button>
          </div>

          <div class="dash-progress-wrap">
            <div class="dash-progress-labels">
              <span>Agreed Assets</span>
              <strong>${_} / ${$e} Completed (${Re}%)</strong>
            </div>
            <div class="dash-progress-track">
              <div class="dash-progress-fill" style="width: ${Math.min(100,Math.max(0,Re))}%;"></div>
            </div>
          </div>

          <div class="dash-deliverable-items">
            <div class="dash-deliv-item ${_>=1?"is-done":""}">
              <i class="fa-solid ${_>=1?"fa-circle-check":"fa-circle"}"></i> Lookbook Selection PDF
            </div>
            <div class="dash-deliv-item ${_>=2?"is-done":""}">
              <i class="fa-solid ${_>=2?"fa-circle-check":"fa-circle"}"></i> Celebrity Pull Dispatch
            </div>
            <div class="dash-deliv-item ${_>=3?"is-done":""}">
              <i class="fa-solid ${_>=3?"fa-circle-check":"fa-circle"}"></i> Red Carpet / Event Feature
            </div>
            <div class="dash-deliv-item ${_>=4?"is-done":""}">
              <i class="fa-solid ${_>=4?"fa-circle-check":"fa-circle"}"></i> High-Res Editorial Photography
            </div>
          </div>

          <div class="dash-card-actions-footer">
            <button class="btn-dash-action" onclick="window.openQuickUpdateDeliverablesModal('${o.id}')">
              <i class="fa-solid fa-pen-to-square"></i> Edit Deliverables
            </button>
          </div>
        </div>

        <!-- 6. PROJECT NOTES & ACTIVITY -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-clock-rotate-left"></i> Notes & Activity</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickEditProjectModal('${o.id}')">Edit Notes</button>
          </div>

          ${o.notes?`
            <div class="dash-notes-callout">
              <i class="fa-solid fa-pen-nib"></i>
              <div>
                <strong>Curator Notes:</strong>
                <p>${b(o.notes)}</p>
              </div>
            </div>
          `:'<p class="text-muted" style="font-size:0.88rem; margin-bottom:12px;">No special notes added for this project yet.</p>'}

          <div class="dash-activity-timeline">
            ${Ne.length>0?Ne.map(Te=>`
              <div class="dash-timeline-item">
                <div class="dash-timeline-dot"></div>
                <div class="dash-timeline-content">
                  <div class="dash-timeline-header">
                    <strong>${b(Te.action||"Activity")}</strong>
                    <span class="dash-timeline-time">${b(Q(Te.timestamp))}</span>
                  </div>
                  <p class="dash-timeline-desc">${b(Te.details||"")}</p>
                </div>
              </div>
            `).join(""):`
              <div class="dash-timeline-item">
                <div class="dash-timeline-dot"></div>
                <div class="dash-timeline-content">
                  <div class="dash-timeline-header">
                    <strong>Project Initiated</strong>
                    <span class="dash-timeline-time">${b(Q(o.createdAt))}</span>
                  </div>
                  <p class="dash-timeline-desc">Project created for ${b(l)} by ${b(d)}.</p>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `}function b(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let T=[],m=[];Object.defineProperty(window,"selected",{get:()=>m,set:e=>{m=e},configurable:!0});Object.defineProperty(window,"data",{get:()=>T,set:e=>{T=e},configurable:!0});let Yt=null,A=[],be=[],le="Jewellery Catalogue",ft="none",F=null,z="",J=1,ye=36,Z=1,he=24,lt="",We="",Oe=!1,I=[],R=-1,W=new Map,B=[],Xt="";function N(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Y(e,t){const n=new Date().toISOString();if(t===void 0){console.log(`[FinalTray ${n}] ${e}`);return}console.log(`[FinalTray ${n}] ${e}`,t)}function yt(){const{project:e}=oe();e&&(Wt(e.id,m),fe(),typeof window.renderHomepageProjectsSection=="function"&&window.renderHomepageProjectsSection())}Hn({onProjectSwitch:e=>{m=e&&e.selectedSerials?[...e.selectedSerials]:[],I=e&&e.selectedSerials?[...e.selectedSerials]:[],B=[],ne(),O(),typeof window.renderDashboard=="function"&&window.renderDashboard(),typeof window.renderFinalTraySerialManager=="function"&&window.renderFinalTraySerialManager(),typeof window.renderHomepageProjectsSection=="function"&&window.renderHomepageProjectsSection()}});const{project:_e}=oe();_e&&Array.isArray(_e.selectedSerials)&&(m=[..._e.selectedSerials],I=[..._e.selectedSerials]);typeof window.renderDashboard=="function"&&window.renderDashboard();wa();aa();async function aa(){const e=document.getElementById("statSelected");e&&(e.innerText=m.length);const t=document.getElementById("vraiNavCartCount");t&&(t.innerText=m.length);const n=document.getElementById("hideMarked");n&&(n.checked=!0);try{const i=await(await fetch(`${ke}?t=${new Date().getTime()}`,{cache:"no-store",redirect:"follow"})).json();T=Array.isArray(i)?i:i.data||[]}catch(a){console.warn("Could not fetch remote catalog data, using fallback archive",a)}(!Array.isArray(T)||T.length===0)&&typeof window.getFallbackCatalogData=="function"&&(T=window.getFallbackCatalogData()),rebuildDataIndex(),m=m.filter(a=>{const i=W.get(a);return i&&normalizeStatus(i.Status)!=="marked"}),tn(),O(),M(),updateMiniWebsiteModalPreview()}async function ia(){if(Array.isArray(T)&&T.length)return T;const t=await(await fetch(ke)).json();return Array.isArray(t)?t:t.data||[]}window.getInventoryForExport=ia;function ne(){Ct();const e=document.getElementById("browseTabBadge"),t=document.getElementById("bottomNavBadge");e&&(m.length>0?e.textContent=`${m.length}`:e.textContent=""),t&&(m.length>0?t.textContent=`${m.length}`:t.textContent="")}window.updateTabBadge=ne;function sa(){const e=document.getElementById("controlsContent"),t=document.getElementById("collapseBtn");!e||!t||(Oe=!Oe,e.classList.toggle("collapsed",Oe),t.textContent=Oe?"+":"−",t.title=Oe?"Expand controls":"Collapse controls")}function Zt(e){e&&e.stopPropagation();const t=document.getElementById("filterGalleryOverlay"),n=document.getElementById("filterGalleryBackdrop");!t||!n||(t.classList.remove("hidden"),n.classList.remove("hidden"),t.offsetWidth,t.classList.add("open"),n.classList.add("open"),ht())}function oa(){const e=document.getElementById("filterGalleryOverlay"),t=document.getElementById("filterGalleryBackdrop");!e||!t||(e.classList.remove("open"),t.classList.remove("open"),setTimeout(()=>{e.classList.add("hidden"),t.classList.add("hidden")},300))}window.onFilterGalleryScroll=function(){const e=document.getElementById("filterSwipeContainer"),t=document.getElementById("filterTabBrand"),n=document.getElementById("filterTabType");if(!e||!t||!n)return;e.scrollLeft/e.clientWidth>.5?(t.classList.remove("active"),n.classList.add("active")):(t.classList.add("active"),n.classList.remove("active"))};window.scrollToFilterPage=function(e){const t=document.getElementById("filterSwipeContainer");t&&(e==="type"?t.scrollTo({left:t.clientWidth,behavior:"smooth"}):t.scrollTo({left:0,behavior:"smooth"}))};window.closeFilterMenu=oa;function en(e){e&&e.stopPropagation();const t=document.getElementById("countSummary"),n=document.getElementById("breakdownToggleBtn");if(!t||!n)return;const a=t.classList.contains("hidden");t.classList.toggle("hidden"),n.textContent=a?"Hide brand & type breakdown":"View brand & type breakdown"}window.toggleBreakdown=en;function ra(e,t){const n=t.getBoundingClientRect(),a=e.offsetWidth||420,i=16;let o=n.right-a;o=Math.max(i,Math.min(o,window.innerWidth-a-i));let s=n.bottom+10;const r=e.offsetHeight||300;s+r>window.innerHeight-i&&(s=Math.max(i,n.top-r-10)),e.style.left=`${o}px`,e.style.top=`${s}px`}window.addEventListener("resize",()=>{const e=document.getElementById("controlsContent"),t=document.getElementById("filterToggleBtn");e&&t&&!e.classList.contains("hidden")&&ra(e,t)});window.toggleFilterMenu=Zt;document.addEventListener("click",e=>{const t=document.getElementById("controlsContent"),n=document.querySelector(".filter-menu-wrap");if(!t||!n)return;const a=t.contains(e.target),i=e.target.closest("#filterToggleBtn");!t.classList.contains("hidden")&&!a&&!i&&!n.contains(e.target)&&t.classList.add("hidden")});window.toggleControlsCollapse=sa;function la(){const e=document.getElementById("activeFiltersContainer");if(!e)return;const t=ee("type"),n=ee("brand");if(t.length===0&&n.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let a="";n.forEach(i=>{a+=`
      <div class="filter-chip">
        ${i}
        <div class="filter-chip-remove" onclick="toggleCatalogueFilter('brand', '${i.replace(/'/g,"\\'")}')">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    `}),t.forEach(i=>{a+=`
      <div class="filter-chip">
        ${i}
        <div class="filter-chip-remove" onclick="toggleCatalogueFilter('type', '${i.replace(/'/g,"\\'")}')">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    `}),e.innerHTML=a}function ht(){const e=document.getElementById("filterTypePage"),t=document.getElementById("filterBrandPage"),n=document.getElementById("filterTypeTriggerText"),a=document.getElementById("filterBrandTriggerText"),i=document.getElementById("filterStatus"),o=document.getElementById("hideMarked"),s=document.getElementById("searchSerial"),r=ee("type"),l=ee("brand"),d=i?i.value:"",c=o?o.checked:!1,u=s?s.value.trim().toUpperCase():"";function g(v,S=!1,p=!1){const w=normalizeStatus(v.Status);return!(c&&w==="marked"||d==="marked"&&w!=="marked"||d==="unmarked"&&w==="marked"||u&&!String(v["Serial No"]||"").toUpperCase().includes(u)||!S&&r.length&&!r.includes(String(v.Type||"").trim())||!p&&l.length&&!l.includes(String(v["Brand Name"]||"").trim()))}const h=new Map;T.forEach(v=>{if(g(v,!0,!1)){const S=String(v.Type||"").trim();S&&h.set(S,(h.get(S)||0)+1)}});const f=new Map;T.forEach(v=>{if(g(v,!1,!0)){const S=String(v["Brand Name"]||"").trim();S&&f.set(S,(f.get(S)||0)+1)}});const P=Array.from(new Set(T.map(v=>String(v.Type||"").trim()).filter(Boolean))).sort((v,S)=>v.localeCompare(S)),C=Array.from(new Set(T.map(v=>String(v["Brand Name"]||"").trim()).filter(Boolean))).sort((v,S)=>v.localeCompare(S));if(e){const v=T.filter(p=>g(p,!0,!1)).length;if(n){const p=r.length?r.join(", "):"All types";n.textContent=p}let S=`
      <div class="filter-item-row ${r.length===0?"selected":""}" onclick="toggleCatalogueFilter('type','')">
        <div class="filter-item-info">
          <span class="filter-item-name">All Types</span>
          <span class="filter-item-count">${v} items</span>
        </div>
        <div class="circular-checkbox"></div>
      </div>
    `;S+=P.map(p=>{const w=h.get(p)||0;return`
        <div class="filter-item-row ${r.includes(p)?"selected":""}" onclick="toggleCatalogueFilter('type','${p.replace(/'/g,"\\'")}' )">
          <div class="filter-item-info">
            <span class="filter-item-name">${p}</span>
            <span class="filter-item-count">${w} items</span>
          </div>
          <div class="circular-checkbox"></div>
        </div>
      `}).join(""),e.innerHTML=S}if(t){const v=T.filter(p=>g(p,!1,!0)).length;if(a){const p=l.length?l.join(", "):"All brands";a.textContent=p}let S=`
      <div class="filter-item-row ${l.length===0?"selected":""}" onclick="toggleCatalogueFilter('brand','')">
        <div class="filter-item-info">
          <span class="filter-item-name">All Brands</span>
          <span class="filter-item-count">${v} items</span>
        </div>
        <div class="circular-checkbox"></div>
      </div>
    `;S+=C.map(p=>{const w=f.get(p)||0;return`
        <div class="filter-item-row ${l.includes(p)?"selected":""}" onclick="toggleCatalogueFilter('brand','${p.replace(/'/g,"\\'")}' )">
          <div class="filter-item-info">
            <span class="filter-item-name">${p}</span>
            <span class="filter-item-count">${w} items</span>
          </div>
          <div class="circular-checkbox"></div>
        </div>
      `}).join(""),t.innerHTML=S}la(),ma(h),ya(f,h),pa(),ga()}function ee(e){const t=e==="type"?"catalogueFilterTypes":"catalogueFilterBrands",n=window.localStorage.getItem(t);if(!n)return[];try{const a=JSON.parse(n);return Array.isArray(a)?a.filter(Boolean):[]}catch{return[]}}function Ge(e,t){const n=e==="type"?"catalogueFilterTypes":"catalogueFilterBrands";window.localStorage.setItem(n,JSON.stringify(t))}function ca(e){const t=e==="type"?document.getElementById("filterTypeOptions"):document.getElementById("filterBrandOptions");if(!t)return;const n=e==="type"?document.getElementById("filterBrandOptions"):document.getElementById("filterTypeOptions");t.classList.toggle("hidden"),n&&n.classList.add("hidden")}window.toggleFilterChoice=ca;function da(e,t){const n=ee(e);if(!t)Ge(e,[]);else{const a=n.includes(t)?n.filter(i=>i!==t):[...n,t];Ge(e,a)}xe(e)}window.toggleCatalogueFilter=da;function ua(){Ge("type",[]),Ge("brand",[]);const e=document.getElementById("filterStatus"),t=document.getElementById("hideMarked"),n=document.getElementById("searchSerial");e&&(e.value=""),t&&(t.checked=!0),n&&(n.value=""),xe("clear")}window.clearCatalogueFilters=ua;function pa(){var s,r;const e=ee("type"),t=ee("brand"),n=((s=document.getElementById("filterStatus"))==null?void 0:s.value)||"",a=((r=document.getElementById("searchSerial"))==null?void 0:r.value.trim())||"";let i=0;e.length&&i++,t.length&&i++,n&&i++,a&&i++;const o=document.getElementById("filterActiveBadge");o&&(i>0?(o.textContent=String(i),o.classList.remove("hidden")):(o.textContent="0",o.classList.add("hidden")))}function ga(){const e=document.getElementById("selectAllFilteredBtn")||document.querySelector("button[onclick='selectAllByBrand()']");if(!e)return;const t=ee("type"),n=ee("brand"),i=Fe().filter(o=>normalizeStatus(o.Status)!=="marked").length;n.length&&t.length?e.textContent=`Select ${n.join(", ")} + ${t.join(", ")} (${i})`:n.length?e.textContent=`Select ${n.join(", ")} (${i})`:t.length?e.textContent=`Select ${t.join(", ")} (${i})`:e.textContent=`Select visible (${i})`}function ma(e){const t=document.getElementById("categoryBar");if(!t)return;const n=document.getElementById("filterType"),a=n?n.value:"",o=[...new Set(T.map(l=>String(l.Type||"").trim()).filter(Boolean))].sort((l,d)=>l.localeCompare(d));let s=0;o.forEach(l=>{s+=e&&e.get(l)||0});let r=`<button type="button" class="category-pill ${a?"":"active"}" onclick='selectCategory("")'>All <span class="count">${s}</span></button>`;o.forEach(l=>{const d=e&&e.get(l)||0;r+=`<button type="button" class="category-pill ${a===l?"active":""}" onclick='selectCategory("${l.replace(/'/g,"\\'")}")'>${l} <span class="count">${d}</span></button>`}),t.innerHTML=r}function fa(e){const t=document.getElementById("filterType");t&&(t.value=e),xe("type")}window.selectCategory=fa;function tn(){ht()}function ya(e,t){const n=document.getElementById("countSummary");if(!n)return;const a=[...e.entries()].sort((s,r)=>r[1]-s[1]||s[0].localeCompare(r[0])).slice(0,10),i=[...t.entries()].sort((s,r)=>r[1]-s[1]||s[0].localeCompare(r[0])),o=s=>s.map(([r,l])=>`<span class="breakdown-pill">${r} <strong>${l}</strong></span>`).join("");n.innerHTML=`
    <div class="breakdown-group">
      <p class="breakdown-label">Brands</p>
      <div class="breakdown-pills">${o(a)||'<span class="breakdown-pill">No brands found</span>'}</div>
    </div>
    <div class="breakdown-group">
      <p class="breakdown-label">Types</p>
      <div class="breakdown-pills">${o(i)||'<span class="breakdown-pill">No types found</span>'}</div>
    </div>
  `}function ha(e){const t=T.length,n=T.filter(c=>normalizeStatus(c.Status)==="marked").length,a=Math.max(0,t-n),i=document.getElementById("statTotal"),o=document.getElementById("statAvailable"),s=document.getElementById("statSelected"),r=document.getElementById("statMarked"),l=document.getElementById("gridSummary");i&&(i.textContent=String(t)),o&&(o.textContent=String(a)),s&&(s.textContent=String(m.length)),r&&(r.textContent=String(n)),l&&(l.textContent=`${e} visible item${e===1?"":"s"}`);const d=document.getElementById("gridSummaryHeading");d&&(d.textContent=`${e} visible item${e===1?"":"s"}`)}function xe(e=""){lt=document.getElementById("searchSerial")?document.getElementById("searchSerial").value.trim().toUpperCase():"",We=document.getElementById("sortBy")?document.getElementById("sortBy").value:"",J=1,ht(),O()}window.onFilterChanged=xe;window.selectAllFiltered=function(){const e=Fe();let t=0;e.forEach(n=>{const a=n["Serial No"];m.includes(a)||(m.push(a),t++)}),t>0?(ne(),O(),ae(),alert(`Added ${t} items to your selection.`)):alert("All matching items are already selected.")};window.deselectAllFiltered=function(){const e=Fe(),t=new Set(e.map(i=>i["Serial No"])),n=m.length;m=m.filter(i=>!t.has(i));const a=n-m.length;a>0?(ne(),O(),ae(),alert(`Removed ${a} items from your selection.`)):alert("None of the matching items are currently selected.")};let Lt=null;function nn(){clearTimeout(Lt),Lt=setTimeout(()=>{xe("search")},250)}window.onSearchInput=nn;function O(){let e=Fe();const t=Math.max(1,Math.ceil(e.length/ye));J>t&&(J=t);const n=(J-1)*ye,a=e.slice(n,n+ye);let i="";const o='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';a.forEach(s=>{const r=normalizeStatus(s.Status);let l=m.includes(s["Serial No"]);const d=getPreviewImageUrl(s),c=getPreviewFallbackImageUrl(s),u=c?`onerror="this.onerror=null;this.src='${c.replace(/'/g,"\\'")}';"`:"";i+=`
      <div class="card ${l?"selected":""} ${r==="marked"?"marked-card":""}" onclick='toggle("${s["Serial No"]}")'>
        <div class="card-media">
          <img src="${d}" loading="lazy" ${u}>
          <div class="select-indicator">${o}</div>
        </div>
        <p class="card-label">${s["Serial No"]}</p>
      </div>
    `}),document.getElementById("grid").innerHTML=i,ha(e.length),va(e.length),ae(),updateMiniWebsiteModalPreview()}function va(e){const t=document.getElementById("gridPageInfo"),n=document.querySelector("#gridPager .pager-btn:first-child"),a=document.querySelector("#gridPager .pager-btn:nth-child(3)"),i=document.getElementById("pageSize");i&&(i.value=String(ye));const o=Math.max(1,Math.ceil(e/ye));t&&(t.textContent=`Page ${J} of ${o}`),n&&(n.disabled=J<=1),a&&(a.disabled=J>=o)}function an(e){const t=T.find(n=>n["Serial No"]===e);if(t&&normalizeStatus(t.Status)==="marked"){alert("This item is unavailable and cannot be selected.");return}m.includes(e)?m=m.filter(n=>n!==e):m.push(e),yt(),ne(),O()}function ae(){let e=document.getElementById("selectedArea");const t=T.filter(r=>m.includes(r["Serial No"])),n=document.getElementById("selectedSummary");n&&(t.length===0?n.textContent="0 items":n.textContent=`${t.length} item${t.length===1?"":"s"}`);const a=document.getElementById("vraiNavCartCount");a&&(a.innerText=t.length);const i=Math.max(1,Math.ceil(t.length/he));Z>i&&(Z=i);const o=(Z-1)*he,s=t.slice(o,o+he);if(!t.length){e.innerHTML='<div class="selection-empty">No items selected. Select items from the inventory to continue.</div>',Ot(0);return}e.innerHTML=s.map(r=>{const l=getPreviewImageUrl(r),d=getPreviewFallbackImageUrl(r),c=d?`onerror="this.onerror=null;this.src='${d.replace(/'/g,"\\'")}';"`:"";return`
      <div class="selection-card">
        <button class="remove-btn" onclick="removeFromSelected('${r["Serial No"].replace(/'/g,"\\'")}')" title="Remove from selection">✕</button>
        <div class="card-media">
          <img src="${l}" alt="${r["Serial No"]}" loading="lazy" ${c}>
        </div>
        <p class="card-label">${r["Serial No"]}</p>
      </div>
    `}).join(""),Ot(t.length),typeof window.updateMiniWebsiteModalPreview=="function"&&window.updateMiniWebsiteModalPreview()}window.render=O;window.initFilter=tn;window.renderSelected=ae;function Ot(e){const t=document.getElementById("selectedPageInfo"),n=document.getElementById("selectedPrevBtn"),a=document.getElementById("selectedNextBtn"),i=document.getElementById("selectedPageSize"),o=Math.max(1,Math.ceil(e/he));i&&(i.value=String(he)),t&&(t.textContent=`Page ${Z} of ${o}`),n&&(n.disabled=Z<=1),a&&(a.disabled=Z>=o)}function sn(){J<=1||(J-=1,O())}function on(){const e=Fe().length,t=Math.max(1,Math.ceil(e/ye));J>=t||(J+=1,O())}function rn(e){const t=Number(e);!Number.isFinite(t)||t<=0||(ye=t,J=1,O())}function ln(){Z<=1||(Z-=1,ae())}function cn(){const e=T.filter(n=>m.includes(n["Serial No"])),t=Math.max(1,Math.ceil(e.length/he));Z>=t||(Z+=1,ae())}function dn(e){const t=Number(e);!Number.isFinite(t)||t<=0||(he=t,Z=1,ae())}function Fe(){const e=document.getElementById("filterStatus"),t=document.getElementById("hideMarked"),n=ee("type"),a=ee("brand"),i=e?e.value:"",o=t?t.checked:!1;let s=T.filter(r=>{const l=normalizeStatus(r.Status),d=String(r.Type||"").trim(),c=String(r["Brand Name"]||"").trim(),u=String(r["Serial No"]||"").trim(),g=!n.length||n.includes(d),h=!a.length||a.includes(c),f=B.find(C=>C.serial===u),P=!!(f&&f.condition==="damaged");return!(!g||!h||P||o&&l==="unavailable"||i==="unavailable"&&l!=="unavailable"||i==="available"&&l==="unavailable"||lt&&!String(r["Serial No"]||"").toUpperCase().includes(lt))});return We==="serial"?s.sort((r,l)=>String(r["Serial No"]||"").localeCompare(String(l["Serial No"]||""))):We==="brand"?s.sort((r,l)=>String(r["Brand Name"]||"").localeCompare(String(l["Brand Name"]||""))):We==="type"&&s.sort((r,l)=>String(r.Type||"").localeCompare(String(l.Type||""))),s}window.goToPrevPage=sn;window.goToNextPage=on;window.changePageSize=rn;window.goToPrevSelectedPage=ln;window.goToNextSelectedPage=cn;window.changeSelectedPageSize=dn;async function nt(){if(m.length===0){alert("Please select items to prepare the PDF.");return}m.length>300&&alert("Large export detected. Compact PDF mode will be used to keep generation stable for high item counts."),je(!0);try{const e=T.filter(i=>m.includes(i["Serial No"]));let t;try{t=await Ma(m)}catch(i){console.warn("Server collage failed, using browser fallback",i);const o=wn(m,6);t=[];for(const s of o){const r=T.filter(d=>s.includes(d["Serial No"]));let l=await bn(r);s.length<6&&(l=await Sn(l)),t.push(l)}}if(t.length===0)throw new Error("Unable to prepare the PDF pages");const n=t.flatMap(i=>i._missingItems||[]);A=t,Yt=A[0],be=e,le="Client Catalogue",ft="selection",F=null,await St();const a=A.length>1?`${A.length} pages prepared. `:"";n.length?alert(`${a}PDF ready.

⚠️ ${n.length} item${n.length===1?"":"s"} had no loadable image and show a placeholder:
${n.join(", ")}`):A.length>1&&alert(`${a}Preview updated.`)}catch(e){console.error(e),alert("Error preparing the PDF. Please try different images.")}finally{je(!1)}}async function vt(e=!1){var a,i,o;let t=[...I];if(!t.length){const s=document.getElementById("finalTraySearchInput")||document.getElementById("serialBulkInput");if(s&&s.value){const r=s.value.split(/[\s,;\n]+/).map(l=>l.trim()).filter(Boolean);r.length&&(ve(r),t=[...I])}}if(!t.length&&Array.isArray(m)&&m.length&&(ve(m),t=[...I]),!t.length)try{const s=window.ProjectStore||(typeof x<"u"?x:null);if(s&&s.getActiveContext){const r=s.getActiveContext();r&&r.project&&Array.isArray(r.project.selectedSerials)&&r.project.selectedSerials.length&&(ve(r.project.selectedSerials),t=[...I])}}catch{}if(!Ke(t).length&&(!I||!I.length)){alert("Please select items from the inventory or add serials to the Client Kit first.");return}if(!e){gn(s=>{vt(!0)},e);return}t.length>300&&alert("Large export detected. Compact PDF mode will be used to keep generation stable."),je(!0),de(`Preparing Client Kit PDF for ${t.length} item(s)...`,!1);try{const s=Ke(t);if(!s.length){alert("No matching items found in inventory for the Client Kit serials."),de("No matching items found in inventory.",!0);return}const r=wn(s,6),l=[];for(const c of r){let u=await bn(c);c.length<6&&(u=await Sn(u)),l.push(u)}if(!l.length)throw new Error("Unable to prepare Client Kit PDF pages");A=l,Yt=A[0],be=s,le="Client Kit Catalogue",ft="final-tray",F=null,await St(),de(`Done. Client Kit PDF generated for ${s.length} item(s).`,!1),typeof Ee=="function"&&(Ee(),typeof ue=="function"&&ue());const d=document.getElementById("finalTrayPostActions");d&&(d.classList.remove("hidden-actions"),d.classList.add("visible-actions"));try{const c=window.ProjectStore||(typeof x<"u"?x:null),g=(c&&c.getActiveContext?c.getActiveContext():{}).project;if(c&&c.updateProject&&g){const h=new Date().toISOString().split("T")[0],f=g.finalTraySharedDate||h;let P=g.followUpDate;if(!P){const p=new Date(f);p.setDate(p.getDate()+15);const w=p.getFullYear(),$=String(p.getMonth()+1).padStart(2,"0"),E=String(p.getDate()).padStart(2,"0");P=`${w}-${$}-${E}`}let C=g.returnDueDate;if(!C){const p=new Date(f);p.setDate(p.getDate()+7);const w=p.getFullYear(),$=String(p.getMonth()+1).padStart(2,"0"),E=String(p.getDate()).padStart(2,"0");C=`${w}-${$}-${E}`}const v="Waiting for Return";c.updateProject(g.id,{status:v,projectStatus:v,finalTraySharedDate:f,followUpDate:P,returnDueDate:C,selectedSerials:t,productStats:{sent:s.length,returned:0,pending:s.length,missing:0},deliverables:{completed:0,total:5},socialPosting:{status:"Pending",postingDate:""},payment:{invoiceAmount:((a=g.payment)==null?void 0:a.invoiceAmount)||0,amountReceived:((i=g.payment)==null?void 0:i.amountReceived)||0,status:((o=g.payment)==null?void 0:o.status)||"Pending"}})&&typeof window.renderHomepageProjectsGateway=="function"&&window.renderHomepageProjectsGateway()}}catch(c){console.warn("Could not persist final tray project summary",c)}}catch(s){console.error("Error preparing Client Kit PDF:",s),alert("Error preparing Client Kit PDF. Please try again."),de("Error preparing Client Kit PDF.",!0)}finally{je(!1)}}window.generateFinalTrayFromSerials=vt;function ba(e){const t=String(e||"").replace(/\r/g,`
`).split(/[\n,;]+/).map(a=>a.trim()).filter(Boolean),n=[];return t.forEach(a=>{const i=a.match(/[A-Za-z]+\s*-\s*[A-Za-z0-9]+/g);if(i&&i.length){i.forEach(s=>{const r=te(s);r&&n.push(r)});return}const o=te(a);o&&n.push(o)}),[...new Set(n)]}function wa(){const e=document.getElementById("finalTraySearchInput"),t=document.getElementById("serialBulkInput");e&&(e.addEventListener("input",()=>{R=-1,M()}),e.addEventListener("keydown",n=>{const a=pn(e.value||"");if(n.key==="ArrowDown"){if(n.preventDefault(),!a.length)return;R=Math.min(R+1,a.length-1),M();return}if(n.key==="ArrowUp"){if(n.preventDefault(),!a.length)return;R=Math.max(R-1,0),M();return}if(n.key==="Enter"||n.key===","||n.key===";"){n.preventDefault();const i=R>=0&&a[R]?a[R]:e.value;ve([i])>0&&(e.value=""),R=-1,M()}n.key==="Backspace"&&!e.value&&I.length&&(I=I.slice(0,-1),M())}),e.addEventListener("blur",()=>{setTimeout(()=>{R=-1,M()},120)}),e.addEventListener("focus",()=>{M()}),t&&t.addEventListener("keydown",n=>{(n.ctrlKey||n.metaKey)&&n.key==="Enter"&&(n.preventDefault(),bt())}))}function Sa(){const e=[],t=new Set;return T.forEach(n=>{const a=te(n["Serial No"]||"");!a||t.has(a)||(t.add(a),e.push(a))}),e}function ve(e){const t=Array.isArray(e)?e:[],n=new Set(I);let a=0;return t.forEach(i=>{const o=te(i);!o||n.has(o)||(n.add(o),I.push(o),a+=1)}),a>0&&typeof Ee=="function"&&(Ee(),typeof ue=="function"&&ue()),a}function un(e){const t=Array.isArray(e)?e.filter(Boolean):[];if(!t.length)return 0;t.forEach(i=>{const o=te(i);o&&!m.includes(o)&&m.push(o)});const n=ve(t);yt(),ne(),O(),M(),updateMiniWebsiteModalPreview(),de(`Imported ${t.length} lookbook item${t.length===1?"":"s"} into Client Kit!`,!1);const a=document.getElementById("postCreationShareContainer");return a&&(a.style.display="block"),n}window.importLookbookSelectionToFinalTray=un;function Pa(e){const t=te(e);t&&(I=I.filter(n=>n!==t),Array.isArray(B)&&(B=B.filter(n=>n.serial!==t),typeof ue=="function"&&ue()),M())}function bt(){const e=document.getElementById("serialBulkInput"),t=ba(e?e.value:""),n=ve(t);e&&n>0&&(e.value=""),n===0&&t.length>0?de("All parsed serials are already in the final list.",!1):n>0&&de(`Added ${n} code${n===1?"":"s"} to Client Kit list.`,!1),R=-1,M()}function pn(e){const t=te(e||"");if(!t)return[];const n=I.filter(s=>s.includes(t)),a=new Set(n),o=Sa().filter(s=>s.includes(t)&&!a.has(s)&&I.indexOf(s)===-1).slice(0,10);return[...n,...o].slice(0,12)}function wt(e,t=null){if(!e)return{available:!1,reason:"Invalid item",project:null};const n=String(e).trim();if(!n)return{available:!1,reason:"Invalid item",project:null};if(typeof W<"u"&&W&&W.has(n)){const i=W.get(n);if(String(i.Status||"").toLowerCase()==="missing")return{available:!1,reason:"Marked as Missing",project:null}}const a=window.ProjectStore||(typeof x<"u"?x:null);if(a&&typeof a.getProjects=="function"){const i=a.getProjects();for(const o of i){if(t&&o.id===t)continue;const s=String(o.projectStatus||o.status||"").toLowerCase(),r=s==="completed"||s==="returned";if(!!o.finalTraySharedDate&&!r&&Array.isArray(o.selectedSerials)&&o.selectedSerials.includes(n)){const d=a.getCelebrityById?a.getCelebrityById(o.celebrityId):null,c=a.getStylistById?a.getStylistById(o.stylistId):null,u=d?d.name:o.title||"Another Project",g=c?c.name:"",h=o.returnDueDate||"";return{available:!1,reason:`Out with ${u}${g?" (Stylist: "+g+")":""}`,project:o,projectTitle:o.title,celebrityName:u,stylistName:g,returnDueDate:h}}}}return{available:!0,reason:"Available",project:null}}window.isProductAvailableForFinalTray=wt;function gn(e,t=!1){if(t){e();return}const n=window.ProjectStore||(typeof x<"u"?x:null),i=(n&&n.getActiveContext?n.getActiveContext():{}).project,o=i?i.id:null;let s=[...I];if(!s.length&&Array.isArray(m)&&m.length&&(s=[...m]),!s.length&&i&&Array.isArray(i.selectedSerials)&&(s=[...i.selectedSerials]),!s.length){e();return}const r=[],l=[];if(s.forEach(d=>{const c=wt(d,o);if(c.available)r.push(d);else{const u=typeof W<"u"&&W?W.get(d):null,g=u&&(u.Title||u.Name)||d,h=u?u.Brand||(i==null?void 0:i.jewelleryBrand)||"Ascend Fine Jewellery":(i==null?void 0:i.jewelleryBrand)||"Ascend Fine Jewellery";l.push({serial:d,title:g,brand:h,reason:c.reason,projectTitle:c.projectTitle||"Another Project",celebrityName:c.celebrityName||"Client",stylistName:c.stylistName||"",returnDueDate:c.returnDueDate||""})}}),l.length===0){e();return}Ca({activeProject:i,availableSerials:r,unavailableItems:l,onContinueAvailable:()=>{I=[...r],m=[...r],n&&n.updateProjectItems&&o&&n.updateProjectItems(o,r),M(),e(!0)}})}function Ca({activeProject:e,availableSerials:t,unavailableItems:n,onContinueAvailable:a}){let i=document.getElementById("unavailableProductsModalOverlay");i||(i=document.createElement("div"),i.id="unavailableProductsModalOverlay",i.className="project-modal-overlay",document.body.appendChild(i));const o=n.map(r=>`
    <div style="padding: 12px; border: 1px solid #fecaca; border-radius: 8px; margin-bottom: 10px; background: #fff5f5;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #991b1b;">
          <i class="fa-solid fa-xmark" style="color: #dc2626;"></i> ${N(r.title)} (${N(r.serial)})
        </div>
        <span class="prod-badge badge-missing" style="margin: 0; font-size: 0.75rem;">Unavailable</span>
      </div>
      <div style="font-size: 0.82rem; color: #7f1d1d; margin-top: 4px;">
        Brand: <strong>${N(r.brand)}</strong> &nbsp;|&nbsp; ${N(r.reason)}
      </div>
      ${r.returnDueDate?`<div style="font-size: 0.8rem; color: #991b1b; margin-top: 2px;"><i class="fa-solid fa-clock"></i> Expected Return: <strong>${formatDateDisplay(r.returnDueDate)}</strong></div>`:""}
    </div>
  `).join(""),s=t.length>0;i.innerHTML=`
    <div class="project-modal-card fashion-theme" style="max-width: 560px; box-sizing: border-box;">
      <div class="project-modal-header" style="background: #fff1f2; border-bottom: 1px solid #fecdd3;">
        <h3 style="color: #9f1239;"><i class="fa-solid fa-triangle-exclamation" style="color: #e11d48;"></i> ${s?"Some Selected Products Are Unavailable":"All Selected Products Are Unavailable"}</h3>
        <button class="btn-close-modal" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'">&times;</button>
      </div>

      <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
        <p style="margin: 0 0 14px 0; font-size: 0.88rem; color: #44403c;">
          ${s?`<strong>${n.length}</strong> of your selected products are currently committed to other active projects and cannot be included in a new Client Kit:`:"No selected products are currently available for Client Kit sharing:"}
        </p>

        ${o}

        ${s?`
          <div style="padding: 10px 14px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; margin-top: 14px; color: #166534; font-size: 0.86rem; font-weight: 600;">
            <i class="fa-solid fa-check" style="color: #16a34a;"></i> ${t.length} product(s) are available and ready to be shared.
          </div>
        `:""}
      </div>

      <div class="project-modal-footer" style="padding: 14px 20px; display: flex; flex-direction: column; gap: 10px; background: #fafaf9; border-top: 1px solid #e7e5e4;">
        <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
          <button class="btn-qa btn-qa-secondary" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'">Cancel</button>

          <button class="btn-qa btn-qa-secondary" style="border-color: #d4af37; color: #854d0e; background: #fefce8;" onclick="window.handleGenerateUnavailablePdfClick()">
            <i class="fa-solid fa-file-pdf"></i> Generate Unavailable PDF
          </button>

          ${s?`
            <button class="btn-qa btn-qa-primary" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'; window._onContinueAvailableAction();">
              <i class="fa-solid fa-arrow-right"></i> Continue with ${t.length} Available
            </button>
          `:""}
        </div>
      </div>
    </div>
  `,window._onContinueAvailableAction=a,window._lastUnavailableModalData={activeProject:e,unavailableItems:n},i.style.display="flex"}window.handleGenerateUnavailablePdfClick=async function(){const e=window._lastUnavailableModalData;if(!e||!e.unavailableItems||!e.unavailableItems.length)return;const t=await Ia(e.activeProject,e.unavailableItems);if(!t||!t.blob)return;He(t.blob,t.fileName);const n=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),a=e.activeProject?e.activeProject.title:"Jewellery Curation",i=encodeURIComponent(`📄 *PRODUCT AVAILABILITY UPDATE — ${a.toUpperCase()}*
Document File: ${t.fileName}

Some requested pieces are currently unavailable with other projects. Please see the attached PDF for details.`),o=n?`https://api.whatsapp.com/send?text=${i}`:`https://web.whatsapp.com/send?text=${i}`;if(navigator.canShare){const s=new File([t.blob],t.fileName,{type:"application/pdf"});if(navigator.canShare({files:[s]}))try{await navigator.share({files:[s],title:"Unavailable Products Update",text:`📄 Unavailable Products Update - ${a}`});return}catch{}}at(o)};async function Ia(e,t){const n=window.jspdf&&window.jspdf.jsPDF;if(!n)return alert("PDF generator library is loading. Please try again."),null;const a=new n({orientation:"portrait",unit:"pt",format:"a4"}),i=a.internal.pageSize.getWidth(),o=a.internal.pageSize.getHeight(),s=36;a.setFillColor(24,24,27),a.rect(0,0,i,75,"F"),a.setFillColor(212,175,55),a.rect(0,75,i,4,"F"),a.setFont("helvetica","bold"),a.setFontSize(18),a.setTextColor(255,255,255),a.text("PRODUCT AVAILABILITY UPDATE",s,42),a.setFontSize(9),a.setFont("helvetica","normal"),a.setTextColor(212,175,55),a.text("ASCEND HIGH JEWELRY CURATION",s,58);const r=e?e.title:"Jewellery Curation",l=formatDateDisplay(new Date().toISOString().split("T")[0]);let d=105;a.setFontSize(11),a.setFont("helvetica","bold"),a.setTextColor(24,24,27),a.text(`Project: ${r}`,s,d),a.setFontSize(9.5),a.setFont("helvetica","normal"),a.setTextColor(115,115,115),d+=16,a.text(`Generated Date: ${l}   |   Total Excluded Items: ${t.length}`,s,d),d+=24,a.setFillColor(245,245,244),a.rect(s,d,i-s*2,24,"F"),a.setDrawColor(231,229,228),a.rect(s,d,i-s*2,24,"S"),a.setFont("helvetica","bold"),a.setFontSize(9),a.setTextColor(24,24,27),a.text("Serial Code",s+10,d+15),a.text("Product Details",s+110,d+15),a.text("Availability Status",s+280,d+15),a.text("Expected Return",s+440,d+15),d+=24,t.forEach((g,h)=>{d>o-60&&(a.addPage(),d=40);const f=h%2===0?[255,255,255]:[250,250,249];a.setFillColor(f[0],f[1],f[2]),a.rect(s,d,i-s*2,36,"F"),a.setDrawColor(240,238,237),a.rect(s,d,i-s*2,36,"S"),a.setFont("helvetica","bold"),a.setFontSize(8.5),a.setTextColor(24,24,27),a.text(String(g.serial),s+10,d+21),a.setFont("helvetica","normal"),a.setFontSize(8.5);const P=String(g.title).length>28?String(g.title).substring(0,26)+"...":String(g.title);a.text(P,s+110,d+15),a.setFontSize(7.5),a.setTextColor(120,113,108),a.text(`Brand: ${g.brand}`,s+110,d+27),a.setFontSize(8.5),a.setTextColor(180,83,9),a.text(g.reason,s+280,d+21),a.setTextColor(87,83,78);const C=g.returnDueDate?formatDateDisplay(g.returnDueDate):"Pending";a.text(C,s+440,d+21),d+=36}),d+=20,d<o-40&&(a.setFontSize(8),a.setFont("helvetica","italic"),a.setTextColor(168,162,158),a.text("This document is an inventory availability notice. Available pieces will be shared in a separate Client Kit.",s,d));const c=a.output("blob"),u=`Unavailable_Products_${String(r).replace(/[^a-zA-Z0-9_-]/g,"_")}_${new Date().toISOString().split("T")[0]}.pdf`;return{blob:c,fileName:u}}function M(){const e=document.getElementById("finalTrayList"),t=document.getElementById("finalTrayListMeta"),n=document.getElementById("finalTraySearchInput"),a=document.getElementById("finalTraySuggestions");if(!e||!t||!a||!n)return;if(t.textContent=`${I.length} code${I.length===1?"":"s"} in Client Kit list`,!I||I.length===0)e.innerHTML='<span class="panel-meta">0 items</span>';else{const o=new Map,s=window.ProjectStore||(typeof x<"u"?x:null),r=s&&s.getActiveContext?s.getActiveContext():{},l=r.project?r.project.id:null;Array.isArray(window.data)&&window.data.length>0&&window.data.forEach(d=>{const c=te(d["Serial No"]||"");c&&!o.has(c)&&o.set(c,d)}),e.innerHTML=I.map(d=>{const c=te(d),u=o.get(c),g=wt(d,l),h=!g.available;if(u){const f=typeof window.getPreviewImageUrl=="function"?window.getPreviewImageUrl(u):u.image||u["Image URL"]||"",P=typeof window.getPreviewFallbackImageUrl=="function"?window.getPreviewFallbackImageUrl(u):"",C=P?`onerror="this.onerror=null;this.src='${P.replace(/'/g,"\\'")}';"`:`onerror="this.onerror=null;this.classList.add('img-error');"`,v=u.Title||u.Name||u["Serial No"]||d,S=u.Brand||u.Category||u.Type||"Piece",p=u.Price||u.MRP||"",w=p?`₹${p}`:"",$=w?`<div class="ft-card-footer"><span class="ft-card-price">${N(w)}</span></div>`:"",E=h?`<span class="ft-card-badge ft-badge-unavailable" title="${N(g.reason)}"><i class="fa-solid fa-triangle-exclamation"></i> Unavailable</span>`:'<span class="ft-card-badge ft-badge-available"><i class="fa-solid fa-circle-check"></i> Available</span>';return`
          <div class="final-tray-card ${h?"ft-card-disabled":""}">
            <button type="button" class="final-tray-card-remove" data-serial="${N(d)}" title="Remove ${N(d)}">✕</button>
            <div class="ft-card-media">
              <img src="${f}" alt="${N(v)}" loading="lazy" ${C}>
            </div>
            <div class="ft-card-info">
              <div class="ft-card-header">
                <span class="ft-card-category">${N(S)}</span>
                ${E}
              </div>
              <h4 class="ft-card-title">${N(v)}</h4>
              ${$}
            </div>
          </div>
        `}else{const f=h?`<span class="ft-card-badge ft-badge-unavailable" title="${N(g.reason)}"><i class="fa-solid fa-triangle-exclamation"></i> Unavailable</span>`:'<span class="ft-card-badge ft-badge-unknown"><i class="fa-solid fa-code"></i> Code Item</span>';return`
          <div class="final-tray-card ft-card-custom ${h?"ft-card-disabled":""}">
            <button type="button" class="final-tray-card-remove" data-serial="${N(d)}" title="Remove ${N(d)}">✕</button>
            <div class="ft-card-media ft-custom-media">
              <i class="fa-solid fa-box-archive"></i>
            </div>
            <div class="ft-card-info">
              <div class="ft-card-header">
                <span class="ft-card-category">Custom Code</span>
                ${f}
              </div>
              <h4 class="ft-card-title">${N(d)}</h4>
            </div>
          </div>
        `}}).join(""),e.querySelectorAll(".final-tray-card-remove").forEach(d=>{d.addEventListener("click",()=>{Pa(d.getAttribute("data-serial")||"")})})}const i=pn(n.value||"");if(!i.length||document.activeElement!==n){a.classList.add("hidden"),a.innerHTML="";return}R>=i.length&&(R=i.length-1),a.innerHTML=i.map((o,s)=>`
    <button type="button" class="final-tray-suggestion ${s===R?"active":""}" data-serial="${o}">${o}</button>
  `).join(""),a.querySelectorAll(".final-tray-suggestion").forEach((o,s)=>{o.addEventListener("mouseenter",()=>{R=s,M()}),o.addEventListener("mousedown",r=>{r.preventDefault();const l=o.getAttribute("data-serial")||"";ve([l])>0&&(n.value=""),R=-1,M()})}),a.classList.remove("hidden")}function te(e){return String(e||"").replace(/[\u200B-\u200D\uFEFF]/g,"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"")}function Ke(e){const t=new Map;T.forEach(o=>{const s=te(o["Serial No"]||"");s&&t.set(s,o)});const n=[...t.keys()],a=[],i=new Set;return e.forEach(o=>{const s=te(o);if(!s)return;let r=t.get(s);if(!r){const l=n.filter(d=>d.endsWith(s));l.length===1&&(r=t.get(l[0]))}if(r){const l=String(r["Serial No"]||"");i.has(l)||(i.add(l),a.push(r))}}),a}function $a(){var r,l;const e=((r=document.getElementById("filterBrand"))==null?void 0:r.value)||"",t=((l=document.getElementById("filterType"))==null?void 0:l.value)||"",a=Fe().filter(d=>normalizeStatus(d.Status)!=="unavailable");if(a.length===0){alert("No available items match these filters.");return}let i=0;a.forEach(d=>{const c=d["Serial No"];m.includes(c)||(m.push(c),i++)}),O(),ne();const o=[e,t].filter(Boolean),s=o.length>0?o.join(" "):"matching";alert(i===0?`All ${s} items are already in your selection.`:`Added ${i} ${s} item${i===1?"":"s"} to selection.`)}function Ta(e){m=m.filter(t=>t!==e),ne(),ae()}function mn(){if(m.length===0){alert("No items selected.");return}confirm(`Clear all ${m.length} selected items?`)&&(m=[],ne(),ae())}function fn(){const e=m.filter(t=>{const n=W.get(t);return n&&normalizeStatus(n.Status)==="unavailable"});if(e.length===0){alert("No unavailable items in selection.");return}confirm(`Remove ${e.length} unavailable item(s)?`)&&(m=m.filter(t=>{const n=W.get(t);return!(n&&normalizeStatus(n.Status)==="unavailable")}),ne(),ae())}window.removeFromSelected=Ta;window.clearAllSelected=mn;window.removeMarkedFromSelected=fn;window.addBulkSerialsToFinalTray=bt;function de(e,t){const n=document.getElementById("serialFeedback");n.textContent=e,n.style.color=t?"#b42318":"#155724"}function yn(){const e=document.getElementById("pdfMeta");if(e){if(!A.length){e.textContent="No PDF generated yet";return}e.textContent=`${le} · ${A.length} page${A.length===1?"":"s"} · ${be.length} code${be.length===1?"":"s"}`}}function hn(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent)}function Aa(){if(!F){alert("Please generate a PDF first.");return}window.open(z,"_blank","noopener,noreferrer")||(window.location.href=z)}window.openPdfPreview=Aa;let ct=[];function vn(){ct.forEach(e=>URL.revokeObjectURL(e)),ct=[]}function Ut(e,t){const n=document.getElementById(e);if(n){if(!t||!t.length){n.innerHTML="",n.classList.add("hidden");return}n.innerHTML=t.map((a,i)=>{const o=URL.createObjectURL(a);return ct.push(o),`
      <div class="pdf-page-preview-wrapper">
        <div class="pdf-page-badge"><i class="fa-solid fa-file-lines"></i> Page ${i+1} of ${t.length}</div>
        <img src="${o}" alt="PDF Page ${i+1}" class="pdf-page-image" onclick="window.openPdfPreview()" title="Click to view full PDF" />
      </div>
    `}).join(""),n.classList.remove("hidden")}}function ja(){const e=document.getElementById("pdfPreviewFrame"),t=document.getElementById("previewPlaceholder"),n=document.getElementById("pdfVisualPagesPreview"),a=document.getElementById("finalTrayVisualPagesPreview"),i=document.getElementById("finalTrayPreviewPanel"),o=document.getElementById("mobilePdfPreviewAction"),s=document.getElementById("postCreationShareContainer");z&&(URL.revokeObjectURL(z),z=""),vn(),F=null,e&&(e.removeAttribute("src"),e.classList.remove("visible")),n&&(n.innerHTML="",n.classList.add("hidden")),a&&(a.innerHTML="",a.classList.add("hidden")),i&&i.classList.add("hidden"),t&&(t.classList.remove("hidden"),t.innerHTML="<strong>Generate a PDF to preview it here.</strong><span>The preview will update after a selection or final tray PDF is created.</span>"),o&&o.classList.add("hidden"),s&&(s.style.display="none"),yn()}function Ea(e){const t=document.getElementById("pdfPreviewFrame"),n=document.getElementById("previewPlaceholder"),a=document.getElementById("mobilePdfPreviewAction"),i=document.getElementById("postCreationShareContainer"),o=hn();z&&URL.revokeObjectURL(z),F=e,z=URL.createObjectURL(e),vn(),Ut("pdfVisualPagesPreview",A),Ut("finalTrayVisualPagesPreview",A);const s=document.getElementById("finalTrayPreviewPanel");if(s&&A&&A.length>0){s.classList.remove("hidden");const r=document.getElementById("finalTrayPdfMeta");r&&(r.textContent=`${le||"Kit"} · ${A.length} page${A.length===1?"":"s"} · ${be?be.length:0} items`)}t&&(o?(t.removeAttribute("src"),t.classList.remove("visible")):(t.src=z,t.classList.add("visible"))),n&&n.classList.add("hidden"),a&&a.classList.remove("hidden"),i&&(i.style.display="block"),yn()}function ka(e,t,n,a){const i=document.getElementById("pdfPreviewFrame"),o=document.getElementById("previewPlaceholder"),s=document.getElementById("mobilePdfPreviewAction"),r=document.getElementById("postCreationShareContainer"),l=document.getElementById("pdfMeta"),d=hn();z&&URL.revokeObjectURL(z),F=e,z=URL.createObjectURL(e),i&&(d?(i.removeAttribute("src"),i.classList.remove("visible")):(i.src=z,i.classList.add("visible"))),o&&o.classList.add("hidden"),s&&s.classList.remove("hidden"),r&&(r.style.display="block"),l&&(l.textContent=`Client Lookbook · ${n.name||"Valued Client"} · ${a} piece${a===1?"":"s"}`)}window.setHtmlLookbookPreview=ka;async function St(){if(!A.length)return ja(),null;if(!window.JewelleryPdf||typeof window.JewelleryPdf.buildPdfBlob!="function")throw new Error("PDF builder not loaded");const e=await window.JewelleryPdf.buildPdfBlob({pageBlobs:A,items:be,title:le});return Ea(e),e}async function Qe(){return F||St()}function Pt(){return`${String(le||"Jewellery PDF").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"jewellery-pdf"}.pdf`}async function Ve(){if(!A.length){alert("Generate a PDF first.");return}try{const e=await Qe();He(e,Pt())}catch(e){console.error(e),alert("Unable to build PDF. Please try again.")}}function Da(){if(!F&&!A.length){alert("Generate a PDF first.");return}const e=F||null;if(e){He(e,Pt());return}Ve()}async function Ba(e=[]){const t=(e&&e.length?e:[...I]).map(n=>String(n||"").trim()).filter(Boolean);if(!t.length)return{ok:!1,updatedCount:0,missingSerials:[],skipped:!0};try{const n=await Na(t),a=Number(n&&n.updatedCount?n.updatedCount:0),i=Array.isArray(n&&n.missingSerials)?n.missingSerials:[],o=Ke(t);o.forEach(s=>{const r=String(s["Serial No"]||"").trim();if(!r)return;s.Status="Marked & Delivered";const l=W.get(r);l&&(l.Status="Marked & Delivered")}),m=m.filter(s=>{const r=W.get(s);return r&&normalizeStatus(r.Status)!=="unavailable"});try{const s=x,l=(s&&s.getActiveContext?s.getActiveContext():{}).project;if(s&&s.updateProject&&l){const d=new Date().toISOString().split("T")[0],c=l.finalTraySharedDate||d;let u=l.followUpDate;if(!u){const h=new Date(c);h.setDate(h.getDate()+15);const f=h.getFullYear(),P=String(h.getMonth()+1).padStart(2,"0"),C=String(h.getDate()).padStart(2,"0");u=`${f}-${P}-${C}`}s.updateProject(l.id,{status:"Delivered",projectStatus:"Delivered",finalTraySharedDate:c,followUpDate:u,returnDueDate:l.returnDueDate||d,productStats:{sent:o.length,returned:o.length,pending:0,missing:i.length},deliverables:{completed:5,total:5}})&&typeof window.renderHomepageProjectsGateway=="function"&&window.renderHomepageProjectsGateway()}}catch(s){console.warn("Could not update project state after Client Kit share",s)}return O(),M(),ne(),updateMiniWebsiteModalPreview(),Ee(),{ok:!0,updatedCount:a,missingSerials:i}}catch(n){return console.warn("Could not mark final tray items as delivered",n),{ok:!1,updatedCount:0,missingSerials:[],error:n&&n.message?n.message:String(n)}}}async function xa(){try{if(!F&&(!A||A.length===0))if(Array.isArray(m)&&m.length>0)await nt();else if(Array.isArray(I)&&I.length>0)typeof window.generateFinalTrayFromSerials=="function"&&await window.generateFinalTrayFromSerials();else{alert("Please select items from the inventory grid first to export a PDF.");return}await it()}catch(e){console.error("Error in exportAndSharePdfToWhatsApp:",e),alert("Unable to export PDF: "+(e.message||e))}}function at(e){try{window.open(e,"_blank","width=700,height=800,noopener,noreferrer")||(window.location.href=e)}catch{window.location.href=e}}async function it(e=!1){if(!e){gn(c=>{it(!0)},e);return}const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),n="[shareCurrentPdf]";let a=null;console.log(n,"start",{isMobile:t,hasCanShare:!!navigator.canShare,selectedCount:Array.isArray(m)?m.length:0,hasLastPdfBlob:!!F,collageCount:Array.isArray(A)?A.length:0}),navigator.canShare||(console.log(n,"opening fallback popup before share"),a=window.open("about:blank","_blank","width=700,height=800,noopener,noreferrer"));let i=F;if(!i&&A&&A.length)try{console.log(n,"rebuilding PDF blob from existing collage pages"),je(!0),i=await Qe(),console.log(n,"rebuild success",{hasPdfBlob:!!i})}catch(c){console.error(n,"rebuild failed",c)}finally{je(!1)}if(!i&&Array.isArray(m)&&m.length>0)try{console.log(n,"generating selection PDF for sharing"),await nt(),i=F,console.log(n,"selection PDF generation complete",{hasPdfBlob:!!i})}catch(c){console.error(n,"selection PDF generation failed",c)}if(!i){a&&a.close(),Array.isArray(m)&&m.length>0?alert("The PDF is still being prepared. Please wait a moment and try again."):alert("Please select items first, then tap Share PDF via WhatsApp again.");return}if(ft==="final-tray"||Array.isArray(I)&&I.length>0){console.log(n,"marking final tray items as delivered before WhatsApp share");const c=await Ba();c&&c.ok&&de(`Marked ${c.updatedCount||I.length} item(s) as delivered.`,!1)}const s=Pt(),r=new File([i],s,{type:"application/pdf"});if(console.log(n,"prepared file",{fileName:s,size:r.size,type:r.type}),navigator.canShare&&navigator.canShare({files:[r]})){console.log(n,"attempting native Web Share API"),a&&a.close();try{await navigator.share({files:[r],title:le||"Jewellery PDF Catalogue",text:`📄 ${le||"Jewellery PDF Catalogue"}`}),console.log(n,"native share success");return}catch(c){if(console.log(n,"native share aborted or failed",c),c&&c.name==="AbortError")return}}console.log(n,"falling back to download + WhatsApp composer"),He(i,s);const l=encodeURIComponent(`📄 *${(le||"ASCEND HIGH JEWELRY CURATION PDF").toUpperCase()}*
Document File: ${s}

The PDF preview catalogue has been downloaded to your device. Please attach it using the 📎 paperclip icon to send.`),d=t?`https://api.whatsapp.com/send?text=${l}`:`https://web.whatsapp.com/send?text=${l}`;console.log(n,"opening WhatsApp URL",{waUrl:d,isMobile:t}),a&&!a.closed?(a.location.href=d,a.focus()):at(d)}async function Fa(){return!F&&!A.length&&(typeof window.generateFinalTrayFromSerials=="function"&&I&&I.length>0?await window.generateFinalTrayFromSerials():m&&m.length>0&&await nt()),it()}function He(e,t){const n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=t,a.style.display="none",document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>{URL.revokeObjectURL(n)},2e3)}function je(e){document.getElementById("spinner").classList.toggle("hidden",!e)}async function Ma(e){const t=await fetch(ke,{method:"POST",body:JSON.stringify({action:"buildAllCollages",selected:e})});if(!t.ok)throw new Error(`Server returned ${t.status}`);const n=await t.json();if(!n.ok||!Array.isArray(n.pages)||n.pages.length===0)throw new Error(n.error||"Invalid server collage response");const a=[];for(const i of n.pages){if(!i.base64)continue;if(i.debug&&i.debug.insertedImages===0)throw new Error("Server could not insert any images on a page");const o=Oa(i.base64,i.mimeType||"image/png");if(await La(o))throw new Error("Server returned a blank/white collage page");a.push(o)}if(a.length===0)throw new Error("Server returned no valid collage pages");return a}async function Ra(e){const t=`srv-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Y("server:request",{requestId:t,action:"buildAndMarkFinalTray",serialCount:e.length,serialPreview:e.slice(0,8)});const n=await fetch(ke,{method:"POST",body:JSON.stringify({action:"buildAndMarkFinalTray",serials:e})});if(Y("server:http",{requestId:t,ok:n.ok,status:n.status,statusText:n.statusText}),!n.ok)throw new Error(`Server returned ${n.status}`);const a=await n.text();Y("server:raw",{requestId:t,length:a.length,preview:a.slice(0,260)});let i;try{i=JSON.parse(a)}catch(o){throw Y("server:parse-error",{requestId:t,message:o&&o.message?o.message:String(o)}),new Error("Server returned invalid JSON")}return Y("server:payload",{requestId:t,ok:!!i.ok,pageCount:Array.isArray(i.pages)?i.pages.length:0,updatedCount:Number(i.updatedCount||0),missingCount:Array.isArray(i.missingSerials)?i.missingSerials.length:0,error:i.error||""}),i}async function Na(e){const t=`mark-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;Y("server:mark-only:request",{requestId:t,action:"markFinalTrayOnly",serialCount:e.length,serialPreview:e.slice(0,8)});const n=await fetch(ke,{method:"POST",body:JSON.stringify({action:"markFinalTrayOnly",serials:e})});if(Y("server:mark-only:http",{requestId:t,ok:n.ok,status:n.status,statusText:n.statusText}),!n.ok)throw new Error(`Server returned ${n.status}`);const a=await n.text();Y("server:mark-only:raw",{requestId:t,length:a.length,preview:a.slice(0,260)});let i;try{i=JSON.parse(a)}catch(r){throw Y("server:mark-only:parse-error",{requestId:t,message:r&&r.message?r.message:String(r)}),new Error("Server returned invalid JSON")}Y("server:mark-only:payload",{requestId:t,ok:!!i.ok,updatedCount:Number(i.updatedCount||0),missingCount:Array.isArray(i.missingSerials)?i.missingSerials.length:0,error:i.error||""});const o=String(i&&i.error?i.error:"");if(!i.ok&&/(unsupported|unknown|invalid|action)/i.test(o)){Y("server:mark-only:fallback-legacy",{requestId:t,error:o});const r=await Ra(e);return{ok:!!r.ok,updatedCount:Number(r.updatedCount||0),missingSerials:Array.isArray(r.missingSerials)?r.missingSerials:[],error:r.error||""}}return i}async function La(e){return new Promise(t=>{const n=URL.createObjectURL(e),a=new Image;a.onload=()=>{try{const i=Math.max(1,Math.min(400,a.width)),o=Math.max(1,Math.min(400,a.height)),s=document.createElement("canvas");s.width=i,s.height=o;const r=s.getContext("2d",{willReadFrequently:!0});r.drawImage(a,0,0,i,o);const l=r.getImageData(0,0,i,o).data;let d=0,c=0;const u=10;for(let g=0;g<l.length;g+=4*u){const h=l[g],f=l[g+1],P=l[g+2];c++,h>245&&f>245&&P>245&&d++}URL.revokeObjectURL(n),t(d/c>.99)}catch{URL.revokeObjectURL(n),t(!1)}},a.onerror=()=>{URL.revokeObjectURL(n),t(!1)},a.src=n})}function Oa(e,t){const n=atob(e),a=n.length,i=new Uint8Array(a);for(let o=0;o<a;o++)i[o]=n.charCodeAt(o);return new Blob([i],{type:t})}function Ua(e){return new Promise((t,n)=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>t(a),a.onerror=()=>n(new Error(`Failed to load image: ${e}`)),a.src=e})}async function Ha(e){const t=buildImageSourceCandidates(e,!0),n=[];for(const a of t)try{return await Ua(a)}catch{n.push(a)}throw console.warn(`[${e["Serial No"]}] All image sources failed (${n.length} tried):`,n),new Error(`Image not found for ${e["Serial No"]}`)}function Ht(e,t,n,a,i,o){e.beginPath(),e.moveTo(t+o,n),e.lineTo(t+a-o,n),e.quadraticCurveTo(t+a,n,t+a,n+o),e.lineTo(t+a,n+i-o),e.quadraticCurveTo(t+a,n+i,t+a-o,n+i),e.lineTo(t+o,n+i),e.quadraticCurveTo(t,n+i,t,n+i-o),e.lineTo(t,n+o),e.quadraticCurveTo(t,n,t+o,n),e.closePath()}async function bn(e){const c=document.createElement("canvas");c.width=1240,c.height=1371;const u=c.getContext("2d");u.fillStyle="#ffffff",u.fillRect(0,0,1240,1371);const g=[],h=await Promise.all(e.map(async f=>{try{return{id:f["Serial No"],image:await Ha(f)}}catch{return g.push(f["Serial No"]),{id:f["Serial No"],image:null}}}));for(let f=0;f<6;f++){const P=f%2,C=Math.floor(f/2),v=P*620,S=C*457,p=h[f];if(u.save(),u.beginPath(),u.rect(v,S,620,421),u.clip(),p&&p.image){const w=p.image,$=14,E=620-$*2,j=421-$*2,H=Math.max(E/w.width,j/w.height),D=w.width*H,q=w.height*H,K=v+$+(E-D)/2,ie=S+$+(j-q)/2;u.drawImage(w,K,ie,D,q)}else u.fillStyle="#f0ebe4",u.fillRect(v,S,620,421),p&&(u.fillStyle="#999999",u.font="bold 18px Arial",u.textAlign="center",u.textBaseline="middle",u.fillText("Image unavailable",v+620/2,S+421/2));u.restore(),u.save(),Ht(u,v,S,620,457,10),u.clip(),u.fillStyle="#1f2431",u.fillRect(v,S+421,620,36),u.restore(),p&&(u.fillStyle="#ffffff",u.font="bold 22px 'Arial'",u.textAlign="center",u.textBaseline="middle",u.fillText(String(p.id||""),v+620/2,S+421+36/2)),u.save(),u.strokeStyle="#d8c8b8",u.lineWidth=1.5,Ht(u,v+.75,S+.75,620-1.5,457-1.5,10),u.stroke(),u.restore()}return new Promise((f,P)=>{c.toBlob(C=>{if(!C){P(new Error("Unable to build collage blob"));return}C._missingItems=g,f(C)},"image/png",.96)})}function wn(e,t){const n=[];for(let a=0;a<e.length;a+=t)n.push(e.slice(a,a+t));return n}async function Sn(e){return new Promise(t=>{const n=URL.createObjectURL(e),a=new Image;a.onload=()=>{try{const i=document.createElement("canvas");i.width=a.width,i.height=a.height;const o=i.getContext("2d",{willReadFrequently:!0});o.drawImage(a,0,0);const s=o.getImageData(0,0,i.width,i.height).data,r=p=>{const w=s[p],$=s[p+1],E=s[p+2];return s[p+3]<10||w>245&&$>245&&E>245},l=p=>{for(let w=0;w<i.width;w++){const $=(p*i.width+w)*4;if(!r($))return!0}return!1},d=p=>{for(let w=0;w<i.height;w++){const $=(w*i.width+p)*4;if(!r($))return!0}return!1};let c=0;for(;c<i.height&&!l(c);)c++;let u=i.height-1;for(;u>=0&&!l(u);)u--;let g=0;for(;g<i.width&&!d(g);)g++;let h=i.width-1;for(;h>=0&&!d(h);)h--;if(URL.revokeObjectURL(n),g>=h||c>=u){t(e);return}const f=8;g=Math.max(0,g-f),c=Math.max(0,c-f),h=Math.min(i.width-1,h+f),u=Math.min(i.height-1,u+f);const P=h-g+1,C=u-c+1,v=document.createElement("canvas");v.width=P,v.height=C,v.getContext("2d").drawImage(i,g,c,P,C,0,0,P,C),v.toBlob(p=>{t(p||e)},"image/png",.95)}catch{URL.revokeObjectURL(n),t(e)}},a.onerror=()=>{URL.revokeObjectURL(n),t(e)},a.src=n})}function Ct(){let e=document.getElementById("floatingSelectionBar");e||(e=document.createElement("div"),e.id="floatingSelectionBar",e.className="floating-selection-bar",document.body.appendChild(e));const t=document.getElementById("browseTab"),n=t&&t.classList.contains("active");if(m.length===0||!n){e.style.display="none";return}e.style.display="flex",e.innerHTML=`
    <div class="fsb-info">
      <i class="fa-solid fa-gem"></i> <strong>${m.length}</strong> Piece${m.length===1?"":"s"} Selected
    </div>
    <button class="fsb-btn-proceed" onclick="switchTab('selected')">
      Proceed to Export &amp; Share <i class="fa-solid fa-arrow-right"></i>
    </button>
  `}async function qa(){if(m.length===0){alert("Please select at least 1 item to share.");return}const{celebrity:e,project:t,stylist:n}=oe(),a=T.filter(c=>m.includes(c["Serial No"])),i=e?e.name:"Celebrity",o=n?n.name:"Stylist",s=t?t.title:"Curation Pull",r=`${i.replace(/[^a-zA-Z0-9]/g,"_")}_Curation.pdf`;if(F&&navigator.canShare)try{const c=new File([F],r,{type:"application/pdf"});if(navigator.canShare({files:[c]})){await navigator.share({files:[c],title:`${i} Lookbook - ${s}`,text:`✨ ASCEND ATELIER CURATION
📁 Project: ${s}
👑 Celebrity: ${i}
👤 Stylist: ${o}`}),console.log("[WebShare] Direct PDF file shared successfully!");return}}catch(c){if(c.name!=="AbortError")console.warn("[WebShare] Native share failed, falling back to Web WhatsApp",c);else return}typeof Ve=="function"&&F&&Ve();let l=`✨ *ASCEND ATELIER CURATION PDF*
`;l+=`---------------------------
`,l+=`📁 *Project:* ${s}
`,l+=`👑 *Celebrity:* ${i}
`,l+=`👤 *Stylist:* ${o}
`,l+=`💎 *Total Selected Pieces:* ${a.length}

`,l+=`📄 *PDF Document:* Attached below (${r})

`,l+=`*Curated Piece Serials:*
`,a.slice(0,10).forEach((c,u)=>{l+=`${u+1}. ${c["Serial No"]} (${c.Type||"Jewellery"})
`}),a.length>10&&(l+=`...and ${a.length-10} more pieces.
`),l+=`
Ascend High Jewelry Studio`;const d=`https://web.whatsapp.com/send?text=${encodeURIComponent(l)}`;at(d),alert(`✅ PDF downloaded as "${r}".

WhatsApp Web has been opened. Please click the 📎 (Paperclip / Attachment) icon in WhatsApp to attach the downloaded PDF file.`)}function _a(e){return e?e.returnStatus==="received"?"Received":e.returnStatus==="missing"?"Missing":"Pending Return":"Pending Return"}function za(e){return e&&e.condition==="damaged"?"Damaged":"Good"}function Pn(){const e=B.length,t=B.filter(o=>o.returnStatus==="received").length,n=B.filter(o=>o.returnStatus==="pending").length,a=B.filter(o=>o.returnStatus==="missing").length,i=B.filter(o=>o.condition==="damaged").length;return{total:e,received:t,pending:n,missing:a,damaged:i}}function Cn(){const e=document.getElementById("returnSummaryCards");if(!e)return;const t=Pn();e.innerHTML=[{label:"Total Sent",value:t.total},{label:"Received",value:t.received},{label:"Pending",value:t.pending},{label:"Missing",value:t.missing},{label:"Damaged",value:t.damaged}].map(n=>`
    <div class="return-summary-card">
      <strong>${n.value}</strong>
      <span>${n.label}</span>
    </div>
  `).join("")}function In(){const e=document.getElementById("returnProductsList");if(!e)return;const t=B.filter(n=>{const a=(Xt||"").trim().toUpperCase();return a?[n.serial,n.name,n.code,n.category].some(i=>String(i||"").toUpperCase().includes(a)):!0});if(!B||B.length===0){e.innerHTML='<div class="selection-empty">No return products loaded yet. Load from the Client Kit to begin.</div>',document.getElementById("returnSummaryCards").innerHTML="";return}e.innerHTML=t.map(n=>{const a=_a(n),i=za(n),o=n.returnStatus==="received"?"received":n.returnStatus==="missing"?"missing":"pending",s=n.condition==="damaged"?"damaged":"good",r=n.image||"";return`
      <div class="return-product-card ${n.returnStatus==="received"?"is-received":""} ${n.condition==="damaged"?"is-damaged":""}">
        <img src="${r}" alt="${n.name||n.serial}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=400&q=80';">
        <div class="return-product-meta">
          <div class="return-product-title">${n.name||n.serial}</div>
          <div class="return-product-subtext">Code: ${n.code||n.serial}</div>
          <div class="return-product-subtext">Category: ${n.category||"—"}</div>
          <div class="return-product-subtext">Quantity Sent: ${n.quantity||1}</div>
          <div class="return-product-badges">
            <span class="return-status-pill ${o}">${a}</span>
            <span class="return-condition-pill ${s}">${i}</span>
          </div>
        </div>
        <div class="return-product-actions">
          <select data-serial="${n.serial}" onchange="window.updateReturnProductStatus('${n.serial}', this.value)">
            <option value="pending" ${n.returnStatus==="pending"?"selected":""}>Pending Return</option>
            <option value="received" ${n.returnStatus==="received"?"selected":""}>Received</option>
            <option value="missing" ${n.returnStatus==="missing"?"selected":""}>Missing</option>
          </select>
          <select data-serial="${n.serial}" onchange="window.updateReturnProductCondition('${n.serial}', this.value)">
            <option value="good" ${n.condition==="good"?"selected":""}>Good</option>
            <option value="damaged" ${n.condition==="damaged"?"selected":""}>Damaged</option>
          </select>
          <button type="button" class="secondary" onclick="window.markReturnProductReceived('${n.serial}')">Mark Received</button>
          <button type="button" class="secondary btn-missing-action" onclick="window.markReturnProductMissing('${n.serial}')">Mark Missing</button>
        </div>
      </div>
    `}).join(""),Cn()}function It(){Cn(),In()}function $t(){Array.isArray(T)&&(T.forEach(e=>{const t=String(e["Serial No"]||"").trim(),n=B.find(i=>i.serial===t);if(!n)return;n.returnStatus==="received"&&n.condition==="good"?e.Status="Unmarked":(e.Status="Marked & Delivered",n.condition==="damaged"&&!String(e.Notes||"").includes("Damaged on return")&&(e.Notes=(e.Notes||"")+(e.Notes?" | ":"")+"Damaged on return"))}),typeof O=="function"&&O())}function Ee(){const e=window.ProjectStore||(typeof x<"u"?x:null);let t=null;e&&e.getActiveContext&&(t=e.getActiveContext().project);const n=I.length?I:Array.isArray(m)&&m.length?m:t&&Array.isArray(t.selectedSerials)?t.selectedSerials:[],a=[...new Set(n.filter(Boolean))],i=Ke(a),o=new Map;Array.isArray(B)&&B.forEach(s=>{s&&s.serial&&o.set(s.serial,s)}),t&&Array.isArray(t.returnProductsState)&&t.returnProductsState.forEach(s=>{s&&s.serial&&!o.has(s.serial)&&o.set(s.serial,s)}),B=i.map(s=>{const r=String(s["Serial No"]||"").trim();return o.has(r)?o.get(r):{serial:r,name:String(s.Description||s.Name||s.Type||r),code:r,category:String(s.Type||"Jewellery"),quantity:1,image:typeof getPreviewImageUrl=="function"?getPreviewImageUrl(s):s.image||"",returnStatus:"pending",condition:"good"}}),It(),$t()}function $n(e=!1){Ee()}function Wa(e){Xt=e||"",In()}function ue(){const e=window.ProjectStore||(typeof x<"u"?x:null);if(e&&e.updateProject&&e.getActiveContext){const t=e.getActiveContext().project;if(t){const n=Pn(),a={sent:n.total,returned:n.received,pending:n.pending,missing:n.missing};let i=t.projectStatus||t.status||"Active";i!=="Completed"&&(n.pending>0?i="Waiting for Return":n.total>0&&(i="Waiting for Deliverables")),e.updateProject(t.id,{returnProductsState:[...B],productStats:a,status:i,projectStatus:i}),typeof window.renderProjectBar=="function"&&window.renderProjectBar()}}}function Tt(e,t){const n=B.find(a=>a.serial===e);n&&(n.returnStatus=t,It(),$t(),ue())}function Ja(e,t){const n=B.find(a=>a.serial===e);n&&(n.condition=t,It(),$t(),ue())}function Ga(e){Tt(e,"received")}function Ka(e){Tt(e,"missing")}function dt(e){typeof window.unlockStudioWorkspace=="function"&&window.unlockStudioWorkspace();const t={dashboard:{btn:"tabOverviewBtn",section:"dashboardTab"},browse:{btn:"tabBrowseBtn",section:"browseTab"},selected:{btn:"tabSelectedBtn",section:"selectedTab"},finalTray:{btn:"tabFinalTrayBtn",section:"finalTrayTab"},returnProducts:{btn:"tabReturnProductsBtn",section:"returnProductsTab"}},n=document.getElementById("tabDashboardBtn");n&&n.classList.remove("active"),Object.keys(t).forEach(i=>{const o=document.getElementById(t[i].btn),s=document.getElementById(t[i].section),r={dashboard:"bottomNavHome",browse:"bottomNavBrowse",selected:"bottomNavSelected",finalTray:"bottomNavFinalTray",returnProducts:"bottomNavReturns"},l=r[i]?document.getElementById(r[i]):null;i===e?(o&&o.classList.add("active"),s&&s.classList.add("active"),l&&l.classList.add("active")):(o&&o.classList.remove("active"),s&&s.classList.remove("active"),l&&l.classList.remove("active"))});const a=document.querySelector(".page-shell");a&&(a.classList.remove("browse-active","dashboard-active"),e==="browse"?a.classList.add("browse-active"):e==="dashboard"&&a.classList.add("dashboard-active")),e==="dashboard"&&renderDashboard(),e==="selected"&&ae(),e==="finalTray"&&typeof M=="function"&&M(),e==="returnProducts"&&$n(),window.scrollTo({top:0,behavior:"smooth"}),Ct()}async function Qa(){const e=window.ProjectStore||(typeof x<"u"?x:null);let t={};e&&e.getActiveContext&&(t=e.getActiveContext());const n=t.celebrity?t.celebrity.name:"Celebrity",a=t.stylist?t.stylist.name:"Stylist",i=t.project?t.project.title:"Lookbook Selection",o=t.project?t.project.id:"proj_"+Date.now();let s=Array.isArray(window.selected)?window.selected:[];if(!s.length&&t.project&&Array.isArray(t.project.selectedSerials)&&(s=t.project.selectedSerials),!s.length){alert("Select pieces from the catalogue first to create and share the Lookbook.");return}const l=`${window.location.origin+window.location.pathname}?mode=lookbook&project=${encodeURIComponent(o)}&name=${encodeURIComponent(n)}&items=${encodeURIComponent(s.join(","))}`,d=`${n.replace(/[^a-zA-Z0-9]/g,"_")}_Lookbook.pdf`;let c=F;if(!c&&typeof Qe=="function"&&A.length)try{c=await Qe()}catch(h){console.warn("Could not generate PDF blob for sharing:",h)}if(c&&navigator.canShare)try{const h=new File([c],d,{type:"application/pdf"});if(navigator.canShare({files:[h]})){await navigator.share({files:[h],title:`${n} Lookbook - ${i}`,text:`✨ ASCEND ATELIER CURATION LOOKBOOK
📁 Project: ${i}
👑 Celebrity: ${n}
👤 Stylist: ${a}
🔗 Web Version: ${l}`});return}}catch(h){if(h.name==="AbortError")return;console.warn("[WebShare] Native file share failed, falling back",h)}c&&He(c,d);let u=`✨ *ASCEND ATELIER DIGITAL CLIENT LOOKBOOK*
`;u+=`---------------------------
`,u+=`📁 *Project:* ${i}
`,u+=`👑 *Celebrity / Client:* ${n}
`,u+=`👤 *Stylist:* ${a}
`,u+=`💎 *Curated Pieces:* ${s.length}

`,u+=`🔗 *Open Interactive Web Lookbook:*
${l}

`,u+="Ascend High Jewelry Studio";const g=`https://web.whatsapp.com/send?text=${encodeURIComponent(u)}`;at(g)}function Va(){const e=window.ProjectStore||(typeof x<"u"?x:null);let t={};e&&e.getActiveContext&&(t=e.getActiveContext());let n=Array.isArray(window.selected)&&window.selected.length?[...window.selected]:[];if(!n.length&&t.project&&Array.isArray(t.project.selectedSerials)&&(n=[...t.project.selectedSerials]),!n.length)return alert("No lookbook items found to import. Select pieces or load an active project first."),0;const a=un(n);return typeof dt=="function"&&dt("finalTray"),a}window.toggle=an;window.removeFromSelected=function(e){an(e)};window.syncCurrentSelectionToProject=yt;window.shareSelectionToWhatsApp=qa;window.shareLookbookToWhatsApp=Qa;window.importApprovedProjectToFinalTray=Va;window.renderFloatingSelectionBar=Ct;window.switchTab=dt;window.toggleMobileSidebar=function(){const e=document.getElementById("appSidebar"),t=document.getElementById("sidebarOverlay");e&&t&&(e.classList.toggle("is-open"),t.classList.toggle("is-visible"))};window.renderDashboard=function(){if(typeof window.renderProjectDashboard=="function"){window.renderProjectDashboard();return}};window.loadReturnProductsFromFinalTray=$n;window.handleReturnProductsSearch=Wa;window.updateReturnProductStatus=Tt;window.updateReturnProductCondition=Ja;window.markReturnProductReceived=Ga;window.markReturnProductMissing=Ka;window.generateSelectionPdf=nt;window.downloadCurrentPdf=Ve;window.downloadCoverPdf=Da;window.shareCurrentPdf=it;window.exportAndSharePdfToWhatsApp=xa;window.openMiniWebsiteModal=openMiniWebsiteModal;window.createMiniWebsiteFromModal=createMiniWebsiteFromModal;window.closeMiniWebsiteModal=closeMiniWebsiteModal;window.addBulkSerialsToFinalTray=bt;window.generateFinalTrayFromSerials=vt;window.shareFinalTrayPdf=Fa;window.clearAllSelected=mn;window.removeMarkedFromSelected=fn;window.selectAllByBrand=$a;window.toggleFilterMenu=Zt;window.toggleBreakdown=en;window.onSearchInput=nn;window.onFilterChanged=xe;window.goToPrevPage=sn;window.goToNextPage=on;window.changePageSize=rn;window.goToPrevSelectedPage=ln;window.goToNextSelectedPage=cn;window.changeSelectedPageSize=dn;
