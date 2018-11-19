var Arrays = {
    noms: [],
    arrs: [],
    lengths: [],
    history: [],
    addArray: function(nom, arr) {
        this.noms.push(nom);
        this.arrs.push(arr);
        this.lengths.push(arr.length);
        this.history.push([]);
    },
    findArrByNom: function(nom) {
        var posArr = this.noms.indexOf(nom);
        return this.arrs[posArr];
    },
    findPosByNom: function(nom) {
        var posArr = this.noms.indexOf(nom);
        return posArr;
    },
    deleteArray: function(nom) {
        var posArr = this.noms.indexOf(nom);
        this.noms.splice(posArr, 1);
        this.arrs.splice(posArr, 1);
        this.lengths.splice(posArr, 1);
        this.history.splice(posArr, 1);
    },
    lengthOfArray: function(nom) {
        var posLength = this.noms.indexOf(nom);
        return this.lengths[posLength];
    },
    historyOfArray: function(nom, method) {
        var posArr = Arrays.findPosByNom(nom);
        this.history[posArr].push(method);
    },
    info: function() {
        console.log('nom', this.noms);
        console.log('elemets', this.arrs);
        console.log('length', this.lengths);
        console.log('history', this.history);
    }
}


//JQUERY
$(function () {
    $('[data-toggle="popover"]').popover()
});


var numLineasCode = 0;


function addArr() {
    var nomArr = document.getElementById('nomArr').value;
    var elements = document.getElementById('elementsArr').value;
    var list = document.getElementById('listArrs');

    if (elements.length === 0 || nomArr.length === 0) alert('Introduzca un nombre y uno o más elementos para añadir un array');
    else {
        nomArr = nomArr.trim();      
        var nomsArrs = Arrays.noms;

        if (nomsArrs.indexOf(nomArr) >= 0 || nomArr.indexOf(' ') >= 0) {
            if (nomsArrs.indexOf(nomArr) >= 0) 
                alert('No se permiten dos Arrays con el mismo nombre');
            else
                alert('No se permiten nombres con espacios');
                
                document.getElementById('nomArr').value = '';            
        }
        else {
            elements = elements.split(',');
            elements = elements.map(e => e.trim());
            Arrays.addArray(nomArr, elements);
    
            var opt = document.createElement('option');
            opt.value = nomArr;
            opt.text = nomArr;
            list.add(opt);
    
            document.getElementById('nomArr').value = '';
            document.getElementById('elementsArr').value = '';

            list.selectedIndex = Arrays.arrs.length;
            document.getElementById('selectedArray').value = Arrays.arrs[Arrays.arrs.length - 1];
            document.getElementById('lengthArr').value = Arrays.lengths[Arrays.arrs.length - 1];

            printCodeHTML('add', nomArr, elements);

            fillSelectArr2(nomArr);
        }
    }
}


function fillSelectArr2(momArr) {
    var list = document.getElementById('listArrs2');

    var opt = document.createElement('option');
    opt.value = momArr;
    opt.text = momArr;
    list.add(opt);
}


function changeListArr(dos) {
    if (dos == undefined) {
        var nom = document.getElementById('listArrs').value;
        document.getElementById('selectedArray').value = Arrays.findArrByNom(nom);
        document.getElementById('lengthArr').value = Arrays.lengthOfArray(nom);
    }
    else {
        var nom = document.getElementById('listArrs2').value;
        document.getElementById('selectedArray2').value = Arrays.findArrByNom(nom);
    }
}


function changeMethod() {
    var selectedMethod = document.getElementById('metodoArray').value;
    var list2 = document.getElementById('listArrs2');
    
    var divArgs = document.getElementById('divArgs');
    var array2 = document.getElementById('array2');
    var divSort = document.getElementById('divSort');
    var divFilter = document.getElementById('divFilter');

    switch (selectedMethod) {
        case 'reverse':
        case 'pop':
        case 'shift':
            divArgs.style.display = 'none';
            array2.style.display = 'none';
            divSort.style.display = 'none';
            divFilter.style.display = 'none';
        break;
        case 'push':
        case 'indexof':
        case 'fill':
        case 'splice':
        case 'unshift':
        case 'lastindexof':
        case 'includes':
            divArgs.style.display = 'flex';            
            array2.style.display = 'none';
            divSort.style.display = 'none';
            divFilter.style.display = 'none';
        break;
        case 'concat':
            list2.selectedIndex = 0;
            document.getElementById('selectedArray2').value = '';
            divArgs.style.display = 'none';     
            divSort.style.display = 'none';
            array2.style.display = 'flex';
            divFilter.style.display = 'none';
        break;
        case 'sort':
            divArgs.style.display = 'none';
            array2.style.display = 'none';
            divSort.style.display = 'flex';
            divFilter.style.display = 'none';
        break;
        case 'filter':
            divFilter.style.display = 'flex';
            divArgs.style.display = 'none';
            array2.style.display = 'none';
            divSort.style.display = 'none';
        break;
    }
    
}


function deleteArr() {
    var nom = document.getElementById('listArrs').value;
    var nomsArrs = Arrays.noms;

    if (nomsArrs.indexOf(nom) < 0) alert('Seleccione un array');
    else {
        var list = document.getElementById('listArrs');
        var list2 = document.getElementById('listArrs2');

        Arrays.deleteArray(nom);

        var posIndexSelect = list.selectedIndex;

        list.remove(list.selectedIndex);
        list2.remove(posIndexSelect);

        document.getElementById('selectedArray').value = '';
        document.getElementById('lengthArr').value = '';

        document.getElementById('selectedArray2').value = '';

        list.selectedIndex = 0;
        list2.selectedIndex = 0;
    }
}


function metodoArr() {
    var metodo = document.getElementById('metodoArray').value;
    var nom = document.getElementById('listArrs').value;
    var pos = Arrays.findPosByNom(nom);
    var inputArgumentos = document.getElementById('arguments');
    var currentArray = Arrays.findArrByNom(nom);
    var list = document.getElementById('listArrs');
    var list2 = document.getElementById('listArrs2');
    

    if (metodo == '' || nom == '') {
        if (metodo == '') alert('Debe seleccionar un método');
        else alert('Debe seleccionar un array')
    }
    else {
        switch (metodo) {
            case 'reverse':
                currentArray = currentArray.reverse();
                document.getElementById('selectedArray').value = currentArray;

                Arrays.historyOfArray(nom, 'reverse( )');

                printCodeHTML(metodo, nom);
            break;
            case 'pop':
                if (Arrays.lengths[pos] == 0) alert('No quedan elementos en el array');
                else {
                    alert('Eliminado el elemento ' + '"' + currentArray[currentArray.length - 1] + '"');
                    currentArray.pop();
                    Arrays.lengths[pos] = currentArray.length;
                    Arrays.historyOfArray(nom, 'pop( )');

                    refreshInputs(Arrays.arrs[pos], Arrays.lengths[pos]); 

                    printCodeHTML(metodo, nom);
                }
            break;
            case 'push':
                var argumentos = inputArgumentos.value;

                if (argumentos.length == 0) alert('No has añadido ningún argumento');
                else {
                    argumentos = argumentos.split(',');
                    argumentos = argumentos.map(e => e.trim());

                    for (let i = 0; i < argumentos.length; i++) {
                        currentArray.push(argumentos[i]);
                    }
                    Arrays.lengths[pos] = currentArray.length;
                    Arrays.historyOfArray(nom, 'push( )');

                    refreshInputs(Arrays.arrs[pos], Arrays.lengths[pos]);       

                    printCodeHTML(metodo, nom, argumentos);
                }
            break;
            case 'indexof':
                var argumentos = inputArgumentos.value;

                if (argumentos.length == 0) alert('No has añadido ningún argumento');
                else {
                    if (argumentos.indexOf(',') >= 0) alert('El método indexOf( ) solo necesita un argumento');
                    else {                      
                        argumentos = argumentos.trim();
                        var posIndexOf = currentArray.indexOf(argumentos);

                        if (posIndexOf < 0) alert('Elemento no encontrado');
                        else alert('ELEMENTO ' + '"' + currentArray[posIndexOf] + '"' + ' EN POSICIÓN ' + posIndexOf);   

                        Arrays.historyOfArray(nom, 'indexOf( )');
                        inputArgumentos.value = '';

                        printCodeHTML('indexOf', nom, argumentos);
                    }                 
                }
            break;
            case 'fill':
                var argumentos = inputArgumentos.value;

                if (argumentos.length == 0) alert('No has añadido ningún argumento');
                else {
                    if (argumentos.indexOf(',') >= 0) alert('El método fill( ) solo necesita un argumento');
                    else {
                        argumentos = argumentos.trim();
                        currentArray = currentArray.fill(argumentos);
                        Arrays.historyOfArray(nom, 'fill( )');

                        refreshInputs(Arrays.arrs[pos], Arrays.lengths[pos]); 

                        printCodeHTML(metodo, nom, argumentos);
                    }
                }
            break;
            case 'shift':
                if (Arrays.lengths[pos] == 0) alert('No quedan elementos en el array');
                else {
                    alert('Eliminado el elemento ' + '"' + currentArray.shift() + '"');

                    Arrays.lengths[pos] = currentArray.length;
                    Arrays.historyOfArray(nom, 'shift( )');

                    refreshInputs(Arrays.arrs[pos], Arrays.lengths[pos]); 

                    printCodeHTML(metodo, nom);
                }
            break;
            case 'splice':
                var argumentos = inputArgumentos.value;

                if (argumentos.length == 0) alert('No has añadido ningún argumento');
                else {
                    argumentos = argumentos.split(',');
                    argumentos = argumentos.map(e => e.trim());

                    currentArray.splice(...argumentos);
                        
                    Arrays.lengths[pos] = currentArray.length;
                    Arrays.historyOfArray(nom, 'splice( )');

                    refreshInputs(Arrays.arrs[pos], Arrays.lengths[pos]);

                    printCodeHTML(metodo, nom, argumentos);
                }
            break;
            case 'unshift': 
                var argumentos = inputArgumentos.value;

                if (argumentos.length == 0) alert('No has añadido ningún argumento');
                else {
                    argumentos = argumentos.split(',');
                    argumentos = argumentos.map(e => e.trim());

                    for (let i = argumentos.length - 1; i >= 0 ; i--) {
                        currentArray.unshift(argumentos[i]);
                    }
                    Arrays.lengths[pos] = currentArray.length;
                    Arrays.historyOfArray(nom, 'unshift( )');

                    refreshInputs(Arrays.arrs[pos], Arrays.lengths[pos]);       

                    printCodeHTML(metodo, nom, argumentos);
                }
            break;
            case 'concat':
                if (list.selectedIndex == 0 || list2.selectedIndex == 0) alert('Debe seleccionar dos arrays');
                else {
                    var arr1 = Arrays.findArrByNom(list.value);
                    var arr2 = Arrays.findArrByNom(list2.value);

                    var arrConcat = arr1.concat(arr2);                   

                    var nomArr1 = Arrays.noms[Arrays.findPosByNom(list.value)];
                    var nomArr2 = Arrays.noms[Arrays.findPosByNom(list2.value)];

                    Arrays.historyOfArray(nom, 'concat( )');
                    alert('RESULTADO: [' + arrConcat + ']\n \nLENGTH: ' + arrConcat.length);     
                    
                    printCodeHTML(metodo, nomArr1, nomArr2);
                }
            break;
            case 'lastindexof':
                var argumentos = inputArgumentos.value;

                if (argumentos.length == 0) alert('No has añadido ningún argumento');
                else {
                    if (argumentos.indexOf(',') >= 0) alert('El método lastIndexOf( ) solo necesita un argumento');
                    else {                      
                        argumentos = argumentos.trim();
                        var posLastIndexOf = currentArray.lastIndexOf(argumentos);

                        if (posLastIndexOf < 0) alert('ELEMENTO NO ENCONTRADO');
                        else alert('ELEMENTO ' + '"' + currentArray[posLastIndexOf] + '"' + ' EN POSICIÓN ' + posLastIndexOf);   

                        Arrays.historyOfArray(nom, 'lastIndexOf( )');
                        inputArgumentos.value = '';

                        printCodeHTML('lastIndexOf', nom, argumentos);
                    }                 
                }
            break;
            case 'includes':
                var argumentos = inputArgumentos.value;

                if (argumentos.length == 0) alert('No has añadido ningún argumento');
                else {
                    if (argumentos.indexOf(',') >= 0) alert('El método includes( ) solo necesita un argumento');
                    else {                      
                        argumentos = argumentos.trim();
                        var include = currentArray.includes(argumentos);

                        if (include == false) alert('ELEMENTO NO ENCONTRADO');
                        else alert('ELEMENTO "' + argumentos + '" ENCONTRADO');   

                        Arrays.historyOfArray(nom, 'includes( )');
                        inputArgumentos.value = '';

                        printCodeHTML(metodo, nom, argumentos);
                    }                 
                }
            break;
            case 'sort':
                var radioNum = document.getElementById('radioNum').checked;
                var radioAl = document.getElementById('radioAl').checked;

                if (!radioNum && !radioAl) alert('Debes seleccionar una opción');
                else {
                    if (radioNum) currentArray.sort((a, b) => {return a-b});
                    else currentArray.sort();

                    Arrays.historyOfArray(nom, 'sort( )');

                    refreshInputs(Arrays.findArrByNom(nom), Arrays.lengths[pos]);  

                    printCodeHTML(metodo, nom);
                }
            break;
            case 'filter':
                var argumentsFilter = document.getElementById('argumentsFilter').value;
                var condition = document.getElementById('selectCondition').value;

                if (argumentsFilter.length == 0) alert('No has añadido ningún valor');
                else {
                    if (argumentsFilter.indexOf(',') >= 0) alert('Solo es necesario un valor, si deseas utilizar un número decimal utilice . en lugar de ,');
                    else {
                        if (isNaN(argumentsFilter)) {
                            var currentArrayStrings = currentArray.filter(e => isNaN(e));
                        }
                        else {
                            var currentArrayNums = currentArray.filter(e => !isNaN(e));
                        }

                        var arrFilter;

                        switch (condition) {
                            case '<':
                                if (isNaN(argumentsFilter)) arrFilter = currentArrayStrings.filter(e => e < argumentsFilter);
                                else arrFilter = currentArrayNums.filter(e => e < Number(argumentsFilter));
                            break;
                            case '<=':
                                if (isNaN(argumentsFilter)) arrFilter = currentArrayStrings.filter(e => e <= argumentsFilter);
                                else arrFilter = currentArrayNums.filter(e => e <= Number(argumentsFilter));
                            break;
                            case '>':
                                if (isNaN(argumentsFilter)) arrFilter = currentArrayStrings.filter(e => e > argumentsFilter);
                                else arrFilter = currentArrayNums.filter(e => e > Number(argumentsFilter));
                            break;
                            case '>=':
                                if (isNaN(argumentsFilter)) arrFilter = currentArrayStrings.filter(e => e >= argumentsFilter);
                                else arrFilter = currentArrayNums.filter(e => e >= Number(argumentsFilter));
                            break;
                            case '==':
                                if (isNaN(argumentsFilter)) arrFilter = currentArrayStrings.filter(e => e == argumentsFilter);
                                else arrFilter = currentArrayNums.filter(e => e == Number(argumentsFilter));
                            break;
                            case '!=':
                                if (isNaN(argumentsFilter)) arrFilter = currentArray.filter(e => e != argumentsFilter);
                                else arrFilter = currentArray.filter(e => e != Number(argumentsFilter));
                            break;
                        }
                        alert('RESULTADO: [' + arrFilter + ']' + '\n \n LENGTH: ' + arrFilter.length);
                        
                        Arrays.historyOfArray(nom, 'filter( )');

                        printCodeHTML(metodo, nom);

                        document.getElementById('argumentsFilter').value = '';
                    }
                }
            break;
        }
    }
}


function printCodeHTML(method, nomArr, argumentos) {
    var resHTML = document.getElementById('divYourCode');

    numLineasCode++;
    
        if (numLineasCode <= 9)
            resHTML.innerHTML += '<span>&nbsp&nbsp&nbsp&nbsp' + numLineasCode +  '&nbsp&nbsp&nbsp</span>' + createCodeHTML(method, nomArr, argumentos) + '<br />';

        if  (numLineasCode > 9) 
            resHTML.innerHTML += '<span>&nbsp&nbsp' + numLineasCode +  '&nbsp&nbsp&nbsp</span>' + createCodeHTML(method, nomArr, argumentos) + '<br />';

        if (numLineasCode > 99)
            resHTML.innerHTML += '<span>' + numLineasCode +  '&nbsp&nbsp&nbsp</span>' + createCodeHTML(method, nomArr, argumentos) + '<br />';
}


function createCodeHTML(method, nomArr, argumentos) {
    var codeHTML;

    switch (method) {
        //CREAR ARRAY
        case 'add':
            codeHTML = '<code class="code"><var class="keyWord">var</var> <var>' + nomArr + '</var> = ['; 

            for (let i = 0; i < argumentos.length; i++) {
                if (i == argumentos.length - 1) {
                    if (isNaN(argumentos[i])) codeHTML += '<var class="strings">"' + argumentos[i] + '"</var>';
                    else codeHTML += '<var class="nums">' + argumentos[i] + '</var>';
                }
                else {
                    if (isNaN(argumentos[i])) codeHTML += '<var class="strings">"' + argumentos[i] + '"</var>, ';
                    else codeHTML += '<var class="nums">' + argumentos[i] + '</var>, ';
                }
            }
        
            codeHTML += '];</code>';
        break;
        //MÉTODOS QUE NO NECESITAN ARGUMENTOS
        case 'reverse':
        case 'pop':
        case 'shift':
            codeHTML = '<code class="code"><var>' + nomArr + '</var>.<var class="method">' + method + '</var>();</code>';
        break;
        //MÉTODOS QUE SOLO NECESITAN UN ARGUMENTO
        case 'indexOf':
        case 'fill':
        case 'lastIndexOf':
        case 'includes':
            codeHTML = '<code class="code"><var>' + nomArr + '</var>.<var class="method">' + method + '</var>(';

            if (isNaN(argumentos)) codeHTML += '<var class="strings">"' + argumentos + '"</var>);</code>';
            else codeHTML += '<var class="nums">' + argumentos + '</var>);</code>';
        break;
        //MÉTODOD QUE PUEDEN LLEVAR MÁS DE UN ARGUMENTO
        case 'push':
        case 'splice':
        case 'unshift':
            codeHTML = '<code class="code"><var>' + nomArr + '</var>.<var class="method">' + method + '</var>(';

            for (let i = 0; i < argumentos.length; i++) {
                if (i == argumentos.length - 1) {
                    if (isNaN(argumentos[i])) codeHTML += '<var class="strings">"' + argumentos[i] + '"</var>';
                    else codeHTML += '<var class="nums">' + argumentos[i] + '</var>';
                }
                else {
                    if (isNaN(argumentos[i])) codeHTML += '<var class="strings">"' + argumentos[i] + '"</var>, ';
                    else codeHTML += '<var class="nums">' + argumentos[i] + '</var>, ';
                }
            }

            codeHTML += ');</code>';
        break;
        case 'filter':
            var argumentsFilter = document.getElementById('argumentsFilter').value;
            var condition = document.getElementById('selectCondition').value;

            codeHTML = '<code class="code"><var>' + nomArr + '</var>.<var class="method">' + method + '</var>(';

            if (isNaN(argumentsFilter)) 
                codeHTML += '<var class="strings">e</var><var class="keyWord"> => </var><var>e </var>' + condition + ' ' + '<var class="strings">"' + argumentsFilter + '"</var>);</code>';
            else
                codeHTML += '<var class="strings">e</var><var class="keyWord"> => </var><var>e </var>' + condition + ' ' + '<var class="nums">' + argumentsFilter + '</var>);</code>';

        break;
        case 'sort':
            var radioNum = document.getElementById('radioNum').checked;

            codeHTML = '<code class="code"><var>' + nomArr + '</var>.<var class="method">' + method + '</var>(';

            if (radioNum) codeHTML += '(<var class="strings">a</var>, <var class="strings">b</var>) <var class="keyWord">=> </var>{<var class="keyWord">return</var> <var>a</var> - <var>b</var>});';
            else codeHTML += ');</code>';
        break;
        case 'concat':
            codeHTML = '<code class="code"><var>' + nomArr + '</var>.<var class="method">' + method + '</var>(' + argumentos + ');</code>';
        break;
    }

    return codeHTML;
}


function refreshInputs(selected, length) {
    document.getElementById('selectedArray').value = selected;
    document.getElementById('lengthArr').value = length    
    document.getElementById('arguments').value = '';  
}

function mutate() {
    metodoArr();
}


function navegadorLanguage() {
    var navegadorL = navigator.language;

    var lblAddArray = document.getElementById('lblAddArray');
    var btnAddArray = document.getElementById('btnAddArray');
    var lblSelectArray = document.getElementById('lblSelectArray');
    var btnDeleteArray = document.getElementById('btnDeleteArray');
    var lblSelectArray2 = document.getElementById('lblSelectArray2');
    var lblLength = document.getElementById('lblLength');
    var lblAddArguments = document.getElementById('lblAddArguments');
    var lblOrderSort = document.getElementById('lblOrderSort');
    var lblOrderNum = document.getElementById('lblOrderNum');
    var lblOrderAlf = document.getElementById('lblOrderAlf');
    var lblFilterCondition = document.getElementById('lblFilterCondition');
    var helpMethod = document.getElementById('helpMethod');
    var btnMutate = document.getElementById('btnMutate');
    var lblWatchCode = document.getElementById('lblWatchCode');


    if (navegadorL == 'es-ES' || navegadorL == 'es') {
        lblAddArray.textContent = 'AÑADIR ARRAY';
        btnAddArray.textContent = 'AÑADIR';
        lblSelectArray.textContent = 'SELECCIONAR ARRAY';
        btnDeleteArray.textContent = 'ELIMINAR';
        lblSelectArray2.textContent = 'SELECCIONAR ARRAY 2';
        lblLength.textContent = 'LONGITUD';
        lblAddArguments.textContent = 'AÑADIR ARGUMENTOS';
        lblOrderSort.textContent = 'ORDENADO';
        lblOrderNum.textContent = 'NUMÉRICAMENTE';
        lblOrderAlf.textContent = 'ALFABÉTICAMENTE';
        lblFilterCondition.textContent = 'CONDICIÓN';
        helpMethod.textContent = 'MÉTODO';
        btnMutate.textContent = 'MUTAR';
        lblWatchCode.textContent = 'OBSERVA TU CÓDIGO';
    }

    if (navegadorL == 'en') {
        lblAddArray.textContent = 'ADD ARRAY';
        btnAddArray.textContent = 'ADD';
        lblSelectArray.textContent = 'SELECT ARRAY';
        btnDeleteArray.textContent = 'DELETE';
        lblSelectArray2.textContent = 'SELECT ARRAY 2';
        lblLength.textContent = 'LENGTH';
        lblAddArguments.textContent = 'ADD ARGUMENTS';
        lblOrderSort.textContent = 'ORDERED';
        lblOrderNum.textContent = 'NUMERICALLY';
        lblOrderAlf.textContent = 'ALPHABETICALLY';
        lblFilterCondition.textContent = 'CONDITION';
        helpMethod.textContent = 'METHOD';
        btnMutate.textContent = 'MUTATE';
        lblWatchCode.textContent = 'WATCH YOUR CODE';
    }
}


function openWindowMethods() {
    if (document.getElementById('metodoArray').value == '') alert('Debe seleccionar un método');
    else {
        window.open('./methods.html', '', 'top=85px, left=10px, width=600px, height=500px');
    }
}


function onPageLoad() {
    document.getElementById('nomArr').value = '';
    document.getElementById('elementsArr').value = '';   
    document.getElementById('listArrs').selectedIndex = 0;
    document.getElementById('selectedArray').value = '';
    document.getElementById('listArrs2').selectedIndex = 0;
    document.getElementById('selectedArray2').value = '';
    document.getElementById('lengthArr').value = '';
    document.getElementById('arguments').value = '';
    document.getElementById('metodoArray').selectedIndex = 0;
    document.getElementById('radioNum').checked = false;
    document.getElementById('radioAl').checked = false;
    document.getElementById('argumentsFilter').value = '';

    var widthDevice = screen.width;

    if (widthDevice < 400) {
        alert('Esta página todavía no está optimizada para móviles. Estamos trabajando en ello.');
    }

    navegadorLanguage();
}
