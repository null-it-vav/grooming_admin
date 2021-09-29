<template>
  <div class="card p-4">
    <table class="table table-adaptive" v-if="comments.data.length > 0">
      <thead>
        <tr>
          <th>{{$t('app.components.comments.fields.text')}}</th>
          <th>{{$t('app.components.comments.fields.user')}}</th>
          <th>{{$t('app.components.comments.fields.date')}}</th>
          <th>{{$t('app.components.comments.fields.status')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(comment, k) in comments.data" :key="k">
          <td :data-label="$t('app.components.comments.fields.text')">{{comment.comment}}</td>
          <td :data-label="$t('app.components.comments.fields.user')">
            <b-avatar
              :src="comment.user_info.photo"
              class="mr-2"
            />
            {{comment.user_info.name}}
          </td>
          <td :data-label="$t('app.components.comments.fields.date')">{{comment.created_at | moment('YYYY-MM-DD HH:mm')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { comments } from "@/api";

export default {
  name: "CommentsIndex",
  data() {
    return {
      comments: {
        data: [],
        page: 1,
        per_page: this.qty ? this.qty : 15,
        last_page: 1,
        total: 0,
      },
      filter: {
        moderated: 0
      }
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments(){
      comments({
        to_masters: 1,
        moderated: this.filter.moderated
      })
      .then(response => {
        this.comments.data = response.data.data.comments.data
        this.comments.total = response.data.data.comments.total
        this.comments.last_page = response.data.data.comments.last_page
      })
    }
  }
}
</script>

<style scoped>

</style>
