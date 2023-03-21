<template>

  <div class="v-city-select">
    <div class="select-item">
      <CitySelect
        :items="getChild(0)"
        :modelValue="modelData.Province"
        @update:modelValue="onChange($event, 'Province')"
      />
    </div>

    <div class="select-item">
      <CitySelect
        :items="getChild(modelData.Province)"
        :modelValue="modelData.City"
        @update:modelValue="onChange($event, 'City')"
      />
    </div>
    <div class="select-item">
      <CitySelect
        :items="getChild(modelData.City)"
        :modelValue="modelData.District"
        @update:modelValue="onChange($event, 'District')"
      />
    </div>
    <div class="select-item">
      <CitySelect
        :items="getChild(modelData.District)"
        :modelValue="modelData.Village"
        @update:modelValue="onChange($event, 'Village')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, PropType } from "vue";
import CitySelect from "./select.vue";
import  { getChild, getItem } from "./build_city_list";

type Types = 'Province' | 'City' | 'District' | 'Village'
interface CityData {
  id: number;
  name: string;
}

interface CityDataValue {
  Province: CityData | null;
  City: CityData | null;
  District: CityData | null;
  Village: CityData | null;
}

const props = defineProps({
  value: {
    type: Object as PropType<CityDataValue>,
    default: null,
  },

  width: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  collection: {
    type: String,
    default: null,
  },
  field: {
    type: String,
    default: null,
  },
  primaryKey: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["input"]);


const modelData = reactive({
  Province: -1,
  City: -1,
  District: -1,
  Village: -1,
});

const select: CityDataValue = reactive({
  Province: null as any as CityData,
  City: null as any as CityData,
  District: null as any as CityData,
  Village: null as any as CityData,
});

 

const onChange = (id: number, type: Types) => {
  console.log(id, type);
  modelData[type] = id;

  if (type === "Province") {
    modelData.City = -1;
    modelData.District = -1;
    modelData.Village = -1;

    select.Province = getItem(id);
    select.City = null;
    select.District = null;
    select.Village = null;
  }
  if (type === "City") {
    modelData.District = -1;
    modelData.Village = -1;

    select.City = getItem(id);
    select.District = null;
    select.Village = null;
  }

  if (type === "District") {
    modelData.Village = -1;

    select.District = getItem(id);
    select.Village = null;
  }
  if (type === "Village") {
    select.Village = getItem(id);

	console.log(select);
    emit("input", select);
  }
};

onMounted(() => {
  
  if (props.type === 'json' && props.value) {
    if (props.value.Province) {
      select.Province = props.value.Province;
	  modelData.Province = props.value.Province.id;
    }
    if (props.value.City) {
      select.City = props.value.City;
	  modelData.City = props.value.City.id;
    }
    if (props.value.District) {
      select.District = props.value.District;
	  modelData.District = props.value.District.id;
    }
    if (props.value.Village) {
      select.Village = props.value.Village;
	  modelData.Village = props.value.Village.id;
    }
  }

 
});
</script>
<style>
.v-city-select {
  display: flex;
}
.v-city-select .select-item {
  flex: 1;
  padding: 0 2px;
}
 
</style>
