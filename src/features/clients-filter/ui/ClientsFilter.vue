<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import Card from 'primevue/card';

const search = defineModel<string>('search');
const status = defineModel<string>('status');

const emit = defineEmits(['reset']);

const statusOptions = [
  { label: 'Все', value: '' },
  { label: 'Новый', value: 'new' },
  { label: 'Активный', value: 'active' },
  { label: 'Заблокирован', value: 'blocked' },
];
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
            v-model.trim="search"
            class="w-full"
          />
        </div>
        <div class="w-40">
          <label class="block text-sm font-medium mb-2" for="status">Статус</label>
          <Select
            id="status"
            v-model="status"
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
            :disabled="!search && !status"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
