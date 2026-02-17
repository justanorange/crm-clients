import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterStore = defineStore(
  'filters',
  () => {
    const search = ref('');
    const statusFilter = ref('');

    const resetFilters = () => {
      search.value = '';
      statusFilter.value = '';
    };

    return {
      search,
      statusFilter,
      resetFilters,
    };
  },
  {
    persist: true,
  }
);
