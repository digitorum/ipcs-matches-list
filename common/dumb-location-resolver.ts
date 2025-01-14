type TDict = {
  description: string;
  city: string;
  country: string;
}

const locations: TDict[] = [
  {
    description: 'Russia, Кострома, г. Кострома мкр. Давыдовский - 3, д, 17',
    city: 'Кострома',
    country: 'Россия'
  },
  {
    description: 'Russia, Санкт-Петербург, Лен.обл.,Ломоносовский р-н. Виллозкоое г.п., терр. ССК "Русское Оружие" д.6',
    city: 'Санкт-Петербург',
    country: 'Россия'
  },
  {
    description: 'Russia, Москва, г. Москва, ул. Генерала Белова,26',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Russia, Магнитогорск',
    city: 'Магнитогорск',
    country: 'Россия'
  },
  {
    description: 'Russia, Москва, 3-я Хорошовская ул, д.7 стр.2 АНО ДПО "РАЗВИТИЕ" Стрелковый Клуб PRO-ТИР.',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Belarus, Минск, тир РССК ДОСААФ',
    city: 'Минск',
    country: 'Беларусь'
  },
  {
    description: 'Russia, Москва, Сельскохозяйственная 20 к 3',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Russia, Видное, МО, Ленинский р-он, г. Видное, ул. Школьная, 79 Д',
    city: 'Видное',
    country: 'Россия'
  },
  {
    description: 'Russia, Москва, МО г. Дзержинский, ул. Энергетиков 50, СК "Объект"',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Russia, Салехард, Зои Космодемьянской, д. 55',
    city: 'Салехард',
    country: 'Россия'
  },
  {
    description: 'Russia, Ярославль, г. Ярославль, ул.Менделеева 4а',
    city: 'Ярославль',
    country: 'Россия'
  },
  {
    description: 'Kazakhstan, Алматинская область, УТС Кайсар г Конаев',
    city: 'Конаев',
    country: 'Казахстан'
  },
  {
    description: 'Russia, Краснодар, Краснодарский край, Северский район, ст.Григорьевская, ул. Шоссейная, 6 Загородное стрельбище КУ МВД России',
    city: 'Краснодар',
    country: 'Россия'
  },
  {
    description: 'Russia, Краснодар, ст. Григорьевская, Загородное стрельбище КУ МВД России',
    city: 'Краснодар',
    country: 'Россия'
  },
  {
    description: 'Belarus, Минск, тир ДОСААФ',
    city: 'Минск',
    country: 'Беларусь'
  },
  {
    description: 'Russia, Москва, Видеоконференция Zoom',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Russia, Владикавказ, Стрельбище УТЦ Тактика-А',
    city: 'Владикавказ',
    country: 'Россия'
  },
  {
    description: 'Russia, Краснодар, г. Краснодар, ул. Аэродромная, 132, ССК "Сокол"',
    city: 'Краснодар',
    country: 'Россия'
  },
  {
    description: 'Kazakhstan, Алматы, полигон Айтей',
    city: 'Алматы',
    country: 'Казахстан'
  },
  {
    description: 'Russia, г. Сергиев Посад, https://sskdonskoy.ru/',
    city: 'Сергиев Посад',
    country: 'Россия'
  },
  {
    description: 'Russia, Санкт-Петербург, Лен.обл.,Ломоносовский р-н.,Виллозское г.п., терр.ССК "Русское Оружие" д.2 лит.А',
    city: 'Санкт-Петербург',
    country: 'Россия'
  },
  {
    description: 'Russia, Moscow, СCК Мастер, Андроньевская пл. 10А, Москва, Russia',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Belarus, Minsk, тир РССК ДОСААФ',
    city: 'Минск',
    country: 'Беларусь'
  },
  {
    description: 'Russia, Москва',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Russia, Московская область, Серпуховский район, деревня Большая Городня, АНО ДПО "ЦС ФПС"',
    city: 'Большая Городня',
    country: 'Россия'
  },
  {
    description: 'Russia, Салехард, Республики 123',
    city: 'Салехард',
    country: 'Россия'
  },
  {
    description: 'Russia, Московская область, Серпуховский район, деревня Большая Городня, АНО ДПО "СШ"ЦС ФПС"',
    city: 'Большая Городня',
    country: 'Россия'
  },
  {
    description: 'Спортивная школа Пяти Колец Новогорск',
    city: 'Новогорск',
    country: 'Россия'
  },
  {
    description: 'СКК "ОБъект"',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Москва',
    city: 'Москва',
    country: 'Россия'
  },
  {
    description: 'Russia, Салехард, ул Зои Космодемьянской, д 72 кв 13',
    city: 'Салехард',
    country: 'Россия'
  },
  {
    description: 'Kazakhstan, г.Алматы, Улица Наурызбай батыра, 93/79а',
    city: 'Алматы',
    country: 'Казахстан'
  },
  {
    description: 'Russia, Сосновый бор, ленинградская область, город Сосновый бор, копорское шоссе, д.21, корпус 1',
    city: 'Сосновый бор',
    country: 'Россия'
  },
  {
    description: 'Kazakhstan, г. Алматы, Коперника 130',
    city: 'Алматы',
    country: 'Казахстан'
  },
  {
    description: 'Kazakhstan',
    city: '-',
    country: 'Казахстан'
  },
  {
    description: 'Ялта',
    city: 'Ялта',
    country: 'Россия'
  }
]

const countries: string[][] = [
  ['Россия'],
  ['Russia', 'Россия'],
  ['Kazakhstan', 'Казахстан'],
  ['Казахстан'],
  ['Belarus', 'Беларусь'],
  ['Беларусь']
]

const cities: string[][] = [
  ['Minsk', 'Минск'],
  ['Moscow', 'Москва'],
  ['Алматы'],
  ['Большая Городня'],
  ['Видное'],
  ['Владикавказ'],
  ['Конаев'],
  ['Кострома'],
  ['Краснодар'],
  ['Магнитогорск'],
  ['Минск'],
  ['Москва'],
  ['Салехард'],
  ['Санкт-Петербург'],
  ['Сергиев Посад'],
  ['Сосновый бор'],
  ['Ярославль']
]

export class DumbLocationResolver {

  constructor(
    private location: string
  ) {
    
  }

  private find(dict: string[][]) {
    for (let i = 0; i < dict.length; ++ i) {
      const val = dict[i]

      if (!val) {
        return null
      }

      if (this.location.indexOf(val[0]) !== -1) {
        return val[1] ?? val[0]
      }
    }

    return null
  }

  public get dictionary(): TDict | null {
    return locations
      .filter((loc) => loc.description === this.location)[0] ?? null
  }

  public get city(): string | null {
    return this.dictionary?.city ?? this.find(cities)
  }

  public get country(): string | null {
    return this.dictionary?.country ?? this.find(countries)
  }

}