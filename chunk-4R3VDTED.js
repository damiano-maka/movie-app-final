import"./chunk-Y7KSNLX2.js";import{a as V}from"./chunk-RGMSZVUI.js";import"./chunk-2IFHHCGT.js";import{a as x}from"./chunk-NBK4MX2W.js";import{$a as W,Aa as F,Ca as f,Da as d,Ea as L,Fa as A,Ha as l,Ia as N,Ja as j,La as v,Na as B,Oa as P,P as c,Q as u,U as y,V as S,Za as U,ab as $,c as g,ca as k,gb as G,ha as w,hb as C,ia as m,ja as b,ka as E,ma as D,qa as M,sa as h,ta as _,ua as T,va as I,wa as O,xa as o,ya as a,za as R}from"./chunk-UZ4CZCYJ.js";var H=(()=>{let t=class t{constructor(){this.cardClicked=new D,this.router=c(G)}goWatch(n){this.router.navigate(["/player",n])}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=u({type:t,selectors:[["app-wishlist-card"]],inputs:{movie:"movie",user:"user"},outputs:{cardClicked:"cardClicked"},standalone:!0,features:[v],decls:13,vars:4,consts:[[1,"flex","flex-col","justify-between","md:flex-row","gap-x-5","py-5"],[1,"flex","min-w-0","gap-x-4"],[1,"h-20","w-20","flex-none","rounded-full","bg-gray-50",3,"src","alt"],[1,"min-w-0","flex-auto"],[1,"text-m","font-semibold","leading-6","text-white"],[1,"mt-1","truncate","text-s","leading-5","text-gray-400"],["routerLink","/profile",1,"cursor-pointer","underline"],[1,"shrink-0","mt-3"],[1,"btn","btn-sm","btn-error","text-white",3,"click"]],template:function(i,r){i&1&&(o(0,"li",0)(1,"div",1),R(2,"img",2),o(3,"div",3)(4,"p",4),l(5),a(),o(6,"p",5),l(7," Added by : "),o(8,"a",6),l(9),a()()()(),o(10,"div",7)(11,"button",8),f("click",function(){return r.cardClicked.emit(r.movie)}),l(12," X "),a()()()),i&2&&(m(2),A("src","https://image.tmdb.org/t/p/w500",r.movie.poster_path,"",k),L("alt",r.movie.title),m(3),j(" Title : ",r.movie.title," "),m(4),N(r.user))},dependencies:[C],changeDetection:0});let e=t;return e})();function q(e,t){if(e&1){let s=F();o(0,"app-wishlist-card",5),f("cardClicked",function(){let r=y(s).$implicit,p=d(2),z=d();return S(z.onDeleteButtonClick(r.id,p==null?null:p.nickname))}),a()}if(e&2){let s=t.$implicit,n=d(2);M("movie",s)("user",n.name)}}function J(e,t){if(e&1&&(o(0,"ul",4),I(1,q,1,2,"app-wishlist-card",6,T),a()),e&2){let s=d(2);m(1),O(s.movies())}}function K(e,t){e&1&&(o(0,"div",7)(1,"h1"),l(2,"NO ITEMS ON LIST"),a(),o(3,"button",8),l(4," Go back home "),a()())}function Q(e,t){if(e&1&&(o(0,"div",0)(1,"b",1),l(2,"WISH LIST"),a()(),o(3,"div",2),h(4,J,3,0,"ul",3)(5,K,5,0),a()),e&2){let s=d();m(4),_(4,s.movies().length>0?4:5)}}function Y(e,t){e&1&&(o(0,"h1"),l(1,"USER NOT FOUND | ERROR | PLEASE LOG IN AGAIN"),a())}var _e=(()=>{let t=class t{constructor(n){this.changeDetectorRef=n,this.http=c($),this.userO=c(x).user$,this.auth=c(x),this.usersService=c(V),this.movies=w([]),this.auth.user$.subscribe(i=>{this.nickname=i?.nickname,this.fetchData(this.nickname)})}fetchData(n){return g(this,null,function*(){try{let i=yield this.usersService.getMoviesCollection(n);this.movies.set(i),this.changeDetectorRef.detectChanges()}catch(i){console.error("Error fetching movies:",i)}})}onDeleteButtonClick(n,i){this.usersService.deleteUserDocument(n,i).then(()=>{console.log("Movie deleted successfully!"),location.reload()}).catch(r=>{console.error("Error deleting movie:",r)})}};t.\u0275fac=function(i){return new(i||t)(b(E))},t.\u0275cmp=u({type:t,selectors:[["app-mylist"]],standalone:!0,features:[v],decls:3,vars:3,consts:[[1,"navbar",2,"background-color","var(--sfondo-nav)"],[1,"text-xl","text-white","mx-auto"],[1,"p-3","vh"],["role","list","class","p-3"],["role","list",1,"p-3"],[3,"movie","user","cardClicked"],[3,"movie","user"],[1,"p-5","vh-45","text-center"],["routerLink","/home",1,"btn","btn-sm","btn-primary","mt-5","text-white"]],template:function(i,r){if(i&1&&(h(0,Q,6,1),B(1,"async"),h(2,Y,2,0)),i&2){let p;_(0,(p=P(1,1,r.userO))?0:2,p)}},dependencies:[W,U,H,C],styles:[".vh[_ngcontent-%COMP%]{min-height:60vh}"],changeDetection:0});let e=t;return e})();export{_e as default};