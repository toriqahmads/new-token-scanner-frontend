<template>
  <div>
    <Table v-model="data[network_index].items" :fields="fields"></Table>
    <span v-if="data[network_index].has_next && !loading">Scrool down to load More...</span>
    <b-button v-if="loading" variant="primary" disabled>
      <b-spinner small type="grow"></b-spinner>
        Loading...
    </b-button>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Table from './Table.vue'

export default {
  name: 'TokenList',
  props: {
    network: String
  },
  components: {
    Table
  },
  data() {
    return {
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
      loading: false,
      fields: [
        {
          key: 'name',
          label: 'Name',
          type: 'text'
        },
        {
          key: 'symbol',
          label: 'Symbol',
          type: 'text'
        },
        {
          key: 'address',
          label: 'Address',
          symbol: '',
          type: 'text',
          copy: true,
          short_text: true,
          short_length: 5
        },
        {
          key: 'created_at',
          label: 'Created',
          symbol: '',
          type: 'text'
        },
        {
          key: 'explore_token',
          label: 'Explore',
          symbol: '',
          type: 'actions',
          targets: [{
            key: 'explore_token',
            label: 'Explore',
            symbol: 'search',
            type: 'url',
          }, {
            key: 'explore_owner',
            label: 'Explore',
            symbol: 'person-circle',
            type: 'url',
          }]
        },
      ]
    }
  },
  computed: {
    ...mapGetters('tokenList', {
      data: 'data'
    }),
    network_index() {
      const index = _.findIndex(this.data, { network: this.network })
      return index > -1 ? index : 0
    }
  },
  methods: {
    async getTokenList() {
      this.loading = true
      const { last_visible } = this.data[this.network_index]
      await this.$store.dispatch('tokenList/getTokens', {
        network: this.network,
        start_date: this.start_date,
        end_date: this.end_date,
        last_visible
      })

      this.loading = false
    },
  },
  async beforeMount() {
    await this.getTokenList()
  },
  async mounted () {
    window.onscroll = async() => {
      let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow && this.data[this.network_index].has_next) {
        await this.getTokenList()
      }
    };
  },
}
</script>
