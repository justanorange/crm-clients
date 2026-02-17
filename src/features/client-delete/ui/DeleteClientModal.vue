<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import type { Client } from '@/entities/client';

defineProps<{
  modelValue: boolean;
  client: Client | null;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
  'cancel': [];
  'confirm': [];
}>();
</script>

<template>
  <Dialog
    :visible="modelValue"
    header="Удалить клиента"
    :modal="true"
    class="max-w-100 w-full"
    @update:visible="$emit('update:modelValue', $event)"
  >
    <p class="mb-2">Клиент "{{ client?.name }}" будет удалён.</p>
    <p class="text-sm text-gray-500 mb-6">Это действие нельзя отменить.</p>

    <template #footer>
      <Button label="Отмена" severity="secondary" @click="$emit('cancel')" />
      <Button label="Удалить" severity="danger" @click="$emit('confirm')" />
    </template>
  </Dialog>
</template>
