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
            salons: {
                create: "Создать салон",
                update: "Обновить салон",
                fields: {
                    address: 'Адрес'
                }
            },
            promotions: {
                create: "Создать акцию",
                update: "Обновить акцию",
                fields: {
                    name: "Заголок",
                    description: "Описание",
                    start: "Дата начала",
                    finish: "Дата конца",
                },
                statuses: {
                    expect: "Ожидает",
                    active: "Активна",
                    inactive: "Завершена",
                }
            },
            masters: {
                create: "Создать мастера",
                update: "Обновить мастера",
                fields: {
                    name: 'ФИО',
                    email: 'Email',
                    password: 'Пароль для входа',
                    password_confirmation: "Подтвердите пароль",
                    position: 'Должность',
                    photo: 'Фото',
                    schedule: 'Часы работы',
                    description: 'Описание',
                    profit: 'Процент прибыли от заказа',
                    salon: 'Салон',
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
        are_you_sure_delete: "Вы точно хотите удалить?",
        validation: {
            file_to_large: "Файл слишком большой",
            address_not_found: "Адрес не определился"
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
        },
        find_me: "Найти меня",
        days: {
            0: "Пн",
            1: "Вт",
            2: "Ср",
            3: "Чт",
            4: "Пт",
            5: "Сб",
            6: "Вс",
        }
    }
}

export default ru
