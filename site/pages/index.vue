<template>
  <UTable
    :columns="columns"
    :rows="matches"
    :ui="{
      td: {
        base: ''
      }
    }">
  
    <template #date-data="{ row }">
      {{ row.startDate }}<span
        v-if="row.endDate"
        class="hidden lg:inline"> - {{ row.endDate }}</span>
    </template>

    <template #match-data="{ row }">
      <div
        class="flex flex-col lg:flex-row">
        <div
          class="grow mr-2">
          <ULink
            :to="row.url"
            target="_blank">
            {{ row.name }}
          </ULink>
        </div>
        <div
          v-if="row.level || row.exercisesCount || row.minimumShots"
          class="whitespace-nowrap mt-2 lg:mt-0">
          <UTooltip
            v-if="row.level"
            text="Уровень">
            <UBadge
              :icon="`i-tabler-circle-number-${row.level}`"
              :ui="{ rounded: 'rounded-full' }"
              class="mr-2"
              color="primary"
              size="xs"
              variant="soft" />
          </UTooltip>
          <UTooltip
            v-if="row.exercisesCount"
            text="Количество упражнений">
            <UBadge
              :ui="{ rounded: 'rounded-full' }"
              class="mr-2"
              color="green"
              icon="i-tabler-file"
              size="xs"
              variant="soft">
              {{ row.exercisesCount }}
            </UBadge>
          </UTooltip>
          <UTooltip
            v-if="row.minimumShots"
            text="Количество выстрелов (минимум)">
            <UBadge
              :ui="{ rounded: 'rounded-full' }"
              class="mr-2"
              color="indigo"
              icon="i-tabler-sum"
              size="xs"
              variant="soft">
              {{ row.minimumShots }}
            </UBadge>
          </UTooltip>
        </div>
      </div>
    </template>

    <template #price-data="{ row }">
      <UTooltip
        :text="row.price">
        <span class="truncate overflow-hidden max-w-24">{{ row.price }}</span>
      </UTooltip>
    </template>

    <template #city-data="{ row }">
      <UTooltip
        :text="row.location">
        {{ row.city }}
      </UTooltip>
    </template>
  </UTable>
</template>

<script lang="ts">
  export default {
    name: 'HomePage'
  }
</script>

<script setup lang="ts">
const { data } = await useFetch<Site.Api.IMatchesListResponse>('/api/matches-list')

const columns =  [
  {
    label: 'Дата',
    key: 'date',
    sortable: true,
    class: 'min-w-24 lg:min-w-48'
  },
  {
    label: 'Мероприятие',
    key: 'match',
    sortable: false,
    class: 'min-w-72'
  },
  {
    label: 'Cтоимость',
    key: 'price',
    sortable: false
  },
  {
    label: 'Место',
    key: 'city',
    sortable: true
  }
]

const matches = computed(() => {
  return data.value?.matches.map((match) => {
    return {
      date: new Date(match.startDate).getTime(), // поле для сортировки
      startDate: getDate(match.startDate),
      endDate: match.endDate ? getDate(match.endDate) : '',
      level: match.level,
      name: match.name,
      url: match.url,
      exercisesCount: match.exercisesCount,
      minimumShots: match.minimumShots,
      price: match.price,
      city: match.location.city?.name ?? '...',
      location: match.location.description
    }
  }) ?? []
})

function getDate(date: string | null) {
  return date
    ?.split('T')[0]
    ?.split('-')
    ?.reverse()
    ?.join('.') ?? null
}

</script>