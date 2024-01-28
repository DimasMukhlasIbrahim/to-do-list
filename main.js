window.addEventListener ('load',() => {
    todos = JSON.parse (localStorage.getItem ('todos')) || [];
    const nameinput = document.querySelector ('#name');
    const newtodoform = document.querySelector ("#new-todo-form")

    const username = localStorage.getItem ('username') || '' ;

    nameinput.value = username

    nameinput.addEventListener ('change', e => {
        localStorage.setItem ('username', e.target.value)
    })

    newtodoform.addEventListener ('submit', e => {
        e.preventDefault();

        const todo = {
            content : e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo)

        localStorage.setItem ('todos', JSON.stringify(todos))

        e.target.reset ();

        DisplayTodos();
    } )
    DisplayTodos();
})

function DisplayTodos(){
    const todolist = document.querySelector ('#todo-list')
    todolist.innerHTML = ''

    todos.forEach(todo => {
        const todoitem= document.createElement ('div')
        todoitem.classList.add ('todo-item')

        const label = document.createElement ('label')
        const input = document.createElement ('input')
        input.type = 'checkbox'
        input.checked = todo.done
        input.style.display = 'none'



        const span = document.createElement ("span")
        span.classList.add ('buble')

        if (todo.category == 'pribadi') {
            span.classList.add ('pribadi')
        } else {
            span.classList.add ('bisnis')
        }

        const content = document.createElement('div')
        content.classList.add ('todo-content')
        // content.innerHTML = `<input type = 'text' value= "${todo.content}"  readonly  class = 'content-input' />`

        // input yang di dalam content
       const content_input = document.createElement ('input')
       content_input.classList.add ('content-input')
         content_input.type = 'text'
         content_input.value = todo.content
         content_input.setAttribute ('readonly', 'readonly')

        const actions = document.createElement ("div")
        actions.classList.add ('actions')

        const edit = document.createElement ("button")
        edit.classList.add ('edit')
        edit.innerHTML = 'edit'

        const hapus = document.createElement ('button')
        hapus.classList.add ('hapus')
        hapus.innerHTML = 'hapus'



        // const waktu = document.createElement ('div')
        // waktu.classList.add ('date')
        // waktu.innerHTML =

        //  arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
        // date = new Date();
        // var detik = date.getSeconds();
        // var menit = date.getMinutes();
        // var jam = date.getHours();
        // var hari = date.getDay();
        // var tanggal = date.getDate();
        // var bulan = date.getMonth();
        // var tahun = date.getFullYear();
   
        // waktu.innerHTML = tanggal+"-"+arrbulan[bulan]+"-"+tahun+"<br/>"+jam+" : "+menit;
        // console.log (waktu)


        if (todo.done) {
            todoitem.classList.add ('todo')
        }

        
        input.addEventListener('click',e => {
            todo.done = e.target.checked;
            localStorage.setItem ('todos', JSON.stringify(todos));

            if (todo.done) {
                todoitem.classList.add ('done')
            } else {
                todoitem.classList.remove ('done')
            }
        })

        
        // syntaks fungsi edit dan hapus
        // edit
        edit.addEventListener ('click', ()=> {
          if(edit.innerText.toLowerCase() == 'edit') {
            content_input.removeAttribute ('readonly')
            content_input.focus()
            edit.innerText = 'simpan'
            
            content_input.addEventListener ('blur', e => {
                content_input.setAttribute ('readonly', 'readonly')
                todo.content = e.target.value
                localStorage.setItem ('todos', JSON.stringify (todos))
                DisplayTodos();
            })
          } else {
            content_input.setAttribute ('readonly', 'readonly')
            edit.innerText = 'edit'
          }
        })

        //hapus
        hapus.addEventListener ('click', e => {
            todos = todos.filter (t => t != todo)
            localStorage.setItem ('todos',JSON.stringify(todos) )
            DisplayTodos();

        })

        // syntaks untuk saling menghubungkan class
        // memasukkan div todoitem ke todolist
        todolist.appendChild(todoitem)

        // memasukkan label,todo content, actions ke div todoitem
        todoitem.appendChild(label)
        todoitem.appendChild(content)
        todoitem.appendChild(actions)
        // todoitem.appendChild (waktu)

        // memasukkan input content ke div content
        content.appendChild(content_input)
        // memasukkan input dan span ke label
        label.appendChild(input)
        label.appendChild(span)

        // memasukkan edit,dn hapus ke actions
        actions.appendChild(edit)
        actions.appendChild(hapus)

        // content.appendChild(content_input)




        



        

    });
}

