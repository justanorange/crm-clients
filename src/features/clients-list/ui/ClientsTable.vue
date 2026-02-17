<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

import type { Client } from '@/entities/client';

defineProps<{
  clients: Client[];
  loading: boolean;
}>();

defineEmits<{
  'edit': [client: Client];
  'delete': [client: Client];
}>();

const statusLabel = (status: string) => {
  const labels: Record<string, string> = {
    new: 'Новый',
    active: 'Активный',
    blocked: 'Заблокирован',
  };
  return labels[status] || status;
};

const statusSeverity = (status: string) => {
  const severity: Record<string, string> = {
    new: 'info',
    active: 'success',
    blocked: 'danger',
  };
  return severity[status] || 'secondary';
};
</script>

<template>
  <div>
    <DataTable
      :value="clients"
      :loading="loading"
      responsive-layout="scroll"
      striped-rows
      paginator
      :rows="10"
      :rows-per-page-options="[5, 10, 20]"
    >
      <Column field="name" header="Имя" sortable></Column>
      <Column field="email" header="Email" sortable class="whitespace-nowrap"></Column>
      <Column field="phone" header="Телефон" sortable class="whitespace-nowrap"></Column>
      <Column field="status" header="Статус" sortable>
        <template #body="slotProps">
          <Tag
            :value="statusLabel(slotProps.data.status)"
            :severity="statusSeverity(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column header="Действия">
        <template #body="slotProps">
          <div class="flex place-content-center gap-1">
            <Button
              icon="pi pi-pencil"
              severity="secondary"
              rounded
              text
              @click="$emit('edit', slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              rounded
              text
              @click="$emit('delete', slotProps.data)"
            />
            </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
