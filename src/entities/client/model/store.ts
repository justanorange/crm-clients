import { defineStore } from 'pinia';
import { ref } from 'vue';

import { clientApi } from '@/shared/api/clientApi';
import type { Client, CreateClientDTO, UpdateClientDTO } from '../types';

export const useClientStore = defineStore('clients', () => {
  const clients = ref<Client[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchClients() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await clientApi.fetchClients();
      clients.value = response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки клиентов';
      console.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchClient(id: number): Promise<Client> {
    try {
      return await clientApi.fetchClient(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Клиент не найден';
      console.error(error.value);
      throw err;
    }
  }

  async function createClient(data: CreateClientDTO) {
    isLoading.value = true;
    error.value = null;

    try {
      const newClient = await clientApi.createClient(data);
      return newClient;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка создания клиента';
      console.error(error.value);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateClient(id: number, data: UpdateClientDTO): Promise<Client> {
    isLoading.value = true;
    error.value = null;

    try {
      const updatedClient = await clientApi.updateClient(id, data);
      const client = clients.value.find(c => c.id === id);
      if (client) {
        Object.assign(client, updatedClient);
      }
      return updatedClient;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка обновления клиента';
      console.error(error.value);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteClient(id: number) {
    isLoading.value = true;
    error.value = null;

    try {
      await clientApi.deleteClient(id);
      clients.value = clients.value.filter(c => c.id !== id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка удаления клиента';
      console.error(error.value);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    clients,
    isLoading,
    error,

    fetchClients,
    fetchClient,
    createClient,
    updateClient,
    deleteClient,
  };
});
