<template>
  <div class="wrapper">
    <div class="todo-wrapper">
      <header class="todo-header">
          <h1 class="todo-header__title">Список дел</h1>
      </header>

      <ul class="todo-list">
        <template v-if="todoItems.length">
          <li
            v-for="todoItem in todoItems"
            :key="todoItem.id"
            class="todo-item"
          >
            <div class="todo-item__name">
              <input
                type="checkbox"
                :value="todoItem.complete"
                :id="todoItem.id"
                @change="handleTodoComplete({ id: todoItem.id, complete: todoItem.complete })"
              >
              <label :for="todoItem.id">{{ todoItem.label }}</label>
            </div>
            <button class="todo-item__delete-btn" type="button" @click="handleTodoRemove(todoItem.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </li>
        </template>
        <span v-else>Нет задач</span>
      </ul>

      <footer class="todo-action">
        <input
          v-model="newValue"
          class="todo-action__field"
          type="text"
          placeholder="Введите текст задачи..."
          @change="handleAddTodo"
        >
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomePage',

    data () {
      return {
        todoItems: [],

        newValue: ''
      }
    },

    mounted() {
      this.fetchTodos()
    },

    methods: {
      async fetchTodos() {
        const response = await fetch('/api/todo')
        const todos = await response.json()
        this.todoItems = todos
      },

      async handleTodoComplete(params) {
        console.log('params', params)
        await fetch(`/api/todo/${params.id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            complete: !params.complete
          })
        })
      },

      async handleTodoRemove(id) {
        await fetch('/api/todo/' + id, {
          method: 'DELETE',
        })
        this.todoItems = this.todoItems.filter(todo => todo.id !== id)
      },

      async handleAddTodo() {
        const response = await fetch('/api/todo', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            label: this.newValue,
            complete: false
          })
        })

        const newTodo = await response.json()
        console.log('newTodo', newTodo)

        this.todoItems.push(newTodo)

        this.newValue = ''
      }
    }
  }
</script>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #a59f9f;
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    padding: 50px 0;
  }

  .todo-wrapper {
    width: 300px;
    background-color: #f0f0f0;
    border-radius: 5px;
    border: 1px solid #989696;
  }

  .todo-header {
    background-color: #818181;
    padding-top: 12px;
    padding-bottom: 12px;
    padding: 12px;
     
    &__title {
      font-size: 12px;
      text-transform: uppercase;
      color: #fff;
      text-align: center;
    }
  }

  .todo-list {
    list-style: none;
  }

  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    font-weight: 700;
    color: #413a36;

    &__name {
      display: flex;
      align-items: center;
    }

    &__delete-btn {
      border: 0;
      outline: none;
    }
  }

  .fas {
    font-size: 18px;
    cursor: pointer;
  }

  .todo-action {
    padding: 12px 15px;
  }

  .todo-action .todo-action__field {
    width: 100%;
    border: none;
    padding: 8px 12px 8px;
    font-size: 10px;
    background-color: #e5e5e5;
  }

  .todo-action .todo-action__field::placeholder {
    color: #9a9393;
  }

  /* стилизация чекбокса */
  input[type="checkbox"]:checked,
  input[type="checkbox"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  input[type="checkbox"]:checked + label,
  input[type="checkbox"]:not(:checked) + label {
    position: relative;
    display: inline-block;
    padding-left: 40px;
    line-height: 20px;
    cursor: pointer;
  }

  input[type="checkbox"]:checked + label::before,
  input[type="checkbox"]:not(:checked) + label::before {
    position: absolute;
    content: "";
    left: 0px;
    top: 0px;
    width: 18px;
    height: 18px;
    border: 2px solid #000;
    background-color: #ededed;
  }

  input[type="checkbox"]:checked + label::after,
  input[type="checkbox"]:not(:checked) + label::after {
    position: absolute;
    content: "";
    transition: all 0.2s ease;
  }

  input[type="checkbox"]:checked + label::after,
  input[type="checkbox"]:not(:checked) + label:after {
    left: 3px;
    top: 5px;
    width: 12px;
    height: 5px;
    border-left: 4px solid #000;
    border-bottom: 4px solid #000;
    transform: rotate(-45deg);
  }

  input[type="checkbox"]:not(:checked) + label::after {
    opacity: 0;
  }

  input[type="checkbox"]:checked + label::after {
    opacity: 1;
  }
</style>
