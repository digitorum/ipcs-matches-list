<template>
    <UTable
      :columns="columns"
      :rows="matches">
    
      <template #date-data="{ row }">
        {{ row.dateDiapason }}
      </template>

      <template #match-data="{ row }">
        <ULink
          :to="row.url"
          target="_blank">
          {{ row.name }}
        </ULink>
        
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
      </template>

      <template #price-data="{ row }">
        <template v-if="row.rawPrice">
          <UTooltip
            :text="row.rawPrice">
            {{ row.price }}
          </UTooltip>
        </template>
        <template v-else>
          {{ row.price }}
        </template>
      </template>

      <template #city-data="{ row }">
        <UTooltip
          :text="row.location">
          {{ row.city }}
        </UTooltip>
      </template>
    </UTable>
</template>

<script setup lang="ts">
  
import { cutspace } from '../lib/string';

const { data } = await useFetch<Site.Api.IMatchesListResponse>('/api/matches-list')

const columns =  [
  { label: 'Дата', key: 'date', sortable: true },
  { label: 'Мероприятие', key: 'match', sortable: false },
  { label: 'Cтоимость', key: 'price', sortable: false },
  { label: 'Место проведения', key: 'city', sortable: true}
]

const matches = computed(() => {
  return data.value?.matches.map((match) => {
    const price = cutspace(match.price, 20)

    return {
      date: new Date(match.startDate).getTime(), // поле для сортировки
      dateDiapason: getDate(match.startDate) + (match.endDate ? ` - ${getDate(match.endDate)}` : ''),
      level: match.level,
      name: match.name,
      url: match.url,
      exercisesCount: match.exercisesCount,
      minimumShots: match.minimumShots,
      rawPrice: match.price === price 
        ? null
        : match.price,
      price,
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