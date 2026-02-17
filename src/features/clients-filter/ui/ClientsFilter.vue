<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useDebounceFn } from '@vueuse/core';

defineProps<{
  search: string;
  statusFilter: string;
}>();

const emit = defineEmits<{
  'update:search': [value: string];
  'update:status': [value: string];
  'reset': [];
}>();

const statusOptions = [
  { label: 'Все', value: '' },
  { label: 'Новый', value: 'new' },
  { label: 'Активный', value: 'active' },
  { label: 'Заблокирован', value: 'blocked' },
];

const handleSearch = useDebounceFn((value: string | undefined) => {
  const trimmedValue = value?.trim() || '';
  
  if (trimmedValue.length <= 1) {
    emit('update:search', '');
  } else {
    emit('update:search', trimmedValue);
  }
}, 500);
</script>

<template>
  <Card>
    <template #content>
      <div class="flex gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-medium mb-2" for="search">Поиск</label>
          <InputText
            id="search"
            placeholder="Имя или email"
            :model-value="search"
            @update:model-value="handleSearch($event)"
            class="w-full"
          />
        </div>
        <div class="w-40">
          <label class="block text-sm font-medium mb-2" for="status">Статус</label>
          <Select
            id="status"
            :model-value="statusFilter"
            @update:model-value="$emit('update:status', $event)"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Все"
            class="w-full"
          />
        </div>
        <div>
          <Button
            label="Сбросить"
            severity="secondary"
            icon="pi pi-times"
            @click="$emit('reset')"
            class="w-full"
            :disabled="!search && !statusFilter"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
