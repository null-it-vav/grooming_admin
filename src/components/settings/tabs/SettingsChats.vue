<template>
  <b-card :title="$t('app.components.settings.tabs.chats')" class="mb-2">
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group">
          <form-group
              type="switch"
              name="client_view_chat_status"
              key="client_view_chat_status"
              v-model="settings.client_view_chat_status"
              :label="$t('app.components.settings.client_view_chat_status')"
          />
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import FormGroup from "@/components/base/FormGroup";
export default {
name: "SettingsChat",
  components: {FormGroup},
  props: {
    errors: {},
    settings: {}
  },
}
</script>

<style scoped>

</style>
