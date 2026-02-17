export type ClientStatus = 'new' | 'active' | 'blocked';

export interface Client {
  id: number
  name: string
  email: string
  phone: string
  status: ClientStatus
  createdAt: string
}

export interface CreateClientDTO {
  name: string
  email: string
  phone: string
  status?: ClientStatus
}

export interface UpdateClientDTO {
  name?: string
  email?: string
  phone?: string
  status?: ClientStatus
}

export interface ClientsListResponse {
  data: Client[]
  total: number
}
