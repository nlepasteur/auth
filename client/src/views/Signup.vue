<template>
  <div>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="username">username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter a username"
          required
        />
        <small id="usernameHelp" class="form-text text-muted"
          >Username must be longer than 2 characters and shorter than 30. Username can only contain
          alphanumeric characters and under_scores</small
        >
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            aria-describedby="passwordHelp"
            required
          />
          <small id="passwordHelp" class="form-text text-muted"
            >Password must be longer than 10 characters.</small
          >
        </div>

        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            placeholder="Confirm password"
            aria-describedby="confirmPasswordHelp"
            required
          />
          <small id="confirmPasswordHelp" class="form-text text-muted"
            >Please confirm your password.</small
          >
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Signup</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
