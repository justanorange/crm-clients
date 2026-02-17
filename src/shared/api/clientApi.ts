import type { Client, CreateClientDTO, UpdateClientDTO } from '@/entities/client';
import defaultClientsData from '@/shared/data/defaultClients.json';

const DELAY = 1000;

const defaultClients: Client[] = defaultClientsData as Client[];
let clients: Client[] = [...defaultClients];

const delay = () => new Promise(resolve => setTimeout(resolve, DELAY));

export const clientApi = {
  async fetchClients() {
    await delay();
    return { data: clients, total: clients.length };
  },

  async fetchClient(id: number) {
    await delay();
    const client = clients.find(c => c.id === id);
    if (!client) throw new Error('Client not found');
    return client;
  },

  async createClient(data: CreateClientDTO) {
    await delay();
    const id = Math.max(0, ...clients.map(c => c.id)) + 1;
    const newClient: Client = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: data.status || 'new',
      createdAt: new Date().toISOString(),
    };
    clients.push(newClient);
    return newClient;
  },

  async updateClient(id: number, data: UpdateClientDTO): Promise<Client> {
    await delay();
    let client = clients.find(c => c.id === id);
    if (!client) throw new Error('Client not found');

    client = {
      id: client.id,
      name: data.name ?? client.name,
      email: data.email ?? client.email,
      phone: data.phone ?? client.phone,
      status: data.status ?? client.status,
      createdAt: client.createdAt,
    };
    return client;
  },

  async deleteClient(id: number) {
    await delay();
    const idx = clients.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Client not found');
    clients.splice(idx, 1);
  },
};
