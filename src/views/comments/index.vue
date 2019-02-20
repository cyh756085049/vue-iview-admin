<template>
	<div>
		<Card
			:padding="0"
			:dis-hover="true">
      <p slot="title">
          <Icon type="social-twitch-outline"></Icon>
          评论列表
      </p>
			<div style="overflow: hidden;">
				<Table
					:columns="columns"
					:data="comments">
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
    <Form :model="comment" :label-width="80">
			<FormItem label="内容">
        <Input v-model="comment.content" type="textarea" :autosize="true"></Input>
      </FormItem>
			<FormItem label="评论类型">
				<RadioGroup v-model="comment.entityType">
	        <Radio :label="0">问题的评论</Radio>
	        <Radio :label="1">评论的评论</Radio>
    		</RadioGroup>
      </FormItem>
    </Form>
  </Modal>
	</div>
</template>
<script>
	import util from '@/libs/util'
	export default {
		name: 'CommentsIndex',
		data() {
			return {
				comments: [],
				loading: true,
				columns: [
          {
            title: '内容',
            key: 'content'
          },
          {
            title: '评论者',
            key: 'username',
						align: 'center'
          },
					{
            title: '点赞数量',
            key: 'likeCount',
						align: 'center',
						render: (h, params) => {
							const likeCount = params.row.likeCount
							return likeCount == null ? 0 : likeCount
						}
          },
          {
            title: '评论类型',
            key: 'entityType',
						render: (h, params) => {
							const entityType = params.row.entityType
							return entityType == 0 ? '问题的评论' : '评论的评论'
						}
          },
					{
						title: '发布时间',
						width: '200px',
						key: 'createTime',
						align: 'center'
					},
					{
						title: '最后修改',
						width: '200px',
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
                        title: '删除评论',
                        content: '<p>确定删除此条评论吗？',
                        okText: '删除',
                        cancelText: '取消',
                        loading: true,
                        onOk: () => {
                          util.ajax.delete('manage/comments/' + data.id).then(()=> {
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
				comment: {},
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
				util.ajax.get('manage/comments/', {
					params: {
						pageNum: this.page.current,
						pageSize: this.page.size
					}
				}).then( res => {
					const data = res.data.data
					this.comments = data.list
					const page = {
						current: data.pageNum,
						size: data.pageSize,
						total : data.total
					}
					this.page = page
				}).catch(error => {
					this.$Message.error("获取评论列表失败！")
				})
			},
			edit(id) {
				this.loading = true
				util.ajax.get('manage/comments/' + id).then( res => {
					this.comment = res.data.data
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
				util.ajax.put('manage/comments/change', {}, {
					params: this.comment
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
