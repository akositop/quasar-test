<template>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <!-- Message sent from this device / Sender-->
        <!-- <div v-if="messages.sender.length > 0">
          <q-chat-message
            :text="messages.sender"
            text-sanitize
            size="6"
            sent
          />
        </div> -->
        <!-- Receiver -->
        <!-- <div v-if="messages.receiver.length > 0">
          <q-chat-message
            size="6"
            :text="messages.receiver"
            text-sanitize
          />
        </div> -->

        <div v-if="conversations.length > 0">
          <div v-for="(convo, i) in conversations" 
            :key="i">
            <div v-if="convo.isSender">
              <q-chat-message
                size="6"
                :text="convo.message"
                text-sanitize
                sent />
            </div>
            <div v-else>
              <q-chat-message
                size="6"
                :text="convo.message"
                text-sanitize />
            </div>
          </div>
        </div>
        <q-chat-message v-if="isTyping"
            text-color="white"
            bg-color="primary">
            <q-spinner-dots size="2rem" />
          </q-chat-message>
        <q-input filled bottom-slots 
          v-model="message" 
          :label="labelText"
          counter 
          maxlength="100" 
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