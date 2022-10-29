<template>
  <div class="layer">noise</div>
</template>

<script>
export default {
  props: {
    ninjas: {
      type: Array,
      required: !true,
    },
  },
  data() {
    return {
      greeting: 'hola! 🍄',
    }
  },
  methods: {},
  computed: {},
}
</script>

<style scoped>
.layer {
  border: 0.5rem;
  color: #42b983;
}
/* 
label {
  margin: 0 0.5em;
  font-weight: bold;
}

p {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
} */
</style>
