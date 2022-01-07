<template>
  <nav class="navbar navbar-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        >MediumClone</router-link
      >
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
            >Home</router-link
          >
        </li>

        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'createArticle' }">
              <i class="ion-compose"></i> &nbsp; New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }">
              <i class="ion-gear-a"></i> &nbsp; Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'userProfile',
                params: { slug: currentUser.username },
              }"
            >
              <img class="user-pic" :src="currentUser.image" /> &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonimus">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{ name: 'login' }"
            >
              SignIn
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{ name: 'register' }"
            >
              SignUp
            </router-link>
            {{ isAnonimus }}
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/modules/auth";

export default {
  name: "McvTopBar",
  computed: {
    ...mapGetters({
      //currentUser: (state) => state.auth.currentUser,
      //isLoggedIn: (state) => state.auth.isLoggedIn,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonimus: getterTypes.isAnonimus,
      currentUser: getterTypes.currentUser,
    }),
  },
};
</script>
