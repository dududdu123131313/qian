"use strict";(self["webpackChunklogin_vue"]=self["webpackChunklogin_vue"]||[]).push([[266],{4266:function(l,t,n){n.r(t),n.d(t,{default:function(){return b}});var e=n(6768);const u={class:"my-bills-container"},r={class:"bill-list-container"};function s(l,t,n,s,i,a){const c=(0,e.g2)("bill-list");return(0,e.uX)(),(0,e.CE)("div",u,[t[0]||(t[0]=(0,e.Lk)("h1",{class:"title"},"我的账单",-1)),(0,e.Lk)("div",r,[(0,e.bF)(c)])])}var i=n(4232);function a(l,t,n,u,r,s){return(0,e.uX)(),(0,e.CE)("div",null,[(0,e.Lk)("table",null,[t[0]||(t[0]=(0,e.Lk)("thead",null,[(0,e.Lk)("tr",null,[(0,e.Lk)("th",null,"创建时间"),(0,e.Lk)("th",null,"订单编号"),(0,e.Lk)("th",null,"支付金额"),(0,e.Lk)("th",null,"类型"),(0,e.Lk)("th",null,"科室"),(0,e.Lk)("th",null,"手机号")])],-1)),(0,e.Lk)("tbody",null,[((0,e.uX)(!0),(0,e.CE)(e.FK,null,(0,e.pI)(r.bills,(l=>((0,e.uX)(),(0,e.CE)("tr",{key:l.orderNumber},[(0,e.Lk)("td",null,(0,i.v_)(l.creationTime),1),(0,e.Lk)("td",null,(0,i.v_)(l.orderNumber),1),(0,e.Lk)("td",null,"¥"+(0,i.v_)(l.paymentAmount),1),(0,e.Lk)("td",null,(0,i.v_)(l.type),1),(0,e.Lk)("td",null,(0,i.v_)(l.department),1),(0,e.Lk)("td",null,(0,i.v_)(l.phone),1)])))),128))])])])}var c=n(4373),o={data(){return{bills:[]}},created(){this.fetchBills()},methods:{async fetchBills(){try{const l=await c.A.get("/api/bills");this.bills=l.data}catch(l){console.error("Error fetching bills:",l)}}}},d=n(1241);const k=(0,d.A)(o,[["render",a],["__scopeId","data-v-fb12b978"]]);var h=k,L={components:{BillList:h}};const v=(0,d.A)(L,[["render",s],["__scopeId","data-v-54255a39"]]);var b=v}}]);
//# sourceMappingURL=266.a30108aa.js.map