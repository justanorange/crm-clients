<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import type { Client } from '@/entities/client';

const model = defineModel ({
  type: Boolean,
  required: true,
});

defineProps<{
  client: Client | null;
}>();

defineEmits<{
  'cancel': [];
  'confirm': [];
}>();
</script>

<template>
  <Dialog
    :visible="model"
    header="Удалить клиента"
    :modal="true"
    class="max-w-100 w-full"
    v-model="model"
  >
    <p class="mb-2">Клиент "{{ client?.name }}" будет удалён.</p>
    <p class="text-sm text-gray-500 mb-6">Это действие нельзя отменить.</p>

    <template #footer>
      <Button label="Отмена" severity="secondary" @click="$emit('cancel')" />
      <Button label="Удалить" severity="danger" @click="$emit('confirm')" />
    </template>
  </Dialog>
</template>
