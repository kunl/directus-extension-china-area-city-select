import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
  id: 'china-area-city-select',
  name: "省市区录入",
  icon: "map",
  description: "中国行政区域录入",
  component: InterfaceComponent,
  options: null,
  group: 'selection',
  types: ['json'],
});
