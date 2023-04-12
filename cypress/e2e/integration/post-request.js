/// <reference types="cypress" />

describe("Post Request", () => {
  var titleOfPosts = new Array();
  
    it("Create a new post via /posts api", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3000/posts",
        body: {
            title: "Want to learn automation testing?",
            author: "Laura Jones"
        }
      }).then(response => {
          expect(response.status).to.eql(201)
      })
 // Vamos a comprobar que el titulo que hemos posteado es el mismo que se muestra 
    it("Validate title of latest post", () => {
      cy.request({
          method: "GET",
          url: "http://localhost:3000/posts",
          headers: {
              accept: "application/json"
          }
      }).then(response => {
          let body = JSON.parse(JSON.stringify(response.body));
          body.forEach(function(item) {
              titleOfPosts.push(item["title"]);
          })
      }).then(() => {
          var latestPost = titleOfPosts[titleOfPosts.length -1]
          expect(latestPost).to.eq("Want to learn automation testing?");
      })
    })
  })
})