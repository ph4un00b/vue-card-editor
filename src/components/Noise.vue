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
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  transform: translateY(-10%);
  /* transform: translateX(50%); */
  width: 80vw;
  height: 80vw;
  border: 0.1rem solid;
  border-color: red;
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
