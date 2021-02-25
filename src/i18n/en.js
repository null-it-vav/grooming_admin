let ru = {
    language: "English",
    app: {
        components: {
            admin: {
              organizations: {
                  create: "Create organization",
                  list: "Organizations",
                  after_create: "After creating organization data will be sent to email",
                  fields: {
                      name: "Name",
                      email: "Email",
                      phone: "Phone",
                      created_at: "Created",
                      org_name: "Organization name",
                      user_name: "User",
                      user_email: "Email",
                      user_phone: "Phone",
                      org_timezone: "Timezone",
                      org_lang: "Lang",
                  }
              }
            },
            main: {
                selected_salon: "Salon"
            },
            dashboard: {
                title: "Dashboard",
                orders_by_day_now: "Entries for today",
            },
            login: {
                head_title: "CRM for groomer, help you take your business to the next level.",
                title: "Login",
                username: "Login",
                email: "Email",
                password: "Password",
                password_confirmation: "Password confirmation",
                login: "Singin",
                reset: "Reset",
                reset_password: "Reset password?",
                reset_password_form: "Reset password",
                auth: "Remembered login and password??",
                get_demo: "Get demo account",
                get_demo_button: "Get demo",
                login_exist: "I have login and password",
                url_invalid: "Reset password url incorrect."
            },
            services: {
                create: "Create services",
                update: "Update services",
                not_found: "Services list is empty",
                field: {
                    name: 'Name',
                    description: 'Description',
                    price: 'Price, from',
                    type: 'Type',
                    duration: 'Duration, m.',
                    image: 'Photo',
                }
            },
            salons: {
                create: "Create salon",
                update: "Update salon",
                fields: {
                    address: 'Address'
                }
            },
            promotions: {
                create: "Create promotions",
                update: "Update promotions",
                not_found: "Promotions list is empty",
                fields: {
                    name: "Title",
                    description: "Description",
                    start: "Start",
                    finish: "Finish",
                },
                statuses: {
                    expect: "Expect",
                    active: "Active",
                    inactive: "Inactive",
                }
            },
            masters: {
                create: "Create master",
                update: "Update master",
                fields: {
                    name: 'User name',
                    email: 'Email',
                    password: 'Password',
                    password_confirmation: "Password confirmation",
                    position: 'Position',
                    photo: 'Photo',
                    schedule: 'Schedule',
                    description: 'Description',
                    profit: 'Profit',
                    salon: 'Salon',
                }
            },
            orders: {
                create: "Create запись",
                update: "Обновить запись",
                not_found: "Записей нет",
                how_match: "Итоговая сумма заказа:",
                filters: {
                    master_select: "Выбрать мастера",
                    status_select: "Выбрать статус",
                },
                fields: {
                    name: 'Имя владельца',
                    phone: 'Телефон',
                    email: 'Email',
                    nickname: 'Кличка питомца',
                    comment: 'Комментарий',
                    master: 'Мастер',
                    date: 'Дата',
                    time_start: 'Время',
                    status: 'Статус',
                    total_price: 'Итого, цена',
                },
                statuses: {
                    NEW: 'Новый',
                    CONFIRMED: 'Подтвержден',
                    COMPLETED: 'Завершена',
                    REJECTED: 'Отклонена',
                    PENALTY: 'Не состоялась',

                },
                actions: {
                    edit: 'Редактировать',
                    check: 'Подтвердить заказ',
                    penalty: 'Клиент не пришел',
                    rejected: 'Клиент отказался заранее',
                    end: 'Выполнено'
                }
            },
            settings: {
                tabs: {
                    base: "Базовые",
                    push_app: "Уведомления и приложение",
                    schedule: "Расписание работы"
                },
                name: 'Название',
                phone: 'Телефон',
                site: 'Сайт',
                email: 'Email',
                schedule: 'Расписание',
                schedule_step: 'Шаг расписания, мин',
                timezone: 'Временная зона',
                lang: 'Язык',
                notif_before: 'Уведомление о предстоящем сеансе, мин',
                notif_after: 'Уведомление после визита через, дней',
                text: 'Текст на главной страницы приложения',
                image: 'Фото на главной страницы приложения',
                tg_link: 'Ссылка на Telegram',
                wa_link: 'Ссылка на WhatsApp',
            },
            calendar: {
                new_order: "Новая запись",
                new_action: "Новая акция",
                popup: {
                    orders: {
                        title: 'Список записей'
                    }
                }
            },
            user: {
                fields: {
                    telegram_id: 'Telegram id, указав его вы сможете получать уведомления о записях',
                    get_telegram_id: 'Для получения id напишите нашему боту команду /start: '
                }
            }
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
            auth_403: '«Пожалуйста, проверьте правильность написания логина и пароля.»',
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
        delete: 'Удалить',
        service_type: "Тип услуги",
        select: "Выбрать...",
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
        },
        data_update: 'Данные обновлены.',
        popup: {
            error: 'Ошибка!',
            data_not_update: 'Данные не обновлены!',
        },
        total: 'Всего'
    }
}

export default ru
