<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :xlink:href="getName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon-svg',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      getName () {
        return `#icon-${this.name}`
      }
    }
  }
</script>

<style>
  .icon-svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
