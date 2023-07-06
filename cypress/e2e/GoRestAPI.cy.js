const faker = require('faker');

describe('Create New User', function() {

  const baseURL = 'https://gorest.co.in/';
  const token = "db6d52b6bf37d20ffbe0390ae0ba403c4f56d256f9c8ca31b275ecc67f2cf780";

  let userid;
  let postid;
  let commentid;


  it('Get All Users', function() {
    cy.request({
      method: 'GET',
      url: `${baseURL}public/v2/users`
    }).then((response)=>{
      cy.log(JSON.stringify(response))

      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal('OK')
    })
  })

  it('Create New User', function(){
    cy.request({
      method: 'POST',
      url: `${baseURL}public/v2/users`,
      headers:{
        Authorization: `Bearer ${token}`
      },
      body:{
        name: faker.internet.userName(),
        gender: 'Male',
        email: faker.internet.email(),
        status: 'active'
      }
    }).then((response)=>{
      cy.log(JSON.stringify(response));
      expect(response.status).to.equal(201);
      expect(response.statusText).to.equal('Created');

      const contentType = response.headers['content-type'];
      expect(contentType).to.exist;
      expect(contentType).to.include('application/json');

      userid = response.body.id;
      cy.log(userid);
    })

  })

    it('Get User by User ID', function(){
      cy.request({
        method: 'GET',
        url: `${baseURL}public/v2/users/${userid}`,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
      })
    })

    it('Update User By User ID', function(){
      cy.request({
        method: 'PUT',
        url: `${baseURL}public/v2/users/${userid}`,
        headers:{
          Authorization: `Bearer ${token}`
        },
        body:{
          name: faker.internet.userName(),
          gender: 'Male',
          email: faker.internet.email(),
          status: 'active'
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
      })
    })

    it('Create Post for User ID', function(){
      cy.request({
        method: 'POST',
        url: `${baseURL}/public/v2/users/${userid}/posts`,
        headers:{
          Authorization: `Bearer ${token}`
        },
        body:{
          title: faker.random.words(),
          body: faker.random.words(5)
        }
      }). then((response)=>{
        cy.log(JSON.stringify(response));
        expect(response.status).to.equal(201);
        expect(response.statusText).to.equal('Created');
        postid = response.body.id
        cy.log(postid)
      })
    })

    it('List All Post for User ID', function(){
      cy.request({
        method: 'GET',
        url: `${baseURL}/public/v2/users/${userid}/posts`,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
      })
    })

    it('Get Post by postid for given userid', function(){
      cy.request({
        method: 'GET',
        url: `${baseURL}/public/v2/users/${userid}/posts?id=${postid}`,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
      })
    })

    it('Comment on Post for given postid & userid', function(){
      cy.request({
        method: 'POST',
        url: `${baseURL}/public/v2/posts/${postid}/comments`,
        headers:{
          Authorization: `Bearer ${token}`
        },
        body:{
          name: faker.internet.userName(),
          email: faker.internet.email(),
          body: faker.random.words(5)
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        commentid = response.body.id;
        cy.log(commentid)
      })
    })

    it('Get Comment on Post for given postid & userid', function(){
      cy.request({
        method: 'GET',
        url: `${baseURL}/public/v2/posts/${userid}/comments?id=${commentid}`,
        headers:{
          Authorization: `Bearer ${token}`
        },
        body:{
          title: faker.random.words(),
          body: faker.random.words(5)
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))        
      })
    })

    it.skip('Delete comment on Post by postid for given userid', function(){
      cy.request({
        method: 'DELETE',
        url: `${baseURL}/public/v2/posts/${postid}/comments?id=${commentid}`,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')

      })
    })

    it.skip('Delete Post by postid for given userid', function(){
      cy.request({
        method: 'DELETE',
        url: `${baseURL}/public/v2/users/${userid}/posts?id=${postid}`,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))

        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
      })
    })

    it('Delete User by User ID', function(){
      cy.request({
        method: 'DELETE',
        url: `${baseURL}public/v2/users/${userid}`,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(204)
        expect(response.statusText).to.equal('No Content')
      })
    })
})