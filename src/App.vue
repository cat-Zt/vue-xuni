<template>
  <div>
    <ElBigdataTable
      highlight-current-row
      @selection-change="selectChange"
      ref="singleTable"
      :data="tableData"
      :height="400"
      :row-height="50"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <div>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <div>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <div>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <div>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <div>
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </ElBigdataTable>
    <!-- <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table> -->
  </div>
</template>

<script>
export default {
  name: 'test',
  components: {},
  data () {
    return {
      tableData: [],
      currentStartIndex: 0,
      currentEndIndex: 20
    };
  },
  created () {
    this.getTableData();
  },
  computed: {
    filteredData () {
      return this.tableData.filter((item, index) => {
        if (index < this.currentStartIndex) {
          return false;
        } else if (index > this.currentEndIndex) {
          return false;
        } else {
          return true;
        }
      });
    }
  },
  methods: {
    selectChange(val) {
      console.log(val, 'val')
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handelLoadmore (currentStartIndex, currentEndIndex) {
      this.currentStartIndex = currentStartIndex;
      this.currentEndIndex = currentEndIndex;
    },
    getTableData () {
      let cont = 0;
      let tableData = [];
      while (cont < 900) {
        cont = cont + 1;
        let object = {
          date: cont,
          name: '王小虎' + cont,
          address: '上海市普陀区金沙江路 cont 弄'
        }
        tableData.push(object);
      }
      setTimeout(() => {
        this.tableData = tableData;
      }, 2000);
    },
    handleEdit(index, scope) {
      console.log(index, scope)
    },
    handleDelete(index, scope) {
      console.log(index, scope)
      this.tableData.push(scope)
    }
  },
  watch: {}
}
</script>
<style>
.current-row td {
  font-weight: bold;
  background-color: #fefefe;
}
/* .el-table__body-wrapper .el-table__row td {
  display: none;
}
.el-table__body-wrapper .el-table__row {
  height: 38px;
} */
</style>
