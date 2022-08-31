//会员管理模式
<template>
  <div>
    会员管理模式
    <div class="top">
      <el-input v-model="member" class="inp" placeholder="会员卡号"></el-input>
      <el-input
        v-model="memberName"
        class="inp"
        placeholder="会员名字"
      ></el-input>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker v-model="time" type="date" placeholder="选择日期">
      </el-date-picker>

      <el-button type="primary" @click="queryData">查询</el-button>
      <el-button type="primary" @click="addUser">新增</el-button>
      <el-button>重置</el-button>
    </div>
    <!-- 对话框开始 -->

    <el-dialog
      :title="duiFlag ? '会员添加' : '会员编辑'"
      :rules="rules"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="会员卡号">
          <el-input v-model="form.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日">
          <el-date-picker
            v-model="form.birthday"
            align="right"
            type="date"
            placeholder="会员生日"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额">
          <el-input v-model="form.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分">
          <el-input v-model="form.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型">
          <!-- <el-input v-model="" autocomplete="off"></el-input> -->
          <el-select v-model="form.payType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 对话框结束 -->
    <!-- 表格开始 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.payType == 1">现金</el-tag>
          <el-tag type="success" v-if="scope.row.payType == 2">微信</el-tag>
          <el-tag type="info" v-if="scope.row.payType == 3">支付宝</el-tag>
          <el-tag type="warning" v-if="scope.row.payType == 4">银行卡</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
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
export default {
  name: "",
  components: {},
  data() {
    return {
      duiFlag: false, //对话框操作
      total: null, //总页数
      size: 10, //条数
      currentPage4: 1, //页数
      duiId: "", //存储对话框id
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      tableData: [], //表格数据
      dialogFormVisible: false, //对话框值
      form: {
        name: "", //会员姓名
        cardNum: "", //会员卡号
        birthday: "", //会员生日
        phone: "", //手机号码
        money: "", //开卡金额
        integral: "", //可用积分
        payType: "", //支付类型
        address: "", //会员地址
        id: null,
      },
      options: [
        {
          value: "现金",
          label: "现金",
        },
        {
          value: "微信",
          label: "微信",
        },
        {
          value: "支付宝",
          label: "支付宝",
        },
        {
          value: "银行卡",
          label: "银行卡",
        },
      ],
      value: "", //¶Select 选择器
      member: "", //会员卡号
      memberName: "", //会员名字
      time: "", //存储时间
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.DataS();
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size=val
      this.DataS();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4=val
      this.DataS();
    },
    //查询事件
    queryData() {
      this.DataS();
    },
    //重置数据
    DataS() {
      this.$axios.post(`/member/list/search/1/20`).then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },
    //点击新增出现
    addUser() {
      this.form = [];
      this.duiFlag = true;
      this.dialogFormVisible = true;
    },
    //新增
    addData() {
      this.dialogFormVisible = false;
      if (this.duiFlag) {
        this.$axios.post(`/member?${this.form}`).then((res) => {
          console.log(res);
        });
      } else {
        this.$axios
          .post(`/member?${this.duiId}`, { data: this.form })
          .then((res) => {
            console.log(res);
          });
      }
      this.form = [];
    },
    //编辑
    handleEdit(index, row) {
      this.duiFlag = false;
      this.dialogFormVisible = true;
      console.log(index, row);
      this.duiId = row.id;
      this.form = row;
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
