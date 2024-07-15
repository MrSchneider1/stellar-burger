describe('тест страницы конструктора бургера', function() {

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');

        window.localStorage.setItem('refreshToken', JSON.stringify('example-refreshToken'));
        cy.setCookie('accessToken', 'example-accessToken');
    });
    
    this.afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('добавляем ингредиенты в конструктор: добавляем булку', function() {
        const bun = cy.get(`[data-cy="643d69a5c3f7b9001cfa093c"]`);
        bun.find('button').should('be.visible').click();
        const topBun = cy.get(`[data-cy="top-bun"]`);
        topBun.contains('Краторная булка N-200i');
    });

    it('добавляем ингредиенты в конструктор: добавляем начинку', function() {
        const sauce = cy.get(`[data-cy="643d69a5c3f7b9001cfa0942"]`);
        sauce.find('button').click();
        const firstIngredient = cy.get(`[data-cy="ingredient 0"]`);
        firstIngredient.contains('Соус Spicy-X');
    });

    it('открытие модального окна ингредиента', function() {
        const bun = cy.get(`[data-cy="643d69a5c3f7b9001cfa093c"]`);
        bun.find('a').click();
        const modal = cy.get('#modals');
        modal.children().should('exist');
        const modalElement = modal.find('div');
        modalElement.should('be.visible');
        modalElement.contains('Краторная булка N-200i').should('exist');;
    });

    it('открытие модального окна ингредиента и закрытие по крестику', function() {
        const bun = cy.get(`[data-cy="643d69a5c3f7b9001cfa093c"]`);
        bun.find('a').click();
        const modal = cy.get('#modals');
        modal.children().should('exist');
        cy.get('#modals').find('button').click();
        cy.get('#modals').children().should('not.exist');
    });

    it('открытие модального окна ингредиента и закрытие по клику на оверлэй', function() {
        const bun = cy.get(`[data-cy="643d69a5c3f7b9001cfa093c"]`);
        bun.find('a').click();
        const modal = cy.get('#modals');
        modal.children().should('exist');
        cy.get('body').click(10, 10);
        cy.get('#modals').children().should('not.exist');
    });

    it('тест создания заказа', () => {
        cy.get(`[data-cy="643d69a5c3f7b9001cfa093c"]`).contains('Добавить').click();
        cy.get(`[data-cy="643d69a5c3f7b9001cfa093e"]`).contains('Добавить').click();
        cy.get(`[data-cy="643d69a5c3f7b9001cfa0943"]`).contains('Добавить').click();
        cy.get(`[data-cy="constructor"]`).contains('Краторная булка N-200i').should('exist');
        cy.get(`[data-cy="constructor"]`).contains('Филе Люминесцентного тетраодонтимформа').should('exist');
        cy.get(`[data-cy="constructor"]`).contains('Соус фирменный Space Sauce').should('exist');


        cy.get('button').contains('Оформить заказ').click();

        cy.wait('@postOrder')
            .its('request.body')
            .should('deep.equal', {
                ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093c']
            });
        cy.get(`[data-cy="order-number"]`).contains('2105').should('exist');

        cy.get('#modals').find('button').click();

        cy.get(`[data-cy="order-number"]`).should('not.exist');

        cy.get(`[data-cy="constructor"]`).contains('Краторная булка N-200i').should('not.exist');
        cy.get(`[data-cy="constructor"]`).contains('Филе Люминесцентного тетраодонтимформа').should('not.exist');
        cy.get(`[data-cy="constructor"]`).contains('Соус фирменный Space Sauce').should('not.exist');
    })
})