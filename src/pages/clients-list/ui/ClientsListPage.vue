<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';

import { useClientStore, type Client } from '@/entities/client';
import { useFilterStore } from '../model/filterStore';
import ClientsFilter from '@/features/clients-filter/ui/ClientsFilter.vue';
import ClientsTable from '@/features/clients-list/ui/ClientsTable.vue';
import DeleteClientModal from '@/features/client-delete/ui/DeleteClientModal.vue';


const store = useClientStore();
const filterStore = useFilterStore();
const toast = useToast();
const router = useRouter();

const showDeleteConfirm = ref(false);
const currentClient = ref<Client | null>(null);

const filteredClients = computed(() => {
  return store.clients.filter(c => {
    const matchSearch =
      !filterStore.search ||
      c.name.toLowerCase().includes(filterStore.search.toLowerCase()) ||
      c.email.toLowerCase().includes(filterStore.search.toLowerCase());
    const matchStatus = !filterStore.statusFilter || c.status === filterStore.statusFilter;
    return matchSearch && matchStatus;
  });
});

onMounted(() => {
  store.fetchClients();

  if (router.currentRoute.value.query.success) {
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Пользователь сохранен',
      life: 3000,
    });
    router.replace({
      query: {
        ...router.currentRoute.value.query,
        success: undefined,
      }
    });
  }
});

const resetFilters = () => {
  filterStore.resetFilters();
};

const editClient = (client: Client) => {
  router.push(`/clients/${client.id}/edit`);
};

const deleteClient = (client: Client) => {
  currentClient.value = client;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  if (!currentClient.value) return;
  try {
    await store.deleteClient(currentClient.value.id);
    toast.add({
      severity: 'success',
      summary: 'Удалено',
      detail: 'Клиент удален',
      life: 3000,
    });
    showDeleteConfirm.value = false;
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
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold min-h-10.5">Клиенты</h1>
    <Button 
      v-if="store.clients.length > 0"
      icon="pi pi-plus"
      label="Создать клиента"
      @click="$router.push('/clients/new')"
    />
  </div>

  <ClientsFilter
    :search="filterStore.search"
    :status-filter="filterStore.statusFilter"
    @update:search="filterStore.search = $event"
    @update:status="filterStore.statusFilter = $event"
    @reset="resetFilters"
    class="mb-4"
  />

  <ClientsTable
    v-if="filteredClients.length > 0 && store.clients.length > 0"
    :clients="filteredClients"
    :loading="store.isLoading"
    @edit="editClient"
    @delete="deleteClient"
  />

  <div v-if="store.isLoading" class="text-center py-8">
    <ProgressSpinner />
  </div>

  <div v-if="!store.isLoading && store.clients.length === 0" class="text-center py-8 text-gray-500">
    <div>Пока ни одного клиента не создано</div>
    <div>
      <Button
        label="Создать клиента"
        severity="primary"
        class="mt-4"
        @click="$router.push('/clients/new')"
      />
    </div>
  </div>

  <div v-else-if="!store.isLoading && filteredClients.length === 0 && store.clients.length > 0" class="text-center py-8 text-gray-500">
    Клиентов, удовлетворяющих фильтрам, не найдено
  </div>

  <DeleteClientModal
    :model-value="showDeleteConfirm"
    :client="currentClient"
    @update:model-value="showDeleteConfirm = $event"
    @cancel="showDeleteConfirm = false"
    @confirm="confirmDelete"
  />

  <Toast />
</template>
