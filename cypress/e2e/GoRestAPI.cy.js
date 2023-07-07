import testData from '../fixtures/Data.json'
const faker = require('faker');

describe('Create New User', function() {

  let userid;
  let postid;
  let commentid;


  it('Get All Users', function() {
    cy.request({
      method: 'GET',
      url: `${testData.baseURL}/users`
    }).then((response)=>{
      cy.log(JSON.stringify(response))

      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal('OK')
    })
  })

  it('Create New User', function(){
    cy.request({
      method: 'POST',
      url: `${testData.baseURL}/users`,
      headers:{
        Authorization: `Bearer ${testData.token}`
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
        url: `${testData.baseURL}/users/${userid}`,
        headers:{
          Authorization: `Bearer ${testData.token}`
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
        url: `${testData.baseURL}/users/${userid}`,
        headers:{
          Authorization: `Bearer ${testData.token}`
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
        url: `${testData.baseURL}/users/${userid}/posts`,
        headers:{
          Authorization: `Bearer ${testData.token}`
        },
        body:{
          title: faker.random.words(),
          body: faker.random.words(5)
        }
      }). then((response)=>{
        cy.log(JSON.stringify(response));
        expect(response.status).to.equal(201);
        expect(response.statusText).to.equal('Created');
        postid = response.body.id;
        cy.log(postid)
      })
    })

    it('List All Post for User ID', function(){
      cy.request({
        method: 'GET',
        url: `${testData.baseURL}/users/${userid}/posts`,
        headers:{
          Authorization: `Bearer ${testData.token}`
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
        url: `${testData.baseURL}/users/${userid}/posts?id=${postid}`,
        headers:{
          Authorization: `Bearer ${testData.token}`
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
        url: `${testData.baseURL}/posts/${postid}/comments`,
        headers:{
          Authorization: `Bearer ${testData.token}`
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
        url: `${testData.baseURL}/posts/${userid}/comments?id=${commentid}`,
        headers:{
          Authorization: `Bearer ${testData.token}`
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
        url: `${testData.baseURL}/posts/${postid}/comments?id=${commentid}`,
        headers:{
          Authorization: `Bearer ${testData.token}`
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK');

      })
    })

    it.skip('Delete Post by postid for given userid', function(){
      cy.request({
        method: 'DELETE',
        url: `${baseURL}/users/${userid}/posts?id=${postid}`,
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
        url: `${testData.baseURL}/users/${userid}`,
        headers:{
          Authorization: `Bearer ${testData.token}`
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(204)
        expect(response.statusText).to.equal('No Content')
      })
    })
})