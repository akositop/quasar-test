<template>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          :text="['hey, how are you?']"
          sent
        />
        <q-chat-message
          :text="['doing fine, how r you?']"
        />
        <q-input filled bottom-slots 
          v-model="text" 
          :label="labelText" 
          counter maxlength="12" 
          :dense="dense">
          <template v-slot:before>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </template>

          <template v-slot:append>
            <q-icon v-if="text !== ''" 
              name="close" 
              @click="text = ''" 
              class="cursor-pointer" />
            <q-icon name="schedule" />
          </template>

          <template v-slot:after>
            <q-btn round 
              dense 
              flat icon="send" />
          </template>
        </q-input>
      </div>
  </div>
</template>

<script src="./scripts/chat-box.js" />

<style scoped lang="scss">
@import "./styles/chat-box.scss";
</style>