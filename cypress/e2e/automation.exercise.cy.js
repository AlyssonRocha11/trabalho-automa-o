import { faker } from  '@faker-js/faker' ;
  // Gerando dados falsos 
    const firstName = faker.person.firstName(); 
    const lastName = faker.person.lastName(); 
    const email = faker.internet.email(); 
    const password = faker.internet.password();

describe('Automation Exercise', () => {
    it ('TC01: Cadastrar Usuario', () => {
        
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.get('input[data-qa="signup-name"]').type(firstName);
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.get('button[data-qa="signup-button"]').click(); 
        cy.get('input[data-qa="password"]').type(password);
        cy.get('select[data-qa="days"]').select("13");
        cy.get('select[data-qa="months"]').select("5");
        cy.get('select[data-qa="years"]').select("2004");
        cy.get('input[data-qa="first_name"]').type(firstName)
        cy.get('input[data-qa="last_name"]').type(lastName)
        cy.get('input[data-qa="company"]').type ("Psiconnect")
        cy.get('input[data-qa="address"]').type ("Rua carambinha")
        cy.get('select[data-qa="country"]').select('Canada')
        cy.get('input[data-qa="state"]').type('PE')
        cy.get('input[data-qa="city"]').type('Recife')  
        cy.get('input[data-qa="zipcode"]').type('55555')    
        cy.get('input[data-qa="mobile_number"]').type('99999-9999')
        cy.get('button[data-qa="create-account"]').click()
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
        cy.url().should('include', '/account_created')
    });

});
describe('Automation Exercise', () => {
    it('TC02: Login do Usuario com e-mail e senha corretos', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/"]').should('be.visible');
        cy.get('a[href="/login"]').click();
        cy.contains('Login to your account').should('be.visible');
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(password);
        cy.get('button[data-qa="login-button"]').click();
        cy.contains('Logged in as').should('be.visible');
        cy.get('a[href="/delete_account"]').click();
        cy.contains('Account Deleted!').should('be.visible');
    });

});
describe('Automation Exercise', () => {
    it('TC03: Login com e-mail e senha incorretos', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/"]').should('be.visible');
        cy.get('a[href="/login"]').click();
        cy.contains('Login to your account').should('be.visible');
        cy.get('input[data-qa="login-email"]').type('alysson333@mail.com');
        cy.get('input[data-qa="login-password"]').type('123123');
        cy.get('button[data-qa="login-button"]').click();
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

});

describe('Automation Exercise', () => {
    it('TC04: fazer logout do usuario', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('#header').should('be.visible');
        cy.get('a[href="/login"]').click();
        cy.contains('Login to your account').should('be.visible');
        cy.get('input[data-qa="login-email"]').type('ralysson444@gmail.com');
        cy.get('input[data-qa="login-password"]').type('rocha123');
        cy.get('button[data-qa="login-button"]').click();
        cy.contains('Logged in as rocha').should('be.visible');
        cy.get('a[href="/logout"]').click();
    });

});

describe('Automation Exercise', () => {
    it('TC05: Cadastrar usuário com e-mail existente', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.contains('New User Signup!').should('be.visible');
        cy.get('input[data-qa="signup-name"]').type('rocha');
        cy.get('input[data-qa="signup-email"]').type('ralysson444@gmail.com');
        cy.get('button[data-qa="signup-button"]').click();
        cy.contains('Email Address already exist!').should('be.visible');
    });

});

describe('Automation Exercise', () => {
    it('TC06: Formulário de contato', () => {
         cy.visit('https://automationexercise.com/');
        cy.get('a[href="/contact_us"]').click();
        cy.contains('Contact Us').should('be.visible');
        cy.get('input[data-qa="name"]').type(firstName);  
        cy.get('input[data-qa="email"]').type('teste@gmail.com');
        cy.get('input[data-qa="subject"]').type('Assunto de teste');
        cy.get('textarea[data-qa="message"]').type('Mensagem de teste automatizada.');
        cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/teste.txt');
        cy.get('input[data-qa="submit-button"]').click();
        cy.on('window:confirm', () => true);
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
        cy.get('a[class="btn btn-success"]').click();
        cy.url().should('eq', 'https://automationexercise.com/');
    });

});

describe('Automation Exercise', () => {
    it('TC08: Verificar todos os produtos e detalhes do produto', () => {  
          cy.visit('https://automationexercise.com/');
        cy.get('.carousel-inner').should('be.visible');
        cy.get('a[href="/products"]').click();
        cy.get('.title.text-center')
            .should('be.visible')
            .and('have.text', 'All Products');
        cy.get('.features_items').should('be.visible');
        cy.get('.features_items .product-image-wrapper')
            .first()
            .find('a[href*="product_details"]')
            .click();
        cy.url().should('include', '/product_details');
        cy.get('.product-information h2').should('be.visible');
        cy.contains('Category').should('be.visible');
        cy.get('.product-information span span').should('be.visible');
        cy.contains('Availability').should('be.visible');
        cy.contains('Condition').should('be.visible');
        cy.contains('Brand').should('be.visible');
  });

}); 

describe('Automation Exercise', () => {
    it('TC09: Pesquisar produto', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.carousel-inner').should('be.visible');
        cy.get('a[href="/products"]').click();
        cy.get('.title.text-center')
            .should('be.visible')
            .and('have.text', 'All Products');
        cy.get('#search_product').type('dress');
        cy.get('#submit_search').click();
        cy.get('.title.text-center')
            .should('be.visible')
            .and('have.text', 'Searched Products');
        cy.get('.features_items .col-sm-4').should('be.visible');
    });
});

describe('Automation Exercise', () => {
    it('TC10: Verificar assinatura na página inicial', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.carousel-inner').should('be.visible');
        cy.scrollTo('bottom');
        cy.contains('Subscription').should('be.visible');
        cy.get('#susbscribe_email').type(email);
        cy.get('#subscribe').click();
        cy.contains('You have been successfully subscribed!').should('be.visible');
    });
});

describe('Automation Exercise', () => {
    it('TC15 Criar conta, adicionar produto, finalizar pedido e excluir conta', () => {

        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.get('input[data-qa="signup-name"]').type(firstName);
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.get('button[data-qa="signup-button"]').click(); 
        cy.get('#id_gender1').click(); // gênero obrigatório
        cy.get('input[data-qa="password"]').type(password);
        cy.get('select[data-qa="days"]').select("13");
        cy.get('select[data-qa="months"]').select("5");
        cy.get('select[data-qa="years"]').select("2004");
        cy.get('input[data-qa="first_name"]').type(firstName)
        cy.get('input[data-qa="last_name"]').type(lastName)
        cy.get('input[data-qa="company"]').type("Psiconnect")
        cy.get('input[data-qa="address"]').type("Rua carambinha")
        cy.get('select[data-qa="country"]').select('Canada')
        cy.get('input[data-qa="state"]').type('PE')
        cy.get('input[data-qa="city"]').type('Recife')  
        cy.get('input[data-qa="zipcode"]').type('55555')    
        cy.get('input[data-qa="mobile_number"]').type('99999-9999')
        cy.get('button[data-qa="create-account"]').click()
        cy.url().should('include', '/account_created')     
        cy.contains('Products').click();
        cy.get('.add-to-cart').first().scrollIntoView().click({ force: true });
        cy.contains('Continue Shopping').click();
        cy.get('.add-to-cart').eq(1).scrollIntoView().click({ force: true });
        cy.contains('Continue Shopping').click();
        cy.contains('Cart').click();
        cy.url().should('include', 'view_cart');     
        cy.contains('Proceed To Checkout').click();
        cy.get('#address_delivery').should('be.visible');
        cy.get('.form-control').type('Por favor, entregar rápido!');
        cy.contains('Place Order').click();
        cy.get('[data-qa="name-on-card"]').type(`${firstName} ${lastName}`);
        cy.get('[data-qa="card-number"]').type('4111111111111111'); // cartão de teste Visa
        cy.get('[data-qa="cvc"]').type('123');
        cy.get('[data-qa="expiry-month"]').type('12');
        cy.get('[data-qa="expiry-year"]').type('2030');
        cy.get('[data-qa="pay-button"]').click();
        cy.contains('Congratulations! Your order has been confirmed!');
        cy.should('be.visible');
        cy.contains('Delete Account').click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        });
        });
