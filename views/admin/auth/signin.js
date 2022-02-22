// this function will be used (imported) in auth.js to render this HTML
// in the res.send once user has signed in
module.exports = () => {
  return `<div> 
    <form method="POST">
  <input name="email" placeholder="email"/>
  <input name="password" placeholder="password"/>
  <button>Sign In</button>
  </form>
  </div>`;
};
