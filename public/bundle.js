(()=>{"use strict";const t={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let e;const i=new Uint8Array(16);function s(){if(!e&&(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!e))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(i)}const n=[];for(let t=0;t<256;++t)n.push((t+256).toString(16).slice(1));const o=function(e,i,o){if(t.randomUUID&&!i&&!e)return t.randomUUID();const a=(e=e||{}).random||(e.rng||s)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,i){o=o||0;for(let t=0;t<16;++t)i[o+t]=a[t];return i}return function(t,e=0){return(n[t[e+0]]+n[t[e+1]]+n[t[e+2]]+n[t[e+3]]+"-"+n[t[e+4]]+n[t[e+5]]+"-"+n[t[e+6]]+n[t[e+7]]+"-"+n[t[e+8]]+n[t[e+9]]+"-"+n[t[e+10]]+n[t[e+11]]+n[t[e+12]]+n[t[e+13]]+n[t[e+14]]+n[t[e+15]]).toLowerCase()}(a)};class a{constructor(){this.stack=new Array}update(){const t=this.getCurrentState();null!=t&&t()}popState(){return this.stack.pop()}pushState(t){this.getCurrentState()!=t&&this.stack.push(t)}getCurrentState(){return this.stack.length>0?this.stack[this.stack.length-1]:null}}const r=(t,e,i=1e-8)=>Math.abs(t-e)<i;class h{constructor(...t){this.components=t}get x(){return this.components[0]}get y(){return this.components[1]}add({components:t}){return new h(...t.map(((t,e)=>this.components[e]+t)))}subtract({components:t}){return new h(...t.map(((t,e)=>this.components[e]-t)))}scaleBy(t){return new h(...this.components.map((e=>e*t)))}length(){return Math.hypot(...this.components)}dotProduct({components:t}){return t.reduce(((t,e,i)=>t+e*this.components[i]),0)}normalize(){return this.scaleBy(1/this.length())}haveSameDirectionWith(t){const e=this.normalize().dotProduct(t.normalize());return r(e,1)}haveOppositeDirectionTo(t){const e=this.normalize().dotProduct(t.normalize());return r(e,-1)}isPerpendicularTo(t){const e=this.normalize().dotProduct(t.normalize());return r(e,0)}angleBetween(t){return 180*Math.acos(this.dotProduct(t)/(this.length()*t.length()))/Math.PI}negate(){return this.scaleBy(-1)}projectOn(t){const e=t.normalize();return e.scaleBy(this.dotProduct(e))}withLength(t){return this.normalize().scaleBy(t)}equalTo({components:t}){return t.every(((t,e)=>r(t,this.components[e])))}}class c{constructor(t,e,i){this.id=o(),this.position=new h(t,e),this.velocity=new h(0,0),this.brain=new a,this.home=i,this.target=null}moveBasedOnVelocity(){if(!this.velocity.length())return;const t=Math.sqrt(Math.pow(this.velocity.x,2)+Math.pow(this.velocity.y,2)),e=this.velocity.x/t||0,i=this.velocity.y/t||0,s=this.position.add(new h(e,i));this.position=s}findLeaf(){if(!window.GAME.leafs.length)return this.brain.popState(),void this.brain.pushState(this.goHome.bind(this));(t=>{(!this.target||this.target&&!t.find((t=>t.id===this.target.id)))&&(this.target=(t=>t[Math.floor(Math.random()*t.length)])(t))})(window.GAME.leafs),this.velocity=this.target.position.subtract(this.position),this.target.position.subtract(this.position).length()<1&&(this.target.takeLeaf(this.home),this.target.destroy("leafs"),this.brain.pushState(this.goHome.bind(this)))}goHome(){this.velocity=this.position.subtract(this.home.position).negate(),this.position.subtract(this.home.position).length()<1&&(this.target.destroy("reservedLeafs"),this.brain.popState())}update(){this.brain.getCurrentState()||this.brain.pushState(this.findLeaf.bind(this)),this.brain.update(),this.moveBasedOnVelocity()}}class l{constructor(t,e){this.id=o(),this.position=new h(t,e),this.velocity=new h(0,0),this.brain=new a}}class d{constructor(t,e){this.id=o(),this.position=new h(t,e),this.velocity=new h(0,0),this.brain=new a,this.targetDestination=null}moveBasedOnVelocity(){if(!this.velocity.length())return;const t=Math.sqrt(Math.pow(this.velocity.x,2)+Math.pow(this.velocity.y,2)),e=this.velocity.x/t||0,i=this.velocity.y/t||0,s=this.position.add(new h(e,i));this.position=s}takeLeaf(t){window.GAME.reservedLeafs.push(this),this.targetDestination=t,this.brain.pushState(this.move.bind(this))}putLeaf(){this.targetDestination=null,this.brain.popState()}destroy(t){window.GAME[t]=window.GAME[t].filter((t=>t.id!==this.id))}move(){this.velocity=this.position.subtract(this.targetDestination.position).negate()}update(){this.brain.getCurrentState()&&(this.brain.update(),this.moveBasedOnVelocity())}}const u={height:1e3,width:1900,homeAmount:5,antsPerHome:200,leafAmount:2e3},p=new class{constructor(t,e){this.canvas=document.getElementById("canvas"),this.canvas.width=t,this.canvas.height=e,this.ctx=canvas.getContext("2d"),this.ctx.fillStyle="grey",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}clearCanvas(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="grey",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}draw(t,e,i,s){this.ctx.beginPath(),this.ctx.arc(t,e,i,0,2*Math.PI),this.ctx.fillStyle=s,this.ctx.fill()}drawAnts(){window.GAME.ants.forEach((t=>this.draw(t.position.x,t.position.y,2,"black")))}drawHomes(){window.GAME.homes.forEach((t=>this.draw(t.position.x,t.position.y,30,"black")))}drawLeafs(){window.GAME.leafs.forEach((t=>this.draw(t.position.x,t.position.y,5,"green")))}drawReservedLeafs(){window.GAME.reservedLeafs.forEach((t=>this.draw(t.position.x,t.position.y,5,"green")))}drawFrame(){this.clearCanvas(),this.drawHomes(),this.drawLeafs(),this.drawReservedLeafs(),this.drawAnts()}}(u.width,u.height);(new class{init(){const t=document.getElementById("canvas");t.addEventListener("click",(function(e){window.GAME.leafs.push(new d(e.clientX-t.offsetLeft,e.clientY-t.offsetTop))}))}}).init();const w=(({homeAmount:t,antsPerHome:e,leafAmount:i})=>{const s=[],n=new Array(t).fill(null).map((()=>new l(Math.floor(Math.random()*u.width)+1,Math.floor(Math.random()*u.height)+1)));n.forEach((t=>{new Array(e).fill(null).map((()=>new c(t.position.x,t.position.y,t))).forEach((t=>s.push(t)))}));const o=new Array(i).fill(null).map((()=>new d(Math.floor(Math.random()*u.width)+1,Math.floor(Math.random()*u.height)+1)));return{homes:n,ants:s,leafs:o}})(u);window.GAME={homes:w.homes,ants:w.ants,leafs:w.leafs,reservedLeafs:[]};const m=()=>{p.drawFrame(),window.GAME.ants.forEach((t=>t.update())),window.GAME.reservedLeafs.forEach((t=>t.update())),requestAnimationFrame(m)};m()})();