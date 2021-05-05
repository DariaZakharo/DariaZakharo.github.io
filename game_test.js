

var canvas = document.getElementById("canvas"); //Получение холста из DOM
var ctx = canvas.getContext("2d"); //Получение контекста — через него можно работать с холстом

var scale = 0.1; //Масштаб мусора

Resize(); // При загрузке страницы задаётся размер холста

class Sea
{
    constructor(image, x)
    {
        this.x = x;
        this.y = 0;
 
        this.image = new Image();
        
        this.image.src = image;
    }
    Update(seas) 
    {
        this.x += speed; //При обновлении изображение смещается вправо
 
        if(this.x > window.innerWidth) //Если изображение ушло за край холста, то меняем положение
        {
            this.x = seas.x - this.image.width + speed; //Новое положение указывается с учётом второго фона
        }
    }
}

window.addEventListener("resize", Resize); //При изменении размеров окна будут меняться размеры холста
 
window.addEventListener("keydown", function (e) { KeyDown(e); }); //Получение нажатий с клавиатуры
 
var objects = []; //Массив игровых объектов

var sea = 
[
	new Sea("back.png", 0),
    new Sea("back.png", 768)
]; //Массив с фонами

var player = null; //Объект, которым управляет игрок (номер объекта в массиве objects)
 
function Start()
{
    timer = setInterval(Update, 1000 / 60); //Состояние игры обновляется 60 раз в секунду
}
 
function Stop()
{
    clearInterval(timer); //Остановка обновления
}
 
function Update() //Обновление игры
{	sea[0].Update(sea[1]);
    sea[1].Update(sea[0]);
 
    Draw();
}
 
function Draw() //Работа с графикой
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Очистка холста от предыдущего кадра

    for(var i = 0; i < sea.length; i++)
    {
        ctx.drawImage
        (
            sea[i].image, //Изображение для отрисовки
            0, //Начальное положение по оси X на изображении
            0, //Начальное положение по оси Y на изображении
            sea[i].image.width, //Ширина изображения
            sea[i].image.height, //Высота изображения
            sea[i].x, //Положение по оси X на холсте
            sea[i].y, //Положение по оси Y на холсте
            canvas.width, //Ширина изображения на холсте
            canvas.width //Так как ширина и высота фона одинаковые, в качестве высоты указывается ширина
        );
    }
}



function KeyDown(e)
{
    switch(e.keyCode)
    {
        case 37: //Влево
            break;
 
        case 39: //Вправо
            break;
 
        case 38: //Вверх
            break;
 
        case 40: //Вниз
            break;
 
        case 27: //Esc
            break;
    }
}


function Resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}




