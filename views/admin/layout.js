module.exports = ({ content }) => {
  //string that represents the content of the web page
  //  this is how we will inject signin and signup ect in to body
  return `
 <!DOCTYPE html>
    <html>
        <head>
        </head>
            <body>
            ${content}
            </body>
     </html>
  `;
};
