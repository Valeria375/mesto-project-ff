(()=>{"use strict";function e(e){e.target===e.currentTarget&&n(e.target)}function t(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function r(r){r.classList.add("popup_is-opened"),r.addEventListener("click",e),document.addEventListener("keydown",t)}function n(r){r.classList.remove("popup_is-opened"),r.removeEventListener("click",e),document.removeEventListener("keydown",t)}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"740407e5-70ef-4fe0-948f-c17906163d1e","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}var a=function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then(c)},u=function(e,t){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:t?"DELETE":"PUT",headers:o.headers}).then(c)};function i(e,t,r){var n=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),o=n.querySelector(".card__image"),c=n.querySelector(".card__title"),i=n.querySelector(".card__delete-button");c.textContent=e.name,o.src=e.link,c.alt=e.name,e.owner._id!==r&&i.classList.add("card__delete-button-hidden"),i.addEventListener("click",(function(){return function(e,t){var r=e;a(t).then(r.remove()).catch((function(e){return console.error("Ошибка удаления карточки: ".concat(e))}))}(n,e._id)})),o.addEventListener("click",(function(){t(o.src,c.textContent)}));var l=e.likes.length||0;n.querySelector(".count__likes").textContent=l;var s=n.querySelector(".card__like-button");return s.addEventListener("click",(function(){return t=s,r=n,o=e._id,c=t.classList.contains("card__like-button_is-active"),a=o,i=r.querySelector(".count__likes"),void(c?c&&u(a,!0).then((function(e){t.classList.remove("card__like-button_is-active");var r=e.likes.length||0;i.textContent=r})).catch((function(e){return console.error("Ошибка: ".concat(e))})):u(a,!1).then((function(e){t.classList.add("card__like-button_is-active");var r=e.likes.length||0;i.textContent=r})).catch((function(e){return console.error("Ошибка: ".concat(e))})));var t,r,o,c,a,i})),e.likes.some((function(e){return e._id===r}))&&s.classList.add("card__like-button_is-active"),n}var l=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(t,r){s(e,t,r)})),p(n,t)},s=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},p=function(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0},d=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):p(t,r)};function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var f,y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},v=document.querySelector(".places__list"),m=document.querySelector(".popup_type_image"),h=m.querySelector(".popup__close"),S=m.querySelector(".popup__image"),b=m.querySelector(".popup__caption"),q=document.querySelector(".profile__edit-button"),E=document.querySelector(".popup_type_edit"),L=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),C=E.querySelector(".popup__form"),g=k.querySelector(".popup__form"),x=C.querySelector(".popup__input_type_name"),A=C.querySelector(".popup__input_type_description"),w=(g.querySelector(".popup__input_type_card-name"),g.querySelector(".popup__input_type_url"),document.querySelector(".profile__title")),U=document.querySelector(".profile__description"),T=E.querySelector(".popup__close"),j=k.querySelector(".popup__close"),O=document.querySelector(".profile__image"),B=document.querySelector(".popup_type-avatar"),P=B.querySelector(".popup__form"),D=B.querySelector(".popup__close"),I=B.querySelector(".popup__input_type_url");function M(e,t){S.src=e,S.alt=t,b.textContent=t,r(m)}O.addEventListener("click",(function(){I.value="",l(B,y),r(B)})),D.addEventListener("click",(function(){n(B)})),f=P.querySelector(".popup__input_type_url"),P.addEventListener("submit",(function(e){var t;$(e.submitter,"Сохранение..."),e.preventDefault(),(t={avatar:f.value},fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify(t)}).then(c)).then((function(e){O.style="background-image: url(".concat(e.avatar,")"),userAvatar=e.avatar,n(B)})).catch((function(e){console.log(e)})).finally((function(){$(e.submitter,"Сохранить")}))})),h.addEventListener("click",(function(){return n(m)})),q.addEventListener("click",(function(){l(E,y),r(E),x.value=w.textContent,A.value=U.textContent})),T.addEventListener("click",(function(){n(E)})),j.addEventListener("click",(function(){n(k)})),L.addEventListener("click",(function(){g.reset(),l(k,y),r(k)})),h.addEventListener("click",(function(){n(k)})),C.addEventListener("submit",(function(e){var t,r;$(e.submitter,"Сохранение..."),e.preventDefault(),(t=x.value,r=A.value,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:t,about:r})}).then(c)).then((function(e){w.textContent=e.name,U.textContent=e.about,n(E)})).catch((function(e){return console.log(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);d(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),d(r,n,t)}))}))}(t,e)}))}(y);var N="";Promise.all([fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(c),fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then(c)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];c.avatar,N=c._id,w.textContent=c.name,U.textContent=c.about,O.style.backgroundImage="url(".concat(c.avatar,")"),o.forEach((function(e){var t=i(e,M,N);v.append(t)}))})).catch((function(e){console.log(e)}));var J,H,V,z=document.querySelector(".popup_type_new-card");function $(e,t){e.textContent=t}J=z.querySelector(".popup__form"),H=J.querySelector(".popup__input_type_card-name"),V=J.querySelector(".popup__input_type_url"),J.addEventListener("submit",(function(e){var t;$(e.submitter,"Сохранение..."),e.preventDefault(),(t={name:H.value,link:V.value},fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify(t)}).then(c)).then((function(e){var t=i(e,M,N);v.prepend(t),n(z)})).catch((function(e){console.log(e)})).finally((function(){return $(e.submitter,"Сохранить")}))}))})();