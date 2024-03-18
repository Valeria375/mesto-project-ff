(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{iF:()=>N,KY:()=>L,g$:()=>z,S_:()=>J,iW:()=>K});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"740407e5-70ef-4fe0-948f-c17906163d1e","Content-Type":"application/json"}};function r(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}var n=function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(r)},o=function(e,n){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:n?"DELETE":"PUT",headers:t.headers}).then(r)},c={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},a=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(t,r){i(e,t,r),t.value=""})),u(n,t)},i=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},u=function(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0},l=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):u(t,r)};function s(e,t){var r=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),n=r.querySelector(".card__image"),o=r.querySelector(".card__title"),c=r.querySelector(".card__delete-button");o.textContent=e.name,n.src=e.link,n.alt=e.description,e.owner._id!==K&&c.classList.add("card__delete-button-hidden"),c.addEventListener("click",p),n.addEventListener("click",(function(){t(e.link,e.name)})),r.id=e._id;var a=e.likes.length||0;r.querySelector(".count__likes").textContent=a;var i=r.querySelector(".card__like-button");return i.addEventListener("click",(function(){return f(i,r)})),e.likes.some((function(e){return e._id===K}))&&i.classList.add("card__like-button_is-active"),r}function d(e){e.classList.toggle("card__like-button_is-active")}function p(e){var t=e.target.closest(".card");n(t.id).then(t.remove()).catch((function(e){return console.error("Ошибка удаления карточки: ".concat(e))}))}function f(e,t){var r=e.classList.contains("card__like-button_is-active"),n=t.id,c=t.querySelector(".count__likes");r?r&&o(n,!0).then((function(t){e.classList.remove("card__like-button_is-active");var r=t.likes.length||0;c.textContent=r})).catch((function(e){return console.error("Ошибка: ".concat(e))})):o(n,!1).then((function(t){e.classList.add("card__like-button_is-active");var r=t.likes.length||0;c.textContent=r})).catch((function(e){return console.error("Ошибка: ".concat(e))}))}function _(e){e.target===e.currentTarget&&v(e.target)}function y(e){"Escape"===e.key&&v(document.querySelector(".popup_is-opened"))}function m(e){e.classList.add("popup_is-opened"),e.addEventListener("click",_),document.addEventListener("keydown",y)}function v(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",_),document.removeEventListener("keydown",y)}var h=function(e){imageModal.src=e.link,imageModal.alt=e.name,imageModalCaption.textContent=e.name},S=document.querySelector(".popup_type_new-card");function b(e,t){e.textContent=t}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var q,g,L=document.querySelector(".places__list"),E=document.querySelector(".popup_type_image"),C=E.querySelector(".popup__close"),x=(E.querySelector(".popup__image"),E.querySelector(".popup__caption"),document.querySelector(".profile__edit-button")),j=document.querySelector(".popup_type_edit"),A=document.querySelector(".profile__add-button"),w=document.querySelector(".popup_type_new-card"),O=j.querySelector(".popup__form"),U=w.querySelector(".popup__form"),T=O.querySelector(".popup__input_type_name"),M=O.querySelector(".popup__input_type_description"),P=(U.querySelector(".popup__input_type_card-name"),U.querySelector(".popup__input_type_url"),document.querySelector(".profile__title")),B=document.querySelector(".profile__description"),D=j.querySelector(".popup__close"),I=w.querySelector(".popup__close"),N=document.querySelector(".profile__image"),J=document.querySelector(".popup_type-avatar"),z=J.querySelector(".popup__form"),H=J.querySelector(".popup__close");N.addEventListener("click",(function(){a(J,c),m(J)})),H.addEventListener("click",(function(){v(J)})),q=z.querySelector(".popup__input_type_url"),z.addEventListener("submit",(function(e){var n;b(e.submitter,"Сохранение..."),e.preventDefault(),(n={avatar:q.value},fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify(n)}).then(r)).then((function(e){N.style="background-image: url(".concat(e.avatar,")"),e.avatar,v(J)})).catch((function(e){console.log(e)})).finally((function(){return b(e.submitter,"Сохранить")}))})),C.addEventListener("click",(function(){return v(E)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){})),x.addEventListener("click",(function(){a(j,c),m(j),T.value=P.textContent,M.value=B.textContent})),D.addEventListener("click",(function(){v(j)})),I.addEventListener("click",(function(){v(w)})),A.addEventListener("click",(function(){U.reset(),a(w,c),m(w)})),C.addEventListener("click",(function(){v(w)})),O.addEventListener("submit",(function(e){e.preventDefault();var n=T.value,o=M.value;P.textContent=n,B.textContent=o,function(e,n){fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:e,about:n})}).then(r)}(n,o),v(j)})),g=c,Array.from(document.querySelectorAll(g.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);l(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),l(r,n,t)}))}))}(e,g)}));var V,$,F,K="";Promise.all([fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(r),fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(r)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,i=[],u=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=c.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return k(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?k(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];c.avatar,K=c._id,P.textContent=c.name,B.textContent=c.about,o.forEach((function(e){var t=s(e,d);L.append(t)}))})).catch((function(e){console.log(e)})),V=S.querySelector(".popup__form"),$=V.querySelector(".popup__input_type_card-name"),F=V.querySelector(".popup__input_type_url"),V.addEventListener("submit",(function(e){var n;b(e.submitter,"Сохранение..."),e.preventDefault(),(n={name:$.value,link:F.value},fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify(n)}).then(r)).then((function(e){var t=s(e,{removeCard:p,handleLike:f,openImageModal:h,userId:K});L.prepend(t),v(S),$.value="",F.value=""})).catch((function(e){console.log(e)})).finally((function(){return b(e.submitter,"Сохранить")}))}))})();