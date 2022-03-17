  <template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img class="privateImage-svg left" src="~assets/img/profile/avatar.svg" alt="">
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img class="icon-mobile" src="~assets/img/profile/phone.svg" alt="">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img class="arrow-svg right" src="~assets/img/common/arrow-left.svg" alt="">
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .left {
    float: left;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 22px;
    left: -16px;
    top: 0;
  }
</style>
