<template>
  <div>
    <div>{{ message.text }}</div>
    <div v-if="message.attachments">
      <div
          v-for="(attachment,k) in message.attachments"
          :key="'attachments_'+message.id+'_'+k"
      >
        <div v-if="attachment.type == 'photo'">
          <a :href="attachment.photo.sizes.find(o => o.width == Math.max.apply(Math, attachment.photo.sizes.map(function(o) { return o.width; }))).url" target="_blank">
            <img :src="attachment.photo.sizes[0].url" />
          </a>
        </div>
        <div v-if="attachment.type == 'audio_message'">
          <audio controls>
            <source :src="attachment.audio_message.link_mp3" type="audio/mpeg">
          </audio>
        </div>
      </div>
    </div>
    <div class="border-left ml-2 pl-2" v-if="message.reply_message">
      <vk-message :message="message.reply_message" />
    </div>
    <div class="border-left ml-2 pl-2" v-if="message.fwd_messages">
      <vk-message
          v-for="fwd_message in message.fwd_messages"
          :key="`fwd_message_${fwd_message.id}`"
          :message="fwd_message"
      />
    </div>
    {{ message.created_at | moment('DD.MM.YYYY HH:mm') }}
  </div>
</template>

<script>
export default {
  name: "VkMessage",
  props: {
    message: {}
  }
}
</script>

<style scoped>

</style>
