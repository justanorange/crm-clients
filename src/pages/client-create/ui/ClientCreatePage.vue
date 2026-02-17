<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useClientStore } from '@/entities/client';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Card from 'primevue/card';

import ClientForm from '@/features/client-form/ui/ClientForm.vue';
import type { CreateClientDTO, UpdateClientDTO } from '@/entities/client';

const store = useClientStore();
const toast = useToast();
const router = useRouter();

const saveClient = async (data: CreateClientDTO | UpdateClientDTO) => {
  try {
    await store.createClient(data as CreateClientDTO);
    router.push('/clients?success=true')
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: store.error || 'Не удалось создать клиента',
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="p-6 max-w-2xl">
    <Button variant="link" icon="pi pi-arrow-left" label="Назад" @click="$router.back()" />
    <Card>
      <template #title>
        <h1 class="text-3xl font-bold mb-6">Новый клиент</h1>
      </template>
      <template #content>
        <ClientForm :client="null" @save="saveClient" @cancel="$router.back()" />
      </template>
    </Card>
  </div>
</template>
