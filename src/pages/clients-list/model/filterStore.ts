import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterStore = defineStore(
  'filters',
  () => {
    const search = ref('');
    const status = ref('');

    const resetFilters = () => {
      search.value = '';
      status.value = '';
    };

    return {
      search,
      status,
      resetFilters,
    };
  },
  {
    persist: true,
  }
);
