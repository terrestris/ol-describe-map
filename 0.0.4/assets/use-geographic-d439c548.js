import{H as s,j as r,u as c,M as d,T as g,O as p,V as m,d as h}from"./index-cc8e1189.js";/* empty css               */import{D as l}from"./DragRotateAndZoom-d858a5d1.js";s.registerLanguage("json",r);c();const a=new d({layers:[new g({source:new p})],target:"map",view:new m({center:[4.890444,52.370197],zoom:12})});a.addInteraction(new l);const n=document.getElementById("map-description"),w=document.getElementById("raw-description"),i=document.getElementById("speak"),o=async()=>{const e=await h(a),t=s.highlight(JSON.stringify(e,void 0,"  "),{language:"json"}).value;n.innerHTML=e.text,w.innerHTML=t,a.getTargetElement().setAttribute("aria-description",e.text),i.disabled=e.text===""};a.on("moveend",o);o();i&&i.addEventListener("click",()=>{const e=n==null?void 0:n.innerHTML;if(e){var t=new SpeechSynthesisUtterance;t.text=e,window.speechSynthesis.speak(t)}});
