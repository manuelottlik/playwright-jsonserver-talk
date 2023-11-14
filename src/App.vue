<template>
  <div class="app p-4">
    <header>
      <h2 class="p-2 text-xl text-center font-bold">Todo-Liste</h2>
      <div class="p-2 flex items-stretch">
        <input
          type="text"
          v-model="newTodoTitle"
          class="block p-2 border border-black flex-grow"
          @keyup.enter="clickCreate"
        />
        <button
          class="block border h-full p-2 bg-green-400 border-black border-l-0"
          @click="clickCreate"
        >
          hinzufügen
        </button>
      </div>
    </header>

    <main class="p-2">
      <ct-todo-item
        v-for="todo in todos"
        :key="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        @toggle="clickCompleted(todo)"
        @delete="clickDelete(todo)"
      />
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TodoItem from './components/TodoItem.vue'
import type { Todo } from './api/todo.js'
import api from './api/todo.js'

export default defineComponent({
  name: 'App',
  components: {
    'ct-todo-item': TodoItem
  },
  data() {
    return {
      newTodoTitle: '',
      todos: [] as Todo[]
    }
  },
  methods: {
    async fetchData() {
      this.todos = await api.list()
    },
    async clickCreate(): Promise<void> {
      if (!this.newTodoTitle) {
        return
      }

      await api.create({
        userId: 1,
        title: this.newTodoTitle,
        priority: 1,
        completed: false
      })

      this.newTodoTitle = ''

      this.fetchData()
    },
    async clickCompleted(todo: Todo) {
      await api.update(todo.id, {
        completed: !todo.completed
      })

      this.fetchData()
    },
    async clickDelete(todo: Todo) {
      await api.delete(todo.id)

      this.fetchData()
    }
  },
  mounted() {
    this.fetchData()
  }
})
</script>
<style>
.text-strike {
  text-decoration: line-through;
}
</style>
