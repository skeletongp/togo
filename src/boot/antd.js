import { boot } from "quasar/wrappers";
import {
  Drawer,
  Button,
  Menu,
  MenuItem,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Popconfirm,
  UploadDragger,
  Upload,
  Empty,
  Calendar,
} from "ant-design-vue";
console.log("booting antd.js");

export default boot(async ({ app, router }) => {
  app.component(Drawer.name, Drawer);
  app.component(Button.name, Button);
  app.component(Menu.name, Menu);
  app.component(MenuItem.name, MenuItem);
  app.component(Input.name, Input);
  app.component(Select.name, Select);
  app.component(DatePicker.name, DatePicker);
  app.component(InputNumber.name, InputNumber);
  app.component(Popconfirm.name, Popconfirm);
  app.component(UploadDragger.name, UploadDragger);
  app.component(Upload.name, Upload);
  app.component(Calendar.name, Calendar);
  app.use(Empty);
});
