document.getElementById('new').addEventListener('click', () => {
    let new_task = prompt('Enter a new TO DO:');
    if (new_task && new_task.trim() !== ""){
        add_task(new_task.trim());
        save_tasks();
    }
});
    
function add_task(new_task) {
    let div = document.createElement('div');
    div.className = 'task';
    div.textContent = new_task;
    div.addEventListener('click', () => {
        if (confirm('Do you want to remove this TO DO?'))
        {
            div.remove();
            save_tasks();
        }
    });
    let ft_list = document.getElementById('ft_list');
    ft_list.prepend(div);
}

function save_tasks() {
    let tasks = [];
    document.querySelectorAll('#ft_list .task').forEach(task_div => {
        tasks.push(task_div.textContent);
    });

    let date = new Date();
    date.setTime(date.getTime() + 7*24*60*60*1000);

    document.cookie =
        "todo_list=" + encodeURIComponent(JSON.stringify(tasks)) +
        "; expires=" + date.toUTCString() +
        "; path=/";
}


function set_cookie(name, value, days)
{
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function load_tasks() {
    let tasks_str = get_cookie('todo_list');
    if (!tasks_str) return;

    try {
        let tasks = JSON.parse(decodeURIComponent(tasks_str));
        tasks.reverse().forEach(task => add_task(task));
    } catch (e) {
        console.error('Erro ao carregar tarefas', e);
    }
}


function get_cookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return decodeURIComponent(match[2]);
    }
    return null;
}


load_tasks();
