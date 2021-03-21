<template>
  <div style="position: absolute; right: 0">
    <q-btn flat>
      <q-icon name="fas fa-ellipsis-v" style="font-size: 1em;" color="grey" />
      <q-menu cover anchor="bottom right" auto-close
        transition-show="scale" transition-hide="scale">
        <q-list>
          <q-item v-for="(item, index) in itens" :key="index" clickable @click="menuClick(item, index)">
            <q-item-section v-if="item.icon" avatar>
              <q-icon size="sm" :color="item.icon.color" :name="item.icon.name" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script>
export default {
  name: 'expansion-menu',
  props: {
    itens: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    menuClick (menuItem, index) {
      this.$emit('menuClick', { menuItem, index })
    }
  }
}
</script>
