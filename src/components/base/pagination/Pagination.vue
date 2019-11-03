<template>
  <div class="block el-pagination-wrapper">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  /**
   * 分页组件
   *
   * 该组件是基于el-pagination组件的封装
   */
  export default {
    /**
     * @property {number}  total          总页数
     * @property {number}  pageSize       每页数据条数
     * @property {number}  currentPage    当前页码
     */
    props: {
      total: {
        type: Number,
        required: true
      },
      pageSize: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {

      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('size-change',val);
      },
      handleCurrentChange(val) {
        this.$emit('current-change',val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../styles/mixin";
  .el-pagination {
    padding-top: 20px;
  }
  .el-pagination-wrapper {
    @include clearfix;
  }
  .el-pagination-wrapper .el-pagination {
    float: right;
  }
</style>

