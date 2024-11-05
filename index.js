import{a as b,S as x,i as h}from"./assets/vendor-C4-ZuMk8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const S="46880083-7fe8124655458a4103858b250",C="https://pixabay.com/api/",g=async(s,t,i)=>{const r=new URLSearchParams({key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:t,page:i});return await b.get(`${C}?${r}`).then(e=>e.data)},y=s=>s.map(({webformatURL:t,largeImageURL:i,tags:r,likes:e,views:o,comments:a,downloads:L})=>`
<li class="card">
<a href="${i}">
<img src="${t}" class="image" height="200px" width="360px" alt="${r}" />
</a>
<div class="informations">
    <div class="current-info">
    <p class="title-info">Likes</p>
    <p class="count">${e}</p>
  </div>
  <div class="current-info">
    <p class="title-info">Views</p>
    <p class="count">${o}</p>
  </div>
  <div class="current-info">
      <p class="title-info">Comments</p>
      <p class="count">${a}</p>
  </div>
  <div class="current-info">
      <p class="title-info">Downloads</p>
      <p class="count">${L}</p>
  </div>
</div>
</li>`),c=document.querySelector(".gallery"),u=document.querySelector(".searchImg"),l=document.querySelector(".show-more"),f=15;let n,p,w;const I=()=>h.show({message:"Input is empty!",position:"topRight",icon:"ico-warning",backgroundColor:"orangered",messageSize:"16",messageColor:"#fff",theme:"dark",maxWidth:"350px"}),P=()=>h.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageSize:"16",messageColor:"#fff",theme:"dark",maxWidth:"350px",icon:"ico-error"}),$=()=>h.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",messageSize:"16",messageColor:"#fff",theme:"dark",maxWidth:"350px",backgroundColor:"#4e75ff"}),v=new x(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250}),m=()=>document.querySelector("span").classList.toggle("loader");let d="";const k=async s=>{if(s.preventDefault(),n=1,p=f,l.classList.add("hidden"),d=u.elements.searchText.value.toLowerCase().trim(),!d)return I();c.innerHTML="",m();try{const t=await g(d,f,n);if(!t.hits.length)return P();c.insertAdjacentHTML("beforeend",y(t.hits).join("")),v.refresh(),t.totalHits>=p&&l.classList.remove("hidden")}catch(t){console.log(t)}finally{m(),u.reset()}},z=async()=>{w=c.childElementCount,n++,p=f*n,m(),l.classList.add("hidden");try{const s=await g(d,f,n);c.insertAdjacentHTML("beforeend",y(s.hits).join("")),v.refresh(),E(),s.totalHits>p?l.classList.remove("hidden"):$()}catch(s){console.log(s)}finally{m()}},E=()=>{c.children[w].scrollIntoView({behavior:"smooth",block:"start"})};u.addEventListener("submit",k);l.addEventListener("click",z);
//# sourceMappingURL=index.js.map
