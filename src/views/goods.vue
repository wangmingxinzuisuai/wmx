//商品管理
<template>
  <div>
    商品管理
    <div class="top">
      <el-input
        v-model="member"
        class="inp"
        placeholder="供应商名称"
      ></el-input>
      <el-input
        v-model="memberName"
        class="inp"
        placeholder="联系人"
      ></el-input>

      <el-input
        v-model="del"
        class="inp"
        placeholder="联系人电话"
      ></el-input>
      </el-date-picker>

      <el-button
        type="primary"
        @click="queryData"
      >查询</el-button>
      <el-button
        type="primary"
        @click="addUser"
      >新增</el-button>
      <el-button>重置</el-button>
    </div>
    <!-- 对话框开始 -->

    <el-dialog
      :title="duiFlag ? '会员添加' : '会员编辑'"
      :rules="rules"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="商品名称"
          prop="name"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input v-model="ruleForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价">
          <el-input v-model="ruleForm.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价">
          <el-input v-model="ruleForm.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存量">
          <el-input v-model="ruleForm.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input
            v-model="ruleForm.supplierName"
            @focus="blurName"
          ></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addData"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 对话框结束 -->
    <!-- 表格开始 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
      > </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
      > </el-table-column>
      <el-table-column
        prop="code"
        label="商品编码"
      > </el-table-column>
      <el-table-column
        prop="spec"
        label="商品规格"
      > </el-table-column>
      <el-table-column
        prop="retailPrice"
        label="零售价"
      > </el-table-column>
      <el-table-column
        prop="purchasePrice"
        label="进货价"
      > </el-table-column>
      <el-table-column
        prop="storageNum"
        label="库存量"
      > </el-table-column>
      <el-table-column
        prop="supplierName"
        label="供应商"
      > </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
    <!-- 添加供应商对话框 开始 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
     
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <el-table
       @row-click='usre1'
        :data="tableData1.rows"
        style="width: 100%"
      >
       <el-table-column
          type="index"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="供应商名称"
          @click="usre1"
        >
        </el-table-column>
        <el-table-column
          prop="linkman"
          label="联系人"
          width="180"
        >
        </el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
      <el-pagination
  :page-size="supplySize"
  :pager-count="supplyCount"
  @current-change="handleCurrentChange1"
  layout="prev, pager, next"
  :total="supplyTotal">
</el-pagination>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加供应商对话框 结束 -->
    <!-- 分页开始 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 分页结束 -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      supplySize:20,//添加供应商条数
      supplyCount:1,//添加供应商页数
      supplyTotal:null,//添加供应商总页数
      dialogVisible: false, //添加供应商对话框
      duiFlag: false, //对话框操作
      total: null, //总页数
      size: 10, //条数
      currentPage4: 1, //页数
      duiId: "", //存储对话框id
      tableData: [], //表格数据
      tableData1: [], //存储添加供应商值
      dialogFormVisible: false, //对话框值
      ruleForm: {
        name: "", //商品名称
        code: "", //商品编码
        spec: "", //商品规格
        retailPrice: "", //零售价
        purchasePrice: "", //进货价
        storageNum: "", //库存量
        supplierName: "", //供应商
        id: null,
      },
      member: "", //供应商名称
      memberName: "", //联系人
      del: "", //联系电话
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.DataS();
    //获取添加的供应商
    axios
      .post(`http://vue.mengxuegu.com/pro-api/supplier/list/search/${this.supplyCount}/${this.supplySize}`)
      .then((res) => {
        console.log(res.data.data);
        this.tableData1 = res.data.data;
        this.supplyTotal=res.data.data.total
      });
  },
  mounted() {},
  methods: {
    //供应商的分页数据
    handleCurrentChange1(val){
      console.log(val);
      this.supplyCount=val
        axios.post(`http://vue.mengxuegu.com/pro-api/supplier/list/search/${this.supplyCount}/${this.supplySize}`)
      .then((res) => {
        console.log(res.data.data);
        this.tableData1 = res.data.data;
        this.supplyTotal=res.data.data.total
      });
    },
    usre1(val){
      this.dialogVisible = false;
     this.ruleForm.supplierName=val.name
    },
    //触发供应商对话框事件
    blurName() {
      this.dialogVisible = true;
    },
    //添加的供应商对话框事件
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.DataS();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.DataS();
    },
    //查询事件
    queryData() {
      this.DataS();
    },
    //重置数据
    DataS() {
      this.$axios.post(`/goods/list/search/1/10`).then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },
    //点击新增出现
    addUser() {
      this.ruleForm = [];
      this.duiFlag = true;
      this.dialogFormVisible = true;
    },
    //新增
    addData() {
      this.dialogFormVisible = false;
      if (this.duiFlag) {
        this.$axios.post(`/goods?${this.ruleForm}`).then((res) => {
          console.log(res);
        });
      } else {
        this.tableData[this.duiId].name = ruleForm.name;
        this.tableData[this.duiId].linkman = ruleForm.linkman;
        this.tableData[this.duiId].mobile = ruleForm.mobile;
        this.tableData[this.duiId].remark = ruleForm.remark;
      }
      this.ruleForm = [];
    },
    //编辑
    handleEdit(index, row) {
      this.duiFlag = false;
      console.log(555);
      this.dialogFormVisible = true;
      console.log(index, row);
      this.duiId = index;
      this.ruleForm = row;
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
<style scoped lang="scss">
.top {
  display: flex;
}
.inp {
  width: 300px;
}
</style>
