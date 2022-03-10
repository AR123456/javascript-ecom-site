const layout = require("../../layout");
const { getError } = require("../../helpers");

module.exports = ({ req, errors }) => {
  console.log(errors);
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Customer Sign Up</h1>
                <div class="field">
                <label class="label">First Name</label>
                <input class="input" placeholder="First Name" name="fname" />
                <p class="help is-danger">${getError(errors, "fname")}</p>
                </div>
                <div class="field">
                <label class="label">Last Name</label>
                <input class="input" placeholder="Last Name" name="lname" />
                <p class="help is-danger">${getError(errors, "lname")}</p>
                </div>
                <div class="field">
                <label class="label">Street Address</label>
                <input class="input" placeholder="Street Address" name="address" />
                <p class="help is-danger">${getError(errors, "address")}</p>
                </div>
                <div class="field">
                <label class="label">City</label>
                <input class="input" placeholder="City" name="city" />
                <p class="help is-danger">${getError(errors, "city")}</p>
                </div>
                <div class="field">
                <label class="label">State</label>
                <input class="input" placeholder="State" name="state" />
                <p class="help is-danger">${getError(errors, "state")}</p>
                </div>
                <div class="field">
                <label class="label">Zip Code</label>
                <input class="input" placeholder="Zip Code" name="zip" />
                <p class="help is-danger">${getError(errors, "zip")}</p>
                </div>
                <div class="field">
                  <label class="label">Email</label>
                  <input class="input" placeholder="Email" name="email" />
                  <p class="help is-danger">${getError(errors, "email")}</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <input class="input" placeholder="Password" name="password" type="password" />
                  <p class="help is-danger">${getError(errors, "password")}</p>
                </div>
                <div class="field">
                  <label class="label">Password Confirmation</label>
                  <input class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
                  <p class="help is-danger">${getError(
                    errors,
                    "passwordConfirmation"
                  )}</p>
                </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/custSignin">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `,
  });
};
