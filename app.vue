<template>
  <div>
    <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
    <Menubar :model="menus" class="mb-2" />
    <div class="flex flex-wrap justify-center ">
      <Card style="width: 25rem; overflow: hidden ;" class="m-3" v-for="noticia in noticias" :key="noticia.title">
        <template #header>
          <img alt="imagem noticia" :src="noticia.image" />
        </template>
        <template #title>{{ noticia.title }}</template>
        <template #subtitle></template>
        <template #content>
          <p class="m-0">
            {{ noticia.descr }}
          </p>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button as="a" label="Acessar" class="w-full" :href="noticia.link" target="_blank">
            </Button>
          </div>
        </template>
      </Card>
    </div>

  </div>
</template>
<script setup lang="ts">
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
interface Noticia {
  title: string
  link: string
  image: string
  descr: string
}

const category = ref(null)
const noticias = ref<Noticia[]>([])
const isLoading = ref(false)
const menus = [
  {
    label: 'Novidades',
    icon: '',
    command: () => category.value = null
  },
  {
    label: 'Ciber Ataque',
    icon: '',
    command: () => category.value = 'ciberataque'
  },
  {
    label: 'Ciber Crime',
    icon: '',
    command: () => category.value = 'cibercrime'
  },
  {
    label: 'Cloud Security',
    icon: '',
    command: () => category.value = 'cloud-security'
  }
]
const getList = async () => {
  try {
    isLoading.value = true
    noticias.value = []
    const { data } = await useFetch('/api/noticias', {
      query: {
        category
      }
    })
    noticias.value = data.value
  } catch (error) {

  } finally {
    isLoading.value = false
  }
}

watch(category, async () => {
  await getList()
})


onMounted(async () => {
  await getList()
})

</script>
<style>
.mb-2 {
  margin-bottom: 2rem;
}

.mx-2 {
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>