<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="matches"
      :items-per-page="-1"
      hide-default-footer
      density="compact">
      <template v-slot:item.dates="{ value }">
        {{ value.start }}<template v-if="value.end"> - {{ value.end }}</template>
      </template>
      
      <template v-slot:item.match="{ value }">
        <a
          :href="value.url"
          target="_blank">
          {{ value.title }}
        </a>

        <v-tooltip
          v-if="value.level"
          text="Уровень"
          location="top">
          <template v-slot:activator="{ props }">
            <v-chip
              :color="getLevelColor(value.level)"
              class="ms-2"
              density="comfortable"
              size="small"
              v-bind="props"
              variant="flat">
              {{ value.level }}
            </v-chip>
          </template>
        </v-tooltip>

        <v-tooltip
          v-if="value.exercisesCount"
          text="Количество упражнений"
          location="top">
          <template v-slot:activator="{ props }">
            <v-chip
              v-bind="props"
              class="ms-2"
              color="grey-lighten-2"
              density="comfortable"
              size="small"
              variant="flat">
              <v-icon icon="mdi-counter" start></v-icon>
              {{ value.exercisesCount }}
            </v-chip>
          </template>
        </v-tooltip>

        <v-tooltip
          v-if="value.minimumShots"
          text="Количество выстрелов (минимум)"
          location="top">
          <template v-slot:activator="{ props }">
            <v-chip
              v-bind="props"
              class="ms-2"
              color="grey-lighten-2"
              density="comfortable"
              size="small"
              variant="flat">
              <v-icon icon="mdi-ammunition" start></v-icon>
              {{ value.minimumShots }}
            </v-chip>
          </template>
        </v-tooltip>
          
      </template>

      <template v-slot:item.price="{ value }">
        <template v-if="value.raw">
          <v-tooltip
            :text="value.raw"
            location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props">
                {{ value.value }}
              </div>
            </template>
          </v-tooltip>
        </template>
        <template v-else>
          {{ value.value }}
        </template>
      </template>

      <template v-slot:item.city="{ value }">
        <v-tooltip
          :text="value.location"
          location="left">
          <template v-slot:activator="{ props }">
            <div v-bind="props">
              {{ value.name }}
            </div>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { cutspace } from '../lib/string';

  const { data } = await useFetch<Site.Api.IMatchesListResponse>('/api/matches-list')

  const headers = [
    { title: 'Дата', value: 'dates', sortable: true, sort: sortByHiddenValue },
    { title: 'Мероприятие', value: 'match', sortable: false },
    { title: 'Cтоимость', value: 'price', sortable: false, align: 'end' as const },
    { title: 'Место проведения', value: 'city', sortable: true, sort: sortByHiddenValue }
  ]

  function getLevelColor(level: number) {
    if (level >=3) {
      return 'green-darken-4'
    } else if (level === 2) {
      return 'light-green-darken-4'
    }

    return 'lime-darken-4'
  }

  function sortByHiddenValue<T extends { sort: any; }>(a: T, b: T) {
    if (a.sort > b.sort) {
      return 1
    } else if (a.sort < b.sort) {
      return -1
    }

    return 0
  }

  function datetimeToDate(date: string | null) {
    if (!date) {
      return null
    }

    return date
      .split('-')
      .reverse()
      .join('.')
  }

  const matches = computed(() => {
    return data.value?.matches.map((match) => {
      const price = cutspace(match.price, 20)

      return {
        dates: {
          sort: match.startDate,
          start: datetimeToDate(match.startDate),
          end: datetimeToDate(match.endDate)
        },
        match: {
          level:  match.level,
          title: match.name,
          url: match.url,
          exercisesCount: match.exercisesCount,
          minimumShots: match.minimumShots
        },
        price: {
          raw: match.price === price 
            ? null
            : match.price,
          value: price
        },
        city: {
          sort:  match.location.city?.name ?? '',
          name: match.location.city?.name ?? '...',
          location: match.location.description
        }
      }
    }) ?? []
  })

</script>