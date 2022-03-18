<template>
  <div v-if="items && items.length > 0">
    <b-table :items="items" :fields="fields" responsive>
      <template v-for="(field, index) in fields" #[`cell(${field.key})`]="data">
        <span :key="index">
          <template v-if="field.type == 'actions'">
            <template v-for="(target, target_index) in field.targets">
              <b-button v-if="target.type == 'url'" variant="primary" :key="target_index" :href="items[data.index][target.key]" target="_blank">
                <b-icon :icon="target.symbol && target.symbol != '' ? target.symbol : 'arrow-up-right-circle'"></b-icon>
              </b-button>
            </template>
          </template>
          <template v-else-if="field.type == 'url'">
            <b-button :key="index" variant="primary" :href="items[data.index][field.key]" target="_blank">
              <b-icon :icon="field.symbol && field.symbol != '' ? field.symbol : 'arrow-up-right-circle'"></b-icon>
            </b-button>
          </template>
          <template v-else>
            {{ field.short_text ? short(items[data.index][field.key], field.short_length) : items[data.index][field.key] }}
          </template>
          <b-button v-if="field.copy" variant="success"
            v-clipboard:copy="items[data.index][field.key]" size="sm" class="sm-2"
            v-clipboard:success="onCopy"
          >
            <b-icon icon="files"></b-icon>
          </b-button>
        </span>
      </template>
    </b-table>
  </div>
  <div v-else>
    Token not found
  </div>
</template>

<script>
import shortText from '@/utils/string'
export default {
  name: 'Table',
  components: {},
  props: {
    value: Array,
    fields: Array
  },
  computed: {
    items(){
      return this.value.map(item => ({ ...item }))
    }
  },
  methods: {
    onCopy() {
    },
    short(text, length) {
      return shortText(text, length)
    }
  }
};
</script>

<style>
  thead, tbody, tfoot, tr, td, th {
    text-align: left;
    vertical-align: middle;
    width: 100px;
  }
</style>
