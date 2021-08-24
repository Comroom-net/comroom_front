<template>
  <div>
    <div>
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">비밀번호 분실</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="." method="POST">
              <div class="form-group">
                <label for="id_email">이메일:</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="가입 시 입력한 이메일"
                  required
                  id="id_email"
                />
                <label for="id_teacher_name">선생님 성함:</label>
                <input
                  type="text"
                  name="teacher_name"
                  class="form-control"
                  maxlength="16"
                  required
                  id="id_teacher_name"
                />
                <input type="hidden" name="action" value="get_admin" id="id_action" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
            <button type="submit" class="btn btn-primary">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword"
};
</script>