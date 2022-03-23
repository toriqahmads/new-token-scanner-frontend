<template>
  <div id="page-top">
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="mainNav">
      <div class="container">
          <a class="navbar-brand" href="#page-top">
            <!-- <img src="/img/navbar-logo.svg" alt="..." /> -->
            TOKEN RADAR
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fas fa-bars ms-1"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li class="nav-item"><a class="nav-link" href="#tokens">Token</a></li>
              <li class="nav-item"><a class="nav-link" href="#api">API</a></li>
            </ul>
          </div>
      </div>
    </nav>

    <!-- <section class="page-section" id="api">
      <div class="container">
        <div class="masthead-subheading">Interested on our API?</div>
        <a class="btn btn-primary btn-xl text-uppercase" href="#api">Let's contact us!</a>
      </div>
    </section> -->

    <section class="page-section bg-light" id="tokens">
      <div class="container">
        <b-container class="mb-5">
          <b-tabs content-class="mt-3">
            <b-tab v-for="(network, index) in networks"
              :key="index"
              :title="network"
              :active="networks[active_tab] == network"
              @click="() => active_tab = index"
            >
              <template v-if="networks[active_tab] == network">
                <TokenList :network="network" />
              </template>
            </b-tab>
          </b-tabs>
        </b-container>
      </div>
    </section>

    <!-- Footer-->
    <footer class="footer py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4 text-lg-start">Copyright &copy; 2022 - TOKEN RADAR</div>
          <div class="col-lg-4 my-3 my-lg-0">
            <a class="btn btn-dark btn-social mx-2" href="https://t.me/toriqahmads" target="_blank"><i class="fab fa-telegram"></i></a>
          </div>
          <div class="col-lg-4 text-lg-end">
            <a class="link-dark text-decoration-none me-3" href="https://t.me/sharingkala" target="_blank">Powered by @sharingkala</a>
            <a class="link-dark text-decoration-none me-3" href="https://t.me/untocall" target="_blank">@untocall</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import TokenList from '@/components/TokenList'

export default {
  name: 'Home',
  components: {
    TokenList
  },
  data() {
    return {
      active_tab: 0,
      networks: [
        'bsc',
        'eth',
        'ftm',
        'matic'
      ]
    }
  }
}
</script>
