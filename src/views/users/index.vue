<template>
	<div>
		<Card
			:padding="0"
			:dis-hover="true">
      <p slot="title">
          <Icon type="help"></Icon>
          用户列表
      </p>
			<div style="overflow: hidden;">
				<Table
					:columns="columns"
					:data="users">
				</Table>
				<Page
					:total="page.total"
					:current.sync="page.current"
					:page-size="page.size"
					:page-size-opts="[10, 20, 30, 40]"
					show-total
					show-elevator
					show-sizer
					@on-change="this.onChange"
					@on-page-size-change="this.onPageSizeChange"
					:styles="{float: 'right', margin: '10px'}">
				</Page>
			</div>
    </Card>
		<Modal
    v-model="modal"
    title="编辑"
    ok-text="提交"
    :loading="loading"
    @on-ok="onOk"
    >
    <Form :model="user" :label-width="50">
      <FormItem label="标题">
        <Input v-model="user.title" type="textarea" :autosize="true"></Input>
      </FormItem>
			<FormItem label="内容">
        <Input v-model="user.content" type="textarea" :autosize="true"></Input>
      </FormItem>
    </Form>
  </Modal>
	</div>
</template>
<script>
	import util from '@/libs/util'
	export default {
		name: 'usersIndex',
		data() {
			return {
				users: [],
				loading: true,
				columns: [
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '发布者',
            key: 'username',
						align: 'center'
          },
          {
            title: '评论数量',
            key: 'commentCount',
						align: 'center'
          },
					{
						title: '发布时间',
						key: 'createTime',
						align: 'center'
					},
					{
						title: '最后修改',
						key: 'updateTime',
						align: 'center'
					},
					{
						title: '操作',
						width: '200px',
						align: 'center',
						render: (h, params) => {
	            return h('div', [
                h('Button', {
                  props: {
                    type: 'primary'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.id)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error'
                  },
									on: {
                    click: () => {
                      const data = params.row
                      this.$Modal.confirm({
                        title: '删除用户',
                        content: '<p>确定' + data.username + '吗？',
                        okText: '删除',
                        cancelText: '取消',
                        loading: true,
                        onOk: () => {
                          util.ajax.delete('manage/users/' + data.id).then(()=> {
                            this.$Modal.remove()
                            this.init()
                            this.$Message.success("删除成功！")
                          }).catch(() => {
                            this.$Modal.remove()
                            this.$Message.error('删除失败！')
                          })
                        }
                      })
                    }
                  }
                }, '删除')
	            ]);
	        }
					}
        ],
				modal: false,
				user: {},
				// 初始化分页参数
				page: {
					current: 1, // 当前页
					total: 10, // 总数
					size: 10 // 每页数量
				}
			}
		},
		methods: {
			init() {
				util.ajax.get('manage/users/', {
					params: {
						pageNum: this.page.current,
						pageSize: this.page.size
					}
				}).then( res => {
					const data = res.data.data
					this.users = data.list
					const page = {
						current: data.pageNum,
						size: data.pageSize,
						total : data.total
					}
					this.page = page
				}).catch(error => {
					this.$Message.error("获取用户列表失败！")
				})
			},
			edit(id) {
				this.loading = true
				util.ajax.get('manage/users/' + id).then( res => {
					this.user = res.data.data
					this.modal = true
				}).catch( error => {
					this.$Message.error('获取详情失败！')
				})
			},
			onChange(){
				this.init()
			},
			onPageSizeChange(size){
				this.$set(this.page, 'size', size)
				this.init()
			},
			onOk() {
				util.ajax.put('manage/users/change', {}, {
					params: this.user
				}).then( res => {
					this.modal = false
					this.$Message.success('修改成功！')
					this.init()

				}).catch( error => {
					this.modal = false
					this.$Message.error('修改失败！')
				})

			}
		},
		mounted: function () {
			this.init()
		}
	}
</script>
