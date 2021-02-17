let ru = {
    language: "Русский",
    app: {
        components: {
            main: {
                selected_salon: "Выбранный салон"
            },
            dashboard: {
                title: "Dashboard"
            },
            login: {
                head_title: "CRM cистема для грумеров, которая поможет вам вывести бизнес на новый уровень.",
                title: "Панель управления",
                username: "Логин",
                password: "Пароль",
                login: "Войти",
                reset_password: "Восстановить пароль",
            },
            services: {
                create: "Создать услугу",
                update: "Обновить услугу",
                field: {
                    name: 'Название',
                    description: 'Описание',
                    price: 'Цена, от',
                    type: 'Тип',
                    duration: 'Продолжительность, мин',
                    image: 'Фото',
                }
            },
            settings: {
                name: 'Название',
                phone: 'Телефон',
                site: 'Сайт',
                email: 'Email',
                schedule_step: 'Шаг расписания, мин',
                timezone: 'Временная зона',
                lang: 'Язык',
            },
        },
        titles: {
            home: {
                dashboard: 'Dashboard',
                calendar: 'Календарь',
                masters: 'Мастера',
                orders: 'Записи',
                salons: 'Салоны',
                services: 'Услуги',
                promotions: 'Акции',
                settings: 'Настройки',
            }
        },
        base: {
            create: 'Создать'
        }
    },
    base: {
        validation: {
            file_to_large: "Файл слишком большой"
        },
        months: {
            1: "Январь",
            2: "Февраль",
            3: "Март",
            4: "Апрель",
            5: "Май",
            6: "Июнь",
            7: "Июль",
            8: "Август",
            9: "Сентябрь",
            10: "Октябрь",
            11: "Ноябрь",
            12: "Декабрь",
        },
        save: 'Сохранить',
        create: 'Создать',
        update: 'Обновить',
        service_types: {
            select: 'Выбрать..',
            cat: 'Кошка',
            dog: 'Собака',
            other: 'Другое',
        }
    }
}

export default ru
