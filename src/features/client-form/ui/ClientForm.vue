<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Select from 'primevue/select';
import Button from 'primevue/button';

import type { Client, ClientStatus, CreateClientDTO, UpdateClientDTO } from '@/entities/client';
import { useClientStore } from '@/entities/client';

const store = useClientStore();

const props = defineProps<{
  client: Client | null;
}>();

const emit = defineEmits<{
  'save': [data: CreateClientDTO | UpdateClientDTO];
  'cancel': [];
}>();

const form = ref<{
  name: string;
  email: string;
  phone: string;
  status: ClientStatus;
}>({
  name: '',
  email: '',
  phone: '',
  status: 'new',
});

const statusOptions = [
  { label: 'Новый', value: 'new' },
  { label: 'Активный', value: 'active' },
  { label: 'Заблокирован', value: 'blocked' },
];

const rules = {
  name: { required, minLength: minLength(2) },
  email: { required, email },
  phone: { required, minLength: minLength(11) },
  status: { required },
};

const v$ = useVuelidate(rules, form);

const isSubmitting = ref(false);
const hasSubmitted = ref(false);

watch(
  () => store.isLoading,
  (isLoading) => {
    if (!isLoading && isSubmitting.value) {
      isSubmitting.value = false;
      hasSubmitted.value = false;
    }
  }
);

onMounted(() => {
  if (props.client) {
    form.value = {
      name: props.client.name,
      email: props.client.email,
      phone: props.client.phone,
      status: props.client.status,
    };
  }
});

const handleSubmit = async () => {
  if (isSubmitting.value || hasSubmitted.value) {
    return;
  }
  
  hasSubmitted.value = true;
  const isFormCorrect = await v$.value.$validate();
  
  if (!isFormCorrect) {
    hasSubmitted.value = false;
    return;
  }

  isSubmitting.value = true;

  const data = {
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    status: form.value.status,
  };
  
  emit('save', data);
};
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-2">Имя *</label>
      <InputText
        v-model="form.name"
        placeholder="Имя от 2 до 100 символов"
        class="w-full"
        @blur="v$.name.$touch()"
        :class="{ 'border-red-500': v$.name.$error }"
      />
      <small class="text-red-500" v-if="v$.name.$error">
        <span v-if="v$.name.required.$invalid">Поле обязательно</span>
        <span v-if="v$.name.minLength.$invalid">Минимум 2 символа</span>
      </small>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Email *</label>
      <InputText
        v-model="form.email"
        type="email"
        placeholder="example@email.com"
        class="w-full"
        @blur="v$.email.$touch()"
        :class="{ 'border-red-500': v$.email.$error }"
      />
      <small class="text-red-500" v-if="v$.email.$error">
        <span v-if="v$.email.required.$invalid">Поле обязательно</span>
        <span v-if="v$.email.email.$invalid">Некорректный email</span>
      </small>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Телефон *</label>
      <InputMask
        v-model="form.phone"
        mask="+7 (999) 999-99-99"
        placeholder="+7 (900) 123-45-67"
        class="w-full"
        @blur="v$.phone.$touch()"
        :class="{ 'border-red-500': v$.phone.$error }"
      />
      <small class="text-red-500" v-if="v$.phone.$error">
        <span v-if="v$.phone.required.$invalid">Поле обязательно</span>
        <span v-if="v$.phone.minLength.$invalid">Некорректный телефон</span>
      </small>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Статус *</label>
      <Select
        v-model="form.status"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        class="w-full"
        @blur="v$.status.$touch()"
      />
      <small class="text-red-500" v-if="v$.status.$error">
        <span v-if="v$.status.required.$invalid">Поле обязательно</span>
      </small>
    </div>

    <div class="flex gap-2 justify-end pt-4">
      <Button
        label="Отмена"
        severity="secondary"
        icon="pi pi-times"
        @click="$emit('cancel')"
        :disabled="isSubmitting || store.isLoading"
      />
      <Button
        label="Сохранить"
        severity="primary"
        icon="pi pi-check"
        @click="handleSubmit"
        :disabled="isSubmitting || store.isLoading"
      />
    </div>
  </div>
</template>
