<template>
  <div class="todo-item py-2 flex items-center">
    <input
      type="checkbox"
      :checked="completed"
      @change="$emit('toggle')"
      class="text-xl mr-4 h-6 w-6"
    />
    <span class="todo-item-text flex-grow" :class="{ 'text-strike': completed }">{{ title }}</span>

    <button class="button border border-black bg-red-400 p-1" @click="$emit('delete')">
      löschen
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TodoItem',
  props: {
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    }
  }
})
</script>
