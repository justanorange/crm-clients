<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useClientStore } from '@/entities/client';
import { useRouter, useRoute } from 'vue-router';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import Card from 'primevue/card';

import ClientForm from '@/features/client-form/ui/ClientForm.vue';
import type { Client, UpdateClientDTO } from '@/entities/client';

const store = useClientStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const client = ref<Client | null>(null);

onMounted(async () => {
  const id = Number(route.params.id);
  loading.value = true;
  try {
    client.value = await store.fetchClient(id);
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Клиент не найден',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
});

const updateClient = async (data: UpdateClientDTO) => {
  if (!client.value) return;
  try {
    await store.updateClient(client.value.id, data);
    router.push('/clients?success=true')
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: store.error,
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="p-6 max-w-2xl">
    <Button
      variant="link"
      icon="pi pi-arrow-left"
      label="Назад"
      @click="$router.back()"
      class="mb-4"
    />

    <div v-if="loading" class="text-center py-8">
      <ProgressSpinner />
    </div>
    
    <div v-else-if="store.error || !client" class="text-center py-8 text-red-500">
      {{ store.error || 'Клиент не найден' }}
    </div>

    <Card v-else>
      <template #title>
        <h1 class="text-3xl font-bold mb-6">{{ client.name }}</h1>
      </template>
      <template #content>
        <ClientForm :client="client" @save="updateClient" />
      </template>
    </Card>

    <Toast />
  </div>
</template>
