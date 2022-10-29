<template>
  <p>
    {{ greeting }} {{ fullName }} <label href="#">{{ result() }}, {{ output }}</label>
  </p>
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
      a: -1,
      b: 1,
      firstName: 'phau',
      lastName: 'gogh',
    }
  },
  methods: {
    result: function () {
      // this function is not interested in the "b" variable, yet it runs every time when the result needs to be changed
      console.log('methods')
      return this.a < 0 ? 'Negative' : 'Positive'
    },
  },
  computed: {
    // these methods are invoked like attributes, without ()
    // this method runs only when the "a" variable is changed
    output: function () {
      console.log('computed')
      return this.a < 0 ? 'Negative' : 'Positive'
    },
    // Computed properties are by default getter-only,
    // but you can also provide a setter when you need it:
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      },
    },
  },
}
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

p {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
