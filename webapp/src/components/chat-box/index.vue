<template>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <!-- Message sent from this device -->
        <q-chat-message
          :text="sentText"
          sent
        />
        <!-- Message receive from this device -->
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          text-color="white"
          bg-color="primary"
        >
          <q-spinner-dots size="2rem" />
        </q-chat-message>
        
        <q-input filled bottom-slots 
          v-model="text" 
          :label="labelText"
          @keypress="pressButton"
          counter 
          maxlength="50" 
          :dense="dense">
          <template v-slot:before>
            <q-avatar>
              <img src="https://cdn.stocksnap.io/img-thumbs/960w/M93Z01SJAF.jpg">
            </q-avatar>
          </template>

          <template v-slot:after>
            <q-btn round 
              dense
              flat 
              icon="send"
              @click="sendMessage" />
          </template>
        </q-input>
      </div>
  </div> 
</template>

<script src="./scripts/chat-box.js" />

<style scoped lang="scss">
@import "./styles/chat-box.scss";
</style>