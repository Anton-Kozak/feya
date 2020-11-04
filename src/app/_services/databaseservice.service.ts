import { Injectable } from '@angular/core';
import { Task } from '../_models/task';
import { AchievementRequirements } from '../_models/achievement-requirements'
import {
  setString,
  getString,
  hasKey,
  remove
} from 'tns-core-modules/application-settings';
import { BehaviorSubject, Subject } from 'rxjs';
import { Achievement } from '../_models/achievement';
import { TasksAndDate } from '../_models/tasks_and_date';
import { PersonalTask } from '../_models/personal_task';


var Sqlite = require("nativescript-sqlite");

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  currentTask = new BehaviorSubject<Task[]>([]);
  isTaskDayCreatedSubject = new Subject<boolean>();
  isTasksForDayExistSubject = new Subject<boolean>();
  personalTasks = new Subject<string[]>();
  currentIDForPersonalTasks: number = null;

  tasksAndDate: TasksAndDate

  achievementObservable = new Subject<Achievement[]>();
  achievementObtained = new Subject<Achievement>();
  constructor() { }

  //allTasks: Task[] = [];


  get currentDate() {
    let dt = new Date();
    return (dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate());
  }

  get taskStatusChange() {
    if (!hasKey('task_changed'))
      return 'false';
    return getString('task_changed');
  }


  public getdbConnection() {
    return new Sqlite('tasks');
  }

  checkDB() {
    return Sqlite.exists('tasks');
  }

  public closedbConnection() {
    new Sqlite('tasks')
      .then((db) => {
        db.close();
      });
  }

  createDataBase() {
    this.getdbConnection().then(db => {
      if (db !== null) {
        db.execSQL("CREATE TABLE IF NOT EXISTS daily_tasks (id INTEGER NOT NULL UNIQUE, message	TEXT NOT NULL, is_complete INTEGER NOT NULL, PRIMARY KEY(id AUTOINCREMENT))")
          .then(() => {
            this.seedTasks();
          }, error => {
            console.log("CREATE TABLE ERROR", error);
          });
        db.execSQL("create table if not exists achievements (id INTEGER NOT NULL UNIQUE, title TEXT NOT NULL, is_obtained INTEGER NOT NULL, PRIMARY KEY(id AUTOINCREMENT))")
          .then(() => {
            this.seedAchievements();
          }, error => {
            console.log("CREATE Achievements TABLE ERROR", error);
          });
        db.execSQL("create table if not exists tips (id INTEGER NOT NULL UNIQUE, tip TEXT NOT NULL, section TEXT NOT NULL, PRIMARY KEY(id AUTOINCREMENT))")
          .then(() => {
            this.seedTips();
          }, error => {
            console.log("CREATE tips TABLE ERROR", error);
          });
        db.execSQL("create table if not exists personal_tasks_table (id INTEGER NOT NULL UNIQUE, date TEXT NOT NULL, PRIMARY KEY(id AUTOINCREMENT))")
        error => {
          console.log("CREATE personal Tasks TABLE ERROR", error);
        };
        db.execSQL("create table if not exists personal_tasks (id INTEGER NOT NULL UNIQUE, task_id INTEGER NOT NULL, task TEXT NOT NULL, is_complete INTEGER NOT NULL, PRIMARY KEY(id AUTOINCREMENT))")
        error => {
          console.log("CREATE personal Tasks TABLE ERROR", error);
        };
      }
      else {
        console.log('Error creating table');
      }
    });
  }


  seedTasks() {
    this.getdbConnection().then(db => {
      if (!hasKey('db_state')) {
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно помыть под кроватью', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отодвинуть диван и тщательно пропылесосить', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть все светильники в доме', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Навести порядок на письменном столе', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пропылесосить диван', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Закинуть в стирку покрывала, наматрасник', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть все межкомнатные двери + ручки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистить подписки в Инстаграм,чаты в Вайбере и телеграм', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Навести порядок в разделе Сохраненное', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистить заметки в телефоне', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отчистить фартук кухни от жира', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти одну вещь в гардеробе которая абсолютно не нравится и избавиться от нее', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать всё нижнее бельё', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать носки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать рецепты в бумажном варианте', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отпустить одну пару обуви которая заставляет ноги страдать', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очищаем электронную почту от спама и неактуальных писем', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отпускаем книги, которые не хочется перечитывать', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Находим один пункт просроченной косметики', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Ревизия печатных инструкций от техники', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти и избавиться от старых журналов(если такие имеются)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать приправы на актуальность и просрочку', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистить одну горизонтальную поверхность в доме от лишних вещей(полка, стол и т.д)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть все розетки в доме', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистить свой плейлист от 15 песен, которые больше не цепляют', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Ищем и избавляемся от ненужных визиток', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Находим и избавляемся от лишних шнуров и кабелей непонятного происхождения', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Сдаём в переработку, отдаём старые телефоны и батареи от них', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Провести ревизию лаков для ногтей. Избавится от высохших.', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Провести ревизию аптечки, избавится от просрочки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пересмотреть и выкинуть старые пластиковые контейнеры для еды', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Ищем брелки и магниты которые не радуют', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти самую древнюю еду в морозилке и приготовить её:)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пересмотреть все крупы в доме (просрочка, паразиты)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти косметическое средство которое не подошло и найти ему новый дом', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти одну вещь подаренную вам,которая не понравилась и найти ей новый дом', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно перебрать канцелярию (отдать,выкинуть лишнее)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти 1-2 неактуальных приложения в телефоне и удалить их', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Оцифровать нужную информацию с СД, ДВД дисков, отсканировать документы', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отсортировать подарочные открытки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистить старые и неактуальные контакты в телефоне', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Написать 5 вещей за которые вы благодарны', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистить входящие сообщения (email, телефон)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Удалить 15 фотографий на которых вы себе не нравитесь, дубликаты', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отписаться от людей которые вас не вдохновляют', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Придумать и прописать один пункт: как я могу улучшить своё здоровье', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отписаться от рекламных рассылок', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Завести банку/ёмкость и собрать туда мелочь со всего дома', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вспомнить свои заброшенные хобби проекты и раздать оставшиеся материалы', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать все документы, разложить по категориям', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Сделать по 2 ксерокопии самых важных документов', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Просмотреть свой гардероб и составить 5 готовых образов на каждый день, сфотографировать', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отпустить 1 сентиментальную вещь, предварительно сфотографировав ее и поблагодарив', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отыскать один элемент посуды со сколами, царапинами, трещинами и избавиться от него', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Прошерстите карманы одежды и рассортируйте содержимое', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Просмотрите все свои сумки, почистите,почините и избавьтесь от лишних', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Соберите пакет вещей на благотворительность', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите экран телевизора, компьютера и телефона', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть все зеркала в доме', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пройдитесь по квартире и верните всё вещи,которые не на своих местах, туда где они должны быть', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Навести порядок в том самом ящике со всяким хламом вперемешку', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Заточите все свои ножи', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Загрузите в стирку весь кухонный текстиль', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистите решетку вытяжки от жира', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно вымойте мусорное ведро', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите раковину, ванную/душ и всё поверхности в ванной комнате', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Достаньте ёмкость для порошка в стиральной машине и вычистите его', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистите расчёску от волос,промойте её с мылом или шампунем,просушите', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно отмыть обеденный стол с моющим средством', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно вымойте входную дверь + ручки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Приведите в порядок входной коврик', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найдите два предмета которые лежат не на своём месте и верните их домой', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Соберите по квартире всю грязную одежду и отнесите её в стирку', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистите прикроватные столики от лишнего, протрите их', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Сделайте ревизию всего постельного белья', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найдите предмет одежды который не носили больше года и пристройте его', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Соберите в коробку всё,что требует ремонта. Назначьте дату починки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Уделите время уходу за 3 парами обуви (чистка, воск)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистите корзину на компьютере', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть варочную поверхность печки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вычистить духовку с моющим средством', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вычистить микроволновку с моющим средством', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Сложить все пластиковые пакеты в один большой,а также перебрать их', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Засыпать сахар в сахарницу, соль в солонку и перец в перечницу', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вспомните все свои незавершённые дела, запишите их и поставьте дату их выполнения', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Рассортируйте материалы для хобби, избавьтесь от неактуально', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите стиральную машинку, внутри и снаружи. А также за ней', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вычистите ёмкость пылесоса, тщательно промойте все его части', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Проведите ревизию всех моющих средств в доме,составьте список покупок', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Проведите ревизию всего декора в квартире, всё ли отзывается и радует?', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пропылесосить все ковровые покрытия в доме', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вымыть все окна в квартире', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите пыль с книг на полке', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Составить список книг, которые можно скачать в электронном варианте,и отпустить бумажные копии', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Удалите с носителей все фотографии плохого качества', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отсканируйте 1-2 важных документа', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Установите таймер на 15 минут и за это время проведите сортировку материалов на компьютере', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Продублируйте всю свою ценную информацию и материалы на внешний жёсткий диск', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Переберите все свои напечатанные фотографии', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите поверхность всех шкафов на кухне', 0)");
        setString('db_state', "filled");
      }
      else {
        console.log('Seed for tasks is not needed');
        console.log('Database is ', getString('db_state'));
      }
    });
  }

  seedAchievements() {
    this.getdbConnection().then(db => {
      if (!hasKey('achievements_state')) {
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 1 задание!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 3 задания!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 7 заданий!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 30 заданий!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 3 дня на легкой сложности!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 3 дня на средней сложности!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 3 дня на тяжелой сложности!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши все задания!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 14 заданий!', 0)");
        setString('achievements_state', "filled");
        if (!hasKey('achievements')) {
          let achievement: AchievementRequirements =
          {
            completedDaysCount: 0,
            easyDifficultyDaysCount: 0,
            mediumDifficultyDaysCount: 0,
            hardDifficultyDaysCount: 0,
            allTasksCompleted: 0,
          };
          setString('achievements', JSON.stringify(achievement));
        }
      }
      else {
        console.log('Seed for achievements is not needed');
        console.log('Achievement state is ', getString('achievements_state'));
        console.log('Achievements are ', JSON.parse(getString(('achievements'))));
      }
    });
  }

  seedTips() {
    this.getdbConnection().then(db => {
      if (!hasKey('tips_state')) {
        //kitchen
        db.execSQL("insert into tips (tip, section) values ('Периодически избавляйтесь от посуды со сколами, старых контейнеров и поцарапанных сковородок', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Храните там, где используете. Например, кастрюли недалеко от плиты', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Квадратные ёмкости для сыпучих рациональнее используют пространство чем круглые того же объема', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Подпишите все пакеты и баночки со специями и укажите их срок годности', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Мойте посуду по мере готовки и в свободных промежутках', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Заведите привычку убирать на кухне вечером перед сном', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Ставьте таймер на 15 минут и уберите всё, что успеете за это время', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Накапайте несколько капель эфирного масла на дно мусорного ведра для приятного запаха. (Например, мятное или апельсиновое)', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Сетку-фильтр от вытяжки лучше замочить на ночь в воде с моющим, а потом очистить с помощью старой зубной щётки', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Все крупные и тяжёлые предметы лучше хранить в нижних ящиках, а лёгкие наверху', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Храните кухонные полотенца вертикально в выдвижных ящиках или органайзерах', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('На маленьких кухнях нужно задействовать любое пространство, например, повесить крючки на внутреннюю поверхность дверей', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Повесьте магнитный держатель для ножей, и они всегда будут под рукой', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Поддерживайте все горизонтальные поверхности максимально чистыми и не захламленными', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Придерживайтесь принципа пролил - вытер, открыл - закрыл, просыпал - подмёл', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Выделите отдельные дни в календаре для тщательной очистки духовки, микроволновой печи и холодильника', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Обычный столовый уксус является отличным средством для уборки кухни. Чтобы избавиться от запаха, нужно настоять его на апельсиновой кожуре несколько недель в тёмном месте', 'kitchen')");
        //спальня
        db.execSQL("insert into tips (tip, section) values ('Периодически избавляйтесь от посуды со сколами, старых контейнеров и поцарапанных сковородок', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Прежде чем сразу застилать постель с утра, рекомендуется дать ей немного постоять не заправленной.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Регулярно очищайте прикроватные тумбы от лишних вещей. Желательно каждый день.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Пространство под кроватью можно использовать для хранения вещей в выдвижных ящиках или органайзерах.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Поддерживайте чистоту окон в спальне чтобы туда поступало достаточно света.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Менять постельное бельё нужно раз в неделю, максимум раз в 2 недели.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Купите для спальни специальную корзину для грязного белья и уже использованных вещей.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Излишек визуального шума и беспорядок в спальне может стать причиной бессонницы.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Аллергены большая проблема для спальни. Протирайте пыль не реже чем раз в три дня.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Периодически протирайте выключатели, ручки шкафов и дверей дезинфицирующим средством.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Используйте внутреннюю поверхность дверей шкафа для подвесных органайзеров.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Регулярно проветривайте спальню утром и вечером.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Эфирное масло лаванды способствует успокоению и быстрому засыпанию (используйте в аромалампе или диффузоре).', 'bedroom')");
        //ванная
        db.execSQL("insert into tips (tip, section) values ('Унитаз рекомендуется обрабатывать моющими средствами каждые 2-3 дня не дожидаясь сильных отложений.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Ванну из акрила и стеклопластика ни в коем случае нельзя мыть жесткими металлическими губками.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Грязь у основания крана лучше всего вычищать старой зубной щеткой.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы убрать известковый налет с носиков кранов\душевой насадки рекомендуется надеть на них пластиковый пакет с раствором смягчителя воды\ специального средства на основе уксуса, фруктовых кислот и оставить откисать на ночь.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы раковина блестела используйте пищевую соду, а затем тщательно смойте.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Раз в месяц заливайте в унитаз средство Крот и оставляйте на несколько часов или на ночь.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Стены ванной, покрытые кафелем, нужно мыть водой с мылом раз в неделю. Чтобы кафель заблестел, протирают его водой с уксусом.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('После каждой стирки следует протирать резиновый уплотнитель в стиральной машинке и оставлять дверцу открытой до полного высыхания.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Нужно помнить, что белковые пятна (кровь, пот и др.) способны свертываться от горячей воды и их нужно замачивать только в холодной.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Линяющие вещи перед стиркой лучше замочить в холодной воде, в которую добавлена 1 столовая ложка уксуса.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Шерстяные вещи стирают и сушат, вывернув наизнанку, чтобы они не выцвели.', 'bathroom')");
        db.execSQL("insert into tips (tip, section) values ('Унитаз рекомендуется обрабатывать моющими средствами каждые 2-3 дня не дожидаясь сильных отложений.', 'bathroom')");
        //уход за посудой
        db.execSQL("insert into tips (tip, section) values ('Любую посуду необходимо мыть сразу после использования. Посуду с пригоревшим дном можно залить на ночь водой или на 15 минут с добавлением соли и немного уксуса.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы избавиться от известковой накипи внутри чайника необходимо засыпать пакетик лимонной кислоты, довести до кипения и дать немного постоять.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Новую глиняную посуду перед употреблением рекомендуется положить на несколько часов в холодную воду, а затем прополоскать в горячей. Таким образом она укрепляется.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Наиболее распространенное средство для чистки алюминиевой посуды это нанести кашицу из пищевой соды и протереть губкой в холодной воде.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Медная посуда хорошо моется смесью 1 столовой ложки соли и 1 столовой ложки муки. Разбавьте смесь уксусом для получения тестообразной массы. Нанесите и дайте высохнуть. Затем смойте.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Медные изделия можно чистить лимонным соком или мелом.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Новую эмалированную посуду нужно ополоснуть, прокипятить в ней молоко, разведенное пополам с водой, и она долго не будет темнеть.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Эмаль при резком изменении температуры может потрескаться, поэтому нельзя лить в горячую посуду холодную воду и, наоборот, в холодную посуду кипяток.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Сковородки, покрытые тефлоном, нельзя перегревать и царапать. Моют такую посуду обычной водой и мягкой щеткой.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Хрусталь нужно мыть только холодной водой, от горячей воды он темнеет и тускнеет.', 'dishes')");
        db.execSQL("insert into tips (tip, section) values ('Посуду с застывшим винным осадком моют так: заливают теплую мыльную воду с содой на 5-6 часов. Затем промывают с уксусом.', 'dishes')");
        //хранение продуктов
        db.execSQL("insert into tips (tip, section) values ('Продукты которые рекомендуется хранить в холодильнике: баклажаны, брокколи, виноград, вишня, зелень, морковь, сельдерей, фасоль, цукини, яблоки, ягоды.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Продукты которые рекомендуется хранить при комнатной температуре: абрикос, авокадо, ананас, банан, груша, дыня, картофель, киви, лук, персик, цитрусовые, чеснок.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Затхлый запах в холодильнике помогают убрать разложенные на ночь на полках кусочки черного хлеба.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Не храните в холодильнике не начатые консервы.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Яйца в холодильнике можно хранить не более двух недель.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Открытую бутылку подсолнечного масла можно хранить не больше месяца.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Периодически (3-4 раза в год) нужно производить ревизию своих запасов круп и муки на наличие насекомых.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Убедитесь, что вы не храните фрукты и овощи у газовой плиты. Природный газ ускоряет порчу этих продуктов.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Одна из самых важных для правильного хранения вещей — чистый холодильник. Его уборка может занять время, но она очень важна. Так еду не заражают опасные бактерии, и она остается свежей в течение долгого времени.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Свежие травы и зелень могут портиться очень быстро. Поставьте зелень в воду, как цветы! Вода продлевает жизнь растений. Именно из-за недостатка воды листья начинают увядать, терять цвет и упругость.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Хотите, чтобы картофель был свежим и не прорастал? Храните его с яблоками. (Убедитесь, что лук находится как можно дальше от картошки — с луком, в отличие от яблок, картофель быстро испортится.)', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('При хранении грибов убедитесь, что в них не затаилась влага. Можете хранить их в пакете из коричневой бумаги в холодильнике — так они будут в сухом прохладном месте. Не храните грибы в стекле или пластике, на которых будет оседать влага!', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Не многие знают, но сыр дышит, потеет и стареет. Никогда не держите сыр завернутым в полиэтилен или пищевую пленку. Лучшей упаковкой для хранения сыра дома является пергаментная бумага.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Большинство людей считают полочку на дверце холодильника самым удобным местом для хранения молока. На самом деле, дверца - худшее место для молочных продуктов. Температура там самая высокая, соответственно молоко может прокиснуть раньше времени. Лучше всего разместить молоко в основной части холодильника, на верхней или нижней полке.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы салат-латук и сельдерей не потеряли свою упругость и вкус в холодильнике, храните их плотно завернутыми в фольгу.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы виноград оставался твердым, упругим и сладким, храните его в полиэтиленовом пакете. И помните, чем плотнее упаковка пакета, тем дольше пролежат ягоды.', 'foodstorage')");
        db.execSQL("insert into tips (tip, section) values ('Редис, морковку и сельдерей можно хранить очень долго, если предварительно их очистить, порезать и поместить в банки, наполненные небольшим количеством воды.', 'foodstorage')");
        //выведение пятен
        db.execSQL("insert into tips (tip, section) values ('Пятна от фруктового сока и фруктов хорошо выводятся при помощи простокваши или сыворотки с последующим прополаскиванием в большом количестве холодной воды.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Свежие жировые пятна рекомендуется сразу же посыпать солью и менять её до тех пор, пока пятно не исчезнет.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Свежие пятна от молока и крови необходимо смывать холодной водой, от горячей они свернутся.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Пятна от сырости на ткани можно удалить тряпкой, смоченной в сыворотке простокваши.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Еще пятно от вина можно удалить поместив испачканную вещь в горячее молоко или сыворотку на 30 минут и постирать с мылом.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Протрите пятно от вина раствором перекиси водорода (1 чайная ложка перекиси водорода на полстакана воды) и промойте холодной водой. Этот способ подходит только для белых изделий.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Насыпьте влажную соль на свежее пятно от вина и через 30 минут промойте горячей мыльной водой.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Пятна от губной помады убираются так: Если одежда белая, тогда пятно можно обработать перекисью водорода, а затем полоскать в мыльной воде, пока пятно не исчезнет. Если же одежда цветная, воспользуйтесь скипидаром или эфиром. Если это не поможет, тогда положите с обеих сторон ткани салфетку, насыпьте немного талька и прогладьте утюгом при средней температуре. В том случае, если ваша одежда из шерсти и/или шёлка, протрите загрязнённое место ватным тампоном, смоченным в спирте.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Жирные пятна можно удалить с помощью бензина, скипидара или ацетона. Смочите пятно от краёв к середине бензином. Затем накройте салфеткой и придавите тёплым утюгом.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Пятна с шерстяных ковров нужно удалять смесью уксуса и спирта (1 : 1). Пятна с ковров из искусственного волокна удаляйте холодной водой.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Хозяйственное мыло: это одно из самых универсальных средств борьбы с пятнами любого происхождения. Наносите на проблемную зону не само мыло, а мыльную пену. Оставьте на пару часов, после прополощите и снова постирайте.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Перекись водорода лучшее средство, чтобы вывести пятно с белой ткани.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Как вывести старое пятно? На помощь придет спирт, который является универсальным средством для борьбы со старыми пятнами. Используйте денатурат или нашатырный спирт. Намочите ватный тампон и приложите к пятну, оставив на 30-60 минут. В завершение проведите стирку.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы пятно не расползлось, начинайте удалении от краев и постепенно проходите в середину. Это правило касается загрязнений любого типа.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Старые пятна крови с мебели, матрасов, ковров убирают при помощи глицерина. Смешайте глицерин с теплой водой и при помощи ватного диска нанесите на ткань. Подождите несколько часов, а после очистите остатки.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы вывести пятна от пота. Используйте ацетилсалициловую кислоту. Необходимо развести 2-3 таблетки с чайной ложкой воды и полученную смесь нанести на проблемные места, оставив на 30 минут. Затем поместите вещь в теплый мыльный раствор на полчаса. Если после стирки разводы остаются, воспользуйтесь перекисью водорода в пропорции одна столовая ложка перекиси на 10 столовых ложек воды. Перекись оставьте на 10 минут и отправляйте вещи в стирку.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Для выведения следов пота и дезодоранта, подходит уксусный раствор в пропорции одна столовая ложка уксуса на 1 л воды. Замочите изделие в растворе на пару часов, а затем на проблемные участки дополнительно нанесите соду в пропорции 2 столовые ложки воды на 4 столовые ложки соды. Оставьте на час и постирайте в машинке.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Нашатырный спирт подойдёт для удаления кофе и чая. Возьмите ватный диск, нанесите спирт и приложите к загрязнению, следуя формуле от краев к центру, так удастся минимизировать расползание пятна. Подождите 20 минут, и постирайте обычным способом.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Удалить зеленые пятна от травы легко. Для этого понадобится 1 л воды и 1 столовая ложка нашатырного спирта. Опустите пятно в емкость с раствором и через 30 минут аккуратно потрите мочалкой или щеткой.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Как избавиться от чернильных пятен? Смочите ватный тампон в спирте и легкими движениями постукивайте по пятну. Еще отлично подойдет смесь (1:1) винного спирта и нашатырного спирта. Однако, чтобы полностью избавиться от пятна без застирывания, придется постараться.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('От старого жирного пятна можно избавиться, если пропитать его смесью из чистого спирта (1/2 стакана) и бензина ( 1/2 ч. л.), а затем дать ткани высохнуть.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы удалить пятно от помады и тонального крема положите ткань пятном на бумажное полотенце, затем с изнанки протрите смоченным в спирте ватным тампоном. Не забывайте часто менять бумагу.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы удалить пятно от ягод смочите ватный диск обычным столовым уксусом и промокните им пятно. Затем прополоскайте вещь в холодной воде.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Пятно от шоколада можно вывести если смочить его теплым 1,5%-м раствором нашатырного спирта. Или раствором уксуса и спирта (1:1).', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы удалить пятно от пота смешайте жидкость для мытья посуды (1 ст. л.) с перекисью водорода (3–4 ст. л.) и содой (2 ст. л.). Нанесите смесь на пятно, немного подождите и сполосните проточной водой.', 'stains')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы удалить грязь замочите пятно в смеси теплой воды, белого уксуса и средства для мытья посуды, затем подождите некоторое время и прополощите вещь в теплой воде.', 'stains')");
        //эко жизнь
        db.execSQL("insert into tips (tip, section) values ('Замените пластиковые пакеты на многоразовые мешочки и ходите в магазин с ними.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Замените пластиковые трубочки на многоразовые стальные, бамбуковые или акриловые.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Замените пластиковые зубные щётки на бамбуковые альтернативы.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Приобретите многоразовую кружку для кофе и покупайте кофе с собой в неё.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Одноразовые бритвенные станки можно заменить на многоразовую металлическую бритву.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Замените обычные лампочки в доме на энергосберегающие.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Используйте многоразовые аккумуляторы вместо обычных батареек.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Купите многоразовую бутылку для воды и не покупайте одноразовые.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Старайтесь покупать продукты без упаковки и в свою тару.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Ходите за продуктами с многоразовой сумкой-шоппером.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Пергамент для выпикания можно заменить на многоразовый силиконовый коврик.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Покупайте чай на развес вместо чая в пакетиках, они содержат пластик и не перерабатываются.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Подарите вещи вторую жизнь: покупайте вещи second hand и сдавайте свои ненужные вези в комиссионку.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Начните заниматься сортировкой мусора и сдавайте его в переработку.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Выключайте воду пока чистите зубы, бреетесь или мылитесь.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Принимайте душ вместо ванны чтобы сократить расход воды.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Обратите внимание на упаковку косметики, хорошо если её можно потом сдать в переработку.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Можно заменить пластиковую расчёску для волос на деревянную.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('А обычную мочалку можно заменить на джутовую.', 'ecolife')");
        db.execSQL("insert into tips (tip, section) values ('Одноразовые спонжи для снятия макияжа можно легко заменить на многоразовые. Они хорошо стираются в машинке.', 'ecolife')");
        //разное
        db.execSQL("insert into tips (tip, section) values ('Выполняйте регулярно три вида уборки: ежедневную, еженедельную (влажную) и сезонную (генеральную).', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Во время генеральной уборки 3-4 раза в день рекомендуется проводить ревизию всех вещей. Обнаружить что нуждается в чистке и ремонте.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('В семьях, где есть грудные дети, влажную уборку нужно делать каждый день.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Полы на кухне рекомендуется протирать ежедневно или раз в два дня.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Во время сезонной уборки нужно доставать все вещи из шкафов, проветрить их и просушить на солнце и только затем сложить обратно в предварительно вымытый шкаф.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Чтобы облегчить мытье внутренней поверхности микроволновой печи необходимо поставить в нее миску с водой и долькой лимона и хорошо вскипятить. Тогда загрязнения будут убираться легче.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Если протирать поверхность печки влажной тряпкой после каждого приготовления пищи, то вы значительно облегчите себе жизнь во время еженедельной уборки.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Мебель с кожаной обивкой вытирать нужно сухой тряпкой, так как от влаги кожа портится.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('После каждого использования пылесоса рекомендуется очищать фильтр от пыли.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Блеск колец с бриллиантами и другими драгоценными камнями хорошо восстанавливается после чистки зубной пастой, которую потом можно смыть холодной водой.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Если потускнело и потемнело серебряное кольцо, его опускают на два часа в чашку с уксусом (1/2 чашки) и пищевой содой (2 столовые ложки). Затем кольцо протирают полотенцем.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Никогда не следует гладить вещи если на них есть пятна. Это их запаивает и выведение будет почти невозможным.', 'other')");
        db.execSQL("insert into tips (tip, section) values ('Стопки свежевыглаженных вещей сразу помещать в шкаф нельзя. Они должны полностью остыть 2 часа при комнатной температуре.', 'other')");
        setString('tips_state', 'filled');
      };
    });
  }


  isTaskDayCreated() {
    return new Promise(resolve => {
      let date = new Date();
      let dateString = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + (date.getUTCDate());
      this.getdbConnection().then(db => {
        db.all(`select * from personal_tasks_table where date = '${dateString}'`).then(res => {
          if (res.length > 0) {
            resolve(true);
          }
          else
            resolve(false);
        });
      });
    })
  }

  hasTasksForCurrentDay() {
    return new Promise(resolve => {
      this.getdbConnection().then(db => {
        db.all("select id from personal_tasks_table order by id desc limit 1").then(res => {
          db.all(`select * from personal_tasks where task_id = ${res[0][0]}`).then(t => {
            if (t.length > 0) {
              console.log('set current id to ', res[0][0]);
              this.currentIDForPersonalTasks = res[0][0];
              resolve(t);
            }
            else
              resolve(null);
          })
        });
      });
    });
  }


  addPersonalTaskDay(date: string) {
    this.getdbConnection().then(db => {
      console.log(date);
      //проверка сегоднешней даты
      //он 1 раз за день может быть использован!
      db.execSQL(`insert into personal_tasks_table (date) values ('${date}')`);

    });
  }

  addPersonalTaskForCurrentDay(task: string) {
    this.getdbConnection().then(db => {
      db.all("select id from personal_tasks_table order by id desc limit 1").then(res => {
        console.log(`I add: ${res[0][0]}', '${task}`);
        db.execSQL(`insert into personal_tasks (task_id, task, is_complete) values ('${res[0][0]}', '${task}', 0)`);
      })
    });
  }

  deleteDailyTasks() {
    this.getdbConnection().then(db => {
      db.all('delete from personal_tasks_table');
      db.all('delete from personal_tasks');
    });
  }


  getCurrentIDForPersonalTasks(offset: number) {
    return new Promise(async resolve => {
      if (this.currentIDForPersonalTasks === null) {
        this.currentIDForPersonalTasks = <number>await this.getLastId();
        console.log(this.currentIDForPersonalTasks);
      }
      this.getdbConnection().then(db => {
        let id = this.currentIDForPersonalTasks + offset
        db.all(`select * from personal_tasks where task_id = ${id}`).then(t => {
          if (t.length > 0) {
            db.all(`select date from personal_tasks_table where id = ${id}`).then(date => {
              this.tasksAndDate = { date: date[0][0], tasks: t };
              return resolve(this.tasksAndDate);
            });
          }
          else {
            resolve(null);
          }
        })
      });
    });
  }


  getLastId() {
    return new Promise(resolve => {
      this.getdbConnection().then(db => {
        //console.log('get to db');
        db.all("select id from personal_tasks_table order by id desc limit 1").then(res => {
          db.all(`select * from personal_tasks where task_id = ${res[0][0]}`).then(t => {
            //console.log('res:', res, 't ', t);
            if (t.length > 0) {
              //console.log('set current id to ', res[0][0]);
              resolve(res[0][0]);
            }
          })
        });
      });
    })
  }


  editCurrentTasks(tasksForEdit: PersonalTask[]) {
    return new Promise(resolve => {
      this.getdbConnection().then(db => {
        if (tasksForEdit.length > 0) {
          for (const task of tasksForEdit) {
            db.all(`update personal_tasks set task = '${task.task}' where id = '${task.id}'`);
          }
          resolve('Success');
        }
        else
          resolve('Failed to edit');
      });
    })
  }

  changeCompleteOnTask(status: number, id: string) {
    this.getdbConnection().then(db => {
      db.all(`update personal_tasks set is_complete = ${status} where id = '${id}'`).then(() => {
      });
    });
  }



  getAchievements() {
    this.getdbConnection().then(db => {
      if (hasKey('achievements_state') && hasKey('achievements')) {
        db.all('select * from achievements', (err, rows) => {
          this.achievementObservable.next(rows);
        })
      }
    });
  }


  checkTaskStatus() {
    if (hasKey('daily_tasks_status') && getString('daily_tasks_status') === 'completed_' + this.currentDate) {
      this.currentTask.next(null);
      return 'completed_today';
    }
    else if (hasKey('daily_tasks_status') && getString('daily_tasks_status') === 'recieved_' + this.currentDate) {
      return 'tasks_remain';
    }
    else if (!hasKey('daily_tasks_status')
      || (getString('daily_tasks_status') !== 'recieved_' + this.currentDate && getString('daily_tasks_status') !== 'completed_' + this.currentDate)) {
      return 'tasks_needed';
    }
  }

  getNewTasks(numberOfTasks?: number) {
    this.getdbConnection()
      .then(db => {
        db.all("SELECT * FROM daily_tasks where is_complete = 0 ORDER BY RANDOM() LIMIT ?", [numberOfTasks]).then((rows) => {
          let newTasks: Task[] = [];
          if (rows.length === 0) {
            this.resetAllTasks();
          }
          for (var row in rows) {
            newTasks.push({ id: rows[row][0], message: rows[row][1], is_complete: rows[row][2] });
          }
          this.currentTask.next(newTasks);
          setString('daily_tasks', JSON.stringify(this.currentTask.value));
          setString('daily_tasks_status', 'recieved_' + this.currentDate);
          console.log('Tasks for the day set: ', getString('daily_tasks'));
          setString('task_changed', 'false');
        }, error => {
          console.log("Error getting data", error);
        });
      });
  }

  resetAllTasks() {
    this.getdbConnection()
      .then(db => {
        db.all("update daily_tasks set is_complete = 0");
      })
  }

  completeAllTasks() {
    this.getdbConnection()
      .then(db => {
        db.all("update daily_tasks set is_complete = 1");
      })
  }

  getCurrentTasks() {
    this.currentTask.next(JSON.parse(getString('daily_tasks')));
  }


  completeSingleTask(index: number) {
    if (this.currentTask.value[index].is_complete == '0')
      this.currentTask.value[index].is_complete = '1'
    else if (this.currentTask.value[index].is_complete == '1') {
      this.currentTask.value[index].is_complete = '0'
    }
    setString('daily_tasks', JSON.stringify(this.currentTask.value));
  }

  completeDailyTasks(selectedDifficulty: number) {
    this.currentTask.value.forEach((value, index, array) => {
      this.getdbConnection()
        .then(db => {
          db.all("update daily_tasks set is_complete = 1 where id = ?", [value.id]);
          setString('daily_tasks_status', 'completed_' + this.currentDate);
        });
    })
    let achievementFile: AchievementRequirements = JSON.parse(getString(('achievements')))
    if (selectedDifficulty > -1) {
      switch (selectedDifficulty) {
        case 0:
          console.log('Easy ++');
          achievementFile.easyDifficultyDaysCount++;
          break;
        case 1:
          console.log('Medium ++');
          achievementFile.mediumDifficultyDaysCount++;
          break;
        case 2:
          console.log('Hard ++');
          achievementFile.hardDifficultyDaysCount++;
          break;
        default:
          console.log('I could not find the required change for the achievements file');
          break;
      }
      achievementFile.completedDaysCount++;
      setString('achievements', JSON.stringify(achievementFile));
      this.checkAchievements();
      console.log('Achievements after change', JSON.parse(getString(('achievements'))));
    }
    this.currentTask.next(null);
  }

  checkAchievements() {
    let achievementFile: AchievementRequirements = JSON.parse(getString(('achievements')));
    if (achievementFile.completedDaysCount === 1) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 1");
        this.achievementObtained.next({ title: 'Заверши задание за 1 день', is_obtained: 1 });
      });
    }
    else if (achievementFile.completedDaysCount === 3) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 2");
        this.achievementObtained.next({ title: 'Заверши задание за 3 дня', is_obtained: 1 });
      });
    }
    else if (achievementFile.completedDaysCount === 7) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 3");
        this.achievementObtained.next({ title: 'Заверши задание за 7 дней', is_obtained: 1 });
      });
    }
    else if (achievementFile.completedDaysCount === 14) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 9");
        this.achievementObtained.next({ title: 'Заверши задания за 14 дней!', details: 'За ваше усердие Вы получаете подарок - бесплатный PDF-гайд "Переезд без забот". Свяжитесь со мной для деталей.', is_obtained: 1 });
      });
    }
    else if (achievementFile.completedDaysCount === 30) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 4");
        this.achievementObtained.next({ title: 'Заверши задание за 30 дней', details: 'За ваше усердие Вы получаете подарок - бесплатную онлайн-консультация по разбору проблемной зоны. Свяжитесь со мной для деталей.', is_obtained: 1 });
      });
    }
    else if (achievementFile.easyDifficultyDaysCount === 3) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 5");
        this.achievementObtained.next({ title: 'Заверши 3 легких задания!', is_obtained: 1 });
      });
    }
    else if (achievementFile.mediumDifficultyDaysCount === 3) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 6");
        this.achievementObtained.next({ title: 'Заверши 3 средних задания!', is_obtained: 1 });
      });
    }
    else if (achievementFile.hardDifficultyDaysCount === 3) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 7");
        this.achievementObtained.next({ title: 'Заверши 3 тяжелых задания!', is_obtained: 1 });
      });
    }
    else if (achievementFile.completedDaysCount === 100) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 8");
        this.achievementObtained.next({ title: 'Заверши все задания!', details: 'За ваше усердие Вы получаете подарок - бесплатную онлайн организацию пространства! Свяжитесь со мной для деталей.', is_obtained: 1 });
      });
    }
    this.getAchievements();

  }

  showAllTasks() {
    this.getdbConnection()
      .then(db => {
        db.all("SELECT * FROM daily_tasks").then((rows) => {
          console.log(rows);
        });
      });
    this.getdbConnection()
      .then(db => {
        //db.execSQL("update achievements set is_obtained = 1 where id = 1");
        db.all("SELECT * FROM achievements").then((rows) => {
          console.log(rows);
        });
      });
  }

  changeTask(index: number, id: number) {
    let taskToReplace;
    let currentIds = this.currentTask.value.map(task => task.id);
    let stringWithIds = currentIds.toString();
    this.getdbConnection()
      .then(db => {
        db.all("SELECT * FROM daily_tasks where is_complete = 0 and id not in (" + stringWithIds + ") ORDER BY RANDOM()").then((row) => {
          console.log(row);
          taskToReplace = { id: row[0][0], message: row[0][1], is_complete: row[0][2] };
          this.currentTask.value[index] = taskToReplace;
          //console.log(this.currentTask.value);
          setString('daily_tasks', JSON.stringify(this.currentTask.value));
          this.currentTask.next(this.currentTask.value);
          setString('task_changed', 'true');
        });
      });

  }

  resetTasks() {
    this.getdbConnection()
      .then(db => {
        db.all("update daily_tasks set is_complete = 0");
        db.all("update achievements set is_obtained = 0");
        setString('daily_tasks_status', 'reset');
        let achievement: AchievementRequirements =
        {
          completedDaysCount: 0,
          easyDifficultyDaysCount: 0,
          mediumDifficultyDaysCount: 0,
          hardDifficultyDaysCount: 0,
          allTasksCompleted: 0,
        };
        setString('achievements', JSON.stringify(achievement));
      });
  }
}

