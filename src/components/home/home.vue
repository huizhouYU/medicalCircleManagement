<template>
	<el-container class="content">
		<el-header class="header">Header</el-header>
		<el-container>
			<el-aside width="200px" class="aside">Aside</el-aside>
			<el-container>
				<el-main class="main">Main</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
export default {
  created () {
    console.log(this.$router)
    // 获取token
    const token = localStorage.getItem('token')
    console.log('token', token)
    if (!token) {
      // 没有token 返回登录页
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
	.content {
		height: 100%;
	}

	.header {
		background-color: cadetblue;
	}

	.aside {
		background-color: aquamarine;
	}

	.main {
		background-color: bisque;
	}
</style>
