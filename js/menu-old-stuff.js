$(function(){
  init();
});

// Переменные, которые нужны для работы дерева
treeTop = 0;

// Некоторые переменные, которые нужны скрипту
nn = (document.layers)? true : false;
ie = (document.all)? true : false;
nn = !ie;       // blin
openImg = new Image();
closeImg = new Image();


// Далее - функции, которые нужны дереву

// Создаем объект - листо (в смысле ветка ;-)
function Leaf(id,level,parent,isOpen) {
        this.level = level;
        this.parent = parent;
        if (parent != '') leafs[parent].children[leafs[parent].children.length] = id;
        this.isOpen = isOpen;
        this.children = new Array();
        return this;
}

// Задаем самих листьев
leafs = new Array();

leafs['leaf0'] = new Leaf('leaf0',0,'',false);
leafs['leaf00'] = new Leaf('leaf0',0,'',false);
leafs['leaf1'] = new Leaf('leaf1',0,'',false);
leafs['leaf01'] = new Leaf('leaf01',1,'leaf1',false);

leafs['leaf02'] = new Leaf('leaf02',1,'leaf1',false);
leafs['leaf021'] = new Leaf('leaf021',2,'leaf02',false);




//leafs['leaf3'] = new Leaf('leaf3',0,'',false);
// leafs['leaf31'] = new Leaf('leaf31',1,'leaf3',false);

leafs['leaf200'] = new Leaf('leaf200',0,'',false);
leafs['leaf201'] = new Leaf('leaf201',0,'',false);
leafs['leaf202'] = new Leaf('leaf202',0,'',false);
leafs['leaf203'] = new Leaf('leaf203',0,'',false);
leafs['leaf204'] = new Leaf('leaf204',0,'',false);
leafs['leaf205'] = new Leaf('leaf205',0,'',false);


leafs['leaf4'] = new Leaf('leaf4',0,'',false);
leafs['leaf41'] = new Leaf('leaf41',1,'leaf4',false);
leafs['leaf411'] = new Leaf('leaf411',2,'leaf41',false);
leafs['leaf42'] = new Leaf('leaf42',1,'leaf4',false);
leafs['leaf421'] = new Leaf('leaf421',2,'leaf42',false);

leafs['leaf43'] = new Leaf('leaf43',1,'leaf4',false);
leafs['leaf431'] = new Leaf('leaf431',2,'leaf43',false);

leafs['leaf5'] = new Leaf('leaf5',0,'',false);

leafs['leaf6'] = new Leaf('leaf6',0,'',false);
leafs['leaf61'] = new Leaf('leaf61',1,'leaf6',false);
leafs['leaf610'] = new Leaf('leaf610',1,'leaf6',false);
leafs['leaf6101'] = new Leaf('leaf6101',2,'leaf610',false);
leafs['leaf611'] = new Leaf('leaf611',1,'leaf6',false);
leafs['leaf6110'] = new Leaf('leaf6110',2,'leaf611',false);

leafs['leaf450'] = new Leaf('leaf450',0,'',false);

leafs['leaf60'] = new Leaf('leaf60',0,'',false);
leafs['leaf601'] = new Leaf('leaf601',1,'leaf60',false);

leafs['leaf7'] = new Leaf('leaf7',0,'',false);




leafs['leaf9'] = new Leaf('leaf9',0,'',false);
leafs['leaf100'] = new Leaf('leaf100',0,'',false);
leafs['leaf101'] = new Leaf('leaf101',0,'',false);
leafs['leaf102'] = new Leaf('leaf102',0,'',false);
//leafs['leaf10'] = new Leaf('leaf10',0,'',false);




leafs['leaf14'] = new Leaf('leaf14',0,'',false);
leafs['leaf141'] = new Leaf('leaf141',1,'leaf14',false);
leafs['leaf15'] = new Leaf('leaf15',0,'',false);
leafs['leaf16'] = new Leaf('leaf15',0,'',false);
// Говорим, что только листья нулевого уровня должны быть видимыми
visible = new Array()
for (i in leafs) if (leafs[i].level == 0) visible[visible.length] = i;

// Вытаскиваем все видимые под-элементы данного элемента (id - string!), результат - Array
function visibleChildren(id) {
        var vChildren = new Array();
        if (leafs[id].children.length > 0) {
                for (i in leafs[id].children) {
                        vChildren[vChildren.length] = leafs[id].children[i];
                        if (leafs[leafs[id].children[i]].children.length > 0 && leafs[leafs[id].children[i]].isOpen) {
                                vChildren = vChildren.concat(visibleChildren(leafs[id].children[i]));
                        }
                }
        }
        return vChildren;
}

// Добавляем в Array все элементы другой Araay в указанном месте
function visibleAdd(main, where, sub) {
        var resArr = new Array();
        for (i in main) { resArr[resArr.length] = main[i]; if (main[i] == where) for (j in sub) resArr[resArr.length] = sub[j]; }
        return resArr;
}

// Убираем из однай Array все элементы другой Array
function visibleRemove(main, sub) {
        for (i in main) for (j in sub) if (main[i] == sub[j]) delete main[i];
        return main;
}

// Стандартная кроссбраузерная функция, которая выстраивает по вертикали дивчиков, на входе - Array с их именами
function vertPlace(which) {
        var currTop = treeTop;
                var pos;
        for (i in which)
                {
                  $('#'+which[i]).css('top', currTop);
                  currTop += $('#'+which[i]).height()+1;
                }
//        if (nn) for (i in which) {
//                document.layers[which[i]].top = currTop;
//                currTop += document.layers[which[i]].document.height + 1;
//        }
//        if (ie) for (i in which) {
//                document.all[which[i]].style.top = currTop;
//                currTop += document.all[which[i]].offsetHeight + 1;
//        }
}

// Стандартная кроссбраузерная функция показывающая слой
function showLeer(which) {
  $('#'+which).show();
//        if (nn) $('#'+which').show();
//        if (ie) document.all[which].style.visibility = "visible";
}

// Стандартная кроссбраузерная функция скрывающая слой
function hideLeer(which) {
  $('#'+which).hide();
//        if (nn) document.layers[which].visibility = "hide";
//        if (ie) document.all[which].style.visibility = "hidden";
}

// Качаем ветку, или показываем, или скрываем в зависимости от состояния
function moveBough(which) {
        changingElems = visibleChildren(which);
//              alert(which+"Img");
        if (leafs[which].isOpen) {
                visible = visibleRemove(visible,changingElems);
                for (i in changingElems) hideLeer(changingElems[i]);
                leafs[which].isOpen = false;

        } else {
                visible = visibleAdd(visible,which,changingElems);
                for (i in changingElems) showLeer(changingElems[i]);
                leafs[which].isOpen = true;

        }
        vertPlace(visible);
}

// Запускаем все это!
function init() {
        for (i in visible) showLeer(visible[i]);
        vertPlace(visible);
}
