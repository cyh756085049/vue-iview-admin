webpackJsonp([5],{211:function(e,t,n){var a=n(16)(n(219),n(228),null,null);a.options.__file="/Users/518/vue/iview-admin/src/views/projects/index.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},219:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(50),o=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default={name:"projectsIndex",data:function(){var e=this;return{projects:[],loading:!0,columns:[{title:"标题",key:"title"},{title:"发布者",key:"username",align:"center"},{title:"来源",key:"originName",align:"center"},{title:"发布时间",key:"createTime",align:"center"},{title:"最后修改",key:"updateTime",align:"center"},{title:"操作",width:"200px",align:"center",render:function(t,n){return t("div",[t("Button",{props:{type:"primary"},style:{marginRight:"5px"},on:{click:function(){e.edit(n.row.id)}}},"编辑"),t("Button",{props:{type:"error"},on:{click:function(){var t=n.row;e.$Modal.confirm({title:"删除课题",content:"<p>确定"+t.title+"吗？",okText:"删除",cancelText:"取消",loading:!0,onOk:function(){o.default.ajax.delete("manage/projects/"+t.id).then(function(){e.$Modal.remove(),e.init(),e.$Message.success("删除成功！")}).catch(function(){e.$Modal.remove(),e.$Message.error("删除失败！")})}})}}},"删除")])}}],modal:!1,project:{},page:{current:1,total:10,size:10}}},methods:{init:function(){var e=this;o.default.ajax.get("manage/projects/",{params:{pageNum:this.page.current,pageSize:this.page.size}}).then(function(t){var n=t.data.data;e.projects=n.list;var a={current:n.pageNum,size:n.pageSize,total:n.total};e.page=a}).catch(function(t){e.$Message.error("获取课题列表失败！")})},edit:function(e){var t=this;this.loading=!0,o.default.ajax.get("manage/projects/"+e).then(function(e){t.project=e.data.data,t.modal=!0}).catch(function(e){t.$Message.error("获取详情失败！")})},onChange:function(){this.init()},onPageSizeChange:function(e){this.$set(this.page,"size",e),this.init()},onOk:function(){var e=this;o.default.ajax.put("manage/projects/change",{},{params:this.project}).then(function(t){e.modal=!1,e.$Message.success("修改成功！"),e.init()}).catch(function(t){e.modal=!1,e.$Message.error("修改失败！")})}},mounted:function(){this.init()}}},228:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Card",{attrs:{padding:0,"dis-hover":!0}},[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"monitor"}}),e._v("\n          课题列表\n      ")],1),e._v(" "),n("div",{staticStyle:{overflow:"hidden"}},[n("Table",{attrs:{columns:e.columns,data:e.projects}}),e._v(" "),n("Page",{attrs:{total:e.page.total,current:e.page.current,"page-size":e.page.size,"page-size-opts":[10,20,30,40],"show-total":"","show-elevator":"","show-sizer":"",styles:{float:"right",margin:"10px"}},on:{"update:current":function(t){e.$set(e.page,"current",t)},"on-change":this.onChange,"on-page-size-change":this.onPageSizeChange}})],1)]),e._v(" "),n("Modal",{attrs:{title:"编辑","ok-text":"提交",loading:e.loading},on:{"on-ok":e.onOk},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[n("Form",{attrs:{model:e.project,"label-width":50}},[n("FormItem",{attrs:{label:"标题"}},[n("Input",{attrs:{type:"textarea",autosize:!0},model:{value:e.project.title,callback:function(t){e.$set(e.project,"title",t)},expression:"project.title"}})],1),e._v(" "),n("FormItem",{attrs:{label:"内容"}},[n("Input",{attrs:{type:"textarea",autosize:!0},model:{value:e.project.detail,callback:function(t){e.$set(e.project,"detail",t)},expression:"project.detail"}})],1),e._v(" "),n("FormItem",{attrs:{label:"来源"}},[n("Select",{model:{value:e.project.origin,callback:function(t){e.$set(e.project,"origin",t)},expression:"project.origin"}},[n("Option",{attrs:{value:14}},[e._v("软件学院")]),e._v(" "),n("Option",{attrs:{value:7}},[e._v("大数据学院")]),e._v(" "),n("Option",{attrs:{value:1}},[e._v("化工院")]),e._v(" "),n("Option",{attrs:{value:100}},[e._v("未知来源")])],1)],1)],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});