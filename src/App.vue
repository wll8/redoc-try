<script setup>
import { onMounted } from 'vue';
import '../try.js'

onMounted(() => {
  window.initTry({
    openApi: `https://petstore.swagger.io/v2/swagger.json`,
    ...window.initTryOptions,
  })
})
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
}
</style>